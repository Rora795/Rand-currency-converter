/*
  ZAR Currency Converter Pro
  Copyright (c) 2026 Rotshidzwa Avheani
  Licensed under MIT License
  */
// Exchange rates object (will be updated from API)
let exchangeRates = {
    USD: 18.50,
    EUR: 20.10,
    GBP: 23.45,
    JPY: 0.124,
    AUD: 12.15,
    CAD: 13.60,
    CNY: 2.55,
    INR: 0.222,
    ZAR: 1.00,
    BWP: 1.35,
    NAD: 1.00,
    SZL: 1.00
};

// Currency symbols
const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    CNY: '¥',
    INR: '₹',
    ZAR: 'R',
    BWP: 'P',
    NAD: 'N$',
    SZL: 'E'
};

let historicalChart = null;
let conversionHistory = [];

// Loading history from localStorage
function loadHistory() {
    const saved = localStorage.getItem('zarConversionHistory');
    if (saved) {
        conversionHistory = JSON.parse(saved);
        updateHistoryDisplay();
    }
}

// Saving history to localStorage
function saveHistory() {
    localStorage.setItem('zarConversionHistory', JSON.stringify(conversionHistory));
}

// Adding conversion to history
function addToHistory(fromAmount, fromCurrency, toAmount, toCurrency) {
    const timestamp = new Date().toLocaleString('en-ZA');
    const historyItem = {
        timestamp,
        fromAmount,
        fromCurrency,
        toAmount,
        toCurrency,
        formatted: `${formatCurrency(fromAmount, fromCurrency)} = ${formatCurrency(toAmount, toCurrency)} (${timestamp})`
    };
    
    conversionHistory.unshift(historyItem);
    
    // Keep only last 20 items
    if (conversionHistory.length > 20) {
        conversionHistory.pop();
    }
    
    saveHistory();
    updateHistoryDisplay();
}

// Update history display
function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    if (conversionHistory.length === 0) {
        historyList.innerHTML = '<li>No conversions yet. Start converting!</li>';
        return;
    }
    
    historyList.innerHTML = conversionHistory.map(item => 
        `<li>${item.formatted}</li>`
    ).join('');
}

// Clear history function
function clearHistory() {
    if (confirm('Clear all conversion history?')) {
        conversionHistory = [];
        saveHistory();
        updateHistoryDisplay();
    }
}

// Fetch live exchange rates from API
async function fetchLiveRates() {
    const statusText = document.getElementById('statusText');
    const statusDot = document.querySelector('.status-dot');
    
    try {
        statusText.textContent = 'Fetching live rates...';
        statusDot.style.backgroundColor = '#ffc107';
        
        // Using ExchangeRate-API (free tier, no API key is needed for basic)
        
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/ZAR');
        
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        
        // Update exchange rates
        exchangeRates = {
            ZAR: 1.00,
            USD: data.rates.USD || 18.50,
            EUR: data.rates.EUR || 20.10,
            GBP: data.rates.GBP || 23.45,
            JPY: data.rates.JPY || 0.124,
            AUD: data.rates.AUD || 12.15,
            CAD: data.rates.CAD || 13.60,
            CNY: data.rates.CNY || 2.55,
            INR: data.rates.INR || 0.222,
            BWP: data.rates.BWP || 1.35,
            NAD: data.rates.NAD || 1.00,
            SZL: data.rates.SZL || 1.00
        };
        
        statusText.textContent = 'Live rates loaded successfully!';
        statusDot.style.backgroundColor = '#4CAF50';
        
        // Update the display
        updateResult();
        
        // Show success message
        setTimeout(() => {
            statusText.textContent = 'Rates updated - Real-time data';
        }, 2000);
        
    } catch (error) {
        console.error('Error fetching rates:', error);
        statusText.textContent = 'Using cached rates (API error)';
        statusDot.style.backgroundColor = '#dc3545';
        
        // Fallback to localStorage cached rates
        const cached = localStorage.getItem('zarCachedRates');
        if (cached) {
            exchangeRates = JSON.parse(cached);
            updateResult();
        }
    }
}

// Cache rates locally
function cacheRates() {
    localStorage.setItem('zarCachedRates', JSON.stringify(exchangeRates));
}

