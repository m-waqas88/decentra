import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import PostCard from "src/components/PostCard"
import { GET_POSTS } from "../../graphql/GetPosts";
import { useContext } from "react";
import { globalContext } from "context/globalContext";

const Posts = () => {
  const { connectedAccount, accessToken } = useContext(globalContext);
  const client = useApolloClient();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const account = connectedAccount;
  
  useEffect(() => {

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
  }, []);

  return (
    <>
      <div>
        <h1>Posts</h1>
        {
          accessToken ? (filteredPosts.length != 0) && filteredPosts.map((post, index) => {
            const { tokenURI, essenceID } = post?.node;
            const metadata = post?.node?.metadata;
            if(metadata != null){
              const { content, image, issue_date } = post?.node?.metadata;
              return <PostCard key={essenceID} {...{essenceID,tokenURI, content, image, issue_date}} />
            }
          })
          : (<p>You need to sign in to view posts.</p>)
        }
      </div>
    </>
  );

}

export default Posts;