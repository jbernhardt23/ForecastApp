import React from 'react';
import {
  render,
  flushMicrotasksQueue,
  cleanup,
} from 'react-native-testing-library';
import * as helpers from '../../utils/helpers';
import api from '../../utils/api';
import ForecastScreen from '.';

jest.mock('react-native-maps', () => {
  const {View} = require('react-native');
  const MockMapView = props => {
    return <View>{props.children}</View>;
  };
  const MockMarker = props => {
    return <View>{props.children}</View>;
  };
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  };
});

afterEach(cleanup);

test('should render correctly', () => {
  const wrapper = render(<ForecastScreen />);
  expect(wrapper.toJSON()).toMatchSnapshot();
});

test('should get recent cities from local storage', async () => {
  const mockStorage = jest.spyOn(helpers, 'getFromLocalStorage');
  mockStorage.mockResolvedValue(['Santo Domingo']);
  const {queryByTestId} = render(<ForecastScreen testID="forecast" />);
  queryByTestId('forecast');
  await flushMicrotasksQueue();
  const search = queryByTestId('search');
  expect(search.props.recentSearch).toStrictEqual(['Santo Domingo']);
});

test('should be able to search the weather for a city', async () => {
  const mockApi = jest.spyOn(api, 'getWeather');
  mockApi.mockResolvedValue({data: {}});
  const {queryByTestId} = render(<ForecastScreen />);
  const search = queryByTestId('search');
  search.props.onChangeText('Santo Domingo');
  search.props.onSubmitEditing();
  expect(mockApi).toHaveBeenCalledWith('Santo Domingo');
});
