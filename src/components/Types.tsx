import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export interface NavigationProp {
  navigation: NativeStackNavigationProp<any>;
}

export interface ButtonProp {
  buttonText: string;
  buttonTextColor: string;
  onPressHandler: any;
  isLoadingButton: boolean;
  backgroundColor: string | undefined;
}

export interface InputProp {
  fieldName: string;
  placeholder: string;
  keyboardType: any;
  secureTextEntry: boolean;
  disabled: string;
  handleChangeInput: Function;
  placeholderTextColor: any;
  passShowHide: boolean;
  flag: string;
  error: string;
  removeError: Function;
  screen: string;
}