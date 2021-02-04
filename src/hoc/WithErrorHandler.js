import React, { Component } from 'react';

import Modal from '../components/UI/Modal/Modal';


const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = { error: false }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      })

      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error });
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render () {
      return ( <>
        <Modal 
          show={this.state.error}
          closeModal={() => this.setState({ error: false })}>
          {(this.state.error && this.state.error.message) || <p>Something is not right, I can feel it.</p>}
        </Modal>
        <WrappedComponent {...this.props} />
      </>
      );
    }      
  }
}


export default WithErrorHandler;