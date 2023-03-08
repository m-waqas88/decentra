import { gql } from "@apollo/client";

export const GET_MY_POSTS = gql`
query ($profileID: ProfileID!, $me: AddressEVM!){
  profileByID(profileID: $profileID){
    essences{
      totalCount
      edges {
        node {
          essenceID
          name
          symbol
          tokenURI
          metadata {
            content
            image
            issue_date
          }
          isCollectedByMe(me: $me)
        }
      }
    }
  }
}
`;