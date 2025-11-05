// Dashboard JavaScript

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

// Initialize dashboard components
function initializeDashboard() {
    initializeImpactChart();
    updateDashboardStats();
    loadUserTrees();
    loadUpcomingActivities();
    loadAchievements();
    loadLeaderboard();
}

// Impact Chart
let impactChart;

function initializeImpactChart() {
    const ctx = document.getElementById('impactChart');
    if (!ctx) return;
    
    impactChart = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Árboles Plantados',
                data: [2, 4, 3, 5, 7, 12],
                borderColor: '#4a8269',
                backgroundColor: 'rgba(74, 130, 105, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }, {
                label: 'CO2 Absorbido (kg)',
                data: [48, 96, 72, 120, 168, 284],
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

// Update dashboard statistics
function updateDashboardStats() {
    // Simulate real-time updates
    const stats = {
        trees: Math.floor(Math.random() * 5) + 10,
        co2: Math.floor(Math.random() * 50) + 250,
        activities: Math.floor(Math.random() * 3) + 6,
        rank: Math.floor(Math.random() * 10) + 40
    };
    
    // Update with animation
    animateValue('trees', stats.trees);
    animateValue('co2', stats.co2);
    animateValue('activities', stats.activities);
    animateValue('rank', stats.rank);
}

// Animate number values
function animateValue(type, endValue) {
    const elements = document.querySelectorAll('.stat-number');
    let targetElement;
    
    elements.forEach(el => {
        const parent = el.closest('.stat-card');
        if (parent.querySelector('.fa-tree') && type === 'trees') targetElement = el;
        if (parent.querySelector('.fa-leaf') && type === 'co2') targetElement = el;
        if (parent.querySelector('.fa-calendar-check') && type === 'activities') targetElement = el;
        if (parent.querySelector('.fa-trophy') && type === 'rank') targetElement = el;
    });
    
    if (!targetElement) return;
    
    const startValue = parseInt(targetElement.textContent) || 0;
    const duration = 2000;
    const increment = (endValue - startValue) / (duration / 16);
    let current = startValue;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= endValue) || (increment < 0 && current <= endValue)) {
            current = endValue;
            clearInterval(timer);
        }
        
        if (type === 'co2') {
            targetElement.textContent = Math.floor(current) + 'kg';
        } else if (type === 'rank') {
            targetElement.textContent = '#' + Math.floor(current);
        } else {
            targetElement.textContent = Math.floor(current);
        }
    }, 16);
}

// Load user trees data
function loadUserTrees() {
    // This would typically come from an API
    const trees = [
        {
            id: 1,
            name: 'Roble #001',
            planted: '15 Mar 2024',
            health: 'excellent',
            healthText: 'Excelente salud'
        },
        {
            id: 2,
            name: 'Pino #002',
            planted: '22 Feb 2024',
            health: 'good',
            healthText: 'Buena salud'
        },
        {
            id: 3,
            name: 'Encino #003',
            planted: '8 Ene 2024',
            health: 'warning',
            healthText: 'Necesita cuidado'
        }
    ];
    
    // Trees are already in HTML, could be dynamically generated here
    console.log('Trees loaded:', trees);
}

// Load upcoming activities
function loadUpcomingActivities() {
    const activities = [
        {
            day: 15,
            month: 'ABR',
            title: 'Jornada de Plantación',
            location: 'Cerro de la Silla',
            time: '8:00 AM - 12:00 PM'
        },
        {
            day: 22,
            month: 'ABR',
            title: 'Mantenimiento de Árboles',
            location: 'Parque Fundidora',
            time: '9:00 AM - 1:00 PM'
        },
        {
            day: 29,
            month: 'ABR',
            title: 'Taller de Educación Ambiental',
            location: 'Centro Comunitario',
            time: '10:00 AM - 2:00 PM'
        }
    ];
    
    console.log('Activities loaded:', activities);
}

