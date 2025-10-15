// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check session on page load
    checkSession();
    
    // Initialize dashboard
    initializeDashboard();
    
    // Initialize charts
    initializeImpactChart();
    
    // Load user data
    loadUserData();
});

// Session management
async function checkSession() {
    if (!('serviceWorker' in navigator)) {
        redirectToLogin();
        return;
    }

    try {
        const registration = await navigator.serviceWorker.ready;
        const messageChannel = new MessageChannel();
        
        messageChannel.port1.onmessage = function(event) {
            if (!event.data.isValid) {
                redirectToLogin();
            }
        };
        
        registration.active.postMessage({
            type: 'CHECK_SESSION'
        }, [messageChannel.port2]);
    } catch (error) {
        console.error('Error checking session:', error);
        redirectToLogin();
    }
}

function redirectToLogin() {
    window.location.href = '/login.html';
}

// Logout function
async function logout() {
    try {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            const messageChannel = new MessageChannel();
            
            messageChannel.port1.onmessage = function(event) {
                if (event.data.success) {
                    showNotification('Sesión cerrada correctamente', 'success');
                    setTimeout(() => {
                        window.location.href = '/login.html';
                    }, 1000);
                }
            };
            
            registration.active.postMessage({
                type: 'LOGOUT'
            }, [messageChannel.port2]);
        } else {
            window.location.href = '/login.html';
        }
    } catch (error) {
        console.error('Error during logout:', error);
        window.location.href = '/login.html';
    }
}

// Load user data from session
async function loadUserData() {
    try {
        if ('serviceWorker' in navigator) {
            const cache = await caches.open('green-roots-v1.0.0');
            const sessionResponse = await cache.match('/api/session');
            
            if (sessionResponse) {
                const userData = await sessionResponse.json();
                document.getElementById('userName').textContent = userData.name || 'Usuario';
            }
        }
    } catch (error) {
        console.error('Error loading user data:', error);
    }
}

// Initialize dashboard
function initializeDashboard() {
    // Add event listeners for interactive elements
    addEventListeners();
    
    // Start periodic updates
    startPeriodicUpdates();
    
    // Initialize mobile menu
    initializeMobileMenu();
}

function addEventListeners() {
    // Chart controls
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateImpactChart(this.textContent.toLowerCase());
        });
    });
    
    // Action buttons
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            handleQuickAction(action);
        });
    });
    
    // Tree actions
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i').classList;
            if (icon.contains('fa-tint')) {
                showNotification('Recordatorio de riego programado', 'success');
            } else if (icon.contains('fa-chart-line')) {
                showNotification('Abriendo estadísticas del árbol...', 'info');
            }
        });
    });
    
    // Join activity buttons
    document.querySelectorAll('.join-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const activityName = this.closest('.activity-item').querySelector('h4').textContent;
            showNotification(`Te has unido a: ${activityName}`, 'success');
            this.textContent = 'Unido';
            this.style.background = '#27ae60';
            this.disabled = true;
        });
    });
}

// Initialize mobile menu
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Handle quick actions
function handleQuickAction(action) {
    switch(action) {
        case 'Plantar Árbol':
            showNotification('Redirigiendo al mapa de plantación...', 'info');
            setTimeout(() => {
                window.location.href = '/index.html#actividades';
            }, 1500);
            break;
        case 'Agendar Actividad':
            showNotification('Abriendo calendario de actividades...', 'info');
            break;
        case 'Compartir Progreso':
            if (navigator.share) {
                navigator.share({
                    title: 'Mi progreso en Green Roots',
                    text: 'He plantado 12 árboles y absorbido 284kg de CO2. ¡Únete a la reforestación!',
                    url: window.location.origin
                });
            } else {
                showNotification('Enlace copiado al portapapeles', 'success');
            }
            break;
        case 'Descargar Certificado':
            downloadCertificate();
            break;
    }
}

// Download certificate
function downloadCertificate() {
    showNotification('Generando certificado...', 'info');
    
    setTimeout(() => {
        const certificateContent = generateCertificate();
        downloadFile(certificateContent, 'certificado-green-roots.txt');
        showNotification('Certificado descargado exitosamente', 'success');
    }, 2000);
}

