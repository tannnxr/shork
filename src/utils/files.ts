import { readdir, stat } from "fs/promises";
import path from "path";
async function getFilesRecursively(directory: string): Promise<string[]> {
  const files = await readdir(directory);
  const filePaths = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directory, file);
      const fileStat = await stat(filePath);
      if (fileStat.isDirectory()) {
        return getFilesRecursively(filePath);
      } else {
        return filePath;
      }
    })
  );
  return filePaths.flat();
}

export { getFilesRecursively };
