import { ethers } from "ethers";
import { useMutation, useApolloClient} from "@apollo/client";
import { LOGIN_GET_MESSAGE } from "../../graphql/LoginGetMessage";
import { LOGIN_VERIFY } from "../../graphql/LoginVerify";
import { GET_PROFILE } from "../../graphql/GetProfile";
import { useContext } from "react";
import { globalContext } from "context/globalContext";

const SigninButton = () => {
    const { walletStatus, setAccessToken, connectedAccount } = useContext(globalContext);
    const [loginGetMessage] = useMutation(LOGIN_GET_MESSAGE);
    const [loginVerify] = useMutation(LOGIN_VERIFY);
    const client = useApolloClient();
    const handleClick = async () => {
        if(!walletStatus) return;
        const { ethereum }  = window;
        const account = connectedAccount;
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
        setAccessToken(accessToken);
        const profilesResult = await client.query({
            query: GET_PROFILE,
            variables: {
                address: account,
            }
        });
        const primaryProfiles = profilesResult?.data?.address?.wallet?.primaryProfile;        
        const profileObject = JSON.stringify({
            profileId: primaryProfiles.profileID.toString(),
            profileHandle: primaryProfiles.handle,
        });
        localStorage.setItem(account, profileObject);
    }
    
    return <button onClick={handleClick} className="px-4 mx-1 bg-black text-white rounded-2xl">Sign In</button>

}

export default SigninButton;