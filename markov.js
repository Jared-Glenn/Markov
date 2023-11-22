const axios = require('axios');
const fs = require("fs");


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

    let currentWord = randomProp(this.chains);
    let finalString = "";
    
    for (let i = 0; i < numWords - 1; i += 1) {
      if (!currentWord) {
        return finalString;
      }
      finalString = `${finalString}${currentWord} `
      currentWord = this.chains[currentWord][(Math.random() * this.chains[currentWord].length) | 0];
    }
    return finalString;
  }
}

const randomProp = (obj) => Object.keys(obj)[(Math.random() * Object.keys(obj).length) | 0];

const getUrlText = async (url) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }

    const response = await axios.get(url);
    const mm = new MarkovMachine(response.data);
    console.log(mm.makeText());
    return;
}


const argv = process.argv;
const infoType = argv[argv.length-2];
const path = argv[argv.length-1];

if (infoType === "url") {
    getUrlText(path);
}
else {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    const mm = new MarkovMachine(data);
    console.log(mm.makeText());
  })
}


module.exports = MarkovMachine;