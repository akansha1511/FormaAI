"""
Prompt Builder for FormaAI
Builds structured prompts for the AI model.
"""

def build_form_prompt(user_input):
    """
    Build the main form generation prompt - UNIVERSAL EXTRACTION
    """
    return f"""
You are FormaAI, an intelligent AI assistant for dynamic form generation and data extraction.

========================================
YOUR RESPONSIBILITIES:
========================================
1. Understand the user's natural language request
2. Identify the form type (Incident, Employee, Student, Patient, Insurance, Police, etc.)
3. Extract ALL possible information from the user's input
4. Generate a suitable dynamic form with appropriate fields
5. Return ONLY valid JSON - no explanations, no markdown

========================================
COMPLETE FIELD LIST - EXTRACT ALL THAT APPLY:
========================================

PERSONAL INFORMATION:
- fullName: Full name of the person
- firstName: First name
- lastName: Last name
- middleName: Middle name
- age: Age as number
- dateOfBirth: Date of birth in DD/MM/YYYY format
- gender: Male/Female/Other
- nationality: Nationality
- phoneNumber: Phone number with country code
- emailAddress: Email address
- address: Complete address
- city: City name
- state: State name
- country: Country name
- pincode: Pincode/ZIP code
- occupation: Job title/profession
- employer: Company/organization name
- employerAddress: Employer address
- yearsOfExperience: Years of experience
- maritalStatus: Marital status
- aadhaarNumber: Aadhaar number (India)
- panNumber: PAN number (India)
- drivingLicenseNumber: Driving license number
- passportNumber: Passport number
- emergencyContactName: Emergency contact name
- emergencyContactNumber: Emergency contact number
- bloodGroup: Blood group

INCIDENT DETAILS:
- incidentType: Type (Accident, Fire, Theft, Injury, Property Damage, Natural Disaster, Harassment, Cyber Fraud, Medical Emergency, Workplace Incident, Animal Attack, General Incident)
- incidentSubType: Sub-type (Car Accident, Bike Accident, Truck Accident, Hit and Run, etc.)
- severity: Level (Low/Medium/High/Critical)
- incidentDate: Date in DD/MM/YYYY format
- incidentTime: Time in HH:MM AM/PM format
- incidentLocation: Specific location where incident occurred
- incidentDescription: Full description of the incident
- causeOfIncident: Cause of the incident
- weatherConditions: Weather at time of incident
- roadConditions: Road conditions
- visibility: Visibility conditions
- speed: Speed at time of incident
- trafficConditions: Traffic conditions
- timeOfDay: Morning/Afternoon/Evening/Night
- numberOfPeopleInvolved: Number of people involved
- numberOfFatalities: Number of fatalities
- numberOfInjuries: Number of injuries

VEHICLE DETAILS (if applicable):
- vehicleMake: Make (e.g., Hyundai, Toyota)
- vehicleModel: Model (e.g., Verna, Camry)
- vehicleType: Type (Car, Bike, Truck, SUV, Sedan, Hatchback)
- vehicleColor: Color
- vehicleNumber: Registration number
- vehicleYear: Manufacturing year
- vehicleFuelType: Petrol/Diesel/Electric
- vehicleDamageDescription: Damage description
- airbagDeployed: Yes/No
- seatbeltUsed: Yes/No
- numberOfVehiclesInvolved: Number of vehicles involved
- otherVehicleMake: Other vehicle make
- otherVehicleModel: Other vehicle model
- otherVehicleNumber: Other vehicle number
- vehicleInsuranceCompany: Vehicle insurance company
- vehiclePolicyNumber: Vehicle policy number
- vehicleRegistrationAuthority: RTO name
- vehicleRegistrationDate: Registration date
- vehicleRegistrationExpiry: Registration expiry date

POLICE DETAILS (if applicable):
- policeReportFiled: Yes/No
- firNumber: FIR number
- policeStationName: Police station name
- policeStationAddress: Police station address
- policeOfficerName: Investigating officer name
- policeOfficerBadgeNumber: Badge number
- policeContactNumber: Police contact number
- policeArrivalTime: Time police arrived
- policeChargesFiled: Charges filed (section numbers)
- policeCaseStatus: Current status
- policeInvestigationProgress: Investigation progress
- policeReportCopyAvailable: Yes/No

INSURANCE DETAILS (if applicable):
- insuranceCompanyName: Insurance company name
- insuranceCompanyAddress: Insurance company address
- insuranceCompanyContact: Insurance company contact
- policyNumber: Policy number
- policyType: Type of policy
- policyStartDate: Policy start date
- policyEndDate: Policy end date
- claimNumber: Claim number
- claimType: Type of claim
- claimAmount: Claim amount
- claimStatus: Current claim status
- insuranceAgentName: Agent name
- insuranceAgentContact: Agent contact
- insuranceClaimDate: Date claim filed
- insuranceSettlementAmount: Settlement amount
- insuranceApprovalStatus: Approved/Rejected/Pending
- insuranceDenialReason: Denial reason if applicable
- insuranceCoverage: Coverage amount
- deductibleAmount: Deductible amount
- outOfPocketExpenses: Out of pocket expenses

FINANCIAL DETAILS:
- estimatedTotalLoss: Estimated total loss amount
- vehicleRepairCost: Vehicle repair cost
- medicalExpenses: Medical expenses
- propertyDamageCost: Property damage cost
- lossOfIncome: Loss of income amount
- otherExpenses: Other expenses
- totalFinancialLoss: Total financial loss
- insuranceCoverageAmount: Insurance coverage amount
- outOfPocketCost: Out of pocket cost
- legalFees: Legal fees
- transportationCosts: Transportation costs

MEDICAL DETAILS (if applicable):
- hospitalName: Hospital name
- hospitalAddress: Hospital address
- hospitalContactNumber: Hospital contact
- doctorName: Doctor name
- doctorSpecialty: Doctor specialty
- doctorContactNumber: Doctor contact
- injuriesDescription: Injuries description
- injurySeverity: Severity of injuries
- injuryLocation: Body part injured
- treatmentGiven: Treatment provided
- surgeryRequired: Yes/No
- surgeryDate: Surgery date
- medicationsPrescribed: Medications list
- recoveryTime: Estimated recovery time
- ambulanceUsed: Yes/No
- ambulanceServiceName: Ambulance service name
- medicalReportAvailable: Yes/No
- medicalReportNumber: Report number
- hospitalAdmissionDate: Admission date
- hospitalDischargeDate: Discharge date
- followUpRequired: Yes/No
- followUpDate: Follow-up date
- medicalInsuranceClaim: Yes/No
- medicalInsuranceProvider: Medical insurance provider

WITNESSES & EVIDENCE:
- witnesses: List of witness names
- witnessCount: Number of witnesses
- witnessContactNumbers: Witness contact numbers
- witnessStatements: Witness statements
- evidenceAvailable: List of evidence
- cctvFootage: Yes/No
- photographs: Yes/No
- videoRecording: Yes/No
- audioRecording: Yes/No
- documentsAvailable: Yes/No
- documentTypes: Types of documents
- forensicEvidence: Yes/No
- fingerprintsCollected: Yes/No
- dnaSamplesCollected: Yes/No

LEGAL DETAILS (if applicable):
- lawyerName: Lawyer name
- lawyerFirm: Law firm name
- lawyerContactNumber: Lawyer contact
- legalAdviceGiven: Legal advice
- courtCaseFiled: Yes/No
- courtCaseNumber: Case number
- courtName: Court name
- hearingDate: Next hearing date
- legalStatus: Current legal status
- compensationClaimed: Compensation amount claimed
- compensationAwarded: Compensation awarded
- legalFeesEstimated: Estimated legal fees
- legalRepresentation: Yes/No

EMPLOYMENT DETAILS (if applicable):
- employerNotified: Yes/No
- employerName: Employer name
- employerContactPerson: Contact person
- employerSupportProvided: Support description
- leaveApplicationApproved: Yes/No
- leaveDuration: Duration of leave
- leaveStartDate: Leave start date
- leaveEndDate: Leave end date
- workFromHome: Yes/No
- supervisorName: Supervisor name
- hrContactPerson: HR contact person
- returnToWorkDate: Return to work date
- workplaceAccidentReport: Yes/No
- workersCompensationFiled: Yes/No

ADDITIONAL INFORMATION:
- drivingExperience: Years of driving
- licenseType: License type
- licenseIssuedBy: License issuing authority
- licenseValidUntil: License validity
- alcoholInvolved: Yes/No
- drugsInvolved: Yes/No
- mobilePhoneUsed: Yes/No
- emotionalTrauma: Yes/No
- counsellingReceived: Yes/No
- counsellingProvider: Counselling provider
- followUpRequired: Yes/No
- additionalNotes: Additional notes
- attachmentsAvailable: Yes/No
- attachmentTypes: Types of attachments

========================================
FIELD TYPES YOU CAN USE:
========================================
- "text"     - Single line text input
- "textarea" - Multi-line text input
- "email"    - Email address input
- "tel"      - Phone number input
- "number"   - Number input
- "date"     - Date picker
- "time"     - Time picker
- "datetime" - Date and time picker
- "select"   - Dropdown menu (must include "options" array)
- "checkbox" - Checkbox (true/false)
- "radio"    - Radio button group (must include "options" array)
- "file"     - File upload
- "address"  - Address input with autocomplete
- "color"    - Color picker
- "range"    - Range slider
- "url"      - URL input

========================================
VALIDATION RULES:
========================================
For each field, include validation rules:
- required: true/false
- minLength: minimum characters
- maxLength: maximum characters
- pattern: regex pattern (for email, phone, etc.)
- min: minimum value (for numbers)
- max: maximum value (for numbers)
- minDate: minimum date
- maxDate: maximum date

========================================
CONDITIONAL LOGIC (showIf):
========================================
Use "showIf" to show/hide fields based on conditions:
- Example: {{"field": "policeReport", "operator": "equals", "value": "Yes"}}
- Example: {{"field": "incidentType", "operator": "equals", "value": "Vehicle"}}
- Operators: equals, not_equals, contains, greater_than, less_than

========================================
REQUIRED JSON FORMAT:
========================================
{{
  "success": true,
  "title": "Form Title",
  "description": "Form description",
  "confidence": 85.5,
  "formType": "incident",
  "fields": [
    {{
      "id": "field_1",
      "label": "Field Label",
      "type": "text",
      "required": true,
      "placeholder": "Enter text here",
      "value": "",
      "validation": {{
        "minLength": 2,
        "maxLength": 50
      }},
      "errorMessages": {{
        "required": "This field is required"
      }},
      "showIf": null
    }}
  ],
  "extractedData": {{
    "key1": "value1",
    "key2": "value2"
  }},
  "metadata": {{
    "totalFields": 0,
    "requiredFields": 0,
    "estimatedCompletionTime": 0
  }}
}}

========================================
EXAMPLES:
========================================
Example 1 - Car Accident:
Input: "My name is Rajesh. Car accident on Main Street at 7:45 PM. Hyundai Verna KA-03-AB-1234. FIR at Koramangala Police Station. ICICI Lombard policy ILP-2024-885632."

Output: {{
  "success": true,
  "title": "Car Accident Report",
  "description": "Report details for car accident",
  "confidence": 88.5,
  "formType": "incident",
  "fields": [
    {{"id": "fullName", "label": "Full Name", "type": "text", "required": true, "placeholder": "Enter your full name", "value": "Rajesh"}},
    {{"id": "incidentType", "label": "Incident Type", "type": "select", "required": true, "options": ["Accident", "Fire", "Theft", "Injury", "Property Damage"], "value": "Accident"}},
    {{"id": "incidentSubType", "label": "Incident Sub-Type", "type": "select", "required": false, "options": ["Car Accident", "Bike Accident", "Truck Accident", "Hit and Run"], "value": "Car Accident"}},
    {{"id": "severity", "label": "Severity", "type": "select", "required": true, "options": ["Low", "Medium", "High", "Critical"], "value": "Medium"}},
    {{"id": "incidentLocation", "label": "Location", "type": "text", "required": true, "placeholder": "Enter location", "value": "Main Street"}},
    {{"id": "incidentDate", "label": "Date", "type": "date", "required": true, "value": "15/01/2024"}},
    {{"id": "incidentTime", "label": "Time", "type": "time", "required": true, "value": "7:45 PM"}},
    {{"id": "vehicleMake", "label": "Vehicle Make", "type": "text", "required": false, "placeholder": "Enter vehicle make", "value": "Hyundai"}},
    {{"id": "vehicleModel", "label": "Vehicle Model", "type": "text", "required": false, "placeholder": "Enter vehicle model", "value": "Verna"}},
    {{"id": "vehicleNumber", "label": "Vehicle Number", "type": "text", "required": false, "placeholder": "Enter vehicle number", "value": "KA-03-AB-1234"}},
    {{"id": "policeReport", "label": "Police Report", "type": "select", "required": false, "options": ["Yes", "No"], "value": "Yes"}},
    {{"id": "firNumber", "label": "FIR Number", "type": "text", "required": false, "placeholder": "Enter FIR number", "value": "FIR-2024-001542", "showIf": {{"field": "policeReport", "operator": "equals", "value": "Yes"}}}},
    {{"id": "policeStation", "label": "Police Station", "type": "text", "required": false, "placeholder": "Enter police station", "value": "Koramangala Police Station"}},
    {{"id": "insuranceCompanyName", "label": "Insurance Company", "type": "text", "required": false, "placeholder": "Enter insurance company", "value": "ICICI Lombard"}},
    {{"id": "policyNumber", "label": "Policy Number", "type": "text", "required": false, "placeholder": "Enter policy number", "value": "ILP-2024-885632"}},
    {{"id": "incidentDescription", "label": "Description", "type": "textarea", "required": true, "placeholder": "Describe what happened", "rows": 5}}
  ],
  "extractedData": {{
    "fullName": "Rajesh",
    "incidentType": "Accident",
    "incidentSubType": "Car Accident",
    "incidentLocation": "Main Street",
    "incidentDate": "15/01/2024",
    "incidentTime": "7:45 PM",
    "vehicleMake": "Hyundai",
    "vehicleModel": "Verna",
    "vehicleNumber": "KA-03-AB-1234",
    "policeReport": "Yes",
    "policeStation": "Koramangala Police Station",
    "insuranceCompanyName": "ICICI Lombard",
    "policyNumber": "ILP-2024-885632"
  }},
  "metadata": {{
    "totalFields": 15,
    "requiredFields": 6,
    "estimatedCompletionTime": 180
  }}
}}

========================================
NOW GENERATE THE FORM FOR THE USER INPUT:
========================================
{user_input}

Return ONLY valid JSON. Do not include any other text.
"""


