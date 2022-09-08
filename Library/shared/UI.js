import React from "react";
import { View } from "react-native";

export function SizedBox(props = { height: 1, width: 1 }) {
  return <View style={{ height: props.height, width: props.width }}></View>;
}
