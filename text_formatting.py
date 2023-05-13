import requests
from bs4 import BeautifulSoup
import random

def process_text(text):
    n = random.randint(2, 3)
    soup = BeautifulSoup(text, 'html.parser')
    paragraphs = soup.find_all('p')
    for p in paragraphs:
        words = p.get_text().split()
        new_words = []
        for word in words:
            if len(word) <= 3:
                new_word = f"<span style='font-weight:bold'>{word[0]}</span>{word[1:]}"
            else:
                new_word = f"<span style='font-weight:bold'>{word[:n]}</span>{word[n:]}"
            new_words.append(new_word)
        new_text = " ".join(new_words)
        p.contents = BeautifulSoup(new_text, 'html.parser').contents
    return str(soup)

# URL of the website to scrape
url = 'https://fs.blog/great-talks/psychology-human-misjudgment/'

# Send a GET request to the website and retrieve its content
response = requests.get(url)
content = response.content

# Parse the HTML content using Beautiful Soup
soup = BeautifulSoup(content, 'html.parser')

# Find all the text on the page
text = soup.get_text()

# Process the text
processed_html = process_text(str(soup))

# Find the body tag and replace its contents with the processed HTML
body = soup.body
body.clear()
body.append(BeautifulSoup(processed_html, 'html.parser'))

# Save the modified HTML to a file
with open('formattest.html', 'w') as f:
    f.write(str(soup))