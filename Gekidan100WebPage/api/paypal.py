import requests
import json

from paypalpayoutssdk.core import PayPalHttpClient, SandboxEnvironment
import paypalrestsdk

from Gekidan100WebPage.config.config import PAYPAL_SANDBOX_ACCOUNT, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET

class PayPAlClient(object):

    def __init__(self):
        self.client_id = PAYPAL_CLIENT_ID
        self.client_secret = PAYPAL_CLIENT_SECRET
        self.environment = SandboxEnvironment(client_id=self.client_id, client_secret=self.client_secret)
        self.client = PayPalHttpClient(self.environment)
        paypalrestsdk.configure({
            "mode": "sandbox",  # sandbox or live
            'client_id': self.client_id,
            'client_secret': self.client_secret,
            'headers': {
                'custom': 'header',
            },
        })
        self.payment = paypalrestsdk.Payment({
            "intent": "sale",
            # Set payment method
            "payer": {
                "payment_method": "paypal"
            },
            # Set redirect URLs
            "redirect_urls": {
                "return_url": "http://localhost:3000/",
                "cancel_url": "http://localhost:3000/"
            },
            # Set transaction object
            "transactions": [{

                "amount": {
                    "total": "100",
                    "currency": "JPY"
                },
                "description": "payment description"
            }]
        })

    def get_payment_url(self):
        if self.payment.create():
            for link in self.payment.links:
                if link.method == 'REDIRECT':
                    redirect_url = link.href
                    return redirect_url

    def get_execute_payment(self, pay_id, payer_id):
        exec_payment = paypalrestsdk.Payment.find(pay_id)
        if exec_payment.execute({'payer_id': payer_id}):
            return True
        else:
            return exec_payment.error










if __name__ == '__main__':
    client = PayPAlClient()
    pay_conf = paypalrestsdk.configure({
        "mode": "sandbox",  # sandbox or live
        'client_id': client.client_id,
        'client_secret': client.client_secret,
        'headers': {
            'custom': 'header',
        },
    })

    payment = paypalrestsdk.Payment({
        "intent": "sale",

        # Set payment method
        "payer": {
            "payment_method": "paypal"
        },

        # Set redirect URLs
        "redirect_urls": {
            "return_url": "http://localhost:3000/",
            "cancel_url": "http://localhost:3000/"
        },

        # Set transaction object
        "transactions": [{

            "amount": {
                "total": "100",
                "currency": "JPY"
            },
            "description": "payment description"
        }]
    })

    if payment.create():
        for link in payment.links:
            if link.method == 'REDIRECT':
                redirect_url = link.href
                print(redirect_url)
    payment = paypalrestsdk.Payment.find('PAYID-L667ZQI5W339154B4436674G')
    if payment.execute({'payer_id': 'ZQFR8L8CNFDC6'}):
        print("Payment[%s] execute successfully" % (payment.id))
    else:
        print(payment.error)



    # access_token = pay_conf.get_access_token()
    # print(access_token)
    # refresh_token = pay_conf.validate_token_hash()
    # print(refresh_token)
    # headers = {
    #     'Content-Type': 'application/json',
    #     'Authorization': f'Bearer {access_token}',
    # }
    # data = {
    #     'intent': 'CAPTURE',
    #     'purchase_units': [
    #         {
    #             'amount': {
    #                 'currency_code': 'JPY',
    #                 'value': '1000',
    #             }
    #         }
    #     ],
    # }
    # resp = requests.post(f'https://api-m.sandbox.paypal.com/v2/checkout/orders', headers=headers, data=json.dumps(data))
    # print(resp.json())