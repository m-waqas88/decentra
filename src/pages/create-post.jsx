import { useState } from "react";
import CreatePostButton from "@/components/CreatePostButton";

const CreatePostForm = () => {
    const [postInput, setPostInput] = useState({
        nftImageUrl: "",
        content: "",
    });

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
        <div className="form create-post-form">
            <h2>Create Post</h2>
            <div>
                <label>NFT Image URL</label>
                <input
                    name="nftImageUrl"
                    value={postInput.nftImageUrl}
                    onChange={handleOnChange}
                ></input>
            </div>
            <div>
                <label>Content</label>
                <textarea
                    name="content"
                    value={postInput.content}
                    onChange={handleOnChange}
                ></textarea>
            </div>
            <CreatePostButton {...postInput} />
        </div>
    )
}

export default CreatePostForm;