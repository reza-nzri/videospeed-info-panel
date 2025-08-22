# VideoSpeed Info Panel

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

### 🤝 Contributing</summary>

Contributions, bug reports, and feature ideas are welcome!  

[![Reza Nazari](https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/127698692?v=4&w=35&h=35&mask=circle)](https://github.com/reza-nzri)

