import React from 'react';
import {styles, buttonColor} from './settings_screen_components/styles'; 
import {user_DB_class} from './login';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {LinearGradient} from 'expo-linear-gradient';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import {Dates_Symptoms} from '../DB/dates_symptoms';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    Text,
    Button,
    TextInput,
    Dimensions,
    Alert,
    Modal,
    FlatList,
    Pressable,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';

const userDate_And_Symptom_Handler = new Dates_Symptoms;

userDate_And_Symptom_Handler.setCurrentDateAndTime();

// example list of logged symptoms

var common_Symptoms = [
    {key: "Headache"},
    {key: "Nausea"},
    {key: "Migraine"},
    {key: "Joint Pain"},
    {key: "Fatigue"},
    {key: "Stomach"},
    {key: "Trouble with Vision"},
    {key: "Scatter-Brained"},
    {key: "Irritability"},
    {key: "Disturbed Sleep"},
    {key: "Cognitive Issues"},
];

export default class Symptom_Logger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: "Any Notes...?",
            severity: 1,
            modalBool: false,
            modalBool2: false,
            // prop inherited from parent node 
            showSymptomLoggerModal: this.props.returnState(), 
            search: "Search...",
            user_my_Symptoms: this.props.updateCustomLoggedSymptoms(),
            ex_common_Symptoms: common_Symptoms,
            frequentList: false,
            commonList: false,
            customList: true,
            newCustomSymptomBool: false,
            enterNewCustomSymptom: 'New symptom...?',
            sliding_scale: false,
            date: `${userDate_And_Symptom_Handler.month}/${userDate_And_Symptom_Handler.day}/${userDate_And_Symptom_Handler.year}`,
            
        };
    }

    /**
     * 
     * date is automatically set to US format mm/dd/yyyy, however if custom date is required for older missed log of a symptom, date can be adjusted
     * 
     * -dynamic enough to handle monthc or day input starting with 0 or without 0
     * 
     * ex: 4/2/2021 & 04/02/2021 are processed the same with no issue
     * 
     * @param {string} text 
     */

    format_Date_If_Custom(text) {
        this.setState({
            date: text
        })
        var date = text.split('/');
        
        var month= parseInt(`${date[0]}`);
        var day = parseInt(`${date[1]}`);
        var year = parseInt(`${date[2]}`);

        userDate_And_Symptom_Handler.customDateFormat(day, month, year);

        console.log(userDate_And_Symptom_Handler.day, userDate_And_Symptom_Handler.month, userDate_And_Symptom_Handler.year)
    }

    componentDidMount() {
        this.keyboardDidShowLostener = Keyboard.addListener('keyboardDidShow', ()=> {})
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            if (this.state.modalBool) {
                this.input.blur()
            }
            else if (this.state.modalBool2) {
                // do nothing
            }
        });
        
    }

    componentWillUnmount() {
        this.keyboardDidHideListener.remove();
        this.keyboardDidShowLostener.remove();
    }

    hide_Sliding_Scale_Label() {
        this.setState({
            sliding_scale: false,
        })
    }

    adjust_Sliding_Scale(value) {
        this.setState({
            severity: value,
            sliding_scale: true
        })
    }

    /**
     * in modal, gets invoked from tab changing, thus rendering frequent list(data not currently implemented)
     */

    render_frequentList() {
        this.setState({
            frequentList: true,
            commonList: false,
            customList: false,
            newCustomSymptomBool: false
        })
    }

    /**
     * in modal, gets invoked from tab changing, thus rendering common list
     */

    render_commonList() {
        this.setState({
            frequentList: false,
            commonList: true,
            customList: false,
            newCustomSymptomBool: false
        })
    }

    /**
     * in modal, gets invoked from tab changing, thus rendering custom list
     */

    render_customList() {
        this.setState({
            frequentList: false,
            commonList: false,
            customList: true,
            newCustomSymptomBool: false
        })
        console.log(user_DB_class.symptom_array)
    }

    /**
     * in modal, gets invoked from tab changing, thus enabling user to create a new symptom if it does not already exist
     */

    newCustomSymptom() {
        this.setState({
            frequentList: false,
            commonList: false,
            customList: false,
            newCustomSymptomBool: true,
        })
    }

    setNewCustomSymptomState(text) {
        this.setState({
            enterNewCustomSymptom: text
        })
    }

    /**
     * is invoked with onChangeText function from textInput, to render specific list items that match text, does not alter initial list data
     * 
     * @param {string} text 
     */

    filterSymptoms(text) {

        var customList = this.state.user_my_Symptoms.filter(({key: word}) => word.startsWith(text));

        var commonList = common_Symptoms.filter(({key: word}) => word.startsWith(text));

        this.setState({
            user_my_Symptoms: customList,
            ex_common_Symptoms: commonList
        })
    }

    resetNewSymptomTextInput() {
        this.setState({
            enterNewCustomSymptom: 'New symptom...?'
        })
    }

    resetSymptomLists() {
        this.setState({
            user_my_Symptoms: this.props.updateCustomLoggedSymptoms(),
            ex_common_Symptoms: common_Symptoms
        })
    }

    /**
     * when invoked resets certain values in modal states allowing additional symptom logging if desired/ creating better UI
     */

    resetState() {
        userDate_And_Symptom_Handler.setCurrentDateAndTime();
        this.setState({
            notes: "Any notes...?",
            severity: 1,
            modalBool: this.props.returnState(),
            modalBool2: false,
            date: `${userDate_And_Symptom_Handler.month}/${userDate_And_Symptom_Handler.day}/${userDate_And_Symptom_Handler.year}`,
            user_my_Symptoms: this.props.updateCustomLoggedSymptoms(),
            enter_Symptom: 'New symptom...?'
        });
        this.closeScreen();
                
           
    }

    /**
     * 
     * @returns numbered label for sliding scale for better UX
     */

    renderScale() {
        const items = [];
        for (var i=0; i <= 10; i++) {
            items.push(
                <Text 
                    style={{
                        fontSize: 18
                    }}
                >
                    {i}
                </Text>                
            );
        }
        return items;
    }

    changeNotes(text) {
        this.setState({
            notes: text
        })
    }

    changeSeverity(value) {
        this.setState({
            severity: value
        })
    }

    showModalList(){
        this.setState({
            modalBool: true
        })
    }

    showModalList2() {
        this.setState({
            modalBool2: true,
            modalBool: false
        })
    }

    closeScreen() {
        this.setState({
            showSymptomLoggerModal: this.props.returnState()
        })
        this.props.hideSymptomLoggerModal();
    }

    openScreen() {
        this.setState({
            showSymptomLoggerModal: this.props.returnState()
        })
        this.props.openSymptomLoggerModal();
    }

    render() {
        return ( 
            <Modal 
                onRequestClose={()=>{
                    this.resetSymptomLists();
                    this.resetState();
                }}
                animationType='slide'
                visible={this.state.showSymptomLoggerModal}
                >
                <View style={styles.container}>
                    <LinearGradient
                        colors={['cadetblue', 'white']}
                        style={styles.background}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}>
                            <KeyboardAvoidingView
                            behavior='height'
                            style={{
                                backgroundColor: 'transparent',
                            
                            }}>
                                <View
                                    style={{
                                        flexDirection: 'row-reverse',
                                        justifyContent: 'flex-start'
                                    }}
                                    >
                                    <Pressable
                                        style={(({pressed})=> [
                                            {
                                                opacity: pressed ? 0.3 : 1
                                            },
                                            {
                                                borderRadius: 15,
                                                marginTop: 40,
                                                marginRight: 15
                                            }
                                        ])}
                                        onPress={()=>{
                                            this.resetSymptomLists();
                                            this.resetState();

                                            /* var convertDate = new Date(Date.now());

                                            var hours = convertDate.getHours();
                                            var minutes = convertDate.getMinutes();

                                            hours = 13;

                                            var am_pm;

                                            if (hours > 12 && hours < 24) {
                                                am_pm = 'pm'
                                                if (hours > 12) {
                                                    hours = hours - 12;
                                                }
                                            } 
                                            else if (hours == 24 || hours < 12) {
                                                am_pm = 'am'
                                                if (hours == 24) {
                                                    hours = 1;
                                                }
                                            }

                                            console.log(`readable time: ${hours}:${minutes} ${am_pm}`); */
                                        }}>
                                        <Ionicons size={30} name='close-circle-outline' color='white' />
                                    </Pressable>
                                </View>
                                <Text 
                                    style={{
                                        textAlign: 'center',
                                        //
                                        paddingTop: 0,
                                        paddingBottom: 15,
                                        fontSize: 20,
                                        color: 'white'
                                    }}>
                                    Log Symptoms
                                </Text>
                                    <View
                                        style={{
                                            paddingBottom: 10,
                                        }}
                                        >
                                        <TextInput 
                                            style={[styles.input, {
                                                width: Dimensions.get('screen').width -15,
                                                padding: 5,
                                                textAlign: 'left',
                                            }]}
                                            value={this.state.search}
                                            onChangeText={(text)=>{
                                                this.setState({
                                                    search: text,
                                                })
                                                this.filterSymptoms(text)
                                            }}
                                            onBlur={()=> {
                                                setTimeout(()=> {
                                                    this.setState({
                                                        search: 'Search...'
                                                    }) 
                                                }, 200)
                                                    
                                            }}
                                            onFocus={()=>{
                                                this.setState({
                                                    search: "",
                                                })
                                            }}
                                            ref={input => this.input = input}
                                            />
                                    </View>
                                    
                                    <Text>
                                        <ScrollableTabView
                                            style={{ 
                                                marginTop: 20,
                                                width: (Dimensions.get('screen').width),
                                                borderWidth: 0,
                                                
                                            }}
                                            onChangeTab={({i,ref}) => {
                                                //tabs are set up as array
                                                //i in parameter refers to what index each tab is 
                                                if (i == [0]) {
                                                    console.log('on first page')
                                                    this.render_customList();
                                                }
                                                else if (i == [1]) {
                                                    console.log('on second page')
                                                    this.render_commonList();
                                                }
                                                else if (i == [2]) {
                                                    console.log('on third page')
                                                    this.render_frequentList();
                                                }
                                                else if (i == [3]) {
                                                    console.log('on fourth page')
                                                    this.newCustomSymptom();
                                                }
                                            }}
                                            tabBarUnderlineStyle={{
                                                backgroundColor: 'transparent',
                                            }}
                                            tabBarBackgroundColor="cadetblue"
                                            tabBarActiveTextColor="white"
                                            tabBarTextStyle={{
                                                borderColor: 'gray'
                                            }}
                                            renderTabBar={() => 
                                                <DefaultTabBar 
                                                    style={{
                                                        borderWidth: 0,
                                                        borderColor: 'gray',
                                                        borderRadius: 30,
                                                        width: (Dimensions.get('screen').width) -20,
                                                        alignSelf: 'center'
                                                    }}      
                                                    />
                                            }
                                        >
                                            <Text tabLabel='Custom'></Text>
                                            <Text tabLabel='Common'></Text>
                                            <Text tabLabel='Frequent'></Text>
                                            <Text tabLabel='New'></Text>
                                        </ScrollableTabView>;
                                    </Text>
                                
                                { this.state.customList &&
                                    <FlatList
                                        data={this.state.user_my_Symptoms}
                                        style={{
                                            height: Dimensions.get('screen').height/1.5,
                                            
                                        }}
                                        renderItem={ ({item}) => {
                                            return(
                                                <Pressable
                                                    style={({pressed}) => [
                                                        {
                                                            backgroundColor: pressed ? 'white' : 'white',
                                                            opacity: pressed ? 0.2 : 1,
                                                            color: pressed ? 'white' : 'black',          
                                                        },
                                                        
                                                    ]}
                                                    onPress={()=> {
                                                        userDate_And_Symptom_Handler.symptom = item.symptom;
                                                        // open second modal 
                                                        this.showModalList2();
                                                        console.log(userDate_And_Symptom_Handler.symptom);
                                                    }}>
                                                    
                                                
                                                    <Text 
                                                        style={styles.list}>
                                                        {item.symptom}
                                                    </Text>
                                                </Pressable>
                                            );
                                        }}
                                    />
                                }

                                { this.state.commonList &&
                                    <FlatList
                                        data={this.state.ex_common_Symptoms}
                                        style={{
                                            paddingTop: 0,
                                            height: Dimensions.get('screen').height/1.5
                                        }}
                                        renderItem={ ({item}) => {
                                            return(
                                                <Pressable
                                                    style={({pressed}) => [
                                                        {
                                                            backgroundColor: pressed ? 'gray' : 'white',
                                                            opacity: pressed ? 0.1 : 1,
                                                            color: pressed ? 'white' : 'black',          
                                                        },
                                                    ]}
                                                    onPress={()=> {
                                                        userDate_And_Symptom_Handler.symptom = item.key;
                                                        // open second modal 
                                                        this.showModalList2();
                                                    }}>
                                                    
                                                
                                                    <Text 
                                                        style={styles.list}>
                                                        {item.key}
                                                    </Text>
                                                </Pressable>
                                            )
                                        }}
                                    />
                                } 
                                {
                                    this.state.frequentList 
                                }
                                {
                                    this.state.newCustomSymptomBool &&
                                    <View>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                
                                            }}
                                            >
                                            <TextInput
                                                style={[styles.input,{
                                                    width: (Dimensions.get('screen').width) - 65,
                                                    textAlign: 'left',
                                                    backgroundColor: 'white',
                                                    paddingLeft: 15,

                                                    
                                                }]}
                                                value={this.state.enterNewCustomSymptom}
                                                onFocus={()=> {
                                                    this.setState({
                                                        enterNewCustomSymptom: ''
                                                    })
                                                }}
                                                onChangeText={(text)=> {
                                                    this.setNewCustomSymptomState(text);
                                                }}
                                                >

                                            </TextInput>
                                            
                                                <Pressable
                                                    style={({pressed})=> [
                                                        {
                                                            opacity: pressed ? 0.3 : 1
                                                        },
                                                        {
                                                            paddingLeft: 15
                                                        }
                                                    ]}
                                                    onPress={()=>{

                                                        if (this.state.enterNewCustomSymptom == '' || this.state.enterNewCustomSymptom == 'New symptom...?') {
                                                            Alert.alert('Please Enter Valid Symptom')
                                                        }
                                                        else {
                                                            userDate_And_Symptom_Handler.symptom = this.state.enterNewCustomSymptom;
                                                            this.showModalList2();
                                                            setTimeout(()=> {
                                                                this.resetNewSymptomTextInput();
                                                            },200)
                                                        }
                                                    }}
                                                    >
                                                    <Ionicons name='arrow-forward' size={30} color='white' />
                                                </Pressable>
                                        </View>   
                                    </View>
                                }
                        </KeyboardAvoidingView>
            
            
                        <Modal
                            onRequestClose={()=>{
                                this.setState({
                                    modalBool2: false,
                                    modalBool: this.props.returnState(),
                                    severity: 1,
                                    notes: 'Any notes...?'
                                })
                                this.resetSymptomLists();
                            }}
                            animationType='slide'
                            visible={this.state.modalBool2}
                            style={{
                                backgroundColor: 'transparent'
                            }}
                            >
                                <Text 
                                    style={[styles.h2, 
                                        {
                                            padding: 40,
                                            color: "teal",
                                            fontWeight: "bold"
                                        }
                                    ]}>
                                    {userDate_And_Symptom_Handler.symptom}
                                </Text>

                                <View
                                    style={{
                                        backgroundColor: 'teal',
                                        height: Dimensions.get('screen').height/8,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        padding: 4
                                    }}
                                    >
                                    <Text 
                                        style={styles.modalSymptomTracker_textLabel}
                                        >
                                        Date
                                    </Text>
                                <View>

                                    <View
                                        style={styles.modalSymptomTracker_container}
                                        >
                                        <TextInput
                                            style={styles.modalSymptomTracker_textInput}
                                            onChangeText={(text)=>{
                                                this.format_Date_If_Custom(text);

                                            }}
                                            value={this.state.date}
                                            />
                                    </View>  
                                </View> 

                                            
                                </View>

                                <View 
                                    style={{
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 30,
                                    }}>

                                    <Text style={[styles.h2, 
                                            {
                                                fontSize: 18,
                                                color: "teal",
                                                fontWeight: "bold"
                                            }
                                        ]}>
                                        Severity
                                    </Text>

                                    <View 
                                        style={[styles.column, {
                                            width: 280
                                        }]}>
                                        {this.renderScale()}
                                    </View>

                                    <MultiSlider 
                                        trackStyle={{
                                            justifyContent: 'center',
                                            backgroundColor: 'gray',
                                            height: 3
                                        }}
                                        markerStyle={{
                                            BackgroundColor: 'black'
                                        }}
                                        min={0}
                                        max={10}
                                        snapped={true}
                                        sliderLength={280}
                                        enabledTwo={false}
                                        enableLabel={this.state.sliding_scale}
                                        showStepMarkers={false}
                                        showStepLabels={this.state.sliding_scale}
                                        step={1}
                                        onValuesChange={([value]) => {
                                            this.adjust_Sliding_Scale(value);
                                        }}
                                        onValuesChangeFinish={()=>{
                                            this.hide_Sliding_Scale_Label();
                                        }}
                                        />
                                </View>

                                <View style={styles.InputPadding}>

                                    <TextInput  
                                        value={this.state.notes}
                                        style={[styles.input, {
                                            height: Dimensions.get('screen').height/5,
                                            textAlignVertical: 'top',
                                            textAlign: 'left',
                                            padding: 5,
                                            fontSize: 18,
                                        }]}
                                        multiline={true}
                                        onChangeText={(text)=>{
                                            this.changeNotes(text);
                                            this.setState({
                                                notes: text
                                            })
                                        }}
                                        onFocus={()=>{
                                            this.setState({
                                                notes: ""
                                            })
                                        }}
                                        />
                                </View>
                                
                                <View style={styles.buttonDesign}>
                                    <Button
                                        title='Finish'
                                        color={buttonColor}
                                        onPress={()=> {
                                            var slashCount = this.state.date.replace(/[^/]/g, "").length;
                                            
                                            if (slashCount == 2) {
                                                if (this.state.severity == undefined) {
                                                    Alert.alert('Cannot Enter Symptom Without Severity');
                                                } else {
                                                    userDate_And_Symptom_Handler.enter_Symptom(this.state.severity, this.state.notes);
                                                    Alert.alert(`Your Symptom: ${userDate_And_Symptom_Handler.symptom} was added`, `Hope you feel Better! :)`);
                                                    setTimeout(()=>{
                                                        userDate_And_Symptom_Handler.clearData();
                                                        this.resetSymptomLists();
                                                        this.resetState();
                                                        this.props.forceAnUpdate();
                                                    },1000)
                                                    
                                                    
                                                    
                                                }
                                            } else {
                                                Alert.alert('Error: Change Date Format', 'please make sure to use\nmm/dd/yyyy');
                                            }

                                        }}
                                        />
                                </View>
                        </Modal>  
                    </LinearGradient>
                </View>
        </Modal>
        );
    }
}

export {Symptom_Logger};