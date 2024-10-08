export function generateDataset(data, catch_data, seed, realTrialsLength, catchLength) {
    // Split in buckets
    const dataBuckets = buildBucketsBuckets(data, seed, realTrialsLength, 2)
    const catchBuckets = buildBucketsBuckets(catch_data, seed, catchLength, 1)
    
    // Make step trials
    const contatenatedArrays = concatenateArrays(dataBuckets,catchBuckets)

    const shuffleItem = (e) => {
        return shuffleArray(e, seed)
    } 

    const shuffledConcatenadArrays = contatenatedArrays.map(shuffleItem)

    return shuffledConcatenadArrays.flat();
}

function buildBucketsBuckets(data, seed, bucketSize, meaningRange) {
    const rng = new RNG(seed);
    const processedData = [];
    const ars = rng.random_array(data.length)

    for (let i = 0; i < data.length; i++) {
        const e = data[i];
        //const meaningID = rng.nextRange(0, meaningRange);
        const meaningID = data.length < 40 ? 0 : ars[i];
        const trial = e.meanings[meaningID];
        
        processedData.push({
            wordID: e.wordID,
            word: e.word,
            meaningID: meaningID,
            context: trial.context,
            words: shuffleArray(trial.words, seed * (i + 1))
        });
    }

    return splitArrayByLength(shuffleArray(processedData, seed), bucketSize);
}

export function processJson(data, catchData, jsonWithX) {
    const result = [];

    jsonWithX.forEach((item) => {
      const wordId = item.w;
      const idx = item.i;
      const meaningId = item.m;
  
      // Determine the correct object based on wordID
      const obj = wordId >= 60 ? catchData[idx] : data[idx];
  
      const word = obj.word;
      const meaning = obj.meanings[meaningId];
      const context = meaning.context;
      const words = meaning.words;
  
      // Order the words according to the indices in 'x'
      const orderedWords = item.x.map(index => words[index]);
  
      // Append the formatted result
      result.push({
        wordID: wordId,
        word: word,
        meaningID: meaningId,
        context: context,
        words: orderedWords,
      });
    });
  
    return result;
}

function splitArrayByLength(A, l) {
    const B = [];
    for (let i = 0; i < A.length; i += l) {
        B.push(A.slice(i, i + l));
    }
    return B;
}

function concatenateArrays(A, B) {
    const maxLength = Math.max(A.length, B.length);
    const C = [];

    for (let i = 0; i < maxLength; i++) {
        const arrA = A[i] || [];
        const arrB = B[i] || [];
        C.push(arrA.concat(arrB));
    }

    return C;
}


class RNG {
    constructor(seed) {
        this.m = 0x80000000; // 2**31;
        this.a = 1103515245;
        this.c = 12345;

        this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
    }

    nextInt() {
        this.state = (this.a * this.state + this.c) % this.m;
        return this.state;
    }

    nextFloat() {
        return this.nextInt() / (this.m - 1);
    }

    nextRange(start, end) {
        var rangeSize = end - start;
        var randomUnder1 = this.nextInt() / this.m;
        return start + Math.floor(randomUnder1 * rangeSize);
    }

    choice(array) {
        return array[this.nextRange(0, array.length)];
    }

    random_array(length) {
        const res = []
        for (let index = 0; index < length; index++) {
            res.push(this.nextRange(0,2))    
        }
        return res
    } 
}


function shuffleArray(unshuffled, seed) {
    const rng = new RNG(seed);
    return unshuffled
        .map(value => ({ value, sort: rng.nextFloat() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}
