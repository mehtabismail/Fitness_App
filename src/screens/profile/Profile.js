import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import navigationStrings from '../../constants/navigationStrings';
import Colors from '../../theme/Colors';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

const Profile = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.Primary,
          paddingVertical: 20,
          paddingHorizontal: 40,
          borderRadius: 20,
        }}
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
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
          Log out
        </Text>
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
