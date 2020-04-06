import React from 'react';
import {render, fireEvent, cleanup} from 'react-native-testing-library';
import SearchItem from '.';

afterEach(cleanup);

test('should render correctly', () => {
  const wrapper = render(<SearchItem item="Santo Domingo" />);
  expect(wrapper.toJSON()).toMatchSnapshot();
});

test('should call onItemPress', () => {
  const mockPress = jest.fn();
  const {getByTestId} = render(
    <SearchItem
      testID="search-item"
      onItemPress={mockPress}
      item="Santo Domingo"
    />,
  );
  fireEvent(getByTestId('search-item'), 'onItemPress');
  expect(mockPress).toHaveBeenCalledTimes(1);
});

test('should call onClosePress', () => {
  const mockPress = jest.fn();
  const {getByTestId} = render(
    <SearchItem
      testID="search-item"
      onClosePress={mockPress}
      item="Santo Domingo"
    />,
  );
  fireEvent(getByTestId('search-item'), 'onClosePress');
  expect(mockPress).toHaveBeenCalledTimes(1);
});
