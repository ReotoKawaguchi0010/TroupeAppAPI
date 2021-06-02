from rest_framework.response import Response

from v1.views.session import SessionAdminWebPage
from v1.views.session.web.payer_transient_info import SessionPayerTransientInfo


class SessionVideoTicket(SessionAdminWebPage):

    def __init__(self, request, response: Response):
        super().__init__(request, response)

