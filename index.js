import "react-native-gesture-handler";
import "@react-native-firebase/app";
import firebase from "@react-native-firebase/firestore";

import { registerRootComponent } from "expo";

import App from "./App";

if (__DEV__) {
  firebase().useEmulator("192.168.1.8", 8080);
}

const db = firebase();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
