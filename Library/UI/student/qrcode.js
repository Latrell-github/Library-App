//This is an example code to generate QR code//
import React, { Component } from "react";
//import react in our code.
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  AsyncStorage,
} from "react-native";
// import all basic components
import QRCode from "react-native-qrcode-svg";
import * as UI from "../../shared/UI";
//import QRCode



class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: "1",
      // Default Value of the TextInput
      valueForQRCode: "1",
      // Default value for the QR Code
    };
  }

  getTextInputValue = () => {
    // Function to get the value from input
    // and Setting the value to the QRCode
    this.setState({ valueForQRCode: this.state.inputValue });
  };
  componentDidMount = async () => {
    let username = await AsyncStorage.getItem("username");
    this.setState({
      inputValue: username,
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          console.log("dismissed keyboard");
        }}
      >
        <ImageBackground
          source={require("../../img/login_bg.png")}
          style={{
            backgroundColor: "#FFF",
            flex: 1,

            justifyContent: "center",
          }}
        >
          
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Main")}
          >
            <Image
              style={{ height: 50, width: 50 }}
              source={require("../../img/Back.png")}
            />
            <Text style={{ color: "white", justifyContent: "center" }}>
              Go Back
            </Text>
          </TouchableOpacity>
          <UI.SizedBox height={100} />
          <View style={styles.MainContainer}>
          
              <QRCode
                value={this.state.valueForQRCode}
                //Setting the value of QRCode
                size={250}
                //Size of QRCode
                bgColor="#000"
                //Backgroun Color of QRCode
                fgColor="#fff"
                //Front Color of QRCode
              />
          </View>
          <View style={styles.container}>
            <TextInput
              // Input to get the value to set on QRCode
              style={styles.TextInputStyle}
              onChangeText={(text) => this.setState({ inputValue: text })}
              placeholderTextColor={"#939393"}
              underlineColorAndroid="transparent"
              placeholder="Enter Student ID"
              value={this.state.inputValue}
            />
            <TouchableOpacity
              onPress={this.getTextInputValue}
              activeOpacity={0.7}
              style={styles.button}
            >
              <Text style={styles.TextStyle}> Generate QR Code </Text>
            </TouchableOpacity>
            </View>
            <UI.SizedBox height={170} />
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}
export default App;
const styles = StyleSheet.create({
  MainContainer: {
    marginLeft:30,
    marginRight:30,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor:"white"
  },

  TextInputStyle: {
    width: "100%",
    height: 40,
    marginTop: 20,
    borderWidth: 1,
    textAlign: "center",
    color: "white",
  },

  button: {
    width: "100%",
    paddingTop: 8,
    marginTop: 10,
    paddingBottom: 8,
    backgroundColor: "#F44336",
    marginBottom: 20,
    marginLeft: 40,
    marginRight: 40,
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  container:{
    alignItems:"center",
    justifyContent:"center",
    marginLeft: 40,
    marginRight: 40,
  }
});
