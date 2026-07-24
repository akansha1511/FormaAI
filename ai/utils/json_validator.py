"""
JSON Validator
Checks whether the generated response has the required structure.
"""

def validate_response(response):
    required_keys = ["success", "title", "fields"]

    for key in required_keys:
        if key not in response:
            return False

    return True