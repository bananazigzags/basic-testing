// Uncomment the code below and write your tests
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import _ from 'lodash';

jest.unmock('lodash');

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1000);
    expect(account.getBalance()).toEqual(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    try {
      const account = getBankAccount(1000);
      account.withdraw(2000);
    } catch (e) {
      expect(e).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring more than balance', () => {
    try {
      const account = getBankAccount(1000);
      const account2 = getBankAccount(1000);
      account.transfer(2000, account2);
    } catch (e) {
      expect(e).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring to the same account', () => {
    try {
      const account = getBankAccount(1000);
      account.transfer(2000, account);
    } catch (e) {
      expect(e).toBeInstanceOf(TransferFailedError);
    }
  });

  test('should deposit money', () => {
    const account = getBankAccount(1000);
    expect(account.deposit(2000).getBalance()).toEqual(3000);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(1000);
    expect(account.withdraw(500).getBalance()).toEqual(500);
  });

  test('should transfer money', () => {
    const account = getBankAccount(1000);
    const account2 = getBankAccount(0);
    expect(account.transfer(500, account2).getBalance()).toEqual(500);
    expect(account2.getBalance()).toEqual(500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    _.random = jest.fn(() => 1);
    const account = getBankAccount(1000);
    const result = await account.fetchBalance();
    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    _.random = jest.fn(() => 1);
    const account = getBankAccount(1000);
    await account.synchronizeBalance();
    const newBalance = account.getBalance();
    expect(newBalance).toBe(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    _.random = jest.fn(() => 0);
    const account = getBankAccount(1000);
    try {
      await account.synchronizeBalance();
    } catch (e) {
      expect(e).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
