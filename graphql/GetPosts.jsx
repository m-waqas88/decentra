import { gql } from "@apollo/client";

export const GET_POSTS = gql`
query {
    profileByID(profileID: 260){
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
          }
        }
      }
    }
  }
`;