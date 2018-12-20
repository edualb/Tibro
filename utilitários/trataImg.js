const { createCanvas, loadImage } = require('canvas')
const fs = require("fs");

async function bufferImg(url) {
    var canvas = createCanvas(200, 200, "png");
    var ctx = canvas.getContext("2d");
    await loadImage(url).then((image) => {
        ctx.drawImage(image, 0, 0, 150, 150)
    });
    return canvas.toBuffer();
}

module.exports = { bufferImg };