import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const SubmitButton = props => {
  const {children = 'Enter', style = {}, textStyle = {}, onPress} = props;

  return props.disabled ? (
    <TouchableOpacity
      disabled
      style={[styles.button, {backgroundColor: '#B3B3B3'}, style]}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {backgroundColor: '#525298'}, style]}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    height: 50,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',

    //borderRadius: 50,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 5,
    alignSelf: 'center',
  },

  text: {
    fontSize: 15,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    alignSelf: 'center',
  },
});

export default SubmitButton;
