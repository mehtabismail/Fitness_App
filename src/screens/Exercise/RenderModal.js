/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../theme/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import Fonts from '../../theme/Fonts';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {startLoading, stopLoading} from '../../redux/reducers/loading/Loading';

const RenderModal = ({time, day, close, resetStopwatch}) => {
  const [exerciseName, setExerciseName] = useState('');
  const [focus, setFocus] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
  ]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {label: '6', value: '6'},
    {label: '8', value: '8'},
    {label: '10', value: '10'},
    {label: '12', value: '12'},
    {label: '14', value: '14'},
    {label: '16', value: '16'},
    {label: '18', value: '18'},
  ]);

  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.loading);
  console.log(isLoading, 'hello loading');

  const AddingToFirebase = async () => {
    dispatch(startLoading());
    return await firestore()
      .collection('gym')
      .add({
        gym_day: day,
        exercise_name: exerciseName,
        exercise_time: time,
        no_of_sets: value,
        no_of_reps: value2,
        date: new Date(),
      })
      .then(() => {
        dispatch(stopLoading());
        console.log('Exercise added!');
      });
  };
  return (
    <View
      style={{
        // flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'space-between',
        height: '60%',
      }}>
      <View style={{alignItems: 'center', marginTop: 20, marginBottom: 10}}>
        <Text
          style={{color: 'black', fontWeight: 'bold', fontSize: Fonts.size.h2}}>
          {day + ' Day'}
        </Text>
      </View>
      <View>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <TextInput
            placeholder="Enter Exercise name"
            onChangeText={text => setExerciseName(text)}
            value={exerciseName}
            placeholderTextColor="black"
            onFocus={() => setFocus(false)}
            onBlur={() => setFocus(true)}
            style={{
              borderBottomColor: 'black',
              color: 'black',
              borderWidth: 1,
              borderRadius: 7,
            }}
          />
        </View>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginVertical: 10,
            zIndex: 10,
          }}>
          <DropDownPicker
            placeholder="Total number of sets"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
        <View style={{width: '90%', alignSelf: 'center', zIndex: 1}}>
          <DropDownPicker
            placeholder="Total number of reps"
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
          />
        </View>
        <View style={{alignSelf: 'center', marginTop: 10}}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            Total Exercise time : {time}
          </Text>
        </View>
      </View>
      <View style={{alignSelf: 'center', marginBottom: 20}}>
        {focus && (
          <TouchableOpacity
            onPress={async () => {
              if (!!exerciseName && !!value && !!value2) {
                await AddingToFirebase();
                await close();
                return resetStopwatch(true);
              }
            }}
            style={{
              backgroundColor: Colors.Primary,
              width: 150,
              paddingVertical: 15,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{color: 'white', fontWeight: 'bold'}}>Update</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default RenderModal;
