# AI Model Selection

## Objective

The FormaAI project requires an AI model that can understand natural language instructions and generate structured form definitions in JSON format.

## Models Considered

### OpenAI GPT

Advantages:
- Excellent natural language understanding.
- Generates structured JSON responses.
- Supports prompt engineering.
- Easy API integration.

Limitations:
- Paid API after free limits.
- Requires an API key.

### Google Gemini

Advantages:
- Good performance.
- Free tier available.
- Easy integration through API.

Limitations:
- Response format may need additional validation.

## Selected Model

For the initial development of FormaAI, either OpenAI GPT or Google Gemini can be integrated. The final choice depends on project requirements, API availability, and team preference.

## Expected Output

The AI should return data in JSON format.

Example:

```json
{
  "title": "Student Registration",
  "fields": [
    {
      "label": "Full Name",
      "type": "text",
      "required": true
    },
    {
      "label": "Email",
      "type": "email",
      "required": true
    }
  ]
}
```