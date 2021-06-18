import React from 'react';
import {
    View,
    Text,
    Button,
    Dimensions,
    Alert,
    Pressable,
    Modal,
    KeyboardAvoidingView,
    FlatList,
    TextInput,
    Keyboard,
    ScrollView,
} from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';
import {user_DB_class} from './login';
import {styles, buttonColor} from './styles';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import {LinearGradient} from 'expo-linear-gradient';
import {Dates_Symptoms} from '../DB/dates_symptoms';
import {Ionicons} from '@expo/vector-icons';

const userDate_And_Symptom_Handler = new Dates_Symptoms;

userDate_And_Symptom_Handler.setCurrentDateAndTime();

//used as a sample array to display the graph if no data is used
var data1 = [1,4,5,7,8,4,3,3,6,7,8,9,0,];

var sampleList = user_DB_class.symptom_array;

// standard borderwidth used in styling 
const BW = 0.4;

/**
 * 
 * @param {object} object 
 * @returns react native view based on data pulled from each object inside modal
 */

function renderSymptomObject(object) {

    var notes = object.additional_notes;

    var date = `${object.month}/${object.day}/${object.year}`

    if (object.additional_notes == 'Any Notes...?' || object.additional_notes == "") {
        object.additional_notes = ''
    }
    
    return (
        <Pressable
            style={({pressed})=> [
                {
                    opacity: pressed ? 0.3 : 1
                }
            ]}
            onPress={()=> {
                // not yet implemented
                Alert.alert('Additional Notes:',notes)
            }}>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: Dimensions.get('screen').width,
                        borderColor: 'gray',
                        borderTopWidth: 0,
                        borderLeftWidth: BW,
                        borderRightWidth: BW,
                        borderBottomWidth: BW,
                        backgroundColor: 'teal',
                            
                    }}
                    >         
                    <Text
                        style={{
                    
                            color: 'white',
                            paddingLeft: 15,
                            
                        }}
                        >
                        actual time here
                    </Text>
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            paddingRight: 15,
                        }}
                        >
                        {date}
                    </Text>
                </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            width: Dimensions.get('screen').width,
                            height: 75,
                            borderColor: 'black',
                            borderTopWidth: 0,
                            borderLeftWidth: BW,
                            borderRightWidth: BW,
                            borderBottomWidth: BW,
                            backgroundColor: 'white'
                        }}
                        >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start'
                            }}
                            >
                                
                            <Text
                                style={{
                                    fontSize: 18,
                                    alignSelf: 'flex-start',
                                    paddingLeft: 15,
                                }}>
                                <Text style={{fontWeight: 'bold'}}>Severity: </Text> 
                                {object.severity}
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignSelf: 'flex-start'
                            }}
                            >
                            <Text
                                style={{
                                    fontSize: 15,
                                    paddingLeft: 15,
                                    width: Dimensions.get('screen').width/1.25
                                }}
                                numberOfLines={1}
                                >
                                <Text style={{fontWeight: 'bold'}}>Additional Notes: </Text>
                                {object.additional_notes}{object.additional_notes != "" && '...'}{object.additional_notes == "" && 'N/A'}  
                            </Text>

                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignSelf: 'flex-start'
                            }}
                            >
                            <Text
                                style={{
                                    fontSize: 15,
                                    paddingLeft: 15,
                                }}
                                >
                                
                            </Text>
                        </View>           
                </View>               
        </Pressable>         
    )
}

const monthArray = [
    {
        value: 1,
        name: 'January'
    },
    {
        value: 2,
        name: 'February'
    },
    {
        value: 3,
        name: 'March'
    },
    {
        value: 4,
        name: 'April'
    },
    {
        value: 5,
        name: 'May'
    },
    {
        value: 6,
        name: 'June'
    },
    {
        value: 7,
        name: 'July'
    },
    {
        value: 8,
        name: 'August'
    },
    {
        value: 9,
        name: 'September'
    },
    {
        value: 10,
        name: 'October'
    },
    {
        value: 11,
        name: 'November'
    },
    {
        value: 12,
        name: 'December'
    },

]

