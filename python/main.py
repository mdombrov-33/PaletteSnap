from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
import os
import httpx
import re

load_dotenv()

app = FastAPI()


async def get_color_names_from_openrouter(colors: list[str]) -> str:

    # Load the OpenRouter API key from environment variables
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise ValueError("OPENROUTER_API_KEY is not set in the environment variables.")
    
    # Construct the prompt for the OpenRouter API
    prompt = f"Give me creative, human-readable names for these colors: {', '.join(colors)}"

    # Prepare the request payload
    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 100
    }

    # Define the headers for the request
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    # Make the POST request to the OpenRouter API
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://openrouter.ai/api/v1/chat/completions",    
            json=payload,
            headers=headers
        )

    # Check if the request was successful
    response.raise_for_status()

    # Extract the text content from the response JSON
    data = response.json()
    ai_message = data["choices"][0]["message"]["content"]

    return ai_message



def extract_color_names(ai_text: str) -> list[str]:
    color_names = []
    # Split the AI response into lines
    lines = ai_text.split("\n")
    for line in lines:
        # Look for lines with pattern: number. **hex** - **name**
        match = re.search(r"\d+\.\s+\*\*#\w+\*\*\s*-\s*\*\*(.+)\*\*", line)
        if match:
            name = match.group(1).strip()
            color_names.append(name)
    return color_names


@app.get("/")
async def root():
    return {"message": "Hello, world!"}

# Define a Pydantic model for the request body
class ColorList(BaseModel):
    colors: List[str]


@app.post("/name-colors")
async def name_colors(color_list: ColorList):  
     ai_response = await get_color_names_from_openrouter(color_list.colors)
     
     color_names = extract_color_names(ai_response)

     return {"color_names": color_names}