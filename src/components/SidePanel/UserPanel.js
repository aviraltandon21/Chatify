import React,{useState} from 'react';
import {
    Grid,
    Icon,
    Header,
    Dropdown,
    Image,
  } from 'semantic-ui-react'
import firebase from '../../firebase'



const UserPanel = ({ currentUser,primaryColor}) => {
    const [user] = useState(currentUser)
   
    
    const userActions = () => [
        {
          key: 'user',
          text: (
            <span>
              Signed in as: <strong>{user.displayName}</strong>
            </span>
          ),
          disabled: true,
        },
    
        {
          key: 'signOut',
          text: <span onClick={signOutUser}>Sign Out</span>,
        },
      ]
      const signOutUser = () => {
          firebase.auth().signOut().then(() => console.log('signed out'))
      }

    return (
        <Grid style={{background: primaryColor}}>
            <Grid.Column>
            <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            
            <Header as="h3" inverted floated="left">
                <Icon name="code" />
                <Header.Content>Welcome !</Header.Content>
                
            </Header>
            </Grid.Row>
            <Header inverted as="h4" style={{ padding: '1.2em' }}>
            <Image avatar src={user.photoURL} />
            <Dropdown
              trigger={<span style={{marginLeft: '6px'}}>Profile</span>}
              options={userActions()}
            />
          </Header>
            </Grid.Column>
        </Grid>
    )
}

export default UserPanel;