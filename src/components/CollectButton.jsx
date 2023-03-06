import { getGlobalState, setGlobalState, useGlobalState } from "context/globalContext";
import { ethers } from "ethers";

const CollectButton = ({profileID, essenceID, isCollectedByMe}) => {

    const [accessToken] = useGlobalState("accessToken");

    const handleClick = async () => {
        const { ethereum }  = window;
        const account = getGlobalState("connectedAccount")
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            PROFILE_NFT_CONTRACT,
            ProfileNFTABI,
            signer
        );
        const tx = await contract.collect(
            {
                collector: account,
                profileId: profileID,
                essenceId: essenceID
            },
            0x0,
            0x0
        );
        await tx.wait(1);
        console.log(`Transaction: ${tx}`);
    }
    return (
        <button onClick={handleClick}>Collect</button>
    )
}

export default CollectButton;