import {Dimensions} from 'react-native';
import { Styles_Object_Database, Linear_Gradient, Icons } from './style_data/styles_object_database';
const RN = require('react-native');

const Style_Class = new Styles_Object_Database;
const Linear_Gradient_Class = new Linear_Gradient;
const Icon_Class = new Icons;

Linear_Gradient_Class.enable_Dark_Mode(true)
  .then(()=> {

  })

/**
 * main implementation of standard styles for frequently used elements throughout app 
 */
  
const styles = RN.StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      flexDirection: 'column',
    },
    background: {
      position: 'absolute',
      right:0,
      left:0,
      top:0,
      height: Dimensions.get('screen').height,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 10,
    },
  
    buttonDesign: {
      width: Dimensions.get('screen').width - 40,
      alignSelf: 'center',
      borderRadius: 30,
      borderWidth: 0,      
      textAlign: 'left',
      overflow: 'hidden',
      shadowColor: 'grey',
      marginTop: 10,
      marginBottom: 10,
    },
  
    input: {
      height: 40,
      width: 300,
      backgroundColor: '#ffffff',
      borderColor: '#000000',
      borderWidth: 1,
      alignSelf: 'center',
      borderRadius: 10,
      textAlign: 'center',
    },
    h1: {
      color: 'cyan',
      paddingTop: 50,
      paddingBottom: 25,
      fontSize: 50,
      textAlign: 'center',
      textShadowColor: '#000000',
      fontFamily: 'sans-serif-thin',
      fontStyle: 'italic'
    },
    h2: {
      color: '#787c82',
      fontSize: 25,
      textAlign: 'center',
      textShadowColor: '#000000',
    },
    signUpButton: {
      paddingTop: 20,
      paddingBottom: 20,
      width: 150,
      alignSelf: 'center',
    },
    InputPadding: {
      paddingBottom: 5,
    },
    spinner: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      color: 'black',
      opacity: 0.5,
      
    },
    available: {
      color: "green"
    },
    unavailable: {
      color: "red"
    },
    list: {
      textAlign: 'left',
      borderColor: 'lightgray',
      borderWidth: 0.5,
      paddingLeft: 40,
      padding: 9,
      fontSize: 16,
    },
    column: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'space-between',
      bottom:-20,
      
    },
    settingsList: {
      borderColor: 'black',
      borderWidth: 1.5,
      paddingLeft: 15,
    },
    settingsTitle: {
      color: Icon_Class.iconTextColor,
      fontSize: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: -50,
      marginTop: 50
    },
    alignListStart: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
    },
    alignListEnd: {
      flexDirection: 'row-reverse',
      alignSelf: 'flex-start',
      textAlign: 'right'
    },
    modalSymptomTracker_container: {
      paddingBottom: 20,
      paddingTop: 0,
      margin: 0,
      flexDirection: 'row',
      justifyContent: 'center',
     
    },
    modalSymptomTracker_textInput: {
      width: Dimensions.get('screen').width/2,
      fontSize: 18,
      height: 28,
      backgroundColor: '#ffffff',
      borderColor: '#000000',
      borderWidth: 1,
      borderRadius: 10,
      textAlign: 'center',
    },
    modalSymptomTracker_textLabel: {
      fontSize: 18,
      padding: 3,
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
    },
    
  });

  const buttonColor = 'teal';

  export {styles, buttonColor, Style_Class, Linear_Gradient_Class, Icon_Class}