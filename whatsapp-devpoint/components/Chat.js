import { Avatar } from "@material-ui/core"
import { collection, query, where } from 'firebase/firestore'
import { useRouter } from "next/router"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import styled from "styled-components"
import { auth, db } from '../firebase'
import getRecipientEmail from '../utils/getRecipientEmail'

function Chat({ id, users }) { 
    const router = useRouter()
    const [ user ] = useAuthState(auth)  
    
    const queryRecipient = query( collection( db, 'users' ), where( 'email', '==', getRecipientEmail( users, user ) ))
    const [ recipientSnapshot ] = useCollection(queryRecipient)

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data()
    const recipientEmail = getRecipientEmail( users, user )   
    
    // console.log(recipient?.photoURL) 

    return (
        <Container onClick={enterChat}>
            { recipient ? (
                <UserAvatar referrerPolicy="no-referrer" src={recipient?.photoURL} /> 
            ): (
                <UserAvatar>{recipientEmail[0].toUpperCase()}</UserAvatar>
            )}
            <p>{recipientEmail}</p>
        </Container>
    )
}

export default Chat

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-word;

    :hover {
        background-color: #E9EAEB;
    }
`

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`