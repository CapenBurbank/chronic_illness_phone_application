import React from 'react';
import {styles, buttonColor} from './styles';
import {Users_Database} from '../DB/users'; 
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons, FontAwesome, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';
import {
    View,
    Button,
    Text,
    TextInput,
    Alert,
    ActivityIndicator
} from 'react-native';

const user_DB_class = new Users_Database;

// establish connection to noSQL firebase database

user_DB_class.init();

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'USERNAME',
            pass: 'PASSWORD',
            loading: false
        }
    }

    clearInputs = () => {
        this.setState({
            user: 'USERNAME',
            pass: 'PASSWORD'
        })
    }

    navigateToProfile() {
        this.props.navigation.navigate('Profile')
    }
    
    /**
     * edits user_DB_class value: this.username when invoked from onChangeText in textInput element
     * -used for authentication
     * @param {string} text 
     */

    changeUser(text) {
        user_DB_class.username = text;
    }

    /**
     * edits user_DB_class value: this.password when invoked from onChangeText in textInput element
     * -used for authentication
     * @param {string} text 
     */

    changePass(text) {
        user_DB_class.password = text;
    }

    clearUserInfo() {
        user_DB_class.clear_info();
    }

    /**
     * when invoked will attempt to authenticate user credentials from user_DB_class performing a noSQL firebase query
     * 
     * -if no matching values are found, then user is denied access
     * 
     * -if matching values are found then users will be navigated directly to profile navigation stack
     * 
     * -if authentication if true, some data will automatically be fetched from that users soecific noSQL sub firebase sub-collection containing informatin about their logged symptoms 
     */

    auth() {
        user_DB_class.login();    
        
        this.clearInputs();
        this.setState({
            loading: true
        })
        setTimeout(() => {
            if (user_DB_class.token) {
                user_DB_class.get_Symptom_List()
                    .then(()=> {
                        this.navigateToProfile();
                    })
                    .catch(()=> {
                        // no error handling implemented yet 
                    })
                
            }
            else if (!user_DB_class.token) {
                Alert.alert('Invalid Username/Password');
            }
            this.setState({
                loading: false
            })
        }, 3000)
        
    }

    Navigate_signUp = () => {
        this.props.navigation.navigate('SignUp');
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
                            position: 'absolute',
                            left: 50,
                            top: 0
                        }}
                        >   
                        <Ionicons name='analytics' size={260} color='cadetblue'  />
                    </View>

                    <View
                        style={{
                            marginTop: 60
                        }}
                        >

                    </View>
        
                    <Text style={styles.h1}>
                        Health Bar
                    </Text>

                    <View   
                        style={{
                            marginBottom: 20
                        }}>
                        <TextInput  
                            style={styles.input} 
                            value={this.state.user}
                            onChangeText={(text)=> {
                                this.changeUser(text);
                                this.setState({
                                    user: text
                                })
                            }}
                            onFocus={()=>{
                                this.setState({
                                    user: ""
                                })
                            }}
                            />

                        <TextInput   
                            style={styles.input} 
                            value={this.state.pass}
                            onChangeText={(text)=>{
                                this.changePass(text);
                                this.setState({
                                    pass: text
                                })
                            }}
                            onFocus={()=>{
                                this.setState({
                                    pass: ""
                                })
                            }}
                            />
                    </View>

                    <View style={styles.buttonDesign}>
                        <Button 
                            title='LOGIN' 
                            color={buttonColor}
                            
                            onPress={()=>{
                                if (user_DB_class.username == "" || user_DB_class.password == "" || user_DB_class.username == 'USERNAME' || user_DB_class.password == 'PASSWORD') {
                                    Alert.alert('Missing username or password')
                                }
                                else {
                                    this.auth();
                                }
                            
                                
                            }}
                            />
                    </View>

                    <Text style={styles.paragraph}>
                            Not yet a member?
                    </Text>

                    <View style={styles.buttonDesign}>
                        <Button
                            title='SIGN UP' 
                            color={buttonColor}
                            onPress={()=> {
                                this.Navigate_signUp();

                            }} 
                            />
                    </View>
                    { this.state.loading &&
                        <ActivityIndicator
                        //visibility of Overlay Loading Spinner
                        visible={this.state.loading}
                        style={styles.spinner}
                        animating={true}
                        color='black'
                        size={100}/>
                    } 
                </LinearGradient>
            </View>
        )
    }
}

export {LoginPage, user_DB_class};