// Government Dashboard JavaScript

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    startRealTimeUpdates();
    updateSensorData();
});

// Chart instances
let growthChart, sensorsChart, survivalChart;

// Initialize all charts
function initializeCharts() {
    initializeGrowthChart();
    initializeSensorsChart();
    initializeSurvivalChart();
}

// Growth Chart
function initializeGrowthChart() {
    const ctx = document.getElementById('growthChart').getContext('2d');
    growthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [{
                label: 'Árboles Plantados',
                data: [120, 190, 300, 250, 420, 380, 450, 520, 480, 600, 650, 720],
                borderColor: '#4a8269',
                backgroundColor: 'rgba(74, 130, 105, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }, {
                label: 'Supervivencia (%)',
                data: [85, 87, 89, 86, 88, 90, 89, 87, 88, 89, 87, 88],
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
                        text: 'Supervivencia (%)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                    min: 80,
                    max: 95
                }
            }
        }
    });
}

// Sensors Chart
function initializeSensorsChart() {
    const ctx = document.getElementById('sensorsChart').getContext('2d');
    sensorsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            datasets: [{
                label: 'Humedad (%)',
                data: [65, 68, 70, 72, 69, 67, 68],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                fill: true
            }, {
                label: 'Temperatura (°C)',
                data: [18, 19, 22, 25, 24, 21, 20],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderWidth: 2,
                fill: true
            }, {
                label: 'pH',
                data: [6.5, 6.6, 6.8, 6.9, 6.8, 6.7, 6.8],
                borderColor: '#9b59b6',
                backgroundColor: 'rgba(155, 89, 182, 0.1)',
                borderWidth: 2,
                fill: true
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
                    beginAtZero: false
                }
            }
        }
    });
}

