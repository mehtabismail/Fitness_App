/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from 'react-native';
import React from 'react';
import Colors from '../../theme/Colors';

export default class BmiCalculator extends React.Component {
  state = {
    height: 0,
    mass: 0,
    resultNumber: 0,
    resultText: '',
  };

  handleCalculate = () => {
    let imc = (this.state.mass * 703) / this.state.height ** 2;
    this.setState({
      resultNumber: imc.toFixed(2),
    });

    if (imc < 18.5) {
      this.setState({resultText: 'Underweight'});
    } else if (imc > 18.5 && imc < 25) {
      this.setState({resultText: 'Normal Weight'});
    } else if (imc >= 25 && imc < 30) {
      this.setState({resultText: 'Overweight'});
    } else {
      this.setState({resultText: 'Obesity'});
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text
          style={{
            color: Colors.Primary,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 30,
            fontSize: 25,
            fontWeight: 'bold',
          }}>
          BMI Calculator
        </Text>
        <View style={styles.container}>
          <View>
            <View style={styles.intro}>
              <TextInput
                placeholder="Enter Height"
                placeholderTextColor={'grey'}
                keyboardType="numeric"
                style={styles.input}
                onChangeText={height => {
                  this.setState({height});
                }}
              />
              <TextInput
                placeholder="Enter Mass"
                placeholderTextColor={'grey'}
                keyboardType="numeric"
                style={styles.input}
                onChangeText={mass => {
                  this.setState({mass});
                }}
              />
            </View>

            <TouchableOpacity
              onPress={this.handleCalculate}
              style={styles.button}>
              <Text style={styles.buttonText}>Calculate </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 100}}>
            <Text style={styles.result}>{this.state.resultNumber}</Text>
            <Text style={[styles.result, {fontSize: 35}]}>
              {this.state.resultText}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    // backgroundColor: "#f5fcff"
  },
  intro: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  input: {
    height: 80,
    textAlign: 'center',
    fontSize: 20,
    marginTop: 24,
    color: Colors.PrimaryDark,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '45%',
  },
  button: {
    marginTop: 50,
    backgroundColor: '#1D1D1B',
    width: '60%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  buttonText: {
    alignSelf: 'center',
    padding: 30,
    fontSize: 25,
    color: '#FFCB1F',
    fontWeight: 'bold',
  },
  result: {
    alignSelf: 'center',
    color: '#FFCB1F',
    fontSize: 65,
  },
});
