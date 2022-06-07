import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const LanguageButton = ({initValue, handleChange}) => {
  const [checked, setChecked] = useState(initValue);
  var langauages = ['Hindi', 'English'];
  return (
    <>
      <View style={styles.radio}>
        {langauages.map((langauage, key) => {
          return (
            <View key={langauage}>
              {checked == langauage ? (
                <TouchableOpacity
                  style={[styles.btn, {backgroundColor: '#525298'}]}>
                  <Text style={{color: 'white'}}>{langauage}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setChecked(langauage);
                    handleChange(langauage);
                  }}
                  style={[
                    styles.btn,
                    {
                      borderWidth: 1,
                    },
                  ]}>
                  <Text>{langauage}</Text>
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
    justifyContent: 'center',
    height: 40,
    width: 90,
  },
  radio: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
});

export default LanguageButton;
