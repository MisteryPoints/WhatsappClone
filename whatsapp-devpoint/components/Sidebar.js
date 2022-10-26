import { Avatar } from "@material-ui/core"
import styled from "styled-components"

function Sidebar() {
  return (
    <Container>
        <Header>
            <UseAvatar />
        </Header> 
    </Container>
  )
}

export default Sidebar

const Container = styled.div` 

`

const Header = styled.div`

`

const UseAvatar = styled(Avatar)`
`