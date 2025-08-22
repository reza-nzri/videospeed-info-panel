# <img src="logo-1.png" alt="VideoSpeed Info Panel Logo" width="25px"> **VideoSpeed Info Panel**

Tampermonkey / Greasemonkey userscript that adds a dynamic **`!` info panel** to all HTML5 videos.  
It shows **watch time** and **time saved** based on your current playback speed, and auto-hides when idle.

<details>
<summary><h2>🖥 Demo</h2></summary>

<img width="330" height="auto" alt="Demo Screenshot - YouTube-1" src="https://github.com/user-attachments/assets/9da4fdaf-85d9-44bc-98db-3c3801377bef" />
<img width="311" height="auto" alt="Demo Screenshot - YouTube-2" src="https://github.com/user-attachments/assets/a6c8dc17-cdd1-4ca4-86ea-76dad0af4b87" />

<details>
  <summary><h3>Explained</h3></summary>
This panel is a **video time summary**, shown in `hh\:mm\:ss` format:

* **Watch: 00:04:54** → At your current playback speed, finishing this video will take 4 minutes and 54 seconds.
* **Saved: 00:01:57 (28.6%)** → This means you have **saved 1 minute and 57 seconds of actual watch time** compared to normal speed (1x), which equals 28.6% of the video duration.

**In short:** it clearly shows **how long you’ll actually spend** and **how much viewing time you’ve effectively saved**.

</details>
</details>

<details>
<summary><h2>💡 Why & Benefits</h2></summary>

- Save time by watching videos faster while still knowing exactly **how much time you actually spend**.  
- Track **how many minutes/hours you saved** compared to normal speed.  
- Keep awareness of your viewing habits — helps with **productivity** and better **time management**.  
- Lightweight, no external dependencies, works everywhere with HTML5 videos.  

</details>

<details>
<summary><h2>✨ Features</h2></summary>

- Works on **all HTML5 videos** across the web.  
- Small `!` icon in the **top-left corner** of each video.  
- Hover over the icon to see:
  - Effective watch time (adjusted by playback speed)  
  - Time saved (absolute + percentage)  
- **Auto-hide** after mouse inactivity (default 3s).  
- Overlay stays in position even on resize or fullscreen.  

</details>

<details>
<summary><h2>⚙️ Installation</h2></summary>

1. Install [Tampermonkey](https://www.tampermonkey.net/) (or any compatible userscript manager).  
2. [Click here to install the script](./videospeed-info-panel.user.js)  
   *(or copy & paste the code into a new Tampermonkey script).*  
3. Open any page with HTML5 video (YouTube, Vimeo, etc.) and enjoy!  

</details>

<details>
<summary><h2>🔧 Configuration</h2></summary>

Inside the script, you can tweak these constants:  

- `MARGIN_X_SCALE` / `MARGIN_Y_SCALE` → position relative to video frame.  
- `ICON_SIZE_PX` → size of the `!` icon.  
- `MOUSE_IDLE_MS` → idle timeout before hiding the overlay.  

</details>

<details>
<summary><h2>❓ FAQ for SEO</h2></summary>

<details>
<summary><h3>🔹 How to know how much time I save at 2× speed? (VideoSpeed Info Panel)</h3></summary>
<b>VideoSpeed Info Panel</b> calculates the <b>effective watch time</b> and the <b>exact time saved</b> when playing any HTML5 video at 1.25×/1.5×/2×. The panel shows results in <b>hh:mm:ss</b> and as a percentage, updating live as playback speed changes.
</details>

<details>
<summary><h3>🔹 Can VideoSpeed Info Panel work with YouTube, Vimeo, Udemy, Coursera?</h3></summary>
<b>VideoSpeed Info Panel</b> supports <b>all HTML5 video players</b> (YouTube, Vimeo, Udemy, Coursera, and most e-learning sites). The script overlays a small “!” icon; hovering shows watch time, remaining time (speed-adjusted), and time saved.
</details>

<details>
<summary><h3>🔹 What is the best Tampermonkey userscript for video time tracking?</h3></summary>
The <b>VideoSpeed Info Panel</b> Tampermonkey/Greasemonkey userscript adds a minimal overlay to HTML5 videos showing <b>watch time</b>, <b>saved time</b>, and <b>saved %</b> based on current playback speed—ideal for productivity and study sessions.
</details>

<details>
<summary><h3>🔹 How does VideoSpeed Info Panel calculate saved time?</h3></summary>
<b>VideoSpeed Info Panel</b> uses: <b>WatchTime = OriginalDuration / Speed</b>. <b>SavedTime = OriginalDuration − WatchTime</b>. <b>Saved% = 1 − 1/Speed</b>. All values appear in <b>hh:mm:ss</b> and update instantly when speed changes.
</details>

<details>
<summary><h3>🔹 Is VideoSpeed Info Panel useful for productivity?</h3></summary>
<b>VideoSpeed Info Panel</b> shows exactly how much viewing time is required and how much is saved, helping with <b>time management</b> and <b>learning efficiency</b> when watching lectures, tutorials, and long YouTube videos at higher speeds.
</details>

<details>
<summary><h3>🔹 How to manage time on platforms like Instagram, Twitter/X, LinkedIn where duration isn’t shown?</h3></summary>
Combine <a href="https://github.com/igrigorik/videospeed">Video Speed Controller</a> (to change speed) with <b>VideoSpeed Info Panel</b> (to see <b>watch time</b>, <b>remaining time</b>, and <b>time saved</b>). This solves the hidden/absent timer issue on Instagram, Twitter/X, LinkedIn, etc.
</details>

<details>
<summary><h3>🔹 How to see total/remaining time on social media videos (Instagram/TikTok) and track savings?</h3></summary>
Install <b>VideoSpeed Info Panel</b> to display speed-adjusted <b>watch time</b>, <b>remaining duration</b>, and <b>saved time</b> on any HTML5 video. Pair with <a href="https://github.com/igrigorik/videospeed">Video Speed Controller</a> for precise speed control on Instagram, TikTok, and other social platforms.
</details>

<details>
<summary><h2>🔑 SEO Keywords</h2></summary>

how to speed up YouTube videos, how to save time watching videos, Tampermonkey userscript, Greasemonkey script, HTML5 video overlay, video speed controller alternative, video time tracker, watch time calculator, saved time percentage, time saver extension, track effective watch time, YouTube speed control, online course video speed, productivity tool for videos, dynamic info panel, calculate watch time, calculate saved time, faster video playback, watch lectures faster, manage video time, track video duration, video playback speed script, YouTube 2x speed time saved, best userscript for video speed, video overlay watch time, time management tool, learning efficiency script

</details>
</details>

### 🤝 Contributing</summary>

Contributions, bug reports, and feature ideas are welcome!  

[![Reza Nazari](https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/127698692?v=4&w=35&h=35&mask=circle)](https://github.com/reza-nzri)

