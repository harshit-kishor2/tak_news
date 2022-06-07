import DropDownPicker from 'react-native-dropdown-picker';
import {LogBox, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DropdownComponant = ({
  type,
  data = [],
  style,
  initValue,
  handleChange,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initValue);
  const [items, setItems] = useState(data);
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <DropDownPicker
      style={style}
      placeholder={
        type == 'day'
          ? 'DD'
          : type == 'month'
          ? 'MM'
          : type == 'year'
          ? 'YYYY'
          : 'Select'
      }
      showArrowIcon={true}
      showTickIcon={true}
      open={open}
      value={initValue}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      onSelectItem={item => {
        handleChange(item.value);
      }}
      setItems={setItems}
      listMode={'SCROLLVIEW'}
    />
  );
};

export default DropdownComponant;

const styles = StyleSheet.create({});
