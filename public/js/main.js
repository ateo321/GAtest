// Main JavaScript for GitHub Actions Demo

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const apiResult = document.getElementById('api-result');
const serverStatus = document.getElementById('server-status');
const dockerStatus = document.getElementById('docker-status');
const gitStatus = document.getElementById('git-status');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application
function initializeApp() {
    setupNavigation();
    setupSmoothScrolling();
    checkSystemStatus();
    setupAPIButtons();
    
    // Check status every 30 seconds
    setInterval(checkSystemStatus, 30000);
}

// Navigation setup
function setupNavigation() {
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Open GitHub repository
function openGitHub() {
    window.open('https://github.com/ateo321/GAtest', '_blank');
}

// Setup API test buttons
function setupAPIButtons() {
    const apiButtons = document.querySelectorAll('.api-card .btn');
    apiButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const apiPath = this.getAttribute('onclick').match(/testAPI\('([^']+)'\)/)[1];
            testAPI(apiPath);
        });
    });
}

// Test API endpoint
async function testAPI(endpoint) {
    try {
        showLoading(apiResult);
        
        const response = await fetch(endpoint);
        const data = await response.json();
        
        const result = {
            endpoint: endpoint,
            status: response.status,
            statusText: response.statusText,
            data: data,
            timestamp: new Date().toISOString()
        };
        
        displayAPIResult(result);
        
    } catch (error) {
        const errorResult = {
            endpoint: endpoint,
            error: error.message,
            timestamp: new Date().toISOString()
        };
        
        displayAPIResult(errorResult, true);
    }
}

// Show loading state
function showLoading(element) {
    element.innerHTML = '🔄 Testing API...';
    element.classList.add('show');
}

// Display API result
function displayAPIResult(result, isError = false) {
    const timestamp = new Date(result.timestamp).toLocaleString('vi-VN');
    
    let resultText = `📡 API Test Result
⏰ Time: ${timestamp}
🔗 Endpoint: ${result.endpoint}
`;

    if (isError) {
        resultText += `❌ Error: ${result.error}`;
    } else {
        resultText += `✅ Status: ${result.status} ${result.statusText}
📄 Response:
${JSON.stringify(result.data, null, 2)}`;
    }
    
    apiResult.textContent = resultText;
    apiResult.classList.add('show');
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        apiResult.classList.remove('show');
    }, 10000);
}

// Check system status
async function checkSystemStatus() {
    await checkServerStatus();
    await checkDockerStatus();
    await checkGitStatus();
}

// Check server status
async function checkServerStatus() {
    try {
        const response = await fetch('/health');
        const data = await response.json();
        
        if (response.ok && data.status === 'OK') {
            updateStatus(serverStatus, 'online', 'Online');
        } else {
            updateStatus(serverStatus, 'offline', 'Offline');
        }
    } catch (error) {
        updateStatus(serverStatus, 'offline', 'Offline');
    }
}

// Check Docker status (simulated)
async function checkDockerStatus() {
    try {
        // Simulate Docker check by testing if the app responds
        const response = await fetch('/');
        if (response.ok) {
            updateStatus(dockerStatus, 'online', 'Running');
        } else {
            updateStatus(dockerStatus, 'offline', 'Stopped');
        }
    } catch (error) {
        updateStatus(dockerStatus, 'offline', 'Stopped');
    }
}

// Check Git status (simulated)
async function checkGitStatus() {
    try {
        // Simulate Git status check
        const response = await fetch('/api/git-status');
        if (response.ok) {
            const data = await response.json();
            updateStatus(gitStatus, 'online', data.branch || 'main');
        } else {
            updateStatus(gitStatus, 'online', 'main');
        }
    } catch (error) {
        updateStatus(gitStatus, 'online', 'main');
    }
}

// Update status indicator
function updateStatus(element, status, text) {
    const dot = element.querySelector('.status-dot');
    const textElement = element.querySelector('.status-text');
    
    dot.className = `status-dot ${status}`;
    textElement.textContent = text;
}

// Utility functions
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (days > 0) {
        return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

// Add some interactive animations
function addInteractiveEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .api-card, .deployment-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Initialize interactive effects
addInteractiveEffects();

// Add scroll-based animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const animatedElements = document.querySelectorAll('.feature-card, .api-card, .deployment-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations
setupScrollAnimations();

// Console welcome message
console.log(`
🚀 GitHub Actions Demo
📦 Version: 1.0.0
🔗 Repository: https://github.com/ateo321/GAtest
⚡ Built with GitHub Actions CI/CD Pipeline
`);
