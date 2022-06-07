import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
const Radio = ({initVal, handleChange}) => {
  const [checked, setChecked] = useState(initVal);
  var gender = ['Male', 'Female'];
  return (
    <>
      <View style={styles.radio}>
        {gender.map((gender, key) => {
          return (
            <View key={gender}>
              {checked == gender ? (
                <TouchableOpacity style={styles.btn}>
                  <Icon
                    name="radio-button-checked"
                    size={20}
                    color={'#525298'}
                  />
                  <Text>{gender}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setChecked(gender);
                    handleChange(gender);
                  }}
                  style={styles.btn}>
                  <Icon
                    name="radio-button-unchecked"
                    size={20}
                    color={'#525298'}
                  />
                  <Text>{gender}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
});

export default Radio;
