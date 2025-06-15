from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello, world!"}

# Define a Pydantic model for the request body
class ColorList(BaseModel):
    colors: List[str]


@app.post("/name-colors")
async def name_colors(color_list: ColorList):
    # Echo for now
    return {"received colors": color_list.colors}