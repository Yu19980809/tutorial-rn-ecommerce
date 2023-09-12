import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../store/CartReducer';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart = useSelector( state => state.cart.cart );
  const total = cart
    ?.map( item => item.price * item.quantity )
    .reduce( ( curr, prev ) => curr + prev, 0 )

  const increaseQuantity = item => dispatch( incrementQuantity( item ) );
  const decreaseQuantity = item => dispatch( decrementQuantity( item ) );
  const deleteItem = item => dispatch( removeFromCart( item ) );

  return (
    <ScrollView
      style={{
        flex: 1,
        marginTop: 55,
        backgroundColor: 'white'
      }}
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
            style={{ paddingLeft: 10 }}
            name='search1'
            size={ 22 }
            color='black'
          />

          <TextInput placeholder='Search Amazon.in' />
        </Pressable>

        <Feather name='mic' size={ 24 } color='black' />
      </View>

      {/* TOTAL */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: '400' }}>Subtotal: </Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>${ total }</Text>
      </View>

      <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>

      {/* BUY BUTTON */}
      <Pressable
        onPress={ () => navigation.navigate( 'Confirm' ) }
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          marginHorizontal: 10,
          padding: 10,
          backgroundColor: '#FFC72C',
          borderRadius: 5
        }}
      >
        <Text>Proceed to Buy ({ cart.length }) items</Text>
      </Pressable>

      {/* DIVIDE LINE */}
      <Text
        style={{
          height: 1,
          marginTop: 16,
          borderWidth: 1,
          borderColor: '#D0D0D0'
        }}
      />

      {/* CART LIST */}
      <View style={{ marginHorizontal: 10 }}>
        { cart?.map( ( item, index ) => (
          <View
            key={ index }
            style={{
              marginVertical: 10,
              backgroundColor: 'white',
              borderWidth: 2,
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderBottomColor: '#F0F0F0'
            }}
          >
            {/* IMAGE, TITLE, PRICE */}
            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10
              }}
            >
              {/* IMAGE */}
              <View>
                <Image
                  source={{ uri: item?.image }}
                  style={{ width: 140, height: 140, resizeMode: 'contain' }}
                />
              </View>

              {/* TITLE & PRICE */}
              <View>
                <Text
                  numberOfLines={ 1 }
                  style={{ width: 150, marginTop: 10 }}
                >
                  { item?.title }
                </Text>

                <Text style={{ marginTop: 6, fontSize: 20, fontWeight: 'bold' }}>
                  ${ item?.price }
                </Text>

                <Image
                  source={{ uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png' }}
                  style={{ width: 30, height: 30, resizeMode: 'contain' }}
                />

                <Text style={{ color: 'green' }}>In Stock</Text>
              </View>
            </Pressable>

            {/* QUANTITY */}
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 15,
                marginBottom: 10
              }}
            >
              {/* MINUS, PLUS */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 7
                }}
              >
                { item?.quantity > 1 ? (
                  <Pressable
                    onPress={ () => decreaseQuantity( item ) }
                    style={{
                      padding: 7,
                      backgroundColor: '#D8D8D8',
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6
                    }}
                  >
                    <AntDesign name='minus' size={ 24 } color='black' />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={ () => deleteItem( item ) }
                    style={{
                      padding: 7,
                      backgroundColor: '#D8D8D8',
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6
                    }}
                  >
                    <AntDesign name='delete' size={ 24 } color='black' />
                  </Pressable>
                ) }

                <Pressable
                  style={{
                    paddingHorizontal: 18,
                    paddingVertical: 6,
                    backgroundColor: 'white',
                  }}
                >
                  <Text>{ item?.quantity }</Text>
                </Pressable>

                <Pressable
                  onPress={ () => increaseQuantity( item ) }
                  style={{
                    padding: 7,
                    backgroundColor: '#D8D8D8',
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6
                  }}
                >
                  <Feather name='plus' size={ 24 } color='black' />
                </Pressable>
              </View>

              {/* DELETE */}
              <Pressable
                onPress={ () => deleteItem( item ) }
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  backgroundColor: 'white',
                  borderWidth: 0.6,
                  borderColor: '#C0C0C0',
                  borderRadius: 5
                }}
              >
                <Text>Delete</Text>
              </Pressable>
            </Pressable>

            {/* OPTIONS */}
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginBottom: 15
              }}
            >
              <Pressable
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  backgroundColor: 'white',
                  borderWidth: 0.6,
                  borderColor: '#C0C0C0',
                  borderRadius: 5
                }}
              >
                <Text>Save For Later</Text>
              </Pressable>

              <Pressable
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  backgroundColor: 'white',
                  borderWidth: 0.6,
                  borderColor: '#C0C0C0',
                  borderRadius: 5
                }}
              >
                <Text>Save More Like This</Text>
              </Pressable>
            </Pressable>
          </View>
        ) ) }
      </View>
    </ScrollView>
  );
}

export default CartScreen;

const styles = StyleSheet.create({});