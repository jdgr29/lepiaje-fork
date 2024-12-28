import fs from 'fs';
import path from 'path';

export function getImages(folderName: string) {
    const imageDirectory = path.join(process.cwd(), 'public', `assets/${folderName}`)
    const imageFilenames = fs.readdirSync(imageDirectory)

    return imageFilenames.map(filename => `/assets/${folderName}/${filename}`)
}