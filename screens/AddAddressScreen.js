import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { UserType } from '../UserContext';

const AddressScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext( UserType );

  const [ name, setName ] = useState( '' );
  const [ mobileNo, setMobileNo ] = useState( '' );
  const [ houseNo, setHouseNo ] = useState( '' );
  const [ street, setStreet ] = useState( '' );
  const [ landmark, setLandmark ] = useState( '' );
  const [ postalCode, setPostalCode ] = useState( '' );

  useEffect( () => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem( 'authToken' );
      const decodeToken = jwt_decode( token );
      const { userId } = decodeToken;
      setUserId( userId );
    };

    fetchUser();
  }, [] )

  const handleAddAddress = () => {
    console.log( 'handleAddAddress' );
    const address = { name, mobileNo, houseNo, street, landmark, postalCode };;

    axios.post( 'http://10.232.102.198:5000/api/v1/user/address', { userId, address } )
      .then( () => {
        Alert.alert( 'Success', 'Address added successfully' );
        setName( '' );
        setMobileNo( '' );
        setHouseNo( '' );
        setStreet( '' );
        setLandmark( '' );
        setPostalCode( '' );
        setTimeout( () => navigation.goBack(), 500 );
      } )
      .catch( err => {
        Alert.alert( 'Error', 'Failed to add address' );
        console.log( 'Add address error', err );
      } );
  }

  return (
    <ScrollView style={{ marginTop: 50, marginBottom: 20 }}>
      <View style={{ height: 50, backgroundColor: '#00CED1' }} />

      {/* FORM */}
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
          Add a new Address
        </Text>

        <TextInput
          placeholder='China'
          placeholderTextColor={ 'black' }
          style={{
            marginTop: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: '#D0D0D0',
            borderRadius: 5
          }}
        />

        {/* NAME */}
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Full name (First and last name)
          </Text>

          <TextInput
            value={ name }
            placeholder='enter your name'
            placeholderTextColor={ 'black' }
            onChangeText={ text => setName( text ) }
            style={{
              marginTop: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: '#D0D0D0',
              borderRadius: 5
            }}
          />
        </View>

        {/* MOBILE */}
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Mobile number
          </Text>

          <TextInput
            value={ mobileNo }
            placeholder='mobile number'
            placeholderTextColor={ 'black' }
            onChangeText={ text => setMobileNo( text ) }
            style={{
              marginTop: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: '#D0D0D0',
              borderRadius: 5
            }}
          />
        </View>

        {/* HOUSE */}
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Flat, House No, Building, Company
          </Text>

          <TextInput
            value={ houseNo }
            placeholder='house number'
            placeholderTextColor={ 'black' }
            onChangeText={ text => setHouseNo( text ) }
            style={{
              marginTop: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: '#D0D0D0',
              borderRadius: 5
            }}
          />
        </View>

        {/* STREET */}
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Area, Street, Sector, Village
          </Text>

          <TextInput
            value={ street }
            placeholder='street'
            placeholderTextColor={ 'black' }
            onChangeText={ text => setStreet( text ) }
            style={{
              marginTop: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: '#D0D0D0',
              borderRadius: 5
            }}
          />
        </View>

        {/* LANDMARK */}
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Landmark
          </Text>

          <TextInput
            value={ landmark }
            placeholder='Eg near appollo hospital'
            placeholderTextColor={ 'black' }
            onChangeText={ text => setLandmark( text ) }
            style={{
              marginTop: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: '#D0D0D0',
              borderRadius: 5
            }}
          />
        </View>

        {/* POSTAL CODE */}
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Pincode
          </Text>

          <TextInput
            value={ postalCode }
            placeholder='enter pincode'
            placeholderTextColor={ 'black' }
            onChangeText={ text => setPostalCode( text ) }
            style={{
              marginTop: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: '#D0D0D0',
              borderRadius: 5
            }}
          />
        </View>
      </View>

      {/* BUTTON */}
      <Pressable
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          padding: 19,
          backgroundColor: '#FFC72C',
          borderRadius: 6
        }}
        onPress={ handleAddAddress }
      >
        <Text style={{ fontWeight: 'bold' }}>
          Add Address
        </Text>
      </Pressable>
    </ScrollView>
  );
}

export default AddressScreen;

const styles = StyleSheet.create({});