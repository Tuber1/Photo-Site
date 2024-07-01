document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('imageGrid');
    const baseURL = 'https://raw.githubusercontent.com/Tuber1/Photo-Site/main/public/images/';

    fetch('/public/images')
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
