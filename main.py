import requests
from bs4 import BeautifulSoup
import lxml

url_playStation = "https://www.amazon.com/DualShock-Wireless-Controller-PlayStation-Black-4/dp/B01LWVX2RG/ref=lp_16225016011_1_7"
url = "https://www.amazon.com/Razer-DeathAdder-Essential-Gaming-Mouse/dp/B094PS5RZQ/ref=sr_1_1?keywords=gaming+mouse&pd_rd_r=1e2b6776-16c1-4b97-b3d8-923696cce7b1&pd_rd_w=UG38P&pd_rd_wg=HHSUw&pf_rd_p=12129333-2117-4490-9c17-6d31baf0582a&pf_rd_r=E0RW66CQQJ3KDFA9JRWQ&qid=1659089133&sr=8-1"


def get_link_data(url):
    headers = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    "Accept-Language": "en",

    }

    r = requests.get(url, headers=headers)
    soup = BeautifulSoup(r.text, "lxml")

    name = soup.select_one(selector="#title").getText()
    name = name.strip()


    price = soup.select_one(selector="#priceblock_ourprice")
    if price is not None:
        price = price.getText()
        price = float(price[1:])
    
    return name, price

print(get_link_data(url_playStation))