"""RSVP Views"""
import json, math

from django.http import HttpResponse, QueryDict
from django.contrib.auth.decorators import login_required

from django.contrib.auth.models import User
from rsvp.models import RSVP

from rsvp.utils import create_random_string

from django.shortcuts import render

from django.views.decorators.csrf import ensure_csrf_cookie

from rsvp.view_helpers import send_email

@ensure_csrf_cookie
def invitation(request, username=""):
    context = {
        "username": "",
        "first_name": "",
        "last_name": "",
        "email": "",
        "attending": None,
        "saturday": "checked",
        "sunday": "checked",
        "vegetarian": False,
        "other_dietary_restrictions": "",
        "need_hotel": True,
        "need_carpool": True,
        "plus_one": True,
        "plus_one_name": [{
            "name": "",
            "true": "",
            "false": ""
        }],
        "extra_guests": range(1, 2),
        "song_requests": "",
    }
    if username != "":
        user = User.objects.filter(username=username)
        if len(user) > 0:
            user = user[0]
            rsvp = user.rsvp
            # Always needed
            context["username"] = user.username
            context["first_name"] = user.first_name
            context["last_name"] = user.last_name
            context["email"] = user.email
            context["plus_one"] = rsvp.plus_one
            context["extra_guests"] = range(1, int(math.ceil(rsvp.expected_attendees)))
            # Only needed if previously haven't filled out form
            if rsvp.attending != None:
                context["attending"] = rsvp.attending
                if rsvp.attending_dates != "":
                    context["saturday"] = "checked" if rsvp.attending_dates.find("1") != -1 else ""
                    context["sunday"] = "checked" if rsvp.attending_dates.find("2") != -1 else ""
                context["vegetarian"] = rsvp.vegetarian if rsvp.vegetarian != None else False
                context["other_dietary_restrictions"] = rsvp.other_dietary_restrictions
                context["need_hotel"] = rsvp.need_hotel if rsvp.need_hotel != None else True
                context["need_carpool"] = rsvp.need_carpool if rsvp.need_carpool != None else True
                context["wine_tasting"] = rsvp.wine_tasting
                context["plus_one"] = rsvp.plus_one
                context["plus_one_name"] = []
                context["song_requests"] = rsvp.song_requests
            if rsvp.plus_one_name:
                names = rsvp.plus_one_name.split(",")
            else:
                names = []
            context["plus_one_name"] = []
            for idx in context["extra_guests"]:
                if len(names) < idx:
                    context["plus_one_name"].append({
                        "name": "",
                        "true": "",
                        "false": "checked" if rsvp.attending != None else ""
                    })
                else:
                    context["plus_one_name"].append({
                        "name": names[idx - 1],
                        "true": "checked",
                        "false": ""
                })
    update_ctx = {}
    for key, value in context.items():
        val_string = key + "_" + str(value).lower()
        not_val_string = key + "_" + str(not value).lower()
        if value == True or value == False:
            update_ctx[val_string] = "checked"
            update_ctx[not_val_string] = ""
        elif value == None:
            update_ctx[val_string] = ""
            update_ctx[not_val_string] = ""
    context.update(update_ctx)
    return render(request, 'rsvp/invitation_closed.html', context)

def update_values(request, username=''):
    try:
        form_entries = json.loads(request.POST.get("formEntries"))
    except:
    #     Inline editing selection
        form_entries = {
            request.POST.get("name"): request.POST.get("value")
        }
    user = User.objects.filter(username=username)
    if len(user) != 0:
        user = user[0]
        rsvp = user.rsvp

        for k, v in form_entries.items():
            if v == "False":
                v = False
            elif v == "None":
                v = None

            if hasattr(user, k):
                setattr(user, k, v)
            else:
                setattr(rsvp, k, v)

        rsvp.save()
        user.save()
        return HttpResponse("Successfully updated " + json.dumps(form_entries), status=200)
    else:
        return HttpResponse("No user found", status=400)


