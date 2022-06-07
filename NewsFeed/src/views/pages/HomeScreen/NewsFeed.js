import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import Row from '../../components/Row';
import Column from '../../components/Column';
import Spacer from '../../components/Spacer';
import WelcomeRow from './WelcomeRow';
import SearchBox from './SearchBox';
import Container from '../../components/Container';
import useNewsFeed from '../../../hooks/useNewsFeed';
import {API} from '../../../constants';
import dayjs from 'dayjs';

const NewsFeed = () => {
  const {getAllNews, newsList} = useNewsFeed();

  useEffect(() => {
    getAllNews('');
  }, []);

  // Componant for Empty list
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
    return <View style={{height: 1, backgroundColor: '#00000030'}}></View>;
  };
  //List Header componant
  const listHeaderComponent = () => {
    return (
      <Container wp={100}>
        <Container wp={100} backgroundColor={'#f5f5f5'}>
          <WelcomeRow />
          <SearchBox />
        </Container>
      </Container>
    );
  };
  // Componant for Empty list
  const listFooterComponent = () => {
    return <View style={{height: 4}}></View>;
  };
  // Componant for render list
  const renderItemComponant = ({item, index}) => {
    return (
      <Row style={{width: '90%'}}>
        <Column>
          <Image
            style={styles.imageStyle}
            source={{
              uri: `${API.BASE_URL}/${item.imagePath}`,
            }}
          />
        </Column>
        <Column style={{justifyContent: 'space-between'}}>
          <View>
            <Row>
              <Text style={{color: '#525298', fontWeight: 'bold'}}>
                {item.category.toUpperCase()}
              </Text>
              <Spacer width={12} />

              <Text> {dayjs(item.createdAt).format('DD-MMM-YYYY')}</Text>
            </Row>
            <Row style={{width: '80%'}}>
              <Text
                style={{color: 'black', fontWeight: 'bold', lineHeight: 20}}>
                {item.headline}
              </Text>
            </Row>
          </View>
          <Row>
            <Text>by</Text>
            <Spacer width={5} />
            <Text style={{color: '#525298', fontWeight: '500'}}>
              {item.author}
            </Text>
          </Row>
        </Column>
      </Row>
    );
  };
  return (
    <FlatList
      style={{backgroundColor: 'white'}}
      data={newsList}
      renderItem={renderItemComponant}
      ListEmptyComponent={renderEmptyComponant}
      keyExtractor={keyExtractorComponant}
      ItemSeparatorComponent={separatorComponent}
      ListHeaderComponent={listHeaderComponent()}
      ListFooterComponent={listFooterComponent()}
      stickyHeaderIndices={[0]}
    />
  );
};

export default NewsFeed;

const styles = StyleSheet.create({
  imageStyle: {
    width: 120,
    height: 120,
    borderRadius: 5,
    overflow: 'hidden',
  },
});
