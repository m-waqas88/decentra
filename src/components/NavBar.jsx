import Link from "next/link";
import SigninButton from "@/components/SigninButton";
import { useContext, useState, useEffect } from "react";
import { globalContext } from "context/globalContext";

const NavBar = () => {
  const { setConnectedAccount, connectedAccount, walletStatus, setWalletStatus } = useContext(globalContext);
  const [accessToken, setAccessToken] = useState("");
  const connectWallet = async() => {
    const { ethereum } = window;
    try{
        if (!ethereum) {
            console.log("Please install metamask browser extension");
            return;
        }
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        const connectedAccount = accounts[0].toLowerCase();
        setConnectedAccount(connectedAccount);
        setWalletStatus(true);
    }catch(error){
        console.log(error);
    }
  }

  const formattedAddressFirstPart = connectedAccount.slice(0, 6);
  const formattedAddressLastPart = connectedAccount.slice(connectedAccount.length - 6, connectedAccount.length);
  const formattedAddress = formattedAddressFirstPart + "--" + formattedAddressLastPart;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken){
      setAccessToken(accessToken);
    }
  }, []);

  return (
    <>
      <nav className="flex justify-center items-center">
        <Link href="/" id="logo" className="px-4">
          <img src="https://ipfs.cyberconnect.dev/ipfs/bafkreidfuroyoaexexzg6vgasw4hcdmmwvdazfsvlask3wvb3psk5jshce" className="h-20 rounded-3xl"/>
        </Link>
        <button onClick={connectWallet} className="px-4 mx-1 bg-black text-white rounded-2xl" disabled={walletStatus}>
        {walletStatus ? formattedAddress : "Connect Wallet"}
        </button>
        {
          (!accessToken && walletStatus) && (
            <SigninButton />
          )
        }
        {
          accessToken && walletStatus && (
            <>
              <Link href="/create-profile" className="px-4">
                Create Profile
              </Link>
              <Link href="/create-post" className="px-4">
                Create Post
              </Link>
            </>
          )
        }
      </nav>
    </>
  );
}

export default NavBar;