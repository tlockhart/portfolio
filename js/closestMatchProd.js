
function Dictionary(words) {
  this.words = words;
  this.vowelsMap = new Map();
  this.similarWordsMap = new Map();
}

Dictionary.prototype.findMostSimilar = function (term) {
  // Reset any previous values:
  resetInstanceVars(this.words, this.vowelsMap, this.similarWordsMap);

  // check if word and term match exactly with find
  const matchFound = this.words.find(word => {
    const found = (term.toLowerCase().split(" ").join('') === word.toLowerCase().split(" ").join('')) ? true : false;
    return found;
  });

  if (!term) {
    // do nothing
  } 
  else if (matchFound) {
    return term;
  }
  // check if the term is a subset of any of the words and make a new array.
  // If no direct match 
  else if (!matchFound) {
    const substrings = term.split(" ");
    const subStringMatches = inArray(substrings, this.words);
    
    // check if a substring exists in the word between spaces
    if (subStringMatches.length > 0) {
      return this.createVowelsCountMapByWord(subStringMatches, term);
    }
    // find the closes matching word
    else {
      return this.createVowelsCountMapByWord(this.words, term);
    }
  }
};

Dictionary.prototype.createVowelsCountMapByWord = function (words, term) {

  // find first vowel
  const regex = /[aeiou]/i;
  //find length
  //find all, occurrences of the vowel in the term
  const termVowel = term.match(regex)[0];
  for (let idx = 0; idx < words.length; idx++) {
      // find words that include the vowel;
      let wordIncludesVowel = words[idx].includes(termVowel);
      if (wordIncludesVowel) {
        const key = (words[idx]);
        const currentValue = this.vowelsMap.has(words[idx]);
        if (currentValue) {
          this.vowelsMap.set(key, currentValue + 1);
        }
        else {
          this.vowelsMap.set(key, 1);
        }
      }//if
    // } //for vowels
  }//for words
  /*************************/
  createVowelsMapByWord(this.vowelsMap, termVowel);
  /*************************/
  //  determine what changes are required
  return this.findSimilarWord(term);
};

// Delete Map item if it has not vowel
function createVowelsMapByWord(vowelsMap, termVowel) {
  // loop over map
  for (let [key, value] of vowelsMap.entries()) {
    // loop over vowels
      if (key.includes(termVowel)) {
        // set key to searchVowel
        vowelsMap.set(key, termVowel);
      }//if
  }
}

Dictionary.prototype.findSimilarWord = function (term) {
  let similarWordFound = '';
  
  //loop through each word in the Map keys
  for (let key of this.vowelsMap.keys()) {
    // find index of the first matching vowel:
    const searchVowel = this.vowelsMap.get(key);
    // set index of searchVowel in word
    const wordVowelIndex = key.indexOf(searchVowel);

    // set index of searchVowel in term
    /*****************************/
    //rubymine vowel is not in term in the word, does not match anything in the term
    const termVowelIndex = term.indexOf(searchVowel);
    //enter Ruby, then Java
    /*****************************/

    // split words into arrays
    leftToRightSearch(termVowelIndex, term, wordVowelIndex, key, this.similarWordsMap);
    similarWordFound = rightToLeftSearch(termVowelIndex, term, wordVowelIndex - 1, key, this.similarWordsMap);
  }//for
  resetInstanceVars(this.words, this.vowelsMap, this.similarWordsMap); 


  return similarWordFound;
};

