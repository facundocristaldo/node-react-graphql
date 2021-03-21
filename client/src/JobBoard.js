import React, { Component } from 'react';
import { JobList } from './JobList';
import { loadJobs } from './requests';

export class JobBoard extends Component {
  state = { jobs: [] }
  componentDidMount() {
    loadJobs().then(jobs => {
      this.setState({ jobs: jobs })
    })

  }
  render() {
    return (
      <div>
        <h1 className="title">Job Board</h1>
        <JobList jobs={this.state.jobs} />
      </div>
    );
  }
}
