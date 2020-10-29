# SI Gathering Challenge: Nike Collaborative Notepad

## Reason
We have noticed that Microsoft Teams Notes does not send notes to meeting participants interactively. One has to navigate out of the section being edited, then the others get the update.

The idea is to create a single web page where all the participants can type the text and get updates immediately.

## POC/MVP Features
- Web page with one big text area
- All users logged to the web page may edit the text
- Updates are sent immediately to all participants
- Authentication - Only Equinor users may log on

## Additional Features
(may be considered for implementation)
- Autosave
- Rich text
- Drawing
- List of participants

## Technology stack:
- Javascript
- Node.js

## Requirements

## Development

## Deployment


To run the project locally, you need docker:

```
docker build -t <name> .
docker run -p 8000:8000 <name>
```
