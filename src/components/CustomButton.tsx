import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import {ButtonProp} from './Types';

const CustomButton = (props: ButtonProp) => {
  const loading = useSelector((state: RootState) => state?.loading?.isLoading);
  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: props?.backgroundColor,
        },
      ]}>
      <TouchableOpacity
        onPress={props?.onPressHandler}
        disabled={loading ? true : false}
        style={styles.touchableContainer}>
        {props?.isLoadingButton && loading ? (
          <ActivityIndicator
            color={props?.buttonTextColor}
            size="large"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        ) : (
          <Text style={{...styles.textStyle, color: props?.buttonTextColor}}>
            {props?.buttonText}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  mainContainer: {height: 60, borderRadius: 10},
  textStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  touchableContainer: {
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
