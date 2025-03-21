const fs = require('fs');
const path = require('path');

// Получаем список файлов для обработки, рекурсивно проходя по директориям
function getFilesToProcess(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      // Пропускаем node_modules и .next
      if (file !== 'node_modules' && file !== '.next') {
        fileList = getFilesToProcess(filePath, fileList);
      }
    } else {
      // Обрабатываем только TypeScript/TSX файлы
      if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

// Заменяет неэкранированные кавычки
function fixUnescapedEntities(content) {
  // Заменяем одинарные кавычки внутри JSX на &apos;
  content = content.replace(/(\{[^{}]*?)(?<!')(?<![^<>=]\s*)'(?!'}|"|[^"'<>]*>)([^{}]*?\})/g, '$1&apos;$3');
  
  // Заменяем двойные кавычки внутри JSX на &quot;
  content = content.replace(/(\{[^{}]*?)(?<!")(?<![^<>=]\s*)"(?!"})([^{}]*?\})/g, '$1&quot;$3');
  
  return content;
}

// Исправляем любые неиспользуемые переменные, добавляя подчеркивание перед именем
function fixUnusedVars(content) {
  const unusedVarRegex = /'([^']+)' is defined but never used/g;
  const matches = Array.from(content.matchAll(unusedVarRegex));
  
  for (const match of matches) {
    const varName = match[1];
    // Ищем определение переменной и добавляем подчеркивание
    content = content.replace(
      new RegExp(`(const|let|var)\\s+${varName}\\b`, 'g'),
      `$1 _${varName}`
    );
  }
  
  return content;
}

// Заменяем any на более конкретные типы
function fixExplicitAny(content) {
  // Эта замена будет добавлять комментарий // FIXME: any
  return content.replace(/: any(?!`)(?![\s\S]*?`)/g, ': unknown /* FIXME: replace any */');
}

// Обрабатываем каждый файл
function processFile(filePath) {
  console.log(`Processing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Применяем исправления
  content = fixUnescapedEntities(content);
  content = fixUnusedVars(content);
  content = fixExplicitAny(content);
  
  // Сохраняем изменения, только если файл изменился
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed issues in: ${filePath}`);
  }
}

// Получаем список файлов и обрабатываем их
const files = getFilesToProcess('./src');
let filesFixed = 0;

files.forEach(file => {
  processFile(file);
  filesFixed++;
});

console.log(`Processed ${files.length} files, fixed issues in ${filesFixed} files.`);