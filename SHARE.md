# Hey! Try PUSHkar ⚡

PUSHkar automatically pushes your coding solutions 
to your GitHub repo — organized by platform and topic.

## Requirements
- Node.js installed (https://nodejs.org)
- Git installed (https://git-scm.com)
- Google Chrome browser

## Setup (5 minutes, one time only)

### Step 1: Clone the repo
```bash
git clone https://github.com/swaroop/pushkar.git
cd pushkar
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Run setup
```bash
npm run setup
```
→ Enter your GitHub token when asked
  (GitHub → Settings → Developer Settings → 
   Personal Access Tokens → Generate New Token
   → Select scope: repo)
→ Enter your GitHub username
→ Enter the repo name where solutions will be pushed

### Step 4: Start the server
```bash
npm start
```
→ Keep this terminal open while solving problems

### Step 5: Load Chrome Extension
→ Open Chrome → go to: `chrome://extensions/`
→ Top right: Enable "Developer Mode"
→ Click "Load Unpacked"
→ Select the `/extension` folder inside `pushkar/`
→ PUSHkar icon appears in your Chrome toolbar ✅

### Step 6: Start solving!
→ Go to LeetCode / GFG / Codeforces / CodeChef / HackerRank
→ Open any problem
→ Solve it
→ Click PUSHkar icon in toolbar
→ Paste your solution
→ Click PUSH ⚡
→ Check your GitHub repo — it's there!

## Your GitHub repo will look like:
```text
your-repo/
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
└── README.md  ← searchable index of all solutions
```

## Built by Swaroop ⚡
Every commit: "Pushed via PUSHkar by Swaroop ⚡"
