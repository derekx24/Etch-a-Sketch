let GRID_SIZE = 16;

const grid = document.getElementById('grid');
const slider = document.getElementById('size-slider');
const value = document.getElementById('value');
const position = document.getElementById('position');

slider.onchange = (e) => updateSize(e.target.value);
slider.onmousemove = (e) => updateValue(e.target.value);

function reloadGrid() {
    grid.innerHTML = '';
    createGrid(GRID_SIZE);
}

function updateSize(v) {
    GRID_SIZE = v;
    reloadGrid();
}

function updateValue(v) {
    position.style.width = `${v}%`;
    value.innerHTML = `${v} x ${v}`
}

function createGrid (v) {
    grid.style.gridTemplateRows = `repeat(${v}), 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${v}, 1fr)`;

    for(let i = 0; i < v*v; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add("grid-element");
        gridElement.addEventListener('mouseover', changeColor = (e) => {
            e.target.style.backgroundColor = `#000000`;
        });
        grid.appendChild(gridElement);
    }
}

window.onload = () => {
    createGrid(GRID_SIZE);
}