"""Creates RSVP model"""
from django.db import models
from django.utils import timezone

class RSVP(models.Model):
    """Model stores RSVP form inputs"""
    guest = models.OneToOneField('auth.User')
    attending = models.NullBooleanField()
    vegetarian = models.NullBooleanField()
    other_dietary_restrictions = models.TextField(blank=True)
    SATURDAY = 1
    SUNDAY = 2
    DATE_OPTIONS = (
        (SATURDAY, "Saturday evening reception"),
        (SUNDAY, "Sunday morning wedding ceremony and brunch"),
    )
    attending_dates = models.CommaSeparatedIntegerField(max_length=4,
                                                        choices=DATE_OPTIONS,
                                                        blank=True)
    need_carpool = models.NullBooleanField()
    need_hotel = models.NullBooleanField()
    plus_one = models.BooleanField(default=False)
    plus_one_name = models.CharField(max_length=200, null=True, unique=True, default=None)
    song_requests = models.CharField(max_length=200, blank=True)
    gift = models.CharField(max_length=200, blank=True)
    formal_prefix = models.CharField(max_length=200, blank=True)
    affiliation = models.CharField(default="", max_length=200)
    number_attendees = models.IntegerField(default=None, null=True, blank=True)
    expected_attendees = models.DecimalField(default=1, max_digits=4, decimal_places=1)
    created_date = models.DateTimeField(default=timezone.now, editable=False)
    edited_date = models.DateTimeField(default=timezone.now, blank=True)

    def edit(self, new_values):
        """Publishes RSVP"""
        self.edited_date = timezone.now()
        for attr, value in new_values.items():
            setattr(self, attr, value)
        self.save()

    def user(self):
        user = User.objects.filter(id=self.guest_id)
        if len(user) > 0:
            return user[0]
        else:
            return None

    def __str__(self):
        return self.guest.username
