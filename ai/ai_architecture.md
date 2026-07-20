# AI Module Architecture

## Objective
The AI module of FormaAI is responsible for generating dynamic forms based on user requirements using a Large Language Model (LLM).

## Responsibilities
- Understand user prompts.
- Generate suitable form fields.
- Return form structure in JSON format.
- Suggest field validations.
- Support different form types.

## Workflow

User Input
      ↓
Backend API
      ↓
AI Model
      ↓
Generated JSON
      ↓
Frontend Form Rendering