// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList<number>([5, 6, 123]);
    expect(list).toStrictEqual({
      value: 5,
      next: {
        value: 6,
        next: {
          value: 123,
          next: {
            value: null,
            next: null,
          },
        },
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList<number>([5, 6, 123]);
    expect(list).toMatchSnapshot();
  });
});
