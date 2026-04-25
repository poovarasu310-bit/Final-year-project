const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}
const files = walk('src');
let changed = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Match `import something from "package@1.2.3"` -> `import something from "package"`
  // Match `@radix-ui/react-dialog@1.1.6` => `@radix-ui/react-dialog`
  const repl = content.replace(/(from ['"])(@?[a-zA-Z0-9\-_]+(?:\/[a-zA-Z0-9\-_]+)*)@[0-9\.]+(-[a-zA-Z0-9]+)?(['"])/g, '$1$2$4');
  if(repl !== content) {
    fs.writeFileSync(file, repl);
    console.log('Fixed ' + file);
    changed++;
  }
});
console.log('Total fixed: ' + changed);
