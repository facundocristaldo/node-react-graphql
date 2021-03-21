import React, { Component } from 'react';
import { JobList } from './JobList';
import { getCompany } from './requests';

export class CompanyDetail extends Component {
  constructor(props) {
    super(props);
    const { companyId } = this.props.match.params;
    this.state = { company: undefined, companyId, loading: true };
  }

  componentDidMount() {
    getCompany(this.state.companyId).then(comp => {
      this.setState({ company: comp, loading: false })
    })
  }

  render() {
    const { company, loading } = this.state;
    if (loading) return <p>Loading...</p>
    if (!company) return <p>Company could not be found</p>
    return (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
        <h5 className="title is-5">Jobs at {company.name}</h5>
        <JobList jobs={company.jobs} />
      </div>
    );
  }
}