def update_or_create_rsvp(request, username=''):
    form_entries = json.loads(request.POST.get("formEntries"))
    rsvp_values = {}
    user_values = {"first_name": True, "last_name": True, "email": "", "password": "szar"}
    for k, v in form_entries.items():
        if v == "False":
            v = False
        elif v == "None":
            v = None
        try:
            user_values[k]
            user_values[k] = v
        except:
            rsvp_values[k] = v
    if username == "" or len(User.objects.filter(username=username)) == 0:
        user_values["username"] = create_random_string()
        while len(User.objects.filter(username=user_values["username"])) != 0:
            user_values["username"] = create_random_string()
        user = User.objects.create_user(**user_values)
    else:
        user = User.objects.filter(username=username)[0]
        user.first_name = user_values["first_name"]
        user.last_name = user_values["last_name"]
        if user_values["email"] != "":
            user.email = user_values["email"]
        user.save()

    try:
        user.rsvp.edit(rsvp_values)
    except:
        try:
            if rsvp_values["plus_one_name"] != None:
                rsvp_values["plus_one"] = True
                rsvp_values["expected_attendees"] = 1.5
        except:
            pass
        user.rsvp = RSVP(**rsvp_values)
        user.rsvp.save()
    if user.email != "":
        send_email(request, "rsvpconfirmation", user.rsvp, "[Sherry&Aneesh] Wedding RSVP Confirmation")
    return HttpResponse("Success", status=200)

@login_required
# Need to set cookie for IE people or they won't be able to submit forms
@ensure_csrf_cookie
def _rsvps_delete(request):
    if request.user.is_superuser:
        rsvp_ids = json.loads(QueryDict(request.body).get("selection"))
        response_message = ""
        for rsvp_id in rsvp_ids:
            rsvp = RSVP.objects.filter(id=rsvp_id)
            if len(rsvp) > 0:
                rsvp = rsvp[0]
                rsvp.delete()
                response_message += "Successfully deleted " + rsvp_id + "."
            else:
                response_message += "No rsvp for " + rsvp_id + "."

        return HttpResponse(response_message, status=200)
    else:
        return HttpResponse("Only admin can delete rsvps", status=500)

# Need to set cookie for IE people or they won't be able to submit forms
@ensure_csrf_cookie
def rsvps(request, rsvp_id=''):
    if request.method == 'POST':
        return update_or_create_rsvp(request, username=rsvp_id)

    if request.method == 'DELETE':
        return _rsvps_delete(request)
# Need to set cookie for IE people or they won't be able to submit forms
@ensure_csrf_cookie
def address(request, username=''):
    user = User.objects.filter(username=username)
    if len(user):
        user = user[0]
        ctx = {
            'username': user.username,
            'name': user.rsvp.name(),
            'address': user.rsvp.address,
        }
        return render(request, 'rsvp/request_address.html', ctx)
    else:
        return HttpResponse("Username doesn't exist", status=400)

@ensure_csrf_cookie
def quick_actions(request, username, action=""):
    if action == "":
        return invitation(request, username)
    elif action == "unsubscribe":
        return unsubscribe(request, username)
    elif action == "no":
        return no(request, username)
    else:
        return HttpResponse("Invalid action, expected /no, or /unsubscribe", status=500)

def no(request, username):
    ctx = {}
    user = User.objects.filter(username=username)
    if len(user):
        rsvp = user[0].rsvp
        rsvp.attending = False
        rsvp.number_attendees = 0
        rsvp.save()
        ctx["status"] = "Thank you for your RSVP!"
        ctx["name"] = rsvp.name()
        ctx["username"] = username
        send_email(request, "rsvpconfirmation", rsvp, "[Sherry&Aneesh] Wedding RSVP Confirmation")
        return render(request, 'rsvp/no.html', ctx)
    else:
        ctx["status"] = "No user found..."
        return render(request, 'rsvp/no.html', ctx)

def unsubscribe(request, username):
    ctx = {}
    user = User.objects.filter(username=username)
    if len(user):
        user = user[0]
        user.email = ""
        user.save()
        ctx["status"] = "Your email has been removed from our database."
        ctx["name"] = user.rsvp.name()
        ctx["username"] = username
        return render(request, 'rsvp/unsubscribe.html', ctx)
    else:
        ctx["status"] = "No user found..."
        return render(request, 'rsvp/unsubscribe.html', ctx)
