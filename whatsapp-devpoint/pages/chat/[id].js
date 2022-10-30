import { collection, doc, getDoc, getDocs, orderBy } from 'firebase/firestore'
import Head from "next/head"
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from "styled-components"
import ChatScreen from "../../components/ChatScreen"
import Sidebar from "../../components/Sidebar"
import { db, auth } from '../../firebase'
import getRecipientEmail from '../../utils/getRecipientEmail'

function Chat({ chat, messages }) {
    const [ user ] = useAuthState(auth)


    return (
        <Container>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users, user)} | DevPoint Messenger</title>
            </Head>
            <Sidebar/>
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages}/>
            </ChatContainer>
        </Container>
    )
}

export default Chat

export async function getServerSideProps(context) {
    const chatRef =  doc( db, 'chats', context.query.id)

    //Prep the chat on the Server
    const chatDoc = await getDoc(chatRef, orderBy('timestamp', 'asc'))
    const chat = {
        id: chatDoc?.id,
        ...chatDoc?.data()
    } 

    //Prep the messages on the Server

    const querySnapshot = await getDocs(collection(chatRef, 'messages'))

    const messages = []

    querySnapshot.forEach((doc) => {
        messages.push({ 
            id: doc.id,
            timestamp: doc.data().timestamp?.toDate().getTime(),
            ...doc.data() 
        })
    })  

    return { 
        props: { 
            chat: chat, 
            messages: JSON.stringify(messages)
        } 
    }
}

const Container = styled.div`  
    display: flex;
    
`

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh; 

    ::-webkit-scrollbar {
        display: none;  /*  Chrome  */
    }
    -ms-overflow-style: none; /* IE & Edge */ 
    scrollbar-width: none; /* FireFox */
`