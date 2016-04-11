import json
from django.core import serializers
from rsvp.models import RSVP
from django.contrib.auth.models import User

from django.core.urlresolvers import reverse

from django.core.mail import EmailMultiAlternatives
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render

# keen
KEEN_OBJECT = {
    "ip_address" : "${keen.ip}",
    "user_agent" : "${keen.user_agent}",
    "keen" : {
    "addons" : [
      {
        "name" : "keen:ip_to_geo",
        "input" : {
          "ip" : "ip_address"
        },
        "output" : "ip_geo_info"
      },
      {
        "name" : "keen:ua_parser",
        "input" : {
          "ua_string" : "user_agent"
        },
        "output" : "parsed_user_agent"
      }
    ]
  }
}

# Getting hash of rsvp(s)
def rsvps_get_raw(rsvp_id):
    rsvps_array = RSVP.objects.all()
    if rsvp_id:
        rsvps_array = RSVP.objects.filter(id=rsvp_id)

    return get_full_rsvp(rsvps_array)

def get_full_rsvp(rsvps_objects):
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

# Emailing
# rsvp_ids need to be included as "selection" within html request data
def send_emails(request, email_type, subject):
    rsvp_ids = json.loads(request.POST.get("selection"))
    response_message = ""
    for rsvp_id in rsvp_ids:
        rsvp = RSVP.objects.filter(id=rsvp_id)
        if len(rsvp) > 0:
            if rsvp[0].guest and rsvp[0].guest.email.find("@") != -1:
                rsvp = rsvp[0]
                send_email(request, email_type, rsvp, subject)
                response_message += "Successfully sent for " + rsvp_id + "."
            else:
                response_message += "No user or email for " + rsvp_id + "."
        else:
            response_message += "No rsvp for " + rsvp_id + "."

    return HttpResponse(response_message, status=200)

def send_email(request, email_type, rsvp, subject):
    name, username, rsvp_email, full_name = rsvp.name(), rsvp.guest.username, rsvp.guest.email, rsvp.full_name()

    ctx = {
        "name": name,
        "rsvp_link": request.build_absolute_uri(reverse('make_rsvp', args=(username,))),
        "no_link": request.build_absolute_uri(reverse('quick_actions', args=(username, "no", ))),
        "unsubscribe": request.build_absolute_uri(reverse('quick_actions', args=(username, "unsubscribe", ))),
        "homepage": request.build_absolute_uri(reverse('root-url'))
    }
    html_content = loader.get_template("email/" + email_type + ".html").render(ctx)
    text_content = loader.render_to_string('email/' + email_type + '.txt', ctx)
    my_email = 'Sherry Zhou <xiao.qiao.zhou+wedding@gmail.com>'
    msg = EmailMultiAlternatives(subject, text_content, my_email, ['{0} <{1}>'.format(full_name, rsvp_email)])
    msg.attach_alternative(html_content, "text/html")
    msg.send();

def get_email(request, email_type):
    pretendCtx = {
        "name": "Sherry",
        "rsvp_link": request.build_absolute_uri(reverse('make_rsvp', args=[1])),
        "no_link": request.build_absolute_uri(reverse('quick_actions', args=(1, "no", ))),
        "unsubscribe": request.build_absolute_uri(reverse('quick_actions', args=(1, "unsubscribe", ))),
        "homepage": request.build_absolute_uri(reverse('root-url'))
    }
    return render(request, 'email/' + email_type + '.html', pretendCtx)