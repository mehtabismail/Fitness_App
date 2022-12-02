import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import navigationStrings from '../../constants/navigationStrings';

const Profile = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Profile Screen component</Text>
      <TouchableOpacity
        style={{backgroundColor: 'red'}}
        onPress={() =>
          auth()
            .signOut()
            .then(() =>
              navigation.reset({
                index: 0,
                routes: [{name: navigationStrings.LOGIN}],
              }),
            )
        }>
        <Text>Log out</Text>
      </TouchableOpacity>
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
  },
});
