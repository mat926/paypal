import fetch from "node-fetch";

createOrder()

async function createOrder() {
    await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer A21AAIPkrYJsLdKo4UyV-VEWdMwCrSdi0YrQapFoBtyJNgmdHAdB8QOvwmZSGL6TWI20fgROKa1EHUDQZqZwTuqarHtpyiHjQ',
        'Prefer': 'return=representation'
    },
    body: JSON.stringify(
        {intent: "CAPTURE",
        purchase_units: [
            {
                items: [
                    {
                        name: "T-Shirt",
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