import "react-native-gesture-handler";
import React, { Component } from "react";
import Home from "./screens/home";
import Register from "./screens/Register";
import Login from "./screens/Login";
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from "@react-navigation/stack";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import Main from "./UI/student/main";
import QRCode from "./UI/student/qrcode";
import DrawerContent from "./shared/Drawer";
import Manage from "./UI/student/managebooks";
import Adminlogin from "./UI/admin/adminlogin";
import ScanStudents from "./UI/admin/scanstudent";
import AdminMain from "./UI/admin/adminmain";
import ScanBooks from "./UI/admin/scanbooks";
import AddBooks from "./UI/admin/AddBooks";
import Test from "./UI/admin/test";
import Timeout from "./UI/admin/student-timeout";

import { Easing } from "react-native";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          /* gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator:
            CardStyleInterpolators.forNoAnimation, */
          transitionSpec: {
            open: TransitionSpecs.RevealFromBottomAndroidSpec,
            close: TransitionSpecs.FadeOutToBottomAndroidSpec,
          },
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      >
        <Stack.Screen
          options={{
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
              transitionSpec: {
                open: TransitionSpecs.RevealFromBottomAndroidSpec,
                close: TransitionSpecs.FadeOutToBottomAndroidSpec,
              },
          }}
          name="AppDrawer"
          component={AppDrawer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

class AppDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
    };
  }

  load_component = (props, Element) => {
    let navigate = (name) => {
      props.navigation.navigate(name);
    };
    let openDrawer = () => {
      this.drawer_opened();
      props.navigation.openDrawer();
    };
    let new_navigation = {
      navigate: navigate,
      openDrawer: openDrawer,
      addEventListener: props.navigation.addEventListener,
      isDrawerOpen: this.state.isDrawerOpen,
    };
    return <Element navigation={new_navigation} />;
  };

  c_load = (name, C) => {
    return (
      <Drawer.Screen
        options={{
          headerShown: false,
          swipeEnabled: false,
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
            transitionSpec: {
              open: TransitionSpecs.RevealFromBottomAndroidSpec,
              close: TransitionSpecs.FadeOutToBottomAndroidSpec,
            },
        }}
        name={name}
      >
        {(props) => this.load_component(props, C)}
      </Drawer.Screen>
    );
  };

  drawer_opened = () => {};

  render() {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
            transitionSpec: {
              open: TransitionSpecs.RevealFromBottomAndroidSpec,
              close: TransitionSpecs.FadeOutToBottomAndroidSpec,
            },
        
        }}
        drawerContent={(props) => {
          let navigate = (name) => {
            props.navigation.navigate(name);
          };
          let openDrawer = () => {
            this.drawer_opened();
            props.navigation.openDrawer();
          };
          let new_navigation = {
            navigate: navigate,
            openDrawer: openDrawer,
            addEventListener: props.navigation.addEventListener,
          };

          return (
            <DrawerContent
              set_drawer_opened={(method) => {
                this.drawer_opened = method;
              }}
              navigation={new_navigation}
            />
          );
        }}
      >
        {this.c_load("Home", Home)}
        {this.c_load("Admin", Adminlogin)}
        {this.c_load("Scan", ScanStudents)}
        {this.c_load("AdminMain", AdminMain)}
        {this.c_load("ScanBooks", ScanBooks)}
        {this.c_load("Add", AddBooks)}
        {this.c_load("Student", Login)}
        {this.c_load("Sign Up", Register)}
        {this.c_load("QR Code", QRCode)}
        {this.c_load("Main", Main)}
        {this.c_load("Books", Manage)}
        {this.c_load("test", Test)}
        {this.c_load("timeout", Timeout)}
      </Drawer.Navigator>
    );
  }
}
const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const closeConfig = {
  animation: "timing",
  config: {
    duration: 500,
    easing: Easing.linear,
  },
};

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
