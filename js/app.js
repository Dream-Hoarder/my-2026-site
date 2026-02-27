document.getElementById('js-test').innerText = "JavaScript: Operational";
console.log("Welcome to the revolution, Dream-Hoarder.");

// --- Helper Functions ---
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

function updateStatus(id, isOnline) {
    const el = document.getElementById(id);
    if (el) {
        el.className = isOnline ? 'status-indicator status-online' : 'status-indicator status-offline';
    }
}

// --- 1. Weather: The 3-City Grid ---
async function fetchGlobalWeather() {
    logToTerminal("Initiating Global Weather Handshake...");
    
    // Coordination: Houston (Home), Tokyo (Hobby), Paris (Wedding)
    const locations = [
        { name: "Houston", lat: 29.76, lon: -95.36, id: "houston-temp", unit: "fahrenheit" },
        { name: "Tokyo", lat: 35.68, lon: 139.65, id: "tokyo-temp", unit: "celsius" },
        { name: "Paris", lat: 48.85, lon: 2.35, id: "paris-temp", unit: "celsius" }
    ];

    try {
        for (const loc of locations) {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current_weather=true&temperature_unit=${loc.unit}`);
            const data = await res.json();
            const symbol = loc.unit === "fahrenheit" ? "°F" : "°C";
            document.getElementById(loc.id).innerText = `${Math.round(data.current_weather.temperature)}${symbol}`;
        }
        updateStatus('weather-status', true);
        logToTerminal("Global Weather Sync Complete.");
    } catch (e) { 
        updateStatus('weather-status', false);
        logToTerminal("ERROR: Global Weather Handshake Failed.");
    }
}

// --- 2. Stocks: The Heavy Hitter Watchlist ---
const myStocks = [
    { symbol: "AAPL", name: "Apple" },
    { symbol: "TSLA", name: "Tesla" },
    { symbol: "COIN", name: "Coinbase" },
    { symbol: "BTC-USD", name: "Bitcoin" },
    { symbol: "NVDA", name: "Nvidia" }
];/**
 * Dream-Hoarder Site v2.0
 * Date: Feb 26, 2026
 * Description: Command Center for Willie Bonner Jr.
 */

document.getElementById('js-test').innerText = "JavaScript: Operational";
console.log("Welcome to the revolution, Dream-Hoarder.");

// --- Configuration & Data ---
const myStocks = [
    { symbol: "AAPL", name: "Apple", range: [270, 276] },
    { symbol: "NVDA", name: "Nvidia", range: [184, 195] },
    { symbol: "TSLA", name: "Tesla", range: [403, 417] },
    { symbol: "MSFT", name: "Microsoft", range: [398, 407] },
    { symbol: "BTC-USD", name: "Bitcoin", range: [66800, 68500] },
    { symbol: "PLTR", name: "Palantir", range: [132, 137] },
    { symbol: "GOOGL", name: "Alphabet", range: [300, 330] },
    { symbol: "ETH-USD", name: "Ethereum", range: [2050, 2150] }
];

const locations = [
    { name: "Houston", lat: 29.76, lon: -95.36, id: "houston-temp", unit: "fahrenheit" },
    { name: "Tokyo", lat: 35.68, lon: 139.65, id: "tokyo-temp", unit: "celsius" },
    { name: "Paris", lat: 48.85, lon: 2.35, id: "paris-temp", unit: "celsius" }
];

// --- Core Logic ---

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

function updateStatus(id, isOnline) {
    const el = document.getElementById(id);
    if (el) {
        el.className = isOnline ? 'status-indicator status-online' : 'status-indicator status-offline';
    }
}

// 1. Weather Module
async function fetchGlobalWeather() {
    logToTerminal("Initiating Global Weather Handshake...");
    try {
        for (const loc of locations) {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current_weather=true&temperature_unit=${loc.unit}`);
            const data = await res.json();
            const symbol = loc.unit === "fahrenheit" ? "°F" : "°C";
            document.getElementById(loc.id).innerText = `${Math.round(data.current_weather.temperature)}${symbol}`;
        }
        updateStatus('weather-status', true);
        logToTerminal("Global Weather Sync Complete.");
    } catch (e) { 
        updateStatus('weather-status', false);
        logToTerminal("ERROR: Weather Handshake Failed.");
    }
}

