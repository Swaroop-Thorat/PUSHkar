# PUSHkar ⚡
> Solve it. PUSHkar.

A Chrome Extension that automatically pushes your coding solutions to GitHub — organized by platform and topic.

### Badges
- **Built by:** Swaroop
- **License:** MIT
- **Platforms:** LeetCode | GFG | Codeforces | CodeChef | HackerRank | AtCoder | SPOJ | Code360 | CSES
- **Status:** Active

---

### What is PUSHkar?
PUSHkar is a streamlined tool that connects a local Chrome Extension to a local Express server. As you solve coding problems across various competitive programming platforms, the extension automatically extracts the problem details (platform, name, difficulty, topic tags, language, and the full problem statement). With a single click, it securely pushes both your solution code and the problem statement directly to your GitHub repository. It keeps your repository perfectly organized, searchable, and self-contained without needing databases or cloud deployments!

---

### Features
- Auto-detects platform, problem name, topic, difficulty, language
- Pushes solution code + problem statement together
- Auto-organized repo structure: `Platform/Topic/problem-name/`
- Auto-updates README index table on every push
- Commit watermark: "Pushed via PUSHkar⚡"
- 100% free, runs locally, no deployment needed
- **Server auto-starts on boot — no terminal needed after setup**
- Neubrutalism UI

---

### Repo Structure (after using PUSHkar)
```text
your-github-repo/
├── LeetCode/
│   └── Arrays/
│       └── two-sum/
│           ├── solution.py
│           └── problem.md
├── Codeforces/
│   └── Graphs/
│       └── dfs-tree/
│           ├── solution.cpp
│           └── problem.md
└── README.md  ← auto-updated index
```

---

### Full Setup Guide

> One time, I promise. ✅

---

#### Step 1 — Generate your GitHub Token

1. Go to **GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (Classic)**
2. Click **Generate New Token (Classic)** and authenticate if prompted
3. Add a note (e.g. `PUSHkar`), set expiry to **No Expiry**
4. Under scopes, select **`repo`** (full repo access)
5. Click **Generate Token** — copy it and save it somewhere temporarily (e.g. Notepad)

> ⚠️ You won't be able to see this token again after leaving the page.

---

#### Step 2 — Create a GitHub Repo

Create a dedicated GitHub repository for your solutions (e.g. `CodingProfile`).
Note the repo name — you'll need it in Step 4.

---

#### Step 3 — Clone PUSHkar

Head to [github.com/Swaroop-Thorat/PUSHkar](https://github.com/Swaroop-Thorat/PUSHkar) and clone the repo into your main user folder on the C drive:

```bash
git clone https://github.com/Swaroop-Thorat/PUSHkar.git
cd PUSHkar
```

---

#### Step 4 — Run Setup

Open a terminal **as Administrator**, navigate into the PUSHkar folder, and run:

**Windows:**
```bash
.\setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh && ./setup.sh
```

When prompted, enter:
- Your **GitHub Personal Access Token** (from Step 1)
- Your **GitHub username**
- Your **repo name** (from Step 2)

Hit Enter, then run:
```bash
npm start
```

To confirm the server is running, open your browser and go to:
```
http://localhost:8000/health
```
If the page loads → ✅ Server is running.

> ⚠️ On Windows, `setup.bat` **must** be run as Administrator or it will fail silently.

---

#### Step 5 — Auto-Start Shortcut *(Optional but recommended)*

Inside the PUSHkar folder, find `start_pushkar.vbs` and **create a desktop shortcut** of it.

Since the server shuts down on every system restart, just double-click this shortcut after booting up — no need to open a terminal. 

> Note: Windows may sometimes restrict auto-start scripts, so this shortcut is the most reliable workaround.

---

#### Step 6 — Load the Extension

1. Open your browser and go to `chrome://extensions/`
2. Enable **Developer Mode** (toggle in the top right)
3. Click **Load Unpacked**
4. Select the **`/extension`** folder inside the PUSHkar directory *(not the root folder)*
5. The PUSHkar icon will appear in your toolbar ✅

**Set a keyboard shortcut (recommended):**
- Scroll down to **Keyboard Shortcuts** (below your extensions list)
- Find **PUSHkar** and set your preferred shortcut (e.g. `Ctrl+P`)
- Refresh your browser — you're done!

---

#### Step 7 — Start Pushing!

Go to any supported platform, open a problem, solve it.
Click the PUSHkar icon (or use your shortcut) → paste your code → click **PUSH ⚡**

---

### Troubleshooting

| Issue | Fix |
|-------|-----|
| Push fails — *target repo not set* | Redo Steps 2 and 4 |
| Push fails — *server not running* | Double-click the `start_pushkar.vbs` shortcut, or `cd` into PUSHkar and run `npm start` |
| `setup.bat` does nothing | Make sure you're running the terminal as **Administrator** |
| `localhost:8000/health` doesn't load | Server isn't running — start it via the shortcut or `npm start` |

---

### Supported Platforms
| Platform | Auto-detect | Problem Statement | Tags | Contest Problems |
|----------|-------------|-------------------|------|-----------------|
| LeetCode | ✅ | ✅ | ✅ | ✅ |
| GeeksforGeeks | ✅ | ✅ | ✅ | ✅ |
| Codeforces | ✅ | ✅ | ✅ | ✅ |
| CodeChef | ✅ | ✅ | ✅ | ✅ |
| HackerRank | ✅ | ✅ | ✅ | ✅ |
| AtCoder | ✅ | ✅ | ✅ | ✅ |
| SPOJ | ✅ | ✅ | ✅ | ✅ |
| Code360 | ✅ | ✅ | ✅ | ✅ |
| CSES | ✅ | ✅ | ✅ | ✅ |

---

### Solutions Index
*(This section is auto-updated by PUSHkar on every push)*

| # | Problem | Platform | Topic | Difficulty | Language |
|---|---------|----------|-------|------------|----------|

---

### Important Notes
- Never share your `.env` file — it contains your GitHub token
- `.env` is already in `.gitignore` — safe to push this repo
- If the server ever stops responding, restart it via the shortcut or run `npm start`

---

### Built By
PUSHkar is built and maintained by Swaroop ⚡
Every commit pushed by this tool carries the watermark:
> "Pushed via PUSHkar⚡"

GitHub: [https://github.com/Swaroop-Thorat](https://github.com/Swaroop-Thorat)

---

### License
MIT License — free to use, but credit must be maintained.