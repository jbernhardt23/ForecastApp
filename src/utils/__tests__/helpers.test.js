import {
  storeInLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from '../helpers';

test('can store data in local storage', async () => {
  await storeInLocalStorage('test', 'test');
  expect(await getFromLocalStorage('test')).toBe('test');
});

test('can delete data in local storage', async () => {
  await storeInLocalStorage('test', 'test');
  await removeFromLocalStorage('test');
  expect(await getFromLocalStorage('test')).toBeNull();
});
