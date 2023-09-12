import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, KeyboardAvoidingView, Image, TextInput, Alert } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons , Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [ name, setName ] = useState( '' );
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );

  const handleRegister = () => {
    axios.post( 'http://192.168.0.106:5000/api/v1/user/register', { name, email, password } )
      .then( res => {
        // console.log( res );
        Alert.alert(
          'Registration successful',
          'You have been registered successfully'
        );
        setName( '' );
        setEmail( '' );
        setPassword( '' );
      } )
      .catch( error => {
        Alert.alert(
          'Registration Error',
          "An error occured while registering"
        );
        console.log( 'registration failed', error );
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
            Register to your account
          </Text>
        </View>

        {/* TEXT INPUTS */}
        <View style={{ marginTop: 50 }}>
          {/* NAME */}
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
            <Ionicons name='person-sharp' size={ 24 } color='gray' />
            <TextInput
              style={{ width: 250, color: 'gray', fontSize: 16 }}
              placeholder='enter your Name'
              onChangeText={ text => setName( text ) }
            />
          </View>

          {/* EMAIL */}
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
          onPress={ handleRegister }
        >
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold'
            }}
          >
            Register
          </Text>
        </Pressable>

        <Pressable
          style={{ marginTop: 15 }}
          onPress={ () => navigation.goBack() }
        >
          <Text
            style={{
              textAlign: 'center',
              color: 'gray',
              fontSize: 16
            }}
          >
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({})