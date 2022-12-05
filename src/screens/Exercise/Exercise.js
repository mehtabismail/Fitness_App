/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Fonts from '../../theme/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/Store';
import firestore from '@react-native-firebase/firestore';
import {storeUserData} from '../../redux/reducers/auth/UserSlice';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';

const Exercise = () => {
  const [start, setStart] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(90000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);

  const options = {
    container: {
      backgroundColor: 'lightblue',
      padding: 5,
      borderRadius: 5,
      width: 200,
      alignItems: 'center',
    },
    text: {
      fontSize: 25,
      color: '#FFF',
      marginLeft: 7,
    },
  };

  let timer = null;

  const dispatch = useDispatch();
  const auth = useSelector(state => state?.auth?.Auth_Response);

  useEffect(() => {
    if (start === true) {
      timer = setInterval(() => {
        setSeconds(seconds + 1);
        // if (seconds <= 60) {
        //   setSeconds(seconds + 1);
        //   console.log('time starts', seconds);
        // } else {
        //   setMinutes(minutes + 1);
        //   setSeconds(seconds + 1);
        // }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [start]);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        source={require('../../assets/Images/myWorkoutBg.png')}
        resizeMode="contain"
        blurRadius={1}
        style={styles.imageStyle}>
        <View style={styles.container}>
          {/* <View
            style={{
              backgroundColor: 'lightblue',
              opacity: 0.7,
              width: '80%',
              height: '40%',
              borderRadius: 1000,
              alignSelf: 'center',
              marginTop: '40%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: Fonts.size.h1,
                fontWeight: 'bold',
              }}>
              {minutes + ':' + seconds}
            </Text>
          </View> */}
          <View style={styles.sectionStyle}>
            <Stopwatch
              laps
              // msecs
              start={isStopwatchStart}
              reset={resetStopwatch}
              options={options}
              getTime={time => {
                console.log(time);
              }}
            />
            <TouchableOpacity
              style={{backgroundColor: 'green'}}
              onPress={() => {
                setIsStopwatchStart(!isStopwatchStart);
                setResetStopwatch(false);
              }}>
              <Text style={styles.buttonText}>
                {!isStopwatchStart ? 'START' : 'STOP'}
              </Text>
            </TouchableOpacity>
            <TouchableHighlight
              onPress={() => {
                setIsStopwatchStart(false);
                setResetStopwatch(true);
              }}>
              <Text style={styles.buttonText}>RESET</Text>
            </TouchableHighlight>
          </View>

          {/* <TouchableOpacity
            onPress={() => {
                setIsStopwatchStart(!isStopwatchStart);
                setResetStopwatch(false);
              }}
            style={{
              backgroundColor: 'purple',
              justifyContent: 'center',
              alignItems: 'center',
              width: '40%',
              alignSelf: 'center',
              marginBottom: 20,
              borderRadius: 20,
            }}>
            <View style={{paddingVertical: 15}}>
              <Text>{!isStopwatchStart ? 'START' : 'STOP'}</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Exercise;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: Fonts.size.h3,
    marginTop: 10,
  },
  imageStyle: {width: '100%', height: '100%'},
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
});
