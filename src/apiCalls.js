export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders").then((response) => response.json());
};


export const postOrder = (order) => {
	return fetch("http://localhost:3001/api/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
	.then((response) => {
		if (!response.ok){
			throw new Error(response.status);
		}
		return response.json();
	})
}