import { CartContextProvider } from "@/components/CartContext";
import {createGlobalStyle} from "styled-components";
import { SessionProvider } from "next-auth/react"

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400..800&display=swap');
  body{
    background-color: #fff;
    padding:0;
    margin:0;
    font-family: "Syne", sans-serif;
  }
`;

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}> 
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
      
    </>
  );
}