import React from 'react'
import {
  Segment,
  Accordion,
  Header,
  Icon,
  Image,
} from 'semantic-ui-react'

export default function MetaPanel({
  currentChannel,
  isPrivateChannel
}) {
  const [activeIndex, setActiveIndex] = React.useState(0)

  const handleAccordionChange = (event, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  if (isPrivateChannel) {
    return null
  }


  return (
    <Segment loading={!currentChannel} className="channel-details">
      <Header as="h3" attached="top">
        About # {currentChannel && currentChannel.name}
      </Header>

      <Accordion styled attached="true">
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleAccordionChange}
        >
          <Icon name="dropdown" />
          <Icon name="info" />
          Channel Details
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          {currentChannel && currentChannel.details}
        </Accordion.Content>
        
        
        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={handleAccordionChange}
        >
          <Icon name="dropdown" />
          <Icon name="pencil alternate" />
          Created By
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <Header as="h3">
            <Image
              circular
              src={currentChannel && currentChannel.createdBy.avatar}
            />
            {currentChannel && currentChannel.createdBy.name}
          </Header>
        </Accordion.Content>
      </Accordion>
    </Segment>
  )
}