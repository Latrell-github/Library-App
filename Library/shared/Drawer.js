import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  resetAction
} from "react-native";

import * as UI from "./UI";

import { NavigationActions } from "react-navigation";

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

export default class CustomDrawerContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };
  }
  /* init = async () => {
    try {
      this.props.set_drawer_opened(()=>{
        this.set_info();
      });
      console.log();
    } catch (e) {
      console.log(e);
    }
    
  };
  componentDidMount = async () => {
    this.subscribe = this.props.navigation.addListener("focus", () => {
      this.init();
    });
  };
  componentWillUnmount = () => {
    this.subscribe();
  };  */

  componentDidMount = () => {
    this.props.set_drawer_opened(() => {
      this.set_info();
    });
  };

  set_info = async () => {
    let username = await AsyncStorage.getItem("username");
    this.setState({
      username: username,
    });
  };



  /* onSubmit=async()=>{
    var Url = "https://librarynatinglahat.000webhostapp.com/api/user-time-out.php";
    let response = await post(Url,{});
    this.props.navigation.navigate("Home");
  } */

  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{
          backgroundColor: "#DE900F",
          flex: 1,
        }}
      >
        <UI.SizedBox height={40} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Image
              style={{ marginLeft: 10, height: 70, width: 70 }}
              source={require("../img/main-user.png")}
            />
          </View>
          <UI.SizedBox width={5} />
          <Text style={{ fontSize: 20 }}>{this.state.username}</Text>
        </View>

        <UI.SizedBox height={5} />
        <View
          style={{
            alignSelf: "stretch",
            marginLeft: 10,
            marginRight: 10,
            height: 5,
            backgroundColor: "#262932",
            flexDirection: "row",
            alignItems: "center",
          }}
        ></View>
        <View
          style={{
            alignSelf: "stretch",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("Main")}
          >
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../img/home1.png")}
            />
            <Text
              style={{
                justifyContent: "center",
                color: "#262932",
                padding: 10,
                fontSize: 16,
              }}
            >
              Home
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignSelf: "stretch",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("Books")}
          >
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../img/book_icon.png")}
            />
            <Text
              style={{
                justifyContent: "center",
                color: "#262932",
                padding: 10,
                fontSize: 16,
              }}
            >
              Books
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignSelf: "stretch",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("QR Code")}
          >
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../img/QR.png")}
            />
            <Text
              style={{
                justifyContent: "center",
                color: "#262932",
                padding: 10,
                fontSize: 16,
              }}
            >
              Share QR code
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignSelf: "stretch",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("ScanBooks")}
          >
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../img/scanbook.png")}
            />
            <Text
              style={{
                justifyContent: "center",
                color: "#262932",
                padding: 10,
                fontSize: 16,
              }}
            >
              Scan Books
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignSelf: "stretch",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}

            onPress={() => navigation.navigate("Home")}
          >
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../img/Logoutt.png")}
            />
            <Text
              style={{
                justifyContent: "center",
                color: "#262932",
                padding: 10,
                fontSize: 16,
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Home: {
    color: "white",
    height: 50,
  },
  button: {
    alignItems: "center",
    alignSelf: "stretch",
    height: 60,
    width: 160,
    padding: 5,
    backgroundColor: "#323232",
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
