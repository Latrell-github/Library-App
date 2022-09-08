import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ImageBackground,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as UI from "../../shared/UI";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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


export default class ScanBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanned: false,
      HasPermission: null,
      username: "",
      Books: [],
    };
  }
  componentDidMount = async () => {
    this.setState({ username: await AsyncStorage.getItem("username") });
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({ HasPermission: status === "granted" });

    /* this.setState({Books: JSON.parse(data)}) */
    /* this.state.Books.ID */
    /* this.state.Books.BookName */
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({ scanned: true, Books: JSON.parse(data) });
    var InsertAPI = "http://192.168.1.2/api/statusbook.php";
    let DATA = {
      username: this.state.username,
      BookName: this.state.Books.BookName,
      
    };
    console.log("username"+this.state.username)
    console.log("BookName"+this.state.Books.BookName)
    if(this.state.Books.BookName==undefined){
      alert("Undefined QR Code Scan Again")
    }else{
      let response = await get(InsertAPI, DATA);
    }
    
  };

  render() {
    if (this.state.HasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (this.state.HasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <ImageBackground
      source={require("../../img/login_bg.png")}
      style={{
        backgroundColor: "#FFF",
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: "center",
      }}
    ><UI.SizedBox height={50} />
      <View>
        <Text
          style={{
            color: "white",
            fontSize: 25,
            marginLeft:2,
  
          }}
        >
          Borrow Books
        </Text>
      </View>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={
            this.state.scanned ? false : this.handleBarCodeScanned
          }
          style={styles.barCode}
        ></BarCodeScanner>

        {this.state.scanned && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({ scanned: false });
            }}
          >
            <Text style={styles.scanAgain}>Scan again</Text>
          </TouchableOpacity>
        )}
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
            onPress={() => this.props.navigation.navigate("AdminMain")}
          >
            <Image
              style={{ height: 50, width: 50 }}
              source={require("../../img/Back.png")}
            />
            <Text style={{ color: "white", justifyContent: "center" }}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
        <UI.SizedBox height={50} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  name: {},
  itemContainer: {
    height: 60,
    width: windowWidth / 1.5,
    backgroundColor: "#189AB4",
    marginBottom: 5,
    borderRadius: 10,
  },
  button: {
    position: "absolute",
    bottom: 50,
    height: 40,
    width: 300,
    backgroundColor: "lightblue",
    borderRadius: 10,
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center"
    
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent:"center"
  },
  barCode: {
    height: 500,
    width: 80000,
  },
  header: {
    height: 55,
    alignSelf: "stretch",
    backgroundColor: "#05445E",
  },
  scanAgain:{
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center"
  }
});
