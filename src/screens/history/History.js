/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {mainStyle} from '../../components/styles/ScreenStyle';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {storeHistoryData} from '../../redux/reducers/history/HistorySlice';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';

const History = () => {
  const [pressed, setPressed] = useState(null);
  const [pressedIndex, setPressedIndex] = useState(null);
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
        onPress={() => {
          pressed === null ? setPressed(index) : setPressed(null);
        }}
        style={[styles.listContainer, {height: pressed === index ? 200 : 40}]}>
        {pressed !== null && (
          <View
            style={
              (styles.eachItem,
              {
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: 'red',
              })
            }>
            <Text style={styles.gymDayText}>{item?.gym_day}</Text>
          </View>
        )}
        <View style={styles.singleList}>
          <View style={styles.eachItem}>
            <Text style={styles.textStyle}>{item?.gym_day}</Text>
          </View>
          <View style={styles.eachItem}>
            <Text style={styles.textStyle}>{item?.exercise_name}</Text>
          </View>
          <View style={styles.eachItem}>
            <Text>{'Date'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={mainStyle}>
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <Text style={styles.headingText}>History</Text>
      </View>
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
  listContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    // padding: 10,
    backgroundColor: Colors.Primary,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  singleList: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  eachItem: {flex: 1},
  headingText: {
    fontSize: Fonts.size.h2,
    color: Colors.Blue_1,
    fontWeight: 'bold',
  },
  gymDayText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Fonts.size.h4,
  },
});
