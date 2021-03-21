import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getJob } from './requests';

export class JobDetail extends Component {
  constructor(props) {
    super(props);
    const { jobId } = this.props.match.params;
    this.state = { jobId, job: undefined, loading: true };
  }
  componentDidMount() {
    getJob(this.state.jobId).then(job => {
      this.setState({ job, loading: false })
    })
  }
  render() {
    const { job, loading } = this.state;
    if (loading) return <p>Loading...</p>
    if (!job) return <p>Job could not be found</p>
    return (
      <div>
        <h1 className="title">{job.title}</h1>
        <h2 className="subtitle">
          <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
        </h2>
        <div className="box">{job.description}</div>
      </div>
    );
  }
}
