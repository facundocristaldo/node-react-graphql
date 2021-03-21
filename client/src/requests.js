import { InMemoryCache } from "apollo-cache-inmemory"
import ApolloClient from "apollo-client"
import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import gql from "graphql-tag"
import { getAccessToken, isLoggedIn } from "./auth"

const endpointURL = "http://localhost:9000/graphql"

const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    operation.setContext({
      headers: {
        "Authorization": "Bearer " + getAccessToken()
      }
    })
  }
  return forward(operation)
})

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    new HttpLink({ uri: endpointURL })
  ]),
  cache: new InMemoryCache()
})


//deprecated due to the use of apollo client
// async function makeQuery(bodyObj) {
//   const headers = {
//     "Content-Type": "application/json"
//   }
//   if (isLoggedIn()) {
//     headers["Authorization"] = "Bearer " + getAccessToken()
//   }
//   const response = await fetch(endpointURL, {
//     method: "POST",
//     body: JSON.stringify(bodyObj),
//     headers
//   })
//   const responseBody = await response.json()
//   // Error handling
//   if (responseBody.errors?.length > 0) {
//     const messages = responseBody.errors.map(error => error.message).join("\n")
//     throw new Error(messages)
//   }
//   return responseBody.data
// }

export async function loadJobs() {
  const query = gql`
      {
        jobs{
          id
          title
          company{
            name
          }
        }
      }
    `
  const { data: { jobs } } = await client.query({ query, fetchPolicy: "" })
  return jobs;
}

export async function getJob(jobId) {
  const variables = { id: jobId }
  const query = gql`
    query JobQuery($id:ID!){
        job(id:$id){
          id
          title
          description
          company{
            id
            name
          }
        }
      }
    `
  const { data: { job } } = await client.query({ query, variables })
  return job;
}

export async function createJob(input) {
  const variables = { input }
  const mutation = gql`
      mutation CreateJob($input:createJobInput){
        job: createJob(input:$input){
          id
          title
          description
          company{
            id
            name
          }
        }
      }
    `
  const { data: { job } } = await client.mutate({
    mutation,
    variables,
    update: (cache, mutationResult) => {
      const { data } = mutationResult
      cache.writeQuery({
        variables: { id: data.job.id },
        query: gql`
        query JobQuery($id:ID!){
            job(id:$id){
              id
              title
              description
              company{
                id
                name
              }
            }
          }
        `,
        data
      })
    }
  })
  return job;
}

export async function getCompany(companyId) {
  const variables = { id: companyId }
  const query = gql`
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
  const { data: { company } } = await client.query({ query, variables })
  return company;
}