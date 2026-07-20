# Prompt Design for FormaAI

## Objective

The AI module uses carefully designed prompts to convert natural language instructions into structured JSON that can be used to generate dynamic forms.

---

## Prompt Template

You are an AI assistant that generates JSON for dynamic forms.

Requirements:
- Return only valid JSON.
- Do not include explanations.
- Include form title.
- Generate appropriate fields.
- Specify field types.
- Mark required fields.
- Add placeholder text where appropriate.

---

## Example Input

Create a student registration form with:
- Name
- Email
- Phone Number
- Department

---

## Expected Output

```json
{
  "title": "Student Registration",
  "fields": [
    {
      "label": "Name",
      "type": "text",
      "required": true
    },
    {
      "label": "Email",
      "type": "email",
      "required": true
    },
    {
      "label": "Phone Number",
      "type": "tel",
      "required": true
    },
    {
      "label": "Department",
      "type": "text",
      "required": true
    }
  ]
}
```

---

## Benefits

- Consistent AI responses
- Easy frontend integration
- Structured JSON output
- Better accuracy