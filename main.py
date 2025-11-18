#!/usr/bin/env python3
"""
Green Roots - Python Data Processing Service
Processes environmental data and generates reports
"""

import os
import time
import json
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import schedule

def process_environmental_data():
    """Process environmental sensor data"""
    print(f"[{datetime.now()}] Processing environmental data...")
    
    # Simulate sensor data processing
    data = {
        'timestamp': datetime.now().isoformat(),
        'temperature': np.random.normal(22, 3),
        'humidity': np.random.normal(65, 10),
        'ph': np.random.normal(6.8, 0.5),
        'co2_absorption': np.random.normal(25, 5)
    }
    
    # Save processed data
    os.makedirs('/app/data', exist_ok=True)
    with open('/app/data/latest_readings.json', 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Data processed: {data}")

def generate_weekly_report():
    """Generate weekly environmental report"""
    print(f"[{datetime.now()}] Generating weekly report...")
    
    # Simulate report generation
    report = {
        'week': datetime.now().strftime('%Y-W%U'),
        'trees_planted': np.random.randint(50, 150),
        'survival_rate': np.random.uniform(85, 95),
        'co2_absorbed': np.random.uniform(500, 1500),
        'generated_at': datetime.now().isoformat()
    }
    
    # Save report
    filename = f"/app/data/weekly_report_{datetime.now().strftime('%Y%m%d')}.json"
    with open(filename, 'w') as f:
        json.dump(report, f, indent=2)
    
    print(f"Weekly report generated: {filename}")

def main():
    """Main application loop"""
    print("🌱 Green Roots Python Data Processor Started")
    print("=" * 50)
    
    # Schedule tasks
    schedule.every(30).seconds.do(process_environmental_data)
    schedule.every().monday.at("09:00").do(generate_weekly_report)
    
    # Run initial processing
    process_environmental_data()
    
    # Keep the service running
    while True:
        schedule.run_pending()
        time.sleep(1)

if __name__ == "__main__":
    main()