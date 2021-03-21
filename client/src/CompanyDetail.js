import React, { Component } from 'react';
import { getCompany } from './requests';

export class CompanyDetail extends Component {
  constructor(props) {
    super(props);
    const { companyId } = this.props.match.params;
    this.state = { company: undefined, companyId, loading: true, error: undefined };
  }

  componentDidMount() {
    getCompany(this.state.companyId).then(comp => {
      this.setState({ company: comp, loading: false })
    })
  }

  render() {
    const { company, loading, error } = this.state;
    if (loading) return <p>Loading...</p>
    return (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
      </div>
    );
  }
}
