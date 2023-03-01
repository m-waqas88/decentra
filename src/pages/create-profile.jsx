import { useState } from "react";
import CreateProfileButton from "@/components/CreateProfileButton";

const CreateProfileForm = () => {
    const [profileInput, setProfileInput] = useState({
        handle: "",
        name: "",
        bio: "",
        avatar: "",
    });
    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProfileInput({
            ...profileInput,
            [name]: value,
        });
    }
    return (
        <div className="form signup-form">
            <h2>Create profile</h2>
            <div>
                <label>Handle (w/o @)</label>
                <input
                    name="handle"
                    value={profileInput.handle}
                    onChange={handleOnChange}
                ></input>
            </div>
            <div>
                <label>Avatar URL</label>
                <input
                    name="avatar"
                    value={profileInput.avatar}
                    onChange={handleOnChange}
                    placeholder="https://"
                ></input>
            </div>
            <div>
                <label>Name</label>
                <input
                    name="name"
                    value={profileInput.name}
                    onChange={handleOnChange}
                ></input>
            </div>
            <div>
                <label>Bio</label>
                <textarea
                    name="bio"
                    value={profileInput.bio}
                    onChange={handleOnChange}
                ></textarea>
            </div>
            <CreateProfileButton {...profileInput} />
        </div>
    )
}

export default CreateProfileForm;