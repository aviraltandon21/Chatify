import React from 'react'
import { Header, Segment } from 'semantic-ui-react'

export default function MessagesHeader({channelName,users})
{
    return (
      <Segment clearing className="message-header-mobile">
        <Header fluid="true" floated="left" as="h2" style={{ marginBottom: 0 }}>
          <span>
            {' '}
            {channelName}
            
          </span>
          <Header.Subheader>{users}</Header.Subheader>
        </Header>
        
      </Segment>
    )
  }