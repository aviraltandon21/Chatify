import React from 'react';
import firebase from '../../firebase'
import { connect } from 'react-redux'
import { setChannel,setPrivateChannel } from '../../store/channels/actions'
// prettier-ignore
import { Menu, Icon, Modal, Form, Input, Button} from "semantic-ui-react";


class Channels extends React.Component {
    state = {
        activeChannel: '',
        user: this.props.currentUser,
        channel: null,
        channels: [],
        channelName: '',
        channelDetails: '',
        channelsRef: firebase.database().ref('channels'),
        messagesRef: firebase.database().ref('messages'),
        typingRef: firebase.database().ref('typing'),
        notifications: [],
        modal: false,
        firstLoad: true,
      }

      componentDidMount() {
        this.addListeners()
      }

      componentWillUnmount() {
        this.removeListeners()
      }

      addListeners = () => {
        let loadedChannels = []
        this.state.channelsRef.on('child_added', snap => {
          loadedChannels.push(snap.val())
          console.log(loadedChannels);
          this.setState({ channels: loadedChannels }, () => this.setFirstChannel())
        
        })
      }

      removeListeners = () => {
        this.state.channelsRef.off()
      }
    
    

      addChannel = () => {
        const { channelsRef, channelName, channelDetails, user } = this.state
    
        const key = channelsRef.push().key
    
        const newChannel = {
          id: key,
          name: channelName,
          details: channelDetails,
          createdBy: {
            name: user.displayName,
            avatar: user.photoURL,
          },
        }
    
        channelsRef
          .child(key)
          .update(newChannel)
          .then(() => {
            this.setState({ channelName: '', channelDetails: '' })
            this.closeModal()
            console.log('channel added')
          })
          .catch(err => {
            console.error(err)
          })
      }


      setFirstChannel = () => {
        const firstChannel = this.state.channels[0]
        if (this.state.firstLoad && this.state.channels.length > 0) {
          this.props.setChannel(firstChannel)
          this.setActiveChannel(firstChannel)
        }
        this.setState({ firstLoad: false })
      }

      handleSubmit = event => {
        event.preventDefault()
        if (this.isFormValid(this.state)) {
          this.addChannel()
        }
      }
    
      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
      }

      setActiveChannel = channel => {
        this.setState({ activeChannel: channel.id })
      }
    

      changeChannel = channel => {
        this.setActiveChannel(channel)
        this.props.setChannel(channel)
        this.props.setPrivateChannel(false);
      }

      displayChannels = channels => 
      channels.length > 0 &&
      channels.map(channel => (
        <Menu.Item
          key={channel.id}
          onClick={() => this.changeChannel(channel)}
          name={channel.name}
          style={{ opacity: 0.7 }}
          active={channel.id === this.state.activeChannel}
        >
          # {channel.name}
        </Menu.Item>
      ))

      isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails

      openModal = () => this.setState({ modal: true })

      closeModal = () => this.setState({ modal: false })

    render() {
        const { channels, modal } = this.state
        return (
            <React.Fragment>
            <Menu.Menu className="menu">
                <Menu.Item>
                    <span>
                    <Icon name="exchange" /> CHANNELS
                    </span>{' '}
                    ({channels.length}) <Icon name="add" style={{cursor: "pointer"}} onClick={this.openModal}/>
                </Menu.Item>
                {this.displayChannels(channels)}
            </Menu.Menu>

            <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
        </React.Fragment>
        )
    }
}

export default connect(null, { setChannel,setPrivateChannel })(Channels)