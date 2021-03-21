import gql from "graphql-tag";
import { jobDetailsFragment } from "./gqlFragments";

export const CreateJobMutation = gql`
mutation CreateJob($input:createJobInput){
  job: createJob(input:$input){
    ...JobDetails
  }
}
${jobDetailsFragment}

`