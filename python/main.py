from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
import os
import httpx
import re
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def get_color_names_from_openrouter(colors: list[str]) -> str:
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Server misconfiguration: API key not set.")

    prompt = f"Give me creative, human-readable names for these colors: {', '.join(colors)}"
    payload = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 100
    }
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                json=payload,
                headers=headers,
                timeout=15.0  # timeout to avoid hanging requests
            )
        response.raise_for_status()
    except httpx.HTTPStatusError as e:
        # 4xx or 5xx HTTP errors from OpenRouter
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"OpenRouter API error: {e.response.text}"
        )
    except httpx.RequestError as e:
        # Network errors, timeouts, DNS failures, etc.
        raise HTTPException(
            status_code=503,
            detail=f"Failed to connect to OpenRouter API: {str(e)}"
        )

    data = response.json()
    ai_message = data.get("choices", [{}])[0].get("message", {}).get("content")
    if not ai_message:
        raise HTTPException(status_code=502, detail="Invalid response structure from OpenRouter API.")
    return ai_message


def extract_color_names(ai_text: str) -> list[str]:
    color_names = []
    lines = ai_text.split("\n")
    for line in lines:
        # Improved regex: accept # followed by 3 or 6 hex digits (case-insensitive)
        match = re.search(r"\d+\.\s+\*\*#([0-9A-Fa-f]{3,6})\*\*\s*-\s*\*\*(.+)\*\*", line)
        if match:
            name = match.group(2).strip()
            color_names.append(name)

    # Fallback: if nothing matched, try to parse as comma separated names
    if not color_names:
        # Example fallback parse (simple split by comma)
        fallback_names = [name.strip() for name in ai_text.split(",") if name.strip()]
        if fallback_names:
            return fallback_names

    return color_names


class ColorList(BaseModel):
    colors: List[str]


@app.post("/name-colors")
async def name_colors(color_list: ColorList):
    if not color_list.colors or len(color_list.colors) == 0:
        raise HTTPException(status_code=400, detail="Colors list must not be empty.")

    try:
        ai_response = await get_color_names_from_openrouter(color_list.colors)
        color_names = extract_color_names(ai_response)
    except HTTPException:
        # re-raise HTTPExceptions to be handled by FastAPI
        raise
    except Exception as e:
        # Catch any other unexpected error
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

    if not color_names:
        raise HTTPException(status_code=502, detail="Failed to extract color names from AI response.")

    return {"color_names": color_names}