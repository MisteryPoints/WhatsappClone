import moment from "moment/moment";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";

function Message({ user, messages }) { 
    const [ userLoggedIn ] = useAuthState(auth)
    
    const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

    return (
        <Container>
            <TypeOfMessage>{messages.message}
                <Timestamp>{ messages.timestamp ? moment(messages.timestamp).format('LT') : '...' }</Timestamp>
            </TypeOfMessage>
        </Container>
    )
}

export default Message

const Container = styled.div`

`

const MessageElement = styled.p`
    width: fit-content;
    padding: 10px 15px; 
    border-radius: 8px;
    margin: 10px;
    min-width: 60px;
    padding-bottom: 26px;
    position: relative;
    text-align: left;  

    :hover {
        opacity: 0.8;
        cursor: default;
    }
    
`

const Sender = styled(MessageElement)`
    margin-left: auto;
    background-color: #DCF8C6;

`

const Reciever = styled(MessageElement)`
    text-align: left;
    background-color: whitesmoke;

`

const Timestamp = styled.span`
    color: gray;
    padding: 5px;
    font-size: 9px;
    position: absolute;
    bottom: 0;
    text-align: right;
    right: 0; 
`