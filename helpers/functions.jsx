import axios from "axios";
import { Web3Storage } from "web3.storage";
// import { useRouter } from "next/router";

// const router = useRouter();
const client = new Web3Storage({ token: process.env.WEB3_API_TOKEN });

export const pinJSONToIPFS = async(json) => {
    const data = JSON.stringify(json);
    const blob = new Blob([data], { type: 'application/json' });
    const jsonFile = new File([blob], 'meta.json');
    try {
        const cid = await client.put([jsonFile]);
        return cid;
    }catch(error){
        console.log(error);
    }
}

/*

const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
const apiSecret = process.env.NEXT_PUBLIC_API_SECRET || "";

export const pinJSONToIPFS = async(json) => {
    const data = JSON.stringify(json);
    const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

    return axios
        .post(
            url,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    pinata_api_key: apiKey,
                    pinata_secret_api_key: apiSecret,
                },
            }
        )
        .then((response) => response.data.IpfsHash)
        .catch((error) => {
            throw error
        });
}

*/