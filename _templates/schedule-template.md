---
layout: default
data_file: winter-2025-26
---

{% assign schedule = site.data.schedules[page.data_file] %}

# Research Data & Methods - {{ schedule.semester }} Schedule

**Series Information:**

- **When:** {{ schedule.series_info.frequency }}, {{ schedule.series_info.time }}
- **Where:** {{ schedule.series_info.location }}
- **Organizers:** {% for organizer in schedule.series_info.organizers %}{{ organizer.name }}, {{ organizer.affiliation }}{% unless forloop.last %} & {% endunless %}{% endfor %}

## Workshop Schedule

{% for workshop in schedule.workshops %}

### {{ workshop.id }}. {{ workshop.title }}

**Date:** {{ workshop.date | date: "%d. %B %Y" }}  
**Time:** {{ workshop.time }}  
**Speaker:** {{ workshop.speaker }}, *{{ workshop.affiliation }}*

**Topics:**

{% for topic in workshop.topics %}
- {{ topic }}
{% endfor %}

{% if workshop.materials.size > 0 %}
**Materials:**
{% for material in workshop.materials %}
- [{{ material.title }}]({{ material.url }})
{% endfor %}
{% endif %}

---
{% endfor %}

## Additional Information

### Target Audience

{{ schedule.additional_info.target_audience }}

### Series Description

{{ schedule.additional_info.description }}

### Prerequisites

{% for prereq in schedule.additional_info.prerequisites %}
- {{ prereq }}
{% endfor %}

### Contact

{% for organizer in schedule.series_info.organizers %}
- **{{ organizer.name }}**, {{ organizer.affiliation }}
{% if organizer.email %}  - Email: {{ organizer.email }}{% endif %}
{% if organizer.office %}  - Office: {{ organizer.office }}{% endif %}
{% endfor %}

### Related Events

For additional training opportunities, see the [Project S Onboarding materials](../onboarding/) which include information about:

{% for event in schedule.additional_info.related_events %}
- {{ event }}
{% endfor %}

### Registration

{{ schedule.additional_info.registration }}

---

Part of SFB 1252 "Prominence in Language" - University of Cologne
