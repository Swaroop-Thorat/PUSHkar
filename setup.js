const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => {
  return new Promise(resolve => rl.question(query, resolve));
};

async function setup() {
  console.log("Welcome to PUSHkar Setup ⚡\n");
  
  const token = await askQuestion("Enter your GitHub Personal Access Token: ");
  const username = await askQuestion("Enter your GitHub Username: ");
  const repo = await askQuestion("Enter your GitHub Repo Name: ");
  
  const envPath = path.join(__dirname, 'server', '.env');
  const envContent = `GITHUB_TOKEN=${token}\nGITHUB_USERNAME=${username}\nREPO_NAME=${repo}\n`;
  
  fs.writeFileSync(envPath, envContent);
  
  console.log("\n✅ Setup complete! Now run: npm start");
  rl.close();
}

setup();
