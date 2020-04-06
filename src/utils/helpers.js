import AsyncStorage from '@react-native-community/async-storage';

/**
 * Stores data in local storage as key value
 * @param {String} key
 * @param {String} value
 * @returns {Promise}
 */
export const storeInLocalStorage = (key, value) =>
  AsyncStorage.setItem(key, JSON.stringify(value));

/**
 * Gets data from local storage as JSON. Returns null if no data.
 * @param {String} key
 * @param {String} value
 * @returns {Promise}
 */
export const getFromLocalStorage = async key =>
  JSON.parse(await AsyncStorage.getItem(key));

/**
 * Removes the specify data from local storage
 * @param {String} key
 * @returns {Promise}
 */
export const removeFromLocalStorage = key => AsyncStorage.removeItem(key);
