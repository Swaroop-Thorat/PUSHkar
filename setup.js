const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

async function setup() {
  console.log("Welcome to PUSHkar Setup ⚡\n");
  
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'token',
      message: 'Enter your GitHub Personal Access Token:'
    },
    {
      type: 'input',
      name: 'username',
      message: 'Enter your GitHub Username:'
    },
    {
      type: 'input',
      name: 'repo',
      message: 'Enter your GitHub Repo Name (will be created if not exists):'
    },
    {
      type: 'list',
      name: 'defaultLanguage',
      message: 'Select your default programming language:',
      choices: ['Java', 'Python', 'C++', 'C', 'JavaScript', 'TypeScript', 'C#']
    }
  ]);
  
  const envPath = path.join(__dirname, 'server', '.env');
  const envContent = `GITHUB_TOKEN=${answers.token}\nGITHUB_USERNAME=${answers.username}\nREPO_NAME=${answers.repo}\nDEFAULT_LANGUAGE=${answers.defaultLanguage}\n`;
  
  fs.writeFileSync(envPath, envContent);
  
  console.log("\n✅ Setup complete! Now run: npm start");
}

setup();
