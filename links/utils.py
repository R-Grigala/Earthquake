import requests
import lxml
from bs4 import BeautifulSoup

def get_link_data(url):
    headers = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    "Accept-Language": "en",

    }

    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "lxml")

    name = soup.select_one(selector="#title").getText()
    name = name.strip()


    # price = soup.select_one(selector="#priceblock_ourprice")
    price = soup.select_one(selector=".a-offscreen")
    if price is not None:
        price = price.getText()
        price = float(price[1:])
    
    return name, price