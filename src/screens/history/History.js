/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {mainStyle} from '../../components/styles/ScreenStyle';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {storeHistoryData} from '../../redux/reducers/history/HistorySlice';
import Colors from '../../theme/Colors';

const History = () => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state?.history);
  const getFireStoreData = () => {
    dispatch(storeHistoryData(null));
    return firestore()
      .collection('gym')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          let data = snapshot.data();
          dispatch(storeHistoryData(data));
        });
      });
  };
  useEffect(() => {
    getFireStoreData();
  }, []);
  useEffect(() => {
    console.log(data.length, 'checking');
  }, [data]);

  const FlatlistRenderer = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: Colors.Primary,
          margin: 20,
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.textStyle}>{item?.gym_day}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.textStyle}>{item?.exercise_name}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text>{'Date'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={mainStyle}>
      <View style={styles.container}>
        <FlatList data={data} renderItem={FlatlistRenderer} />
      </View>
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});
