document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('imageGrid');
    const baseURL = 'https://raw.githubusercontent.com/Tuber1/Photo-Site/main/public/images/'; 
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    let images = [];
    let currentIndex = 0;

    fetch('/api/images')
        .then(response => response.json())
        .then(data => {
            images = data;
            images.forEach((filename, index) => {
                const img = document.createElement('img');
                img.src = `${baseURL}${filename}`;
                img.alt = filename;
                img.dataset.index = index;
                img.addEventListener('click', () => {
                    currentIndex = index;
                    lightboxImage.src = img.src;
                    lightbox.classList.add('show');
                });
                imageGrid.appendChild(img);
            });
        })
        .catch(error => console.error('Error loading images:', error));

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImage) {
            lightbox.classList.remove('show');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('show')) {
            if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % images.length;
                lightboxImage.src = `${baseURL}${images[currentIndex]}`;
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                lightboxImage.src = `${baseURL}${images[currentIndex]}`;
            } else if (e.key === 'Escape') {
                lightbox.classList.remove('show');
            }
        }
    });
});