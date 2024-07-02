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
            images = shuffleArray(data); // Shuffle the array of images
            images.forEach((filename, index) => {
                const img = document.createElement('img');
                img.src = `${baseURL}${filename}`;
                img.alt = filename;
                img.dataset.index = index;
                img.addEventListener('click', () => {
                    currentIndex = index;
                    showLightbox(img.src);
                });
                imageGrid.appendChild(img);
            });
        })
        .catch(error => console.error('Error loading images:', error));

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImage) {
            hideLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('show')) {
            if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % images.length;
                showLightbox(`${baseURL}${images[currentIndex]}`);
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showLightbox(`${baseURL}${images[currentIndex]}`);
            } else if (e.key === 'Escape') {
                hideLightbox();
            }
        }
    });

    function showLightbox(src) {
        lightboxImage.src = src;
        lightbox.classList.add('show');
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10); // Ensure transition is triggered
    }

    function hideLightbox() {
        lightbox.style.opacity = '0';
        lightbox.addEventListener('transitionend', () => {
            lightbox.classList.remove('show');
        }, { once: true });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});