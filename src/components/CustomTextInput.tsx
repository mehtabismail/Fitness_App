/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Colors from '../theme/Colors';
import {InputProp} from './Types';

const CustomTextInput = (props: InputProp) => {
  return (
    <View>
      <TextInput
        placeholder={props?.placeholder}
        placeholderTextColor={props?.placeholderTextColor}
        style={{
          ...styles.input,
          color:
            props?.screen === 'Login' ? Colors.placeholderTextColor : 'black',
          marginTop: props?.screen === 'Login' ? 15 : 20,
        }}
        keyboardType={props?.keyboardType ? props?.keyboardType : 'default'}
        editable={props?.disabled && props?.disabled === 'true' ? false : true}
        secureTextEntry={!props?.passShowHide ? props?.secureTextEntry : false}
        onChangeText={(value: Number | string) =>
          props?.handleChangeInput(value, props?.fieldName)
        }
      />
      {/* {props?.flag && props?.flag === 'Password-hide-show' ? (
          <TouchableOpacity>
            {!props.passShowHide ? (
              <EyeShow height={20} width={20} />
            ) : (
              <EyeShow height={20} width={20} />
            )}
          </TouchableOpacity>
        ) : null} */}

      {!!props?.error && (
        <Text style={styles.errorMessages}>{props?.error && props?.error}</Text>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    borderBottomColor: Colors.TextInputBorderColor,
    borderBottomWidth: 1,
    fontSize: 16,
    paddingBottom: 12,
    paddingHorizontal: 6,
  },
  errorMessages: {
    color: 'red',
    fontSize: 12,
    marginTop: 7,
    width: '90%',
  },
});
