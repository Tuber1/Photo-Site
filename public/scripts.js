document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('imageGrid');
    const baseURL = 'https://github.com/Tuber1/Photo-Site/tree/main/public/Images';

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
