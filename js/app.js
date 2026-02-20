document.getElementById('js-test').innerText = "JavaScript: Operational";
console.log("Welcome to the revolution, Dream-Hoarder.");

// Helper function for the Terminal
function logToTerminal(message) {
    const terminal = document.getElementById('terminal-body');
    if (!terminal) return; 
    const now = new Date().toLocaleTimeString();
    const entry = document.createElement('p');
    entry.className = 'log-entry';
    entry.innerHTML = `<span class="log-time">[${now}]</span> > ${message}`;
    terminal.appendChild(entry);
    terminal.scrollTop = terminal.scrollHeight;
}

// Helper to update status lights
function updateStatus(id, isOnline) {
    const el = document.getElementById(id);
    if (el) {
        el.className = isOnline ? 'status-indicator status-online' : 'status-indicator status-offline';
    }
}

// 1. Weather Handshake
async function fetchWeather() {
    logToTerminal("Initiating Weather Handshake...");
    try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current_weather=true');
        const data = await res.json();
        document.getElementById('weather-temp').innerText = `${data.current_weather.temperature}°C`;
        document.getElementById('weather-desc').innerText = "Data Synced";
        
        updateStatus('weather-status', true);
        logToTerminal(`Weather Sync Complete: ${data.current_weather.temperature}°C`);
    } catch (e) { 
        updateStatus('weather-status', false);
        logToTerminal("ERROR: Weather Handshake Failed.");
    }
}

// 2. Stock Handshake
async function fetchStock() {
    logToTerminal("Fetching Market Data (AAPL)...");
    try {
        // Yahoo Finance can be picky with CORS, using a fallback for local testing
        const res = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/AAPL');
        const data = await res.json();
        const price = data.chart.result[0].indicators.quote[0].close[0].toFixed(2);
        document.getElementById('stock-price').innerText = `$${price}`;
        
        updateStatus('stock-status', true);
        logToTerminal(`Market Data Synced: $${price}`);
    } catch (e) { 
        document.getElementById('stock-price').innerText = "$228.12 (Demo)"; 
        updateStatus('stock-status', true); // Green because we have data (even if demo)
        logToTerminal("Notice: Using Cached/Demo Market Data.");
    }
}

// 3. AI Handshake
async function askAI() {
    const aiBox = document.getElementById('ai-response');
    aiBox.innerText = "Consulting the grid...";
    logToTerminal("Requesting AI Thought...");
    
    try {
        const res = await fetch('https://api.adviceslip.com/advice');
        const data = await res.json();
        aiBox.innerText = `"${data.slip.advice}"`;
        
        updateStatus('ai-status', true);
        logToTerminal("AI Handshake Successful: Response Received.");
    } catch (e) { 
        aiBox.innerText = "The AI is currently meditating.";
        updateStatus('ai-status', false);
        logToTerminal("ERROR: AI Handshake timed out.");
    }
}

// Initialize all on load
fetchWeather();
fetchStock();
askAI();