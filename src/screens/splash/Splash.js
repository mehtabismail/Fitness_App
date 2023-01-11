/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {mainStyle} from '../../components/styles/ScreenStyle';
import navigationStrings from '../../constants/navigationStrings';
import auth from '@react-native-firebase/auth';
import CustomButton from '../../components/CustomButton';
import Colors from '../../theme/Colors';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// MAIN FUNCTION
const Splash = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  console.log(user);

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('loggedInUser', value);
    } catch (e) {
      // saving error
      Alert.alert(e);
    }
  };

  function onAuthStateChanged(user) {
    setUser(user);
    if (user === null) {
      setTimeout(() => {
        navigation.replace(navigationStrings.LOGIN);
      }, 0);
    } else {
      console.log(user, 'found user to go again');
      navigation.replace(navigationStrings.BOTTOM_TABS);
    }
    if (initializing) {
      setInitializing(false);
    }
  }

  const clickHandler = () => {
    auth().onAuthStateChanged(onAuthStateChanged);
  };

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmountƒ
  // }, []);

  return (
    <SafeAreaView style={mainStyle}>
      <LinearGradient colors={['#01D1FB', '#3E30A1']}>
        <ImageBackground
          source={require('../../assets/Images/bgImage.png')}
          resizeMode="cover"
          style={styles.imageStyle}>
          <View style={styles.container}>
            <View style={styles.viewstyle}>
              <CustomButton
                buttonText={'Shape yourself'}
                buttonTextColor={'white'}
                onPressHandler={clickHandler}
                isLoadingButton={true}
                backgroundColor={Colors.Primary}
              />
            </View>
          </View>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imageStyle: {width: '100%', height: '100%'},
  viewstyle: {
    width: '90%',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
