from django.contrib import admin

# Register your models here.
from App.models import Shop, Wheel, User

admin.site.register(User)
admin.site.register(Shop)
admin.site.register(Wheel)