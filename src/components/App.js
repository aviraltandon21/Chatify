import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import ColorPanel from './ColorPanel'
import SidePanel from './SidePanel'
import Messages from './Messages'
import MetaPanel from './MetaPanel'
import './App.css'

function App() {

  const {
    currentUser,
    currentChannel,
    primaryColor,
    secondaryColor,
    isPrivateChannel
  } = useSelector(({ user,channel,colors }) => ({
    currentUser: user.currentUser,
    currentChannel: channel.currentChannel,
    primaryColor: colors.primaryColor,
    secondaryColor: colors.secondaryColor,
    isPrivateChannel: channel.private
  }))

  return (
    <>
    
    <Grid columns="equal" className="app" stackable columns={2} style={{background: secondaryColor}}>
    <ColorPanel currentUser={currentUser}/>
      <SidePanel key={currentUser && currentUser.id} currentUser={currentUser} primaryColor={primaryColor} className="side-panel"/>
      <Grid.Column style={{ marginLeft: 320 }}>
      <Messages
        key={currentChannel && currentChannel.id}
            currentChannel={currentChannel}
            currentUser={currentUser}
      />
      </Grid.Column>
      <Grid.Column width="4">
        <MetaPanel
          currentChannel={currentChannel}
          isPrivateChannel={isPrivateChannel}
        />
      </Grid.Column>
    </Grid>
    </>
  );
}

export default App;
