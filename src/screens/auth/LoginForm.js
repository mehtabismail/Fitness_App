/* eslint-disable no-shadow */
/* eslint-disable no-catch-shadow */
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import Colors from '../../theme/Colors';
import metrics from '../../theme/Metrics';
import Fonts from '../../theme/Fonts';
import CustomButton from '../../components/CustomButton';
import {useDispatch} from 'react-redux';
import {startLoading, stopLoading} from '../../redux/reducers/loading/Loading';
import navigationStrings from '../../constants/navigationStrings';
import {validateEmptyFields} from '../../utils/formValidator';
import isEmpty from '../../utils/isEmpty';
import auth from '@react-native-firebase/auth';
import {storeAuth} from '../../redux/reducers/auth/AuthSlice';

const FormContainer = ({navigation}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const errorMessages = {
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

  const onClickHandler = async () => {
    const error = validateEmptyFields({...formData}, errorMessages);
    setErrors(error);
    const formState = {
      ...formData,
    };
    if (isEmpty(error)) {
      try {
        dispatch(startLoading());
        let email = formState.email.replace(/^\s+|\s+$/gm, '');
        try {
          auth()
            .signInWithEmailAndPassword(email, formState.password)
            .then(res => {
              dispatch(storeAuth(res));
              dispatch(stopLoading());
              navigation.replace(navigationStrings.DRAWER);
            })
            .catch(error => Alert.alert(error));
        } catch (error) {
          Alert.alert(error);
        }
      } catch (error) {
        console.log(error, 'catch block');
        Alert.alert(error);
      }
    }
  };
  return (
    <View style={styles.input}>
      <View>
        <View>
          <Text style={styles.fieldNameStyle}>{'Your email'}</Text>
        </View>
        <CustomTextInput
          placeholder="Email"
          placeholderTextColor={Colors.black}
          keyboardType="default"
          disabled="false"
          fieldName={'email'}
          secureTextEntry={false}
          handleChangeInput={handleChangeInput}
          passShowHide={false}
          flag=""
          error={errors.email && errors.email}
          removeError={removeError}
          screen="Login"
        />
      </View>
      <View style={styles.passwordInput}>
        <View>
          <Text style={styles.fieldNameStyle}>{'Password'}</Text>
        </View>
        <CustomTextInput
          placeholder="Password"
          placeholderTextColor={Colors.black}
          keyboardType="default"
          disabled="false"
          fieldName={'password'}
          secureTextEntry={true}
          handleChangeInput={handleChangeInput}
          passShowHide={false}
          flag="Password-hide-show"
          error={errors.password && errors.password}
          removeError={removeError}
          screen="Login"
        />
      </View>
      <TouchableOpacity style={styles.forgetContainer}>
        <Text style={styles.forgetText}>Forget your password?</Text>
      </TouchableOpacity>
      <View style={styles.buttonStyle}>
        <CustomButton
          buttonText="Login"
          buttonTextColor="black"
          onPressHandler={onClickHandler}
          isLoadingButton={true}
          backgroundColor={Colors.Primary}
        />
      </View>
    </View>
  );
};

export default FormContainer;

const styles = StyleSheet.create({
  input: {width: '100%'},
  passwordInput: {
    marginTop: metrics.baseMargin,
  },
  forgetContainer: {
    alignSelf: 'flex-end',
    marginTop: metrics.regularMargin,
  },
  forgetText: {
    color: Colors.black,
    fontSize: Fonts.size.medium,
  },
  buttonStyle: {
    marginTop: metrics.baseMargin,
  },
  fieldNameStyle: {
    color: Colors.SecondaryTextColor,
    fontSize: Fonts.size.medium,
  },
});
