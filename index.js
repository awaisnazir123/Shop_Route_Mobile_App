/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';

import {name as appName} from './app.json';
console.log("Registered App Name: ", appName);
AppRegistry.registerComponent('main', () => App);
