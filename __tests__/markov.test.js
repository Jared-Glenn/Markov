const MarkovMachine = require("../markov");
const fs = require("fs");
const axios = require('axios');

describe("makeChains function", function() {

    test('makes an object with arrays for each word', function() {
        const mm = new MarkovMachine("cat in the hat");
        const list = ["cat", "in", "the", "hat"];
        let check = true;

        for (let i = 0; i < 4; i += 1) {
            if ((typeof mm.chains[(list[i])]) !== "object") {
                check = false;
            }
        }
        expect(check).toEqual(true);
    })

    test('correctly includes each word that follows a given word', function() {
        const mm = new MarkovMachine("am I am you am we");

        expect(mm.chains["am"]).toEqual(["I", "you", "we"]);
    })
})

describe("makeText function", function() {

    test("makes text no longer than 100 words", function() {

        fs.readFile('./eggs.txt', 'utf8', function(err, data) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        const mm = new MarkovMachine(data);
        const textLength = text.length;

        expect(textLength).not.toBeGreaterThan(100);
        })
    })
    test("words follow the proper words", function() {

        fs.readFile('./eggs.txt', 'utf8', function(err, data) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        const mm = new MarkovMachine(data);
        const text = mm.makeText;
        const textList = text.split(/[ \r\n]+/);
        
        expect(mm.chains[textList[0]]).toContain(textList[1]);
        expect(mm.chains[textList[8]]).toContain(textList[9]);
        expect(mm.chains[textList[13]]).toContain(textList[14]);
        expect(mm.chains[textList[59]]).toContain(textList[60]);
        expect(mm.chains[textList[75]]).toContain(textList[76]);
        })
    })
})