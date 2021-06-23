import React from 'react';
import {styles, buttonColor} from './settings_screen_components/styles';
import {user_DB_class} from './login';
import {Symptom_Analysis} from './symptom_analysis';
import {LinearGradient} from 'expo-linear-gradient';
import {Symptom_Logger} from './symptom_logger';
import {Ionicons} from '@expo/vector-icons';
import {
    View,
    Text,
    Pressable,
} from 'react-native';

/**
 * currently no implementation for (Journal & Community) icons functionality 
 */

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSymptomLoggerModal: false
        };
        this.openSymptomLoggerModal= this.openSymptomLoggerModal.bind(this);
        this.hideSymptomLoggerModal= this.hideSymptomLoggerModal.bind(this);
        this.returnState = this.returnState.bind(this);
        this.updateAll = this.updateAll.bind(this);
        this.updateCustomLoggedSymptoms = this.updateCustomLoggedSymptoms.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Home',
    });

    updateAll() {
        this.forceUpdate()
    }

    updateCustomLoggedSymptoms() {
        return user_DB_class.symptom_array;
        
    }

    /**
     * when invoked, will clear user_DB_class information, and navigate back to login screen/ sign up screen
     */

    logout() {
        user_DB_class.clear_info();
        this.props.navigation.navigate('Login');
    }

    navigateToSymptomAnalysis() {
        this.props.navigation.navigate('Analyze');
    }

    /**
     *implemented for Symptom_Logger custom componenet to inherit boolean props on profile page
     * 
     * @returns a boolean from state.showSymptomLoggerModal
     */

    returnState() {
        return this.state.showSymptomLoggerModal;
    }

    openSymptomLoggerModal() {
        this.setState({
            showSymptomLoggerModal: true
        })
    }

    hideSymptomLoggerModal() {
        this.setState({
            showSymptomLoggerModal: false 
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                        colors={['cadetblue', 'white']}
                        style={styles.background}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                        }}
                        >
                        <Pressable
                            style={({pressed})=> [
                            {
                                opacity: pressed ? 0.3 : 1
                            },
                            {
                                marginTop: 13,
                                marginRight: 10,
                                marginBottom: -60
                            }

                            ]}
                            onPress={()=> {
                                this.logout();
                            }}
                            >
                            <Ionicons name="log-out" size={50} color='teal'/>
                        </Pressable>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 50,
                            padding: 0,
                        }}>
                        <Ionicons name='person-circle-outline' size={200} color='teal' />
                            
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',

                        }}
                        >
                        <Text
                            style={{
                                color: 'white',
                                marginBottom: 15,
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}
                            >
                            Welcome back {user_DB_class.username}!
                        </Text>

                    </View>

                    <View
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
    
                        }}>
                    
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
                                        user_DB_class.get_Symptom_List()
                                            .then(()=> {
                                                this.openSymptomLoggerModal();
                                                this.updateAll();
                                            })
                                            .catch(()=> {

                                            })
                                            
                                    }}>
                                
                                    <Ionicons name='add-circle' size={100} color='teal' />
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            color: 'darkcyan'
                                        }}>
                                    
                                        Log Symptom
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
                                        this.navigateToSymptomAnalysis();
                                    }}>
                            
                                    <Ionicons name='stats-chart' size={100} color='teal' />
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            color: 'darkcyan'
                                        }}>
                                    
                                        Analyze
                                    </Text>

                                </Pressable>
                            </View>
                        </Text>

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

                                    }}>
                                
                                    <Ionicons name='book' size={100} color='teal' />
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            color: 'darkcyan'
                                        }}>
                                    
                                        Journal
                                    </Text>

                                </Pressable>
                            </View>
                    
                                        
                            <View
                                style={{
                                    padding: 5,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
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

                                    }}>
                            
                                    <Ionicons name='earth' size={100} color='teal' />
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            color: 'darkcyan'
                                        }}>
                                    
                                        Community
                                    </Text>
                                </Pressable>
                            </View>
                        </Text>
                    </View>
                    {
                        this.state.showSymptomLoggerModal &&
                        <Symptom_Logger updateCustomLoggedSymptoms={this.updateCustomLoggedSymptoms} hideSymptomLoggerModal={this.hideSymptomLoggerModal} openSymptomLoggerModal={this.openSymptomLoggerModal} returnState={this.returnState} forceAnUpdate={this.updateAll} />
                    }
                
                </LinearGradient>  
            </View>
        )
    }
}

export {ProfilePage};