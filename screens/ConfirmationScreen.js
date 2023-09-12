import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay'
import { cleanCart } from '../store/CartReducer';
import { UserType } from '../UserContext';

const ComfirmationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userId, setUserId } = useContext( UserType );
  const cart = useSelector( state => state.cart.cart );
  const total = cart
    ?.map( item => item.price * item.quantity )
    .reduce( ( curr, prev ) => curr + prev, 0 )

  const steps = [
    { title: 'Address', content: 'Address Form' },
    { title: 'Delivery', content: 'Delivery Options' },
    { title: 'Payment', content: 'Payment Details' },
    { title: 'Place Order', content: 'Order Summary' },
  ];
  const [ currentStep, setCurrentStep ] = useState( 0 );
  const [ addresses, setAddresses ] = useState( [] );
  const [ selectedAddress, setSelectedAddress ] = useState( '' );
  const [ option, setOption ] = useState( '' );
  const [ selectedOption, setSelectedOption ] = useState( '' );

  const fetchAddresses = async () => {
    try {
      const res = await axios.get( `http://10.232.102.198:5000/api/v1/user/address/${ userId }` );
      const { addresses } = res.data;
      setAddresses( addresses );
    } catch (error) {
      console.log( 'Fetch addresses error', error );
    }
  }

  useEffect( () => fetchAddresses(), [] );

  const handlePlaceOrder = async () => {
    try {
        const orderData = {
          userId,
          cartItems: cart,
          totalPrice: total,
          shippingAddress: selectedAddress,
          paymentMethod: selectedOption
        };

        const response = await axios.post( 'http://10.232.102.198:5000/api/v1/order', orderData );
        if ( response.status === 200 ) {
          navigation.navigate( 'Order' );
          dispatch( cleanCart() );
          console.log( 'order created successfully', response.data );
        } else {
          console.log( 'error ceating order', response.data );
        }
    } catch (error) {
      console.log( 'error handle place order', error );
    }
  }

  const payByCreditCard = async () => {
    try {
      const options = {
        description: 'Adding To Wallet',
        currency: 'INR',
        name: 'Amazon',
        key: '',
        amount: total * 100,
        prefill: {
          email: '',
          contact: '',
          name: ''
        },
        theme: { color: '#F37254' }
      };

      const data = await RazorpayCheckout.open( options );
      console.log( 'pay data', data );

      const orderData = {
        userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: 'card'
      };

      const response = await axios.post( 'http://10.232.102.198:5000/api/v1/order', orderData );
      if ( response.status === 200 ) {
        navigation.navigate( 'Order' );
        dispatch( cleanCart() );
        console.log( 'order created successfully', response.data );
      } else {
        console.log( 'error creating order', response.data );
      }
    } catch (error) {
      console.log( 'error paying by credit card', error );
    }
  }

  return (
    <ScrollView style={{ marginTop: 55 }}>
      {/* STEPS PROGRESS */}
      <View style={{ flex: 1, paddingTop: 40, paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20
          }}
        >
          { steps?.map( ( step, index ) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              { index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: 'green' },
                    index <= currentStep && { backgroundColor: 'green' }
                  ]}
                />
              ) }

              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#CCC',
                    borderRadius: 15
                  },
                  index < currentStep && { backgroundColor: 'green' }
                ]}
              >
                { index < currentStep ? (
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 'bold'
                    }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 'bold'
                    }}
                  >
                    { index + 1 }
                  </Text>
                ) }
              </View>

              <Text style={{ marginTop: 8, textAlign: 'center' }}>
                { step.title }
              </Text>
            </View>
          ) ) }
        </View>
      </View>

      { currentStep === 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Select Delivery Address
          </Text>

          {/* ADDRESS INFO */}
          <Pressable>
            { addresses?.map( ( item, index ) => (
              <Pressable
                key={ index }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 7,
                  padding: 10,
                  paddingBottom: 17,
                  borderWidth: 1,
                  borderColor: '#D0D0D0',
                  borderRadius: 6
                }}
              >
                { selectedAddress && selectedAddress._id === item._id ? (
                  <FontAwesome5 name='dot-circle' size={ 20 } color='#008397' />
                ) : (
                  <Entypo
                    name='circle'
                    size={ 20 }
                    color='gray'
                    onPress={ () => setSelectedAddress( item ) }
                  />
                ) }

                <View style={{ marginLeft: 6 }}>
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
                    { item?.street }
                  </Text>

                  <Text style={{ fontSize: 15, color: '#181818' }}>
                    China, Wuhan
                  </Text>

                  <Text style={{ fontSize: 15, color: '#181818' }}>
                    phone no: { item?.landmark }
                  </Text>

                  <Text style={{ fontSize: 15, color: '#181818' }}>
                    pin code: { item?.landmark }
                  </Text>

                  {/* ADDRESS OPTIONS */}
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
                      <Text>Save as Default</Text>
                    </Pressable>
                  </View>

                  {/* SELECT BUTTON */}
                  <View>
                    { selectedAddress && selectedAddress._id === item?._id && (
                      <Pressable
                        onPress={ () => setCurrentStep( 1 ) }
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 10,
                          padding: 10,
                          backgroundColor: '#008397',
                          borderRadius: 20
                        }}
                      >
                        <Text>
                          Deliver to this Address
                        </Text>
                      </Pressable>
                    ) }
                  </View>
                </View>
              </Pressable>
            ) ) }
          </Pressable>
        </View>
      ) }

      { currentStep === 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Choose your delivery options
          </Text>

          {/* OPTOPNS LIST */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginTop: 10,
              padding: 8,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#D0D0D0'
            }}
          >
            { option ? (
              <FontAwesome5 name='dot-circle' size={ 20 } color='#008397' />
            ) : (
              <Entypo
                name='circle'
                size={ 20 }
                color='gray'
                onPress={ () => setOption( !option ) }
              />
            ) }

            <Text style={{ flex: 1 }}>
              <Text style={{ color: 'green', fontWeight: '500' }}>
                Tomorrow by 10pm
              </Text> { ' ' }
              - FREE delivery wit your Prime membership
            </Text>
          </View>

          {/* CONTINUE BUTTON */}
          <Pressable
            onPress={ () => setCurrentStep( 2 ) }
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
              padding: 10,
              backgroundColor: '#FFC72C',
              borderRadius: 20
            }}
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      ) }

      { currentStep === 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Select your payment method
          </Text>

          {/* CASH */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginTop: 12,
              padding: 8,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#D0D0D0'
            }}
          >
            { selectedOption === 'cash' ? (
              <FontAwesome5 name='dot-circle' size={ 20 } color='#008397' />
            ) : (
              <Entypo
                name='circle'
                size={ 20 }
                color='gray'
                onPress={ () => setSelectedOption( 'cash' ) }
              />
            ) }

            <Text>Cash on Delivery</Text>
          </View>

          {/* CREDIT CARD */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginTop: 12,
              padding: 8,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#D0D0D0'
            }}
          >
            { selectedOption === 'card' ? (
              <FontAwesome5 name='dot-circle' size={ 20 } color='#008397' />
            ) : (
              <Entypo
                name='circle'
                size={ 20 }
                color='gray'
                onPress={ () => {
                  setSelectedOption( 'card' );
                  Alert.alert(
                    'UPI/Debit card',
                    'Pay Online',
                    [
                      { text: 'Cancel', onPress: () => console.log( 'Cancel is pressed' ) },
                      { text: 'OK', onPress: () => payByCreditCard() }
                    ]
                  );
                } }
              />
            ) }

            <Text>UPI / Credit or debit card</Text>
          </View>

          {/* CONTINUE BUTTON */}
          <Pressable
            onPress={ () => setCurrentStep( 3 ) }
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
              padding: 10,
              backgroundColor: '#FFC72C',
              borderRadius: 20
            }}
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      ) }

      { currentStep === 3 && selectedOption === 'cash' && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Order Now
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8,
              marginTop: 10,
              padding: 8,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#D0D0D0'
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                Save 5% and never run out
              </Text>

              <Text style={{ marginTop: 5, fontSize: 15, color: 'gray' }}>
                Turn on auto deliveries
              </Text>
            </View>

            <MaterialIcons name='keyboard-arrow-right' size={ 24 } color='black' />
          </View>

          {/* ORDER INFO */}
          <View
            style={{
              marginTop: 10,
              padding: 8,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#D0D0D0'
            }}
          >
            <Text>Shipping tp { selectedAddress?.name }</Text>

            {/* PRODUCT PRICE */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 8
              }}
            >
              <Text style={{ color: 'gray', fontSize: 16, fontWeight: '500' }}>
                Items
              </Text>

              <Text style={{ color: 'gray', fontSize: 16 }}>
                ${ total }
              </Text>
            </View>

            {/* DELIVERY FEE */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 8
              }}
            >
              <Text style={{ color: 'gray', fontSize: 16, fontWeight: '500' }}>
                Delivery
              </Text>

              <Text style={{ color: 'gray', fontSize: 16 }}>
                $0
              </Text>
            </View>

            {/* TOTAL PRICE */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 8
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Order Total
              </Text>

              <Text style={{ color: '#C60C30', fontSize: 17, fontWeight: 'bold' }}>
                ${ total }
              </Text>
            </View>
          </View>

          {/* PAYMENT */}
          <View
            style={{
              marginTop: 10,
              padding: 8,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#D0D0D0'
            }}
          >
            <Text style={{ fontSize: 20, color: 'gray' }}>
              Pay With
            </Text>

            <Text style={{ marginTop: 7, fontSize: 16, fontWeight: '600' }}>
              Pay on delivery (Cash)
            </Text>
          </View>

          {/* PAY BUTTON */}
          <Pressable
            onPress={ handlePlaceOrder }
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              padding: 10,
              backgroundColor: '#FFC72C',
              borderRadius: 20
            }}
          >
            <Text>Place your order</Text>
          </Pressable>
        </View>
      ) }
    </ScrollView>
  );
}

export default ComfirmationScreen;

const styles = StyleSheet.create({});