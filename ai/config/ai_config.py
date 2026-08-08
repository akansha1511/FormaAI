import os
from dotenv import load_dotenv

load_dotenv()

# ================================================================
#  OPENAI API CONFIGURATION
# ================================================================

# API Key (from environment variables)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Model Configuration
MODEL_NAME = "gpt-4-turbo-preview"  # or "gpt-3.5-turbo"
MODEL_NAME_FAST = "gpt-3.5-turbo"

# Generation Config
GENERATION_CONFIG = {
    "temperature": 0.3,
    "top_p": 0.95,
    "max_tokens": 1024,
    "frequency_penalty": 0.0,
    "presence_penalty": 0.0,
    "stop": None,
}

# Timeout
TIMEOUT = 30

# ================================================================
#  EXTRACTION CONFIGURATION
# ================================================================

EXTRACTION_CONFIG = {
    "confidence_threshold": 0.7,
    "max_fields": 30,
    "min_text_length": 10
}

# ================================================================
#  RATE LIMITING
# ================================================================

RATE_LIMIT = {
    "requests_per_minute": 60,
    "requests_per_day": 1000
}