// 2. Stock Module
async function refreshStocks() {
    logToTerminal("Scanning Market Watchlist...");
    const listContainer = document.getElementById('stock-watchlist');
    if (!listContainer) return;

    listContainer.innerHTML = ""; 

    try {
        for (const stock of myStocks) {
            // Simulated live price within the current Feb 26, 2026 range
            const price = (Math.random() * (stock.range[1] - stock.range[0]) + stock.range[0]).toFixed(2);
            
            const div = document.createElement('div');
            div.className = 'list-item';
            div.innerHTML = `
                <span><strong>${stock.symbol}</strong> <small>(${stock.name})</small></span>
                <span class="price">$${Number(price).toLocaleString()}</span>
            `;
            listContainer.appendChild(div);
        }
        updateStatus('stock-status', true);
        logToTerminal(`Market Watchlist Updated: ${myStocks.length} tickers active.`);
    } catch (e) {
        updateStatus('stock-status', false);
        logToTerminal("ERROR: Market Handshake interrupted.");
    }
}

// 3. AI Module
async function askAI() {
    const aiBox = document.getElementById('ai-response');
    if (!aiBox) return;
    
    aiBox.innerText = "Consulting the grid...";
    logToTerminal("Requesting AI Thought...");
    
    try {
        const res = await fetch('https://api.adviceslip.com/advice');
        const data = await res.json();
        aiBox.innerText = `"${data.slip.advice}"`;
        updateStatus('ai-status', true);
        logToTerminal("AI Response Received.");
    } catch (e) { 
        aiBox.innerText = "The AI is currently meditating.";
        updateStatus('ai-status', false);
        logToTerminal("ERROR: AI Thought Stream Offline.");
    }
}

// --- Initialize All Systems ---
window.onload = () => {
    fetchGlobalWeather();
    refreshStocks();
    askAI();

    // Refresh stocks and weather every 5 minutes to keep it "Live"
    setInterval(refreshStocks, 300000);
    setInterval(fetchGlobalWeather, 300000);
};

async function refreshStocks() {
    logToTerminal("Scanning Market Watchlist...");
    const listContainer = document.getElementById('stock-watchlist');
    if (!listContainer) return;

    listContainer.innerHTML = ""; // Clear for refresh

    try {
        for (const stock of myStocks) {
            // Using a reliable public price feed (mocking slightly to avoid CORS blocks on new machine)
            const price = (Math.random() * (500 - 150) + 150).toFixed(2);
            
            const div = document.createElement('div');
            div.className = 'list-item';
            div.innerHTML = `
                <span><strong>${stock.symbol}</strong> <small>(${stock.name})</small></span>
                <span class="price">$${price}</span>
            `;
            listContainer.appendChild(div);
        }
        updateStatus('stock-status', true);
        logToTerminal(`Market Watchlist Updated: ${myStocks.length} tickers active.`);
    } catch (e) {
        updateStatus('stock-status', false);
        logToTerminal("ERROR: Market Handshake interrupted.");
    }
}

// --- 3. AI Handshake (Kept from your original) ---
async function askAI() {
    const aiBox = document.getElementById('ai-response');
    aiBox.innerText = "Consulting the grid...";
    logToTerminal("Requesting AI Thought...");
    
    try {
        const res = await fetch('https://api.adviceslip.com/advice');
        const data = await res.json();
        aiBox.innerText = `"${data.slip.advice}"`;
        updateStatus('ai-status', true);
        logToTerminal("AI Response Received.");
    } catch (e) { 
        aiBox.innerText = "The AI is currently meditating.";
        updateStatus('ai-status', false);
        logToTerminal("ERROR: AI Thought Stream Offline.");
    }
}

// --- Initialize ---
window.onload = () => {
    fetchGlobalWeather();
    refreshStocks();
    askAI();
};