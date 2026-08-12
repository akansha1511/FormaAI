import os
import json
import re
from google import genai
from config.ai_config import config

print("=" * 60)
print("🔍 LOADING GEMINI SERVICE")
print("=" * 60)

api_key = config.GEMINI_API_KEY
if not api_key:
    print("❌ GEMINI_API_KEY is MISSING!")
    client = None
else:
    print(f"✅ API Key found: {api_key[:15]}...")
    try:
        client = genai.Client(api_key=api_key)
        print("✅ Gemini client initialized successfully")
    except Exception as e:
        print(f"❌ Client initialization error: {e}")
        client = None

def extract_with_gemini(text):
    """Extract ALL information using Gemini"""
    if not client:
        print("❌ Gemini client not available")
        return fallback_extraction(text)
    
    try:
        print("🤖 Extracting with Gemini...")
        
        prompt = f"""
You are an expert data extraction AI. Extract ALL possible information from this text.
Return ONLY valid JSON with no markdown, no explanations.

TEXT:
{text}

EXTRACT THESE EXACT FIELDS (use "Not provided" if missing):

PERSONAL INFORMATION:
- fullName: Full name of the person
- age: Age as number
- phoneNumber: Phone number
- emailAddress: Email address
- address: Complete address
- city: City
- state: State
- occupation: Job title
- employer: Company name

INCIDENT DETAILS:
- incidentType: Type of incident (Theft, Accident, Fire, Injury, etc.)
- severity: Level (Low/Medium/High/Critical)
- incidentDate: Date in DD/MM/YYYY format
- incidentTime: Time in HH:MM AM/PM format
- incidentLocation: Location where incident occurred
- incidentDescription: Full description

POLICE DETAILS:
- policeReportFiled: Yes/No
- firNumber: FIR number
- policeStationName: Police station name

INSURANCE DETAILS:
- insuranceCompanyName: Insurance company name
- policyNumber: Policy number
- claimNumber: Claim number
- claimType: Type of claim

FINANCIAL DETAILS:
- estimatedTotalLoss: Estimated total loss amount

WITNESSES & EVIDENCE:
- witnesses: List of witness names
- evidenceAvailable: List of evidence

Return ONLY valid JSON. Use "Not provided" for missing fields.
"""
        
        response = client.models.generate_content(
            model=config.GEMINI_MODEL,
            contents=prompt,
            config={
                "temperature": 0.0,
                "max_output_tokens": 4096,
            }
        )
        
        result_text = response.text.strip()
        print(f"📥 Raw response: {result_text[:200]}...")
        
        if "```json" in result_text:
            result_text = result_text.split("```json")[1].split("```")[0].strip()
        elif "```" in result_text:
            result_text = result_text.split("```")[1].split("```")[0].strip()
        
        extracted = json.loads(result_text)
        print(f"✅ Extraction successful! Found {len(extracted)} fields")
        
        # Merge with fallback
        fallback = fallback_extraction(text)
        for key, value in fallback.items():
            if key not in extracted or extracted[key] == "Not provided" or extracted[key] == "":
                extracted[key] = value
        
        return extracted
        
    except Exception as e:
        print(f"❌ Gemini error: {e}")
        return fallback_extraction(text)

