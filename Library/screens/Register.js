import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import * as UI from "../shared/UI";

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

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
      icon: require("../img/eye_close_icon.png"),
      secureTextEntry1: true,
      icon1: require("../img/eye_close_icon.png"),
     
      text_ID: "",
      text_fname: "",
      text_password: "",
      text_password1: "",
    };
  }
  onUser = (value) => {
    this.setState({ text_ID: value });
  };
  onName = (value) => {
    this.setState({ text_fname: value });
  };
  onPassword = (value) => {
    this.setState({ text_password: value });
  };
  onPassword1 = (value) => {
    this.setState({ text_password1: value });
  };
  onButton = async () => {
    let ID = this.state.text_ID;
    let fname = this.state.text_fname;
    let password = this.state.text_password;
    let password1 = this.state.text_password1;

    if (ID.length > 0) {
      if (fname.length > 0) {
        if (password.length > 7) {
          if (password1 == password && password.length > 7 ) {
            var url="https://librarynatinglahat.000webhostapp.com/api/insertUsers.php";
            var Data={
              ID:ID,
              fname:fname,
              password:password,
            };
            
            let response = await post(url, Data);
            console.log(response)
            alert("Thank You!")
            this.setState({
              text_ID: "",
              text_fname: "",
              text_password: "",
              text_password1: "",
            });

          } else {
            alert("Password didn`t match");
          }
        } else {
          alert("Must have 8 or more characters");
        }
      } else {
        alert("Please Insert Full Name");
      }
    } else {
      alert("Please Insert Student ID, Complete Form");
    }
  };
  onIconPress = () => {
    let new_icon = !this.state.secureTextEntry
      ? require("../img/eye_close_icon.png")
      : require("../img/eye_open_icon.png");
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
      icon: new_icon,
    });
  };
  onIconPress1 = () => {
    let new_icon1 = !this.state.secureTextEntry1
      ? require("../img/eye_close_icon.png")
      : require("../img/eye_open_icon.png");
    this.setState({
      secureTextEntry1: !this.state.secureTextEntry1,
      icon1: new_icon1,
    });
  };
  showAlert = () => {
    Alert.alert("Alert", "Go to Student Tab", [
      {
        text: "Home",
        onPress: this.onNavigate.bind(this),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };
  onNavigate() {
    const { navigation } = this.props;
    navigation.navigate("Home");
  }
  render(props) {
    const { navigation } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          console.log("dismissed keyboard");
        }}
      >
        <ImageBackground
          source={require("../img/login_bg.png")}
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
            source={require("../img/book.png")}
          />
          <UI.SizedBox height={20} />
          <Text style={{ fontSize: 24, color: "white" }}>
            Create an account
          </Text>
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
              source={require("../img/name.png")}
            />
            <UI.SizedBox width={14} />
            <TextInput
              onChangeText={this.onUser}
              placeholderTextColor={"#939393"}
              style={{ color: "white", fontSize: 13.5, flex: 1 }}
              placeholder={"Enter your Student ID here"}
              value={this.state.text_ID}
            />

            <UI.SizedBox width={45} />
          </View>
          <View
            style={{
              height: 50,
              alignSelf: "stretch",
              backgroundColor: "#262932",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <UI.SizedBox width={14} />
            <Image
              style={{ height: 22, width: 22 }}
              source={require("../img/user.png")}
            />
            <UI.SizedBox width={14} />
            <TextInput
              onChangeText={this.onName}
              placeholderTextColor={"#939393"}
              style={{ color: "white", fontSize: 13.5, flex: 1 }}
              placeholder={"Enter your Full Name"}
              value={this.state.text_fname}
            />

            <UI.SizedBox width={45} />
          </View>
          <View
            style={{
              height: 50,
              alignSelf: "stretch",
              backgroundColor: "#262932",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <UI.SizedBox width={14} />
            <Image
              style={{ height: 22, width: 22 }}
              source={require("../img/key_icon.png")}
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
              placeholder={"Password"}
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
              source={require("../img/key_icon.png")}
            />
            <UI.SizedBox width={14} />
            <TextInput
              disabled={this.state.text_password.length1 > 0 ? false : true}
              onPress={this.onPassword1}
              secureTextEntry={this.state.secureTextEntry1}
              onChangeText={(text) => {
                this.setState({
                  text_password1: text,
                });
              }}
              placeholderTextColor={"#939393"}
              style={{ color: "white", fontSize: 13.5, flex: 1 }}
              placeholder={"Confirm Password"}
              value={this.state.text_password1}
            />

            <UI.SizedBox width={45} />

            <TouchableOpacity
              disabled={this.state.text_password1.length > 0 ? false : true}
              onPress={this.onIconPress1}
              style={{
                position: "absolute",
                right: 15,
                opacity: this.state.text_password1.length > 0 ? 1 : 0,
              }}
            >
              <Image
                style={{ height: 20, width: 20 }}
                source={this.state.icon1}
              />
            </TouchableOpacity>
          </View>

          <UI.SizedBox height={45} />

          <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                this.onButton();
              }}
            >
              <Image
                style={{ height: 50, width: 50 }}
                source={require("../img/login_icon.png")}
              />
            </TouchableOpacity>
            <UI.SizedBox width={20} />
            <TouchableOpacity
              onPress={() => {
                this.onButton();
              }}
            >
              <Text style={{ fontSize: 28, color: "white" }}>Sign Up</Text>
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
              source={require("../img/pup_star_icon.png")}
            />
            <UI.SizedBox width={10} />

            <Text style={{ fontSize: 16, color: "white" }}>
              Handog ng Sintang Paaralan
            </Text>
          </View>

          <UI.SizedBox height={50} />

          <Text style={{ fontSize: 16, color: "white" }}>
            Already a member?
          </Text>

          <UI.SizedBox height={10} />
          <TouchableOpacity onPress={() => this.showAlert("Home")}>
            <Text style={{ fontSize: 18, color: "white" }}>Login</Text>
          </TouchableOpacity>
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
  },
});
