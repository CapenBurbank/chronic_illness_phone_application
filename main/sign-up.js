import React from 'react';
import {styles, buttonColor} from './settings_screen_components/styles';
import {user_DB_class} from './login';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {
    View,
    Button,
    Text,
    TextInput,
    Alert,
    Pressable
} from 'react-native';

export default class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userVal: "USERNAME",
            passVal: "PASSWORD",
            username_available: user_DB_class.usernameAvailable,
            editingUsername: false,
            editingPassword: false,
            passBool: false,
        }
    }

    checkPassValid() {
        if (this.state.passVal.length < 6 || this.state.passVal.length > 10) {
            this.setState({
                passBool: false
            })
        } 
        else {
            this.setState({
                passBool: true
            })
        }
    }

    clearInputs = () => {
        this.setState({
            userVal: 'USERNAME',
            passVal: 'PASSWORD'
        })
    }

    update() {
        this.setState({
            username_available: user_DB_class.usernameAvailable
        })
    }

    navigateLoginFast() {
        this.props.navigation.navigate('Login')
    }

    navigateLogin() {
        
        setTimeout(() => {
            this.props.navigation.navigate('Login')
            user_DB_class.clear_info();
        }, 1000)
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

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            marginTop: 20,
                            marginLeft: 20
                        }}
                        >
                        <Pressable
                            style={({pressed})=> [
                                {
                                    opacity: pressed ? 0.3 : 1
                                }
                            ]}
                            onPress={()=> {
                                this.navigateLoginFast();
                            }}
                            >
                            <Ionicons name='arrow-back' size={40} color='teal' />
                        </Pressable>
                    </View>
                        
                    <View style={{marginTop: 15}} ></View>


                    <TextInput 
                        onChangeText={(text)=> {
                            user_DB_class.username = text;
                            this.setState({
                                userVal: text,
                                
                            });
                            //realtimecheck will need to run forceupdate    
                        }} 
                        onFocus={()=>{
                            this.setState({
                                userVal: "",
                                editingPassword: false,
                                editingUsername: true
                            })
                        }}
                        onBlur={()=>{
                            this.setState({
                                editingPassword: false,
                                editingUsername: false
                            })
                        }}
                        style={styles.input} 
                        onKeyPress={()=>{
                            user_DB_class.real_Time_check();
                            setTimeout(()=>{
                                this.update();
                            },500);
                        }}
                        value={this.state.userVal}
                        />

                    {this.state.editingUsername && 
                        <View>
                            <Text style={styles.paragraph}>
                                
                                Username: 
                                {this.state.username_available && 
                                    <Text style={styles.available}>
                                        Available
                                    </Text>
                                }
                                {!this.state.username_available &&
                                    <Text style={styles.unavailable}>
                                        Unavailable
                                    </Text>
                                }
                                
                            </Text>
                        </View>
                    }

                    {this.state.editingPassword && 
                        <View>
                            <Text style={styles.paragraph}>
                                
                                Password: 
                                {this.state.passBool && 
                                    <Text style={styles.available}>
                                        Valid
                                    </Text>
                                }
                                {!this.state.passBool &&
                                    <Text style={styles.unavailable}>
                                        Invalid
                                    </Text>
                                }
                            </Text>
                        </View>
                    }

                    <TextInput onChangeText={(text)=> {
                                    user_DB_class.password = text;
                                    this.setState({
                                        passVal: text,
                                    })
                                    setTimeout(()=>{
                                        this.checkPassValid();
                                    }, 200)
                                }} 
                                style={styles.input}  
                                onFocus={()=> {
                                    this.setState({
                                        editingUsername: false,
                                        passVal: "",
                                        editingPassword: true
                                    })
                                }}
                                onBlur={()=>{
                                    this.setState({
                                        editingPassword: false,
                                        editingUsername: false
                                    })
                                }}
                                value={this.state.passVal}
                                />

                    <View style={styles.buttonDesign}>
                        <Button 
                            title='SUBMIT' 
                            color={buttonColor}
                            
                            onPress={() => {
                                //TODO add user to databse, check if username is already taken 
                                user_DB_class.signUp();
                                this.clearInputs();
                                if (user_DB_class.username == "" || user_DB_class.password == "" || user_DB_class.username == 'USERNAME' || user_DB_class.password == 'PASSWORD') {
                                    Alert.alert('Missing Username or Password')
                                } 
                                else {
                                    setTimeout(()=> {
                                        if (user_DB_class.token) {
                                            this.navigateLogin();
                                        } 
                                    }, 1000) 
                                }         
                            }}
                            />
                    </View>

                    <Text style={styles.paragraph}>
                        No usernames over 10 characters, no spaces in username
                    </Text>

                    <Text style={styles.paragraph}>
                        Passwords between 6 and 10 characters
                    </Text>
                </LinearGradient>
            </View>
        )
    }
}

export {SignUpPage};