import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BottomSheet} from 'react-native-btr';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Row from '../../components/Row';
import Spacer from '../../components/Spacer';
import Column from '../../components/Column';
import {Pressable} from 'react-native';
import useNewsFeed from '../../../hooks/useNewsFeed';
const SortSheet = ({sortVisible, toggle}) => {
  const {sortAllNews} = useNewsFeed();
  return (
    <BottomSheet
      visible={sortVisible}
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
            Sort By
          </Text>
          <Pressable onPress={toggle}>
            <Icon name="close" size={25}></Icon>
          </Pressable>
        </Row>
        <View style={{height: 1, backgroundColor: '#f5f5f580'}}></View>
        <Spacer height={12} />
        <Column>
          <Pressable
            onPress={() => {
              sortAllNews();
              toggle();
            }}>
            <Text style={{color: 'black', fontSize: 16}}>Most Recent</Text>
          </Pressable>
        </Column>
      </View>
    </BottomSheet>
  );
};

export default SortSheet;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    height: 150,
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
