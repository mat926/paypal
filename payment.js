import fetch from "node-fetch";

var accessToken = "A21AAIH0WCyjIRbTXSmSJqfDrzE8rYeGtoPmy0FeUIYH7R-qNTpbpufNXHIbLtW4TkD0s4re1315Ji5N1nYDxxJ06E6V-gbHQ";

//createOrder();
//retrieveOrder("92T83485AV972190N")
//updateOrder("92T83485AV972190N")
//capturePayment("04S93955NP0785822")
refundPayment("0MU063516V122491F")

async function createOrder() {
    await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify(
            {
                intent: "CAPTURE",
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

async function updateOrder(orderId) {
    await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify([
            {
                op: "replace",
                path: "/purchase_units/@reference_id=='default'/payee/email_address",
                value: "matt@example.com"
            },
            {
                op: "add",
                path: "/purchase_units/@reference_id=='default'/shipping/address",
                value: {
                    address_line_1: "123 Townsend St",
                    address_line_2: "Floor 6",
                    admin_area_2: "San Francisco",
                    admin_area_1: "CA",
                    postal_code: "94107",
                    country_code: "US"
                }
            },
            {
                op: "add",
                path: "/purchase_units/@reference_id=='default'/invoice_id",
                value: "03012022-3303-01"
            },
            {
                op: "replace",
                path: "/purchase_units/@reference_id=='default'/amount",
                value: {
                    currency_code: "USD",
                    value: "120.00",
                    breakdown: {
                        item_total: {
                            currency_code: "USD",
                            value: "100.00"
                        },
                        shipping: {
                            currency_code: "USD",
                            value: "20.00"
                        }
                    }

                }
            }
        ])
    })
        .then(response => console.log("Response status: " + response.status))
        .then(response => console.log(JSON.stringify(response)))

}

async function capturePayment(orderId) {
    await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))

}

async function refundPayment(transactionID) {
    await fetch(`https://api-m.sandbox.paypal.com/v2/payments/captures/${transactionID}/refund`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))

}