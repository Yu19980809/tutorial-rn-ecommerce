import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );

  useEffect( () => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem( 'authToken' );
        if ( token ) navigation.replace( 'Main' );
      } catch (error) {
        console.log( 'checkLoginStatus error', error );
      }
    };

    checkLoginStatus();
  }, [] );

  const handleLogin = () => {
    axios.post( 'http://192.168.0.106:5000/api/v1/user/login', { email, password } )
      .then( res => {
        // console.log( res );
        const { token } = res.data;
        AsyncStorage.setItem( 'authToken', token );
        navigation.replace( 'Main' );
      } )
      .catch( error => {
        Alert.alert(
          'Login Error',
          "Invalid email"
        );
        console.log( 'Login failed', error );
      } );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
      }}
    >
      {/* LOGO */}
      <View style={{ marginTop: 50 }}>
        <Image
          source={{ uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png' }}
          style={{ width: 150, height: 100 }}
        />
      </View>

      <KeyboardAvoidingView>
        {/* TITLE */}
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              marginTop: 12,
              fontSize: 17,
              fontWeight: 'bold',
              color: '#041E42'
            }}
          >
            Login In to your account
          </Text>
        </View>

        {/* TEXT INPUTS */}
        <View style={{ marginTop: 50 }}>
          {/* EMAIL */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginTop: 30,
              padding: 10,
              backgroundColor: '#D0D0D0',
              borderRadius: 5
            }}
          >
            <MaterialCommunityIcons name='email' size={ 24 } color='gray' />
            <TextInput
              style={{ width: 250, color: 'gray', fontSize: 16 }}
              placeholder='enter your Email'
              onChangeText={ text => setEmail( text ) }
            />
          </View>

          {/* PASSWORD */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginTop: 20,
              padding: 10,
              backgroundColor: '#D0D0D0',
              borderRadius: 5
            }}
          >
            <MaterialIcons name='lock' size={ 24 } color='gray' />
            <TextInput
              style={{ width: 250, color: 'gray', fontSize: 16 }}
              placeholder='enter your Password'
              secureTextEntry={ true }
              onChangeText={ text => setPassword( text ) }
            />
          </View>
        </View>

        {/* OPTIONS */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 12
          }}
        >
          <Text>Keep me logged in</Text>

          <Text style={{ color: '#007FFF', fontWeight: 500 }}>Forgot Password</Text>
        </View>

        {/* BUTTON */}
        <Pressable
          style={{
            width: 200,
            marginTop: 80,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 15,
            backgroundColor: '#FEBE10',
            borderRadius: 6
          }}
          onPress={ handleLogin }
        >
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold'
            }}
          >
            Login
          </Text>
        </Pressable>

        <Pressable
          style={{ marginTop: 15 }}
          onPress={ () => navigation.navigate( 'Register' ) }
        >
          <Text
            style={{
              textAlign: 'center',
              color: 'gray',
              fontSize: 16
            }}
          >
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({});