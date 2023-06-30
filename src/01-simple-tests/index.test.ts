import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 42, b: 69, action: Action.Add });
    expect(result).toEqual(111);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 100, b: 1, action: Action.Subtract });
    expect(result).toEqual(99);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 4, b: -3, action: Action.Multiply });
    expect(result).toEqual(-12);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 88, b: 8, action: Action.Divide });
    expect(result).toEqual(11);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 8,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toEqual(512);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 8, b: 3, action: 'multiply' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 'ola', b: 3, action: Action.Add });
    expect(result).toBeNull();
  });
});
