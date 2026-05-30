const myArticles = [
  {
    date: "2026-05-28",
    title: "Qubes OS: Hardening My Developer Workspace",
    snippet: "A deep dive into Xen VM containment, customizing TemplateVMs, and managing secure file streams via Qubes-specific RPC protocols.",
    link: "blog-qubes-hardening.html"
  },
  {
    date: "2026-05-20",
    title: "Understanding Qubes qrexec: Inter-VM Automation",
    snippet: "How custom qrexec policies allow secure, auditable communication channels between restricted AppVMs without exposing dom0.",
    link: "blog-qubes-qrexec.html"
  },
  {
    date: "2026-02-28",
    title: "The 2026 Pivot: From Data to Wisdom",
    snippet: "In a world flooded with AI noise, the Dream-Hoarder focuses on high-signal intelligence. What separates execution from distraction.",
    link: "blog-2026-pivot.html"
  }
];

const locations = [
  { name: "Houston", lat: 29.76, lon: -95.36, id: "houston-temp", unit: "fahrenheit", symbol: "°F" },
  { name: "Tokyo",   lat: 35.68, lon: 139.65, id: "tokyo-temp",   unit: "celsius",    symbol: "°C" },
  { name: "Paris",   lat: 48.85, lon: 2.35,   id: "paris-temp",   unit: "celsius",    symbol: "°C" }
];

function logToTerminal(msg) {
  const history = document.getElementById('terminal-history');
  if (!history) return;
  const p = document.createElement('p');
  const ts = new Date().toLocaleTimeString();
  p.innerHTML = `<span class="log-time">[${ts}]</span> > ${msg}`;
  history.appendChild(p);
  
  const body = document.getElementById('terminal-body');
  if (body) { body.scrollTop = body.scrollHeight; }
}

function handleTerminalCommand(cmdText) {
  const cmd = cmdText.trim().toLowerCase();
  logToTerminal(`<span style="color: var(--text)">$ ${cmdText}</span>`);
  
  if (!cmd) return;
  
  const parts = cmd.split(' ');
  const primaryCmd = parts[0];
  
  switch (primaryCmd) {
    case 'help':
      logToTerminal('Available commands: help, about, skills, projects, contact, neofetch, security, clear');
      break;
    case 'about':
      logToTerminal('Willie Bonner Jr. - Technical Architect and Systems Security Specialist. Operating under Zero-Trust paradigm.');
      break;
    case 'skills':
      logToTerminal('Core Specializations:');
      logToTerminal('- Security: Zero-Trust, LUKS, Secure Boot, qrexec, kernel hardening');
      logToTerminal('- Networks: Tor, ProtonVPN, Quad9, Ingress/Egress baselines');
      logToTerminal('- Software: Unity, Firebase, PowerShell, Perl, JS');
      logToTerminal('- Data: Spark, Kafka, Apache Iceberg v3');
      break;
    case 'projects':
      logToTerminal('Open Source Repositories:');
      logToTerminal('- Scriptgeist: Smart real-time system sentinel');
      logToTerminal('- SLAnalyzer: Cybersecurity log parsing');
      logToTerminal('- SecretSeeker: Exposed secrets detection tooling');
      logToTerminal('- Echo Ledger Journal: Blockchain immutable auditing');
      logToTerminal('- Sigil: Perl regex REPL & testing grounds');
      break;
    case 'contact':
      logToTerminal('Signal coordinates: email: willie.bonnerjr@outlook.com | github: github.com/Dream-Hoarder');
      break;
    case 'neofetch':
      const userAgent = navigator.userAgent;
      const browser = userAgent.includes("Chrome") ? "Chrome" : userAgent.includes("Firefox") ? "Firefox" : "Safari";
      logToTerminal(`<span style="color: var(--accent)">guest@dream-hoarder</span>`);
      logToTerminal(`---------------------`);
      logToTerminal(`OS: Qubes OS (Zero Trust Node)`);
      logToTerminal(`Host: Client Browser running ${browser}`);
      logToTerminal(`Uptime: ${Math.round(performance.now() / 1000)}s`);
      logToTerminal(`Shell: WebTerminal v1.0`);
      logToTerminal(`Resolution: ${window.innerWidth}x${window.innerHeight}`);
      logToTerminal(`Terminal Theme: Neon Cyber Mono`);
      break;
    case 'security':
      logToTerminal('=== PGP PUBLIC KEY BLOCK ===');
      logToTerminal('-----BEGIN PGP PUBLIC KEY BLOCK-----');
      logToTerminal('mQINBF6yU4QBEADWqJ3r8m8c5Yp7Qp3G5bFx4vD0LqK3A8tJ3b...');
      logToTerminal('hR8bF3v9M7c5dK1pY3qZ9X8c5Yp7Qp3G5bFx4vD0LqK3A8tJ3b...');
      logToTerminal('Fingerprint: 8F2B 9C4E 1D0A 7B5F 3A6E 0C5D 2E4F 1A9C (Verify onchain)');
      logToTerminal('-----END PGP PUBLIC KEY BLOCK-----');
      logToTerminal('Policy: <a href="SECURITY.md" target="_blank" style="color: var(--accent); text-decoration: underline;">SECURITY.md</a> | <a href=".well-known/security.txt" target="_blank" style="color: var(--accent); text-decoration: underline;">security.txt</a>');
      break;
    case 'clear':
      const history = document.getElementById('terminal-history');
      if (history) history.innerHTML = '';
      break;
    default:
      logToTerminal(`Command not found: ${primaryCmd}. Type "help" for a list of commands.`);
  }
}

