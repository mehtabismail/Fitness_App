import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {mainStyle} from '../../components/styles/ScreenStyle';
import Fonts from '../../theme/Fonts';

const Profile = () => {
  return (
    <View style={mainStyle}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Fitness App Dashboard</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: Fonts.size.large,
    marginTop: 10,
  },
});
