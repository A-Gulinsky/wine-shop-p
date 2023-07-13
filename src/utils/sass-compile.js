import sass from 'node-sass';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve()

export function compileSass() {
  const srcPath = path.join(__dirname, 'public', 'sass');
  const destPath = path.join(__dirname, 'public', 'css');

  // Recursive function to traverse all files and folders within a folder
  const processFiles = (folderPath) => {
    
    // Get a list of all files and folders inside the folder    
    const files = fs.readdirSync(folderPath);

    // Traverse all files and folders within a folder
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      if (fs.statSync(filePath).isDirectory()) {
        
        // If this is a folder, then call the same function to process the files inside it  
        processFiles(filePath);
      } else if (path.extname(filePath) === '.scss') {
        
        // If this is a .scss file, then compile it to css and save it in the target folder
        const relativePath = path.relative(srcPath, filePath);
        const destFile = path.join(destPath, relativePath.replace(/\.scss$/, '.css'));

        sass.render(
          {
            file: filePath,
            outputStyle: 'compressed',
          },
          (err, result) => {
            if (err) throw err;

            fs.mkdirSync(path.dirname(destFile), { recursive: true });
            fs.writeFileSync(destFile, result.css);
          }
        );
      }
    });
  };

  processFiles(srcPath);
}