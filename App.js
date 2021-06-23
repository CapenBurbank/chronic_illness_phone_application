import React from 'react';
import {LogBox} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginPage, user_DB_class} from './main/login';
import {SignUpPage} from './main/sign-up';
import {ProfilePage} from './main/profile';
import {SettingsPage} from './main/settings_screen_components/settings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import {Symptom_Analysis} from './main/symptom_analysis';
import {styles, Style_Class, Font_Class, Icon_Class, Linear_Gradient_Class} from './main/settings_screen_components/styles'

// LogBox.ignoreAllLogs is only implemented to ignore minor messages while in early development
LogBox.ignoreAllLogs(true);

const ProfileBottomTabNavigator = createBottomTabNavigator();

/**
 * Profile is a react component that allows user to navigate using a (tab navigator), currently used to render the Home screen and Settings screen, and to navigate between the two
 */

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.force = this.force.bind(this);
    }

    force = () => {
        this.forceUpdate()
    }

    render() {
        return (
            
            
            <ProfileBottomTabNavigator.Navigator 
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        if (route.name == "Home") {
                            
                            return <Ionicons name="home" size={25} color={Icon_Class.iconColor} />
                        }
                        else if (route.name == "Settings") {
                            
                            return <Ionicons name="settings" size={25} color={Icon_Class.iconColor} />
                        }
                        else if (route.name == 'Analyze') {
                            
                            return <Ionicons name="stats-chart" size={25} color={Icon_Class.iconColor} />
                        }
                    }
                    
                })
                }
                tabBarOptions = {{
                    inactiveBackgroundColor: Icon_Class.tabBackgroundColor,
                    activeBackgroundColor: Icon_Class.tabBackgroundColor,
                    activeTintColor: Icon_Class.iconTextColor,
                    inactiveTintColor: Icon_Class.inactiveTabText,
                }}
                initialRouteName="Home" 
                
                >
                <ProfileBottomTabNavigator.Screen
                    name="Home" 
                    component={ProfilePage}
                    
                />
                <ProfileBottomTabNavigator.Screen 
                    name="Analyze"
                    component={Symptom_Analysis}
                />
                <ProfileBottomTabNavigator.Screen
                    name="Settings" 
                    
                    children={()=>{
                        return(
                        <SettingsPage reRenderTabStyle={this.force} />
                        )
                    }}
                />
                    
            </ProfileBottomTabNavigator.Navigator>
            
        )
    }
}

const Stack = createStackNavigator();

/**
 * authentication is required to switch from initial navigation to profile navigation
 * 
 * @returns navigation container with a stack of react components/screens 
 */

export default function app() {
        return ( 
            <NavigationContainer >
                <Stack.Navigator >
                    <Stack.Screen name='Login' component={LoginPage} options={{headerMode: 'none', headerShown : false}}/>
                    <Stack.Screen name='SignUp' component={SignUpPage} options={{headerMode: 'none', headerShown : false}}/>
                    <Stack.Screen name='Profile' component={Profile} options={{headerMode: 'none', headerShown : false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    
}
export {Profile}