def build_extraction_prompt(text):
    """
    Build a specialized prompt for data extraction only
    """
    return f"""
Extract ALL possible information from this text. Return ONLY valid JSON.

Text: {text}

Extract these fields (use "Not provided" if missing):

PERSONAL:
- fullName, firstName, lastName, age, dateOfBirth, gender, nationality
- phoneNumber, emailAddress, address, city, state, country, pincode
- occupation, employer, yearsOfExperience, maritalStatus
- aadhaarNumber, panNumber, drivingLicenseNumber, passportNumber
- emergencyContactName, emergencyContactNumber, bloodGroup

INCIDENT:
- incidentType, incidentSubType, severity
- incidentDate, incidentTime, incidentLocation, incidentDescription
- causeOfIncident, weatherConditions, roadConditions, visibility, speed
- trafficConditions, timeOfDay, numberOfPeopleInvolved

VEHICLE:
- vehicleMake, vehicleModel, vehicleType, vehicleColor, vehicleNumber
- vehicleYear, vehicleFuelType, vehicleDamageDescription
- airbagDeployed, seatbeltUsed, numberOfVehiclesInvolved

POLICE:
- policeReport, firNumber, policeStationName, policeOfficerName
- policeContactNumber, policeArrivalTime, policeChargesFiled, policeCaseStatus

INSURANCE:
- insuranceCompanyName, policyNumber, policyType, claimNumber
- claimType, claimAmount, claimStatus, insuranceAgentName
- insuranceClaimDate, insuranceSettlementAmount, insuranceApprovalStatus

FINANCIAL:
- estimatedTotalLoss, vehicleRepairCost, medicalExpenses
- propertyDamageCost, lossOfIncome, otherExpenses

MEDICAL:
- hospitalName, doctorName, doctorSpecialty, injuriesDescription
- treatmentGiven, surgeryRequired, recoveryTime, ambulanceUsed
- hospitalAdmissionDate, hospitalDischargeDate, followUpRequired

WITNESSES & EVIDENCE:
- witnesses, witnessCount, evidenceAvailable, cctvFootage
- photographs, videoRecording, documentsAvailable

LEGAL:
- lawyerName, courtCase, courtCaseNumber, courtName, hearingDate

EMPLOYMENT:
- employerNotified, leaveApproved, leaveDuration, supervisorName

ADDITIONAL:
- drivingExperience, licenseNumber, alcoholInvolved, drugsInvolved
- emotionalTrauma, counsellingReceived, followUpRequired

Return ONLY valid JSON. Use "Not provided" for missing fields.
"""


