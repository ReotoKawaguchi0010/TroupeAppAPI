from paypalpayoutssdk.core import PayPalHttpClient, SandboxEnvironment  # LiveEnvironment
import paypalrestsdk

from Gekidan100.config.config import USE_DOMAIN
from Gekidan100WebPage.config.config import PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET  # PAYPAL_SANDBOX_ACCOUNT


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
                "return_url": USE_DOMAIN[0],
                "cancel_url": USE_DOMAIN[0],
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

    @staticmethod
    def get_execute_payment(pay_id, payer_id):
        try:
            exec_payment = paypalrestsdk.Payment.find(pay_id)
            if exec_payment.execute({'payer_id': payer_id}):
                return {'bool': True}
            else:
                err = exec_payment.error
                err['bool'] = True
                if err['name'] == 'exec_payment.error':
                    err = {'status': 200, 'bool': True}
                return err
        except ValueError:
            return {'status': 404, 'bool': False}
