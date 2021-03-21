import { InMemoryCache } from "apollo-cache-inmemory"
import ApolloClient from "apollo-client"
import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { getAccessToken, isLoggedIn } from "./auth"
import { CreateJobMutation } from "./gqlMutations"
import { companyQuery, JobQuery, JobsQuery } from './gqlQueries'

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

export async function loadJobs() {
  const { data: { jobs } } = await client.query({ query: JobsQuery, fetchPolicy: "" })
  return jobs;
}

export async function getJob(jobId) {
  const variables = { id: jobId }
  const { data: { job } } = await client.query({ query: JobQuery, variables })
  return job;
}

export async function createJob(input) {
  const variables = { input }
  const { data: { job } } = await client.mutate({
    mutation: CreateJobMutation,
    variables,
    update: (cache, mutationResult) => {
      const { data } = mutationResult
      cache.writeQuery({
        variables: { id: data.job.id },
        query: JobQuery,
        data
      })
    }
  })
  return job;
}

export async function getCompany(companyId) {
  const variables = { id: companyId }
  const { data: { company } } = await client.query({ query: companyQuery, variables })
  return company;
}