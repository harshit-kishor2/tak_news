import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import Row from '../../components/Row';
import Spacer from '../../components/Spacer';
import Icon from 'react-native-vector-icons/FontAwesome';
import FilterSheet from './FilterSheet';
import SortSheet from './SortSheet';
import useNewsFeed from '../../../hooks/useNewsFeed';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const {getAllNews} = useNewsFeed();

  return (
    <>
      <Row style={styles.input}>
        <TextInput
          style={{fontSize: 16, color: 'black'}}
          placeholder="Search"
          placeholderTextColor="#00000060"
          value={query}
          onChangeText={t => {
            setQuery(t);
            getAllNews(t);
          }}
        />
        <Pressable>
          <Icon name="search" size={20} color={'black'}></Icon>
        </Pressable>
      </Row>
      <Spacer />
      <Row style={{width: '90%', justifyContent: 'space-between'}}>
        <Pressable
          onPress={() => {
            setSortVisible(!sortVisible);
          }}>
          <Row style={{alignItems: 'center'}}>
            <Text style={{color: '#525298'}}>Sort By</Text>
            <Spacer width={5} />
            <Icon name="sort" size={15}></Icon>
          </Row>
        </Pressable>
        <Pressable
          onPress={() => {
            setFilterVisible(!filterVisible);
          }}>
          <Row style={{alignItems: 'center'}}>
            <Text style={{color: '#525298'}}>Filter</Text>
            <Spacer width={5} />
            <Icon name="filter" size={15}></Icon>
          </Row>
        </Pressable>
      </Row>
      <Spacer height={15} />
      {filterVisible && (
        <FilterSheet
          filterVisible
          toggle={() => setFilterVisible(!filterVisible)}
        />
      )}
      {sortVisible && (
        <SortSheet sortVisible toggle={() => setSortVisible(!sortVisible)} />
      )}
    </>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  input: {
    width: '90%',
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
    backgroundColor: '#E9E9F2',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
