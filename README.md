# PUSHkar ⚡
> Solve it. PUSHkar.

A Chrome Extension that automatically pushes your coding solutions to GitHub — organized by platform and topic.

### Badges
- **Built by:** Swaroop
- **License:** MIT
- **Platforms:** LeetCode | GFG | Codeforces | CodeChef | HackerRank
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

### Setup Instructions

#### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A GitHub account + Personal Access Token ([how to get one](https://github.com/settings/tokens) → select `repo` scope)

---

#### Step 1 — Clone this repo
```bash
git clone https://github.com/Swaroop-Thorat/PUSHkar.git
cd pushkar
```

---

#### Step 2 — Configure GitHub credentials
```bash
node setup.js
```
Enter your GitHub token, username, and repo name when prompted.
This creates `server/.env` automatically — never share or commit this file.

---

#### Step 3 — Register auto-start (run once)

**Windows** — right-click and **Run as administrator:**
```bash
.\setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh && ./setup.sh
```

This registers the server to start automatically in the background on every login. **No terminal needed after this.**

> ⚠️ On Windows, `setup.bat` must be run as Administrator or it will fail.

---

#### Step 4 — Reboot your PC

After reboot, the server starts automatically. Verify by opening:
```
http://localhost:8000
```
If you see anything (even `Cannot GET /`) → ✅ Server is running.

---

#### Step 5 — Load the extension in Chrome
- Open: `chrome://extensions/`
- Enable: **Developer Mode** (top right toggle)
- Click: **Load Unpacked**
- Select: the `/extension` folder
- PUSHkar icon appears in toolbar ✅

---

#### Step 6 — Start pushing!
Go to any supported platform, open a problem, solve it.
Click PUSHkar icon → paste code → click **PUSH ⚡**

---

### Supported Platforms
| Platform | Auto-detect | Problem Statement | Tags |
|----------|-------------|-------------------|------|
| LeetCode | ✅ | ✅ | ✅ |
| GeeksforGeeks | ✅ | ✅ | ✅ |
| Codeforces | ✅ | ✅ | ✅ |
| CodeChef | ✅ | ✅ | ✅ |
| HackerRank | ✅ | ✅ | ✅ |

---

### Solutions Index
(This section is auto-updated by PUSHkar on every push)

| # | Problem | Platform | Topic | Difficulty | Language |
|---|---------|----------|-------|------------|----------|

---

### Important Notes
- Server auto-starts on boot after setup — no need to run `npm start` manually
- Never share your `.env` file — it contains your GitHub token
- `.env` is already in `.gitignore` — safe to push this repo
- If server ever stops responding, restart it: `npm start`

---

### Built By
PUSHkar is built and maintained by Swaroop ⚡
Every commit pushed by this tool carries the watermark:
"Pushed via PUSHkar⚡"

GitHub: [https://github.com/Swaroop-Thorat](https://github.com/Swaroop-Thorat)

---

### License
MIT License — free to use, but credit must be maintained.