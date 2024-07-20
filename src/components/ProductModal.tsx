import React, {Component} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../utils/Colors';

const ProductModal = ({
  prodObj,
  setShowModal,
}: {
  prodObj: any;
  setShowModal: any;
}) => {
  const handleClosePress = () => {
    setShowModal(false);
  };

  const handleAddToCart = ()=>{
    
  }
  return (
    <Modal transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Image source={{uri: prodObj.image}} style={styles.image} />
          <View style={styles.descriptionBox}>
            <View style={{marginRight: 8}}>
              <Text style={styles.descriptionText}>Description:</Text>
            </View>
            <Text style={styles.descriptionText} numberOfLines={6}>
              {prodObj.description}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 18}}>
            <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
              <Image source={require('../assets/images/Cart.png')} />
              <Text style={styles.cartImage}>Add To Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={handleClosePress}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '60%',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
  image: {
    width: 140,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionBox: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'center',
    marginVertical: 20,
  },
  cartBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.red,
    width: '54%',
    borderRadius: 10,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cartImage: {fontSize: 16, fontWeight: '600', color: Colors.white},
  closeBtn: {
    backgroundColor: Colors.grey,
    width: '32%',
    borderRadius: 10,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {fontSize: 16, fontWeight: '600', color: Colors.black},
});

export default ProductModal;