// Survival Chart (Doughnut)
function initializeSurvivalChart() {
    const ctx = document.getElementById('survivalChart').getContext('2d');
    survivalChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Excelente', 'Bueno', 'Regular', 'Crítico'],
            datasets: [{
                data: [65, 25, 8, 2],
                backgroundColor: [
                    '#27ae60',
                    '#3498db',
                    '#f39c12',
                    '#e74c3c'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

// Zone data management
const zoneData = {
    zona1: {
        name: 'Cerro de la Silla',
        trees: 342,
        survival: 89.2,
        area: 12.5
    },
    zona2: {
        name: 'Parque Fundidora',
        trees: 456,
        survival: 92.1,
        area: 18.3
    },
    zona3: {
        name: 'Chipinque',
        trees: 289,
        survival: 85.7,
        area: 15.2
    },
    zona4: {
        name: 'Santa Catarina',
        trees: 378,
        survival: 88.4,
        area: 14.8
    },
    zona5: {
        name: 'San Pedro',
        trees: 523,
        survival: 91.3,
        area: 22.1
    }
};

// Update zone data
function updateZoneData() {
    const selector = document.getElementById('zoneSelector');
    const selectedZone = selector.value;
    const data = zoneData[selectedZone];
    
    if (data) {
        document.getElementById('zoneTrees').textContent = data.trees;
        document.getElementById('zoneSurvival').textContent = data.survival + '%';
        document.getElementById('zoneArea').textContent = data.area;
        
        // Add animation
        animateValue('zoneTrees', 0, data.trees, 1000);
        animateValue('zoneSurvival', 0, data.survival, 1000, '%');
        animateValue('zoneArea', 0, data.area, 1000);
    }
}

// Update timeframe for growth chart
function updateTimeframe(period) {
    // Remove active class from all buttons
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Update chart data based on period
    let newData, newLabels;
    
    switch(period) {
        case 'month':
            newLabels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
            newData = [180, 220, 195, 250];
            break;
        case 'quarter':
            newLabels = ['Ene-Mar', 'Abr-Jun', 'Jul-Sep', 'Oct-Dic'];
            newData = [610, 1050, 1450, 1970];
            break;
        case 'year':
            newLabels = ['2020', '2021', '2022', '2023', '2024'];
            newData = [1200, 2100, 3500, 4800, 6200];
            break;
    }
    
    growthChart.data.labels = newLabels;
    growthChart.data.datasets[0].data = newData;
    growthChart.update();
}

// Real-time sensor data updates
function updateSensorData() {
    // Simulate real sensor data
    const humidity = Math.floor(Math.random() * 20) + 60; // 60-80%
    const temperature = Math.floor(Math.random() * 10) + 18; // 18-28°C
    const ph = (Math.random() * 2 + 6).toFixed(1); // 6.0-8.0
    
    // Update sensor values
    document.getElementById('soilHumidity').textContent = humidity + '%';
    document.getElementById('soilTemperature').textContent = temperature + '°C';
    document.getElementById('soilPH').textContent = ph;
    
    // Update sensor status
    updateSensorStatus('humidity', humidity, 50, 80);
    updateSensorStatus('temperature', temperature, 15, 30);
    updateSensorStatus('ph', parseFloat(ph), 6.0, 7.5);
    
    // Update chart bars
    document.querySelector('.sensor-card:nth-child(1) .chart-bar').style.height = humidity + '%';
    document.querySelector('.sensor-card:nth-child(2) .chart-bar').style.height = ((temperature - 10) * 2.5) + '%';
    document.querySelector('.sensor-card:nth-child(3) .chart-bar').style.height = ((parseFloat(ph) - 5) * 25) + '%';
}

// Update sensor status based on values
function updateSensorStatus(sensor, value, min, max) {
    let status, className;
    
    if (value >= min && value <= max) {
        status = sensor === 'ph' ? 'Fértil' : 'Óptimo';
        className = 'optimal';
    } else if (value < min) {
        status = 'Bajo';
        className = 'warning';
    } else {
        status = 'Alto';
        className = 'warning';
    }
    
    const sensorCards = document.querySelectorAll('.sensor-card');
    const sensorIndex = sensor === 'humidity' ? 0 : sensor === 'temperature' ? 1 : 2;
    const statusElement = sensorCards[sensorIndex].querySelector('.sensor-status');
    
    statusElement.textContent = status;
    statusElement.className = `sensor-status ${className}`;
}

// Start real-time updates
function startRealTimeUpdates() {
    // Update sensor data every 30 seconds
    setInterval(updateSensorData, 30000);
    
    // Update overview cards every minute
    setInterval(updateOverviewCards, 60000);
}

// Update overview cards with new data
function updateOverviewCards() {
    const totalTrees = Math.floor(Math.random() * 100) + 2800;
    const survivalRate = (Math.random() * 5 + 85).toFixed(1);
    const activeSensors = Math.floor(Math.random() * 3) + 40;
    
    animateValue('totalTrees', parseInt(document.getElementById('totalTrees').textContent.replace(',', '')), totalTrees, 2000);
    animateValue('survivalRate', parseFloat(document.getElementById('survivalRate').textContent), survivalRate, 2000, '%');
    animateValue('activeSensors', parseInt(document.getElementById('activeSensors').textContent), activeSensors, 2000);
}

// Animate number values
function animateValue(elementId, start, end, duration, suffix = '') {
    const element = document.getElementById(elementId);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        if (suffix === '%') {
            element.textContent = current.toFixed(1) + suffix;
        } else if (elementId === 'totalTrees') {
            element.textContent = Math.floor(current).toLocaleString();
        } else {
            element.textContent = current.toFixed(1) + suffix;
        }
    }, 16);
}

// Export report functionality
function exportReport() {
    showNotification('Generando reporte completo...', 'info');
    
    // Simulate report generation
    setTimeout(() => {
        const reportData = {
            fecha: new Date().toLocaleDateString('es-ES'),
            totalArboles: document.getElementById('totalTrees').textContent,
            supervivencia: document.getElementById('survivalRate').textContent,
            zonasMonitoreadas: document.getElementById('monitoredZones').textContent,
            sensoresActivos: document.getElementById('activeSensors').textContent,
            sensores: {
                humedad: document.getElementById('soilHumidity').textContent,
                temperatura: document.getElementById('soilTemperature').textContent,
                ph: document.getElementById('soilPH').textContent
            }
        };
        
        // Create and download report
        const reportContent = generateReportContent(reportData);
        downloadReport(reportContent, `reporte-ambiental-${new Date().toISOString().split('T')[0]}.txt`);
        
        showNotification('Reporte exportado exitosamente', 'success');
    }, 2000);
}

// Generate report content
function generateReportContent(data) {
    return `
REPORTE AMBIENTAL - GREEN ROOTS
===============================

Fecha de generación: ${data.fecha}

RESUMEN EJECUTIVO
-----------------
Total de árboles plantados: ${data.totalArboles}
Tasa de supervivencia: ${data.supervivencia}
Zonas monitoreadas: ${data.zonasMonitoreadas}
Sensores IoT activos: ${data.sensoresActivos}

CONDICIONES DEL TERRENO
-----------------------
Humedad del suelo: ${data.sensores.humedad}
Temperatura del suelo: ${data.sensores.temperatura}
pH del suelo: ${data.sensores.ph}

ANÁLISIS Y RECOMENDACIONES
--------------------------
- Las condiciones actuales del terreno son favorables para el crecimiento
- Se recomienda mantener el monitoreo continuo de los sensores IoT
- La tasa de supervivencia está dentro de los parámetros óptimos

CERTIFICACIÓN
-------------
Este reporte ha sido generado automáticamente por el sistema de monitoreo
ambiental de Green Roots y cumple con los estándares gubernamentales
para proyectos de reforestación.

---
Green Roots - Construyendo un futuro verde
    `;
}

// Download report file
function downloadReport(content, filename) {
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

// Refresh data functionality
function refreshData() {
    const refreshBtn = document.querySelector('.refresh-btn');
    const icon = refreshBtn.querySelector('i');
    
    // Add spinning animation
    icon.style.animation = 'spin 1s linear infinite';
    refreshBtn.disabled = true;
    
    showNotification('Actualizando datos...', 'info');
    
    // Simulate data refresh
    setTimeout(() => {
        updateSensorData();
        updateOverviewCards();
        
        // Update charts with new data
        growthChart.update();
        sensorsChart.update();
        survivalChart.update();
        
        // Remove spinning animation
        icon.style.animation = '';
        refreshBtn.disabled = false;
        
        showNotification('Datos actualizados correctamente', 'success');
    }, 2000);
}

// Generate specific report types
function generateReport(type) {
    let reportName, reportContent;
    
    switch(type) {
        case 'environmental':
            reportName = 'Reporte Ambiental';
            reportContent = 'Generando reporte de impacto ambiental...';
            break;
        case 'compliance':
            reportName = 'Certificación de Cumplimiento';
            reportContent = 'Generando certificación gubernamental...';
            break;
        case 'technical':
            reportName = 'Reporte Técnico';
            reportContent = 'Generando análisis técnico detallado...';
            break;
        case 'financial':
            reportName = 'Reporte Financiero';
            reportContent = 'Generando análisis de costos e inversión...';
            break;
    }
    
    showNotification(`Generando ${reportName}...`, 'info');
    
    setTimeout(() => {
        showNotification(`${reportName} generado exitosamente`, 'success');
    }, 1500);
}

// Notification system (reusing from main site)
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

// Add CSS for spin animation
const spinStyles = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = spinStyles;
document.head.appendChild(styleSheet);

// Console welcome message
console.log(`
🏛️ Government Dashboard - Green Roots
=====================================
Panel de monitoreo ambiental para entidades gubernamentales.

Features:
- Monitoreo en tiempo real por zonas
- Estadísticas de crecimiento y supervivencia
- Integración de sensores IoT simulados
- Exportación de reportes y certificaciones
- Dashboards interactivos con Chart.js

¡Sistema de gestión ambiental activo! 🌍
`);