def fallback_extraction(text):
    """Fallback extraction"""
    print("⚠️ Using fallback extraction")
    extracted = {}
    
    # Name
    name_match = re.search(r"my name is\s+([A-Z][a-z]+\s+[A-Z][a-z]+)", text, re.IGNORECASE)
    if name_match:
        extracted["fullName"] = name_match.group(1)
    else:
        name_match = re.search(r"name\s*:?\s*([A-Z][a-z]+\s+[A-Z][a-z]+)", text, re.IGNORECASE)
        if name_match:
            extracted["fullName"] = name_match.group(1)
    
    # Age
    age_match = re.search(r"(\d{1,2})-year-old", text)
    if age_match:
        extracted["age"] = age_match.group(1)
    else:
        age_match = re.search(r"age\s*:?\s*(\d{1,2})", text, re.IGNORECASE)
        if age_match:
            extracted["age"] = age_match.group(1)
    
    # Phone
    phone_match = re.search(r"\+?91[\s\-]?[6-9]\d{9}", text)
    if phone_match:
        extracted["phoneNumber"] = phone_match.group(0)
    else:
        phone_match = re.search(r"phone\s*:?\s*([\+\d\s\-]{10,})", text, re.IGNORECASE)
        if phone_match:
            extracted["phoneNumber"] = phone_match.group(1).strip()
    
    # Email
    email_match = re.search(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", text)
    if email_match:
        extracted["emailAddress"] = email_match.group(0)
    
    # Address
    addr_match = re.search(r"address\s*:?\s*([^,\n]+(?:,\s*[^,\n]+)*)", text, re.IGNORECASE)
    if addr_match:
        extracted["address"] = addr_match.group(1).strip()
    
    # Occupation
    occ_match = re.search(r"(?:working as|works as|occupation)\s*:?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)", text, re.IGNORECASE)
    if occ_match:
        extracted["occupation"] = occ_match.group(1).strip()
    
    # Employer
    emp_match = re.search(r"(?:working at|employer|company)\s*:?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)", text, re.IGNORECASE)
    if emp_match:
        extracted["employer"] = emp_match.group(1).strip()
    
    # Location
    loc_match = re.search(r"(?:at|in|near)\s+([^,.]+(?:,\s*[^,.]+)?)", text, re.IGNORECASE)
    if loc_match:
        extracted["incidentLocation"] = loc_match.group(1).strip()
    
    # Incident Type
    if "theft" in text.lower() or "stolen" in text.lower():
        extracted["incidentType"] = "Theft"
    elif "accident" in text.lower():
        extracted["incidentType"] = "Accident"
    elif "fire" in text.lower():
        extracted["incidentType"] = "Fire"
    elif "injury" in text.lower():
        extracted["incidentType"] = "Injury"
    else:
        extracted["incidentType"] = "General Incident"
    
    # Date
    date_match = re.search(r"(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})", text)
    if date_match:
        extracted["incidentDate"] = f"{date_match.group(1)}/{date_match.group(2)}/{date_match.group(3)}"
    
    # Time
    time_match = re.search(r"(\d{1,2}):(\d{2})\s*(AM|PM)", text, re.IGNORECASE)
    if time_match:
        extracted["incidentTime"] = f"{time_match.group(1)}:{time_match.group(2)} {time_match.group(3).upper()}"
    
    # Severity
    if "critical" in text.lower() or "severe" in text.lower():
        extracted["severity"] = "Critical"
    elif "high" in text.lower():
        extracted["severity"] = "High"
    elif "medium" in text.lower():
        extracted["severity"] = "Medium"
    else:
        extracted["severity"] = "Low"
    
    # Police
    if "police" in text.lower():
        extracted["policeReportFiled"] = "Yes"
    
    ps_match = re.search(r"([A-Z][a-z]+)\s+Police\s+Station", text)
    if ps_match:
        extracted["policeStationName"] = f"{ps_match.group(1)} Police Station"
    
    fir_match = re.search(r"FIR[\s\-]?(\d{4}[\s\-]?\d{6})", text, re.IGNORECASE)
    if fir_match:
        extracted["firNumber"] = f"FIR-{fir_match.group(1)}"
    
    # Insurance
    insurance_companies = ["Bajaj Allianz", "ICICI Lombard", "New India Assurance", "SBI General", "HDFC Ergo", "Star Health", "TATA AIG"]
    for company in insurance_companies:
        if company.lower() in text.lower():
            extracted["insuranceCompanyName"] = company
            break
    
    policy_match = re.search(r"policy\s*(?:number|no\.?)?\s*:?\s*([A-Z0-9\-]+)", text, re.IGNORECASE)
    if policy_match:
        extracted["policyNumber"] = policy_match.group(1)
    
    claim_match = re.search(r"claim\s*(?:number|no\.?)?\s*:?\s*([A-Z0-9\-]+)", text, re.IGNORECASE)
    if claim_match:
        extracted["claimNumber"] = claim_match.group(1)
    
    # Financial
    loss_match = re.search(r"[\₹\$€£]?\s?([\d,]+(?:\.\d+)?)", text)
    if loss_match:
        amount = loss_match.group(1)
        if "lakh" in text.lower():
            extracted["estimatedTotalLoss"] = f"₹{amount} Lakh"
        elif "crore" in text.lower():
            extracted["estimatedTotalLoss"] = f"₹{amount} Crore"
        else:
            extracted["estimatedTotalLoss"] = f"₹{amount}"
    
    # Witnesses
    witness_match = re.search(r"witness(?:es)?\s*:?\s*([A-Z][a-z]+\s+[A-Z][a-z]+)", text, re.IGNORECASE)
    if witness_match:
        extracted["witnesses"] = [witness_match.group(1).strip()]
    
    # Evidence
    evidence_list = []
    if "cctv" in text.lower():
        evidence_list.append("CCTV Footage")
    if "photograph" in text.lower() or "photo" in text.lower():
        evidence_list.append("Photographs")
    if "fingerprint" in text.lower():
        evidence_list.append("Fingerprints")
    if "report" in text.lower():
        evidence_list.append("Reports")
    if evidence_list:
        extracted["evidenceAvailable"] = evidence_list
    
    return extracted

print("=" * 60)
print(f"✅ Service loaded. Client: {'AVAILABLE' if client else 'NOT AVAILABLE'}")
print("=" * 60)
