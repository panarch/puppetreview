const fs = require('fs');
const Jimp = require('jimp');

class Review {
  constructor({ blessedPath, currentPath, resultPath }) {
    this.blessedPath = blessedPath;
    this.currentPath = currentPath;
    this.resultPath = resultPath;
  }

  async runDiff(name) {
    const blessedFullPath = `${ this.blessedPath }/${ name }`;
    const currentFullPath = `${ this.currentPath }/${ name }`;

    const result = await Jimp.diff(
      await Jimp.read(blessedFullPath),
      await Jimp.read(currentFullPath)
    );

    console.log(`[${ name }] \t diff rate: \t ${ (result.percent * 100).toFixed(2) }%`);

    if (result.percent > 0.01) {
      result.image.write(`${ this.resultPath }/${ name }`);
    }
  }

  run() {
    const review = this;

    describe('Review', function () {
      this.timeout(10000);

      it('Diff images', async () => {
        const names = fs.readdirSync(review.currentPath);

        for (const name of names) {
          await review.runDiff(name);
        }
      });
    });
  }
}

module.exports = Review;
