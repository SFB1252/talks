#!/usr/bin/env python3
"""
Comprehensive SFB 1252 website testing using browser-use 0.7.9 with Actor Use.

This script performs a complete site inspection covering:
- Navigation & site structure
- Content verification (12 workshops)
- Matrix integration (community features)
- Links & resources
- Calendar functionality
- Accessibility
- Performance & load times

Features:
- Gemini Flash Latest (auto-updates)
- Actor Use for intelligent element detection
- Structured JSON reporting
- HTML report generation
"""

import os
import asyncio
import time
import json
from datetime import datetime
from pathlib import Path
from browser_use import Agent, Browser, ChatGoogle
from dotenv import load_dotenv


class SiteInspectionReport:
    """Generate structured reports from site inspection."""
    
    def __init__(self, website_url: str, timestamp: str):
        self.website_url = website_url
        self.timestamp = timestamp
        self.sections = {}
        
    def add_section(self, name: str, data: dict):
        """Add a report section."""
        self.sections[name] = data
        
    def to_json(self, filepath: str):
        """Save report as JSON."""
        report = {
            "metadata": {
                "website": self.website_url,
                "timestamp": self.timestamp,
                "model": "gemini-flash-latest",
                "browser_use_version": "0.7.9"
            },
            "sections": self.sections
        }
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
            
    def to_html(self, filepath: str):
        """Generate HTML report."""
        html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SFB 1252 Website Inspection Report - {self.timestamp}</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }}
        .header {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
        }}
        .header h1 {{
            margin: 0 0 10px 0;
        }}
        .metadata {{
            font-size: 0.9em;
            opacity: 0.9;
        }}
        .section {{
            background: white;
            padding: 25px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }}
        .section h2 {{
            color: #333;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
            margin-top: 0;
        }}
        .status-pass {{
            color: #22c55e;
            font-weight: bold;
        }}
        .status-fail {{
            color: #ef4444;
            font-weight: bold;
        }}
        .status-warning {{
            color: #f59e0b;
            font-weight: bold;
        }}
        .metric {{
            display: inline-block;
            background: #f0f0f0;
            padding: 5px 15px;
            border-radius: 20px;
            margin: 5px;
            font-size: 0.9em;
        }}
        pre {{
            background: #f8f8f8;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            font-size: 0.85em;
        }}
        .summary {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }}
        .summary-card {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }}
        .summary-card h3 {{
            margin: 0 0 10px 0;
            font-size: 2em;
        }}
        .summary-card p {{
            margin: 0;
            opacity: 0.9;
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1>🔍 SFB 1252 Website Inspection Report</h1>
        <div class="metadata">
            <p><strong>Website:</strong> {self.website_url}</p>
            <p><strong>Generated:</strong> {self.timestamp}</p>
            <p><strong>Model:</strong> Gemini Flash Latest (gemini-flash-latest)</p>
            <p><strong>Browser-Use:</strong> 0.7.9 with Actor Use</p>
        </div>
    </div>
"""
        
        for section_name, section_data in self.sections.items():
            html += f"""
    <div class="section">
        <h2>{section_name}</h2>
        <pre>{json.dumps(section_data, indent=2, ensure_ascii=False)}</pre>
    </div>
"""
        
        html += """
</body>
</html>
"""
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)


async def run_comprehensive_test(website_url: str, api_key: str) -> dict:
    """Run comprehensive website inspection."""
    
    print("\n" + "=" * 80)
    print("COMPREHENSIVE SITE INSPECTION")
    print("=" * 80)
    print(f"Target: {website_url}")
    print(f"Model: Gemini Flash Latest (gemini-flash-latest)")
    print(f"Features: Actor Use + Thinking Capabilities")
    print("=" * 80 + "\n")
    
    # Initialize model
    llm = ChatGoogle(
        model="gemini-flash-latest",
        api_key=api_key,
        temperature=0.1,
    )
    
    # Define comprehensive inspection task
    task = f"""Perform a COMPREHENSIVE inspection of the SFB 1252 website at {website_url}

You are testing the complete website for production readiness. Cover ALL these areas:

## 1. NAVIGATION & STRUCTURE
- Test main navigation menu (all links work)
- Verify breadcrumb navigation
- Check footer links
- Test mobile/responsive menu if visible
- Verify search functionality (if present)

## 2. HOMEPAGE CONTENT
- Verify current workshop series title (Winter 2025-26)
- Check workshop count (should be 12 workshops listed)
- Verify all workshop links are clickable
- Check for TODO markers or placeholder text
- Verify schedule link works

## 3. WORKSHOPS SECTION (12 Total)
Core Research Skills (1-6):
- Good Academic Practice
- Research Data Management
- Ethics Approval
- Literature Management
- Annotation & Corpus Tools
- Preregistration

Programming & Technical (7-12):
- Coding in R - Basics
- Online Experiments
- Archiving Session
- Coding in Python/VSCode and LLMs
- Bayesian Regression Models
- Computational Reproducibility using R

For EACH workshop, verify:
- Link works and leads to correct page
- Title is correct
- Content is present (not empty/TODO)

## 4. MATRIX INTEGRATION (Community Features)
- Find "Community Chat" or "Matrix" section
- Verify matrix.to links are present and properly formatted
- Check for three Matrix rooms (General, Technical, Resources)
- Verify FluffyChat is recommended as client
- Check if setup guide link exists and works
- Look for Matrix badges/icons

## 5. RESOURCES & DOCUMENTATION
- Check "Resources" section exists
- Verify presenter resources are available
- Check development documentation
- Test calendar/agenda links
- Verify flyers/materials are accessible

## 6. ACCESSIBILITY & QUALITY
- Check for proper heading structure (h1, h2, h3)
- Verify images have alt text
- Look for broken images
- Check for console errors (if visible)
- Verify color contrast is readable
- Test keyboard navigation basics

## 7. PERFORMANCE & LOAD
- Note page load speed (fast/moderate/slow)
- Check if images are optimized
- Look for performance issues
- Verify smooth scrolling and interactions

## 8. FORMS & INTERACTIVITY
- Test any registration forms
- Check contact forms
- Verify interactive elements work
- Test any search functionality

## 9. EXTERNAL LINKS
- Verify external links work (university, CRC site)
- Check social media links (if present)
- Verify repository links (GitHub)

## 10. OVERALL ASSESSMENT
- List what's working well
- List issues found (critical vs minor)
- Provide actionable recommendations
- Give overall production readiness score (1-10)

USE ACTOR USE to query elements naturally. Be thorough and systematic.
Provide detailed findings for each section with specific examples."""

    try:
        print("🚀 Starting comprehensive inspection...")
        print("This will take 3-5 minutes for complete analysis...\n")
        
        start_time = time.time()
        
        # Create browser with headless=False to see what's happening
        browser = Browser(headless=False)
        agent = Agent(
            task=task,
            llm=llm,
            browser=browser,
        )
        
        # Run inspection
        result = await agent.run()
        
        elapsed_time = time.time() - start_time
        
        return {
            "success": True,
            "result": result,
            "elapsed_time": elapsed_time
        }
        
    except Exception as e:
        print(f"\n❌ Inspection failed: {e}")
        import traceback
        traceback.print_exc()
        return {
            "success": False,
            "error": str(e),
            "error_type": type(e).__name__
        }


async def main():
    """Main execution function."""
    
    # Load environment variables
    load_dotenv()
    
    api_key = os.getenv('GOOGLE_API_KEY')
    if not api_key or api_key == 'your_api_key_here':
        print("\n❌ ERROR: GOOGLE_API_KEY not set in .env file")
        print("Get your API key from: https://aistudio.google.com/app/apikey")
        return
    
    # Configuration
    website_url = "https://sfb1252.github.io/talks/"
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Create reports directory
    reports_dir = Path("mobile-testing/reports")
    reports_dir.mkdir(exist_ok=True)
    
    # Run comprehensive test
    result = await run_comprehensive_test(website_url, api_key)
    
    if result["success"]:
        print("\n" + "=" * 80)
        print("✅ INSPECTION COMPLETE")
        print("=" * 80)
        
        # Create report object
        report = SiteInspectionReport(website_url, timestamp)
        
        # Add result data
        report.add_section("Inspection Result", {
            "status": "completed",
            "elapsed_time_seconds": round(result["elapsed_time"], 2),
            "model": "gemini-flash-latest"
        })
        
        # Save raw result
        if hasattr(result["result"], 'final_result'):
            final_text = result["result"].final_result()
        else:
            final_text = str(result["result"])
            
        report.add_section("Detailed Findings", {
            "raw_output": final_text
        })
        
        # Save history if available
        if hasattr(result["result"], 'history') and result["result"].history:
            report.add_section("Execution History", {
                "steps": [str(step) for step in result["result"].history]
            })
        
        # Generate report files
        json_path = reports_dir / f"comprehensive_report_{timestamp}.json"
        html_path = reports_dir / f"comprehensive_report_{timestamp}.html"
        txt_path = reports_dir / f"comprehensive_report_{timestamp}.txt"
        
        report.to_json(str(json_path))
        report.to_html(str(html_path))
        
        # Save text version
        with open(txt_path, 'w', encoding='utf-8') as f:
            f.write(f"SFB 1252 COMPREHENSIVE WEBSITE INSPECTION\n")
            f.write(f"{'=' * 80}\n\n")
            f.write(f"Website: {website_url}\n")
            f.write(f"Timestamp: {timestamp}\n")
            f.write(f"Model: gemini-flash-latest\n")
            f.write(f"Time: {result['elapsed_time']:.1f} seconds\n\n")
            f.write(f"{'=' * 80}\n\n")
            f.write(final_text)
        
        print(f"\n📊 Reports generated:")
        print(f"   - JSON: {json_path}")
        print(f"   - HTML: {html_path}")
        print(f"   - TXT:  {txt_path}")
        
        print(f"\n⏱️  Time: {result['elapsed_time']:.1f} seconds")
        print(f"\n📄 View HTML report for best experience:")
        print(f"   {html_path.absolute()}")
        
        # Print summary
        print("\n" + "=" * 80)
        print("INSPECTION SUMMARY")
        print("=" * 80)
        print(final_text[:1000] + "..." if len(final_text) > 1000 else final_text)
        
    else:
        print("\n" + "=" * 80)
        print("❌ INSPECTION FAILED")
        print("=" * 80)
        print(f"Error: {result.get('error', 'Unknown error')}")


if __name__ == "__main__":
    print("\n" + "=" * 80)
    print("  SFB 1252 COMPREHENSIVE WEBSITE INSPECTOR")
    print("  Browser-Use 0.7.9 + Actor Use + Gemini Flash Latest")
    print("=" * 80)
    asyncio.run(main())
