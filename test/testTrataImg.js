const monstro = require('./monstro.json');
const trataImg = require('../utilitários/trataImg.js');
const assert = require('assert');

describe('Test trataImg.js', () => {
    describe('test functions of trataImg.js', () => {
      it('bufferImg is not empty', () => {
        let buffer = trataImg.bufferImg(monstro.img)
        assert(buffer != null, 'buffer is empty')
      });
      it('bufferImg needs return a Buffer', async () => {
        let buffer = await trataImg.bufferImg(monstro.img)
        assert.deepEqual(Buffer.isBuffer(buffer), true);
      });
    });
});