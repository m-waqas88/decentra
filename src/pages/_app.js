import '@/styles/globals.css'
import { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from 'apollo';
import NavBar from "@/components/NavBar"
import { globalContext } from 'context/globalContext';

export default function App({ Component, pageProps }) {

  const [walletStatus, setWalletStatus] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [connectedAccount, setConnectedAccount] = useState("");

  useEffect(() => {
    const { ethereum } = window;
    if(ethereum){
      window.ethereum.on("accountsChanged", () => {
        console.log("account changed");
        localStorage.removeItem("walletStatus");
        if(walletStatus) window.location.reload();
      })
    }
  }, [walletStatus]);

  return (
    <globalContext.Provider value={{
        walletStatus, 
        setWalletStatus,
        accessToken,
        setAccessToken,
        connectedAccount,
        setConnectedAccount,
      }}>
      <ApolloProvider client={apolloClient}> 
        <NavBar />
        <Component {...pageProps} />
      </ApolloProvider>
    </globalContext.Provider>
  )
}

export { globalContext }


/*
   const isWalletConnected = async(ethereum) => {
      try{
          if(!ethereum) {
            console.log("Please connect wallet");
            return
          }
          const accounts = await ethereum.request({
              method: "eth_accounts"
          });
          if(accounts.length){
            return true;
          }
          return false;     
      }catch(error){
        reportError(error)
      }
  }
 */