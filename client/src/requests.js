import { getAccessToken, isLoggedIn } from "./auth"

const endpointURL = "http://localhost:9000/graphql"


async function makeQuery(bodyObj) {
  const headers = {
    "Content-Type": "application/json"
  }
  if (isLoggedIn()) {
    headers["Authorization"] = "Bearer " + getAccessToken()
  }
  const response = await fetch(endpointURL, {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers
  })
  const responseBody = await response.json()
  // Error handling
  if (responseBody.errors?.length > 0) {
    const messages = responseBody.errors.map(error => error.message).join("\n")
    throw new Error(messages)
  }
  return responseBody.data
}

export async function loadJobs() {
  const responseData = await makeQuery({
    query: `
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
  });
  const { jobs, errors } = responseData;
  console.log(jobs, errors)
  return responseData.jobs;
}

export async function getJob(jobId) {
  const responseData = await makeQuery({
    variables: { id: jobId },
    query: `
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
  });
  return responseData.job;
}

export async function createJob(input) {
  const responseData = await makeQuery({
    variables: { input },
    query: `
      mutation CreateJob($input:createJobInput){
        job: createJob(input:$input){
          id
          title
          description
        }
      }
    `
  });
  return responseData.job;
}

export async function getCompany(companyId) {
  const responseData = await makeQuery({
    variables: { id: companyId },
    query: `
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
  });
  return responseData.company;
}