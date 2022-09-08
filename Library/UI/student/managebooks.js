import React, { Component } from "react";
import { render } from "react-dom";
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
  ScrollView,
  AsyncStorage,
} from "react-native";
import * as UI from "../../shared/UI";

function get(url, parameters) {
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

    xhttp.open("GET", url + "?" + queryString, true);
    xhttp.send();
  });
}

export default class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "10",
      books: [],
      Student_ID: "",
    };
  }

  componentDidMount = async () => {
    this.setState({ Student_ID: await AsyncStorage.getItem("username") });
    var GetAPI =
      "https://librarynatinglahat.000webhostapp.com/api/displaystatus.php";
    let data = {
      StudentID: this.state.Student_ID,
    };

    let response = await get(GetAPI, data);
    let output = JSON.parse(response);
    this.setState({ books: output });
    console.log(this.state.books);
  };

  render(props, maxLenght) {
    let books = this.state.books.map((item) => {
      return <Item key={Math.random()} item={item} />;
    });
    const { navigation } = this.props;
    return (
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
          width: Dimensions.get("screen").width,
          justifyContent: "center",
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        <ImageBackground
          source={require("../../img/login_bg.png")}
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <UI.SizedBox height={50} />
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
          <View>
            <Text style={{color:"white", fontSize:30, marginLeft:15}}>Your Books</Text>
          </View>
          <View
            style={[
              styles.container,
              { height: Dimensions.get("window").height - 50 },
            ]}
          >
            <ScrollView>{books}</ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  search: {
    height: 22,
    width: 22,
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  books: {
    height: 50,
    flexDirection: "row",
    margin: 10,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  container: {
    flex: 1,
  },
});
const Item = (props) => {
  let item = props.item;
  let BookName = item.BookName;
  let status = item.Status;
  return (
    <View style={styles.books}>
      <Text>{BookName}</Text>
      <View style={{ flex: 1 }}></View>
      <Text>{status}</Text>
    </View>
  );
};
