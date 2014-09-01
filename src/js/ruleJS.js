/*
* TODO:
* 1) error handling
* */

var ruleJS = (function () {
  'use strict';

  /**
   * object instance
   */
  var instance = this;

  /**
  * current version
  * @type {string}
  */
  var version = '0.0.1';

  /**
  * formulas delivered by formulaJS library
  * contains most of Microsoft Excel formula functions
  * @type {Window.Formula|*|{}}
  */
  var formulas = Formula || {};

  /**
  * parser object delivered by jison library
  * @type {Parser|*|{}}
  */
  var parser = Parser || {};

  /**
  * utils methods
  * @type {{isArray: isArray, toNum: toNum, toChar: toChar, cellCoords: cellCoords}}
  */
  var utils = {
   /**
    * check if value is array
    * @param value
    * @returns {boolean}
    */
    isArray: function (value) {
      return Object.prototype.toString.call(value) === '[object Array]';
    },

   /**
    * convert string char to number e.g A => 1, Z => 26, AA => 27
    * @param {String} chr
    * @returns {number}
    */
    toNum: function (chr) {
      chr = chr.split('');

      var base = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
          i, j, result = 0;

      for (i = 0, j = chr.length - 1; i < chr.length; i += 1, j -= 1) {
        result += Math.pow(base.length, j) * (base.indexOf(chr[i]) + 1);
      }

      return result;
    },

   /**
    * convert number to string char, e.g 1 => A, 26 => Z, 27 => AA
    * @param {Integer} num
    * @returns {string}
    */
    toChar: function (num) {
      var s = '';
      num = num - 1;

      while (num >= 0) {
        s = String.fromCharCode(num % 26 + 97) + s;
        num = Math.floor(num / 26) - 1;
      }

      return s.toUpperCase();
    },

   /**
    * get cell coordinates
    * @param {String} cell
    * @returns {{row: Number, col: number}}
    */
    cellCoords: function (cell) {
      var num = cell.match(/\d+$/),
          alpha = cell.replace(num, '');

      return {
        row: parseInt(num[0], 10),
        col: instance.utils.toNum(alpha)
      };
    }
  };

  /**
  * helper with methods using by parser
  * @type {{number: number, numberInverted: numberInverted, mathMatch: mathMatch, callFunction: callFunction}}
  */
  var helper = {
    SUPPORTED_FORMULAS: [
      'ABS','ACCRINT', 'ACOS', 'ACOSH', 'ACOTH', 'AND', 'ARABIC', 'ASIN', 'ASINH', 'ATAN', 'ATAN2', 'ATANH', 'AVEDEV', 'AVERAGE', 'AVERAGEA', 'AVERAGEIF',
      'BASE', 'BESSELI', 'BESSELJ', 'BESSELK', 'BESSELY', 'BETADIST', 'BETAINV', 'BIN2DEC', 'BIN2HEX', 'BIN2OCT', 'BINOMDIST', 'BINOMDISTRANGE', 'BINOMINV', 'BITAND', 'BITLSHIFT', 'BITOR', 'BITRSHIFT', 'BITXOR',
      'CEILING', 'CEILINGMATH', 'CEILINGPRECISE', 'CHAR', 'CHISQDIST', 'CHISQINV', 'CODE', 'COMBIN', 'COMBINA', 'COMPLEX', 'CONCATENATE', 'CONFIDENCENORM','CONFIDENCET', 'CONVERT', 'CORREL', 'COS', 'COSH', 'COT', 'COTH', 'COUNT', 'COUNTA', 'COUNTBLANK', 'COUNTIF', 'COUNTIFS', 'COUNTIN', 'COUNTUNIQUE', 'COVARIANCEP', 'COVARIANCES','CSC', 'CSCH', 'CUMIPMT', 'CUMPRINC',
      'DATE', 'DATEVALUE', 'DAY', 'DAYS', 'DAYS360', 'DB', 'DDB', 'DEC2BIN', 'DEC2HEX', 'DEC2OCT', 'DECIMAL', 'DEGREES', 'DELTA', 'DEVSQ', 'DOLLAR', 'DOLLARDE', 'DOLLARFR',
      'E', 'EDATE', 'EFFECT', 'EOMONTH', 'ERF', 'ERFC', 'EVEN', 'EXACT', 'EXPONDIST',
      'FALSE', 'FDIST', 'FINV', 'FISHER','FISHERINV',
      'IF', 'INT', 'ISEVEN', 'ISODD',
      'LN', 'LOG', 'LOG10',
      'MAX', 'MAXA', 'MEDIAN', 'MIN', 'MINA', 'MOD',
      'NOT',
      'ODD', 'OR',
      'PI', 'POWER',
      'ROUND', 'ROUNDDOWN', 'ROUNDUP',
      'SIN', 'SINH', 'SPLIT', 'SQRT', 'SQRTPI', 'SUM', 'SUMIF', 'SUMIFS', 'SUMPRODUCT', 'SUMSQ', 'SUMX2MY2', 'SUMX2PY2', 'SUMXMY2',
      'TAN', 'TANH', 'TRUE', 'TRUNC',
      'XOR'
    ],

   /**
    * get number
    * @param  {Number|String} num
    * @returns {Number}
    */
    number: function (num) {
      switch (typeof num) {
        case 'number':
          return num;
        case 'string':
          if (!isNaN(num)) {
            return num.indexOf('.') > -1 ? parseFloat(num) : parseInt(num, 10);
          }
      }

      return num;
    },

   /**
    * invert number
    * @param num
    * @returns {Number}
    */
    numberInverted: function(num) {
      return this.number(num) * (-1);
    },

   /**
    * match math operation
    * @param {String} type
    * @param {Number} number1
    * @param {Number} number2
    * @returns {*}
    */
    mathMatch: function (type, number1, number2) {
      var result;

      number1 = !isNaN(number1) ? parseInt(number1, 10) : 0;
      number2 = !isNaN(number2) ? parseInt(number2, 10) : 0;

      switch (type) {
        case '+':
          result = number1 + number2;
          break;
        case '-':
          result = number1 - number2;
          break;
        case '/':
          result = number1 / number2;
          if (value == Infinity || isNaN(result)) {
            result = 0;
          }
          break;
        case '*':
          result = number1 * number2;
          break;
        case '^':
          result = Math.pow(number1, number2);
          break;
      }

      return result;
    },

   /**
    * call function from Formula
    * @param {String} fn
    * @param {Array} args
    * @returns {*}
    */
    callFunction: function (fn, args) {
      fn = fn.toUpperCase();
      args = args || [];

      if (instance.helper.SUPPORTED_FORMULAS.indexOf(fn) > -1) {
        if (formulas[fn]) {
          return formulas[fn].apply(this, args);
        }
      }

      return false;
    },

   /**
    * get variable
    * @param {Array} args
    * @returns {*}
    */
    callVariable: function (args) {
      args = args || [];
      var str = args[0];

      if (str) {
        str = str.toUpperCase();
        if (formulas[str]) {
          return ((typeof formulas[str] === 'function') ? formulas[str].apply(this, args) : formulas[str]);
        }
      }

      return false;
    },

   /**
    * Get cell value
    * @param {String} cell => A1 AA1
    * @returns {*}
    */
    cellValue: function (cell) {
      var coords = instance.utils.cellCoords(cell);
      //debugger;
      return value;
    },

   /**
    * Get cell range values
    * @param {String} start cell
    * @param {String} end cell
    * @returns {Array}
    */
    cellRangeValue: function (start, end) {
      var coordsStart = instance.utils.cellCoords(start),
          coordsEnd = instance.utils.cellCoords(end);

      debugger;
    },

   /**
    * Get fixed cell value
    * @param {String} id
    * @returns {*}
    */
    fixedCellValue: function (id) {
      debugger;
    },

   /**
    * Get fixed cell range values
    * @param {String} start
    * @param {String} end
    * @returns {Array}
    */
    fixedCellRangeValue: function (start, end) {
      debugger;
    }
  };

  /**
  * parse input string using parser
  * @param {String} input
  * @returns {Object} {{error: *, result: *}}
  */
  var parse = function (input) {
    var result = null,
      error = null;

    try {
      result = parser.parse(input);
      error = null;
    } catch (ex) {
      error = ex.message;
    }

    return {
      error: error,
      result: result
    }
  };

  var init = function () {
    instance = this;
    Parser.yy.ruleJS = instance;
  };

  return {
    init: init,
    version: version,
    formulas: formulas,
    utils: utils,
    helper: helper,
    parse: parse
  };
});

/*
if (typeof(window) !== 'undefined') {
  window.FormulaParser = function(handler) {
    var formulaLexer = function () {};
    formulaLexer.prototype = parser.lexer;

    var formulaParser = function () {
      this.lexer = new formulaLexer();
      this.yy = {};
    };

    formulaParser.prototype = parser;
    var newParser = new formulaParser;
    newParser.setObj = function(obj) {
      newParser.yy.obj = obj;
    };

    newParser.yy.handler = handler;
    return newParser;
  };
}
*/
