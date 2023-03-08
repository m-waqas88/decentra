import { useEffect, useState } from "react";
import CollectButton from "src/components/CollectButton";
import { useContext } from "react";
import { globalContext } from "context/globalContext";
import { Puff } from 'react-loading-icons';


const MyPostCard = ({content, image, issue_date, isCollectedByMe}) => {
  const { connectedAccount } = useContext(globalContext);

  return (
    <>
      {image && (
        <div className="flex flex-col w-1/2 items-center mb-4 shadow-2xl rounded-2xl p-6">
          <img src={image} alt="cover-photo" height="400" width="400"/>
          <p className="text-justify my-4">{content}</p>
      </div>
      )
        
      }
    </>
  );

}

export default MyPostCard;