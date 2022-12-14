import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BackArrow from '../../assets/SVG/back_arrow.svg';

const Header = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.arrow}>
        <BackArrow />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  arrow: {
    padding: 10,
    width: 35,
    alignItems: 'center',
    margin: 10,
  },
});
