import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather, AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { UserType } from '../UserContext';

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext( UserType );

  const [addresses, setAddresses] = useState( [] );

  const fetchAddresses = async () => {
    try {
      const res = await axios.get( `http://10.232.102.198:5000/api/v1/user/address/${ userId }` );
      const { addresses } = res.data;
      setAddresses( addresses );
    } catch (error) {
      console.log( 'Fetch addresses error', error );
    }
  };

  useEffect( () => fetchAddresses(), [] );

  // refresh the addresses when the component comes to the focus
  // ie basically when we navigate back
  useFocusEffect(
    useCallback( () => fetchAddresses(), [] )
  );

  return (
    <ScrollView
      showsHorizontalScrollIndicator={ false }
      style={{ marginTop: 50 }}
    >
      {/* SEARCH BAR */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#00CED1'
        }}
      >
        <Pressable
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            height: 38,
            marginHorizontal: 7,
            backgroundColor: 'white',
            borderRadius: 3
          }}
        >
          <AntDesign name='search1' size={ 22 } color='black' style={{ paddingLeft: 10 }} />

          <TextInput placeholder='Search Amazon.in' />
        </Pressable>

        <Feather name='mic' size={ 24 } color='black' />
      </View>

      {/* ADDRESS */}
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Your Addresses
        </Text>

        {/* ADD ADDRESS BUTTON */}
        <Pressable
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            paddingHorizontal: 5,
            paddingVertical: 7,
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderColor: '#D0D0D0'
          }}
          onPress={ () => navigation.navigate( 'AddAddress' ) }
        >
          <Text>Add a new Address</Text>
          <MaterialIcons name='keyboard-arrow-right' size={ 24 } color='black' />
        </Pressable>

        {/* ADDRESS LIST */}
        <Pressable>
          { addresses?.map( ( item, index ) => (
            <Pressable
              key={ index }
              style={{
                gap: 5,
                marginVertical: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: '#D0D0D0',
                borderRadius: 5
              }}
            >
              {/* NAME */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 3
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                  { item?.name }
                </Text>

                <Entypo name='location-pin' size={ 24 } color='red' />
              </View>

              <Text style={{ fontSize: 15, color: '#181818' }}>
                { item?.houseNo }, { item?.landmark }
              </Text>

              <Text style={{ fontSize: 15, color: '#181818' }}>
                { item?.street }
              </Text>

              <Text style={{ fontSize: 15, color: '#181818' }}>
                China, Wuhan
              </Text>

              <Text style={{ fontSize: 15, color: '#181818' }}>
                Phone No: { item?.mobileNo }
              </Text>

              <Text style={{ fontSize: 15, color: '#181818' }}>
                Pincode: { item?.postalCode }
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 7
                }}
              >
                <Pressable
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    backgroundColor: '#F5F5F5',
                    borderWidth: 1,
                    borderColor: '#D0D0D0',
                    borderRadius: 5
                  }}
                >
                  <Text>Edit</Text>
                </Pressable>

                <Pressable
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    backgroundColor: '#F5F5F5',
                    borderWidth: 1,
                    borderColor: '#D0D0D0',
                    borderRadius: 5
                  }}
                >
                  <Text>Remove</Text>
                </Pressable>

                <Pressable
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    backgroundColor: '#F5F5F5',
                    borderWidth: 1,
                    borderColor: '#D0D0D0',
                    borderRadius: 5
                  }}
                >
                  <Text>Set as Default</Text>
                </Pressable>
              </View>
            </Pressable>
          ) ) }
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default AddAddressScreen;

const styles = StyleSheet.create({});