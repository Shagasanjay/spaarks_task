import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ProductListing from '../../components/ProductListing';
import Colors from '../../utils/Colors';

const Shopping = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.primary} />
      <View style={styles.topContainer}>
        <Text style={styles.header}>Shopping</Text>
      </View>
      <ProductListing />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    color: 'black',
    fontSize: 30,
    fontWeight: '800',
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: Colors.primary,
  },
});

export default Shopping;
