"""RSVP Views"""
import os, sys, json

from django.http import HttpResponse, HttpResponseRedirect, QueryDict
from django.template import RequestContext, loader
from django.contrib.auth import authenticate, login, logout
from django.core.context_processors import csrf
from django.contrib.auth.decorators import login_required

from django.contrib.auth.models import User
from rsvp.models import RSVP

from rsvp.utils import create_random_string
from django.core import serializers

from django.conf import settings
from django.shortcuts import redirect, render

def invitation(request):
    return render(request, 'rsvp/invitation.html', {})

def _get_full_rsvp(rsvps_objects):
    serialized_rsvps = json.loads(serializers.serialize('json', rsvps_objects))
    for r in serialized_rsvps:
        print("R VALUE", r)
        user = User.objects.filter(id=r['fields']["guest"])
        if len(user) > 0:
            user = user[0]
            r['fields']["guest"] = {
                "id": r['fields']["guest"],
                "name": user.get_full_name(),
                "username": user.username,
                "email": user.email,
            }
    return json.dumps(serialized_rsvps)

def _rsvps_get_raw(rsvp_id):
    rsvps_array = RSVP.objects.all()
    if rsvp_id:
        rsvps_array = RSVP.objects.filter(id=rsvp_id)

    return _get_full_rsvp(rsvps_array)

def _rsvps_create(request, new_user):
    form_entries = json.loads(request.POST.get("formEntries"))
    rsvp_values = {}
    user_values = {"first_name": True, "last_name": True, "email": "", "password": "szar"}
    for k, v in form_entries.items():
        if v == "False":
            v = False
        if not v == "":
            try:
                user_values[k]
                user_values[k] = v
            except:
                rsvp_values[k] = v
    if new_user:
        user_values["username"] = create_random_string()
        user = User.objects.create_user(**user_values)
    else:
        user = request.user
    user.rsvp = RSVP(**rsvp_values)
    user.rsvp.save()
    return HttpResponse("Success", status=200)

def rsvps(request, rsvp_id=''):
    if request.method == 'GET':
        if request.user.is_superuser:
            rsvps_formatted = _rsvps_get_raw(rsvp_id)
            return HttpResponse(rsvps_formatted, content_type="application/json")
        else:
            return HttpResponse("Only admin can see rsvps", status=500)

    if request.method == 'POST':
        return _rsvps_create(request, True)

def attending(request):
    if request.user.is_superuser:
        attending_rsvps = _get_full_rsvp(RSVP.objects.filter(attending=True))
        return HttpResponse(attending_rsvps, content_type="application/json")
    else:
        return HttpResponse("Only admin can see attendees", status=500)

    # if request.method == 'PUT':
    #     return _rsvps_update(request, rsvp_id)
    #
    # if request.method == 'DELETE':
    #     return _rsvps_delete(request, rsvp_id)