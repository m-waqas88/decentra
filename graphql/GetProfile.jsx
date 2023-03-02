import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
    query address($address: AddressEVM!) {
        address(address: $address) {
            address
            wallet {
                primaryProfile {
                    profileID
                    handle
                }
            }
        }
    }
`;