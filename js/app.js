/**
 * Dream-Hoarder Site v2.0
 * Date: Feb 28, 2026
 * Description: Unified Command Center Script
 */

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

// --- Configuration & Data ---
const myStocks = [
    { symbol: "AAPL", name: "Apple", range: [270, 276] },
    { symbol: "NVDA", name: "Nvidia", range: [184, 195] },
    { symbol: "TSLA", name: "Tesla", range: [403, 417] },
    { symbol: "MSFT", name: "Microsoft", range: [398, 407] },
    { symbol: "GOOGL", name: "Alphabet", range: [300, 330] },
    { symbol: "AMZN", name: "Amazon", range: [175, 185] },
    { symbol: "META", name: "Meta", range: [480, 500] },
    { symbol: "PLTR", name: "Palantir", range: [132, 137] },
    { symbol: "AMD", name: "AMD", range: [170, 180] },
    { symbol: "COIN", name: "Coinbase", range: [240, 260] },
    { symbol: "BTC-USD", name: "Bitcoin", range: [66800, 68500] },
    { symbol: "ETH-USD", name: "Ethereum", range: [2050, 2150] }
];

const locations = [
    { name: "Houston", lat: 29.76, lon: -95.36, id: "houston-temp", unit: "fahrenheit" },
    { name: "Tokyo", lat: 35.68, lon: 139.65, id: "tokyo-temp", unit: "celsius" },
    { name: "Paris", lat: 48.85, lon: 2.35, id: "paris-temp", unit: "celsius" }
];

const myArticles = [
    {
        date: "2026-02-28",
        title: "The 2026 Pivot: From Data to Wisdom",
        snippet: "In a world flooded with AI noise, the true 'Dream-Hoarder' focuses on high-signal intelligence.",
        link: "#"
    },
    {
        date: "2026-02-25",
        title: "Automating the Revolution",
        snippet: "How integrated dashboards bridge the gap between market awareness and execution.",
        link: "#"
    },
    {
        date: "2026-02-15",
        title: "Securing the Command Center",
        snippet: "Why SSH Ed25519 is the only handshake you should trust for your infrastructure.",
        link: "#"
    }
];

// --- 1. Weather Module ---
async function fetchGlobalWeather() {
    logToTerminal("Initiating Global Weather Handshake...");
    try {
        for (const loc of locations) {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current_weather=true&temperature_unit=${loc.unit}`);
            const data = await res.json();
            const symbol = loc.unit === "fahrenheit" ? "°F" : "°C";
            const el = document.getElementById(loc.id);
            if (el && data && data.current_weather) {
                el.innerText = `${Math.round(data.current_weather.temperature)}${symbol}`;
            }
        }
        updateStatus('weather-status', true);
        logToTerminal("Global Weather Sync Complete.");
    } catch (e) { 
        updateStatus('weather-status', false);
        logToTerminal("ERROR: Global Weather Handshake Failed.");
    }
}

// --- 2. Stock Module ---
async function refreshStocks() {
    logToTerminal("Scanning Market Watchlist...");
    const listContainer = document.getElementById('stock-watchlist');
    if (!listContainer) return;
    listContainer.innerHTML = ""; 

    try {
        for (const stock of myStocks) {
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

// --- 3. AI Module ---
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

// --- 4. Intelligence Feed (Blog) ---
function renderBlog() {
    logToTerminal("Syncing Intelligence Feed...");
    const blogWrapper = document.getElementById('blog-posts');
    if (!blogWrapper) return;
    blogWrapper.innerHTML = ""; 

    myArticles.forEach(article => {
        const art = document.createElement('article');
        art.innerHTML = `
            <small style="color: #8b949e; font-family: monospace;">${article.date}</small>
            <h4 style="margin: 5px 0; color: #58a6ff;">${article.title}</h4>
            <p style="font-size: 0.9rem; margin-bottom: 10px;">${article.snippet}</p>
            <a href="${article.link}" style="color: #3fb950; font-size: 0.8rem; text-decoration: none; font-weight: bold;">READ PROTOCOL ></a>
        `;
        blogWrapper.appendChild(art);
    });
    logToTerminal("Intelligence Feed: Online.");
}

// --- Initialization ---
window.onload = () => {
    fetchGlobalWeather();
    refreshStocks();
    askAI();
    renderBlog(); // <--- This must be active

    setInterval(refreshStocks, 300000);
    setInterval(fetchGlobalWeather, 300000);
};