import { useState } from "react";
import CreatePostButton from "@/components/CreatePostButton";
import { Puff } from 'react-loading-icons';


const CreatePostForm = () => {
    const [postInput, setPostInput] = useState({
        nftImageUrl: "",
        content: "",
    });
    const [loadingStatus, setLoadingStatus] = useState(false);


    // Yaha sey kal dobara continue krna hai
    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPostInput({
            ...postInput,
            [name]: value,
        });
    }
    return (
        <div className="flex justify-center">
            <div className="flex w-1/3 flex-col shadow-2xl p-6">
            <h2 className="text-center font-bold text-3xl mb-5">Create Post</h2>
            <div className="mb-3">
                <label>NFT Image URL</label>
                <input
                    name="nftImageUrl"
                    value={postInput.nftImageUrl}
                    onChange={handleOnChange}
                    className="ml-4 bg-transparent border-b"
                ></input>
            </div>
            <div className="mb-3">
                <label>Content</label>
                <textarea
                    name="content"
                    value={postInput.content}
                    onChange={handleOnChange}
                    className="ml-4 bg-transparent border-b"
                ></textarea>
            </div>
            {
                !loadingStatus ? (
                    <CreatePostButton {...{nftImageUrl: postInput.nftImageUrl, content: postInput.content,loadingStatus, setLoadingStatus}} />
                ):
                <Puff />
            }
        </div>
        </div>
    )
}

export default CreatePostForm;