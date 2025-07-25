from dotenv import load_dotenv
import os

load_dotenv()  # Loads variables from .env into environment

api_key = os.getenv("GEMINI_API_KEY")
print("API Key Loaded Successfully")