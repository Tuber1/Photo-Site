document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('imageGrid');
    const baseURL = 'https://raw.githubusercontent.com/Tuber1/Photo-Site/main/public/images/'; // Ensure this URL is correct

    fetch('/api/images')
        .then(response => response.json())
        .then(images => {
            images.forEach(filename => {
                const img = document.createElement('img');
                img.src = `${baseURL}${filename}`;
                imageGrid.appendChild(img);
            });
        })
        .catch(error => console.error('Error loading images:', error));
});


document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImage) {
            lightbox.style.display = 'none';
        }
    });
}