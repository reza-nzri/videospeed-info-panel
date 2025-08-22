// ==UserScript==
// @name         Videospeed Info Panel
// @namespace    https://example.local
// @version      1.2
// @description  "!" icon shows panel with Speed/Watch/Saved; auto-hides entirely after mouse idle; reappears on movement; stays inside video frame incl. fullscreen.
// @author       Reza Nazari
// @match        *://*/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    // -------------------------------
    // Config
    // -------------------------------
    // Margin relative to video size (e.g., 0.02 == 2% of video width/height)
    const MARGIN_X_SCALE = 0.010;
    const MARGIN_Y_SCALE = 0.062;

    // Icon size (px)
    const ICON_SIZE_PX = 20;

    // Position/metrics refresh cadence (ms)
    const UPDATE_MS = 250;

    // Mouse idle timeout (ms) — hide everything after this
    const MOUSE_IDLE_MS = 3000;

    // -------------------------------
    // Internal state
    // -------------------------------
    const tracked = new WeakMap(); // video -> { wrap, icon, panel }
    let idleTimer = null;
    let isIdle = false;

    // -------------------------------
    // Utilities
    // -------------------------------
    function hhmmss(totalSeconds) {
        if (!isFinite(totalSeconds) || totalSeconds < 0) return "--:--:--";
        const s = Math.floor(totalSeconds);
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        const mm = (m < 10 ? "0" : "") + m;
        const ss = (sec < 10 ? "0" : "") + sec;
        return (h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`).padStart(8, "0");
    }

    function compute(video) {
        const dur = video.duration;                 // seconds
        const v = Math.max(0.0001, video.playbackRate || 1);
        const effective = isFinite(dur) ? dur / v : NaN;
        const saved = isFinite(dur) ? dur - effective : NaN;
        const savedPct = 1 - 1 / v;                 // negative if v < 1
        return { v, effective, saved, savedPct };
    }

    function buildText(video) {
        const { v, effective, saved, savedPct } = compute(video);
        const lines = [
            // `Speed:\t${v.toFixed(2)}x`,
            `Watch:\t${hhmmss(effective)}`,
            `Saved:\t${hhmmss(saved)}  ${isFinite(savedPct) ? (savedPct * 100).toFixed(1) : "--"}%`,
        ];
        return lines.join("\n");
    }

    // -------------------------------
    // Idle visibility helpers
    // -------------------------------
    function hideAllOverlays() {
        isIdle = true;
        document.querySelectorAll('[data-vts-wrap="1"]').forEach((wrap) => {
            // Close panel if open, then hide everything
            const panel = wrap.querySelector('[data-vts-panel="1"]');
            if (panel) panel.style.display = "none";
            wrap.style.opacity = "0";
            wrap.style.pointerEvents = "none";
        });
    }

    function showIconOnly() {
        isIdle = false;
        document.querySelectorAll('[data-vts-wrap="1"]').forEach((wrap) => {
            const panel = wrap.querySelector('[data-vts-panel="1"]');
            if (panel) panel.style.display = "none"; // keep panel closed on wake
            wrap.style.opacity = "1";
            wrap.style.pointerEvents = "none"; // icon has its own pointer-events
        });
    }

    function resetIdleTimer() {
        // On any movement: wake up overlays (icon visible, panel closed)
        if (isIdle) showIconOnly();
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(hideAllOverlays, MOUSE_IDLE_MS);
    }

    // -------------------------------
    // DOM creation
    // -------------------------------
    function createOverlay(video) {
        // Wrapper is fixed to viewport so it stays put in fullscreen/resize.
        const wrap = document.createElement("div");
        wrap.setAttribute("data-vts-wrap", "1");
        wrap.style.cssText = [
            "position:fixed",
            "z-index:2147483647",
            "pointer-events:none", // panel shouldn't block clicks; icon will re-enable
            "opacity:1",
            "transition:opacity .15s ease",
        ].join(";");

        // "!" icon (always visible by default unless idle)
        const icon = document.createElement("div");
        icon.setAttribute("data-vts-icon", "1");
        icon.textContent = "!";
        icon.style.cssText = [
            "position:absolute",
            `width:${ICON_SIZE_PX}px`,
            `height:${ICON_SIZE_PX}px`,
            "line-height:1",
            "display:flex",
            "align-items:center",
            "justify-content:center",
            "font-weight:bold",
            "font-family:ui-monospace, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
            "font-size:16px",
            "color:rgba(255, 255, 255, 0.8)",
            "background:rgba(0,0,0,0.25)", // 25% black background
            "border-radius:50%",
            "pointer-events:auto", // needs to receive hover/click
            "user-select:none",
            "cursor:default",
        ].join(";");

        // Panel (hidden by default, appears below the icon)
        const panel = document.createElement("div");
        panel.setAttribute("data-vts-panel", "1");
        panel.style.cssText = [
            "position:absolute",
            "left:0",
            `top:${ICON_SIZE_PX + 4}px`,
            "max-width:240px",
            "padding:8px 10px",
            "white-space:pre",
            "font:12px/1.35 ui-monospace, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
            "color:rgba(255, 255, 255, 0.8)",
            "background:rgba(0,0,0,0.25)", // 25% black background
            "border-radius:6px",
            "pointer-events:none",
            "display:none",
        ].join(";");

        // Hover-to-toggle (open on enter, close on leave)
        icon.addEventListener("mouseenter", () => {
            if (isIdle) return; // do nothing while hidden
            panel.style.display = "block";
            panel.textContent = buildText(video);
        });
        icon.addEventListener("mouseleave", () => {
            panel.style.display = "none";
        });

        // Keep the text fresh on rate/meta changes
        const refresh = () => {
            if (panel.style.display !== "none") {
                panel.textContent = buildText(video);
            }
        };
        video.addEventListener("ratechange", refresh, { passive: true });
        video.addEventListener("loadedmetadata", refresh, { passive: true });
        video.addEventListener("durationchange", refresh, { passive: true });

        wrap.appendChild(icon);
        wrap.appendChild(panel);
        document.body.appendChild(wrap);

        tracked.set(video, { wrap, icon, panel });
        return { wrap, icon, panel };
    }

    // -------------------------------
    // Positioning
    // -------------------------------
    function positionOverlay(video, parts) {
        const r = video.getBoundingClientRect();
        if (r.width <= 2 || r.height <= 2) {
            parts.wrap.style.display = "none";
            return;
        }
        parts.wrap.style.display = "block";

        // Margin scaled to video size
        const mx = Math.round(r.width * MARGIN_X_SCALE);
        const my = Math.round(r.height * MARGIN_Y_SCALE);

        // Top-left inside the video frame
        const left = Math.max(0, r.left + mx);
        const top = Math.max(0, r.top + my);

        parts.wrap.style.left = `${left}px`;
        parts.wrap.style.top = `${top}px`;

        // Keep icon at (0,0) relative to wrap; panel already sits under icon.
        parts.icon.style.left = `0px`;
        parts.icon.style.top = `0px`;
    }

    // -------------------------------
    // Tracking videos
    // -------------------------------
    function trackVideo(video) {
        if (!(video instanceof HTMLVideoElement)) return;
        if (tracked.has(video)) return;
        createOverlay(video);
    }

    function scan() {
        document.querySelectorAll("video").forEach(trackVideo);
    }

    const mo = new MutationObserver((muts) => {
        for (const m of muts) {
            m.addedNodes && m.addedNodes.forEach((n) => {
                if (n.nodeType !== 1) return;
                if (n.tagName === "VIDEO") trackVideo(n);
                n.querySelectorAll && n.querySelectorAll("video").forEach(trackVideo);
            });
        }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });

    ["resize", "scroll", "fullscreenchange"].forEach((ev) =>
                                                     addEventListener(ev, () => { /* positions are recalculated in loop */ }, { passive: true })
                                                    );

    // Main loop to keep position and (optional) periodic refresh
    function tick() {
        document.querySelectorAll("video").forEach((video) => {
            const parts = tracked.get(video);
            if (!parts) return;

            // If panel is open, keep its content up-to-date
            if (parts.panel.style.display !== "none") {
                parts.panel.textContent = buildText(video);
            }
            positionOverlay(video, parts);
        });
        setTimeout(tick, UPDATE_MS);
    }

    // -------------------------------
    // Idle detection wiring
    // -------------------------------
    ["mousemove", "mousedown", "wheel", "keydown", "touchstart", "pointermove"].forEach((ev) => {
        addEventListener(ev, resetIdleTimer, { passive: true });
    });
    resetIdleTimer(); // start the timer

    // Init
    scan();
    tick();

    addEventListener("pagehide", () => {
        document.querySelectorAll('[data-vts-wrap="1"]').forEach((el) => el.remove());
    }, { once: true });
})();
