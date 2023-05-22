# Meetup Mass Messenger Chrome Extension

## Introduction

The Meetup Mass Messenger Chrome Extension is designed to make it easy to message multiple Meetup group members at once. The extension allows users to input a filename, which is then used to retrieve links to meetups from the backend. Users can then input a message, which is sent to all of the members with the retrieved meetup links.

## Technologies Used

- JavaScript
- Flask
- Chrome Extension API
- HTML/CSS
- Files

## manifest.json:

specifies the details of the extension, including its name, description, and files
send_message.html: defines the UI of the extension, including a form for the user to input the filename and a button to retrieve links from the backend

## send_message.js:

defines the behavior of the extension UI, including sending a request to the backend to retrieve the links and adding a message textarea and send button to the UI

## background.js:

defines the behavior of the background script for the extension, including listening for messages from the UI and sending messages to the Meetup members

## server.py:

a Flask server that parses the PDF file and returns the list of Meetup links

## How It Works

The user inputs a filename into the extension UI and clicks the "Get Links" button.
The send_message.js file sends a request to the backend Flask server with the filename.
The server.py file parses the PDF file with the specified filename and returns the list of Meetup links to the send_message.js file.
The send_message.js file adds a message textarea and send button to the UI.
The
