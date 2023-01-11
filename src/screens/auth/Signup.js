import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {mainStyle, textStyle} from '../../components/styles/ScreenStyle';
import SignupForm from './SignupForm';
import Header from './Header';

const Signup = ({navigation}) => {
  return (
    <SafeAreaView style={mainStyle}>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text style={textStyle}>Register yourself</Text>
        <SignupForm navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
