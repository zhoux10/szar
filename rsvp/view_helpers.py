import json, time
from django.core import serializers
from rsvp.models import RSVP
from django.contrib.auth.models import User

from django.core.urlresolvers import reverse

from django.core.mail import EmailMultiAlternatives
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render

from rsvp.utils import days_between


# Getting hash of rsvp(s)
def rsvps_get_raw(rsvp_id=None):
    rsvps_array = RSVP.objects.all()
    if rsvp_id:
        rsvps_array = RSVP.objects.filter(id=rsvp_id)

    return get_full_rsvp(rsvps_array)

# Getting hash of rsvp(s)
def rsvps_get_attending_raw():
    rsvps_array = RSVP.objects.filter(attending=True)
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
            if rsvp[0].has_valid_email():
                rsvp = rsvp[0]

                if email_type == 'requestaddress':
                    if rsvp.gift:
                        subject = "Sherry and Aneesh Address Request (Respond by Sept 10)"
                    else:
                        subject = "Thank you from Sherry and Aneesh!"

                time.sleep(1)
                send_email(request, email_type, rsvp, subject)
                response_message += "Successfully sent for " + rsvp_id + "."
            else:
                response_message += "No user or email for " + rsvp_id + "."
        else:
            response_message += "No rsvp for " + rsvp_id + "."

    return HttpResponse(response_message, status=200)

def send_email(request, email_type, rsvp, subject):
    if not rsvp.has_valid_email():
        return
    previous_emails = json.loads(rsvp.sent_emails)
    current_date = time.strftime("%c")
    try:
      last_date = previous_emails[email_type][-1]
      if days_between(last_date, current_date) < 1:
          return # Don't sent email if another one was sent less than 24 hours ago
      previous_emails[email_type].append(current_date)
    except Exception as e:
      previous_emails[email_type] = [(time.strftime("%c"))]


    name, username, rsvp_email, full_name, plus_one = rsvp.name(), rsvp.guest.username, rsvp.guest.email, rsvp.full_name(), rsvp.plus_one_name

    if plus_one:
      plus_one = "," + plus_one
    else:
      plus_one = ""

    ctx = {
        "name": name,
        "full_name": full_name + plus_one,
        "attending": rsvp.attending,
        "gift": rsvp.gift,
        "need_hotel": rsvp.need_hotel,
        "dropbox_link": request.build_absolute_uri(reverse('dropbox', )),
        "rsvp_link": request.build_absolute_uri(reverse('make_rsvp', args=(username,))),
        "no_link": request.build_absolute_uri(reverse('quick_actions', args=(username, "no", ))),
        "address_link": request.build_absolute_uri(reverse('update_address', args=(username, ))),
        "unsubscribe": request.build_absolute_uri(reverse('quick_actions', args=(username, "unsubscribe", ))),
        "homepage": request.build_absolute_uri(reverse('custom-root-url', args=(username,)))
    }
    html_content = loader.get_template("email/" + email_type + ".html").render(ctx)
    text_content = loader.render_to_string('email/' + email_type + '.txt', ctx)
    my_email = 'Sherry Zhou <xiao.qiao.zhou+wedding@gmail.com>'
    msg = EmailMultiAlternatives(subject, text_content, my_email, ['{0} <{1}>'.format(full_name, rsvp_email)])
    msg.attach_alternative(html_content, "text/html")
    rsvp.edit({
      "sent_emails": json.dumps(previous_emails)
    })
    msg.send();

def get_email(request, email_type):
    pretendCtx = {
        "name": "Sherry",
        "full_name": "Sherry Zhou,Aneesh Raghunandan",
        "attending": True,
        "gift": True,
        "need_hotel": True,
        "dropbox_link": request.build_absolute_uri(reverse('dropbox', )),
        "rsvp_link": request.build_absolute_uri(reverse('make_rsvp', args=[1])),
        "no_link": request.build_absolute_uri(reverse('quick_actions', args=(1, "no", ))),
        "address_link": request.build_absolute_uri(reverse('update_address', args=('sherry', ))),
        "unsubscribe": request.build_absolute_uri(reverse('quick_actions', args=(1, "unsubscribe", ))),
        "homepage": request.build_absolute_uri(reverse('custom-root-url', args=("sherry",)))
    }
    return render(request, 'email/' + email_type + '.html', pretendCtx)
