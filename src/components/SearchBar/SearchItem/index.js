import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from 'react-native-elements';

const SearchItem = ({item, onItemPress, onClosePress}) => {
  return (
    <View style={styles.contianer}>
      <TouchableOpacity style={styles.item} onPress={onItemPress}>
        <Text style={styles.text}>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClosePress} style={styles.icon}>
        <Icon name="close" size={16} />
      </TouchableOpacity>
    </View>
  );
};

SearchItem.propTypes = {
  item: PropTypes.string.isRequired,
  onItemPress: PropTypes.func,
  onClosePress: PropTypes.func,
};

const styles = StyleSheet.create({
  contianer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey5,
  },
  text: {
    fontSize: 16,
  },
  item: {
    paddingVertical: 10,
    marginStart: 15,
    flex: 1,
  },
  icon: {
    marginLeft: 'auto',
    marginEnd: 15,
  },
});

export default SearchItem;
