/**
 * layout of noSQL firebase database
 * 
 * firestore cloud powered by google
 * 
 * collection of users(documents), called application_database
 * each user is a document
 * each user document has a field of password attached to them
 * 
 *         
 */
import { resolveUri } from 'expo-asset/build/AssetSources';
import {Alert} from 'react-native';
const firebase = require('firebase/app');
require('firebase/firestore');

class Users_Database {
    constructor() {
        this.username = undefined;
        this.password = undefined;
        this.id = undefined;
        this.token = false;
        this.symptom_array = [];
        this.database = undefined;
        this.usernameAvailable = undefined;
    }
    
    clear_info() {
        this.username = undefined;
        this.password = undefined;
        this.id = undefined;
        this.token = false;
        this.usernameAvailable = undefined;
        this.symptom_array = [];
    }

    /**
     * initializes main connection to noSQL firebase database
     */

    init() {
        var firebaseConfig = {
            apiKey: "AIzaSyCsTjl_hgT-pYmkLJ2n7ojlIYM8Ohm6qDA",
            authDomain: "chronic-illness-app-62dc5.firebaseapp.com",
            projectId: "chronic-illness-app-62dc5",
            storageBucket: "chronic-illness-app-62dc5.appspot.com",
            messagingSenderId: "411586552366",
            appId: "1:411586552366:web:40c593721e93a8c4e9b5bf",
            measurementId: "G-6PXLH36NXJ"
        };

        // Initialize Firebase
        if (!firebase.default.apps.length) {
            firebase.default.initializeApp(firebaseConfig);
        }
        else {
            firebase.default.app(); // if already initialized, use that one
        }
        
        this.database = firebase.default.firestore();        
    }

    /**
     * asynchronous noSQL firebase query, looks for unique symptom names that have been logged, and returns a list of those queries making sure to not repeat matching values
     */

    async get_Symptom_List() {

        this.symptom_array = [];

        var collection = this.database.collection('application_database');
        var user_doc = collection.doc(this.username);
        var user_doc_collection = user_doc.collection(`${this.username}_symptoms`);
        var snapshot = await user_doc_collection.get();
        
        var temp_array = [];        
        snapshot.forEach((doc) => {
            temp_array.push(doc.data().symptom); 
        });  
        var set = new Set(temp_array);
        set.forEach(word => this.symptom_array.push({symptom: word}))
        console.log(this.symptom_array)
    }

    /**
     * asynchronous noSQL query, checks for username(documents) in user collection that are not already taken, is implemented inside signUp screen/componenet
     */

    real_Time_check() {     
        
        var collection = this.database.collection('application_database');
            
        if (this.username !== 'USERNAME') {
            if (this.username !== "") {
                var user_ref = collection.doc(this.username);
                // real time check on documents of users 
                user_ref
                    .onSnapshot((doc) => {
                        if (doc.exists) {
                            this.usernameAvailable = false;
                        }
                        else {
                            this.usernameAvailable = true;
                        }
                    }); 
            }
        }
    }

    /**
     * noSQL firebase query, signUp method, adds new document(user) with field: password, used for authentication after sign up
     * 
     * error handling for invalid formats/ taken usernames
     */
    
    signUp() {
        var collection = this.database.collection('application_database');
        
        if (this.username == undefined || this.username == "") {
            // do nothing for DB 
        } 
        else {
            var user_ref = collection.doc(this.username);
            user_ref
                .get()
                .then((docSnapshot) => {
                    if (docSnapshot.exists) {
                        user_ref.onSnapshot((doc) => {
                            Alert.alert('Username Already Exists');
                        })
                    }
                    else if (!docSnapshot.exists) {
                        if (this.username.length <= 30 && this.username != "") {
                            if (this.password.length <= 10 && this.password != "" && this.password.length >= 6 && this.password != 'PASSWORD') {
                                collection.doc(this.username).set( {
                                    password: this.password
                                }).then(() => {
                                    Alert.alert(`Welcome ${this.username}`);
                                    this.token = true;
                                }).catch((err)=> {
                                    console.log(err)
                                })
                            }
                            else if (this.password.length > 10 || this.password.length < 8 || this.password == "") {
                                // err message showing invalid input for password 
                                Alert.alert('Invalid Password Entry');
                            }
                        }
                        else if (this.username.length > 30 || this.username.length < 0) {
                            // err for invalid username eg => too long or not long enough
                            Alert.alert('Invalid Username Entry');
                        }
                    }
                    
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    /**
     * noSQL firebase query, login method, checks for matching password value inside existing username(document), updates token to true if match is found, false if it no match is found
     * 
     * token will not be a boolean in final product, but rather an encrypted key used for authentication
     */

    login() {
        var collection = this.database.collection('application_database')
        var user_ref = collection.doc(this.username);

        if (this.username != "" || this.password != "" || this.username != undefined || this.password != undefined) {
            user_ref
            .get()
            .then((doc)=> {
                if (doc.exists) {
                    if (doc.data().password == this.password) {
                        this.token = true;
                    }
                    
                }
                else if (!doc.exists) {
                    this.token = false;
                }
            }).catch((err)=> {
                console.log(err)
            })
        }
        
    }    
}

export {Users_Database}; 