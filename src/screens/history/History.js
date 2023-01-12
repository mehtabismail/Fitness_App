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
  console.log(pressed, 'perrisdqbvjhsbfhvbs');
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
          // setyHistoryData([...historyData, data]);
          console.log(data.date.seconds, 'checking data ');

          dispatch(storeHistoryData({...data, date: data.date.seconds}));
        });
      });
  };
  useEffect(() => {
    getFireStoreData();
    // return () => setyHistoryData([]);
  }, []);
  // useEffect(() => {
  //   console.log(data.length, 'checking');
  // }, [data]);

  const FlatlistRenderer = ({item, index}) => {
    console.log(item);
    return (
      <TouchableOpacity
        onPress={() => {
          pressed === null ? setPressed(index) : setPressed(null);
        }}
        style={[
          styles.listContainer,
          {
            // height: pressed === index ? 180 : 50,
            paddingVertical: 20,
            justifyContent: pressed !== index ? 'center' : 'flex-start',
          },
        ]}>
        {pressed === index ? (
          <View>
            <View
              style={
                (styles.eachItem,
                {
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginBottom: 20,
                  marginTop: 5,
                })
              }>
              <Text style={styles.gymDayText}>{item?.gym_day + ' Day'}</Text>
            </View>
            <View>
              <View style={styles.rowList}>
                <Text style={styles.textSmall}>Date</Text>
                <Text style={styles.textSmall}>
                  {new Date(item?.date * 1000).toDateString()}
                </Text>
              </View>
              <View style={styles.rowList}>
                <Text style={styles.textSmall}>Exercise Time</Text>
                <Text style={styles.textSmall}>{item?.exercise_time}</Text>
              </View>
              <View style={styles.rowList}>
                <Text style={styles.textSmall}>Exercise Name</Text>
                <Text style={styles.textSmall}>{item?.exercise_name}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.singleList}>
            <View style={styles.eachItem}>
              <Text style={styles.textStyle}>{item?.gym_day}</Text>
            </View>
            <View style={styles.eachItem}>
              <Text style={styles.textStyle}>{item?.exercise_name}</Text>
            </View>
            <View style={styles.eachItem}>
              <Text>{new Date(item?.date * 1000).toDateString()}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={mainStyle}>
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <Text style={styles.headingText}>History</Text>
      </View>
      <View style={styles.container}>
        {data?.length === 0 ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'red', fontSize: 20, fontWeight: 'bold'}}>
              History not Found!
            </Text>
          </View>
        ) : (
          <FlatList data={data} renderItem={FlatlistRenderer} />
        )}
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
    //
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
  rowList: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  textSmall: {
    color: 'orange',
    fontSize: 16,
  },
});
