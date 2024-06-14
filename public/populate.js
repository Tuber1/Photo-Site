document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('imageGrid');
    const imageFolder = 'images/';

    fetch(imageFolder)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, 'text/html');
            const imageElements = htmlDoc.querySelectorAll('a');
            imageElements.forEach(link => {
                const href = link.getAttribute('href');
                if (href.endsWith('.jpeg') || href.endsWith('.png') || href.endsWith('.gif') || href.endsWith('.jpg')) {
                    const img = document.createElement('img');
                    img.src = `${imageFolder}${href}`;
                    imageGrid.appendChild(img);
                }
            });
        })
        .catch(error => console.error('Error loading images:', error));
});