import { createGlobalStyle } from "styled-components";
import globalVariables from "./variables";
import reset from "styled-reset";

const GlobalStyle = () => createGlobalStyle`
  ${reset}
  html {
    position: relative;
    min-height: 100%;
  }
  body{
    background-color:red;
  }
  a {
    color: inherit; /* blue colors for links too */
    text-decoration: inherit; /* no underline */
  }
`;
export default GlobalStyle;
