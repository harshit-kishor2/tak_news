import {Image, Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import Row from '../../components/Row';
import {useNavigation} from '@react-navigation/native';
import routesName from '../../../constants/routesName';
import useProfile from '../../../hooks/useProfile';
import {API} from '../../../constants';

const WelcomeRow = () => {
  const navigation = useNavigation();
  const {userProfile} = useProfile();
  return (
    <>
      <Row style={styles.rowContainer}>
        <Row style={styles.profileRow}>
          <Pressable onPress={() => navigation.navigate(routesName.PROFILE)}>
            <Image
              style={styles.imageStyle}
              source={{
                uri:
                  `${API.BASE_URL}/${userProfile?.pictures}` ??
                  'https://lh3.googleusercontent.com/ogw/ADea4I4EzY5FGsHOtgWihgfbTGBoC3fyB5pN0dL7ZhwPDg=s64-c-mo',
              }}
            />
          </Pressable>
          <Text style={styles.userText}>Hi User</Text>
        </Row>
        <Text style={styles.welcomeText}>Welcome</Text>
      </Row>
    </>
  );
};

export default WelcomeRow;

const styles = StyleSheet.create({
  rowContainer: {
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 15,
  },
  profileRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    overflow: 'hidden',
  },
  userText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
  },
  welcomeText: {
    fontSize: 20,
    marginLeft: 10,
  },
});
