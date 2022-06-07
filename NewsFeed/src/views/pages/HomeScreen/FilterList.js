import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Row from '../../components/Row';
import Spacer from '../../components/Spacer';
import useNewsFeed from '../../../hooks/useNewsFeed';
let DATA = [
  {id: 1, title: 'Technology', name: 'Tech', isSelected: false},
  {id: 2, title: 'Technology', name: 'Ui', isSelected: false},
  {id: 3, title: 'Technology', name: 'Design', isSelected: false},
  {id: 4, title: 'Technology', name: 'Ai', isSelected: false},
  {id: 5, title: 'Technology', name: 'Marketing', isSelected: false},
  {id: 6, title: 'Author', name: 'Steve Jobs', isSelected: false},
  {id: 7, title: 'Author', name: 'Matt', isSelected: false},
  {id: 8, title: 'Author', name: 'Christian', isSelected: false},
  {id: 9, title: 'Author', name: 'Daniel Bell', isSelected: false},
  {id: 10, title: 'Author', name: 'Alvin Toffler', isSelected: false},
];
const FilterList = ({selectedFilter, toggle}) => {
  const {filterAllNews} = useNewsFeed();
  let dataShow = DATA.filter(item => item.title == selectedFilter);
  const [filterSelected, setFilterSelected] = useState([]);

  const renderItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          DATA.forEach(item1 => {
            if (item1.id == item.id) {
              item1.isSelected = !item1.isSelected;
              setFilterSelected([item]);
            }
          });
        }}>
        <Row style={{width: '90%', paddingHorizontal: 15}}>
          {item.isSelected ? (
            <Icon name="checkbox-marked" size={20} color={'#525298'}></Icon>
          ) : (
            <Icon
              name="checkbox-blank-outline"
              size={20}
              color={'black'}></Icon>
          )}
          <Spacer width={10} />
          <Text>{item.name}</Text>
        </Row>
      </Pressable>
    );
  };
  const renderEmptyComponant = () => {
    return (
      <Row>
        <Text>No news feed available</Text>
      </Row>
    );
  };
  // Componant for Empty list
  const keyExtractorComponant = (item, index) => {
    return `key-${index}`;
  };
  // Componant for Empty list
  const separatorComponent = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#00000030',
          marginVertical: 15,
        }}
      />
    );
  };
  // Componant for Empty list
  const listFooterComponent = () => {
    return <View style={{height: 4}}></View>;
  };
  return (
    <>
      <FlatList
        data={dataShow}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponant}
        keyExtractor={keyExtractorComponant}
        ItemSeparatorComponent={separatorComponent}
        ListFooterComponent={listFooterComponent}
        extraData={filterSelected}
      />
      <Row style={{justifyContent: 'center', paddingTop: 10}}>
        <Pressable
          onPress={() => {
            DATA.forEach(item1 => {
              item1.isSelected = false;
              setFilterSelected([]);
            });
          }}>
          <View
            style={{
              width: 80,
              borderWidth: 1,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <Text>Reset</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            filterAllNews(DATA);
            toggle();
          }}>
          <View
            style={{
              width: 80,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#525298',
            }}>
            <Text style={{color: 'white'}}>Apply</Text>
          </View>
        </Pressable>
      </Row>
    </>
  );
};

export default FilterList;

const styles = StyleSheet.create({});
