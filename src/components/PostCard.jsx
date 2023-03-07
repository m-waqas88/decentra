import { useEffect, useState } from "react";
import CollectButton from "src/components/CollectButton";
import { useContext } from "react";
import { globalContext } from "context/globalContext";
import { Puff } from 'react-loading-icons';


const PostCard = ({essenceID,tokenURI, content, image, issue_date}) => {
  const { connectedAccount } = useContext(globalContext);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [profileID, setProfileID] = useState("");
  useEffect(() => {
    const profileid = JSON.parse(localStorage.getItem(connectedAccount)).profileId; 
    setProfileID(profileid);
  }, []);

  return (
    <>
      {image && (
        <div className="flex flex-col w-1/2 items-center mb-4 shadow-2xl rounded-2xl p-6">
          <img src={image} alt="cover-photo" height="400" width="400"/>
          <p className="text-justify my-4">{content}</p>

          {
            !loadingStatus ? (
              <CollectButton {...{profileID,essenceID, loadingStatus, setLoadingStatus}} />
            ):
            <Puff />
          }
      </div>
      )
        
      }
    </>
  );

}

export default PostCard;