// Load achievements
function loadAchievements() {
    const achievements = [
        {
            icon: 'fa-seedling',
            title: 'Primer Árbol',
            description: 'Plantaste tu primer árbol',
            date: '15 Mar 2024'
        },
        {
            icon: 'fa-users',
            title: 'Voluntario Activo',
            description: 'Participaste en 5 actividades',
            date: '28 Mar 2024'
        },
        {
            icon: 'fa-leaf',
            title: 'Eco Warrior',
            description: 'Absorbiste 250kg de CO2',
            date: '5 Abr 2024'
        }
    ];
    
    console.log('Achievements loaded:', achievements);
}

// Load leaderboard
function loadLeaderboard() {
    const leaderboard = [
        {
            rank: 1,
            name: 'María González',
            trees: 45,
            points: 1250,
            avatar: 'M'
        },
        {
            rank: 2,
            name: 'Juan Pérez',
            trees: 38,
            points: 980,
            avatar: 'J'
        },
        {
            rank: 3,
            name: 'Ana López',
            trees: 32,
            points: 850,
            avatar: 'A'
        }
    ];
    
    console.log('Leaderboard loaded:', leaderboard);
}

// Handle tree actions
function handleTreeAction(treeId, action) {
    if (action === 'water') {
        showNotification('¡Árbol regado exitosamente!', 'success');
    } else if (action === 'stats') {
        showNotification('Mostrando estadísticas del árbol...', 'info');
    }
}

// Handle activity join
function joinActivity(activityId) {
    showNotification('¡Te has unido a la actividad!', 'success');
}

// Handle quick actions
function handleQuickAction(action) {
    switch(action) {
        case 'plant':
            showNotification('Redirigiendo a plantar árbol...', 'info');
            break;
        case 'schedule':
            showNotification('Abriendo calendario de actividades...', 'info');
            break;
        case 'share':
            showNotification('Compartiendo logro en redes sociales...', 'info');
            break;
        case 'download':
            showNotification('Descargando certificado...', 'info');
            break;
    }
}

// Add event listeners for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Tree action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const treeItem = this.closest('.tree-item');
            const treeId = treeItem.dataset.treeId || 1;
            const action = this.querySelector('i').classList.contains('fa-tint') ? 'water' : 'stats';
            handleTreeAction(treeId, action);
        });
    });
    
    // Join activity buttons
    document.querySelectorAll('.join-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const activityItem = this.closest('.activity-item');
            const activityId = activityItem.dataset.activityId || 1;
            joinActivity(activityId);
        });
    });
    
    // Quick action buttons
    document.querySelectorAll('.action-card').forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            let action = 'info';
            
            if (icon.classList.contains('fa-seedling')) action = 'plant';
            else if (icon.classList.contains('fa-calendar-plus')) action = 'schedule';
            else if (icon.classList.contains('fa-share-alt')) action = 'share';
            else if (icon.classList.contains('fa-download')) action = 'download';
            
            handleQuickAction(action);
        });
    });
    
    // Chart time period buttons
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart data based on selected period
            updateChartPeriod(this.textContent.toLowerCase());
        });
    });
});

// Update chart based on time period
function updateChartPeriod(period) {
    if (!impactChart) return;
    
    let newLabels, newTreeData, newCO2Data;
    
    switch(period) {
        case 'mes':
            newLabels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
            newTreeData = [3, 2, 4, 3];
            newCO2Data = [72, 48, 96, 72];
            break;
        case 'trimestre':
            newLabels = ['Ene-Mar', 'Abr-Jun', 'Jul-Sep'];
            newTreeData = [9, 15, 8];
            newCO2Data = [216, 360, 192];
            break;
        case 'año':
            newLabels = ['2022', '2023', '2024'];
            newTreeData = [15, 28, 12];
            newCO2Data = [360, 672, 284];
            break;
        default:
            return;
    }
    
    impactChart.data.labels = newLabels;
    impactChart.data.datasets[0].data = newTreeData;
    impactChart.data.datasets[1].data = newCO2Data;
    impactChart.update();
}

// Notification system (reused from main script)
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

// Console welcome message
console.log(`
📊 Dashboard Green Roots
========================
Panel de control personal para voluntarios.

Features:
- Seguimiento de árboles plantados
- Estadísticas de impacto ambiental
- Gestión de actividades y eventos
- Sistema de logros y ranking
- Gráficos interactivos

¡Bienvenido a tu dashboard personal! 🌱
`);