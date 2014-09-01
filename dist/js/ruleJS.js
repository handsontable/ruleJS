/*
* TODO:
* 1) error handling
* */

var ruleJS = (function (root) {
  'use strict';

  /**
   * object instance
   */
  var instance = this;

  /**
   * root element
   */
  var rootElement = document.getElementById(root) || null;

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
   * matrix collection for each form, contains cache of all form element
   * @param key
   */
  var Matrix = (function () {
    /**
     * single item (cell) object
     * @type {{value: number, formulas: null, deps: Array}}
     */
    var item = {
        value: 0,
        formulas: null,
        deps: []
    };

    /**
     * array of items
     * @type {Array}
     */
    var data = [];

    /**
     * form elements, which can be parsed
     * @type {string[]}
     */
    var formElements = ['input[type=text]'];

    /**
     * formula attribute in DOM
     * @type {string[]}
     */
    var formulasAttr = ['[data-formula]'];

    /**
     * scan the form and build the calculation matrix
     */
    var scan = function () {
      var $totalElements = rootElement.querySelectorAll(formElements),
          $formulaElements = rootElement.querySelectorAll(formulasAttr);

      [].slice.call($formulaElements).forEach(function ($item) {
        var formula = $item.getAttribute('data-formula'),
            nodeName = $item.nodeName.toUpperCase(),
            parsed = parse(formula);

        if (['INPUT'].indexOf(nodeName) === -1) {
          $item.innerText = parsed.result;
        }

        $item.value = parsed.result;
      });
    };

    var update = function () {

    };

    var calculate = function () {

    };

    var clean = function () {

    };

    return {
      scan: scan
    }
  });


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
     * check if value is function
     * @param value
     * @returns {boolean}
     */
    isFunction: function (value) {
      return Object.prototype.toString.call(value) === '[object Function]';
    },

    /**
     * convert string char to number e.g A => 1, Z => 26, AA => 27
     * @param {String} chr
     * @returns {Integer}
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
     * @returns {String}
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
    },

    /**
     * iterate cell range and get theirs indexes and values
     * @param {Object} startCell ex.: {row:1, col: 1}
     * @param {Object} endCell ex.: {row:10, col: 1}
     * @param {Function} callback
     * @returns {{index: Array, value: Array}}
     */
    iterateCells: function (startCell, endCell, callback) {
      var result = {
        index: [], // list of cell index: A1, A2, A3
        value: []  // list of cell value
      };

      var cols = {
        start: 0,
        end: 0
      };

      if (endCell.col >= startCell.col) {
        cols = {
          start: startCell.col,
          end: endCell.col
        };
      } else {
        cols = {
          start: endCell.col,
          end: startCell.col
        };
      }

      var rows = {
        start: 0,
        end: 0
      };

      if (endCell.row >= startCell.row) {
        rows = {
          start: startCell.row,
          end: endCell.row
        };
      } else {
        rows = {
          start: endCell.row,
          end: startCell.row
        };
      }

      for (var column = cols.start; column <= cols.end; column++) {
        for (var row = rows.start; row <= rows.end; row++) {

          var cellIndex = instance.utils.toChar(column) + row;
          var cellValue = instance.helper.number(document.getElementById(cellIndex).value);

          result.index.push(cellIndex);
          result.value.push(cellValue);
        }
      }

      if (instance.utils.isFunction(callback)) {
        return callback.apply(callback, [result]);
      } else {
        return result;
      }
    }
  };

  /**
   * helper with methods using by parser
   * @type {{number: number, numberInverted: numberInverted, mathMatch: mathMatch, callFunction: callFunction}}
   */
  var helper = {
    /**
     * list of supported formulas
     */
    SUPPORTED_FORMULAS: [
      'ABS', 'ACCRINT', 'ACOS', 'ACOSH', 'ACOTH', 'AND', 'ARABIC', 'ASIN', 'ASINH', 'ATAN', 'ATAN2', 'ATANH', 'AVEDEV', 'AVERAGE', 'AVERAGEA', 'AVERAGEIF',
      'BASE', 'BESSELI', 'BESSELJ', 'BESSELK', 'BESSELY', 'BETADIST', 'BETAINV', 'BIN2DEC', 'BIN2HEX', 'BIN2OCT', 'BINOMDIST', 'BINOMDISTRANGE', 'BINOMINV', 'BITAND', 'BITLSHIFT', 'BITOR', 'BITRSHIFT', 'BITXOR',
      'CEILING', 'CEILINGMATH', 'CEILINGPRECISE', 'CHAR', 'CHISQDIST', 'CHISQINV', 'CODE', 'COMBIN', 'COMBINA', 'COMPLEX', 'CONCATENATE', 'CONFIDENCENORM', 'CONFIDENCET', 'CONVERT', 'CORREL', 'COS', 'COSH', 'COT', 'COTH', 'COUNT', 'COUNTA', 'COUNTBLANK', 'COUNTIF', 'COUNTIFS', 'COUNTIN', 'COUNTUNIQUE', 'COVARIANCEP', 'COVARIANCES', 'CSC', 'CSCH', 'CUMIPMT', 'CUMPRINC',
      'DATE', 'DATEVALUE', 'DAY', 'DAYS', 'DAYS360', 'DB', 'DDB', 'DEC2BIN', 'DEC2HEX', 'DEC2OCT', 'DECIMAL', 'DEGREES', 'DELTA', 'DEVSQ', 'DOLLAR', 'DOLLARDE', 'DOLLARFR',
      'E', 'EDATE', 'EFFECT', 'EOMONTH', 'ERF', 'ERFC', 'EVEN', 'EXACT', 'EXPONDIST',
      'FALSE', 'FDIST', 'FINV', 'FISHER', 'FISHERINV',
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
    numberInverted: function (num) {
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
      var value = document.getElementById(cell).value;
      return instance.helper.number(value);
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

      var cells = utils.iterateCells(coordsStart, coordsEnd),
          result = [];

      result.push(cells.value)
      return result;
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

    if (rootElement) {
      var matrix = new Matrix();
      matrix.scan();
    }
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
