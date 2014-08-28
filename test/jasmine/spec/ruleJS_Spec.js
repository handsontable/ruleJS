describe('ruleJS', function () {
  it('should exists', function () {
    expect(ruleJS).toBeDefined();
    expect(getType(ruleJS)).toEqual('[object Object]');
  });

  it('should have `helper` object', function () {
    expect(ruleJS.helper).toBeDefined();
    expect(getType(ruleJS.helper)).toEqual('[object Object]');
  });

  it('should have `formulas` object', function () {
    expect(ruleJS.formulas).toBeDefined();
    expect(getType(ruleJS.formulas)).toEqual('[object Object]');
  });

  it('should have `parse()` method', function () {
    expect(ruleJS.parse).toBeDefined();
    expect(getType(ruleJS.parse)).toEqual('[object Function]');
  });
});

describe('parse()', function () {
  var parsed = null;

  beforeEach(function () {
    parsed = null;
  });

  it('ABS', function () {
    parsed = ruleJS.parse('ABS(-1)');
    expect(parsed.result).toBe(1);

    parsed = ruleJS.parse('ABS(1)');
    expect(parsed.result).toBe(1);
  });

  it('ACCRINT', function () {
    parsed = ruleJS.parse("ACCRINT('01/01/2011', '02/01/2011', '07/01/2014', 0.1, 1000, 1, 0)");
    expect(parsed.result).toBe(350);
  });

  it('ACOS', function () {
    parsed = ruleJS.parse('ROUND(ACOS(-1),5)');
    expect(parsed.result).toBe(3.14159);
  });

  it('ACOSH', function () {
    parsed = ruleJS.parse('ROUND(ACOSH(10),5)');
    expect(parsed.result).toBe(2.99322);
  });

  it('ACOTH', function () {
    parsed = ruleJS.parse('ROUND(ACOTH(6),5)');
    expect(parsed.result).toBe(0.16824);
  });

  it('AND', function () {
    parsed = ruleJS.parse('AND(true, false, true)');
    expect(parsed.result).toBe(false);
  });

  it('ARABIC', function () {
    parsed = ruleJS.parse("ARABIC('MCMXII')");
    expect(parsed.result).toBe(1912);
  });

  it('ASIN', function () {
    parsed = ruleJS.parse("ROUND(ASIN(-0.5),5)");
    expect(parsed.result).toBe(-0.5236);
  });

  it('ASINH', function () {
    parsed = ruleJS.parse("ROUND(ASINH(-2.5),5)");
    expect(parsed.result).toBe(-1.64723);
  });

  it('ATAN', function () {
    parsed = ruleJS.parse("ROUND(ATAN(1),5)");
    expect(parsed.result).toBe(0.7854);
  });

  it('ATAN2', function () {
    parsed = ruleJS.parse("ROUND(ATAN2(-1, -1),5)");
    expect(parsed.result).toBe(-2.35619);
  });

  it('ATANH', function () {
    parsed = ruleJS.parse("ROUND(ATANH(-0.1),5)");
    expect(parsed.result).toBe(-0.10034);
  });

  it('AVEDEV', function () {
    parsed = ruleJS.parse('AVEDEV([2,4], [8,16])');
    expect(parsed.result).toBe(4.5);
  });

  it('AVERAGE', function () {
    parsed = ruleJS.parse("AVERAGE([2,4], [8,16])");
    expect(parsed.result).toBe(7.5);
  });

  it('AVERAGEA', function () {
    parsed = ruleJS.parse("AVERAGEA([2,4], [8,16])");
    expect(parsed.result).toBe(7.5);
  });

  it('AVERAGEIF', function () {
    parsed = ruleJS.parse("AVERAGEIF([2,4,8,16], '>5', [1, 2, 3, 4])");
    expect(parsed.result).toBe(3.5);
  });

  it('BASE', function () {
    parsed = ruleJS.parse("BASE(15, 2, 10)");
    expect(parsed.result).toBe("0000001111");
  });

  it('BESSELI', function () {
    parsed = ruleJS.parse("ROUND(BESSELI(1, 2),5)");
    expect(parsed.result).toBe(0.13575);
  });

  it('BESSELJ', function () {
    parsed = ruleJS.parse("ROUND(BESSELJ(1, 2),5)");
    expect(parsed.result).toBe(0.1149);
  });

  it('BESSELK', function () {
    parsed = ruleJS.parse("ROUND(BESSELK(1, 2),5)");
    expect(parsed.result).toBe(1.62484);
  });

  it('BESSELY', function () {
    parsed = ruleJS.parse("ROUND(BESSELY(1, 2),5)");
    expect(parsed.result).toBe(-1.65068);
  });

  it('BETADIST', function () {
    parsed = ruleJS.parse("ROUND(BETADIST(2, 8, 10, true, 1, 3),5)");
    expect(parsed.result).toBe(0.68547);
  });

  it('BETAINV', function () {
    parsed = ruleJS.parse("ROUND(BETAINV(0.6854705810117458, 8, 10, 1, 3),1)");
    expect(parsed.result).toBe(2);
  });

  it('BIN2DEC', function () {
    parsed = ruleJS.parse("BIN2DEC(101010)");
    expect(parsed.result).toBe(42);
  });

  it('BIN2HEX', function () {
    parsed = ruleJS.parse("BIN2HEX(101010)");
    expect(parsed.result).toBe('2a');
  });

  it('BIN2OCT', function () {
    parsed = ruleJS.parse("BIN2OCT(101010)");
    expect(parsed.result).toBe('52');
  });

  it('BINOMDIST', function () {
    parsed = ruleJS.parse("ROUND(BINOMDIST(6, 10, 0.5, false), 5)");
    expect(parsed.result).toBe(0.20508);
  });
  it('BINOMDISTRANGE', function () {
    parsed = ruleJS.parse("ROUND(BINOMDISTRANGE(60, 0.75, 45, 50),5)");
    expect(parsed.result).toBe(0.52363);
  });

  it('BINOMINV', function () {
    parsed = ruleJS.parse("BINOMINV(6, 0.5, 0.75)");
    expect(parsed.result).toBe(4);
  });

  it('BITAND', function () {
    parsed = ruleJS.parse("BITAND(42, 24)");
    expect(parsed.result).toBe(8);
  });

  it('BITLSHIFT', function () {
    parsed = ruleJS.parse("BITLSHIFT(42, 24)");
    expect(parsed.result).toBe(704643072);
  });

  it('BITOR', function () {
    parsed = ruleJS.parse("BITOR(42, 24)");
    expect(parsed.result).toBe(58);
  });

  it('BITRSHIFT', function () {
    parsed = ruleJS.parse("BITRSHIFT(42, 2)");
    expect(parsed.result).toBe(10);
  });

  it('BITXOR', function () {
    parsed = ruleJS.parse("BITXOR(42, 24)");
    expect(parsed.result).toBe(50);
  });

  it('CEILING', function () {
    parsed = ruleJS.parse("CEILING(-5.5, 2, -1)");
    expect(parsed.result).toBe(-6);
  });

  it('CEILINGMATH', function () {
    parsed = ruleJS.parse("CEILINGMATH(-5.5, 2, -1)");
    expect(parsed.result).toBe(-6);
  });

  it('CEILINGPRECISE', function () {
    parsed = ruleJS.parse("CEILINGPRECISE(-4.1, -2)");
    expect(parsed.result).toBe(-4);
  });

  it('CHAR', function () {
    parsed = ruleJS.parse("CHAR(65)");
    expect(parsed.result).toBe("A");
  });

  it('CHISQDIST', function () {
    parsed = ruleJS.parse("ROUND(CHISQDIST(0.5, 1, true),5)");
    expect(parsed.result).toBe(0.5205);
  });

  it('CHISQINV', function () {
    parsed = ruleJS.parse("ROUND(CHISQINV(0.6, 2, true),5)");
    expect(parsed.result).toBe(1.83258);
  });

  it('CODE', function () {
    parsed = ruleJS.parse("CODE('A')");
    expect(parsed.result).toBe(65);
  });

  it('COMBIN', function () {
    parsed = ruleJS.parse("COMBIN(8, 2)");
    expect(parsed.result).toBe(28);
  });

  it('COMBINA', function () {
    parsed = ruleJS.parse("COMBINA(4, 3)");
    expect(parsed.result).toBe(20);
  });

  it('COMPLEX', function () {
    parsed = ruleJS.parse("COMPLEX(3, 4)");
    expect(parsed.result).toBe("3+4i");
  });

  it('CONCATENATE', function () {
    parsed = ruleJS.parse("CONCATENATE('Andreas', ' ', 'Hauser')");
    expect(parsed.result).toBe("Andreas Hauser");
  });

  it('CONFIDENCENORM', function () {
    parsed = ruleJS.parse("ROUND(CONFIDENCENORM(0.05, 2.5, 50),5)");
    expect(parsed.result).toBe(0.69295);
  });

  it('CONFIDENCET', function () {
    parsed = ruleJS.parse("ROUND(CONFIDENCET(0.05, 1, 50), 5)");
    expect(parsed.result).toBe(0.2842);
  });

  it('CONVERT', function () {
    parsed = ruleJS.parse("CONVERT(64, 'kibyte', 'bit')");
    expect(parsed.result).toBe(524288);
  });

  it('CORREL', function () {
    parsed = ruleJS.parse("ROUND(CORREL([3,2,4,5,6], [9,7,12,15,17]),5)");
    expect(parsed.result).toBe(0.99705);
  });

  it('COS', function () {
    parsed = ruleJS.parse("ROUND(COS(1),5)");
    expect(parsed.result).toBe(0.5403);
  });

  it('COSH', function () {
    parsed = ruleJS.parse("ROUND(COSH(1),5)");
    expect(parsed.result).toBe(1.54308);
  });

  it('COT', function () {
    parsed = ruleJS.parse("ROUND(COT(30),5)");
    expect(parsed.result).toBe(-0.15612);
  });

  it('COTH', function () {
    parsed = ruleJS.parse("ROUND(COTH(2),5)");
    expect(parsed.result).toBe(1.03731);
  });

  it('COUNT', function () {
    parsed = ruleJS.parse("COUNT([1,2], [3,4])");
    expect(parsed.result).toBe(4);
  });

  it('COUNTA', function () {
    parsed = ruleJS.parse("COUNTA([1, null, 3, 'a', '', 'c'])");
    expect(parsed.result).toBe(4);
  });

  it('COUNTBLANK', function () {
    parsed = ruleJS.parse("COUNTBLANK([1, null, 3, 'a', '', 'c'])");
    expect(parsed.result).toBe(2);
  });

  it('COUNTIF', function () {
    parsed = ruleJS.parse("COUNTIF(['Caen', 'Melbourne', 'Palo Alto', 'Singapore'], 'a')");
    expect(parsed.result).toBe(3);
  });

  it('COUNTIFS', function () {
    parsed = ruleJS.parse("COUNTIFS([2,4,8,16], [1,2,3,4], '>=2', [1,2,4,8], '<=4')");
    expect(parsed.result).toBe(2);
  });

  it('COUNTIN', function () {
    parsed = ruleJS.parse("COUNTIN([1,3,1],1)");
    expect(parsed.result).toBe(2);
  });

  it('COUNTUNIQUE', function () {
    parsed = ruleJS.parse("COUNTUNIQUE([1,1,2,2,3,3])");
    expect(parsed.result).toBe(3);
  });

  it('COVARIANCEP', function () {
    parsed = ruleJS.parse("COVARIANCEP([3,2,4,5,6], [9,7,12,15,17])");
    expect(parsed.result).toBe(5.2);
  });

  it('COVARIANCES', function () {
    parsed = ruleJS.parse("ROUND(COVARIANCES([2,4,8], [5,11,12]),5)");
    expect(parsed.result).toBe(9.66667);
  });

  it('CSC', function () {
    parsed = ruleJS.parse("ROUND(CSC(15),5)");
    expect(parsed.result).toBe(1.53778);
  });

  it('CSCH', function () {
    parsed = ruleJS.parse("ROUND(CSCH(1.5),5)");
    expect(parsed.result).toBe(0.46964);
  });

  it('CUMIPMT', function () {
    parsed = ruleJS.parse("ROUND(CUMIPMT('0.1/12', '30*12', 100000, 13, 24, 0),5)");
    expect(parsed.result).toBe(-9916.77251);
  });

  it('CUMPRINC', function () {
    parsed = ruleJS.parse("ROUND(CUMPRINC('0.1/12', '30*12', 100000, 13, 24, 0),5)");
    expect(parsed.result).toBe(-614.08633);
  });

  it('DATE', function () {
    parsed = ruleJS.parse("DATE(2008, 7, 8)");
    expect(parsed.result.toString()).toBe("Tue Jul 08 2008 00:00:00 GMT+0200 (CEST)");
  });

  it('DATEVALUE', function () {
    parsed = ruleJS.parse("DATEVALUE('8/22/2011')");
    expect(parsed.result).toBe(40777);
  });

  it('DAY', function () {
    parsed = ruleJS.parse("DAY('15-Apr-11')");
    expect(parsed.result).toBe(15);
  });

  it('DAYS', function () {
    parsed = ruleJS.parse("DAYS('3/15/11', '2/1/11')");
    expect(parsed.result).toBe(42);
  });

  it('DAYS360', function () {
    parsed = ruleJS.parse("DAYS360('1-Jan-11', '31-Dec-11')");
    expect(parsed.result).toBe(360);
  });

  it('DB', function () {
    parsed = ruleJS.parse("DB(1000000, 100000, 6, 1, 6)");
    expect(parsed.result).toBe(159500);
  });

  it('DDB', function () {
    parsed = ruleJS.parse("DDB(1000000, 100000, 6, 1, 1.5)");
    expect(parsed.result).toBe(250000);
  });

  it('DEC2BIN', function () {
    parsed = ruleJS.parse("DEC2BIN(42)");
    expect(parsed.result).toBe("101010");
  });

  it('DEC2HEX', function () {
    parsed = ruleJS.parse("DEC2HEX(42)");
    expect(parsed.result).toBe("2a");
  })

  it('DEC2OCT', function () {
    parsed = ruleJS.parse("DEC2OCT(42)");
    expect(parsed.result).toBe("52");
  });

  it('DECIMAL', function () {
    parsed = ruleJS.parse("DECIMAL('FF', 16)");
    expect(parsed.result).toBe(255);
  });

  it('DEGREES', function () {
    parsed = ruleJS.parse("DEGREES(PI())");
    expect(parsed.result).toBe(180);
  });

  it('DELTA', function () {
    parsed = ruleJS.parse("DELTA(42, 42)");
    expect(parsed.result).toBe(1);
  });

  it('DEVSQ', function () {
    parsed = ruleJS.parse("DEVSQ([2,4,8,16])");
    expect(parsed.result).toBe(115);
  });

  it('DOLLAR', function () {
    parsed = ruleJS.parse("DOLLAR(-0.123, 4)");
    expect(parsed.result).toBe("($0.1230)");
  });

  it('DOLLARDE', function () {
    parsed = ruleJS.parse("DOLLARDE(1.1, 16)");
    expect(parsed.result).toBe(1.625);
  });

  it('DOLLARFR', function () {
    parsed = ruleJS.parse("DOLLARFR(1.625, 16)");
    expect(parsed.result).toBe(1.1);
  });

  it('E', function () {
    parsed = ruleJS.parse("ROUND(E(),5)");
    expect(parsed.result).toBe(2.71828);
  });

  it('EDATE', function () {
    parsed = ruleJS.parse("EDATE('1/15/11', -1)");
    expect(parsed.result.toString()).toBe("Wed Dec 15 2010 00:00:00 GMT+0100 (CET)");
  });

  it('EFFECT', function () {
    parsed = ruleJS.parse("ROUND(EFFECT(0.1, 4),5)");
    expect(parsed.result).toBe(0.10381);
  });

  it('EOMONTH', function () {
    parsed = ruleJS.parse("EOMONTH('1/1/11', -3)");
    expect(parsed.result.toString()).toBe("Sun Oct 31 2010 00:00:00 GMT+0200 (CEST)");
  });

  it('ERF', function () {
    parsed = ruleJS.parse("ROUND(ERF(1),5)");
    expect(parsed.result).toBe(0.8427);
  });

  it('ERFC', function () {
    parsed = ruleJS.parse("ROUND(ERFC(1),5)");
    expect(parsed.result).toBe(0.1573);
  });

  it('EVEN', function () {
    parsed = ruleJS.parse("EVEN(-1)");
    expect(parsed.result).toBe(-2);
  });

  it('EXACT', function () {
    parsed = ruleJS.parse("EXACT('Word', 'Word')");
    expect(parsed.result).toBe(true);

    parsed = ruleJS.parse("EXACT('Word', 'word')");
    expect(parsed.result).toBe(false);
  });

  it('EXPONDIST', function () {
    parsed = ruleJS.parse("ROUND(EXPONDIST(0.2, 10, true),5)");
    expect(parsed.result).toBe(0.86466);
  });

  it('FALSE', function () {
    parsed = ruleJS.parse("FALSE()");
    expect(parsed.result).toBe(false);
  });

  it('FDIST', function () {
    parsed = ruleJS.parse("ROUND(FDIST(15.2069, 6, 4, false),5)");
    expect(parsed.result).toBe(0.00122);
  });

  it('FINV', function () {
    parsed = ruleJS.parse("ROUND(FINV(0.01, 6, 4),5)");
    expect(parsed.result).toBe(15.20686);
  });

  it('FISHER', function () {
    parsed = ruleJS.parse("ROUND(FISHER(0.75),5)");
    expect(parsed.result).toBe(0.97296);
  });

  it('FISHERINV', function () {
    parsed = ruleJS.parse("FISHERINV(0.9729550745276566)");
    expect(parsed.result).toBe(0.75);
  });

  it('INT', function () {
    parsed = ruleJS.parse("INT(-8.9)");
    expect(parsed.result).toBe(-9);
  });

  it('ISEVEN', function () {
    parsed = ruleJS.parse("ISEVEN(-2.5)");
    expect(parsed.result).toBe(true);
  });

  it('ISODD', function () {
    parsed = ruleJS.parse("ISODD(-2.5)");
    expect(parsed.result).toBe(false);
  });

  it('LN', function () {
    parsed = ruleJS.parse("ROUND(LN(86),5)");
    expect(parsed.result).toBe(4.45435);
  });

  it('LOG', function () {
    parsed = ruleJS.parse("LOG(8, 2)");
    expect(parsed.result).toBe(3);
  });

  it('LOG10', function () {
    parsed = ruleJS.parse("LOG10(100000)");
    expect(parsed.result).toBe(5);
  });

  it('MAX', function () {
    parsed = ruleJS.parse("MAX([0.1,0.2], [0.4,0.8], [true, false])");
    expect(parsed.result).toBe(0.8);
  });

  it('MAXA', function () {
    parsed = ruleJS.parse("MAXA([0.1,0.2], [0.4,0.8], [true, false])");
    expect(parsed.result).toBe(1);
  });

  it('MEDIAN', function () {
    parsed = ruleJS.parse("MEDIAN([1,2,3], [4,5,6])");
    expect(parsed.result).toBe(3.5);
  });

  it('MIN', function () {
    parsed = ruleJS.parse("MIN([0.1,0.2], [0.4,0.8], [true, false])");
    expect(parsed.result).toBe(0.1);
  });

  it('MINA', function () {
    parsed = ruleJS.parse("MINA([0.1,0.2], [0.4,0.8], [true, false])");
    expect(parsed.result).toBe(0);
  });

  it('MOD', function () {
    parsed = ruleJS.parse("MOD(3, -2)");
    expect(parsed.result).toBe(-1);
  });

  it('NOT', function () {
    parsed = ruleJS.parse("NOT(FALSE())");
    expect(parsed.result).toBe(true);
  });

  it('ODD', function () {
    parsed = ruleJS.parse("ODD(-1.5)");
    expect(parsed.result).toBe(-3);
  });

  it('OR', function () {
    parsed = ruleJS.parse('OR(true, false, true)');
    expect(parsed.result).toBe(true);
  });

  it('PI', function () {
    parsed = ruleJS.parse("ROUND(PI(),5)");
    expect(parsed.result).toBe(3.14159);
  });

  it('POWER', function () {
    parsed = ruleJS.parse("POWER(5, 2)");
    expect(parsed.result).toBe(25);
  });

  it('ROUND', function () {
    parsed = ruleJS.parse("ROUND(626.3, 2)");
    expect(parsed.result).toBe(626.3);

    parsed = ruleJS.parse("ROUND(626.3, -2)");
    expect(parsed.result).toBe(600);
  });

  it('ROUNDOWN', function () {
    parsed = ruleJS.parse("ROUNDDOWN(-3.14159, 2)");
    expect(parsed.result).toBe(-3.14);
  });

  it('ROUNDUP', function () {
    parsed = ruleJS.parse("ROUNDUP(-3.14159, 2)");
    expect(parsed.result).toBe(-3.15);
  });

  it('SIN', function () {
    parsed = ruleJS.parse("ROUND(SIN(1),5)");
    expect(parsed.result).toBe(0.84147);
  });

  it('SINH', function () {
    parsed = ruleJS.parse("ROUND(SINH(1),5)");
    expect(parsed.result).toBe(1.1752);
  });

  it('SPLIT', function () {
    parsed = ruleJS.parse("SPLIT('A,B,C', ',')");
    expect(parsed.result.join()).toBe('A,B,C');
  });

  it('SQRT', function () {
    parsed = ruleJS.parse("SQRT(16)");
    expect(parsed.result).toBe(4);
  });

  it('SQRTPI', function () {
    parsed = ruleJS.parse("ROUND(SQRTPI(2),5)");
    expect(parsed.result).toBe(2.50663);
  });

  it('SUM', function () {
    parsed = ruleJS.parse("SUM(-5, 15, 32, 'Hello World!')");
    expect(parsed.result).toBe(42);
  });

  it('SUMIF', function () {
    parsed = ruleJS.parse("SUMIF([2,4,8,16], '>5')");
    expect(parsed.result).toBe(24);
  });

  it('SUMIFS', function () {
    parsed = ruleJS.parse("SUMIFS([2,4,8,16], [1,2,3,4], '>=2', [1,2,4,8], '<=4')");
    expect(parsed.result).toBe(12);
  });

  it('SUMPRODUCT', function () {
    parsed = ruleJS.parse("SUMPRODUCT([[1,2],[3,4]], [[1,0],[0,1]])");
    expect(parsed.result).toBe(5);
  });

  it('SUMSQ', function () {
    parsed = ruleJS.parse("SUMSQ(3, 4)");
    expect(parsed.result).toBe(25);
  });

  it('SUMX2MY2', function () {
    parsed = ruleJS.parse("SUMX2MY2([1,2], [3,4])");
    expect(parsed.result).toBe(-20);
  });

  it('SUMX2PY2', function () {
    parsed = ruleJS.parse("SUMX2PY2([1,2], [3,4])");
    expect(parsed.result).toBe(30);
  });

  it('SUMXMY2', function () {
    parsed = ruleJS.parse("SUMXMY2([1,2], [3,4])");
    expect(parsed.result).toBe(8);
  });

  it('TAN', function () {
    parsed = ruleJS.parse("ROUND(TAN(1),5)");
    expect(parsed.result).toBe(1.55741);
  });

  it('TANH', function () {
    parsed = ruleJS.parse("ROUND(TANH(-2),5)");
    expect(parsed.result).toBe(-0.96403);
  });

  it('TRUNCATE', function () {
    parsed = ruleJS.parse("TRUNC(-8.9)");
    expect(parsed.result).toBe(-8);
  });

  it('TRUE', function () {
    parsed = ruleJS.parse("TRUE()");
    expect(parsed.result).toBe(true);
  });

  it('XOR', function () {
    parsed = ruleJS.parse("XOR(true, false, true)");
    expect(parsed.result).toBe(false);
  });
});
