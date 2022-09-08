import React, { Component } from "react";
import { render } from "react-dom";
import { Calendar } from "react-native-calendario";
import {
  ImageBackground,
  Image,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import * as UI from "../../shared/UI";

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


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "10",
    };
  }

  onSubmit=async()=>{
    var Url = "https://librarynatinglahat.000webhostapp.com/api/admin-time-out.php";
    let response = await post(Url,{});
    this.props.navigation.navigate("Home");
  }


  render(props, maxLenght) {
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
          
          <View style={styles.container}>
            <Text style={{ color: "white", fontSize: 25 }}>Administrator</Text>
          </View>
          <UI.SizedBox height={50} />
          <Calendar
            onChange={(range) => console.log(range)}
            theme={{
              activeDayColor: {},
              monthTitleTextStyle: {
                color: "#6d95da",
                fontWeight: "300",
                fontSize: 16,
              },
              emptyMonthContainerStyle: {},
              emptyMonthTextStyle: {
                fontWeight: "200",
              },
              weekColumnsContainerStyle: {},
              weekColumnStyle: {
                paddingVertical: 10,
              },
              weekColumnTextStyle: {
                color: "#b6c1cd",
                fontSize: 13,
              },
              nonTouchableDayContainerStyle: {},
              nonTouchableDayTextStyle: {},
              startDateContainerStyle: {},
              endDateContainerStyle: {},
              dayContainerStyle: {},
              dayTextStyle: {
                color: "#2d4150",
                fontWeight: "200",
                fontSize: 15,
              },
              dayOutOfRangeContainerStyle: {},
              dayOutOfRangeTextStyle: {},
              todayContainerStyle: {},
              todayTextStyle: {
                color: "#6d95da",
              },
              activeDayContainerStyle: {
                backgroundColor: "#6d95da",
              },
              activeDayTextStyle: {
                color: "white",
              },
              nonTouchableLastMonthDayTextStyle: {},
            }}
          />
          <UI.SizedBox height={50} />
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Sign Up");
              }}
            >
              <Image
                style={styles.addlogo}
                source={require("../../img/AddUser.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Add");
              }}
            >
              <Image
                style={styles.addlogo}
                source={require("../../img/2.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Scan");
              }}
            >
              <Image
                style={styles.addlogo}
                source={require("../../img/QrCode3.png")}
              />
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => {
                this.onSubmit();
              }}
            >
              <Image
                style={styles.addlogo}
                source={require("../../img/Logout.png")}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  box: {
    borderRadius: 10,
    backgroundColor: "#262932",
    alignItems: "center",
    height: 90,
    width: 90,
    flexDirection: "row",
    margin: 30,
    justifyContent: "center",
  },
  buttons: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#34495e",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    paddingLeft:10,
    paddingRight:10,
  },
  addlogo: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    width: 40,
    marginLeft: 15,
    marginRight: 15,
  },
});
