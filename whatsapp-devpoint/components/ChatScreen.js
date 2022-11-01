import { Avatar, IconButton } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { addDoc, collection, doc, orderBy, serverTimestamp, setDoc, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useState, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from "react-firebase-hooks/firestore"
import styled from "styled-components"
import { auth, db } from '../firebase'
import getRecipientEmail from '../utils/getRecipientEmail'
import Message from './Message'
import TimeAgo from 'timeago-react'  


function ChatScreen({ chat, messages }) {
    const [ user ] = useAuthState(auth)
    const [ input, setInput ] = useState('')
    const endOfMessagesRef = useRef(null)
    const router = useRouter()
    const queryMessages = query(collection(doc(db, 'chats', router.query.id), 'messages'), orderBy('timestamp', 'asc')) 
    const [ messagesSnapshot ] = useCollection(queryMessages)
    const queryRecipient = query( collection( db, 'users' ), where( 'email', '==', getRecipientEmail( chat.users, user ) ))
    const [ recipientSnapshot ] = useCollection(queryRecipient)
      

    const showMessages = () => {
        if (messagesSnapshot) { 
            return messagesSnapshot.docs.map(messages => {
                console.log(messages.data())
                return(
                <Message key={messages.id} user={messages.data().user} messages={{
                    ...messages.data(),
                    timestamp: messages.data().timestamp?.toDate().getTime(),
                }} /> 
            )})
        } else {
            return JSON.parse(messages).map(message => (
                <Message key={message.id} user={message.user} messages={message} /> 
            ))
        }
        scrollToBottom( )
    } 

    const scrollToBottom = () => {
        endOfMessagesRef?.current?.scrollIntoView({
            behavior:'smooth',
            block: 'start',
        })
    }

    const sendMessage = (e) => {
        e.preventDefault()
        
        setDoc(doc(db, 'users', user.uid), {
                lastSeen: serverTimestamp(), 
            }, { merge : true }
        )

        addDoc(collection(doc(db, 'chats', router.query.id), 'messages'), {
            timestamp: serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        })

        setInput('')
        scrollToBottom( )
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data()
    const recipientEmail = getRecipientEmail(chat.users, user) 

    return (
        <Container> 
            <Header>
                { recipient ? (
                    <Avatar referrerPolicy="no-referrer" src={recipient.photoURL} alt={recipient.name} />
                ) : (
                    <Avatar>{recipientEmail[0].toUpperCase()}</Avatar>
                )}
                <HeaderInfo>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>Last active: {' '} {recipient?.lastSeen?.toDate() ? (
                            <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                        ) : "Unavailable" }</p>
                    ) : (
                        <p>Loading Last active...</p>
                    )} 
                </HeaderInfo>
                <HeaderIcons>
                    <IconButton> 
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton> 
                        <MoreVertIcon/>
                    </IconButton>
                </HeaderIcons>
            </Header>

            <MessageContainer>
                {showMessages()}
                <EndOfMessages ref={endOfMessagesRef}/>
                {scrollToBottom()}
            </MessageContainer>

            <InputContainer>
                <InsertEmoticonIcon/>
                <Input value={input} onChange={e => setInput(e.target.value)}/>
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
                <MicIcon/>
            </InputContainer> 
        </Container> 
    )
}

export default ChatScreen 

const Container = styled.div` 
    ::-webkit-scrollbar {
        display: none;  /*  Chrome  */
    }
    -ms-overflow-style: none; /* IE & Edge */ 
    scrollbar-width: none; /* FireFox */ 
`


const Input = styled.input` 
    flex:1;
    align-items: center;
    padding: 15px;
    position: sticky;
    bottom: 0;
    background-color: whitesmoke; 
    outline: none;
    border: 1px solid #E3E3E3;
    border-radius: 10px;
    margin: 0 10px;
`

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;
    border-top: 1px solid #E3E3E3; 
    box-shadow: 0 -3.5px 1px rgba(0, 0, 0, 0.1);
    border-left: 1px solid #E3E3E3;
`

const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 12px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid #E3E3E3;
    border-left: 1px solid #E3E3E3;
`

const HeaderInfo = styled.div` 
    margin-left: 15px;
    flex: 1;

    > h3 {
        margin-bottom: 3px;
        margin-top: 0;
    }
    > p {
        font-size: 14px;
        margin: 0;
        color: gray;
    }
` 


const EndOfMessages = styled.div`
    margin-bottom: 50px;
`

const HeaderIcons = styled.div` 
`

const MessageContainer = styled.div`
    padding: 30px;
    background-color: #E5DED8;
    min-height: 100vh;
`
