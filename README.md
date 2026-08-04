# PUSHkar ⚡
> Solve it. PUSHkar.

A Chrome Extension that automatically pushes your coding solutions to GitHub — organized by platform and topic.

### Badges
- **Built by:** Swaroop
- **License:** MIT
- **Platforms:** LeetCode | GFG | Codeforces | CodeChef | HackerRank
- **Status:** Active

### What is PUSHkar?
PUSHkar is a streamlined tool that connects a local Chrome Extension to a local Express server. As you solve coding problems across various competitive programming platforms, the extension automatically extracts the problem details (platform, name, difficulty, topic tags, language, and the full problem statement). With a single click, it securely pushes both your solution code and the problem statement directly to your GitHub repository. It keeps your repository perfectly organized, searchable, and self-contained without needing databases or cloud deployments!

### Features
- Auto-detects platform, problem name, topic, difficulty, language
- Pushes solution code + problem statement together
- Auto-organized repo structure: `Platform/Topic/problem-name/`
- Auto-updates README index table on every push
- Commit watermark: "Pushed via PUSHkar by Swaroop ⚡"
- 100% free, runs locally, no deployment needed
- Neubrutalism UI

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

### Setup Instructions

1. **Clone this repo:**
   ```bash
   git clone https://github.com/Swaroop-Thorat/PUSHkar.git
   ```

2. **Install dependencies:**
   ```bash
   cd pushkar
   npm install
   ```

3. **Add your GitHub details in `server/.env`:**
   ```env
   GITHUB_TOKEN=your_github_personal_access_token
   GITHUB_USERNAME=your_github_username
   REPO_NAME=your_repo_name
   ```
   **→ How to get a GitHub token:**
   GitHub → Settings → Developer Settings → Personal Access Tokens → Generate New Token
   → Select scopes: `repo` (full control)

4. **Start the local server:**
   ```bash
   node server/server.js
   ```
   → You should see: `"PUSHkar server running on port 3000 ⚡"`

5. **Load the extension in Chrome:**
   → Open: `chrome://extensions/`
   → Enable: **Developer Mode** (top right toggle)
   → Click: **Load Unpacked**
   → Select: the `/extension` folder
   → PUSHkar icon appears in toolbar ✅

6. Go to any supported platform, open a problem, solve it.
7. Click PUSHkar icon → paste code → click **PUSH ⚡**

### Supported Platforms
| Platform | Auto-detect | Problem Statement | Tags |
|----------|-------------|-------------------|------|
| LeetCode | ✅ | ✅ | ✅ |
| GeeksforGeeks | ✅ | ✅ | ✅ |
| Codeforces | ✅ | ✅ | ✅ |
| CodeChef | ✅ | ✅ | ✅ |
| HackerRank | ✅ | ✅ | ✅ |

### Solutions Index
(This section is auto-updated by PUSHkar on every push)

| # | Problem | Platform | Topic | Difficulty | Language |
|---|---------|----------|-------|------------|----------|

### Important Notes
- Keep server running (`node server/server.js`) while using extension
- Never share your `.env` file — it contains your GitHub token
- `.env` is already in `.gitignore` — safe to push this repo

### Built By
PUSHkar is built and maintained by Swaroop ⚡
Every commit pushed by this tool carries the watermark:
"Pushed via PUSHkar by Swaroop ⚡"

GitHub: [github.com/swaroop](https://github.com/swaroop)

### License
MIT License — free to use, but credit must be maintained.
