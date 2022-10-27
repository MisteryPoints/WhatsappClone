import { Avatar, IconButton } from "@material-ui/core"
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import styled from "styled-components"

function Sidebar() {
  return (
    <Container>
      <Header>
        <UseAvatar />

        <IconsContainer>
          <IconButton>
            <ChatIcon/>
          </IconButton>
          <IconButton> 
            <MoreVertIcon/>
          </IconButton>
        </IconsContainer>
      </Header> 
    </Container>
  )
}

export default Sidebar

const Container = styled.div` 

`

const Header = styled.div`
  display: flex;
  position: sticky;
`

const UseAvatar = styled(Avatar)`
  margin: 10px;
`

const IconsContainer = styled.div`

`
