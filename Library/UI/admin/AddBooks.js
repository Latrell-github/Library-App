import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
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


export default function Addbooks () {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    Alert.alert("Thank You",`${data}`);
    var QrScanned = `${data}`;
    if (QrScanned.lenght == 0) {
      alert("Scan Again");
    } else {
      var InsertAPI = "https://librarynatinglahat.000webhostapp.com/api/books.php";

      var Data = {
        QrScanned: QrScanned,
      };
      let response = await post(InsertAPI, Data);
    }
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
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
    >
      <View>
        <Text
          style={{
            color: "white",
            fontSize: 25,
            marginLeft:2,
            marginBottom: 20,
  
          }}
        >
          Add Books
        </Text>
        <UI.SizedBox height={20} />
      </View>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <UI.SizedBox height={600} />
        <View style={{ padding: 20, alignSelf: "stretch" }}>
          {scanned && (
            <Button
              style={{ borderRadius: 30 }}
              title={"Scan Again"}
              onPress={() => setScanned(false)}
            />
          )}
        </View>
        <UI.SizedBox height={50} />
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
            onPress={() => navigation.navigate("AdminMain")}
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
      </View>
      <UI.SizedBox height={200} />
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 400,
    width: 400,
  },
});
