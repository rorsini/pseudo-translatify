const jsonfile = require('jsonfile')

const CHARS = {
  'a': 'ä',
  'c': 'ç',
  'i': 'ï',
  'C': 'Ç',
  'A': 'Ä',
  'e': 'é',
  'E': 'É',
  'D': 'Ð',
  'o': 'ö',
  'O': 'Ö',
  'u': 'ü',
  'U': 'Ü',
  'n': 'ñ',
  'r': 'ř',
  'Y': 'Ý',
  'w': 'ω',
  'N': 'Ñ'
}

const _replaceChars = (str) => {
  let ptStr = str;
  for (key in CHARS) {
    const re = new RegExp(key, "g");
    ptStr = ptStr.replace(re, CHARS[key]);
  }
  return ptStr;
};

const _wrapSentence = (str) => {
  return `«${str}»`;
};

const pseudoTranslateObject = (obj) => {
  if ( typeof obj === "object" ) {
    let retObj = {};
    for (key in obj) {
      retObj[key] = pseudoTranslateObject(obj[key]);
    }
    return retObj;
  } else if ( typeof obj === "string" ) {
    const val = _wrapSentence(_replaceChars(obj));
    return val;
  }
};

const fileName = "./en-us/main.json";
const enu_json = jsonfile.readFileSync(fileName);
console.log(enu_json);
const pt_obj = pseudoTranslateObject(enu_json);
console.log(pt_obj);

// jsonfile.writeFileSync(fileName, content, { spaces: 2 })

