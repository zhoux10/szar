# To do
  - [ ] Implement https://modernizr.com/ (IE/mobile dreariness)
  - [x] Fix font issue
  - [x] Enable excel/csv file upload of wedding guests
    - [x] Ideally, allow drag/drop, but low priority
  - [x] Enable emailing of invitations
    - [ ] Allow confirmation of rsvp and updateable forms
  - [ ] Debug stupid font (damn you Italianno, stop being comic sans!)
  - [ ] Create typical wedding pages:
    - [ ] Logistics:
      - [ ] Venue
      - [ ] schedule/ceremony primer
      - [ ] hotels
      - [ ] travel
      - [ ] dress
      - [ ] countdown?
    - [X] Honeyfund/donate options
    - [ ] Bio/Meeting/Engagement/Pictures
  - [ ] Analytics graphs
  - [ ] RSVP graphs
  - [ ] Photos page:
    - [ ] Engagement photos
    - [ ] Facebook
    - [ ] Instagram
    - [ ] text
    - [ ] Twitter

# First time
  * Create virtual environment
  * Activate virtual environment with ```. ENV_NAME/bin/activate```
  * Install requirements  ```pip install -r requirements.txt```
  * ```python manage.py migrate --settings=szar_site.settings```

# To run
  * Activate virtual environment with ```. ENV_NAME/bin/activate```
  * ``python manage.py runserver --settings=szar_site.settings```

# Technologies
  * Visuals:
    * Fancy css/svg animations inspired by http://codepen.io/jamestowers/pen/dhDbn
    * Tons of SVG graphics, background converted by http://dopiaza.org/tools/datauri/index.php
    * Chinese font explanation: http://www.kendraschaefer.com/2012/06/chinese-standard-web-fonts-the-ultimate-guide-to-css-font-family-declarations-for-web-design-in-simplified-chinese/
    * SVG Frame, can't remember where it was originally from, but available here: https://openclipart.org/detail/176385/decorative-frame-1
    * Font: self hosted with https://google-webfonts-helper.herokuapp.com/fonts/italianno template css. Alternative is https://github.com/neverpanic/google-font-download.
    * Custom Bootstrap for main page (http://getbootstrap.com/customize/?id=7825818c7b9d02fd87627bd92b48cbcf), invitation page too fragile to accomodate bootstrap formatting

  * Excel/CSV upload:
    * Django-excel: https://github.com/pyexcel/django-excel, docs at http://django-excel.readthedocs.org/en/latest/
      * Benefits: recently updated, accepts multiple formats
      * Downsides -- the nice function save_to_database() doesn't work if you're not using every single column. Very difficult problem to debug....
      * Alternatives: Django Data Importer (http://django-data-importer.readthedocs.org/en/latest/readme.html), js-xlsx (https://github.com/SheetJS/js-xlsx)
    * Dropzone.js for nice file upload interface: http://www.dropzonejs.com/

  * Django email: https://docs.djangoproject.com/en/1.9/topics/email/
    * Quick-start info: http://www.mangooranges.com/2008/09/15/sending-email-via-gmail-in-django/
    * Text and HTML template support: http://stackoverflow.com/questions/2809547/creating-email-templates-with-django
    * Responsive email template: https://github.com/leemunroe/responsive-html-email-template

  * Prevent Heroku spindown
    * Use https://www.statuscake.com (alternative to pingdom) to test homepage and rsvp page every hour

  * Embed Wanderable into website
    * Address No 'Access-Control-Allow-Origin' header by using http://anyorigin.com/get?url=
    * Alternative was to use iframe, but ugly scrollbar placements, page padding, redirects (redirect can be prevented using ```<iframe class="hidden" src="URL" sandbox="allow-forms allow-scripts"></iframe>```)
    * Have to change links by prepending Wanderable url
    * Use localStorage to cache old version of Wanderable, otherwise, too many requests (and too slow) to anyorigin. Alternative is cookie, but that stores less data and is not fit for this use-case (Possibly better method is to make a copy of the page and store on my server, updating every day): http://stackoverflow.com/questions/14266730/js-how-to-cache-a-variable
