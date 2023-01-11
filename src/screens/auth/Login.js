import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {mainStyle} from '../../components/styles/ScreenStyle';
import LoginForm from './LoginForm';
import metrics from '../../theme/Metrics';
import Colors from '../../theme/Colors';
import navigationStrings from '../../constants/navigationStrings';

const Login = ({navigation}) => {
  return (
    <SafeAreaView style={mainStyle}>
      <View style={styles.container}>
        <Text style={styles.loginText}>Login screen</Text>
        <LoginForm navigation={navigation} />
      </View>
      <View style={styles.register}>
        <TouchableOpacity
          onPress={() => navigation.navigate(navigationStrings.SIGNUP)}>
          <Text style={{color: Colors.Primary}}>Register using email</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'black',
  },
  register: {
    padding: metrics.basePadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
