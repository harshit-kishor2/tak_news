import {StyleSheet, Text, View, Pressable, FlatList} from 'react-native';
import React, {useState} from 'react';
import {BottomSheet} from 'react-native-btr';
import Row from '../../components/Row';
import Column from '../../components/Column';
import Spacer from '../../components/Spacer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FilterList from './FilterList';
const FilterSheet = ({filterVisible, toggle}) => {
  const [selectedFilter, setSelectedFilter] = useState('Technology');
  return (
    <BottomSheet
      visible={filterVisible}
      onBackButtonPress={toggle}
      onBackdropPress={toggle}>
      <View style={styles.card}>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 5,
          }}>
          <Text style={{fontWeight: '700', color: 'black', fontSize: 16}}>
            Filter By
          </Text>
          <Pressable onPress={toggle}>
            <Icon name="close" size={25}></Icon>
          </Pressable>
        </Row>
        <View style={{height: 1, backgroundColor: '#f5f5f580'}}></View>
        <Row style={{margin: 0, padding: 0, height: '90%'}}>
          <Column style={{width: '30%'}}>
            <Pressable onPress={() => setSelectedFilter('Technology')}>
              <Text
                style={[
                  {color: 'black', fontSize: 16},
                  selectedFilter == 'Technology' && {fontWeight: '700'},
                ]}>
                Technology
              </Text>
            </Pressable>
            <Spacer height={25} />
            <Pressable onPress={() => setSelectedFilter('Author')}>
              <Text
                style={[
                  {color: 'black', fontSize: 16},
                  selectedFilter == 'Author' && {fontWeight: '700'},
                ]}>
                Author
              </Text>
            </Pressable>
          </Column>
          <Column
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: '#F3F3F8',
              margin: 0,
              padding: 10,
            }}>
            <FilterList selectedFilter={selectedFilter} toggle={toggle} />
          </Column>
        </Row>
      </View>
    </BottomSheet>
  );
};

export default FilterSheet;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    height: 350,
    paddingTop: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
