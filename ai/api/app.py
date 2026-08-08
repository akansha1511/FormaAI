import os
import sys
from datetime import datetime

# Add parent directory to path for imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from flask import Flask, request, jsonify
from flask_cors import CORS

# ✅ Correct imports from ai_service.py
from services.ai_service import (
    generate_form,
    extract_information,
    autofill_fields,
    detect_form_type,
    get_form_fields
)

app = Flask(__name__)
CORS(app)

# ================================================================
#  HEALTH & STATUS ENDPOINTS
# ================================================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "service": "FormaAI Python Service",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "health": "GET /health",
            "generate": "POST /api/ai/generate",
            "extract": "POST /api/ai/extract",
            "analyze": "POST /api/ai/analyze",
            "generate-form": "POST /api/ai/generate-form"
        }
    })

@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "service": "FormaAI Python AI Service",
        "timestamp": datetime.now().isoformat()
    })

# ================================================================
#  GENERATE FORM ENDPOINT
# ================================================================

@app.route("/api/ai/generate", methods=["POST"])
def generate():
    """
    Generate form from user prompt
    """
    try:
        data = request.get_json()
        
        if not data or "prompt" not in data:
            return jsonify({
                "success": False,
                "message": "Prompt is required."
            }), 400

        user_prompt = data["prompt"]
        response = generate_form(user_prompt)
        return jsonify(response)
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

# ================================================================
#  EXTRACT DATA ENDPOINT
# ================================================================

@app.route("/api/ai/extract", methods=["POST"])
def extract():
    """
    Extract structured data from incident description
    """
    try:
        data = request.get_json()
        
        if not data or "description" not in data:
            return jsonify({
                "success": False,
                "message": "Description is required."
            }), 400

        description = data["description"]
        result = extract_information(description)
        
        return jsonify({
            "success": True,
            "data": result,
            "message": "Extraction successful"
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

# ================================================================
#  ANALYZE INCIDENT ENDPOINT
# ================================================================

@app.route("/api/ai/analyze", methods=["POST"])
def analyze():
    """
    Analyze incident data and provide insights
    """
    try:
        data = request.get_json()
        
        if not data or "incident_data" not in data:
            return jsonify({
                "success": False,
                "message": "Incident data is required."
            }), 400

        incident_data = data["incident_data"]
        
        # Simple analysis logic
        analysis = {
            "summary": "Incident analyzed successfully",
            "riskLevel": "Medium",
            "suggestedActions": ["Review documentation", "Contact insurance"],
            "analysisDetails": {}
        }
        
        # Analyze severity
        severity = incident_data.get("severity", "").lower()
        if severity == "critical":
            analysis["riskLevel"] = "Critical"
            analysis["suggestedActions"].extend([
                "Immediate legal counsel recommended",
                "Notify insurance immediately",
                "Document all evidence"
            ])
        elif severity == "high":
            analysis["riskLevel"] = "High"
            analysis["suggestedActions"].extend([
                "Contact insurance provider",
                "Gather supporting documents"
            ])
        
        return jsonify({
            "success": True,
            "data": analysis,
            "message": "Analysis complete"
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

# ================================================================
#  GENERATE FORM FROM EXTRACTED DATA
# ================================================================

@app.route("/api/ai/generate-form", methods=["POST"])
def generate_form_from_data():
    """
    Generate dynamic form from extracted data
    """
    try:
        data = request.get_json()
        
        if not data or "extracted_data" not in data:
            return jsonify({
                "success": False,
                "message": "Extracted data is required."
            }), 400

        extracted_data = data["extracted_data"]
        form_type = data.get("form_type", "incident")
        
        # Generate form fields
        fields = get_form_fields(form_type)
        fields = autofill_fields(fields, extracted_data)
        
        return jsonify({
            "success": True,
            "data": {
                "title": f"{form_type.replace('_', ' ').title()} Form",
                "fields": fields,
                "extractedData": extracted_data
            },
            "message": "Form generated successfully"
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

# ================================================================
#  ERROR HANDLERS
# ================================================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "message": "Endpoint not found. Please check the URL.",
        "available_endpoints": [
            "/",
            "/health",
            "/api/ai/generate",
            "/api/ai/extract",
            "/api/ai/analyze",
            "/api/ai/generate-form"
        ]
    }), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({
        "success": False,
        "message": "Internal server error. Please try again later."
    }), 500

# ================================================================
#  RUN SERVER
# ================================================================

if __name__ == "__main__":
    port = int(os.getenv("AI_SERVICE_PORT", 5001))
    debug = os.getenv("DEBUG", "True").lower() == "true"
    
    print(f"""
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🤖 FormaAI AI Service Started                               ║
║                                                               ║
║   📡 Port:          {port}                                      ║
║   📍 URL:           http://localhost:{port}                     ║
║   🔧 Debug Mode:    {debug}                                      ║
║                                                               ║
║   📋 Endpoints:                                               ║
║   - GET  /                        Service info                ║
║   - GET  /health                  Health check                ║
║   - POST /api/ai/generate         Generate form               ║
║   - POST /api/ai/extract          Extract data                ║
║   - POST /api/ai/analyze          Analyze incident            ║
║   - POST /api/ai/generate-form    Generate from extracted     ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
    """)
    
    app.run(host="0.0.0.0", port=port, debug=debug)
