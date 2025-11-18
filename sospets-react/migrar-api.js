const fs = require('fs');
const path = require('path');

// Lista dos arquivos que identificamos que precisam de alteração
const filesToUpdate = [
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

const API_CONST_DECLARATION = `
// Configuração da URL da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
`;

filesToUpdate.forEach(relativePath => {
  const filePath = path.join(__dirname, relativePath);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Arquivo não encontrado (pulando): ${relativePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // 1. Inserir a constante API_BASE_URL se ela ainda não existir
  if (!content.includes('const API_BASE_URL')) {
    // Encontra o último 'import ...;' e insere depois dele
    const lastImportRegex = /import .*?;(?=[^import]*$)/s; 
    // (Regex simplificado: procura o último 'import' e o ponto e vírgula)
    
    const lastImportMatch = content.match(/import[\s\S]*?;/g);
    
    if (lastImportMatch) {
      const lastImport = lastImportMatch[lastImportMatch.length - 1];
      // Substitui a última ocorrência do import por ela mesma + a declaração
      const lastIndex = content.lastIndexOf(lastImport);
      if (lastIndex !== -1) {
        const insertPos = lastIndex + lastImport.length;
        content = content.slice(0, insertPos) + '\n' + API_CONST_DECLARATION + content.slice(insertPos);
        updated = true;
      }
    } else {
      // Se não achar imports, coloca no topo
      content = API_CONST_DECLARATION + '\n' + content;
      updated = true;
    }
  }

  // 2. Substituir URLs Hardcoded por Template Literals
  // Procura por: 'http://localhost:8080...' ou "http://..." ou `http://...`
  // Captura o que vem depois do 8080 até fechar as aspas
  const urlRegex = /(['"`])http:\/\/localhost:8080(.*?)\1/g;

  if (urlRegex.test(content)) {
    content = content.replace(urlRegex, (match, quote, path) => {
      // Transforma em: `${API_BASE_URL}/caminho`
      return "`" + "${API_BASE_URL}" + path + "`";
    });
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Atualizado: ${relativePath}`);
  } else {
    console.log(`ℹ️ Sem alterações necessárias: ${relativePath}`);
  }
});

console.log('\n🚀 Migração concluída! Tente rodar o projeto.');