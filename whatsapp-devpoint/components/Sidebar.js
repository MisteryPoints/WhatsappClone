import { Avatar, Button, IconButton } from "@material-ui/core"
import ChatIcon from '@material-ui/icons/Chat'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import * as EmailValidator from 'email-validator'
import { addDoc, collection, query, where } from 'firebase/firestore'
import { useState } from "react"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from "styled-components"
import { auth, db } from '../firebase.js'
import Chat from "./Chat.js"

function Sidebar() {

  const [ wordToBeSearched, setWordToBeSearched ] = useState("")
  const [ user ] = useAuthState(auth)
  const userQueryInfo = query( collection( db, 'chats' ), where( 'users' , 'array-contains' ,user.email))
  const [ chatsSnapshot ] = useCollection(userQueryInfo) 

  const createChat = () => {
    const input = prompt('Please enter an email address for the user you wish to chat with: ')
    if(!input) return  
    if(EmailValidator.validate(input) && input != user.email && !chatAlreadyExists(input)) {
        const chatInfo = collection(db,'chats'); 
        
        // addDoc lets Cloud Firestore auto-generate an ID for you
        // setDoc must include id
        addDoc(chatInfo , {
          users: [user.email, input], // sender and recepient 

        })

        alert("New chat created!")
    }else{
        alert("User already exists in your chat list!")
    } 
  } 

  const chatAlreadyExists = (recipientEmail) => (
    // returns true or false
    !!chatsSnapshot?.docs.find( ( chat ) => chat.data().users.find( ( isUser ) => isUser === recipientEmail ) )
  )

  return (
    <Container>
      <Header>
        <UseAvatar referrerPolicy="whatsappclonedevpoint.firebaseapp.com" src={user.photoURL} onClick={() => auth.signOut()}/>

        <IconsContainer>
          <IconButton>
            <ChatIcon/>
          </IconButton>
          <IconButton> 
            <MoreVertIcon/>
          </IconButton>
          <IconButton style={{ color: "red" }} onClick={() => { confirm("Log out?") && auth.signOut() }}>
            <ExitToAppIcon/>
          </IconButton>
        </IconsContainer>
      </Header> 

      <Search>
        <SearchIcon/>
        <SearchInput value={wordToBeSearched} onChange={(e) => setWordToBeSearched(e.target.value)} placeholder="Search in chats"/>
      </Search>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {/* TODO: List of Chats */}
      { chatsSnapshot?.docs.map( ( chat ) =>  (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  )
}


export default Sidebar

const Container = styled.div` 

`

const Search = styled.div`  
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`

const SearchInput = styled.input` 
  outline-width: 0;
  border: none;
  flex: 1;
`
const SidebarButton = styled(Button)`
  width: 100%; 

  &&& { 
    border-top: 1px solid #E3E3E3;
    border-bottom: 1px solid #E3E3E3;
  }
`

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid #E3E3E3;
`

const UseAvatar = styled(Avatar)`
  cursor: pointer;

  &&& {
    color: whitesmoke;
    background-color: burlywood; 
  }

  :hover {
    opacity: 0.8;
  }
`

const IconsContainer = styled.div`
  
`
