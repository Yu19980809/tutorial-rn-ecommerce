import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import AddressScreen from '../screens/AddressScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import OrderScreen from '../screens/OrderScreen';

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      {/* HOME */}
      <Tab.Screen
        name='Home'
        component={ HomeScreen }
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: { color: '#008E97' },
          headerShown: false,
          tabBarIcon: ({ focused }) => focused
            ? <Entypo name='home' size={ 24 } color='#008E97' />
            : <AntDesign name='home' size={ 24 } color='black' />
        }}
      />

      {/* CART */}
      <Tab.Screen
        name='Cart'
        component={ CartScreen }
        options={{
          tabBarLabel: 'Cart',
          tabBarLabelStyle: { color: '#008E97' },
          headerShown: false,
          tabBarIcon: ({ focused }) => focused
            ? <Ionicons name='cart-sharp' size={ 24 } color='#008E97' />
            : <Ionicons name='cart-outline' size={ 24 } color='black' />
        }}
      />

      {/* PROFILE */}
      <Tab.Screen
        name='Profile'
        component={ ProfileScreen }
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: { color: '#008E97' },
          tabBarIcon: ({ focused }) => focused
            ? <Ionicons name='person' size={ 24 } color='#008E97' />
            : <Ionicons name='person-outline' size={ 24 } color='black' />
        }}
      />
    </Tab.Navigator>
  );
}

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={ LoginScreen }
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Register'
          component={ RegisterScreen }
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Main'
          component={ BottomTabs }
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Info'
          component={ ProductInfoScreen }
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Address'
          component={ AddressScreen }
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='AddAddress'
          component={ AddAddressScreen }
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Confirm'
          component={ ConfirmationScreen }
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Order'
          component={ OrderScreen }
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;

const styles = StyleSheet.create({});