import axios from 'axios';

axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5';

axios.interceptors.request.use(config => {
  config.params = config.params || {};
  //can be handle by an env file
  config.params.appid = '30785b61aaad26d60137eba5286e4f2d';
  config.params.units = 'metric';
  return config;
});

export default {
  /**
   * get current weather
   * @param {string} city
   */
  getWeather(city) {
    return axios.get('/weather', {params: {q: city}});
  },
};