function setDot(id, on) {
  const el = document.getElementById(id);
  if (el) { el.className = 'status-dot ' + (on ? 'on' : 'off'); }
}

async function fetchWeather() {
  logToTerminal('Initiating weather sync...');
  try {
    for (const loc of locations) {
      const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current_weather=true&temperature_unit=${loc.unit}`);
      const d = await r.json();
      const el = document.getElementById(loc.id);
      if (el && d?.current_weather) {
        el.innerText = Math.round(d.current_weather.temperature) + loc.symbol;
      }
    }
    setDot('weather-dot', true);
    logToTerminal('Weather sync complete.');
  } catch(e) {
    setDot('weather-dot', false);
    logToTerminal('ERROR: Weather sync failed.');
  }
}

const agentThoughts = [
  "Security is not a product, it is a process of reducing attack surface continuously.",
  "Autonomous AI agents are operational multipliers, but only within strict zero-trust sandbox execution limits.",
  "Immutable journals and cryptographically signed logs are the only proof of system state integrity.",
  "If ingress/egress configurations do not default to Deny-All, your perimeter is already breached.",
  "Type-safe schemas and runtime validation are the primary guards against prompt injection in LLM pipelines.",
  "Kernel hardening is non-negotiable. Safe applications running on an unhardened kernel are a house on sand.",
  "Zero-Trust philosophy: Never trust. Always verify. Log everything.",
  "Efficiency is optimized by eliminating human latency in repetitive workflows and keeping humans at strategic control layers.",
  "Android subsystem isolation (using Shizuku and ADB shell permissions) is key to keeping mobile endpoints secure.",
  "Immutable infrastructure deployment prevents configuration drift and ensures deterministic recovery."
];

const reasoningSteps = [
  "Auditing sandbox boundary containment rules...",
  "Scanning loopback interfaces for anomalous socket binds...",
  "Running LUKS container key validation checks...",
  "Evaluating prompt safety alignments on local network nodes...",
  "Compiling technical sentiment tensors..."
];

async function askAI() {
  const box = document.getElementById('ai-response');
  if (!box) return;
  
  const newThoughtBtn = document.getElementById('new-thought-btn');
  if (newThoughtBtn) newThoughtBtn.disabled = true;

  box.innerText = 'Initializing Agent reasoning...';
  setDot('ai-dot', false);
  
  // Scramble and take 3 steps
  const stepsToRun = [...reasoningSteps].sort(() => 0.5 - Math.random()).slice(0, 3);
  const selectedThought = agentThoughts[Math.floor(Math.random() * agentThoughts.length)];
  
  for (let i = 0; i < stepsToRun.length; i++) {
    logToTerminal(`[AGENT] ${stepsToRun[i]}`);
    box.innerText = `Agent thinking: ${stepsToRun[i]}`;
    await new Promise(resolve => setTimeout(resolve, 800));
  }
  
  logToTerminal('[AGENT] Reasoning synthesis complete.');
  box.innerText = '';
  setDot('ai-dot', true);
  
  let index = 0;
  function typeWriter() {
    if (index < selectedThought.length) {
      box.innerHTML += selectedThought.charAt(index);
      index++;
      setTimeout(typeWriter, 20);
    } else {
      if (newThoughtBtn) newThoughtBtn.disabled = false;
    }
  }
  typeWriter();
}

function renderBlog() {
  const wrap = document.getElementById('blog-posts');
  if (!wrap) return;
  wrap.innerHTML = '';
  myArticles.forEach(a => {
    const el = document.createElement('div');
    el.className = 'blog-post';
    el.innerHTML = `
      <div class="blog-date">${a.date}</div>
      <h4>${a.title}</h4>
      <p>${a.snippet}</p>
      <a href="${a.link}" class="blog-read">Read &rarr;</a>
    `;
    wrap.appendChild(el);
  });
  logToTerminal('Intelligence feed loaded.');
}

// Intersection observer for fade-ins
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });

// Initialize application behaviors
window.addEventListener('DOMContentLoaded', () => {
  logToTerminal('System initialized. Dream-Hoarder online.');
  
  // Register click events dynamically (removing inline HTML onclick behaviors)
  const newThoughtBtn = document.getElementById('new-thought-btn');
  if (newThoughtBtn) {
    newThoughtBtn.addEventListener('click', askAI);
  }

  // Interactive Terminal setup
  const terminal = document.querySelector('.terminal');
  const termInput = document.getElementById('terminal-input');
  if (terminal && termInput) {
    terminal.addEventListener('click', () => termInput.focus());
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = termInput.value;
        handleTerminalCommand(val);
        termInput.value = '';
      }
    });
  }

  // Interactive Cursor Grid Glow
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroSection.style.setProperty('--mx', `${x}px`);
      heroSection.style.setProperty('--my', `${y}px`);
    });
  }
  
  // Set up intersection observers for animation fades
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  
  // Initial runs
  fetchWeather();
  askAI();
  renderBlog();
  
  // Periodic sync checks
  setInterval(fetchWeather, 300000);
});
