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

  it('BETADIST(2, 8, 10, true, 1, 3)', function () {
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

  it('CHAR(65)', function () {
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

  it('CONFIDENCENORM', function () {
    parsed = ruleJS.parse("ROUND(CONFIDENCENORM(0.05, 2.5, 50),5)");
    expect(parsed.result).toBe(0.69295);
  });

  it('CONFIDENCET', function () {
    parsed = ruleJS.parse("ROUND(CONFIDENCET(0.05, 1, 50), 5)");
    expect(parsed.result).toBe(0.2842);
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

  it('COUNTUNIQUE', function () {
    parsed = ruleJS.parse("COUNTUNIQUE([1,1,2,2,3,3])");
    expect(parsed.result).toBe(3);
  });

});
