const { createCanvas, loadImage } = require('canvas')
const fs = require("fs");

async function carregaImg(url, path) {
    var canvas = createCanvas(200, 200, "png");
    var ctx = canvas.getContext("2d");
    await loadImage(url).then((image) => {
        ctx.drawImage(image, 0, 0, 150, 150)
    });
    var buf = canvas.toBuffer();
    fs.writeFileSync(path, buf);
}

function criaPastaImg() {
    if (!fs.existsSync('./img')) fs.mkdirSync('./img');
    if (!fs.existsSync('./img/drops')) fs.mkdirSync('./img/drops');
}

module.exports = { criaPastaImg, carregaImg };