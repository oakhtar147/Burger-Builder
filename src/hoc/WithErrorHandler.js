import React, { Component } from 'react';

import Modal from '../components/UI/Modal/Modal';


const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = { error: null }

    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      })

      axios.interceptors.response.use(res => res, error => {
        this.setState({ error });
      })
    }

    render () {
      return ( <>
        <Modal 
          show={this.state.error}
          closeModal={() => this.setState({ error: null })}>
          {(this.state.error && this.state.error.message) || <p>Something is not right, I can feel it.</p>}
        </Modal>
        <WrappedComponent {...this.props} />
      </>
      );
    }      
  }
}


export default WithErrorHandler;