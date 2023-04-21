---
layout: null
---

// Credits to https://thomascfoulds.com/2020/07/27/jekyll-static-site-search-lunr.html
window.store = {
  {% assign searchable_pages = site.pages | where_exp: "page", "page.group" %}
  {% for page in searchable_pages %}
    "{{ page.url | slugify }}": {
      "title": "{{ page.title | xml_escape }}",
      "content": {{ page.content | strip_html | jsonify }},
      "url": "{{ site.url }}{{ site.baseurl }}{{ page.url | xml_escape }}"
    }
    {% unless forloop.last %},{% endunless %}
  {% endfor %}
}
