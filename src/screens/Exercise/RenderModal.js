/* eslint-disable react-native/no-inline-styles */
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../theme/Colors';
import DropDownPicker from 'react-native-dropdown-picker';

const RenderModal = ({time}: any) => {
  const [exerciseName, setExerciseName] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
  ]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
      }}>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <TextInput
          placeholder="Exercise name"
          onChangeText={text => setExerciseName(text)}
          value={exerciseName}
          placeholderTextColor="black"
          style={{
            borderBottomColor: 'black',
            color: 'black',
            borderBottomWidth: 1,
          }}
        />
      </View>
      <View style={{width: '90%', alignSelf: 'center', marginVertical: 10}}>
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
      <View style={{width: '90%', alignSelf: 'center'}}>
        <DropDownPicker
          placeholder="Total number of reps"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <View>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Total Exercise time : {time}
        </Text>
      </View>
      <View style={{position: 'absolute', bottom: 10, alignSelf: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.Primary,
            width: 150,
            paddingVertical: 15,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RenderModal;
