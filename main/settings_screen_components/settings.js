import React, {Alert} from 'react';
import {styles, buttonColor, Style_Class, Linear_Gradient_Class, Icon_Class} from '../styles';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {} from '../styles';
import {
    View,
    Button,
    Text,
    TextInput, 
    Modal,
    Pressable,
    FlexContainer,
    ScrollView,
    Dimensions
} from 'react-native';

export default class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            darkMode: Style_Class.darkMode,
            lightMode: Style_Class.lightMode
        }
    }

    /**
     * 
     * when invoked, displays sets of 2 touchable icons, currently only implemented with display functionality, and nothing else. Function parameters will be used in future to have unique modals in access for each specific setting
     * 
     * 
     * -Similar implementations can be seen in profile/symptom_logger functionality 
     * 
     * @param {string} SETTING_TITLE_LEFT 
     * @param {string} ICON_LEFT 
     * @param {string} SETTING_TITLE_RIGHT 
     * @param {string} ICON_RIGHT 
     * @param {function} ON_PRESS_CALLBACK_FUNCTION_LEFT 
     * @param {function} ON_PRESS_CALLBACK_FUNCTION_RIGHT 
     * @returns react native view displaying touchable Icons 
     */

    SettingChoice(SETTING_TITLE_LEFT, ICON_LEFT, ON_PRESS_CALLBACK_FUNCTION_LEFT, SETTING_TITLE_RIGHT, ICON_RIGHT, ON_PRESS_CALLBACK_FUNCTION_RIGHT) {
        return (
            <Text
                style={{
                    alignSelf: 'center'
                }}>
                <View
                    style={{
                        padding: 5,
                        flexDirection: 'row',
                        alignSelf: 'center'
                    }}>
                    <Pressable
                        style={(({pressed})=> [
                            {
                                opacity: pressed ? 0.3 : 1,
                            },
                            {
                                backgroundColor: Icon_Class.currentBackgroundColorForIcon,
                                borderRadius: 15,
                                padding: 15,
                            }
                        ])}
                        onPress={()=> {
                           ON_PRESS_CALLBACK_FUNCTION_LEFT()
                        }}>
                        <Ionicons name={ICON_LEFT} size={100} color={Icon_Class.iconColor} />
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: Icon_Class.iconTextColor,
                            }}>
                                {SETTING_TITLE_LEFT}
                        </Text>
                    </Pressable>
                </View>
            
                
                <View
                    style={{
                        padding: 5,
                        flexDirection: 'row',
                        alignSelf: 'center',
                        
                    }}>
                    <Pressable
                        style={(({pressed})=> [
                            {
                                opacity: pressed ? 0.3 : 1
                            },
                            {
                                backgroundColor: Icon_Class.currentBackgroundColorForIcon,
                                borderRadius: 15,
                                padding: 15
                            }
                        ])}
                        onPress={()=> {
                            ON_PRESS_CALLBACK_FUNCTION_RIGHT()
                        }}>
                
                        <Ionicons name={ICON_RIGHT} size={100} color={Icon_Class.iconColor} />
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: Icon_Class.iconTextColor
                            }}>
                                {SETTING_TITLE_RIGHT}
                        </Text>
                    </Pressable>
                </View>
            </Text>
        )
    }

    toggleLightMode() {

        if (!this.state.lightMode || this.state.darkMode) {
            Style_Class.enableLightmode(true)
                .then(()=> {
                    Linear_Gradient_Class.adjust_Linear_Gradient(Linear_Gradient_Class.lightModeColorScheme, Linear_Gradient_Class.lightModeColorScheme);
                    Icon_Class.change_iconColor(Icon_Class.lightModeColorScheme)
                    this.setState({
                        darkMode: Style_Class.darkMode ,
                        lightMode: Style_Class.lightMode 
                    })
                    
                })
                .catch(()=> {

                })
            
        }
        else if (this.state.lightMode || !this.state.darkMode) {
            Style_Class.enableLightmode(false)
                .then(()=> {
                    Linear_Gradient_Class.adjust_Linear_Gradient(Linear_Gradient_Class.standard_color_1, Linear_Gradient_Class.standard_color_2);
                    Icon_Class.change_iconColor(Icon_Class.iconStandardColor)
                    this.setState({
                        darkMode: Style_Class.darkMode ,
                        lightMode: Style_Class.lightMode 
                    })
                    
                })
                .catch(()=> {

                })
        }
    }

    toggleDarkMode() {

            if (!this.state.darkMode || this.state.lightMode) {
                Style_Class.enable_Dark_Mode(true)
                    .then(()=> {
                        Linear_Gradient_Class.adjust_Linear_Gradient(Linear_Gradient_Class.darkModeColorScheme, Linear_Gradient_Class.darkModeColorScheme);
                        Icon_Class.change_iconColor(Icon_Class.darkModeColorScheme)
                        this.setState({
                            darkMode: Style_Class.darkMode ,
                            lightMode: Style_Class.lightMode
                        })
                        
                    })
                    .catch(()=> {

                    })
                
            }
            else if (this.state.darkMode || !this.state.lightMode) {
                Style_Class.enable_Dark_Mode(false)
                    .then(()=> {
                        Linear_Gradient_Class.adjust_Linear_Gradient(Linear_Gradient_Class.standard_color_1, Linear_Gradient_Class.standard_color_2);
                        Icon_Class.change_iconColor(Icon_Class.iconStandardColor)
                        this.setState({
                            darkMode: Style_Class.darkMode,
                            lightMode: Style_Class.lightMode
                        })
                        
                    })
                    .catch(()=> {

                    })
            }
        
                
    }

    render() {
        return (
            <View
                style={styles.container}
                >
                <LinearGradient
                        colors={[Linear_Gradient_Class.main_color_1, Linear_Gradient_Class.main_color_2]}
                        style={styles.background}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}>
                    
                    
                    <View style={styles.container}>
                        <Text style={[styles.settingsTitle,
                            {
                                color: Icon_Class.iconTextColor
                            }
                            ]}>
                            Settings
                        </Text> 
                    </View>

                    <View
                        style={{
                            flex: 4,
                        }}
                        >
                        <ScrollView
                            scrollEnabled={true}
                            overScrollMode='always'
                            style={{
                            
                            }}
                            >
                            <View
                                style={{
                                    flexDirection: 'column',  
                                    justifyContent: 'center'
                                }}>
                                {this.SettingChoice("Appearance", "brush-outline",()=>{}, "Accessibility", "body-outline",()=>{})}
                                {this.SettingChoice("Notifications", "notifications-outline",()=>{} , "Account", "person-circle-outline",()=>{})}
                                {this.SettingChoice("About Us", "information-circle-outline",()=>{}, "Tutorials", "md-book-outline",()=>{})}
                                <Text
                                    style={{
                                        alignSelf: 'center'
                                    }}>
                                    <View
                                        style={{
                                            padding: 5,
                                            flexDirection: 'row',
                                            alignSelf: 'center'
                                        }}>
                                        <Pressable
                                            style={(({pressed})=> [
                                                {
                                                    opacity: pressed ? 0.3 : 1,
                                                },
                                                {
                                                    backgroundColor: Icon_Class.currentBackgroundColorForIcon,
                                                    borderRadius: 15,
                                                    padding: 15,
                                                }
                                            ])}
                                            onPress={()=> {
                                                this.toggleDarkMode();
                                                console.log(`DarkMode: ${Style_Class.darkMode}, LightMode: ${Style_Class.lightMode}`);
                                            }}>
                                            <Ionicons name='moon' size={100} color={Icon_Class.iconColor} />
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    color: Icon_Class.iconTextColor,
                                                }}>
                                                    Dark Mode
                                            </Text>
                                        </Pressable>
                                    </View>
                                
                                    
                                    <View
                                        style={{
                                            padding: 5,
                                            flexDirection: 'row',
                                            alignSelf: 'center',
                                            
                                        }}>
                                        <Pressable
                                            style={(({pressed})=> [
                                                {
                                                    opacity: pressed ? 0.3 : 1
                                                },
                                                {
                                                    backgroundColor: Icon_Class.currentBackgroundColorForIcon,
                                                    borderRadius: 15,
                                                    padding: 15
                                                }
                                            ])}
                                            onPress={()=> {
                                                this.toggleLightMode();
                                                console.log(`DarkMode: ${Style_Class.darkMode}, LightMode: ${Style_Class.lightMode}`);
                                            }}>
                                    
                                            <Ionicons name='sunny-outline' size={100} color={Icon_Class.iconColor} />
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    color: Icon_Class.iconTextColor
                                                }}>
                                                    Light Mode
                                            </Text>
                                        </Pressable>
                                    </View>
                                </Text>

                            </View>  
                        </ScrollView>                      
                    </View>

                    <View
                        style={{
                            marginTop:100
                        }}
                    >

                    </View>
                </LinearGradient>
            </View>
        )
    }
}

export {SettingsPage};