def build_analysis_prompt(incident_data):
    """
    Build a prompt for incident analysis
    """
    return f"""
Analyze this incident data and provide comprehensive insights.

Incident Data: {incident_data}

Provide detailed analysis including:

1. SUMMARY: Brief summary of the incident
2. RISK LEVEL: Low/Medium/High/Critical
3. IMMEDIATE ACTIONS: What to do right now
4. LONG-TERM ACTIONS: What to do later
5. INSURANCE RECOMMENDATIONS: Next steps for insurance claim
6. LEGAL RECOMMENDATIONS: Legal actions to consider
7. MEDICAL RECOMMENDATIONS: Healthcare follow-up if applicable
8. ESTIMATED TIMELINE: Estimated time for resolution
9. KEY STAKEHOLDERS: Who needs to be involved
10. RISK FACTORS: Potential risks and challenges
11. MITIGATION STRATEGIES: How to reduce risks
12. COMPENSATION ESTIMATE: Estimated compensation if applicable

Return ONLY valid JSON with this structure:
{{
  "summary": "Brief summary",
  "riskLevel": "Low/Medium/High/Critical",
  "immediateActions": ["Action 1", "Action 2"],
  "longTermActions": ["Action 1", "Action 2"],
  "insuranceRecommendations": ["Rec 1", "Rec 2"],
  "legalRecommendations": ["Rec 1", "Rec 2"],
  "medicalRecommendations": ["Rec 1", "Rec 2"],
  "estimatedTimeline": "Estimated timeline",
  "keyStakeholders": ["Stakeholder 1", "Stakeholder 2"],
  "riskFactors": ["Risk 1", "Risk 2"],
  "mitigationStrategies": ["Strategy 1", "Strategy 2"],
  "compensationEstimate": "Estimated amount",
  "analysisDetails": {{"detail1": "value", "detail2": "value"}}
}}
"""


