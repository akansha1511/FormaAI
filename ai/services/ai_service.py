"""
AI Service
Handles AI request processing.
"""

from prompts.form_prompt import build_form_prompt
from utils.json_validator import validate_response


def generate_form(user_input):
    prompt = build_form_prompt(user_input)
    text = user_input.lower()

    if "student" in text:
        response = {
            "success": True,
            "title": "Student Registration Form",
            "fields": [
                {"label": "Student Name", "type": "text", "required": True},
                {"label": "Roll Number", "type": "text", "required": True},
                {"label": "Department", "type": "text", "required": True}
            ]
        }

    elif "employee" in text:
        response = {
            "success": True,
            "title": "Employee Registration Form",
            "fields": [
                {"label": "Employee Name", "type": "text", "required": True},
                {"label": "Employee ID", "type": "text", "required": True},
                {"label": "Department", "type": "text", "required": True}
            ]
        }

    elif "hospital" in text or "patient" in text:
        response = {
            "success": True,
            "title": "Patient Registration Form",
            "fields": [
                {"label": "Patient Name", "type": "text", "required": True},
                {"label": "Age", "type": "number", "required": True},
                {"label": "Symptoms", "type": "textarea", "required": True}
            ]
        }

    else:
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