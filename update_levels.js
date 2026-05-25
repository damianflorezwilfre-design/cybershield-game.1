const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'frontend/src/data/levels.ts');
let content = fs.readFileSync(p, 'utf8');

content = content.replace(
  "export interface LevelData {",
  "export interface LevelData {\n  difficulty: 'Principiante' | 'Medio';"
);

content = content.replace(/id:\s*(\d+),\s*title:/g, (match, idStr) => {
  const id = parseInt(idStr, 10);
  const diff = id <= 12 ? 'Principiante' : 'Medio';
  return `id: ${id},\n    difficulty: "${diff}",\n    title:`;
});

fs.writeFileSync(p, content, 'utf8');
console.log("Done");
