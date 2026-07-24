"""
AI Service
Handles AI request processing.
"""

from prompts.form_prompt import build_form_prompt
from utils.json_validator import validate_response


def generate_form(user_input):
    prompt = build_form_prompt(user_input)

    # Placeholder response
    response = {
        "success": True,
        "title": "Generated Form",
        "fields": [
            {
                "label": "Full Name",
                "type": "text",
                "required": True
            }
        ]
    }

    if validate_response(response):
        return response

    return {
        "success": False,
        "title": "Invalid Response",
        "fields": []
    }