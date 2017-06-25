export function showText(text, id) {
    const div = document.getElementById(id);
    div.innerText = text;
}
showText("I am from module.js", 'module');

export class main {
    showText(text, id) {
        const div = document.getElementById(id);
        div.innerText = text;
    }
}
