import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";

const CustomWebView = ({ html }) => {
  return (
    <WebView originWhitelist={["*"]} source={{ html: "<h1>HOLAAA</h1>" }} />
  );
};

export default CustomWebView;

const styles = StyleSheet.create({});
