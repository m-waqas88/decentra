import { useEffect } from "react";
import { getGlobalState, setGlobalState, useGlobalState } from "context";
import { useMutation, useLazyQuery } from "@apollo/client";
import { LOGIN_GET_MESSAGE } from "../../graphql/LoginGetMessage";
import { LOGIN_VERIFY } from "../../graphql/LoginVerify";
import { GET_PROFILE } from "../../graphql/GetProfile";

// blockchain bridge
import { ethers } from "ethers";

const connectWallet = async() => {
    try{
        if (!ethereum) {
            console.log("Please install metamask browser extension");
            return;
        }
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        const connectedAccount = accounts[0].toLowerCase();
        setGlobalState("connectedAccount", connectedAccount);
        console.log(connectedAccount);
    }catch(error){
        console.log(error);
    }
}

const isWalletConnected = async() => {
    try{
        if(!ethereum) console.log("Please connect wallet");
        const accounts = await ethereum.request({
            method: "eth_accounts"
        });
        if(accounts.length){
            setGlobalState("connectedAccount", accounts[0]);
        }else{
            connectWallet();
        }
    }catch(error){reportError(error)}
}


const SigninButton = () => {

    const [accessToken] = useGlobalState("accessToken");
    const [loginGetMessage] = useMutation(LOGIN_GET_MESSAGE);
    const [loginVerify] = useMutation(LOGIN_VERIFY);
    const [getProfile] = useLazyQuery(GET_PROFILE);

    useEffect(() => {
        isWalletConnected();
    });

    const handleClick = async () => {
        const { ethereum }  = window;
        const account = getGlobalState("connectedAccount")
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const messageResult = await loginGetMessage({
            variables: {
                input: {
                    address: account,
                    domain: "test.com"
                }
            }
        });
        const message = messageResult?.data?.loginGetMessage?.message;
        const signature = await signer.signMessage(message);
        const accessTokenResult = await loginVerify({
            variables: {
                input: {
                    address: account,
                    domain: "test.com",
                    signature: signature,
                }
            }
        });
        const accessToken = accessTokenResult?.data?.loginVerify?.accessToken;
        localStorage.setItem("accessToken", accessToken);
        setGlobalState("accessToken", accessToken);
        console.log(accessToken);
        const profilesResult = await getProfile({
            variables: {
                address: account,
            }
        });
        const primaryProfiles = profilesResult?.data?.address?.wallet?.primaryProfile;        const profileId = primaryProfiles.profileID.toString();
        const profileObject = JSON.stringify({
            profileId: primaryProfiles.profileID.toString(),
            profileHandle: primaryProfiles.handle,
        });
        localStorage.setItem(account, profileObject);
    }
    return (
        <button onClick={handleClick}>Sign in</button>
    )
}

export default SigninButton;