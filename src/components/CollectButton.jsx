import { ethers } from "ethers";
import { useContext } from "react";
import { globalContext } from "context/globalContext";
import { PROFILE_NFT_CONTRACT } from "helpers/constants";
import ProfileNFTABI from "../../abi/ProfileNFT.json";

const CollectButton = ({profileID, essenceID, isCollectedByMe}) => {
    const { connectedAccount } = useContext(globalContext);
    console.log(essenceID);

    const handleClick = async () => {
        const { ethereum }  = window;
        const account = connectedAccount;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            PROFILE_NFT_CONTRACT,
            ProfileNFTABI,
            signer
        );
        await contract.collect(
            {
                collector: account,
                profileId: Number(profileID),
                essenceId: essenceID
            },
            0x0,
            0x0,
            {
                gasLimit: 3000000,
            }
        )
        .then(async (tx) => {
            await tx.wait(1);
            console.log(`Transaction: ${tx}`);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    return (
        <>
            <button className="px-4 mx-1 bg-black text-white rounded-2xl" onClick={handleClick} disabled={!profileID}>Collect</button>
            {
                !profileID && (
                    <p>In order to collect the post, you must create a profile!</p>
                )
            }
        </>
    )
}

export default CollectButton;