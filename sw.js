const CACHE_NAME = 'green-roots-v1.0.0';
const APP_SHELL_FILES = [
  '/',
  '/index.html',
  '/login.html',
  '/dashboard.html',
  '/gobierno.html',
  '/styles.css',
  '/gobierno.css',
  '/dashboard.css',
  '/script.js',
  '/gobierno.js',
  '/dashboard.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

const OFFLINE_PAGE = '/offline.html';

// Install event - cache app shell
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching app shell');
        return cache.addAll(APP_SHELL_FILES);
      })
      .then(() => {
        console.log('[SW] App shell cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Error caching app shell:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Handle login requests
  if (event.request.url.includes('/api/login')) {
    event.respondWith(handleLoginRequest(event.request));
    return;
  }

  // Handle dashboard access
  if (event.request.url.includes('/dashboard.html')) {
    event.respondWith(handleDashboardAccess(event.request));
    return;
  }

  // Handle other requests with cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .then((fetchResponse) => {
            // Cache successful responses
            if (fetchResponse.status === 200) {
              const responseClone = fetchResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseClone);
                });
            }
            return fetchResponse;
          });
      })
      .catch(() => {
        // Return offline page for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_PAGE);
        }
      })
  );
});

// Handle login requests
async function handleLoginRequest(request) {
  try {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    // Check if user exists in registration cache
    const cache = await caches.open(CACHE_NAME);
    const userDataResponse = await cache.match('/api/user-data');
    
    if (email && password) {
      let userData;
      
      if (userDataResponse) {
        // Use registered user data
        const registeredUser = await userDataResponse.json();
        userData = {
          ...registeredUser,
          loginTime: new Date().toISOString()
        };
      } else {
        // Fallback for demo users
        userData = {
          id: 1,
          email: email,
          name: email.split('@')[0],
          role: 'volunteer',
          loginTime: new Date().toISOString()
        };
      }

      // Store session in cache
      const sessionResponse = new Response(JSON.stringify(userData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
      await cache.put('/api/session', sessionResponse);

      return new Response(JSON.stringify({
        success: true,
        user: userData,
                redirect: '/index.html#dashboard'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        message: 'Credenciales inválidas'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Error en el servidor'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle dashboard access
async function handleDashboardAccess(request) {
  try {
    // Check if user has valid session
    const cache = await caches.open(CACHE_NAME);
    const sessionResponse = await cache.match('/api/session');
    
    if (sessionResponse) {
      const userData = await sessionResponse.json();
      // Check if session is still valid (24 hours)
      const loginTime = new Date(userData.loginTime);
      const now = new Date();
      const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        // Session is valid, serve dashboard
        return caches.match('/dashboard.html');
      }
    }
    
    // No valid session, redirect to login
    return Response.redirect('/login.html', 302);
  } catch (error) {
    return Response.redirect('/login.html', 302);
  }
}

// Handle session validation requests
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CHECK_SESSION') {
    checkSession().then((isValid) => {
      event.ports[0].postMessage({ isValid });
    });
  }
  
  if (event.data && event.data.type === 'LOGOUT') {
    logout().then(() => {
      event.ports[0].postMessage({ success: true });
    });
  }
});

async function checkSession() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const sessionResponse = await cache.match('/api/session');
    
    if (sessionResponse) {
      const userData = await sessionResponse.json();
      const loginTime = new Date(userData.loginTime);
      const now = new Date();
      const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
      
      return hoursDiff < 24;
    }
    return false;
  } catch (error) {
    return false;
  }
}

async function logout() {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.delete('/api/session');
    return true;
  } catch (error) {
    return false;
  }
}