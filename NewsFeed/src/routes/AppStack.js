import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, ProfileScreen} from '../views/pages';
import {RouteName} from '../constants';
const Stack = createNativeStackNavigator();
export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        /* screenOptions={{
          headerShown: false,
        }} */
        options={{headerShown: false}}
        name={RouteName.DASHBOARD}
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          title: 'User Profile',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F3F3F8',
          },
          //headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name={RouteName.PROFILE}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};
