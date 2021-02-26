import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from "../../axiosOrders";
import withErrorHandler from "../../hoc/WithErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loadingOrders: true,
  };

  async componentDidMount() {
    const res = await axios.get("/orders.json");
    const orders = [];
    for (let order in res.data) {
      orders.push({ ...res.data[order], id: order });
    }
    this.setState({ orders });
  }

  render() {
    const orders = this.state.orders.map((order) => (
      <Order
        ingredients={order.ingredients}
        totalPrice={+order.totalPrice}
        key={order.id}
      />
    ));

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
