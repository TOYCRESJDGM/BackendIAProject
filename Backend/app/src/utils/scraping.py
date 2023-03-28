import requests
from bs4 import BeautifulSoup

def scraping_url(url):
    # send a GET request to the specified URL
    response = requests.get(url)

    # parse the HTML content of the response using BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')

    # extract the title of the webpage
    title = soup.find('title').text

    # extract the description of the webpage
    description = soup.find('meta', attrs={'name': 'description'})['content']

    # extract the image of the webpage
    img_tags = soup.find_all('img')
    if img_tags:
        img_url = img_tags[0]['src']
    else:
        img_url = ""
    
    response = {
        "title": title,
        "description": description,
        "image": img_url
    }

    print("Response", response )

    return response