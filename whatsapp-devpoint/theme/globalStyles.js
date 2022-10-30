import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0; 
    font-family: Nunito, Helvetica, Sans-Serif;
    
    ::-webkit-scrollbar {
        display: none;  /*  Chrome  */
    }
    -ms-overflow-style: none; /* IE & Edge */ 
    scrollbar-width: none; /* FireFox */ 
  }
`
 
export default GlobalStyle;