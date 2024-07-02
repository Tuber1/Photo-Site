document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('imageGrid');
    const baseURL = 'https://raw.githubusercontent.com/Tuber1/Photo-Site/main/public/images/'; 
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');

    fetch('/api/images')
        .then(response => response.json())
        .then(images => {
            images.forEach(filename => {
                const img = document.createElement('img');
                img.src = `${baseURL}${filename}`;
                img.alt = filename;
                img.addEventListener('click', () => {
                    lightboxImage.src = img.src;
                    lightbox.style.display = 'flex';
                });
                imageGrid.appendChild(img);
            });
        })
        .catch(error => console.error('Error loading images:', error));

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImage) {
            lightbox.style.display = 'none';
        }
    });
});