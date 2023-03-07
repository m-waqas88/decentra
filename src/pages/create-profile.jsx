import { useState } from "react";
import CreateProfileButton from "@/components/CreateProfileButton";
import { Puff } from 'react-loading-icons';


const CreateProfileForm = () => {
    const [profileInput, setProfileInput] = useState({
        handle: "",
        name: "",
        bio: "",
        avatar: "",
    });
    const [loadingStatus, setLoadingStatus] = useState(false);

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProfileInput({
            ...profileInput,
            [name]: value,
        });
    }
    return (
        <div className="flex justify-center">
            <div className="flex w-1/3 flex-col shadow-2xl p-6">
                <h2 className="text-center font-bold text-3xl mb-5">Create profile</h2>
                <div className="mb-3">
                    <label className="">Handle (w/o @)</label>
                    <input
                        name="handle"
                        value={profileInput.handle}
                        onChange={handleOnChange}
                        className="ml-4 bg-transparent border-b"
                    ></input>
                </div>
                <div className="mb-3">
                    <label>Avatar URL</label>
                    <input
                        name="avatar"
                        value={profileInput.avatar}
                        onChange={handleOnChange}
                        placeholder="https://"
                        className="ml-4 bg-transparent border-b"
                    ></input>
                </div>
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        name="name"
                        value={profileInput.name}
                        onChange={handleOnChange}
                        className="ml-4 bg-transparent border-b"
                    ></input>
                </div>
                <div className="mb-3">
                    <label>Bio</label>
                    <textarea
                        name="bio"
                        value={profileInput.bio}
                        onChange={handleOnChange}
                        className="ml-4 bg-transparent border-b"
                    ></textarea>
                </div>
                {
                    !loadingStatus ? (
                        <CreateProfileButton {...{handle: profileInput.handle, avatar: profileInput.avatar, name: profileInput.name, bio: profileInput.bio, loadingStatus, setLoadingStatus}} />
                    ):
                    <Puff />
                }
            </div>
        </div>
    )
}

export default CreateProfileForm;