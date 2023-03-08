import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import PostCard from "src/components/PostCard"
import MyPostCard from "src/components/MyPostCard"
import { GET_POSTS } from "../../graphql/GetPosts";
import { GET_MY_POSTS } from "../../graphql/GetMyPosts";
import { useContext } from "react";
import { globalContext } from "context/globalContext";
import { GET_PROFILE } from "../../graphql/GetProfile";
import { useRouter } from "next/router";


const Posts = () => { 
  const router = useRouter();
  const { connectedAccount } = useContext(globalContext);
  const [accessToken, setAccessToken] = useState("");
  const client = useApolloClient();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [myFilteredPosts, setMyFilteredPosts] = useState([]);
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
    const getMyPosts = async () => {
      const posts = await client.query({
        query: GET_MY_POSTS,
        variables: {
          profileID: 260,
          me: account,
        }
      });
      return posts?.data?.profileByID?.essences?.edges;
    }
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken){
      setAccessToken(accessToken);
      getPosts().then((res) => {
          setFilteredPosts(res)
      });
      getMyPosts().then((res) => {
          setMyFilteredPosts(res)
      });
    }
    const { newPost } = router.query;
    // if(newPost) window.location.reload();
  });

  return (
    <>
      <h1 className="text-center font-bold text-3xl mb-5">All Posts</h1>
      <div className="flex flex-col items-center">
        {
          accessToken ? (myFilteredPosts.length != 0) && myFilteredPosts.map((post, index) => {
            const { tokenURI, essenceID } = post?.node;
            const metadata = post?.node?.metadata;
            const isCollectedByMe = post?.node?.isCollectedByMe;
            if(metadata != null && index > 10){
              const { content, image, issue_date } = post?.node?.metadata;
              return <PostCard key={essenceID} {...{essenceID,tokenURI, content, image, issue_date, isCollectedByMe}} />
            }
          })
          : (<p>You need to sign in to view posts.</p>)
        }
      </div>
      <h1 className="text-center font-bold text-3xl mb-5">My Collected Posts</h1>
      <div className="flex flex-col items-center">
        {
          accessToken ? (myFilteredPosts.length != 0) && myFilteredPosts.map((post, index) => {
            const { tokenURI, essenceID } = post?.node;
            const metadata = post?.node?.metadata;
            const isCollectedByMe = post?.node?.isCollectedByMe;
            if(metadata != null && index > 10 && isCollectedByMe){
              const { content, image, issue_date } = post?.node?.metadata;
              return <MyPostCard key={essenceID} {...{content, image, issue_date, isCollectedByMe}} />
            }
          })
          : (<p>You need to sign in to view posts.</p>)
        }
      </div>
    </>
  );

}

export default Posts;