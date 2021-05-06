from rest_framework.response import Response

from Gekidan100WebPage.views.session import SessionAdminWebPage
from Gekidan100WebPage.views.session.web.payer_transient_info import SessionPayerTransientInfo


class SessionVideoTicket(SessionAdminWebPage):

    def __init__(self, request, response: Response):
        super().__init__(request, response)

