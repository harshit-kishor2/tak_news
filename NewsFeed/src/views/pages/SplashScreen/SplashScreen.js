import {StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container} from '../../components';
import {Router} from '../../../routes/Router';

const SplashScreen = () => {
  const [isSplash, setisSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setisSplash(false);
    }, 2000);
  }, []);

  return isSplash ? (
    <Container hp={100} style={styles.container}>
      <Text>Splash Screen</Text>
    </Container>
  ) : (
    <Router />
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
