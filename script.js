let GRID_SIZE = 16;
let mouseDown = false;
let penColor = `#000000`;
let isRainbow = false;
//let isErase = false;

const grid = document.getElementById('grid');
const slider = document.getElementById('size-slider');
const value = document.getElementById('value');
const position = document.getElementById('position');
const colorWheel = document.getElementById('color-wheel');
const rainbow = document.getElementById('rainbow');
//const erase = document.getElementById('erase');

document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
slider.onchange = (e) => updateSize(e.target.value);
slider.onmousemove = (e) => updateValue(e.target.value);
colorWheel.oninput = (e) => updateColor(e.target.value);
rainbow.onclick = () => toggleRainbow();
//erase.onclick = () => toggleErase();

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

function draw(e) {
    if (mouseDown) {
        if(isRainbow) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
        } else {
            e.target.style.backgroundColor = penColor;
        }
    }
}

function updateColor(newColor) {
    penColor = newColor;
}

function toggleRainbow() {
    isRainbow = !isRainbow;
}

function createGrid (v) {
    grid.style.gridTemplateRows = `repeat(${v}), 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${v}, 1fr)`;

    for(let i = 0; i < v*v; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add("grid-element");
        gridElement.addEventListener('mouseover', draw);
        grid.appendChild(gridElement);
    }
}

window.onload = () => {
    createGrid(GRID_SIZE);
}