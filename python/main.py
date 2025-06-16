from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
import os
import httpx
import json
from fastapi.middleware.cors import CORSMiddleware

# Load env variables from .env file (e.g., API keys)
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Enable CORS (we allow all origins for simplicity here — tweak if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define input data schema — we expect a list of hex colors like ["#FF0000", "#00FF00"]
class ColorList(BaseModel):
    colors: List[str]


# This function sends color list to OpenRouter (GPT) and gets back creative names
async def get_color_names_from_openrouter(colors: list[str]) -> list[str]:
    # Read API key from env
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Server misconfiguration: API key not set.")

    # Construct our prompt — we force the model to ONLY return a clean JSON array
    prompt = (
        "You are a helpful assistant that names colors creatively. "
        "You will receive a list of hex colors. Return only a JSON array of short, creative, human-readable color names. "
        "No extra text, no markdown, no explanations.\n\n"
        "Example output: [\"Sunlit Lemonade\", \"Royal Amethyst\", \"Ocean Breeze\"]\n\n"
        f"Input colors: {', '.join(colors)}"
    )

    # OpenRouter-compatible request body
    payload = {
        "model": "gpt-4o-mini",  # You can change this to another model if needed
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 150,
    }

    # Auth + content-type headers
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    try:
        # Send request to OpenRouter (wrapped in async httpx client)
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                json=payload,
                headers=headers,
                timeout=15.0  # protect yourself from hanging forever
            )
        response.raise_for_status()  # raise if 4xx or 5xx
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"OpenRouter API error: {e.response.text}"
        )
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=503,
            detail=f"Failed to connect to OpenRouter API: {str(e)}"
        )

    # Try to parse AI's response
    data = response.json()
    ai_message = data.get("choices", [{}])[0].get("message", {}).get("content", "").strip()

    try:
        # Try to decode the JSON response
        parsed = json.loads(ai_message)

        # Validate it's a list of strings
        if isinstance(parsed, list) and all(isinstance(name, str) for name in parsed):
            return parsed
    except json.JSONDecodeError:
        pass  # we'll raise custom error below if parsing fails

    # If response is malformed or not JSON, raise error
    raise HTTPException(status_code=502, detail="AI returned malformed color names response.")


# Route handler: accepts POST with color list and returns creative names
@app.post("/name-colors")
async def name_colors(color_list: ColorList):
    # Basic validation — list must be non-empty
    if not color_list.colors:
        raise HTTPException(status_code=400, detail="Colors list must not be empty.")

    try:
        # Ask OpenRouter (GPT) for creative names
        color_names = await get_color_names_from_openrouter(color_list.colors)
    except HTTPException:
        raise  # just rethrow if it’s already a handled FastAPI error
    except Exception as e:
        # Catch any other unexpected issue
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

    # Return result as JSON
    return {"color_names": color_names}
