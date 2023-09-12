import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { addToCart } from '../store/CartReducer';

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const [ addedToCart, setAddedToCart ] = useState( false );

  const addItemToCart = item => {
    setAddedToCart( true );
    dispatch( addToCart( item ) );
    setTimeout( () => setAddedToCart( false ), 60000 );
  }

  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      {/* IMAGE */}
      <Image
        source={{ uri: item?.image }}
        style={{ width: 140, height: 140, resizeMode: 'contain' }}
      />

      {/* TITLE */}
      <Text
        numberOfLines={ 1 }
        style={{ width: 140, marginTop: 10 }}
      >
        { item?.title }
      </Text>

      {/* PRICE & RATING */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 5
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>${ item?.price }</Text>
        <Text style={{ color: '#FFC72C', fontWeight: 'bold' }}>{ item?.rating?.rate } ratings</Text>
      </View>

      {/* BUTTON */}
      <Pressable
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          marginHorizontal: 10,
          padding: 10,
          backgroundColor: '#FFC72C',
          borderRadius: 20
        }}
        onPress={ () => addItemToCart( item ) }
      >
        { addedToCart ? (
          <View><Text>Added to Cart</Text></View>
        ) : (
          <Text>Add to Cart</Text>
        ) }
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});