function generateCertificate() {
    const date = new Date().toLocaleDateString('es-ES');
    return `
CERTIFICADO DE PARTICIPACIÓN
============================

Green Roots - Plataforma de Reforestación

Por medio del presente certificado se hace constar que:

USUARIO: ${document.getElementById('userName').textContent}
FECHA: ${date}

Ha participado activamente en las actividades de reforestación
organizadas por Green Roots, contribuyendo significativamente
a la conservación del medio ambiente.

LOGROS DESTACADOS:
- Árboles plantados: 12
- CO2 absorbido: 284 kg
- Actividades completadas: 8
- Ranking actual: #47

Este certificado es válido como comprobante de participación
en actividades de responsabilidad social y ambiental.

---
Green Roots - Construyendo un futuro verde
Certificado generado automáticamente el ${date}
    `;
}

function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Initialize impact chart
let impactChart;

function initializeImpactChart() {
    const ctx = document.getElementById('impactChart').getContext('2d');
    impactChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Árboles Plantados',
                data: [2, 4, 7, 9, 11, 12],
                borderColor: '#4a8269',
                backgroundColor: 'rgba(74, 130, 105, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }, {
                label: 'CO2 Absorbido (kg)',
                data: [48, 96, 168, 216, 264, 284],
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Árboles'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'CO2 (kg)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    }
                }
            }
        }
    });
}

function updateImpactChart(period) {
    let newData, newLabels;
    
    if (period === 'año') {
        newLabels = ['2022', '2023', '2024'];
        newData = [
            [0, 5, 12],
            [0, 120, 284]
        ];
    } else {
        newLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
        newData = [
            [2, 4, 7, 9, 11, 12],
            [48, 96, 168, 216, 264, 284]
        ];
    }
    
    impactChart.data.labels = newLabels;
    impactChart.data.datasets[0].data = newData[0];
    impactChart.data.datasets[1].data = newData[1];
    impactChart.update();
}

// Periodic updates
function startPeriodicUpdates() {
    // Update stats every 5 minutes
    setInterval(updateStats, 300000);
    
    // Check session every 10 minutes
    setInterval(checkSession, 600000);
}

function updateStats() {
    // Simulate small incremental updates
    const elements = [
        { id: 'totalTrees', increment: Math.random() > 0.7 ? 1 : 0 },
        { id: 'co2Absorbed', increment: Math.random() > 0.5 ? Math.floor(Math.random() * 10) : 0 }
    ];
    
    elements.forEach(element => {
        const el = document.querySelector(`[data-stat="${element.id}"]`);
        if (el && element.increment > 0) {
            const current = parseInt(el.textContent);
            el.textContent = current + element.increment;
            
            // Add animation
            el.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                el.style.animation = '';
            }, 500);
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 
                 'fa-info-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="closeNotification(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles if not already added
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                max-width: 400px;
                padding: 1rem;
                border-radius: 10px;
                color: white;
                z-index: 10000;
                animation: slideInRight 0.5s ease;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            .notification.success {
                background: linear-gradient(135deg, #27ae60, #2ecc71);
            }
            .notification.error {
                background: linear-gradient(135deg, #e74c3c, #c0392b);
            }
            .notification.info {
                background: linear-gradient(135deg, #3498db, #2980b9);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                flex: 1;
            }
            .notification-content i {
                font-size: 1.2rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 50%;
                transition: background-color 0.3s ease;
            }
            .notification-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        closeNotification(notification.querySelector('.notification-close'));
    }, 5000);
}

function closeNotification(button) {
    const notification = button.closest('.notification');
    notification.style.animation = 'slideOutRight 0.5s ease forwards';
    setTimeout(() => {
        notification.remove();
    }, 500);
}

// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            console.log('SW registered successfully');
        })
        .catch((error) => {
            console.log('SW registration failed');
        });
}

// Console welcome message
console.log(`
🌱 Green Roots Dashboard
========================
Panel de control personal para voluntarios.

Features:
- Gestión de árboles plantados
- Seguimiento de impacto ambiental
- Actividades y eventos
- Sistema de logros y ranking
- Acciones rápidas

¡Bienvenido a tu espacio verde! 🌍
`);