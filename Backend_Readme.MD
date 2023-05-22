# Documentation for Meetup Scraper Backend

The Meetup Scraper Backend consists of two Python files: utils.py and server.py.

# utils.py

This file includes two functions:

### getlinksfrompdf(filename='./chromeext/links.pdf')

This function reads a PDF file and returns a list of URLs found in the first line of each page of the PDF. It takes an optional argument filename, which specifies the path to the PDF file to be read. If no argument is provided, it reads the links.pdf file in the chrome_ext directory.

### createlinksdict(filename='./chrome_ext/links.pdf')

This function calls the get_links_from_pdf function to retrieve a list of URLs from a PDF file, and then extracts the member_id, name, and link values from each URL to create a dictionary. It returns a list of such dictionaries. It takes an optional argument filename, which specifies the path to the PDF file to be read. If no argument is provided, it reads the links.pdf file in the chrome_ext directory.

# server.py

This file includes a Flask application that serves as the backend API for the Meetup Scraper. It has two routes:

### /

This route returns a simple "Hello, World!" message.

### /get_links

This route expects a POST request with a JSON payload that includes a filename key specifying the name of the PDF file to be parsed. It then calls the create_links_dict function from utils.py to parse the PDF file and returns the resulting list of dictionaries as a JSON response.

The Flask application also enables Cross-Origin Resource Sharing (CORS) using the flask_cors package to allow the frontend to access the backend API from a different domain.

To run the backend, simply execute the server.py file. The Flask application will run on http://localhost:5000 by default, and you can access the routes using a tool such as Postman.
