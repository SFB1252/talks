# Workshop Schedule Template

This template system helps reduce manual updates when creating new semester
schedules.

## Data Structure

Workshop schedules are stored as YAML data files in `_data/schedules/` and
rendered using Jekyll templates.

## Creating a New Schedule

1. Copy an existing schedule YAML file
2. Update dates, speakers, and topics
3. Create new markdown file using the schedule template
4. Update navigation in `_config.yml`

## Template Files

- `_layouts/schedule.html` - Schedule page layout
- `_includes/workshop-card.html` - Individual workshop component
- `_data/schedules/` - YAML data files for each semester

## Configuration

Update `_config.yml` to include new schedules in navigation:

```yaml
header_pages:
  - agenda/current-schedule.md
  - agenda/archive/previous-schedule.md
```

## Dynamic Elements

The template system supports:

- Automatic date formatting
- Speaker information with links
- Material availability status
- Registration deadlines
- Calendar integration links
