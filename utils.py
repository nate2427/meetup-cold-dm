import PyPDF2


def get_links_from_pdf(filename='./chrome_ext/links.pdf'):
    # Open the PDF file and read its content
    with open(filename, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        # Initialize an empty list to store the links
        urls = []
        # Loop through all pages of the PDF
        for page_num in range(0, len(pdf_reader.pages)):
            # Get the current page of the PDF
            page = pdf_reader.pages[page_num]
            # Get the links from the page as a single string
            links_str = page.extract_text().split('\n')[0]
            # Split the links string at each "https" substring
            links_list = links_str.split('https')
            # Loop through each substring starting from the second one
            for link in links_list[1:]:
                # Add "https" back to the beginning of the substring
                url = 'https' + link
                # Add the URL to the list of links
                urls.append(url)
    # Return the list of URLs
    return urls


def create_links_dict(filename='./chrome_ext/links.pdf'):
    urls = get_links_from_pdf(filename)
    links_dict_list = []
    for url in urls:
        # check if https in the URL
        if 'https' not in url or '&' not in url:
            continue
        # Split the URL at the "&" character
        url_parts = url.split('&')
        # Extract the member_id and name from the URL
        member_id = url_parts[1].split('=')[1]
        name = url_parts[2].split('=')[1].replace('+', ' ')
        # Create a dictionary with the member_id, name, and link values
        links_dict = {'name': name, 'id': member_id, 'link': url}
        # Append the dictionary to the list of links dictionaries
        links_dict_list.append(links_dict)
    return links_dict_list
