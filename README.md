# Green Roots - Plataforma de Reforestación

Una plataforma social para generar consciencia sobre reforestación y conectar voluntarios con actividades ambientales.

## 🌱 Características

- **Sistema de Registro y Login**: Autenticación completa de usuarios
- **Dashboard de Voluntarios**: Panel personal con estadísticas y actividades
- **Panel de Gobierno**: Herramientas administrativas para gestión ambiental
- **Creación de Eventos**: Sistema completo para programar actividades de reforestación
- **Carga de Archivos**: Soporte para imágenes y documentos PDF
- **Responsive Design**: Optimizado para dispositivos móviles y desktop

## 🚀 Instalación

### Opción 1: Desarrollo Local

```bash
# Clonar el repositorio
git clone <repository-url>
cd green-roots

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### Opción 2: Docker

```bash
# Construir y ejecutar con Docker Compose
docker-compose up --build

# O ejecutar solo el contenedor
docker build -t green-roots .
docker run -p 3000:3000 green-roots
```

### Opción 3: Docker con Python (Completo)

```bash
# Ejecutar con servicios de Python para procesamiento de datos
docker-compose --profile python up --build

# Solo el servicio web
docker-compose up green-roots
```
## 📱 Uso

1. **Registro**: Crear cuenta en `/register.html`
2. **Login**: Iniciar sesión en `/login.html`
3. **Dashboard**: Acceder al panel personal en `/dashboard.html`
4. **Gobierno**: Panel administrativo en `/gobierno.html`
## 🔐 Credenciales de Acceso

### Usuarios Regulares
- Registro libre en `/register.html`
- Login con credenciales registradas
- Acceso al dashboard personal

### Acceso Gubernamental
- **Email**: `crisgob@hotmail.com`
- **Contraseña**: Cualquier contraseña (demo)
- **Acceso**: Panel de gobierno completo


## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Estilos**: CSS Grid, Flexbox, Animaciones CSS
- **Gráficos**: Chart.js
- **Almacenamiento**: LocalStorage
- **Backend**: Node.js v18
- **Python**: v3.11 (procesamiento de datos)
- **Contenedores**: Docker & Docker Compose

## 📁 Estructura del Proyecto

```
green-roots/
├── index.html              # Página principal
├── login.html              # Página de login
├── register.html           # Página de registro
├── dashboard.html          # Dashboard de voluntarios
├── gobierno.html           # Panel de gobierno
├── styles.css              # Estilos principales
├── dashboard.css           # Estilos del dashboard
├── gobierno.css            # Estilos del panel de gobierno
├── script.js               # JavaScript principal
├── dashboard.js            # JavaScript del dashboard
├── gobierno.js             # JavaScript del panel de gobierno
├── sw.js                   # Service Worker
├── manifest.json           # Web App Manifest
├── Dockerfile              # Configuración Docker
├── docker-compose.yml      # Docker Compose
└── package.json            # Dependencias npm
```

## 🌍 Funcionalidades

### Para Voluntarios
- Registro y autenticación
- Dashboard personal con estadísticas
- **Plantar Árbol**: Mini encuesta con tipo, nombre, lugar y hora
- **Agendar Actividad**: Confirmar asistencia a eventos gubernamentales
- Seguimiento de árboles plantados
- Calendario de actividades
- Sistema de logros y ranking

### Para Administradores
- Panel de monitoreo ambiental
- Carga de archivos multimedia
- Reportes y estadísticas
- Gestión de zonas de reforestación
- Procesamiento de datos con Python

## 🐍 Servicios Python

El proyecto incluye servicios Python para:
- **Procesamiento de datos ambientales**: Análisis de sensores IoT
- **Generación de reportes**: Informes semanales automatizados
- **Análisis estadístico**: Pandas, NumPy, Matplotlib
- **Programación de tareas**: Schedule para tareas periódicas
## 🔧 Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# El servidor estará disponible en http://localhost:3000
```

### Desarrollo con Python

```bash
# Instalar dependencias Python
pip install -r requirements.txt

# Ejecutar procesador de datos
python python/main.py
```
## 📦 Docker

El proyecto incluye configuración completa de Docker:

- **Dockerfile.python**: Contenedor dedicado para servicios Python
- **docker-compose.yml**: Configuración para desarrollo
- **.dockerignore**: Archivos excluidos del contexto Docker
- **Healthchecks**: Monitoreo de salud de contenedores
- **Multi-stage builds**: Optimización de imágenes

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🌟 Créditos

Desarrollado con ❤️ para promover la consciencia ambiental y la reforestación.