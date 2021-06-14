import React, {Alert} from 'react';
import {styles, buttonColor} from './styles';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
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

    SettingChoice(SETTING_TITLE_LEFT, ICON_LEFT, SETTING_TITLE_RIGHT, ICON_RIGHT,ON_PRESS_CALLBACK_FUNCTION_LEFT, ON_PRESS_CALLBACK_FUNCTION_RIGHT) {
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
                                backgroundColor: 'rgba(255,255,255, 0.19)',
                                borderRadius: 15,
                                padding: 15,
                            }
                        ])}
                        onPress={()=> {
                           // ON_PRESS_CALLBACK_FUNCTION_LEFT()
                        }}>
                        <Ionicons name={ICON_LEFT} size={100} color='teal' />
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: 'darkcyan'
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
                                backgroundColor: 'rgba(255,255,255, 0.19)',
                                borderRadius: 15,
                                padding: 15
                            }
                        ])}
                        onPress={()=> {
                           // ON_PRESS_CALLBACK_FUNCTION_RIGHT()
                        }}>
                
                        <Ionicons name={ICON_RIGHT} size={100} color='teal' />
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: 'darkcyan'
                            }}>
                                {SETTING_TITLE_RIGHT}
                        </Text>
                    </Pressable>
                </View>
            </Text>
        )
    }

    render() {
        return (
            <View
                style={styles.container}
                >
                <LinearGradient
                        colors={['cadetblue', 'white']}
                        style={styles.background}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}>
                    
                    
                    <View style={styles.container}>
                        <Text style={styles.settingsTitle}>
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
                                {this.SettingChoice("Appearance", "brush-outline", "Accessibility", "body-outline")}
                                {this.SettingChoice("Notifications", "notifications-outline","Account", "person-circle-outline")}
                                {this.SettingChoice("About Us", "information-circle-outline", "Tutorials", "md-book-outline")}
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