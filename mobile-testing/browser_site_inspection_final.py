#!/usr/bin/env python3
"""
Modern browser automation script for SFB 1252 website inspection using browser-use 0.7.9.

FEATURES:
- Actor Use for intelligent element detection via natural language
- Gemini Flash Latest (gemini-flash-latest) - auto-updates to newest version
- Pure browser-use API (no manual Playwright code)
- Simplified, maintainable codebase

Requirements:
- GOOGLE_API_KEY environment variable set in .env file
- browser-use==0.7.9 installed
- playwright browsers installed (via: playwright install)
"""

import os
import asyncio
import time
from datetime import datetime
from browser_use import Agent, Browser, ChatGoogle
from dotenv import load_dotenv


async def main():
    """Main function using modern browser-use 0.7.9 API with Actor Use."""

    # Load environment variables from .env file
    load_dotenv()

    # Check if API key is set
    api_key = os.getenv('GOOGLE_API_KEY')
    if not api_key or api_key == 'your_api_key_here':
        print("ERROR: GOOGLE_API_KEY not set in .env file")
        print("Please get your API key from: https://aistudio.google.com/app/apikey")
        return

    # Website URL to inspect
    website_url = "https://sfb1252.github.io/talks/"

    # Create timestamp for this inspection
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    print("Starting SFB 1252 Website Inspection")
    print(f"Target: {website_url}")
    print(f"Model: Gemini Flash Latest (gemini-flash-latest)")
    print(f"Features: Actor Use enabled for natural language queries")
    print("=" * 70)

    start_time = time.time()

    # Initialize Gemini Flash Latest model (auto-updates to newest version)
    llm = ChatGoogle(
        model="gemini-flash-latest",
        api_key=api_key,
        temperature=0.1,
    )

    # Define comprehensive inspection task
    task = f"""Inspect the SFB 1252 Research Data & Methods Workshop Series website at {website_url}

Perform a comprehensive Matrix Integration verification:

1. Navigation & Page Load - Navigate to the website and confirm correct page
2. Community Chat Section - Find and verify it exists prominently
3. Matrix Links Verification - Find all matrix.to links and verify format
4. FluffyChat Recommendation - Look for FluffyChat mentions and links
5. Matrix Rooms Verification - Find all three rooms (General, Technical, Resources)
6. Matrix Setup Guide - Look for setup guide link
7. Quality Checks - Look for TODO markers or broken elements
8. Workshop Content Verification - Verify 12 workshops are listed

Provide a detailed report with what's working, any issues, and statistics.
Use Actor Use to query elements by natural language."""

    try:
        print("\nStarting intelligent inspection with Actor Use...")
        print("This may take 1-3 minutes...\n")

        # Create browser with headless=False to see what's happening
        browser = Browser(headless=False)
        
        agent = Agent(
            task=task,
            llm=llm,
            browser=browser,
        )

        # Run the inspection
        result = await agent.run()

        print("\n" + "=" * 70)
        print("INSPECTION COMPLETE")
        print("=" * 70)
        
        # Display the result
        print("\nINSPECTION REPORT:")
        print("-" * 70)
        
        # Save detailed history
        if hasattr(result, 'history') and result.history:
            log_path = f"mobile-testing/inspection_log_{timestamp}.txt"
            with open(log_path, 'w', encoding='utf-8') as f:
                f.write(f"SFB 1252 Website Inspection Report\n")
                f.write(f"Timestamp: {timestamp}\n")
                f.write(f"URL: {website_url}\n")
                f.write(f"Model: gemini-flash-latest\n")
                f.write(f"{'=' * 70}\n\n")
                
                for i, item in enumerate(result.history, 1):
                    f.write(f"\n--- Step {i} ---\n")
                    f.write(f"{item}\n")
                
                f.write(f"\n{'=' * 70}\n")
                if hasattr(result, 'final_result'):
                    f.write(f"Final Result:\n{result.final_result()}\n")
            
            print(f"Detailed logs saved to: {log_path}")
        
        # Print final summary
        if hasattr(result, 'final_result'):
            print(f"\n{result.final_result()}")
        else:
            print(f"\n{result}")

    except asyncio.TimeoutError:
        print("\nInspection timed out")
        print("The website might be slow or the task too complex")
        
    except Exception as e:
        print(f"\nInspection failed: {e}")
        print(f"Error type: {type(e).__name__}")
        import traceback
        traceback.print_exc()

    finally:
        elapsed_time = time.time() - start_time
        print("\n" + "=" * 70)
        print(f"Total Time: {elapsed_time:.1f} seconds")
        print(f"Completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 70)


if __name__ == "__main__":
    print("\n" + "=" * 70)
    print("  SFB 1252 Website Inspector - Browser-Use 0.7.9 + Actor Use")
    print("=" * 70)
    asyncio.run(main())
