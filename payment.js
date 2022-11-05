import fetch from "node-fetch";

var accessToken = "A21AAIczIw1gupsGYu4jHWcGiQUsW1ZUA9tvcH-3MlKHMRpoO3UloIlwXeLaAO1j-vBfk39q7b5ddfLuipGwXM1sPqCEQyuYg";

//createOrder();
retrieveOrder("6L82881641910310C")

async function createOrder() {
    await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Prefer': 'return=representation'
    },
    body: JSON.stringify(
        {intent: "CAPTURE",
        purchase_units: [
            {
                items: [
                    {
                        name: "Jeans",
                        description: "Green XL",
                        quantity: "1",
                        unit_amount: {
                            currency_code: "USD",
                            value: "100.00"
                        }
                    }
                ],
                amount: {
                    currency_code: "USD",
                    value: "100.00",
                    breakdown: {
                        item_total: {
                            currency_code: "USD",
                            value: "100.00"
                        }
                    }
                }
            }
        ],
        application_context: {
            return_url: "https://example.com/return",
            cancel_url: "https://example.com/cancel"
        }
    })
})
.then(response => response.json())
.then(response => console.log(JSON.stringify(response)))
}

async function retrieveOrder(orderId) {
    await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Prefer': 'return=representation'
    }
})
.then(response => response.json())
.then(response => console.log(JSON.stringify(response)))
}