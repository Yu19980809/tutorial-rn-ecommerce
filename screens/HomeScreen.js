import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, SafeAreaView, Platform, ScrollView, Pressable, TextInput, Image } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Feather, AntDesign, Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';
import { BottomModal, SlideAnimation, ModalContent } from 'react-native-modals';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { CATEGORIES, IMAGES, DEALS, OFFERS } from '../constants';
import ProductItem from '../components/ProductItem';
import { UserType } from '../UserContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext( UserType );

  const [addresses, setAddresses] = useState( [] );
  const [ selectedAddress, setSelectedAddress ] = useState( '' );
  const [ products, setProducts ] = useState( [] );
  const [ dropdownOpen, setDropDownOpen ] = useState( false );
  const [ category, setCategory ] = useState( 'jewelery' );
  const [ dropdownItems, setDropdownItems ] = useState([
    { label: "Women's clothing", value: "women's clothing" },
    { label: "Men's clothing", value: "men's clothing" },
    { label: "Jewelery", value: "jewelery" },
    { label: "Electronics", value: "electronics" }
  ]);
  const [modalVisible, setModalVisible] = useState( false );

  // FETCH PRODUCTS
  useEffect( () => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get( 'https://fakestoreapi.com/products' );
        setProducts( response.data );
      } catch (error) {
        console.log( 'Fetch products error', error );
      }
    };

    fetchProducts();
  }, [] );

  // FETCH USER
  useEffect( () => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem( 'authToken' );
      const decodeToken = jwt_decode( token );
      const { userId } = decodeToken;
      setUserId( userId );
    }

    fetchUser();
  }, [] );

  const onGenderOpen = () => {}

  const fetchAddresses = async () => {
    try {
      const res = await axios.get( `http://10.232.102.198:5000/api/v1/user/address/${ userId }` );
      const { addresses } = res.data;
      setAddresses( addresses );
    } catch (error) {
      console.log( 'Fetch addresses error', error );
    }
  }

  // FETCH ADDRESS
  useEffect( () => {
    if ( userId ) fetchAddresses();
  }, [ userId, modalVisible ] );

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' ? 40 : 0,
          backgroundColor: 'white'
        }}
      >
        <ScrollView>
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

          {/* ADDRESS */}
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              padding: 10,
              backgroundColor: '#AFEEEE'
            }}
            onPress={ () => setModalVisible( !modalVisible ) }
          >
            <Ionicons name='location-outline' size={ 24 } color='black' />

            <Pressable>
              { selectedAddress ? (
                <Text>
                  Deliver to { selectedAddress?.name } - { selectedAddress?.street }
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: '500' }}>
                  Add an Address
                </Text>
              ) }
            </Pressable>

            <MaterialIcons name='keyboard-arrow-down' size={ 24 } color='black' />
          </Pressable>

          {/* CATEGORY LIST */}
          <ScrollView horizontal showsHorizontalScrollIndicator={ false }>
            { CATEGORIES.map( ( item, index ) => (
              <Pressable
                key={ index }
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 10
                }}
              >
                <Image
                  source={{ uri: item?.image }}
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'contain'
                  }}
                />

                <Text
                  style={{
                    marginTop: 5,
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: '500'
                  }}
                >
                  { item?.name }
                </Text>
              </Pressable>
            ) ) }
          </ScrollView>

          {/* IMAGE SLIDES */}
          <SliderBox
            images={ IMAGES }
            autoplay
            circleLoop
            dotColor={ '#13274F' }
            inactiveDotColor='#90A4AE'
            ImageComponentStyle={{ width: '100%' }}
          />

          {/* DEALS TITLE */}
          <Text
            style={{
              padding: 10,
              fontSize: 18,
              fontWeight: 'bold'
            }}
          >
            Trending Deals of the week
          </Text>

          {/* DEALS LIST */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            { DEALS.map( ( item, index ) => (
              <Pressable
                key={ index }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10
                }}
                onPress={ () => navigation.navigate( 'Info', {
                  id: item.id,
                  title: item.title,
                  price: item.price,
                  carouselImages: item.carouselImages,
                  color: item.color,
                  size: item.size,
                  oldPrice: item.oldPrice,
                  item: item
                } ) }
              >
                <Image
                  source={{ uri: item?.image }}
                  style={{ width: 180, height: 180, resizeMode: 'contain' }}
                />
              </Pressable>
            ) ) }
          </View>

          {/* DIVIDE LINE */}
          <Text
            style={{
              height: 1,
              marginTop: 15,
              borderWidth: 2,
              borderColor: '#D0D0D0'
            }}
          />

          {/* OFFER TITLE */}
          <Text
            style={{
              padding: 10,
              fontSize: 18,
              fontWeight: 'bold'
            }}
          >
            Today's Deals
          </Text>

          {/* OFFER LIST */}
          <ScrollView horizontal showsHorizontalScrollIndicator={ false }>
            { OFFERS.map( ( item, index ) => (
              <Pressable
                key={ index }
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 10
                }}
                onPress={ () => navigation.navigate( 'Info', {
                  id: item.id,
                  title: item.title,
                  price: item.price,
                  carouselImages: item.carouselImages,
                  color: item.color,
                  size: item.size,
                  oldPrice: item.oldPrice,
                  item: item
                } ) }
              >
                <Image
                  source={{ uri: item?.image }}
                  style={{
                    width: 150,
                    height: 150,
                    resizeMode: 'contain'
                  }}
                />

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 130,
                    marginTop: 10,
                    paddingVertical: 5,
                    backgroundColor: '#E31837',
                    borderRadius: 4
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 13,
                      fontWeight: 'bold'
                    }}
                  >
                    Upto { item?.offer }
                  </Text>
                </View>
              </Pressable>
            ) ) }
          </ScrollView>

          {/* DIVIDE LINE */}
          <Text
            style={{
              height: 1,
              marginTop: 15,
              borderWidth: 2,
              borderColor: '#D0D0D0'
            }}
          />

          {/* DROPDOWN PICKER */}
          <View
            style={{
              width: '45%',
              marginTop: 20,
              marginHorizontal: 10,
              marginBottom: dropdownOpen ? 50 : 15
            }}
          >
            <DropDownPicker
              style={{
                height: 30,
                marginBottom: dropdownOpen ? 120 : 15,
                borderColor: '#B7B7B7'
              }}
              open={ dropdownOpen }
              value={ category }
              items={ dropdownItems }
              setOpen={ setDropDownOpen }
              setValue={ setCategory }
              setItems={ setDropdownItems }
              placeholder='choose category'
              placeholderStyle={ styles.placeholderStyle }
              onOpen={ onGenderOpen }
              zIndex={ 3000 }
              zIndexInverse={ 1000 }
            />
          </View>

          {/* PRODUCTS LIST */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            { products?.filter( item => item.category === category )?.map( ( item, index ) => (
              <ProductItem key={ index } item={ item } />
            ) ) }
          </View>

        </ScrollView>
      </SafeAreaView>

      <BottomModal
        visible={ modalVisible }
        swipeDirection={ [ 'up', 'down' ] }
        swipeThreshold={ 200 }
        modalAnimation={ new SlideAnimation({ slideFrom: 'bottom' }) }
        onBackdropPress={ () => setModalVisible( !modalVisible ) }
        onHardwareBackPress={ () => setModalVisible( !modalVisible ) }
        onTouchOutside={ () => setModalVisible( !modalVisible ) }
      >
        <ModalContent style={{ width: '100%', height: 400 }}>
          {/* TITLE */}
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 15, fontWeight: '500' }}>
              Choose your Location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 16, color: 'gray' }}>
              Select a delivery location to see product availablity and delivery options
            </Text>
          </View>

          {/* ADDRESS LIST */}
          <ScrollView horizontal showsVerticalScrollIndicator={ false }>
            { addresses?.map( ( item, index ) => (
              <Pressable
                key={ index }
                onPress={ () => {
                  setModalVisible( false );
                  setSelectedAddress( item );
                } }
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 3,
                  width: 140,
                  height: 140,
                  marginTop: 10,
                  marginRight: 15,
                  padding: 10,
                  backgroundColor: selectedAddress === item ? '#FECEB1' : 'white',
                  borderWidth: 1,
                  borderColor: '#D0D0D0'
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
                    { item?.name }
                  </Text>

                  <Entypo name='location-pin' size={ 24 } color='red' />
                </View>

                <Text
                  numberOfLines={ 1 }
                  style={{ width: 130, fontSize: 13, textAlign: 'center' }}
                >
                  { item?.houseNo }, { item?.landmark }
                </Text>

                <Text
                  numberOfLines={ 1 }
                  style={{ width: 130, fontSize: 13, textAlign: 'center' }}
                >
                  { item?.street }
                </Text>

                <Text
                  numberOfLines={ 1 }
                  style={{ width: 130, fontSize: 13, textAlign: 'center' }}
                >
                  China, Wuhan
                </Text>
              </Pressable>
            ) ) }

            <Pressable
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 140,
                height: 140,
                marginTop: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: '#D0D0D0'
              }}
              onPress={ () => {
                setModalVisible( false );
                navigation.navigate( 'Address' );
              } }
            >
              <Text style={{ textAlign: 'center', color: '#0066B2', fontWeight: '500' }}>
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ gap: 7, marginBottom: 30 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <Entypo name='location-pin' size={ 22 } color='#0066B2' />

              <Text style={{ color: '#0066B2', fontWeight: '400' }}>
                Enter an Chinese pincode
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <Ionicons name='locate-sharp' size={ 22 } color='#0066B2' />

              <Text style={{ color: '#0066B2', fontWeight: '400' }}>
                Use my current location
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <AntDesign name='earth' size={ 22 } color='#0066B2' />

              <Text style={{ color: '#0066B2', fontWeight: '400' }}>
                Deliver outside China
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});