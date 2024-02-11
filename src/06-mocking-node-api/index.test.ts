import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import fs_promises from 'fs/promises';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, 3000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(cb, 3000);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, 5000);
    expect(cb).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(5000);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, 1500);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(cb, 1500);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, 1500);
    expect(cb).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(45000);
    expect(cb).toHaveBeenCalledTimes(30);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.mock('path');
    path.join = jest.fn();
    readFileAsynchronously('./index');
    expect(path.join).toHaveBeenLastCalledWith(__dirname, './index');
  });

  test('should return null if file does not exist', async () => {
    const result = await readFileAsynchronously('./keke');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockedExists = jest.spyOn(fs, 'existsSync');
    const mockedReadDir = jest.spyOn(fs_promises, 'readFile');
    mockedExists.mockReturnValue(true);
    mockedReadDir.mockResolvedValue('hope this works');
    const result = await readFileAsynchronously('./keke');
    expect(result).toBe('hope this works');
  });
});
