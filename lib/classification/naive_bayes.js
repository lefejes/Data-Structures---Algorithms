module.exports= function(options) {
  return new NaiveBayes(options)
};

var classifier_State = module.exports.classifier_State = [
  'categories', 'docCount', 'totalDocs', 'vocab', 'vocabSize',
  'wordCount', 'wordFreqCount', 'options'
];

module.exports.fromJson = function(jsonStr) {
  var parsed;
  try {
    parsed = JSON.parse(jsonStr)
  } catch (err) {
    throw new Error('NaiveBayes.fromJson expects a valid JSON string.')
  };

  var classifier = new NaiveBayes(parsed.options);

  classifier_State.forEach(function (f) {
    if (parsed[f] === 'undefined') {
      throw new Error('NaiveBayes.fromJson: JSON string is missing an expected property.');
    };
    classifier[f] = parsed[f];
  });

  return classifier;
};

var defaultTokenizer = function(text) {
  var regexPunctuation = /[^(a-z0-9)+\s]/gi;

  var sanitized = text.replace(regexPunctuation, ' ');

  return sanitized.split(/\s+/);
};

function NaiveBayes(options) {
  this.options = {};
  if (typeof options !== 'undefined') {
    if (!options || typeof options !== 'object' || Array.isArray(options)) {
      throw TypeError('NaiveBayes received invalid options. Pass in an object.');
    }
    this.options = options;
  }

  this.tokenizer = this.options.tokenizer || defaultTokenizer;

  this.vocab = {};
  this.vocabSize = 0;

  this.totalDocs = 0;
  this.docCount = {};
  this.wordCount = {};
  this.wordFreqCount = {};

  this.categories = {};
};

NaiveBayes.prototype.initializeCategory = function(categoryName) {
  if (!this.categories[categoryName]) {
    this.docCount[categoryName] = 0;
    this.wordCount[categoryName] = 0;
    this.wordFreqCount[categoryName] = {};
    this.categories[categoryName] = true;
  }
  return this;
};

NaiveBayes.prototype.learn = function(text, category) {
  var self = this;

  self.initializeCategory(category);

  self.docCount[category]++;
  self.totalDocs++;

  var tokens = self.tokenizer(text);
  var freqTable = self.freqTable(tokens);

  Object.keys(freqTable).forEach(function(token) {
    if (!self.vocab[token]) {
      self.vocab[token] = true;
      self.vocabSize++;
    }

    var freqInText = freqTable[token];

    if (!self.wordFreqCount[category][token]) {
      self.wordFreqCount[category][token] = freqInText;
    } else {
      self.wordFreqCount[category][token] += freqInText;
    }

    self.wordCount[category] += freqInText;
  });

  return self;
};

NaiveBayes.prototype.categorize = function(text) {
  var self = this;
  var maxProbability = -Infinity;
  var chosenCategory = null;

  var tokens = self.tokenizer(text);
  var freqTable = self.freqTable(tokens);

  Object.keys(self.categories).forEach(function(category) {
    var categoryProbability = self.docCount[category] / self.totalDocs;
    var logProbability = Math.log(categoryProbability);

    Object.keys(freqTable).forEach(function(token) {
      var freqInText = freqTable[token];
      var tokenProbability = self.tokenProbability(token, category);

      logProbability += freqInText * Math.log(tokenProbability);
    });

    if (logProbability > maxProbability) {
      maxProbability = logProbability;
      chosenCategory = category;
    };
  });

  return chosenCategory;
};

NaiveBayes.prototype.tokenProbability = function(token, category) {
  var wordFreqCount = this.wordFreqCount[category][token] || 0;
  var wordCount = this.wordCount[category];

  return (wordFreqCount + 1) / (wordCount + this.vocabSize);
};

NaiveBayes.prototype.freqTable = function(tokens) {
  var freqTable = Object.create(null);

  tokens.forEach(function(token) {
    if (!freqTable[token]) {
      freqTable[token] = 1;
    } else {
      freqTable[token]++;
    };
  });

  return freqTable;
};

NaiveBayes.prototype.toJson = function() {
  var state = {};
  var self = this;

  classifier_State.forEach(function(f) {
    state[f] = self[f];
  });

  var jsonStr = JSON.stringify(state);

  return jsonStr;
};
