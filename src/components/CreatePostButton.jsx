import { useRouter } from "next/router";
import { getGlobalState, setGlobalState, useGlobalState } from "context";
import { pinJSONToIPFS } from "helpers/functions";
import { PROFILE_NFT_CONTRACT } from "helpers/constants";
import ProfileNFTABI from "../../abi/ProfileNFT.json";
import { ethers, utils } from "ethers";
import { v4 as uuidv4 } from "uuid";

const CreatePostButton = ({ nftImageUrl, content }) => {
    const router = useRouter();
    const accessToken = getGlobalState("accessToken");
    const handleClick = async () => {
        try {
            const { ethereum } = window;
            const account = getGlobalState("connectedAccount")
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const profile = JSON.parse(localStorage.getItem(account));
            const profileId = profile.profileId;
            const profileHandle = profile.profileHandle;
            const metadata = {
                metadata_id: uuidv4(),
                version: "1.0.0",
                app_id: "decentra-app",
                lang: "en",
                issue_date: new Date().toISOString(),
                content: content,
                media: [],
                tags: [],
                image: nftImageUrl ?? "",
                image_data: "",
                name: `@${profileHandle}'s post`,
                description: `@${profileHandle}'s post on Decentra`,
                aimation_url: "",
                external_url: "",
                attributes: [],
            }
            const ipfsHash = await pinJSONToIPFS(metadata);
            const contract = new ethers.Contract(
                PROFILE_NFT_CONTRACT,
                ProfileNFTABI,
                signer
            );
            const amount = ethers.utils.parseEther("0.15");

            const abiCoder = new utils.AbiCoder();

            const abiEncodedData = abiCoder.encode(
                [
                    "uint256",
                    "uint256",
                    "address",
                    "address",
                    "bool"
                ],
                [
                    1000,
                    amount,
                    account,
                    "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
                    false
                ]
            );
            const tx = await contract.registerEssence(
                {
                    profileId,
                    name: "Post",
                    symbol: "POST",
                    essenceTokenURI: ipfsHash,
                    essenceMw: "0x7FD80D2c47eD1f204851f2809f54f5A31E4d55a3",
                    transferable: true,
                    deployAtRegister: true,
                },
                abiEncodedData,
                {
                    gasLimit: 30000000,
                }
            );
            tx.wait(1);
            console.log(tx);
            console.log("Post created successfully");
            router.push("/");
        } catch (error) {
            reportError(error);
        }
    }
    return (
        <button onClick={handleClick}>Create Post</button>
    )
}

export default CreatePostButton;

// code related to transact via relay
/*
const typedData = typedDataResult?.data?.createRegisterEssenceTypedData?.typedData;
const message = typedData.data;
const typedDataId = typedData.id;
const params = [account, message];
const method = "eth_signTypedData_v4";
const signature = await signer.provider.send(method, params);
const relayResult = await relay({
    variables: {
        input: {
            typedDataId,
            signature,
        }
    }
});
const relayActionId = relayResult.data.relay.relayActionId;
const relayingPost = {
    createdBy: {
        handle,
        profileId,
    },
    essenceID: 0,
    tokenURI: `https://cyberconnect.mypinnata.cloud/ipfs/${ipfsHash}`,
    isIndexed: false,
    isCollectedByMe: false,
    collectedMw: undefined,
    relayActionId
};
localStorage.setItem(
    "relayingPosts",
    JSON.stringify([
        ...indexingPosts,
        relayingPost
    ])
);
*/
// typedData
/*
const typedDataResult = await createRegisterEssenceTypedData({
    variables: {
        input: {
            profileId,
            name: "Post",
            symbol: "POST",
            tokenURI: `https://cyberconnect.mypinnata.cloud/ipfs/${ipfsHash}`,
            middleware: {
                collectFree: true
            },
            transferable: true,
        }
    }
});
*/
