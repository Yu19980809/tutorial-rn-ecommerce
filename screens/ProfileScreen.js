import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { UserType } from '../UserContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext( UserType );
  const [ loading, setLoading ] = useState( true );
  const [ orders, setOrders ] = useState( [] );
  const [ user, setUser ] = useState( null );

  useLayoutEffect( () => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: { backgroundColor: '#00CED1' },
      headerLeft: () => {
        <Image
          source={{ url: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png' }}
          style={{ width: 140, height: 120, resizeMode: 'contain' }}
        />
      },
      headerRight: () => {
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginLeft: 12
          }}
        >
          <Ionicons name='notifications-outline' size={ 24 } color='black' />
          <AntDesign name='search1' size={ 24 } color='black' />
        </View>
      }
    })
  }, [] );

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem( 'authToken' );
    console.log( 'auth token cleared' );
    navigation.navigate( 'Login' );
  }

  // FETCH USER PROFILE
  useEffect( () => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get( `http://10.232.102.198:5000/api/v1/user/profile/${ userId }` );
        const { user } = response.data;
        setUser( user );
      } catch (error) {
        console.log( 'Erro fetch user profile', error );
      }
    }

    fetchUserProfile();
  }, [] );

  // FETCH ORDERS
  useEffect( () => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get( `http://10.232.102.198:5000/api/v1/order/${ userId }` );
        const { orders } = response.data;
        setOrders( orders );
        setLoading( false );
      } catch (error) {
        console.log( 'Error fetch orders', error );
      }
    }

    fetchOrders();
  }, [] );

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
        Welcome { user?.name }
      </Text>

      {/* OPTIONS BUTTON */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 12
        }}
      >
        <Pressable
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25
          }}
        >
          <Text style={{ textAlign: 'center' }}>Your Orders</Text>
        </Pressable>

        <Pressable
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25
          }}
        >
          <Text style={{ textAlign: 'center' }}>Your Account</Text>
        </Pressable>
      </View>

      {/* OPTIONS BUTTON */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 12
        }}
      >
        <Pressable
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25
          }}
        >
          <Text style={{ textAlign: 'center' }}>Buy Again</Text>
        </Pressable>

        <Pressable
          onPress={ clearAuthToken }
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25
          }}
        >
          <Text style={{ textAlign: 'center' }}>Logout</Text>
        </Pressable>
      </View>

      {/* ORDER LIST */}
      <ScrollView horizontal showsHorizontalScrollIndicator={ false }>
        { loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          orders.map( order => (
            <Pressable
              key={ order._id }
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
                marginTop: 20,
                padding: 15,
                backgroundColor: '#D0D0D0',
                borderWidth: 1,
                borderRadius: 8
              }}
            >
              { order.products.slice( 0, 1 )?.map( product => (
                <View
                  key={ product._id }
                  style={{ marginVertical: 10 }}
                >
                  <Image
                    source={{ uri: product.image }}
                    style={{ width: 100, height: 100, resizeMode: 'contain' }}
                  />
                </View>
              ) ) }
            </Pressable>
          ) )
        ) : (
          <Text>No orders found</Text>
        ) }
      </ScrollView>
    </ScrollView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({});