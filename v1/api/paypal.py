import sys

from paypalcheckoutsdk.core import PayPalHttpClient, SandboxEnvironment  # LiveEnvironment
import paypalrestsdk

from futsu100_api.config.config import USE_DOMAIN
from v1.config import PAYPAL_CLIENT_ID  # PAYPAL_SANDBOX_ACCOUNT
from v1.config import PAYPAL_CLIENT_SECRET  # PAYPAL_SANDBOX_ACCOUNT


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

    @staticmethod
    def is_primittive(data):
        return isinstance(data, str) or isinstance(data, int)

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

    def object_to_json(self, json_data):
        result = {}
        if sys.version_info[0] < 3:
            itr = json_data.__dict__.iteritems()
        else:
            itr = json_data.__dict__.items()
        for key, value in itr:
            if key.startswith("__"):
                continue

            if self.is_primittive(value):
                result[key] = self.array_to_json_array(value)
            elif not isinstance(value, list):
                result[key] = self.object_to_json(value)
        return result

    def array_to_json_array(self, json_array):
        result = []
        if isinstance(json_array, list):
            for item in json_array:
                if isinstance(item, list):
                    if self.is_primittive(item):
                        result.append(self.array_to_json_array(item))
                else:
                    result.append(item)
        return result

    def get_payment_url(self):
        if self.payment.create():
            for link in self.payment.links:
                if link.method == 'REDIRECT':
                    redirect_url = link.href
                    return redirect_url
