const path = require('path');
const dotenv = require('dotenv');
const result = dotenv.config({ path: path.resolve(__dirname, '.env'), override: true });


const express = require('express');
const cors = require('cors');
const { Octokit } = require('octokit');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const REPO_NAME = process.env.REPO_NAME;
const COMMIT_MESSAGE = "Pushed via PUSHkar";
const langExtMap = {
  python: 'py',
  python3: 'py',
  javascript: 'js',
  java: 'java',
  cpp: 'cpp',
  'c++': 'cpp',
  c: 'c',
  csharp: 'cs',
  'c#': 'cs',
  ruby: 'rb',
  go: 'go',
  rust: 'rs',
  typescript: 'ts',
  php: 'php',
  swift: 'swift',
  kotlin: 'kt',
  dart: 'dart',
  mysql: 'sql',
  oracle: 'sql',
  mssql: 'sql'
};

async function pushFile(path, content) {
  let sha;
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: GITHUB_USERNAME,
      repo: REPO_NAME,
      path: path,
    });
    sha = data.sha;
  } catch (error) {
    if (error.status !== 404) {
      throw error;
    }
  }

  await octokit.rest.repos.createOrUpdateFileContents({
    owner: GITHUB_USERNAME,
    repo: REPO_NAME,
    path: path,
    message: COMMIT_MESSAGE,
    content: Buffer.from(content).toString('base64'),
    ...(sha && { sha })
  });
}

app.get('/health', (req, res) => {
  res.json({ status: "PUSHkar is alive ⚡", defaultLanguage: process.env.DEFAULT_LANGUAGE || 'Java' });
});

app.post('/push', async (req, res) => {
  try {
    const {
      platform,
      problemName,
      problemNumber,
      topic,
      difficulty,
      language,
      code,
      problemStatement
    } = req.body;

    if (!platform || !problemName || !code) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const sanitizedProblemName = problemName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const defaultExt = langExtMap[(process.env.DEFAULT_LANGUAGE || 'Java').toLowerCase()] || 'java';
    const ext = langExtMap[language?.toLowerCase()] || defaultExt;

    const codePath = `${platform}/${topic || 'Uncategorized'}/${sanitizedProblemName}/solution.${ext}`;
    const problemPath = `${platform}/${topic || 'Uncategorized'}/${sanitizedProblemName}/problem.md`;

    const problemMdContent = `# ${problemNumber ? problemNumber + '. ' : ''}${problemName}\n**Platform:** ${platform}\n**Difficulty:** ${difficulty || 'N/A'}\n**Topic:** ${topic || 'N/A'}\n\n## Problem Statement\n${problemStatement || 'N/A'}`;

    // 1. Push Code
    await pushFile(codePath, code);

    // 2. Push Problem Statement
    await pushFile(problemPath, problemMdContent);

    // 3. Update README.md
    let currentReadme = "";
    let readmeSha;
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner: GITHUB_USERNAME,
        repo: REPO_NAME,
        path: "README.md",
      });
      readmeSha = data.sha;
      currentReadme = Buffer.from(data.content, 'base64').toString('utf-8');
    } catch (error) {
      if (error.status === 404) {
        currentReadme = "# PUSHkar Solutions\n\n| # | Problem | Platform | Topic | Difficulty | Language |\n|---|---------|----------|-------|------------|----------|\n";
      } else {
        throw error;
      }
    }

    let lines = currentReadme.split('\n');
    let existingRowIndex = -1;
    const problemStr = `${problemNumber ? problemNumber + '. ' : ''}${problemName}`;
    
    for (let i = 0; i < lines.length; i++) {
       if (lines[i].includes(`| ${problemStr} |`) && lines[i].includes(`| ${platform} |`)) {
           existingRowIndex = i;
           break;
       }
    }

    let count = Math.max(1, lines.filter(line => line.trim().startsWith('|') && !line.includes('---|---') && !line.includes('| Problem |')).length + 1);

    if (existingRowIndex !== -1) {
       const rowMatch = lines[existingRowIndex].match(/^\|\s*(\d+)\s*\|/);
       if (rowMatch) count = rowMatch[1];
       lines[existingRowIndex] = `| ${count} | ${problemStr} | ${platform} | ${topic || 'N/A'} | ${difficulty || 'N/A'} | ${language || 'N/A'} |`;
    } else {
       lines.push(`| ${count} | ${problemStr} | ${platform} | ${topic || 'N/A'} | ${difficulty || 'N/A'} | ${language || 'N/A'} |`);
    }

    const updatedReadme = lines.join('\n').trim() + '\n';

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: GITHUB_USERNAME,
      repo: REPO_NAME,
      path: "README.md",
      message: COMMIT_MESSAGE,
      content: Buffer.from(updatedReadme).toString('base64'),
      ...(readmeSha && { sha: readmeSha })
    });

    res.json({ success: true, message: "Pushed successfully ⚡" });

  } catch (error) {
    console.error(error);
    let errorMsg = error.message;
    if (error.status === 401) {
      errorMsg = "GitHub authentication failed. Check your token in server/.env";
    }
    res.status(500).json({ success: false, error: errorMsg });
  }
});

app.listen(PORT, () => {
  console.log(`PUSHkar server running on port ${PORT} ⚡`);
});
