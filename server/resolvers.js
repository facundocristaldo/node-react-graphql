const db = require("./db")

const Query = {
  job: (root, args) => db.jobs.get(args.id),
  jobs: () => db.jobs.list(),
  company: (root, args) => db.companies.get(args.id),
}

const Mutation = {
  createJob: (root, { input }) => {
    const jobId = db.jobs.create(input)
    return db.jobs.get(jobId)
  }
}

const Company = {
  jobs: (company) => db.jobs.list().filter(job => job.companyId === company.id)
}

//Declare a Job resolver
const Job = {
  company: (job) => db.companies.get(job.companyId)
}

//Dont forget to export it
module.exports = {
  Query,
  Mutation,
  Job,
  Company
}