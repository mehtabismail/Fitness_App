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
import Modal from 'react-native-modal';
import RenderModal from './RenderModal';
import DropDownPicker from 'react-native-dropdown-picker';

const Exercise = () => {
  const [start, setStart] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(90000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Legs', value: 'Legs'},
    {label: 'Chest', value: 'Chest'},
    {label: 'Back', value: 'Back'},
    {label: 'Shoulder', value: 'Shoulder'},
    {label: 'Bicep & Tricep', value: 'Bicep & Tricep'},
  ]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  let timer = null;

  const dispatch = useDispatch();
  const auth = useSelector(state => state?.auth?.Auth_Response);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        source={require('../../assets/Images/myWorkoutBg.png')}
        resizeMode="contain"
        blurRadius={1}
        style={styles.imageStyle}>
        <View style={styles.container}>
          <Modal isVisible={isModalVisible}>
            <RenderModal
              time={seconds}
              day={value}
              close={toggleModal}
              resetStopwatch={setResetStopwatch}
            />
          </Modal>
          <View
            style={{
              width: '60%',
              alignSelf: 'center',
              marginTop: 20,
              opacity: 0.4,
              zIndex: 100,
            }}>
            <DropDownPicker
              placeholder="Exercise Day"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
          <View
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
              {seconds}
            </Text>
          </View>
          <View style={styles.sectionStyle}>
            <Stopwatch
              laps
              // msecs
              start={isStopwatchStart}
              reset={resetStopwatch}
              getTime={time => {
                setSeconds(time);
              }}
            />
          </View>

          <TouchableOpacity
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
              borderRadius: 20,
            }}>
            <View style={{paddingVertical: 15}}>
              <Text>{!isStopwatchStart ? 'START' : 'STOP'}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (seconds != '00:00:00' && !!value) {
                setIsStopwatchStart(false);
                toggleModal();
              }
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
              <Text>End Exercise</Text>
            </View>
          </TouchableOpacity>
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