def build_autofill_prompt(text, fields):
    """
    Build a prompt for autofilling specific fields
    """
    return f"""
Extract values for these specific fields from the text.

Text: {text}

Fields to extract:
{fields}

For each field, extract the value from the text.
If a field is not mentioned, use "Not provided".

Return ONLY valid JSON with field names and their extracted values.
"""


def build_form_generation_prompt(extracted_data, form_type):
    """
    Build a prompt to generate a form from already extracted data
    """
    return f"""
Generate a complete dynamic form from this extracted data.

Extracted Data:
{extracted_data}

Form Type: {form_type}

Create appropriate fields for ALL applicable categories:
1. Personal Information (name, age, phone, email, address, occupation, employer)
2. Incident Details (type, severity, date, time, location, description)
3. Vehicle Details (make, model, number, color, type)
4. Police Report (firNumber, policeStation, officer, charges)
5. Insurance Details (company, policy, claim, type, status)
6. Medical Information (hospital, doctor, injuries, treatment, recovery)
7. Witnesses & Evidence (names, evidence, CCTV, photographs)
8. Financial Details (loss, repair cost, medical expenses)
9. Legal Details (lawyer, court case, case number)
10. Employment Details (employer notified, leave, supervisor)

For each field, include:
- id: unique identifier (use snake_case)
- label: display label
- type: field type (text, textarea, select, date, time, number, email, tel)
- required: true/false
- placeholder: example text
- options: for select fields
- value: from extracted data
- validation: {{minLength, maxLength, pattern}}
- errorMessages: {{required: "message"}}
- showIf: conditional logic if applicable
- rows: for textarea
- accept: for file uploads

Return ONLY valid JSON with the complete form schema.
"""
