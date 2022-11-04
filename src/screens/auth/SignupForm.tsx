/* eslint-disable @typescript-eslint/no-unused-vars */
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import Colors from '../../theme/Colors';
import CustomButton from '../../components/CustomButton';
import metrics from '../../theme/Metrics';
import {NavigationProp} from '../../components/Types';
import {useDispatch} from 'react-redux';
import {startLoading, stopLoading} from '../../redux/reducers/loading/Loading';
import {SignupProp} from './Types';
import {validateEmptyFields} from '../../utils/formValidator';
import isEmpty from '../../utils/isEmpty';
import auth from '@react-native-firebase/auth';
import navigationStrings from '../../constants/navigationStrings';
import {storeAuth} from '../../redux/reducers/auth/AuthSlice';

const SignupForm = ({navigation}: NavigationProp) => {
  const [formData, setFormData] = useState<SignupProp>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<any>({});
  const errorMessages = {
    email: 'Email',
    password: 'Password',
  };

  const dispatch = useDispatch();

  const handleChangeInput = (value: string | Number, fieldName: string) => {
    setFormData({...formData, [fieldName]: value});
  };

  const removeError = (props: any) => {
    console.log(props);
  };

  const onClickHandler = async (props: any) => {
    const error = validateEmptyFields({...formData}, errorMessages);
    setErrors(error);

    if (isEmpty(error)) {
      try {
        console.log(formData, 'hello checking');
        dispatch(startLoading());
        auth()
          .createUserWithEmailAndPassword(formData.email, formData.password)
          .then(res => {
            console.log(res, 'User account created & signed in!');
            dispatch(storeAuth(res));
            dispatch(stopLoading());
            navigation.replace(navigationStrings.DRAWER);
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
