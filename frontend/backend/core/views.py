from django.core.validators import ip_address_validator_map
from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.


class TemporaryView(TemplateView):

    template_name = "temporary.html"
