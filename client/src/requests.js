const endpointURL = "http://localhost:9000/graphql"
const headers = {
  "Content-Type": "application/json"
}

export async function loadJobs() {
  const body = JSON.stringify({
    query: `
      {
        jobs{
          id,
          title,
          company{
            name
          }
        }
      }
    `
  })
  const response = await fetch(endpointURL, {
    method: "POST",
    body,
    headers
  })
  const responseBody = await response.json()
  return responseBody.data.jobs;
}

export async function getJob(jobId) {
  const body = JSON.stringify({
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
  })
  const response = await fetch(endpointURL, {
    method: "POST",
    body,
    headers
  })
  const responseBody = await response.json()
  return responseBody.data.job;
}

export async function getCompany(companyId) {
  const body = JSON.stringify({
    variables: { id: companyId },
    query: `
      query CompanyQuery($id:ID!){
        company(id:$id){
            id
            name
            description
        }
      }
    `
  })
  const response = await fetch(endpointURL, {
    method: "POST",
    body,
    headers
  })
  const responseBody = await response.json()
  return responseBody.data.company;
}