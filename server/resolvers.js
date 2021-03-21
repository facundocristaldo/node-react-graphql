const db = require("./db")

const Query = {
  jobs: () => getJobs()
}


const getJobs = () => {
  return db.jobs.list()
  // This is okay, but there´s another way
  // .map(job => ({
  //   id: job.id,
  //   title: job.title,
  //   description: job.description,
  //   company: db.companies.list().find(comp => comp.id === job.companyId)
  // })
  // )
}

//Declare a Job resolver
const Job = {
  company: (job) => db.companies.get(job.companyId)
}

//Dont forget to export it
module.exports = {
  Query,
  Job
}