const fs = require('fs');
const path = require('path');

// Lista de arquivos que podem ter sido afetados
const filesToFix = [
  'src/pages/LoginPage.js',
  'src/pages/PetPage.js',
  'src/pages/PetForm.js',
  'src/pages/TutorPage.js',
  'src/pages/TutorForm.js',
  'src/pages/ClinicPage.js',
  'src/pages/ClinicForm.js',
  'src/pages/Collaborator.js',
  'src/pages/CollaboratorForm.js',
  'src/pages/AtendimentoPage.js',
  'src/pages/AtendimentoForm.js',
  'src/pages/RelatoriosPage.js'
];

// 1. Regex para encontrar a definição errada (que chama a si mesma)
// Procura por: const API_BASE_URL = ... || `${API_BASE_URL}`
const wrongDefinitionRegex = /const\s+API_BASE_URL\s*=\s*process\.env\.REACT_APP_API_URL\s*\|\|\s*[`'"]\$\{API_BASE_URL\}[`'"];?/g;

// 2. A definição CORRETA
const correctDefinition = "const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';";

filesToFix.forEach(relativePath => {
  const filePath = path.join(__dirname, relativePath);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Arquivo não encontrado: ${relativePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let fixed = false;

  // Se encontrar a definição recursiva/errada, substitui pela correta
  if (wrongDefinitionRegex.test(content)) {
    content = content.replace(wrongDefinitionRegex, correctDefinition);
    fixed = true;
  } 
  // Caso o script anterior tenha colocado aspas estranhas ou algo diferente,
  // vamos garantir forçando a substituição se a linha existir mas estiver diferente
  else if (content.includes('const API_BASE_URL = process.env.REACT_APP_API_URL ||')) {
      // Regex genérico para substituir qualquer coisa que venha depois do || nessa linha
      const genericFixRegex = /(const\s+API_BASE_URL\s*=\s*process\.env\.REACT_APP_API_URL\s*\|\|\s*)(.*)(;?)/;
      
      content = content.replace(genericFixRegex, (match, prefix, suffix) => {
          // Se o sufixo já for o correto, não faz nada
          if (suffix.includes("'http://localhost:8080'")) return match;
          
          // Se não for o correto (ex: for template string recursiva), corrige
          return `${prefix}'http://localhost:8080';`;
      });
      fixed = true;
  }

  if (fixed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Corrigido: ${relativePath}`);
  } else {
    console.log(`👍 OK (sem erro detectado): ${relativePath}`);
  }
});

console.log('\n🚀 Correção finalizada! Tente iniciar o projeto novamente com "npm start".');