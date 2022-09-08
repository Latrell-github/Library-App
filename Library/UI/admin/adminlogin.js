import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";

import * as UI from "../../shared/UI";
/**
 * 
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Sign Up")}
          >
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Sign Up")}
          >
            <Text>Register</Text>
          </TouchableOpacity>
 * 
 */
function post(url, parameters) {
  return new Promise((resolve, reject) => {
    var xhttp = new XMLHttpRequest();
    var queryString = Object.keys(parameters)
      .map((key) => key + "=" + parameters[key])
      .join("&");

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resolve(this.responseText);
      }
    };

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(queryString);
  });
}

export default class Adminlogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
      icon: require("../../img/eye_close_icon.png"),
      text_password: "",
      text_username: "",
      loading: false,
    };
  }
  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  onUser = (value) => {
    this.setState({ text_username: value });
  };
  submitButton = async () => {
    let username = this.state.text_username;
    let password = this.state.text_password;
    if (username.length > 0) {
      if (password.length > 7){
        var Url = "https://librarynatinglahat.000webhostapp.com/api/select.php";
        let Data = {
          
          username: username,
          password: password,
        };
        this.setState({
          text_username: "",
          text_password: ""
        })
        let response = await post(Url, Data);
        let code_object = JSON.parse(response);
        if (code_object.result == "Success") {
          this.hideLoading();
          this.props.navigation.navigate("AdminMain");
          Alert.alert("Hello","Welcome ");
        } else if (code_object.result == "unsuccessful") {
          //message na mali password
          this.hideLoading();
          alert("Incorrect");
        }
      }else{
        alert("Password is required")
      }
    } else {
        alert("Username is required")
    }
    
  };
  onIconPress = () => {
    let new_icon = !this.state.secureTextEntry
      ? require("../../img/eye_close_icon.png")
      : require("../../img/eye_open_icon.png");
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
      icon: new_icon,
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
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: "center",
          }}
        >
          <Image
            style={{ height: 100, width: 100 }}
            source={require("../../img/book.png")}
          />
          <UI.SizedBox height={20} />
          <Text style={{ fontSize: 24, color: "white" }}>Welcome Back!</Text>
          <UI.SizedBox height={10} />

          <UI.SizedBox height={30} />
          <View
            style={{
              height: 50,
              alignSelf: "stretch",
              backgroundColor: "#262932",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <UI.SizedBox width={14} />
            <Image
              style={{ height: 22, width: 22 }}
              source={require("../../img/name.png")}
            />
            <UI.SizedBox width={14} />
            <TextInput
              onChangeText={this.onUser}
              placeholderTextColor={"#939393"}
              style={{ color: "white", fontSize: 13.5, flex: 1 }}
              placeholder={"Username goes here..."}
              value={this.state.text_username}
            />

            <UI.SizedBox width={45} />
          </View>
          <View
            style={{
              height: 50,
              alignSelf: "stretch",
              backgroundColor: "#262932",
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <UI.SizedBox width={14} />
            <Image
              style={{ height: 22, width: 22 }}
              source={require("../../img/key_icon.png")}
            />
            <UI.SizedBox width={14} />
            <TextInput
              secureTextEntry={this.state.secureTextEntry}
              onChangeText={(text) => {
                this.setState({
                  text_password: text,
                });
              }}
              placeholderTextColor={"#939393"}
              style={{ color: "white", fontSize: 13.5, flex: 1 }}
              placeholder={"Password goes here..."}
              value={this.state.text_password}
            />

            <UI.SizedBox width={45} />

            <TouchableOpacity
              disabled={this.state.text_password.length > 0 ? false : true}
              onPress={this.onIconPress}
              style={{
                position: "absolute",
                right: 15,
                opacity: this.state.text_password.length > 0 ? 1 : 0,
              }}
            >
              <Image
                style={{ height: 20, width: 20 }}
                source={this.state.icon}
              />
            </TouchableOpacity>
          </View>

          <UI.SizedBox height={45} />

          <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                this.showLoading();
                this.submitButton();
              }}
            >
              <Image
                style={{ height: 50, width: 50 }}
                source={require("../../img/login_icon.png")}
              />
            </TouchableOpacity>
            <UI.SizedBox width={20} />
            <TouchableOpacity
              onPress={() => {
                this.showLoading();
                this.submitButton();
              }}
            >
              <Text style={{ fontSize: 28, color: "white" }}>Login</Text>
            </TouchableOpacity>
          </View>
          <UI.SizedBox height={50} />

          <View
            style={{
              borderRadius: 10,
              alignSelf: "stretch",
              padding: 5,
              flexDirection: "row",
              backgroundColor: "#6C0505",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 48, width: 48 }}
              source={require("../../img/pup_star_icon.png")}
            />
            <UI.SizedBox width={10} />

            <Text style={{ fontSize: 16, color: "white" }}>
              Handog ng Sintang Paaralan
            </Text>
          </View>

          <UI.SizedBox height={50} />
          {this.state.loading && (
            <View style={styles.loading}>
              <Text style={styles.wait}>Please wait</Text>
              <ActivityIndicator size="large" color="white" />
            </View>
          )}
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 30,
    borderWidth: 2,
    marginTop: 10,
    paddingHorizontal: 20,
    borderColor: "#00716F",
    borderRadius: 23,
    paddingVertical: 15,
    alignSelf: "center",
    justifyContent: "center",
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  wait: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
});
