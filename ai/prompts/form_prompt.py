"""
FormaAI Prompt Template

This module stores the prompt that will be sent to the AI model.
"""

def build_form_prompt(user_description):
    prompt = f"""
You are an AI assistant for FormaAI.

Analyze the following incident description.

Extract:
- Incident Type
- Date
- Time
- Location
- Vehicle
- Description
- Severity
- Injuries
- Police Report
- Insurance Company

Return ONLY valid JSON.

Incident:

{user_description}
"""

    return prompt