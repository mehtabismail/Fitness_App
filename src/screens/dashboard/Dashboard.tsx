import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Fonts from '../../theme/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/Store';
import firestore from '@react-native-firebase/firestore';
import {storeUserData} from '../../redux/reducers/auth/UserSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const auth: any = useSelector(
    (state: RootState) => state?.auth?.Auth_Response,
  );
  const {firstName}: any = useSelector(
    (state: RootState) => state?.user?.userData,
  );

  const onResult = (QuerySnapshot: any) => {
    console.log('Got Users collection result.', QuerySnapshot._data);
    dispatch(storeUserData(QuerySnapshot?._data));
  };

  const onError = (error: any) => {
    console.error(error);
  };
  useEffect(() => {
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
      <View>
        <Text style={styles.textStyle}>Welcome {firstName}</Text>
      </View>
      <ImageBackground
        source={require('../../assets/Images/myWorkoutBg.png')}
        resizeMode="contain"
        style={styles.imageStyle}>
        <View style={styles.container}>
          <Text>Hello</Text>
          <View />
        </View>
      </ImageBackground>
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
});
