const DEFAULT_BTN_COLOR = `#EAFFE6`;
const USING_BTN_COLOR = `#B4FFA5`;

let GRID_SIZE = 16;
let mouseDown = false;
let penColor = `#000000`;
let isRainbow = false;
let isErase = false;

const grid = document.getElementById('grid');
const slider = document.getElementById('size-slider');
const value = document.getElementById('value');
const position = document.getElementById('position');
const colorWheel = document.getElementById('color-wheel');
const rainbow = document.getElementById('rainbow');
const erase = document.getElementById('erase');
const clear = document.getElementById('clear');

document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
slider.onchange = (e) => updateSize(e.target.value);
slider.onmousemove = (e) => updateValue(e.target.value);
colorWheel.oninput = (e) => updateColor(e.target.value);
rainbow.onclick = () => toggleRainbow();
erase.onclick = () => toggleErase();
clear.onclick = () => clearBoard();

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
    if (e.type === 'mouseover' && !mouseDown) return;
        if(isRainbow) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
        } else if (isErase) {
            e.target.style.backgroundColor = `rgb(251, 246, 240)`;
        } else {
            e.target.style.backgroundColor = penColor;
        }   
}

function updateColor(newColor) {
    if(isErase) toggleErase();
    if(isRainbow) toggleRainbow();
    penColor = newColor;
}

function toggleRainbow() {
    if (isErase) {
        toggleErase();
    }
    if (isRainbow) rainbow.style.backgroundColor = DEFAULT_BTN_COLOR; 
    else rainbow.style.backgroundColor = USING_BTN_COLOR;
    isRainbow = !isRainbow;
}

function toggleErase() {
    if (isRainbow) {
        toggleRainbow();
    }
    if (isErase) erase.style.backgroundColor = DEFAULT_BTN_COLOR;
    else erase.style.backgroundColor = USING_BTN_COLOR;
    isErase = !isErase;
}

function clearBoard() {
    reloadGrid(GRID_SIZE);
}

function createGrid (v) {
    grid.style.gridTemplateRows = `repeat(${v}), 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${v}, 1fr)`;

    for(let i = 0; i < v*v; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add("grid-element");
        gridElement.addEventListener('mousedown', draw);
        gridElement.addEventListener('mouseover', draw);
        grid.appendChild(gridElement);
    }
}

window.onload = () => {
    createGrid(GRID_SIZE);
}