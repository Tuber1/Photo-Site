document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('imageGrid');
    const baseURL = 'https://raw.githubusercontent.com/Tuber1/Photo-Site/main/public/images/'; 
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    let images = [];
    let currentIndex = 0;
    let startX = 0;
    let endX = 0;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    fetch('/api/images')
        .then(response => response.json())
        .then(data => {
            images = shuffleArray(data); // Shuffle the array of images
            images.forEach((filename, index) => {
                const img = document.createElement('img');
                img.src = `${baseURL}${filename}`;
                img.alt = filename;
                img.dataset.index = index;
                img.loading = 'lazy';
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

    if (isMobile) {
        lightbox.addEventListener('touchstart', handleTouchStart, false);
        lightbox.addEventListener('touchmove', handleTouchMove, false);
    }

    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
    }

    function handleTouchMove(e) {
        if (!startX) {
            return;
        }

        endX = e.touches[0].clientX;

        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) { // Minimum threshold for swipe
            if (diffX > 0) {
                // Swipe left
                currentIndex = (currentIndex + 1) % images.length;
                showLightbox(`${baseURL}${images[currentIndex]}`);
            } else {
                // Swipe right
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showLightbox(`${baseURL}${images[currentIndex]}`);
            }
            startX = 0;
            endX = 0;
        }
    }

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