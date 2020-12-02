import requests
import json

from paypalpayoutssdk.core import PayPalHttpClient, SandboxEnvironment, LiveEnvironment
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
                    "total": "1500",
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
        try:
            exec_payment = paypalrestsdk.Payment.find(pay_id)
            if exec_payment.execute({'payer_id': payer_id}):
                return True
            else:
                err = exec_payment.error
                if(err['name'] == 'exec_payment.error'):
                    err = {'status': 200, 'bool': 'true'}
                return err
        except:
            return {'status': 404, 'bool': 'false'}


if __name__ == '__main__':
    client = PayPAlClient()
    payment = paypalrestsdk.Payment.find('PAYID-L7DZ24Y1FG42637B41223214')
    try:
        if payment.execute({'payer_id': 'ZQFR8L8CNFDC6'}):
            print("Payment[%s] execute successfully" % (payment.id))
        else:
            print(payment.error)
    except:
        print('error')



