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
  ScrollView,
  Text,
  RefreshControl,
  ActivityIndicator,
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

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "10",
      icon: "true",
      books: [],
      BooksFiltered: [],
      /* refreshing: true, */
    };

    /* this.GetData(); */
  }


  /* GetData = () => {
    //Service to get the data from the server to render
    return fetch("https://librarynatinglahat.000webhostapp.com/api/display.php")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          refreshing: false,
          //Setting the data source for the list to render
          dataSource: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  ListViewItemSeparator = () => {
    return (
      //returning the listview item saparator view
      <View
        style={{
          height: 0.2,
          width: "90%",
          backgroundColor: "#808080",
        }}
      />
    );
  };

  onRefresh = () => {
    //Clear old data of the list
    this.setState({ dataSource: ["https://librarynatinglahat.000webhostapp.com/api/display.php"] });
    //Call the Service to get the latest data
    this.GetData();
  };
 */

  onIconPress = () => {
    let new_icon = !this.state.icon
      ? require("../../img/bookmarked.png")
      : require("../../img/bookmark.png");
    this.setState({
      icon: new_icon,
    });
  };

  search_function = (text) => {
    if (this.state.BooksFiltered != null) {
      if (text.length > 0) {
        let new_codes = [];
        let index = 0;
        this.state.BooksFiltered.map((item) => {
          index++;
          if (item.ID) {
            if (isNaN(text)) {
              if (item.BookName.toLowerCase().includes(text.toLowerCase())) {
                new_codes.push(item);
              }
            } else {
            }
          }
          if (index == this.state.BooksFiltered.length) {
            this.setState({
              books: new_codes,
            });
          }
        });
      } else {
        this.setState({
          books: this.state.BooksFiltered,
        });
      }
    } else {
    }
  };

  componentDidMount = async () => {
    var GetAPI = "https://librarynatinglahat.000webhostapp.com/api/display.php";
    let response = await get(GetAPI, {});
    let output = JSON.parse(response);
    this.setState({ books: output, BooksFiltered: output });
  };

  render(props, maxLenght) {
    let books = this.state.books.map((item) => {
      return <Item key={Math.random()} item={item} />;
    });

    /* if (this.state.refreshing) {
      return (
        //loading view while data is loading
        <View style={{ flex: 1, backgroundColor: "#C2185B", paddingTop: 20 }}>
          <Text> Loading!</Text>
          <ActivityIndicator />
        </View>
      );
    } */

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
          <UI.SizedBox height={20} />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          >
            <Image
              style={{ height: 50, width: 50, marginLeft: 10 }}
              source={require("../../img/user2.png")}
            />
          </TouchableOpacity>
          <UI.SizedBox height={10} />
          <View
            style={{
              height: 50,
              alignSelf: "stretch",
              backgroundColor: "#828386",
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <Image
              style={{ height: 25, width: 25, marginLeft: 15 }}
              source={require("../../img/search.png")}
            />

            <TextInput
              placeholderTextColor={"#939393"}
              style={{
                color: "white",
                fontSize: 14,
                paddingLeft: 10,
                flex: 1,
                paddingRight: 20,
              }}
              placeholder={"Search"}
              placeholderTextColor={"black"}
              onChangeText={(text) => {
                this.search_function(text);
              }}
            />
          </View>
          <UI.SizedBox height={10} />
          <View
            style={[
              styles.container,
              { height: Dimensions.get("window").height - 140 },
            ]}
          >
            <ScrollView
            /* refreshControl={
                <RefreshControl
                  //refresh control used for the Pull to Refresh
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh.bind(this)}
                />
              } */
            >
              {books}
            </ScrollView>

          </View>
          <UI.SizedBox height={33} />
          
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
  },
  container: {
    flex: 1,
  },
});

const Item = (props) => {
  let item = props.item;
  let BookName = item.BookName;
  return (
    <View style={styles.books}>
      <Image
              style={{ height: 25, width: 25, marginRight:5}}
              source={require("../../img/book_icon.png")}
            />
      <Text>{BookName}</Text>
    </View>
  );
};
