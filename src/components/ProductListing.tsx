import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../utils/Colors';
import ProductModal from './ProductModal';
import {useSelector, useDispatch} from 'react-redux';
import {
  addMaterial,
  decrementMaterialQuantity,
  incrementMaterialQuantity,
} from '../utils/slices/ProductSlice';
import BASE_URL from '../utils/Constants';

const ProductListing = () => {
  const [loader, setLoader] = useState<boolean>(true);
  const [showErrorState, setShowErrorState] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalDetails, setModalDetails] = useState<any>();
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.product.materials);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      setLoader(true);
      const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response && response.status == 200) {
        const data = await response.json();
        const modifiedData = data.map((item: any) => ({
          ...item,
          quantity: 0,
        }));
        dispatch(addMaterial(modifiedData));
        setLoader(false);
      } else {
        setShowErrorState(true);
        setLoader(false);

        console.log('api failed with status code ', response.status);
      }
    } catch (error) {
      setShowErrorState(true);
      setLoader(false);
      console.log(error, 'errrorInfetchProductData');
    }
  };

  const handleItemPress = (item: any) => {
    const prodObj = {
      id: item.id,
      description: item.description,
      image: item.image,
    };
    setModalDetails(prodObj);
    setShowModal(true);
  };

  const handleDecrement = (item: any) => {
    dispatch(decrementMaterialQuantity(item));
  };

  const handleIncrement = (item: any) => {
    dispatch(incrementMaterialQuantity(item));
  };

  const renderProducts = ({item, index}: {item: any; index: any}) => {
    const totalStars = 5;
    return (
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <View style={styles.productContainer}>
          <View style={{marginRight: 16}}>
            <Image
              source={{uri: item.image}}
              style={styles.image}
              resizeMode="contain"
            />
            {item.quantity > 0 && (
              <View style={styles.quantityBox}>
                <TouchableOpacity
                  style={styles.circleBtn}
                  onPress={() => handleDecrement(item)}>
                  <Image
                    source={require('../assets/images/Minus.png')}
                    style={{width: 25, height: 25}}
                  />
                </TouchableOpacity>
                <View style={styles.countBox}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      marginHorizontal: 10,
                      color: Colors.black,
                      paddingVertical: 2,
                    }}>
                    {item.quantity.toString()}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.circleBtn}
                  onPress={() => handleIncrement(item)}>
                  <Image
                    source={require('../assets/images/Plus.png')}
                    style={{width: 25, height: 25}}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View>
            <View style={styles.titleBox}>
              <Text
                style={{color: Colors.black, fontSize: 18, fontWeight: '500'}}
                numberOfLines={2}>
                {item.title}
              </Text>
            </View>
            <View style={styles.ratingBox}>
              <View style={[styles.ratingBox, {marginRight: 10}]}>
                {Array.from({length: totalStars}).map((_, i) => (
                  <Image
                    key={i}
                    source={
                      i < Math.round(item.rating.rate)
                        ? require('../assets/images/Star.png')
                        : require('../assets/images/GreyStar.png')
                    }
                    style={styles.starImage}
                  />
                ))}
              </View>
              <Text style={styles.countText}>{item.rating.count}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 8}}>
              <View style={{width: '40%'}}>
                <Text style={styles.priceText}>
                  Rs. {item.price.toString()}
                </Text>
              </View>
            </View>
            <Text style={styles.catergoryText}>Category: {item.category}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{padding: 16}}>
      {loader ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color={Colors.primary} />
          <Text
            style={[
              styles.catergoryText,
              {alignSelf: 'center', marginTop: 16},
            ]}>
            Fetching Products....
          </Text>
        </View>
      ) : showErrorState ? (
        <View style={styles.errorState}>
          <Image
            source={require('../assets/images/ErrorState.png')}
            resizeMode="contain"
          />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProducts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      {showModal && (
        <ProductModal prodObj={modalDetails} setShowModal={setShowModal} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    borderColor: Colors.grey1,
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {width: 110, height: 120},
  titleBox: {marginBottom: 8, marginRight: 130},
  ratingBox: {flexDirection: 'row'},
  starImage: {height: 20, width: 20, marginRight: 2, marginBottom: 8},
  countText: {fontWeight: '400', fontSize: 16},
  priceText: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.black,
  },
  catergoryText: {fontWeight: '400', fontSize: 16, color: Colors.black1},
  circleBtn: {
    borderRadius: 15,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    height: '90%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  errorState: {justifyContent: 'center', alignItems: 'center', height: '92%'},
  quantityBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  countBox: {
    backgroundColor: Colors.grey,
    borderRadius: 2,
    marginHorizontal: 2,
  },
});

export default ProductListing;
