export function addToOrder(item) {

  return {
    type: 'ADD',
    payload: item
  }
}

export function increaseOrderCount(id, price) {
  return {
    type: 'PLUS_COUNT',
    payload: {id, price}
  }
}

export function decreaseOrderCount(id, price) {
  return {
    type: 'MINUS_COUNT',
    payload: {id, price}
  }
}

export function deleteFromOrder(id) {
  return {
    type: 'DELETE',
    payload: id
  }
}

export function resetOrder() {
  return {
    type: 'RESET'
  }
}

export function passOrderListToTotal() {
  return (dispatch, getState) => {
    dispatch({
      type: 'PASS_ORDER_LIST_TO_TOTAL',
      payload: getState().orderList
    })
  };
}

export function estimateDelivery(address) {
  return {
    type: 'ESTIMATE_DELIVERY',
    payload: {
      destination: address,
      price: 10
    }
  }
}
