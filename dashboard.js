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
    // Load activities created by government
    const governmentActivities = JSON.parse(localStorage.getItem('governmentActivities') || '[]');
    const activitiesContainer = document.getElementById('governmentActivities');
    
    if (governmentActivities.length === 0) {
        activitiesContainer.innerHTML = `
            <div class="no-activities">
                <p>No hay actividades programadas por el gobierno.</p>
                <small>Las actividades aparecerán aquí cuando sean creadas desde el panel gubernamental.</small>
            </div>
        `;
        return;
    }
    
    activitiesContainer.innerHTML = '';
    
    governmentActivities.forEach((activity, index) => {
        const activityDate = new Date(activity.datetime);
        const day = activityDate.getDate();
        const month = activityDate.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase();
        const time = activityDate.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-date">
                <span class="day">${day}</span>
                <span class="month">${month}</span>
            </div>
            <div class="activity-info">
                <h4>${activity.name}</h4>
                <p><i class="fas fa-map-marker-alt"></i> ${activity.location}</p>
                <p><i class="fas fa-clock"></i> ${time}</p>
                <p><i class="fas fa-info-circle"></i> ${activity.description.substring(0, 50)}...</p>
            </div>
            <button class="join-btn" onclick="confirmAttendance('${activity.id}')">Confirmar Asistencia</button>
        `;
        
        activitiesContainer.appendChild(activityItem);
    });
    
    console.log('Government activities loaded:', governmentActivities);
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
            openPlantTreeModal();
            break;
        case 'schedule':
            openScheduleActivityModal();
            break;
        case 'share':
            showNotification('Compartiendo logro en redes sociales...', 'info');
            break;
        case 'download':
            showNotification('Descargando certificado...', 'info');
            break;
    }
}

// Open plant tree modal
function openPlantTreeModal() {
    const modal = document.createElement('div');
    modal.className = 'plant-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-seedling"></i> Plantar Nuevo Árbol</h3>
                <button onclick="closePlantModal()" class="close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="plantTreeForm">
                    <div class="form-group">
                        <label><i class="fas fa-tree"></i> Tipo de Árbol</label>
                        <select required>
                            <option value="">Seleccionar tipo</option>
                            <option value="roble">Roble</option>
                            <option value="pino">Pino</option>
                            <option value="encino">Encino</option>
                            <option value="cedro">Cedro</option>
                            <option value="ahuehuete">Ahuehuete</option>
                            <option value="mezquite">Mezquite</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-tag"></i> Nombre del Árbol</label>
                        <input type="text" required placeholder="Ej: Mi primer roble">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-map-marker-alt"></i> Lugar de Plantación</label>
                        <select required>
                            <option value="">Seleccionar ubicación</option>
                            <option value="cerro-silla">Cerro de la Silla</option>
                            <option value="fundidora">Parque Fundidora</option>
                            <option value="chipinque">Chipinque</option>
                            <option value="santa-catarina">Santa Catarina</option>
                            <option value="san-pedro">San Pedro Garza García</option>
                            <option value="guadalupe">Guadalupe</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-clock"></i> Hora de Plantación</label>
                        <input type="datetime-local" required>
                    </div>
                    <div class="form-actions">
                        <button type="button" onclick="closePlantModal()" class="cancel-btn">Cancelar</button>
                        <button type="submit" class="submit-btn">Registrar Plantación</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    document.getElementById('plantTreeForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('¡Árbol registrado exitosamente! Te notificaremos cuando sea el momento de plantar.', 'success');
        closePlantModal();
    });
    
    // Close modal on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePlantModal();
        }
    });
}

// Open schedule activity modal
function openScheduleActivityModal() {
    const modal = document.createElement('div');
    modal.className = 'schedule-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-calendar-check"></i> Confirmar Asistencia a Actividades</h3>
                <button onclick="closeScheduleModal()" class="close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="activities-list">
                    <div class="activity-card">
                        <div class="activity-info">
                            <h4>Jornada de Plantación</h4>
                            <p><i class="fas fa-calendar-alt"></i> 15 Abril 2024 - 8:00 AM</p>
                            <p><i class="fas fa-map-marker-alt"></i> Cerro de la Silla</p>
                            <p><i class="fas fa-users"></i> 25 voluntarios confirmados</p>
                        </div>
                        <button class="confirm-btn" onclick="confirmAttendance('activity1')">
                            <i class="fas fa-check"></i> Confirmar Asistencia
                        </button>
                    </div>
                    <div class="activity-card">
                        <div class="activity-info">
                            <h4>Mantenimiento de Árboles</h4>
                            <p><i class="fas fa-calendar-alt"></i> 22 Abril 2024 - 9:00 AM</p>
                            <p><i class="fas fa-map-marker-alt"></i> Parque Fundidora</p>
                            <p><i class="fas fa-users"></i> 18 voluntarios confirmados</p>
                        </div>
                        <button class="confirm-btn" onclick="confirmAttendance('activity2')">
                            <i class="fas fa-check"></i> Confirmar Asistencia
                        </button>
                    </div>
                    <div class="activity-card">
                        <div class="activity-info">
                            <h4>Taller de Educación Ambiental</h4>
                            <p><i class="fas fa-calendar-alt"></i> 29 Abril 2024 - 10:00 AM</p>
                            <p><i class="fas fa-map-marker-alt"></i> Centro Comunitario</p>
                            <p><i class="fas fa-users"></i> 12 voluntarios confirmados</p>
                        </div>
                        <button class="confirm-btn" onclick="confirmAttendance('activity3')">
                            <i class="fas fa-check"></i> Confirmar Asistencia
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeScheduleModal();
        }
    });
}

// Confirm attendance function
function confirmAttendance(activityId) {
    showNotification('¡Asistencia confirmada! Te enviaremos recordatorios.', 'success');
    closeScheduleModal();
}

// Close modals
function closePlantModal() {
    const modal = document.querySelector('.plant-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function closeScheduleModal() {
    const modal = document.querySelector('.schedule-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Add modal styles
const modalStyles = `
    .plant-modal, .schedule-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    }
    .plant-modal .modal-content, .schedule-modal .modal-content {
        background: white;
        border-radius: 15px;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        animation: slideUp 0.3s ease;
    }
    .plant-modal .modal-header, .schedule-modal .modal-header {
        background: linear-gradient(135deg, var(--primary-green), var(--accent-green));
        color: white;
        padding: 1.5rem;
        border-radius: 15px 15px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .plant-modal .close-btn, .schedule-modal .close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }
    .plant-modal .close-btn:hover, .schedule-modal .close-btn:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    .plant-modal .modal-body, .schedule-modal .modal-body {
        padding: 2rem;
    }
    .plant-modal .form-group {
        margin-bottom: 1.5rem;
    }
    .plant-modal label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--text-dark);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .plant-modal input, .plant-modal select {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }
    .plant-modal input:focus, .plant-modal select:focus {
        outline: none;
        border-color: var(--accent-green);
    }
    .plant-modal .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 2rem;
    }
    .plant-modal .cancel-btn, .plant-modal .submit-btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    .plant-modal .cancel-btn {
        background: #f8f9fa;
        color: #6c757d;
    }
    .plant-modal .submit-btn {
        background: linear-gradient(45deg, var(--primary-green), var(--accent-green));
        color: white;
    }
    .plant-modal .cancel-btn:hover, .plant-modal .submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    .schedule-modal .activities-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .schedule-modal .activity-card {
        background: var(--light-bg);
        padding: 1.5rem;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: var(--transition);
    }
    .schedule-modal .activity-card:hover {
        background: #e8f5f3;
    }
    .schedule-modal .activity-info h4 {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 0.5rem;
    }
    .schedule-modal .activity-info p {
        font-size: 0.9rem;
        color: var(--text-light);
        margin-bottom: 0.25rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .schedule-modal .confirm-btn {
        background: var(--accent-green);
        color: white;
        border: none;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: var(--transition);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
    }
    .schedule-modal .confirm-btn:hover {
        background: var(--primary-green);
        transform: translateY(-2px);
    }
`;

// Add styles to head
if (!document.getElementById('modal-styles')) {
    const style = document.createElement('style');
    style.id = 'modal-styles';
    style.textContent = modalStyles;
    document.head.appendChild(style);
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