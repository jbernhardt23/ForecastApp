import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, FlatList, StyleSheet, Keyboard} from 'react-native';
import {SearchBar as NativeSearchBar} from 'react-native-elements';
import SearchItem from './SearchItem';

const SearchBar = ({
  value,
  onChangeText,
  recentSearch,
  onSubmitEditing,
  isLoading,
  placeholder,
  onItemPress,
  onItemRemove,
}) => {
  const [isListVisible, setListVisibilty] = useState(false);
  useEffect(() => {
    //keyboard will show does not exist in android
    Keyboard.addListener('keyboardDidShow', keyboardWillShow);
    Keyboard.addListener('keyboardDidHide', keyboardWillHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardWillShow);
      Keyboard.removeListener('keyboardDidHide', keyboardWillHide);
    };
  }, []);

  const keyboardWillShow = () => {
    setListVisibilty(true);
  };

  const keyboardWillHide = () => {
    setListVisibilty(false);
  };

  const _itemPress = item => {
    Keyboard.dismiss();
    onItemPress(item);
  };

  const _removeItem = item => {
    onItemRemove(item);
  };

  return (
    <View>
      <NativeSearchBar
        testID="search-bar"
        showLoading={isLoading}
        lightTheme
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        value={value}
        inputStyle={styles.input}
        placeholder={placeholder}
        onClear={() => Keyboard.dismiss()}
      />
      {isListVisible && (
        <FlatList
          testID="search-items-list"
          keyboardShouldPersistTaps="handled"
          data={recentSearch}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <SearchItem
              item={item}
              onItemPress={() => _itemPress(item)}
              onClosePress={() => _removeItem(item)}
            />
          )}
        />
      )}
    </View>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  recentSearch: PropTypes.arrayOf(PropTypes.string),
  onSubmitEditing: PropTypes.func,
  isLoading: PropTypes.bool,
  placeholder: PropTypes.string,
  onItemPress: PropTypes.func,
  onItemRemove: PropTypes.func,
};

SearchBar.defaultProps = {
  recentSearch: [],
};

const styles = StyleSheet.create({
  input: {
    color: '#000',
  },
});

export default SearchBar;
