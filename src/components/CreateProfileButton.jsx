import { useEffect } from "react";
import { useRouter } from "next/router";
import { getGlobalState, setGlobalState, useGlobalState } from "context";
import { useMutation } from "@apollo/client";
import { PROFILE_NFT_CONTRACT, PROFILE_NFT_OPERATOR } from "helpers/constants";
import { pinJSONToIPFS } from "helpers/functions";
import { ethers } from "ethers";
import ProfileNFTABI from "../../abi/ProfileNFT.json";

const CreateProfileButton = ({handle, avatar, name, bio}) => {
    const router = useRouter();

    // useEffect(() => {
        
    // });

    const handleClick = async () => {
        try{
            const { ethereum } = window;
            const account = getGlobalState("connectedAccount")
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const metadata = {
                name,
                bio,
                handle,
                version: "1.0.0"
            }
            const ipfsHash = await pinJSONToIPFS(metadata);

            const contract = new ethers.Contract(
                PROFILE_NFT_CONTRACT,
                ProfileNFTABI,
                signer
            );

            const tx = await contract.createProfile(
                {
                    to: account,
                    handle,
                    avatar,
                    metadata: ipfsHash,
                    operator: PROFILE_NFT_OPERATOR,
                },
                0x0,
                0x0,
            );
            await tx.wait(2);
            const profileId = await contract.getProfileIdByHandle(handle);
            console.log(`Transaction hash: ${tx.hash} and ProfileId: ${profileId}`);
            router.push("/");
        }catch(error){
            reportError(error);
        }
        
    }

    return (
        <button onClick={handleClick}>Create Profile</button>
    )

}

export default CreateProfileButton;