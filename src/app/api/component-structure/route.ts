// src/app/api/component-structure/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Путь к директории компонентов относительно корня проекта
const componentsDir = path.join(process.cwd(), 'src', 'components');

// Поддерживаемые расширения файлов компонентов
const componentExtensions = ['.tsx', '.jsx', '.ts', '.js'];

export async function GET() {
  try {
    const structure = await scanDirectory(componentsDir);
    return NextResponse.json(structure);
  } catch (error) {
    console.error('Error generating component structure:', error);
    return NextResponse.json(
      { error: 'Failed to analyze components' }, 
      { status: 500 }
    );
  }
}

// Функция для рекурсивного сканирования директорий
async function scanDirectory(dirPath) {
  try {
    const entries = await fs.promises.readdir(dirPath);
    const result = {};
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry);
      const entryStats = await fs.promises.stat(fullPath);
      
      if (entryStats.isDirectory()) {
        // Рекурсивно сканируем поддиректории
        result[entry] = await scanDirectory(fullPath);
      } else if (componentExtensions.includes(path.extname(entry))) {
        // Анализируем файл компонента
        const componentInfo = await analyzeComponent(fullPath);
        result[entry] = componentInfo;
      }
    }
    
    return result;
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
    return { error: error.message };
  }
}

// Функция для анализа файла компонента
async function analyzeComponent(filePath) {
  try {
    const content = await fs.promises.readFile(filePath, 'utf8');
    
    // Проверяем, экспортирует ли файл компонент
    const isComponent = /export\s+(default\s+)?(function|const|class)\s+\w+/.test(content);
    
    // Определяем тип компонента
    let componentType = 'Unknown';
    if (content.includes('use client')) {
      componentType = 'Client Component';
    } else if (!content.includes('useState') && !content.includes('useEffect') && 
               !content.includes('useContext') && !content.includes('useRef')) {
      componentType = 'Server Component';
    }
    
    // Ищем импорты
    const importRegex = /import\s+(?:{[^}]*}|\w+)\s+from\s+['"]([^'"]+)['"]/g;
    const dependencies = [];
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      dependencies.push(match[1]);
    }
    
    // Определяем пропсы компонента
    const propsRegex = /interface\s+(\w+Props)\s*{([^}]*)}/;
    const propsMatch = propsRegex.exec(content);
    let props = [];
    if (propsMatch) {
      props = propsMatch[2].split(';')
        .map(line => line.trim())
        .filter(line => line);
    }
    
    return {
      type: componentType,
      isExported: isComponent,
      size: content.length,
      dependencies: dependencies,
      props: props,
    };
  } catch (error) {
    console.error(`Error analyzing component ${filePath}:`, error);
    return { error: error.message };
  }
}