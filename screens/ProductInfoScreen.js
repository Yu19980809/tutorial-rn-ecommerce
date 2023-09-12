import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, ImageBackground, Dimensions } from 'react-native';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { addToCart } from '../store/CartReducer';

const ProductInfoScreen = () => {
  const navigator = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { width } = Dimensions.get( 'window' );
  const height = ( width * 100 ) / 100;

  const [ addedToCart, setAddedToCart ] = useState( false );

  const addItemToCart = item => {
    setAddedToCart( true );
    dispatch( addToCart( item ) );
    setTimeout( () => setAddedToCart( false ), 60000 );
  }

  const cart = useSelector( state => state.cart.cart );
  console.log( 'cart', cart )

  return (
    <ScrollView
      showsVerticalScrollIndicator={ false }
      style={{ flex: 1, marginTop: 55, backgroundColor: 'white' }}
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
          <AntDesign
            name='search1'
            size={ 22 }
            color='black'
            style={{ paddingLeft: 10 }}
          />

          <TextInput placeholder='Search Amazon.in' />
        </Pressable>

        <Feather name='mic' size={ 24 } color='black' />
      </View>

      {/* PRODUCT IMAGE LIST */}
      <ScrollView horizontal showsHorizontalScrollIndicator={ false }>
        { route.params.carouselImages.map( ( item, index ) => (
          <ImageBackground
            key={ index }
            source={{ uri: item }}
            style={{ width, height, marginTop: 25, resizeMode: 'contain' }}
          >
            {/* DISCOUNT & SHARE */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 20
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 40,
                  height: 40,
                  backgroundColor: '#C60C30',
                  borderRadius: 20
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 12,
                    fontWeight: '600'
                  }}
                >
                  20% off
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 40,
                  height: 40,
                  backgroundColor: '#E0E0E0',
                  borderRadius: 20
                }}
              >
                <MaterialCommunityIcons
                  name='share-variant'
                  size={ 24 }
                  color='black'
                />
              </View>
            </View>

            {/* LIKE */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
                height: 40,
                marginTop: 'auto',
                marginLeft: 20,
                marginBottom: 20,
                backgroundColor: '#E0E0E0',
                borderRadius: 20
              }}
            >
              <AntDesign name='hearto' size={ 24 } color='black' />
            </View>
          </ImageBackground>
        ) ) }
      </ScrollView>

      {/* TITLE & PRICE */}
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>
          { route?.params?.title }
        </Text>

        <Text style={{ marginTop: 6, fontSize: 18, fontWeight: '600' }}>
          ${ route?.params?.price }
        </Text>
      </View>

      {/* DIVIDE LINE */}
      <Text style={{ height: 1, borderWidth: 1, borderColor: '#D0D0D0' }} />

      {/* COLOR */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10
        }}
      >
        <Text>Color: </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          { route?.params?.color }
        </Text>
      </View>

      {/* SIZE */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10
        }}
      >
        <Text>Size: </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          { route?.params?.size }
        </Text>
      </View>

      {/* DIVIDE LINE */}
      <Text style={{ height: 1, borderWidth: 1, borderColor: '#D0D0D0' }} />

      {/* ADDRESS */}
      <View style={{ padding: 10 }}>
        <Text style={{ marginVertical: 5, fontSize: 15, fontWeight: 'bold' }}>
          Total: ${ route?.params?.price }
        </Text>

        <Text style={{ color: '#00CED1' }}>
          FREE delivery Tomorrow by 3 PM.Order withon 10hrs 30 mins
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            marginVertical: 5
          }}
        >
          <Ionicons name='location' size={ 24 } color='black' />

          <Text style={{ fontSize: 15, fontWeight: '500' }}>
            Delivery To Libra - Wujiashan 980809
          </Text>
        </View>
      </View>

      <Text style={{ marginHorizontal: 10, color: 'green', fontWeight: '500' }}>
        IN Stock
      </Text>

      {/* BUTTONS */}
      <Pressable
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 10,
          padding: 10,
          backgroundColor: '#FFC72C',
          borderRadius: 20
        }}
        onPress={ () => addItemToCart( route?.params?.item ) }
      >
        { addedToCart ? (
          <View><Text>Added to Cart</Text></View>
        ) : (
          <Text>Add to Cart</Text>
        ) }
      </Pressable>

      <Pressable
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 10,
          padding: 10,
          backgroundColor: '#FFAC1C',
          borderRadius: 20
        }}
      >
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});