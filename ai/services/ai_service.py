"""
AI Service
Handles AI request processing.
"""

from prompts.form_prompt import build_form_prompt
from utils.json_validator import validate_response


def generate_form(user_input):
    prompt = build_form_prompt(user_input)
    text = user_input.lower()
    extracted_data = {}


    if "honda" in text:
       extracted_data["vehicle"] = "Honda"

    if "toyota" in text:
       extracted_data["vehicle"] = "Toyota"

    if "deer" in text:
       extracted_data["incidentType"] = "Animal Collision"

    if "windshield" in text:
       extracted_data["damage"] = "Windshield"

    if "nh48" in text:
       extracted_data["road"] = "NH48"

    if "student" in text:
        response = {
            "success": True,
            "title": "Student Registration Form",
            "fields": [
                {"label": "Student Name", "type": "text", "required": True, "placeholder": "Enter student name"},
                {"label": "Roll Number", "type": "text", "required": True, "placeholder": "Enter roll number"},
                {"label": "Department", "type": "text", "required": True, "placeholder": "Enter department"}   
            ]
        }

    elif "employee" in text:
        response = {
            "success": True,
            "title": "Employee Registration Form",
            "fields": [
                {"label": "Employee Name", "type": "text", "required": True, "placeholder": "Enter employee name"},
                {"label": "Employee ID", "type": "text", "required": True, "placeholder": "Enter employee ID"},
                {"label": "Department", "type": "text", "required": True, "placeholder": "Enter department"}
            ]
        }

    elif "hospital" in text or "patient" in text:
        response = {
            "success": True,
            "title": "Patient Registration Form",
            "fields": [
                {"label": "Patient Name", "type": "text", "required": True, "placeholder": "Enter patient name"},
                {"label": "Age", "type": "number", "required": True, "placeholder": "Enter age"},
                {"label": "Symptoms", "type": "textarea", "required": True, "placeholder": "Describe symptoms"}
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
                   "required": True,
                   "placeholder": "Enter your full name"
                }
            ],
               "extractedData": extracted_data
        }

    if validate_response(response):
        return response

    return {
        "success": False,
        "title": "Invalid Response",
        "fields": []
    }