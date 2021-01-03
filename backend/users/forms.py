from django.contrib.auth.forms import UserCreationForm
from django import forms


class SignUpForm(UserCreationForm):

    username = forms.EmailField(
        label="Email"
    )