// Format number as currency
function formatCurrency(amount, currencyCode) {
    const symbol = currencySymbols[currencyCode] || currencyCode;
    const formattedAmount = amount.toLocaleString('en-ZA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return `${symbol} ${formattedAmount}`;
}

// Convert currency
function convertCurrency(amount, fromCurrency, toCurrency) {
    if (isNaN(amount) || amount <= 0) {
        return 0;
    }
    
    const amountInZAR = amount / exchangeRates[fromCurrency];
    const convertedAmount = amountInZAR * exchangeRates[toCurrency];
    
    return convertedAmount;
}

// Update result display
function updateResult() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('result').innerHTML = 'Please enter a valid amount';
        return;
    }
    
    const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
    
    const formattedFrom = formatCurrency(amount, fromCurrency);
    const formattedTo = formatCurrency(convertedAmount, toCurrency);
    
    const resultText = `${formattedFrom} = ${formattedTo}`;
    document.getElementById('result').innerHTML = resultText;
    
    // Add to history
    addToHistory(amount, fromCurrency, convertedAmount, toCurrency);
    
    // Animation
    const resultBox = document.getElementById('resultBox');
    resultBox.style.transform = 'scale(1.02)';
    setTimeout(() => {
        resultBox.style.transform = 'scale(1)';
    }, 200);
}

// Swap currencies
function swapCurrencies() {
    const fromSelect = document.getElementById('fromCurrency');
    const toSelect = document.getElementById('toCurrency');
    
    const tempValue = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = tempValue;
    
    updateResult();
    
    const swapBtn = document.querySelector('.swap-btn');
    swapBtn.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        swapBtn.style.transform = 'rotate(0deg)';
    }, 300);
}

// Generate historical data (simulated for demo project)
function generateHistoricalData(currency, days = 30) {
    const data = [];
    const labels = [];
    const baseRate = exchangeRates[currency];
    
    for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' }));
        
        // Simulate realistic ZAR fluctuations (±5%)
        const variation = 1 + (Math.sin(i * 0.5) * 0.05) + (Math.random() * 0.02 - 0.01);
        const rate = baseRate * variation;
        data.push(rate);
    }
    
    return { labels, data };
}

// Update historical chart
function updateChart() {
    const currency = document.getElementById('chartCurrency').value;
    const { labels, data } = generateHistoricalData(currency);
    
    if (historicalChart) {
        historicalChart.destroy();
    }
    
    const ctx = document.getElementById('historicalChart').getContext('2d');
    historicalChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `ZAR to ${currency} (1 ${currency} = ? ZAR)`,
                data: data,
                borderColor: '#f7b32b',
                backgroundColor: 'rgba(247, 179, 43, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${currency}: ${context.raw.toFixed(4)} ZAR`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: `Exchange Rate (ZAR per 1 ${currency})`
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });
}

// Save as PDF
function saveAsPDF() {
    const element = document.getElementById('reportContent');
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `ZAR_Conversion_Report_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: false },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    // Show loading indicator
    const pdfBtn = document.getElementById('pdfBtn');
    const originalText = pdfBtn.textContent;
    pdfBtn.textContent = 'Generating PDF...';
    pdfBtn.disabled = true;
    
    html2pdf().set(opt).from(element).save().then(() => {
        pdfBtn.textContent = originalText;
        pdfBtn.disabled = false;
        
        // Show success message
        const resultBox = document.getElementById('resultBox');
        const originalResult = document.getElementById('result').innerHTML;
        document.getElementById('result').innerHTML = '✓ PDF saved successfully!';
        setTimeout(() => {
            document.getElementById('result').innerHTML = originalResult;
        }, 2000);
    }).catch(error => {
        console.error('PDF generation error:', error);
        pdfBtn.textContent = originalText;
        pdfBtn.disabled = false;
        alert('Error generating PDF. Please try again.');
    });
}

// Print report
function printReport() {
    window.print();
}

// Initialize everything
async function init() {
    loadHistory();
    await fetchLiveRates();
    cacheRates();
    updateChart();
    
    // Set up auto-refresh every 5 minutes
    setInterval(() => {
        fetchLiveRates();
    }, 300000);
}

// Event listeners
document.getElementById('convertBtn').addEventListener('click', updateResult);
document.getElementById('swapBtn').addEventListener('click', swapCurrencies);
document.getElementById('refreshBtn').addEventListener('click', fetchLiveRates);
document.getElementById('pdfBtn').addEventListener('click', saveAsPDF);
document.getElementById('printBtn').addEventListener('click', printReport);
document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
document.getElementById('updateChartBtn').addEventListener('click', updateChart);
document.getElementById('fromCurrency').addEventListener('change', updateResult);
document.getElementById('toCurrency').addEventListener('change', updateResult);
document.getElementById('amount').addEventListener('input', updateResult);
document.getElementById('amount').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') updateResult();
});

// Start the app
init();