/* eslint-disable @typescript-eslint/no-unused-vars */
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import Colors from '../../theme/Colors';
import CustomButton from '../../components/CustomButton';
import metrics from '../../theme/Metrics';
import {useDispatch} from 'react-redux';
import {startLoading, stopLoading} from '../../redux/reducers/loading/Loading';
import {validateEmptyFields} from '../../utils/formValidator';
import isEmpty from '../../utils/isEmpty';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignupForm = ({navigation}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const errorMessages = {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    password: 'Password',
  };

  const dispatch = useDispatch();

  const handleChangeInput = (value, fieldName) => {
    setFormData({...formData, [fieldName]: value});
  };

  const removeError = props => {
    console.log(props);
  };

  const onClickHandler = async props => {
    const error = validateEmptyFields({...formData}, errorMessages);
    setErrors(error);

    if (isEmpty(error)) {
      try {
        dispatch(startLoading());
        auth()
          .createUserWithEmailAndPassword(formData.email, formData.password)
          .then(async res => {
            auth().currentUser.updateProfile({displayName: formData.firstName});
            firestore()
              .collection('users')
              .doc(res.user.uid)
              .set({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
              })
              .then(result => {
                console.log('User added successfully!');
              });
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              Alert.alert('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              Alert.alert('That email address is invalid!');
            }
            dispatch(stopLoading());
            console.error(error);
          });
      } catch (e) {
        console.log('catch error', e);
      }
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View>
        <CustomTextInput
          placeholder="First Name"
          placeholderTextColor={Colors.PrimaryTextColor}
          keyboardType="default"
          disabled="false"
          fieldName={'firstName'}
          secureTextEntry={false}
          handleChangeInput={handleChangeInput}
          passShowHide={false}
          error={errors.firstName && errors.firstName}
          removeError={removeError}
          flag=""
          screen="Signup"
        />
      </View>
      <View>
        <CustomTextInput
          placeholder="Last Name"
          placeholderTextColor={Colors.PrimaryTextColor}
          keyboardType="default"
          disabled="false"
          fieldName={'lastName'}
          secureTextEntry={false}
          handleChangeInput={handleChangeInput}
          passShowHide={false}
          error={errors.lastName && errors.lastName}
          removeError={removeError}
          flag=""
          screen="Signup"
        />
      </View>
      <View>
        <CustomTextInput
          placeholder="Email*"
          placeholderTextColor={Colors.PrimaryTextColor}
          keyboardType="default"
          disabled="false"
          fieldName={'email'}
          secureTextEntry={false}
          handleChangeInput={handleChangeInput}
          passShowHide={false}
          error={errors.email && errors.email}
          removeError={removeError}
          flag=""
          screen="Signup"
        />
      </View>
      {/* <View>
        <CustomTextInput
          placeholder="Contact"
          placeholderTextColor={Colors.PrimaryTextColor}
          keyboardType="default"
          disabled="false"
          fieldName={'contact'}
          secureTextEntry={false}
          handleChangeInput={handleChangeInput}
          passShowHide={false}
          error={errors.contact && errors.contact}
          removeError={removeError}
          flag=""
          screen="Signup"
        />
      </View>
      <View>
        <CustomTextInput
          placeholder="Country"
          placeholderTextColor={Colors.PrimaryTextColor}
          keyboardType="default"
          disabled="false"
          fieldName={'country'}
          secureTextEntry={false}
          handleChangeInput={handleChangeInput}
          passShowHide={false}
          error={errors.country && errors.country}
          removeError={removeError}
          flag=""
          screen="Signup"
        />
      </View> */}
      <View>
        <CustomTextInput
          placeholder="Password"
          placeholderTextColor={Colors.PrimaryTextColor}
          keyboardType="default"
          disabled="false"
          fieldName={'password'}
          secureTextEntry={true}
          handleChangeInput={handleChangeInput}
          passShowHide={false}
          error={errors.password && errors.password}
          removeError={removeError}
          flag=""
          screen="Signup"
        />
      </View>
      <View style={styles.buttonStyle}>
        <CustomButton
          buttonText="Register"
          buttonTextColor="white"
          onPressHandler={onClickHandler}
          isLoadingButton={true}
          backgroundColor={Colors.Primary}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButtonStyle}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  mainContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  buttonStyle: {
    marginVertical: metrics.doubleBaseMargin,
  },
  backButtonStyle: {
    marginVertical: metrics.baseMargin,
    alignItems: 'center',
  },
});
