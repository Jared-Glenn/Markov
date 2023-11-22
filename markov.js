/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};

    for (let i = 0; i < (this.words).length; i += 1) {
      const currentWord = this.words[i];
      const nextWord = this.words[i + 1] || null;

      if (!this.chains[currentWord]) {
        this.chains[currentWord] = [];
      }

      this.chains[currentWord].push(nextWord);
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
  }
}
