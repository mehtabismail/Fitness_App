/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Fonts from '../../theme/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/Store';
import firestore from '@react-native-firebase/firestore';
import {storeUserData} from '../../redux/reducers/auth/UserSlice';
import {Shadow} from '../../components/styles/ScreenStyle';
import Colors from '../../theme/Colors';
import navigationStrings from '../../constants/navigationStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';

const Profile = ({navigation}) => {
  const [displayName, setDisplayName] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state?.auth?.Auth_Response);

  const userData = useSelector(state => state?.user);

  console.log(userData?.userData?.firstName, 'checking');

  const onResult = QuerySnapshot => {
    console.log('Got Users collection result.', QuerySnapshot._data);
    dispatch(storeUserData(QuerySnapshot?._data));
  };

  const onError = error => {
    console.error(error);
  };

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setDisplayName(user?.displayName);
    }
  }, [firebase.auth().currentUser.displayName]);

  useEffect(() => {
    console.log(auth?.user?.uid, 'uid');
    const subscriber = firestore()
      .collection('users')
      .doc(auth?.user?.uid)
      .onSnapshot(onResult, onError);

    // Stop listening for updates when no longer required
    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user?.uid]);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{alignItems: 'center', paddingTop: 20}}>
        <Text style={styles.textStyle}>{'Welcome ' + displayName}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.boxList}>
          {/* <TouchableOpacity style={[Shadow, styles.box]}>
            <Text
              style={{
                color: Colors.Primary,
                fontWeight: 'bold',
                fontSize: Fonts.size.large,
              }}>
              Exercises
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity style={[Shadow, styles.box]}>
            <Text
              style={{
                color: Colors.Primary,
                fontWeight: 'bold',
                fontSize: Fonts.size.large,
              }}>
              Fruits & Calories
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationStrings.BMI)}
            style={[Shadow, styles.box]}>
            <Text
              style={{
                color: Colors.Primary,
                fontWeight: 'bold',
                fontSize: Fonts.size.large,
              }}>
              BMI Calculator
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationStrings.HISTORY)}
            style={[Shadow, styles.box]}>
            <Text
              style={{
                color: Colors.Primary,
                fontWeight: 'bold',
                fontSize: Fonts.size.large,
              }}>
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: Fonts.size.h3,
    marginTop: 10,
  },
  imageStyle: {width: '100%', height: '100%'},
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 150,
    width: 150,
    backgroundColor: 'white',
    margin: 10,
  },
  boxList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 100,
  },
});
