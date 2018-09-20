const expect = require('expect');
let {isRealString} = require('./validation');

describe('isRealString', () => {
  it ('should reject non-string values', () => {
    expect(isRealString(123)).toBeFalsy();
    expect(isRealString(true)).toBeFalsy();
  });
  
  it ('should reject strings with only spaces', () => {
    expect(isRealString('    ')).toBeFalsy();
  });

  it ('should allow string with non space characters', () => {
    expect(isRealString('   test  ')).toBeTruthy();
  });
});