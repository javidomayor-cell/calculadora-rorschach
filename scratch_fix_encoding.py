import html

with open(r'C:\Users\Javier\Documents\NotebookLMA\Calculadora de Rorscharch\print.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Convert entities to literals
content = html.unescape(content)

# Ensure it's saved as UTF-8
with open(r'C:\Users\Javier\Documents\NotebookLMA\Calculadora de Rorscharch\print.html', 'w', encoding='utf-8') as f:
    f.write(content)
