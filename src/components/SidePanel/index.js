import React,{useState} from 'react'
import { Menu,Button } from 'semantic-ui-react'
import UserPanel from './UserPanel'
import Channels from './Channels'

export default function SidePanel({ currentUser,primaryColor }) {
 const[showMenu,setShowMenu] = useState(0);

  return (
    <>
    {/* <ColorPanel currentUser={currentUser}/> */}
    <Button fluid type="submit" color="violet" style={{height: "40px", width: "30%",marginTop: "20px",marginLeft: "15px"}} className="hideshowbutton2" onClick={()=> setShowMenu(1)}>Show Menu</Button>
    
    <Menu
      inverted
      size="large"
      color="black"
      fixed="left"
      vertical
      className={showMenu===1 ? 'channel-menu' : 'hide-channel-menu'}
     
      style={{ fontSize: '1.2rem',background: primaryColor }}
    >

    <Button circular icon="close" style={{marginLeft: "80%",marginTop: "2%"}} onClick={()=> setShowMenu(0)} className="hideshowbutton"></Button>
      <UserPanel primaryColor={primaryColor} currentUser={currentUser} />
      <Channels currentUser={currentUser}/>
    </Menu>



    <Menu
      inverted
      size="large"
      color="black"
      fixed="left"
      vertical
      className="desktop-channel-menu"
     
      style={{ fontSize: '1.2rem',background: primaryColor }}
    >

    <Button circular icon="close" style={{marginLeft: "80%",marginTop: "2%"}} onClick={()=> setShowMenu(0)} className="hideshowbutton"></Button>
      <UserPanel primaryColor={primaryColor} currentUser={currentUser} />
      <Channels currentUser={currentUser}/>
    </Menu>




    </>
  )
}