import {React} from 'react';
import {
    View,
    Modal,
    Text,
    Alert,
} from 'react-native';


class Accessibility_Modal extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            modal_visible: this.props.accessibility_modal_visibility

        }
    }

    render() {
        return (
            <Modal
                onRequestClose={()=> {

                }}
                visible={this.state.modal_visible}
                >

            </Modal>
        )
    }
}