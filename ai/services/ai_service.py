import re
from datetime import datetime

def extract_information(text):
    """Extract structured data from text"""
    text_lower = text.lower()
    extracted_data = {}

    # Vehicle detection
    vehicles = ["honda", "toyota", "hyundai", "maruti", "suzuki", "ford", "tata", "mahindra", "bmw", "mercedes", "audi"]
    for vehicle in vehicles:
        if vehicle in text_lower:
            extracted_data["vehicle"] = vehicle.title()
            break
    
    # Incident type
    if "accident" in text_lower or "crash" in text_lower:
        extracted_data["incidentType"] = "Accident"
    elif "fire" in text_lower:
        extracted_data["incidentType"] = "Fire"
    elif "theft" in text_lower or "stolen" in text_lower:
        extracted_data["incidentType"] = "Theft"
    else:
        extracted_data["incidentType"] = "General Incident"
    
    # Name
    name_match = re.search(r"my name is\s+([A-Z][a-z]+\s+[A-Z][a-z]+)", text, re.IGNORECASE)
    if name_match:
        extracted_data["ownerName"] = name_match.group(1)
    
    # Location
    location_match = re.search(r"(?:at|in)\s+([^,.]+(?:,\s*[^,.]+)?)", text, re.IGNORECASE)
    if location_match:
        extracted_data["location"] = location_match.group(1).strip()
    
    return extracted_data

def autofill_fields(fields, extracted_data):
    """Auto-fill form fields"""
    if not fields or not extracted_data:
        return fields
    
    for field in fields:
        label = field["label"].lower()
        if "vehicle" in label and "vehicle" in extracted_data:
            field["value"] = extracted_data["vehicle"]
        elif "name" in label and "ownerName" in extracted_data:
            field["value"] = extracted_data["ownerName"]
        elif "location" in label and "location" in extracted_data:
            field["value"] = extracted_data["location"]
        elif "incident" in label and "incidentType" in extracted_data:
            field["value"] = extracted_data["incidentType"]
    
    return fields

def generate_form(user_input):
    """Generate form from user input"""
    extracted_data = extract_information(user_input)
    form_type = detect_form_type(user_input)
    fields = get_form_fields(form_type)
    fields = autofill_fields(fields, extracted_data)
    
    return {
        "success": True,
        "title": f"{form_type.replace('_', ' ').title()} Form",
        "fields": fields,
        "extractedData": extracted_data
    }

def detect_form_type(text):
    """Detect form type"""
    text_lower = text.lower()
    if "student" in text_lower:
        return "student_registration"
    elif "employee" in text_lower:
        return "employee_registration"
    elif "patient" in text_lower or "hospital" in text_lower:
        return "patient_registration"
    elif "accident" in text_lower or "vehicle" in text_lower:
        return "incident_report"
    else:
        return "general_form"

def get_form_fields(form_type):
    """Get form fields"""
    common = [
        {"label": "Full Name", "type": "text", "required": True, "placeholder": "Enter your full name"},
        {"label": "Phone", "type": "tel", "required": True, "placeholder": "Enter phone number"},
        {"label": "Email", "type": "email", "required": False, "placeholder": "Enter email address"}
    ]
    
    if form_type == "student_registration":
        specific = [
            {"label": "Roll Number", "type": "text", "required": True, "placeholder": "Enter roll number"},
            {"label": "Department", "type": "text", "required": True, "placeholder": "Enter department"}
        ]
    elif form_type == "employee_registration":
        specific = [
            {"label": "Employee ID", "type": "text", "required": True, "placeholder": "Enter employee ID"},
            {"label": "Department", "type": "select", "required": True, "options": ["HR", "Engineering", "Finance", "Marketing"]}
        ]
    elif form_type == "patient_registration":
        specific = [
            {"label": "Age", "type": "number", "required": True, "placeholder": "Enter age"},
            {"label": "Symptoms", "type": "textarea", "required": True, "placeholder": "Describe symptoms"}
        ]
    elif form_type == "incident_report":
        specific = [
            {"label": "Incident Type", "type": "text", "required": True, "placeholder": "Enter incident type"},
            {"label": "Location", "type": "text", "required": True, "placeholder": "Enter location"},
            {"label": "Description", "type": "textarea", "required": True, "placeholder": "Describe the incident"}
        ]
    else:
        specific = [
            {"label": "Description", "type": "textarea", "required": True, "placeholder": "Describe what you need"}
        ]
    
    return common + specific
