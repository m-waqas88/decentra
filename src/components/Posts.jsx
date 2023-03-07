import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import PostCard from "src/components/PostCard"
import { GET_POSTS } from "../../graphql/GetPosts";
import { useContext } from "react";
import { globalContext } from "context/globalContext";
import { GET_PROFILE } from "../../graphql/GetProfile";
import { useRouter } from "next/router";

const Posts = () => {
  const router = useRouter();
  const { newPostCreated } = router.query;  
  const { connectedAccount, accessToken } = useContext(globalContext);
  const client = useApolloClient();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const account = connectedAccount;
  
  useEffect(() => {

    (async () => {
      const profilesResult = await client.query({
      query: GET_PROFILE,
      variables: {
          address: account,
      }
      });
      const primaryProfiles = profilesResult?.data?.address?.wallet?.primaryProfile;  
      if(primaryProfiles){
          const profileObject = JSON.stringify({
              profileId: primaryProfiles.profileID.toString(),
              profileHandle: primaryProfiles.handle,
          });
          localStorage.setItem(account, profileObject);
      }      
    })();
    const getPosts = async () => {
      const posts = await client.query({
        query: GET_POSTS,
      });
      return posts?.data?.profileByID?.essences?.edges;
    }

    const accessToken = localStorage.getItem("accessToken");
    if(accessToken){
      getPosts().then((res) => {
          setFilteredPosts(res)
      });
    }
  }, [newPostCreated]);

  return (
    <>
      <h1 className="text-center font-bold text-3xl mb-5">All Posts</h1>
      <div className="flex flex-col items-center">
        {
          accessToken ? (filteredPosts.length != 0) && filteredPosts.map((post, index) => {
            const { tokenURI, essenceID } = post?.node;
            const metadata = post?.node?.metadata;
            if(metadata != null && index > 10){
              console.log(index)
              const { content, image, issue_date } = post?.node?.metadata;
              return <PostCard key={essenceID} {...{essenceID,tokenURI, content, image, issue_date}} />
            }
          })
          : (<p>You need to sign in to view posts.</p>)
        }
      </div>
      <h1 className="text-center font-bold text-3xl mb-5">My Posts</h1>
      <div>
      </div>
    </>
  );

}

export default Posts;