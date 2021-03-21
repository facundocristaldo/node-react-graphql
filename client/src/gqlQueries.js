import gql from "graphql-tag";
import { jobDetailsFragment } from './gqlFragments';

export const companyQuery = gql`
    query CompanyQuery($id:ID!){
      company(id:$id){
          id
          name
          description
          jobs {
            id
            title
          }
      }
    }
  `
export const JobQuery = gql`
  query JobQuery($id:ID!){
      job(id:$id){
        ...JobDetails
      }
    }
  ${jobDetailsFragment}
`
export const JobsQuery = gql`
  query JobsQuery{
    jobs{
      id
      title
      company{
        name
      }
    }
  }
`