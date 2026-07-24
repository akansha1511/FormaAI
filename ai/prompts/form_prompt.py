"""
Prompt Builder for FormaAI
"""

def build_form_prompt(user_input):
    return f"""
You are an AI assistant that generates dynamic forms.

Based on the following user request:

{user_input}

Generate only a JSON response using this format:

{{
  "success": true,
  "title": "Generated Form",
  "fields": [
    {{
      "label": "",
      "type": "",
      "required": true
    }}
  ]
}}

Do not include explanations.
"""