function createGrid () {
    grid.style.gridTemplateRows = `repeat(16, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(16, 1fr)`;

    for(let i = 0; i < 256; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add("grid-element");
        gridElement.addEventListener('mouseover', changeColor = (e) => {
            e.target.style.backgroundColor = '#ffffff';
        });
        grid.appendChild(gridElement);
    }
}

window.onload = () => {
    createGrid();
}