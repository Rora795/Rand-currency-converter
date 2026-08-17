#  ZAR Currency Converter Pro

A currency converter web application focused on the South African Rand (ZAR) with live exchange rates, historical charts, and PDF export functionality.

## Features

- **Live Exchange Rates**: Fetches real-time rates from ExchangeRate-API
- **12 Currencies Supported**: ZAR, USD, EUR, GBP, JPY, AUD, CAD, CNY, INR, BWP, NAD, SZL
- **Interactive Converter**: Real-time conversion with amount input
- **Historical Charts**: 30-day performance visualization using Chart.js
- **Conversion History**: Tracks last 20 conversions with localStorage persistence
- **PDF Export**: Generate professional reports with html2pdf
- **Print Friendly**: Optimized print layout
- **Responsive Design**: Works on all devices
- **Currency Swap**: Quick swap between currencies
- **Auto-refresh**: Rates update every 5 minutes


##  Project Structure
project/
├── index.html # Main HTML structure
├── style.css # Complete styling (dark theme with ZAR colors)
├── script.js # All JavaScript functionality
└── README.md # Project documentation

##  Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with gradients and animations
- **JavaScript (ES6+)** - Vanilla JS for all functionality
- **Chart.js v4.4.0** - Historical data visualization
- **html2pdf.js v0.10.1** - PDF generation
- **ExchangeRate-API** - Live currency rates

##  Installation

1. **Clone or download** this repository:
```bash
git clone https://github.com/Rora795/zar-currency-converter.git
No build tools needed - This is a pure HTML/CSS/JS project!
Open index.html directly in your browser, or use Live Server in VS Code:
# If you have Live Server installed
right-click index.html → Open with Live Server
Optional: Deploy to any static hosting (Netlify, Vercel, GitHub Pages, etc.)

## Usage
Basic Conversion
Enter an amount (default: 1000)
Select "From" currency
Select "To" currency
Click "Convert Now" or press Enter

## Features
Refresh Rates: Click the refresh button to fetch latest exchange rates
Swap Currencies: Click the "swap" button to reverse the conversion
View History: See your last 20 conversions below
Clear History: Remove all conversion history
View Charts: Select a currency to see 30-day ZAR performance
Save as PDF: Export the entire report as a PDF
Print: Print the page with optimized formatting
Keyboard Shortcuts
Enter - Trigger conversion
Tab - Navigate between input

## Configuration
API Settings
The app uses ExchangeRate-API's free endpoint:

javascript
// In script.js
const response = await fetch('https://api.exchangerate-api.com/v4/latest/ZAR');
Supported Currencies:
javascript
const currencies = {
    ZAR: 'South African Rand',
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    JPY: 'Japanese Yen',
    AUD: 'Australian Dollar',
    CAD: 'Canadian Dollar',
    CNY: 'Chinese Yuan',
    INR: 'Indian Rupee',
    BWP: 'Botswana Pula',
    NAD: 'Namibian Dollar',
    SZL: 'Swazi Lilangeni'
};
Auto-refresh Interval
Currently set to 5 minutes (300,000ms):
javascript
setInterval(() => {
    fetchLiveRates();
}, 300000);

 # Customization
Changing the Theme
Modify the CSS variables in style.css:
css
body {
    background: linear-gradient(135deg, #344584 0%, #54a847ae 50%, #80745c 100%);
}

Adding Currencies
Add to HTML selects in index.html

Add rate to exchangeRates object in script.js

Add symbol to currencySymbols object

Modifying Chart Period
Change the days parameter in generateHistoricalData():

## Browser Support
Browser	 Version	 Status
Chrome	90+	✅  Full support
Firefox	88+	✅  Full support
Safari	14+	✅  Full support
Edge	90+	✅  Full support
Opera	76+	✅  Full support

# Known Issues
Free API tier has rate limits (10 requests/hour)
Historical data is simulated (not actual historical rates)
Some PDF exports may have formatting quirks on mobile

# Future Enhancements
Add more currencies (Nigerian Naira, Kenyan Shilling, etc.)
Implement real historical data from a financial API
Add dark/light theme toggle
Create user accounts to save preferences
Add multiple charts for comparison
Mobile app version (React Native/Flutter)
Add currency news feeds
Export to Excel/CSV

# Contributing
Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

**This project is licensed under the MIT License - see the LICENSE file for details.**

# Acknowledgments
ExchangeRate-API for free exchange rates
Chart.js for beautiful charts
html2pdf for PDF generation
South African flag design inspiration

# Contact
Rotshidzwa Avheani - GitHub:Rora795 

Project Link: https://github.com/Rora795/zar-currency-converter

**If you find this useful, please give it a star!**