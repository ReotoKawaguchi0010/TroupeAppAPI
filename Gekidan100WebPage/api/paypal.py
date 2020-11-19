from paypalpayoutssdk.core import PayPalHttpClient, SandboxEnvironment
import paypalrestsdk

from Gekidan100WebPage.config.config import PAYPAL_SANDBOX_ACCOUNT, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET

class PayPAlClient(object):

    def __init__(self):
        self.client_id = PAYPAL_CLIENT_ID
        self.client_secret = PAYPAL_CLIENT_SECRET
        self.environment = SandboxEnvironment(client_id=self.client_id, client_secret=self.client_secret)
        self.client = PayPalHttpClient(self.environment)










if __name__ == '__main__':
    client = PayPAlClient()
    test = paypalrestsdk.configure({
        "mode": "sandbox",  # sandbox or live
        'client_id': client.client_id,
        'client_secret': client.client_secret
    })
    print(test.get_access_token())
    print(test.ssl_version)