/************************************/
// Start Helper Functions:
/************************************/
function resetInstanceVars(words, vowelsMap, similarWordsMap) {
  words = [];
  vowelsMap.clear();
  similarWordsMap.clear();
}
function leftToRightSearch(termVowelIndex, term, wordVowelIndex, word, similarWordsMap) {
  let curWordIndex = wordVowelIndex;
  for (let curTermIdx = termVowelIndex; curTermIdx < term.length; curTermIdx++) {
    let key = word;
    let mapValue = similarWordsMap.get(key);
    const itemExists = similarWordsMap.has(key);
    // if char are equal nothing to count
    if (word[curWordIndex] && word[curWordIndex].toLowerCase() === term[curTermIdx].toLowerCase()) {
      if (itemExists) {
        // do nothing
      } else {
        similarWordsMap.set(key, 0);
      }
    }
    //skip the current letter and check if the next letter matches
    //before changing. If so, then add 1 to the word count, but increment
    // the curWordIndex by 1.
    else if (word[curWordIndex + 1] && word[curWordIndex + 1].toLowerCase() === term[curTermIdx].toLowerCase()) {
      if (itemExists) {
        similarWordsMap.set(key, mapValue += 1);
      } else {
        similarWordsMap.set(key, 1);
      }
      // increment curWordIndex
      curWordIndex += 1;
    }
    // word does not match and must be replaced
    else {
      if (itemExists) {
        similarWordsMap.set(key, mapValue += 1);
      } else {
        similarWordsMap.set(key, 1);
      }
    } //else
    curWordIndex++;
  }// for
}
function rightToLeftSearch(termVowelIndex, term, wordVowelIndex, word, similarWordsMap) {
  let curWordIndex = wordVowelIndex;
  let key = word;
  let mapValue = similarWordsMap.get(key);
  //search for differences between term and left side of word from search vowel
  for (let curTermIdx = termVowelIndex - 1; curTermIdx > 0; curTermIdx--) {
    // compare word and term chars
    if (word[curWordIndex] && word[curWordIndex].toLowerCase() === term[curTermIdx].toLowerCase()) {
      // do nothing
    }
    else {
      const itemExists = similarWordsMap.has(key);
      if (itemExists) {
        similarWordsMap.set(key, mapValue += 1);
      } else {
        similarWordsMap.set(key, 1);
      }
    } //else
    curWordIndex--;
  }// for

  // add changes for words bigger than term
  if (word.length > term.length) {
    const additionalChanges = word.length - term.length;
    similarWordsMap.set(word, mapValue += additionalChanges);
  }

  let similarWord = "";
  let similarValue = 100;
  //iterate through map and find the word with the smallest value
  for (let [key, value] of similarWordsMap.entries()) {
    if (value < similarValue) {
      similarWord = key;
      similarValue = value;
    }// if
  }// for
  return similarWord;
}

// Determine which terms in an array of words:
function inArray(subStrings, words) {
  const subStrSet = new Set();
  // determine which items in a1 are a subset of a2 (includes)
  for (let subStr of subStrings) {
    for (let word of words) {
      // add all matching substrings to set
      if (word.toLowerCase().includes(subStr.toLowerCase())) {
        // Add the full word to the set
        subStrSet.add(word);
      }
    }
  }
  // Turn keys into an array
  return Array.from(subStrSet).sort();
}

function populateList(arrayName, arrayNameStr) {
  const element = document.getElementsByClassName(arrayNameStr)[0];
  for (let idx = 0; idx < arrayName.length; idx++) {
    const newLi = document.createElement("li");
    newLi.innerText = arrayName[idx];
    element.appendChild(newLi);
  }
}

/************************************/
// End Helper Functions:
/************************************/

const hardware = [
  'Dell 24 Monitor',
  'Klim Chroma Keyboard',
  'Logitech M310 Mouse',
  'Plugable USB C Dock',
  'Toshiba 1 TB External HD',
  'Standing Desk Converter',
  'LED Lamp'
];
const software = [
  'Docker',
  'Google Chrome',
  'IntelliJ',
  'MySql Workbench',
  'Postman',
  'RubyMine',
  'Visual Studio Code'
];

const extensions = [
  'Blame',
  'Comments in Typescript',
  'Glimmer Template Syntax',
  'Ember Unstable Lang Server',
  'ESLint',
  'Gitlens',
  'Material Icon Theme',
  'Path Intellisense',
  'Prettier',
  'Prettier for HandleBars',
  'Printcode',
  'Remote WSL (WSL2)',
  'Ruby Lang Support'
];

const books = [
  'Algorithms',
  'Cracking the Coding Interview',
  'Human Computer Interaction',
  'Java How to Program',
  'JavaScript: The Good Parts',
  'MySql'
];

const combinedArray = hardware.concat(software).concat(extensions).concat(books);
let dictionary = new Dictionary(combinedArray);

populateList(hardware, "hardware");
populateList(software, "software");
populateList(extensions, "extensions");
populateList(books, "books");
const submitBtn = document.getElementById("find-item-btn");

submitBtn.addEventListener("click", function (event) {
  // Don't refresh the page!
  event.preventDefault();
  let termElement = document.getElementById("search");
  
  //Determine similiar:
  const responseText = dictionary.findMostSimilar(termElement.value);
  termElement.value = '';
  let responseElement = document.getElementsByClassName("response-msg")[0];
  
  //clear previous value
  responseElement.innerHTML = '';
  
  //populate new value
  if(responseText) {
    responseElement.innerHTML = "Closest item is: " + responseText;
  }
  else
  responseElement.innerHTML = "Please enter a valid item";
});