import { gql } from "@apollo/client";

const USER_QUERY = gql`
    query User($username: String!) {
        user(login: $username) {
            name
            avatarUrl
            bio
            repositories {
                totalCount
            }
        }
    }
`;

export default USER_QUERY;






