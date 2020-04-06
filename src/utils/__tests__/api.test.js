import axios from 'axios';
import mockResponse from '../../../__mocks__/mockWeatherResponse';
import api from '../api';

jest.mock('axios');

test('should get current weather', async () => {
  axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
  const response = await api.getWeather('Santo Domingo');
  expect(response).toEqual(mockResponse);
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith('/weather', {
    params: {
      q: 'Santo Domingo',
    },
  });
});
