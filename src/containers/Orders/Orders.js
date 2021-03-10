import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./Orders.module.css";
import Order from "../../components/Order/Order";
import axios from "../../axiosOrders";
import withErrorHandler from "../../hoc/WithErrorHandler";
import { fetchOrdersAsync } from "../../store/actions/";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    const orders = this.props.orders.map((order) => (
      <Order
        ingredients={order.ingredients}
        totalPrice={+order.price}
        key={order.id}
      />
    ));

    return (
      <div className={styles.Orders}>
        <h1>Your Orders</h1>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(fetchOrdersAsync()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
