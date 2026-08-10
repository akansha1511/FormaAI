import os

class AIConfig:
    # Provider
    AI_PROVIDER = os.getenv("AI_PROVIDER", "gemini")
    
    # Gemini Config
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    # ✅ CORRECT: Use 'models/' prefix
    GEMINI_MODEL = os.getenv("GEMINI_MODEL", "models/gemini-1.5-flash")
    GEMINI_MODEL_FAST = os.getenv("GEMINI_MODEL_FAST", "models/gemini-1.5-flash")
    
    # Generation Config
    GEMINI_GENERATION_CONFIG = {
        "temperature": float(os.getenv("TEMPERATURE", 0.3)),
        "top_p": float(os.getenv("TOP_P", 0.95)),
        "top_k": int(os.getenv("TOP_K", 40)),
        "max_output_tokens": int(os.getenv("MAX_TOKENS", 1024)),
    }
    
    # Safety Settings
    GEMINI_SAFETY_SETTINGS = [
        {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    ]
    
    # Common
    TIMEOUT = int(os.getenv("TIMEOUT", 30))
    EXTRACTION_CONFIDENCE_THRESHOLD = float(os.getenv("EXTRACTION_CONFIDENCE_THRESHOLD", 0.7))

config = AIConfig()
