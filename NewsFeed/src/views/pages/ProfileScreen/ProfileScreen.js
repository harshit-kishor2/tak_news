import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Button,
  Pressable,
  Image,
  Keyboard,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Row from '../../components/Row';
import Column from '../../components/Column';
import Spacer from '../../components/Spacer';
import SubmitButton from './SubmitButton';
import Radio from './RadioButton';
import LanguageButton from './LanguageButton';
import DropdownButton from './DropdownComponant';
import DATA from './dropdownData';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useFormik} from 'formik';
import {ValidationSchema} from '../../../helpers';
import SimpleToast from 'react-native-simple-toast';
import dayjs from 'dayjs';
import {launchImageLibrary} from 'react-native-image-picker';
import useProfile from '../../../hooks/useProfile';
import {useNavigation} from '@react-navigation/native';
import {API} from '../../../constants';
const ProfileScreen = () => {
  const [hidePass, setHidePass] = useState();
  const [timeStatus, setTimeStatus] = useState('AM');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [tnc, setTnc] = useState(false);
  const [imageData, setImageData] = useState(false);
  const navigation = useNavigation();
  const {addProfile, updateProfile, userProfile} = useProfile();
  useEffect(() => {
    userProfile && setTimeStatus(userProfile.timeStatus);
  }, []);
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    values,
    errors,
    touched,
    isValid,
    resetForm,
  } = useFormik({
    validationSchema: ValidationSchema.profileSchema,
    initialValues: {
      username: userProfile?.username ?? '',
      email: userProfile?.email ?? '',
      password: userProfile?.password ?? '',
      mobile: userProfile?.mobile ?? '',
      countryCode: userProfile?.countryCode ?? '+91',
      gender: userProfile?.gender ?? 'Male',
      language: userProfile?.language ?? 'Hindi',
      marital: userProfile?.marital ?? '',
      date: userProfile?.date ?? '',
      month: userProfile?.month ?? '',
      year: userProfile?.year ?? '',
      birthTime: userProfile?.birthTime ?? '',
      pictures: userProfile?.pictures
        ? `${API.BASE_URL}/${userProfile?.pictures}`
        : '',
    },
    onSubmit: (value, {resetForm}) => {
      Keyboard.dismiss();
      let data = {
        id: '1',
        username: value.username,
        email: value.email,
        timeStatus: timeStatus,
        birthTime: value.birthTime,
        year: value.year,
        month: value.month,
        date: value.date,
        marital: value.marital,
        language: value.language,
        gender: value.gender,
        password: value.password,
        mobile: value.mobile,
        countryCode: value.countryCode,
      };
      var formData = new FormData();
      formData.append('id', '1');
      formData.append('username', value.username);
      formData.append('email', value.email);
      formData.append('timeStatus', timeStatus);
      formData.append('birthTime', value.birthTime);
      formData.append('year', value.year);
      formData.append('month', value.month);
      formData.append('date', value.date);
      formData.append('marital', value.marital);
      formData.append('language', value.language);
      formData.append('gender', value.gender);
      formData.append('password', value.password);
      formData.append('mobile', value.mobile);
      formData.append('countryCode', value.countryCode);
      formData.append('image', imageData);

      userProfile && userProfile.id === '1'
        ? updateProfile(data).then(res => {
            if (res.payload == 'Success') {
              SimpleToast.show('User profile updated successfully!');
              navigation.pop();
            }
          })
        : addProfile(formData).then(res => {
            if (res.payload == 'Success') {
              SimpleToast.show('User profile added successfully!');
              navigation.pop();
            }
          });
    },
  });

  // Configuration for image picker
  const options = {
    mediaType: 'photo',
    maxWidth: 400,
    maxHeight: 400,
  };

  //! On open camera function
  const onOpenCamera = () => {
    launchImageLibrary(options, res => {
      if (res.assets) {
        res.assets.map(a => {
          let b = {
            name: a.fileName,
            type: a.type,
            uri: Platform.OS === 'ios' ? a.uri.replace('file://', '') : a.uri,
          };
          setFieldValue('pictures', b.uri);
          setImageData(b);
        });
      }
    });
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <ScrollView>
          <Container p={10}>
            <Row style={{alignItems: 'center'}}>
              <Column style={{width: '70%', margin: 0}}>
                <Text>Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your username"
                  placeholderTextColor="#00000060"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                />
                {errors.username && touched.username && (
                  <Text style={{color: 'red'}}>{errors.username}</Text>
                )}
              </Column>
              <Column
                style={{
                  width: '30%',
                  margin: 0,
                  paddingLeft: 30,
                  alignItems: 'flex-end',
                }}>
                <Row
                  style={{
                    width: '100%',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                  }}>
                  <Pressable onPress={onOpenCamera}>
                    <Icon name="camera" size={20} color={'#525298'} />
                  </Pressable>
                  <Image
                    style={styles.imageStyle}
                    source={{
                      uri: values.pictures
                        ? values.pictures
                        : 'https://lh3.googleusercontent.com/ogw/ADea4I4EzY5FGsHOtgWihgfbTGBoC3fyB5pN0dL7ZhwPDg=s64-c-mo',
                    }}
                  />
                </Row>
              </Column>
            </Row>
          </Container>
          <Container p={10}>
            <Column style={{width: '100%', margin: 0}}>
              <Text>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="Your email-id"
                placeholderTextColor="#00000060"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              {errors.email && touched.email && (
                <Text style={{color: 'red'}}>{errors.email}</Text>
              )}
            </Column>
          </Container>
          <Container p={10}>
            <Column style={{width: '100%', margin: 0}}>
              <Text>Password</Text>
              <Row
                style={{
                  width: '100%',
                  height: 50,
                  borderWidth: 1,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                <TextInput
                  style={{color: 'black'}}
                  placeholder="Min 8 char"
                  placeholderTextColor="#00000060"
                  secureTextEntry={!hidePass}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
                <Pressable onPress={() => setHidePass(!hidePass)}>
                  <Icon
                    name={!hidePass ? 'eye-slash' : 'eye'}
                    size={20}
                    color={'black'}></Icon>
                </Pressable>
              </Row>
              {errors.password && touched.password && (
                <Text style={{color: 'red'}}>{errors.password}</Text>
              )}
            </Column>
          </Container>
          <Container p={10}>
            <Column style={{width: '100%', margin: 0}}>
              <Text>Phone Number</Text>
              <Row>
                <Column style={{width: '30%', margin: 0}}>
                  <DropdownButton
                    style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    type="code"
                    data={DATA.countryCode}
                    initValue={values.countryCode}
                    handleChange={value => setFieldValue('countryCode', value)}
                  />
                </Column>
                <Column style={{width: '70%', margin: 0}}>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderLeftWidth: 0,
                        paddingBottom: 10,
                      },
                    ]}
                    placeholder="Enter Mobile No"
                    placeholderTextColor="#00000060"
                    keyboardType="number-pad"
                    value={values.mobile}
                    onChangeText={handleChange('mobile')}
                    onBlur={handleBlur('mobile')}
                  />
                </Column>
              </Row>
              {errors.mobile && touched.mobile && (
                <Text style={{color: 'red'}}>{errors.mobile}</Text>
              )}
            </Column>
          </Container>
          <Container p={10}>
            <Row
              style={{
                width: '100%',
                margin: 0,
                justifyContent: 'space-between',
              }}>
              <Text>Gender</Text>
              <Radio
                initVal={values.gender}
                handleChange={value => setFieldValue('gender', value)}
              />
            </Row>
          </Container>
          <Container p={10}>
            <Row
              style={{
                width: '100%',
                margin: 0,
                justifyContent: 'space-between',
              }}>
              <Text>Language</Text>
              <LanguageButton
                initValue={values.language}
                handleChange={value => setFieldValue('language', value)}
              />
            </Row>
          </Container>
          <Container p={10}>
            <Column style={{width: '100%', margin: 0}}>
              <Text>Marital Status</Text>
              <DropdownButton
                type="marital"
                data={DATA.marital}
                initValue={values.marital}
                handleChange={value => setFieldValue('marital', value)}
              />
              {errors.marital && touched.marital && (
                <Text style={{color: 'red'}}>{errors.marital}</Text>
              )}
            </Column>
          </Container>
          <Container p={10}>
            <Column style={{width: '100%', margin: 0}}>
              <Text>Date Of Birth</Text>
              <Row
                style={{
                  width: '100%',
                  margin: 0,
                  justifyContent: 'space-between',
                }}>
                <Column style={{width: '30%', margin: 0}}>
                  <DropdownButton
                    type={'day'}
                    data={DATA.day}
                    initValue={values.date}
                    handleChange={value => setFieldValue('date', value)}
                  />
                </Column>
                <Column style={{width: '30%', margin: 0}}>
                  <DropdownButton
                    type={'month'}
                    data={DATA.month}
                    initValue={values.month}
                    handleChange={value => setFieldValue('month', value)}
                  />
                </Column>
                <Column style={{width: '30%', margin: 0}}>
                  <DropdownButton
                    type={'year'}
                    data={DATA.year}
                    initValue={values.year}
                    handleChange={value => setFieldValue('year', value)}
                  />
                </Column>
              </Row>
              {(errors.month || errors.date || errors.year) && (
                <Text style={{color: 'red'}}>
                  {errors.month || errors.date || errors.year}
                </Text>
              )}
            </Column>
          </Container>
          <Container p={10}>
            <Column style={{width: '100%', margin: 0}}>
              <Text>Time Of Birth</Text>
              <Row
                style={{
                  width: '100%',
                  height: 50,
                  borderWidth: 1,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                <Pressable
                  onPress={() => {
                    setDatePickerVisible(true);
                  }}>
                  <Text>
                    {values.birthTime ? values.birthTime : 'Choose Time'}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setTimeStatus(timeStatus == 'AM' ? 'PM' : 'AM');
                  }}>
                  <Row
                    style={{
                      backgroundColor:
                        timeStatus == 'AM' ? '#B3B3B3' : '#525298',
                      alignItems: 'center',
                      borderRadius: 13,
                    }}>
                    {timeStatus == 'AM' && (
                      <View
                        style={{
                          backgroundColor: 'white',
                          width: 25,
                          height: 25,
                          borderRadius: 13,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Icon name="sun" size={20}></Icon>
                      </View>
                    )}
                    <Spacer width={8} />
                    <Text
                      style={{color: timeStatus == 'AM' ? 'black' : 'white'}}>
                      {timeStatus}
                    </Text>
                    <Spacer width={8} />
                    {timeStatus == 'PM' && (
                      <View
                        style={{
                          backgroundColor: 'white',
                          width: 25,
                          height: 25,
                          borderRadius: 13,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Icon name="moon" size={15} color="#525298"></Icon>
                      </View>
                    )}
                  </Row>
                </Pressable>
              </Row>
              {errors.birthTime && touched.birthTime && (
                <Text style={{color: 'red'}}>{errors.birthTime}</Text>
              )}
              {datePickerVisible && (
                <DateTimePicker
                  value={new Date()}
                  mode={'time'}
                  is24Hour={false}
                  display="default"
                  onChange={(event, date) => {
                    setDatePickerVisible(false);
                    setFieldValue('birthTime', dayjs(date).format('hh:mm'));
                  }}
                />
              )}
            </Column>
          </Container>
          <Container p={10}>
            <Row style={{width: '100%', margin: 0, alignItems: 'center'}}>
              <Pressable
                onPress={() => {
                  setTnc(!tnc);
                }}>
                {tnc ? (
                  <Icon name="check-circle" size={20} color={'#525298'}></Icon>
                ) : (
                  <Icon name="circle" size={20} color={'black'}></Icon>
                )}
              </Pressable>
              <Spacer width={15}></Spacer>
              <Text>I accept the terms and privacy policy.</Text>
            </Row>
          </Container>
          <Spacer height={15} />
          <SubmitButton
            disabled={!isValid}
            onPress={() => {
              if (tnc) {
                handleSubmit();
              } else if (values?.pictures == '') {
                SimpleToast.show('Please upload picture.');
              } else {
                SimpleToast.show('Please accept terms and conditions.');
              }
            }}
          />
          <Spacer height={15} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
    backgroundColor: '#f5f5f5',
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 1,
    borderColor: 'grey',
    overflow: 'hidden',
  },
});
