import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Button,
  TouchableHighlight,
  AsyncStorage,
} from "react-native";
import * as UI from "../shared/UI";
/* import { useNavigation } from '@react-navigation/native'; */

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

 /*  init = async () => {
    try {

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
  }; */

  render(props) {
    const { navigation } = this.props;
    return (
      <ImageBackground
        source={require("../img/login_bg.png")}
        style={{
          backgroundColor: "#fff",
          flex: 1,
          paddingLeft: 20,
          paddingRight: 20,
          justifyContent: "center",
        }}
      >
        <Image
          style={{ height: 150, width: 150, alignSelf: "center" }}
          source={require("../img/book.png")}
        />
        <UI.SizedBox height={20} />
        <View
          style={{
            height: 240,
            alignSelf: "stretch",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UI.SizedBox height={20} />
          <Text style={styles.Text1}>Administrator</Text>
          <UI.SizedBox height={10} />
          <TouchableHighlight>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Admin")}
              >
                <Image
                  style={{ height: 50, width: 50 }}
                  source={require("../img/admin.png")}
                />
              </TouchableOpacity>
            </View>
          </TouchableHighlight>
          <UI.SizedBox height={20} />
          <Text style={styles.Text1}>Student</Text>
          <UI.SizedBox height={10} />
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Student");
              }}
            >
              <Image
                style={{ height: 50, width: 50, alignSelf: "center" }}
                source={require("../img/user.png")}
              />
            </TouchableOpacity>
          </View>
          <UI.SizedBox height={30} />
        </View>
        <UI.SizedBox height={75} />
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
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  Text1: {
    fontSize: 20,
    color: "white",
  },
  Text2: {
    fontSize: 20,
    color: "white",
    height: 230,
  },
  button: {
    alignItems: "center",
    alignSelf: "stretch",
    height: 60,
    width: 360,
    padding: 5,
    backgroundColor: "#323232",
    borderRadius: 10,
  },
});
