import React from 'react';
import {styles, Style_Class, Linear_Gradient_Class, Icon_Class, Font_Class} from '../styles';
import {Ionicons, MaterialCommunityIcons, Octicons} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
    View,
    Modal,
    Text,
    Alert,
    Pressable,
    ScrollView,
} from 'react-native';

/**
 * parent node needs following props:
 *      -modal_visibility(boolean)
 *      -close_accessibility_modal(function)
 *      -reRender(method of this.forceupdate)
 */


export default class Accessibility_Modal extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            modal_visible: this.props.return_accessibility_modal_state()
        }
    }

    render() {
        return (
            <Modal
                onRequestClose={()=> {
                    this.props.close_accessibility_modal
                }}
                visible={this.state.modal_visible}
                animationType='slide'
                >
                <View
                    style={{
                        flex: 1, 
                    }}
                    >
                    <LinearGradient
                        colors={[Linear_Gradient_Class.main_color_1, Linear_Gradient_Class.main_color_2]}
                        style={styles.background}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        >
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
                                ]}
                                onPress={()=>{
                                    this.props.close_accessibility_modal()
                                }}
                                >
                                <Ionicons name='close-circle' size={30} color={Icon_Class.iconColor} />
                            </Pressable>
                        </View>

                        <ScrollView>

                            <View
                                style={{
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}
                                >
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
                                                Font_Class.increment_fontMultiplier();
                                                this.props.reRender();
                                            }}>
                                            <Octicons name='text-size' size={100} color={Icon_Class.iconColor} />
                                            <Text
                                                style={{
                                                    fontSize: 12 * Font_Class.fontMultiplier,
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    color: Icon_Class.iconTextColor,
                                                }}>
                                                    Text size
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
                                                // nothing yet
                                            }}>
                                    
                                            <MaterialCommunityIcons name='format-line-spacing' size={100} color={Icon_Class.iconColor} />
                                            <Text
                                                style={{
                                                    fontSize: 12 * Font_Class.fontMultiplier,
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    color: Icon_Class.iconTextColor
                                                }}>
                                                    Line Spacing
                                            </Text>
                                        </Pressable>
                                    </View>
                                </Text>

                            </View>
                        </ScrollView>
                    </LinearGradient>
                </View>     
            </Modal>
        )
    }
}

export {Accessibility_Modal}