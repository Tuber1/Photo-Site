document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('imageGrid');

    fetch('/api/images')
        .then(response => response.json())
        .then(images => {
            images.forEach(filename => {
                const img = document.createElement('img');
                img.src = `images/${filename}`;
                imageGrid.appendChild(img);
            });
        })
        .catch(error => console.error('Error loading images:', error));
});