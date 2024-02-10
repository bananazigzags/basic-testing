import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('users');
    jest.runAllTimers();
    expect(axiosCreateSpy).toHaveBeenLastCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetSpy = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi('users');
    jest.runAllTimers();
    expect(axiosGetSpy).toHaveBeenLastCalledWith('users');
  });

  test('should return response data', async () => {
    const axiosGetSpy = jest.spyOn(axios.Axios.prototype, 'get');
    axiosGetSpy.mockResolvedValue({ data: 'returned users' });
    const response = await throttledGetDataFromApi('users');
    jest.runAllTimers();
    expect(response).toBe('returned users');
  });
});
