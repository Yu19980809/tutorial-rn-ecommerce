import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const OrderScreen = () => {
  const navigation = useNavigation();

  useEffect( () => {
    setTimeout( () => navigation.replace( 'Main' ), 1300 )
  }, [] );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <LottieView
        source={ require( '../assets/thumbs.json' ) }
        autoPlay
        loop={ false }
        speed={ 0.7 }
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          width: 300,
          height: 260,
          marginTop: 40
        }}
      >
        <Text
          style={{
            marginTop: 20,
            textAlign: 'center',
            fontSize: 19,
            fontWeight: '600'
          }}
        >
          Your order has been received
        </Text>

        <LottieView
          source={ require( '../assets/sparkle.json' ) }
          autoPlay
          loop={ false }
          speed={ 0.7 }
          style={{
            position: 'absolute',
            top: 300,
            alignSelf: 'center',
            width: 300,
            height: 300
          }}
        />
      </LottieView>
    </SafeAreaView>
  );
}

export default OrderScreen;

const styles = StyleSheet.create({});