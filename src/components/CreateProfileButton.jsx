import { useRouter } from "next/router";
import { PROFILE_NFT_CONTRACT, PROFILE_NFT_OPERATOR } from "helpers/constants";
import { pinJSONToIPFS } from "helpers/functions";
import { ethers } from "ethers";
import ProfileNFTABI from "../../abi/ProfileNFT.json";
import { useContext } from "react";
import { globalContext } from "context/globalContext";

const CreateProfileButton = ({handle, avatar, name, bio, setLoadingStatus}) => {
    const { connectedAccount } = useContext(globalContext);
    const router = useRouter();
    const handleClick = async () => {
        try{
            setLoadingStatus(true);
            const { ethereum } = window;
            const account = connectedAccount;
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
                {
                    gasLimit: 3000000,
                }
            );
            await tx.wait(2);
            const profileId = await contract.getProfileIdByHandle(handle);
            console.log(`Transaction hash: ${tx.hash} and ProfileId: ${profileId}`);
            setLoadingStatus(false);
            router.push("/");
        }catch(error){
            reportError(error);
        }
        setLoadingStatus(false);
    }
    return (
        <button className="mx-1 bg-black text-white rounded-2xl w-1/2 px-4 py-2" onClick={handleClick}>Create Profile</button>
    )
}

export default CreateProfileButton;