export default class Symptom_Analysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonthChart: true,
            currentDayChart: false,
            currentYearChart: false,
            modalSymptomList: false,
            modalMonthPicker: false,
            dataPointClickModal: false,
            my_Symptoms: sampleList,
            crossReferenceList: [],
            my_Symptoms_List: true,
            daySelected: undefined,
            search: 'Search...',
            monthChosenForRender: 0,
            data: {
                labels: [],
                datasets: [
                    {
                        data: data1,
                        strokeWidth: 0.75, 
                    }, 
                ],
                legend: ['Sample Symptom'], 
            },
        };
    };

    componentDidMount() {
        this.keyboardDidShowLostener = Keyboard.addListener('keyboardDidShow', ()=> {})
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            if (this.state.modalSymptomList) {
                this.input.blur()
            }
        });
        
    }

    componentWillUnmount() {
        this.keyboardDidHideListener.remove();
        this.keyboardDidShowLostener.remove();
    }

    /**
     * 
     * @param {string} text 
     * is invoked with onChangeText function from textInput, to render specific list items that match text, does not alter initial list data
     */
    filterSymptoms(text) {
        var customList = sampleList.filter(({key: word}) => word.startsWith(text));

        this.setState({
            my_Symptoms: customList,
        })
    }
    
    closeSymptomList() {
        this.setState({
            modalSymptomList: false
        })
    }

    openSymptomList() {
        this.setState({
            modalSymptomList: true
        })
    }

    /**
     * 
     * @param {array} data_Array 
     * takes in an array of just integers or floats and is used solely to update data for chart
     */

    updateChart_MonthView(data_Array) {

        this.setState({
            data: {
                labels: [],
                datasets: [
                    {
                        data: data_Array,
                        strokeWidth: 0.75, 
                    },
                ],
                legend: [`${userDate_And_Symptom_Handler.symptom}`], 
            },

        });
    }

    /**
     * invoked for changing view of chart specific to a single symptom within a month
     */

    adjustData_MonthView() {
        var tempList = [];
        var averageList = [];
        this.setState({
            crossReferenceList: []
        })

        

        const condenseList = async () => {

            var prevDay;
            userDate_And_Symptom_Handler.symptom_array.forEach(object => {

                var currentDay = object.day;

                if (prevDay == currentDay) {

                }
                else if (prevDay == undefined || prevDay != currentDay) {
                    var currentDayObjectList = userDate_And_Symptom_Handler.symptom_array.filter(obj => obj.day == currentDay)

                    currentDayObjectList.forEach(obj => {
                        tempList.push(obj.severity);
                    })

                    var sum = tempList.reduce((a, b)=> {return a + b}, 0);
                    var avg = sum/tempList.length;
                    averageList.push(avg);
                    this.state.crossReferenceList.push(object)

                    tempList = [];
                }

                prevDay = currentDay;
                
            });
        }
        
        condenseList()
            .then(()=> {
                this.updateChart_MonthView(averageList);
            })
            .catch(()=> {
                // errors not yet set
            })
    }

    /**
     * 
     * @returns array used for rendering of flatlist inside modal, rendering depends on data pulled from noSQL firebase queries
     */

    renderMultipleSymptomObjects() {
        var objectArray = userDate_And_Symptom_Handler.symptom_array.filter(object => object.day == this.state.daySelected);
        return objectArray;
    }


    renderDataPointClickModal(day) {
        this.setState({
            dataPointClickModal: true,
            daySelected: day
        })
    }

    closeDataPointClickModal() {
        this.setState({
            dataPointClickModal: false,
            daySelected: undefined
        })
    }

    /**
     * 
     * @param {int} month 
     * @returns string month based on array of months using month param as an index
     */

    formatGraphLabel() {
        const months = [
            'January',
            'February', 
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        return `${months[this.state.monthChosenForRender - 1]}, 2021`
    }

    renderModalMonthPicker(bool) {
        this.setState({
            modalMonthPicker: bool
        })
    }

    chooseMonthForRender(month) {
        this.setState({
            monthChosenForRender: month
        })
    }

    render() {
        return (
            <View style={styles.container} >
                <LinearGradient
                        colors={['cadetblue', 'white']}
                        style={styles.background}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}>
                    
                    <View
                        style={{
                            width: Dimensions.get('screen').width,
                            height: Dimensions.get('screen').height/1.5,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginTop: -20
                        }}
                        >
                        { this.state.currentMonthChart && 
                        <View 
                            style={{
                                margin: 0,
                                padding: 0
                            }}
                            >
                            <LineChart
                            data={this.state.data}
                            width={(Dimensions.get('screen').width/1.05)}// from react-native
                            height={((Dimensions.get('screen').height)/2)}
                            fromZero={true}
                            withInnerLines={false}
                            yLabelsOffset={20}
                            yAxisInterval={5}
                            
                            chartConfig={{
                                backgroundGradientFrom: "paleturqoise",
                                backgroundGradientFromOpacity: 0,
                                backgroundGradientTo: "cadetblue",
                                backgroundGradientToOpacity: 0,
                                backgroundColor: `rgba(255,255,255, ${0})`,
                                decimalPlaces: 0, // optional, defaults to 2dp
                                formatXLabel: 'center',
                                color: () => `rgba(255, 255, 255, ${0.9})`,
                                style: {
                                    backgroundColor: `rgba(255,255,255, ${0})`,
                                },
                                propsForDots: {
                                    r: 3,
                                    strokeWidth: "2",
                                    stroke: "teal",
                                },
                                propsForVerticalLabels: {
                                    fontSize: 15,
                                },
                            }}
                            bezier={false}
                            style={{
                                flexDirection: 'row',
                                alignSelf: 'flex-start',
                            }}
                            onDataPointClick={({value, index})=> {                                
                                this.renderDataPointClickModal(this.state.crossReferenceList[index].day);
                            }}
                            />

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginTop: -70,
                                    
                                }}
                                >
                                <Text 
                                    style={{
                                        fontSize: 18,
                                        color: 'white',
                                        alignSelf: 'center'
                                    }}
                                    >
                                    {this.formatGraphLabel()}
                                </Text>

                                
                            </View>

                            <View
                                style={[styles.buttonDesign, {
                                    marginTop: 10,
                                    
                                }]}
                                >
                                <Button 
                                    color={buttonColor}
                                    title='Pick a symptom to track'
                                    onPress={()=> {
                                        this.openSymptomList();
                                    }}
                                />
                            </View>
                        
                        </View>
                        }

                    </View>

                    <Modal
                        onRequestClose={()=> {
                            this.renderModalMonthPicker(false);
                        }}
                        visible={this.state.modalMonthPicker}
                        >
                        <View
                            style={{
                                width: Dimensions.get('screen').width,
                                height: 25,
                                backgroundColor: 'teal',
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }}
                            >
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: 'white'
                                }}
                                >
                                {userDate_And_Symptom_Handler.symptom}
                            </Text>
                        </View>

                        <FlatList 
                            style={[,
                                {
                                    width: Dimensions.get('screen').width,
                                    height: Dimensions.get('screen').height
                                }
                            ]}
                            data={monthArray}
                            renderItem={({item})=> {
                                return(
                                    <Pressable 
                                        style={({pressed}) => [
                                            {
                                                opacity: pressed ? 0.3 : 1,
                                                backgroundColor: pressed ? 'cadetblue' : 'white'
                                            },
                                            {
                                               
                                            }
                                        ]}
                                        onPress={()=> {
                                            this.chooseMonthForRender(item.value);
                                            userDate_And_Symptom_Handler.order_Data_By_Day(userDate_And_Symptom_Handler.symptom, item.value)
                                                .then(()=> {
                                                    this.adjustData_MonthView();
                                                    this.closeSymptomList();
                                                    this.renderModalMonthPicker(false);
                                                    Alert.alert('Rendering chart data for', `${userDate_And_Symptom_Handler.symptom}, in ${item.name}`);
                                                })
                                                .catch(()=> {

                                                })
                                        }}
                                        >
                                        <Text
                                            style={styles.list}
                                            >
                                            {item.name}
                                        </Text>

                                    </Pressable>
                                )
                            }}
                            />
                        <Pressable
                            style={({pressed})=> [
                                {
                                    opacity: pressed ? 0.3 : 1
                                },
                                {
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    padding: 30,
                                }
                            ]}
                            onPress={()=> {
                                this.renderModalMonthPicker(false)
                            }}
                            >
                            <Ionicons name='arrow-back' size={100} color='teal' />
                        </Pressable>
                    
                    </Modal>

                    <Modal 
                        onRequestClose={()=>{
                            this.closeSymptomList();
                        }}
                        animationType='slide'
                        visible={this.state.modalSymptomList}
                        transparent={true}
                        >
                            <KeyboardAvoidingView
                                behavior='height'
                                style={{
                                    backgroundColor: 'teal',
                                
                                }}>

                                    <View
                                        style={{
                                            flexDirection: 'row-reverse',
                                            justifyContent: 'flex-start'

                                        }}>
                                    
                                        <Pressable
                                            style={(({pressed})=> [
                                                {
                                                    opacity: pressed ? 0.3 : 1
                                                },
                                                {
                                                    backgroundColor: 'rgba(255,255,255, 0.19)',
                                                    borderRadius: 15,
                                                    padding: 5
                                                }
                                            ])}
                                            onPress={()=>{
                                                this.closeSymptomList();
                                            }}>
                                            <Ionicons size={40} name='close-circle-outline' color='white' />

                                        </Pressable>
                                    </View>
                            
                                    <Text 
                                        style={{
                                            textAlign: 'center',
                                            
                                            paddingTop: 0,
                                            paddingBottom: 15,
                                            fontSize: 20,
                                            color: 'white'
                                        }}>
                                        Symptoms
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
                                                            search: 'Search...',
                                                        }) 
                                                    }, 200)
                                                        
                                                }}
                                                onFocus={()=>{
                                                    this.setState({
                                                        search: "",
                                                        my_Symptoms: sampleList
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
                                                    // only one tab currently no need for logic yet, 
                                                    // will implement a frquent list then conditional rendering in future
                                                    
                                                }}
                                                tabBarUnderlineStyle={{
                                                    backgroundColor: 'white',
                                                }}
                                                tabBarBackgroundColor="teal"
                                                tabBarActiveTextColor="white"
                                                tabBarTextStyle={{
                                                    borderColor: 'teal'
                                                }}
                                                renderTabBar={() => 
                                                    <DefaultTabBar 
                                                        style={{
                                                            borderWidth: 0,
                                                            borderColor: '#00000000',
                                                        }}      
                                                        />
                                                }
                                            >
                                                <Text tabLabel='My Logged Symptoms'></Text>
                                                
                                            </ScrollableTabView>;
                                        </Text>
                                    
                                    { this.state.my_Symptoms_List &&
                                        <FlatList
                                            data={this.state.my_Symptoms}
                                            style={{
                                                height: Dimensions.get('screen').height/1.5
                                            }}
                                            renderItem={ ({item}) => {
                                                return(
                                                    <Pressable
                                                        style={({pressed}) => [
                                                            {
                                                                backgroundColor: pressed ? 'red' : 'white',
                                                                opacity: pressed ? 0.1 : 1,
                                                                color: pressed ? 'white' : 'black',          
                                                            },
                                                        ]}
                                                        onPress={()=> {
                                                            userDate_And_Symptom_Handler.symptom = item.key;
                                                            this.renderModalMonthPicker(true);
                                                            
                                                            
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
                            </KeyboardAvoidingView>
                        </Modal>

                    <Modal
                        onRequestClose={()=> {
                            this.closeDataPointClickModal()
                        }}
                        visible={this.state.dataPointClickModal}
                        animationType='fade'
                        
                        >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end'

                            }}
                            >
                            <Pressable
                                style={(({pressed})=> [
                                    {
                                        opacity: pressed ? 0.3 : 1
                                    },
                                    {
                                        borderRadius: 15,
                                        marginRight: 15
                                    }
                                ])}
                                onPress={()=>{
                                    this.closeDataPointClickModal()
                                }}>
                                <Text>
                                    <Ionicons size={25} name='close-circle-outline' color='black' />
                                </Text>
                            </Pressable>
                        </View>
                            
                        <FlatList 
                            data={this.renderMultipleSymptomObjects()}
                            renderItem={({item}) => {
                                return renderSymptomObject(item);
                            }}
                            />
                    
                    </Modal>       
                </LinearGradient>
            </View>
        )
    }
};

export {Symptom_Analysis}