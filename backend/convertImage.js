const fs = require('fs');
const path = require('path');

/**
 * Convertit une image locale en chaîne Base64
 * @param {string} fileName - Le nom du fichier (ex: 'reine_lycee.jpg')
 * @returns {string} - La chaîne Base64 complète
 */
function encodeImageToBase64(fileName) {
    // 1. Définir le chemin de l'image
    const filePath = path.join(__dirname, 'assets/posters', fileName);
    
    // 2. Lire le fichier en format binaire (buffer)
    const imageBuffer = fs.readFileSync(filePath);
    
    // 3. Convertir le buffer en chaîne Base64
    const base64String = imageBuffer.toString('base64');
    
    // 4. Ajouter le préfixe pour que le navigateur (React) le reconnaisse
    const extension = path.extname(fileName).replace('.', '');
    return `data:image/${extension};base64,${base64String}`;
}

// Exemple d'utilisation
const base64Image = encodeImageToBase64('la_reine_du_lycee.jpg');
console.log(base64Image); // C'est ce texte géant que tu inséreras dans ta DB