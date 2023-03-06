// import CollectButton from "src/components/CollectButton";

const PostCard = ({essenceID,tokenURI, content, image, issue_date}) => {

  console.log(image);

  return (
    <>
      {image && (
        <div>
          <img src={image} alt="cover-photo" height="200" width="200"/>
          <p>{content}</p>

          {/* <CollectButton 
            profileId={"profileID"}
            essenceID={"essenceID"}
            isCollectedByMe={"isCollectedByMe"}
          /> */}
      </div>
      )
        
      }
    </>
  );

}

export default PostCard;