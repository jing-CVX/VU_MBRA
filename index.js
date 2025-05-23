/**
 * @format
 */
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './src/App';
import {name as appName} from './app.json';

import {LogBox} from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);
// Ignore all log notifications:
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
LogBox.ignoreAllLogs();

if (__DEV__) {
} else {
  // console.log = () => {};
  // console.time = () => {};
  // console.timeLog = () => {};
  // console.timeEnd = () => {};
  // console.warn = () => {};
  // console.count = () => {};
  // console.countReset = () => {};
  // console.error = () => {};
  // console.info = () => {};
}

AppRegistry.registerComponent(appName, () => App);

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
