import { ethers } from "ethers";
import { useContext } from "react";
import { globalContext } from "context/globalContext";
import { PROFILE_NFT_CONTRACT } from "helpers/constants";
import ProfileNFTABI from "../../abi/ProfileNFT.json";

const CollectButton = ({profileID, essenceID, setLoadingStatus, isCollectedByMe}) => {
    const style = {
        backgroundColor: "Gray"

    }
    const { connectedAccount } = useContext(globalContext);
    const handleClick = async () => {
        setLoadingStatus(true);
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
                profileId: 260,
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
            setLoadingStatus(false)
            console.log(`Transaction: ${tx.hash}`);
        })
        .catch((error) => {
            setLoadingStatus(false);
            console.log(error);
        });
    }
    return (
        <>
            <button style={isCollectedByMe || !profileID ? style : {}} className="px-4 mx-1 bg-black text-white rounded-2xl" onClick={handleClick} disabled={!profileID || isCollectedByMe}>{isCollectedByMe ? "Collected" : "Collect"}</button>
            {
                !profileID && (
                    <p className="text-sm border border-red-800 px-4 py-2 mt-2 text-white">In order to collect the post, you must create a profile!</p>
                )
            }
        </>
    )
}

export default CollectButton;