# Calendar Integration Guide

This guide explains how to implement calendar integration for workshop schedules.

## ICS File Generation

### Manual ICS Creation

Create `.ics` files for each workshop using this template:

```ics
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SFB1252//Research Data Methods//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH

BEGIN:VEVENT
UID:workshop-{workshop-id}@sfb1252.uni-koeln.de
DTSTART:20250917T120000Z
DTEND:20250917T133000Z
SUMMARY:Coding in R - Basics
DESCRIPTION:Introduction to R programming for research applications.\n\nSpeaker: Luke Günther\nLocation: House of Prominence\nMore info: https://sfb1252.github.io/talks/workshops/07-coding-r-basics/
LOCATION:House of Prominence, Attic, Luxemburger Str. 299, Cologne
ORGANIZER;CN=SFB 1252:mailto:jschepen@uni-koeln.de
STATUS:CONFIRMED
TRANSP:OPAQUE
END:VEVENT

END:VCALENDAR
```

### Automated ICS Generation (Jekyll Plugin)

Create a Jekyll plugin to generate ICS files from workshop data:

**File:** `_plugins/calendar_generator.rb`

```ruby
require 'date'

module Jekyll
  class CalendarGenerator < Generator
    safe true
    priority :normal

    def generate(site)
      site.data['schedules'].each do |schedule_name, schedule|
        generate_ics_file(site, schedule_name, schedule)
      end
    end

    private

    def generate_ics_file(site, schedule_name, schedule)
      ics_content = build_ics_content(schedule)
      
      site.static_files << Jekyll::StaticFile.new(
        site, 
        site.source, 
        'calendar', 
        "#{schedule_name}.ics"
      )
      
      # Write ICS file
      File.open(File.join(site.source, 'calendar', "#{schedule_name}.ics"), 'w') do |file|
        file.write(ics_content)
      end
    end

    def build_ics_content(schedule)
      content = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//SFB1252//Research Data Methods//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH"
      ]

      schedule['workshops'].each do |workshop|
        content += build_event(workshop)
      end

      content << "END:VCALENDAR"
      content.join("\n")
    end

    def build_event(workshop)
      start_time = DateTime.parse("#{workshop['date']} #{workshop['time'].split('-')[0].strip}")
      end_time = DateTime.parse("#{workshop['date']} #{workshop['time'].split('-')[1].strip}")
      
      [
        "",
        "BEGIN:VEVENT",
        "UID:workshop-#{workshop['id']}@sfb1252.uni-koeln.de",
        "DTSTART:#{start_time.strftime('%Y%m%dT%H%M%SZ')}",
        "DTEND:#{end_time.strftime('%Y%m%dT%H%M%SZ')}",
        "SUMMARY:#{workshop['title']}",
        "DESCRIPTION:#{build_description(workshop)}",
        "LOCATION:House of Prominence, Attic, Luxemburger Str. 299, Cologne",
        "ORGANIZER;CN=SFB 1252:mailto:jschepen@uni-koeln.de",
        "STATUS:CONFIRMED",
        "TRANSP:OPAQUE",
        "END:VEVENT"
      ]
    end

    def build_description(workshop)
      description = "Speaker: #{workshop['speaker']}, #{workshop['affiliation']}\\n\\n"
      description += "Topics:\\n"
      workshop['topics'].each { |topic| description += "- #{topic}\\n" }
      description += "\\nMore info: https://sfb1252.github.io/talks/workshops/#{workshop['folder']}/"
      description
    end
  end
end
```

## Google Calendar Integration

### Option 1: Google Calendar Links

Add Google Calendar links to each workshop:

```html
<a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text={{ workshop.title | url_encode }}&dates={{ start_date }}/{{ end_date }}&details={{ description | url_encode }}&location={{ location | url_encode }}" 
   target="_blank" 
   class="btn-calendar">
   📅 Add to Google Calendar
</a>
```

### Option 2: Embed Google Calendar

Create a public Google Calendar and embed it:

```html
<div class="calendar-embed">
  <iframe src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=Europe%2FBerlin" 
          style="border: 0" 
          width="800" 
          height="600" 
          frameborder="0" 
          scrolling="no">
  </iframe>
</div>
```

## Implementation Steps

### 1. Setup Calendar Directory

```bash
mkdir calendar
```

### 2. Add ICS Generation to Build Process

Add to `_config.yml`:

```yaml
plugins:
  - calendar_generator

exclude:
  - calendar/*.ics  # Don't process as pages
```

### 3. Add Calendar Links to Templates

Update workshop templates to include calendar links:

```html
<div class="workshop-calendar">
  <h4>Add to Calendar</h4>
  <a href="{{ '/calendar/' | append: site.data.current_schedule | append: '.ics' | relative_url }}" 
     class="btn-calendar">
     📅 Download ICS (All Workshops)
  </a>
  
  <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text={{ workshop.title | url_encode }}&dates={{ workshop.start_datetime }}/{{ workshop.end_datetime }}&details={{ workshop.description | url_encode }}&location=House%20of%20Prominence%2C%20Cologne" 
     target="_blank" 
     class="btn-calendar">
     📅 Add to Google Calendar
  </a>
</div>
```

### 4. Update Styles

Add calendar button styles to CSS:

```css
.btn-calendar {
  display: inline-block;
  padding: 8px 16px;
  background-color: #4285f4;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin: 4px;
}

.btn-calendar:hover {
  background-color: #3367d6;
  color: white;
}

.calendar-embed {
  max-width: 100%;
  overflow-x: auto;
}
```

## Testing Calendar Integration

### ICS File Validation
- Use online ICS validators
- Test import in various calendar applications
- Verify timezone handling (Europe/Berlin)

### Cross-Platform Testing
- Google Calendar
- Outlook
- Apple Calendar
- Thunderbird

## Maintenance

### Regular Updates
- Update ICS files when workshops change
- Monitor calendar link functionality
- Handle timezone changes (summer/winter time)

### Backup Strategy
- Keep calendar data in version control
- Export calendar periodically
- Document calendar setup for continuity

## Troubleshooting

### Common Issues
- **Timezone Problems:** Always use UTC times in ICS files
- **Special Characters:** URL encode descriptions and titles
- **Long Descriptions:** Some calendar apps truncate long descriptions
- **Recurring Events:** Be careful with recurring event syntax

### Support Resources
- [RFC 5545 (iCalendar)](https://tools.ietf.org/html/rfc5545)
- [Google Calendar API Documentation](https://developers.google.com/calendar)
- [ICS Validator Tools](https://icalendar.org/validator.html)
