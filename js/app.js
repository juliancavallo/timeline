import { loadInfo } from './functions.js'

export let offset = 0;
export let range = parseInt(document.querySelector('#range').value);

window.addEventListener("resize", () => loadInfo());

document.getElementById("btnForward").addEventListener("click", () => {
    offset++;
    loadInfo();
});

document.getElementById("btnBack").addEventListener("click", () => {
    offset--;
    offset = Math.max(offset, 0);
    loadInfo();
});

document.querySelector("#range").addEventListener('change', (e) => {
    range = parseInt(document.querySelector("#range").value);
    loadInfo();
});

loadInfo();