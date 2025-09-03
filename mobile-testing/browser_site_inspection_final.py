#!/usr/bin/env python3
"""
Final streamlined browser automation script for SFB 1252 website inspection.

COMBINES THE BEST OF BOTH WORLDS:
- Direct Playwright for fast, reliable link checking and basic verification
- AI (Gemini) for intelligent Matrix integration analysis
- No screenshots - focuses on functional verification
- Timeout protection and error recovery
- Simple, fast execution

Requirements:
- GOOGLE_API_KEY environment variable set in .env file
- browser-use package installed
- playwright browsers installed
"""

import os
import asyncio
import time
from datetime import datetime
from browser_use import Agent, ChatGoogle
from dotenv import load_dotenv
from playwright.async_api import async_playwright

async def check_links_and_content(page):
    """Fast link checking and content verification using direct Playwright."""
    print("Checking links and content...")

    results = {
        'total_links': 0,
        'matrix_links': 0,
        'fluffychat_links': 0,
        'setup_guide_links': 0,
        'todo_markers': 0,
        'community_chat_found': False,
        'matrix_rooms': {'general': 0, 'technical': 0, 'resources': 0}
    }

    try:
        # Get basic page info
        title = await page.title()
        print(f"Page title: {title}")

        # Check for Community Chat section
        community_chat_count = await page.locator("h2:has-text('Community Chat')").count()
        results['community_chat_found'] = community_chat_count > 0
        print(f"Community Chat section: {'Found' if results['community_chat_found'] else 'Not found'}")

        # Count all links
        all_links = await page.locator('a').all()
        results['total_links'] = len(all_links)
        print(f"Total links found: {results['total_links']}")

        # Check specific link types
        matrix_links = await page.locator("a[href*='matrix.to']").all()
        results['matrix_links'] = len(matrix_links)
        print(f"Matrix links (matrix.to): {results['matrix_links']}")

        fluffychat_links = await page.locator("a[href*='fluffychat.im']").all()
        results['fluffychat_links'] = len(fluffychat_links)
        print(f"FluffyChat links: {results['fluffychat_links']}")

        setup_links = await page.locator("a[href*='matrix-space-setup']").all()
        results['setup_guide_links'] = len(setup_links)
        print(f"Matrix setup guide links: {results['setup_guide_links']}")

        # Check for TODO markers
        todo_count = await page.locator("text=[TODO]").count()
        results['todo_markers'] = todo_count
        print(f"TODO markers: {results['todo_markers']}")

        # Check for Matrix room mentions
        results['matrix_rooms']['general'] = await page.locator("text=General Discussion").count()
        results['matrix_rooms']['technical'] = await page.locator("text=Technical Support").count()
        results['matrix_rooms']['resources'] = await page.locator("text=Resources & Links").count()

        print("Matrix rooms found:")
        for room, count in results['matrix_rooms'].items():
            print(f"   {room.title()}: {count} mentions")

        # Check for FluffyChat mentions
        fluffychat_mentions = await page.locator("text=FluffyChat").count()
        print(f"FluffyChat mentions: {fluffychat_mentions}")

        # Check workshop content
        workshop_sections = await page.locator("h3:has-text('📚'), h3:has-text('💾'), h3:has-text('⚖️'), h3:has-text('📖')").count()
        print(f"Workshop sections: {workshop_sections}")

    except Exception as e:
        print(f"Content checking error: {e}")

    return results

async def main():
    """Main function combining direct Playwright checks with AI analysis."""

    # Load environment variables from .env file
    load_dotenv()

    # Check if API key is set
    api_key = os.getenv('GOOGLE_API_KEY')
    if not api_key or api_key == 'your_api_key_here':
        print("Error: GOOGLE_API_KEY not set in .env file")
        print("Please get your API key from: https://aistudio.google.com/app/apikey")
        return

    # Website URL to inspect
    website_url = "https://sfb1252.github.io/talks/"

    # Create timestamp for this inspection
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    print("Starting final streamlined inspection...")
    print(f"Target: {website_url}")
    print("=" * 60)

    start_time = time.time()

    # Phase 1: Fast direct Playwright checks
    print("Phase 1: Direct Playwright verification...")
    playwright_results = None

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        try:
            await page.goto(website_url, wait_until='networkidle')
            await page.wait_for_timeout(1000)  # Brief wait for dynamic content
            playwright_results = await check_links_and_content(page)

        except Exception as e:
            print(f"Direct checks failed: {e}")
        finally:
            await browser.close()

    # Phase 2: AI-powered verification for complex analysis
    print("\nPhase 2: AI-powered Matrix integration analysis...")

    # Initialize the Gemini model
    llm = ChatGoogle(model='gemini-2.5-flash')

    # Define focused AI task (no screenshots)
    task = f"""
    Analyze the SFB 1252 website Matrix integration at {website_url}.

    Focus on these key points:
    1. Confirm Community Chat section exists and is properly structured
    2. Verify all Matrix links use matrix.to format (not old broken format)
    3. Confirm FluffyChat is recommended as the client
    4. Verify three Matrix rooms are listed: General Discussion, Technical Support, Resources & Links
    5. Check for any remaining [TODO] markers that should be removed
    6. Verify Matrix Setup Guide link is present and accessible
    7. Assess overall Matrix integration quality and completeness

    Provide a concise analysis of the Matrix integration status.
    Do NOT attempt any screenshots or file operations.
    """

    # Create agent with timeout protection
    agent = Agent(
        task=task,
        llm=llm,
        save_conversation_path=f"mobile-testing/inspection_log_{timestamp}.json",
        max_actions_per_step=3,  # Very limited to prevent getting stuck
    )

    ai_results = None
    try:
        # Short timeout since we already did basic checks
        result = await asyncio.wait_for(agent.run(), timeout=180)  # 3 minute timeout
        ai_results = result
        print("AI analysis completed!")

    except asyncio.TimeoutError:
        print("AI analysis timed out - basic checks above are still valid")

    except Exception as e:
        print(f"AI analysis failed: {e}")
        print("Basic Playwright checks above are still valid")

    # Final summary
    elapsed_time = time.time() - start_time
    print("\n" + "="*60)
    print("INSPECTION COMPLETE")
    print("="*60)

    if playwright_results:
        print("DIRECT CHECKS RESULTS:")
        print(f"   Total links: {playwright_results['total_links']}")
        print(f"   Matrix links: {playwright_results['matrix_links']}")
        print(f"   FluffyChat links: {playwright_results['fluffychat_links']}")
        print(f"   Setup guide links: {playwright_results['setup_guide_links']}")
        print(f"   TODO markers: {playwright_results['todo_markers']}")
        print(f"   Community Chat: {'Found' if playwright_results['community_chat_found'] else 'Not found'}")

    if ai_results:
        print("\nAI ANALYSIS:")
        print(f"   {ai_results}")

    print(f"\nTotal Time: {elapsed_time:.1f} seconds")
    print(f"Logs saved to: mobile-testing/inspection_log_{timestamp}.json")
    print("="*60)

if __name__ == "__main__":
    asyncio.run(main())