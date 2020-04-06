import React from 'react';
import {render, fireEvent, cleanup} from 'react-native-testing-library';
import {Keyboard} from 'react-native';
import SearchBar from '.';

afterEach(cleanup);
test('should render correctly', () => {
  const wrapper = render(<SearchBar value="test" />);
  expect(wrapper.toJSON()).toMatchSnapshot();
});

test('should be able to call on change text', () => {
  const mockEvent = jest.fn();
  const {getByTestId} = render(<SearchBar value="" onChangeText={mockEvent} />);
  const searchBar = getByTestId('search-bar');
  fireEvent(searchBar, 'changeText', 'test');
  expect(mockEvent).toHaveBeenCalledWith('test');
});

test('should be able to call on submit editing', () => {
  const mockEvent = jest.fn();
  const {getByTestId} = render(
    <SearchBar value="" onSubmitEditing={mockEvent} />,
  );
  const searchBar = getByTestId('search-bar');
  fireEvent(searchBar, 'submitEditing');
  expect(mockEvent).toHaveBeenCalledTimes(1);
});

test('should dismiss keyboard on search clear', () => {
  const mockEvent = jest.spyOn(Keyboard, 'dismiss');
  const {getByTestId} = render(<SearchBar value="" />);
  const searchBar = getByTestId('search-bar');
  fireEvent(searchBar, 'clear');
  expect(mockEvent).toHaveBeenCalledTimes(1);
  mockEvent.mockRestore();
});

test('should set keyboard listeners', () => {
  const mockEvent = jest.spyOn(Keyboard, 'addListener');
  render(<SearchBar value="" />);
  expect(mockEvent).toHaveBeenCalledTimes(2);
  expect(mockEvent.mock.calls[0][0]).toBe('keyboardWillShow');
  expect(mockEvent.mock.calls[1][0]).toBe('keyboardWillHide');
});
