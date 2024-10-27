import os
import requests
from bs4 import BeautifulSoup
import json


def parse_folder(folder):
    """Recursively parse each _catalogFolder and return a nested dictionary with blog links."""
    folder_data = {
        "type": "folder",
        "name": "",
        "title": "",
        "subtitle": "",
        "children": [],
        "blog_entries": [],
    }

    # Get the folder name and details
    name_elem = folder.select_one("._name")
    if not name_elem:
        return None

    folder_data["name"] = name_elem.get_text(strip=True)

    # Get title and subtitle from nameBody if exists
    name_body = folder.select_one("._nameBody")
    if name_body:
        title_span = name_body.select_one("span")
        subtitle_elem = name_body.select_one("small")

        if title_span:
            folder_data["title"] = title_span.get_text(strip=True)
        if subtitle_elem:
            folder_data["subtitle"] = subtitle_elem.get_text(strip=True)

    # Find direct children
    children_container = folder.select_one("._children")
    if children_container:
        # Process immediate child folders
        for child in children_container.select(
            ":scope > li > ._catalogNode > ._catalogFolder"
        ):
            child_data = parse_folder(child)
            if child_data:
                folder_data["children"].append(child_data)

        # Extract blog entries
        blog_entries = children_container.select(
            ":scope > li > ._catalogNode > ._catalogBlogEntry"
        )
        for entry in blog_entries:
            blog_data = {"type": "blog", "title": "", "link": ""}

            name_body = entry.select_one("._nameBody")
            if name_body:
                title_span = name_body.select_one("span")
                if title_span:
                    blog_data["title"] = title_span.get_text(strip=True)

                link_elem = name_body.select_one("a[href^='/blog/entry/']")
                if link_elem:
                    blog_data["link"] = "https://codeforces.com" + link_elem["href"]

                folder_data["blog_entries"].append(blog_data)

    return folder_data


def clean_catalog_data(url, filename="catalog.html"):
    # Custom headers to mimic a browser request
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
    }

    # Check if the file already exists
    if os.path.exists(filename):
        with open(filename, "r", encoding="utf-8") as file:
            html_content = file.read()
    else:
        # Send request and save the content
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        html_content = response.text
        with open(filename, "w", encoding="utf-8") as file:
            file.write(html_content)

    # Parse the HTML content
    soup = BeautifulSoup(html_content, "html.parser")

    # Initialize catalog hierarchy
    catalog = {"type": "root", "children": []}

    # Start parsing from each top-level _catalogFolder
    for top_folder in soup.select(
        "._CatalogViewFrame_catalog > ._catalogNode > ._catalogFolder"
    ):
        folder_data = parse_folder(top_folder)
        if folder_data:
            catalog["children"].append(folder_data)

    return catalog


if __name__ == "__main__":
    url = "https://codeforces.com/catalog"
    catalog = clean_catalog_data(url)

    # Save to JSON file
    with open("../web/src/catalog/catalog.json", "w", encoding="utf-8") as f:
        json.dump(catalog, f, indent=2, ensure_ascii=False)

    with open("catalog.json", "w", encoding="utf-8") as f:
        json.dump(catalog, f, indent=2, ensure_ascii=False)
