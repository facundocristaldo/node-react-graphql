import gql from "graphql-tag";

export const jobDetailsFragment = gql`
  fragment JobDetails on Job{
  id
  title
  description
  company {
    id
    name
  }
}
`