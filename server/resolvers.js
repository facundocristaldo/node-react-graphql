const db = require("./db")

const Query = {
  job: (root, args) => db.jobs.get(args.id),
  jobs: () => db.jobs.list(),
  company: (root, args) => db.companies.get(args.id),
}

const Mutation = {
  createJob: async (root, { input }, context) => {
    // Check if authenticated
    const { user } = context;
    if (user) {
      input["companyId"] = user.companyId
      const jobId = db.jobs.create(input)
      return db.jobs.get(jobId)
    } else {
      throw new Error("Not Authorized")
    }
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