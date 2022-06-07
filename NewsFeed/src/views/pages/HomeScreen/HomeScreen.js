import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import NewsFeed from './NewsFeed';
import useProfile from '../../../hooks/useProfile';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const {getProfile} = useProfile();
  useEffect(() => {
    getProfile();
  }, [isFocused]);
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <NewsFeed />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
