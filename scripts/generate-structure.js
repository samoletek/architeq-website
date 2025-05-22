#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

// Configuration for directories and files to ignore
const IGNORE_PATTERNS = [
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
  '.DS_Store',
  'Thumbs.db',
  '.vscode',
  '.idea',
  '*.log',
  '.env',
  '.env.local',
  '.env.production',
  '.env.development',
  'coverage',
  '.nyc_output',
  '.cache',
  'tmp',
  'temp'
];

// File extensions to include (empty array means include all)
const INCLUDE_EXTENSIONS = [];

// Maximum depth to scan (0 = no limit)
const MAX_DEPTH = 0;

/**
 * Check if a file or directory should be ignored
 */
function shouldIgnore(name, isDirectory = false) {
  return IGNORE_PATTERNS.some(pattern => {
    if (pattern.includes('*')) {
      // Handle wildcard patterns
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      return regex.test(name);
    }
    return name === pattern || name.startsWith(pattern);
  });
}

/**
 * Check if file extension should be included
 */
function shouldIncludeFile(filename) {
  if (INCLUDE_EXTENSIONS.length === 0) return true;
  const ext = path.extname(filename).toLowerCase();
  return INCLUDE_EXTENSIONS.includes(ext);
}

/**
 * Generate tree structure for a directory
 */
async function generateTree(dirPath, prefix = '', depth = 0) {
  if (MAX_DEPTH > 0 && depth > MAX_DEPTH) return '';
  
  let result = '';
  
  try {
    const items = await fs.readdir(dirPath, { withFileTypes: true });
    
    // Filter and sort items
    const filteredItems = items
      .filter(item => !shouldIgnore(item.name, item.isDirectory()))
      .filter(item => item.isDirectory() || shouldIncludeFile(item.name))
      .sort((a, b) => {
        // Directories first, then files
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        return a.name.localeCompare(b.name);
      });

    for (let i = 0; i < filteredItems.length; i++) {
      const item = filteredItems[i];
      const isLast = i === filteredItems.length - 1;
      const currentPrefix = isLast ? '└── ' : '├── ';
      const nextPrefix = isLast ? '    ' : '│   ';
      
      result += `${prefix}${currentPrefix}${item.name}`;
      
      if (item.isDirectory()) {
        result += '/\n';
        const subPath = path.join(dirPath, item.name);
        const subTree = await generateTree(subPath, prefix + nextPrefix, depth + 1);
        result += subTree;
      } else {
        result += '\n';
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
  }
  
  return result;
}

/**
 * Generate complete project structure
 */
async function generateProjectStructure(projectPath) {
  const projectName = path.basename(projectPath);
  let structure = `# Project structure ${projectName}\n\n`;
  structure += `\`\`\`\n${projectName}/\n`;
  
  const tree = await generateTree(projectPath);
  structure += tree;
  structure += `\`\`\`\n\n`;
  
  // Add generation timestamp
  const timestamp = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Kyiv',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  structure += `*Structure has been updated automatically: ${timestamp}*\n`;
  
  return structure;
}

/**
 * Main function to update structure.md
 */
async function updateStructureFile() {
  try {
    const projectPath = process.cwd();
    const structureFilePath = path.join(projectPath, 'structure.md');
    
    console.log('Scanning...');
    const structure = await generateProjectStructure(projectPath);
    
    console.log('Updating structure.md...');
    await fs.writeFile(structureFilePath, structure, 'utf8');
    
    console.log('structure.md successfuly updated!');
    console.log(`Address: ${structureFilePath}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  updateStructureFile();
}

module.exports = {
  generateProjectStructure,
  updateStructureFile
};