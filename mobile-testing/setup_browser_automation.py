#!/usr/bin/env python3
"""
Setup script for browser automation with Gemini 2.0 Flash.

This script helps configure the environment for website inspection.
"""

import os
from pathlib import Path

def setup_environment():
    """Setup the environment for browser automation."""
    
    print("🔧 SFB 1252 Browser Automation Setup")
    print("=" * 50)
    
    # Check if .env file exists
    env_file = Path(".env")
    if not env_file.exists():
        print("❌ .env file not found!")
        return
    
    # Read current .env content
    with open(env_file, 'r') as f:
        content = f.read()
    
    if 'your_api_key_here' in content:
        print("⚠️  API Key Setup Required")
        print()
        print("Steps to complete setup:")
        print("1. Visit https://aistudio.google.com/app/apikey")
        print("2. Create a new API key")
        print("3. Copy the API key")
        print("4. Edit the .env file and replace 'your_api_key_here' with your actual key")
        print()
        print("Example .env content:")
        print("GOOGLE_API_KEY=AIza...your_actual_key_here")
        print()
        
        # Offer to open the .env file
        response = input("Would you like to open the .env file now? (y/n): ")
        if response.lower() in ['y', 'yes']:
            try:
                os.system(f"code {env_file}")  # Try to open in VS Code
            except:
                print(f"Please manually edit: {env_file.absolute()}")
    else:
        print("✅ API key appears to be configured")
        
        # Test the setup
        try:
            from dotenv import load_dotenv
            load_dotenv()
            
            api_key = os.getenv('GOOGLE_API_KEY')
            if api_key and api_key != 'your_api_key_here':
                print("✅ Environment variables loaded successfully")
                print(f"✅ API key found (length: {len(api_key)} characters)")
                
                # Check required packages
                try:
                    import browser_use
                    print("✅ browser-use package available")
                except ImportError:
                    print("❌ browser-use package not found")
                    print("Install with: pip install browser-use")
                
                try:
                    from playwright import sync_api
                    print("✅ playwright package available")
                except ImportError:
                    print("❌ playwright package not found")
                    print("Install with: pip install playwright")
                    print("Then run: playwright install")
                
                print()
                print("🚀 Ready to run browser automation!")
                print("Execute: python mobile-testing/browser_site_inspection.py")
                
            else:
                print("❌ API key not properly set")
                
        except ImportError:
            print("❌ dotenv package not available")
            print("Install with: pip install python-dotenv")

if __name__ == "__main__":
    setup_environment()
