// Login
const loginForm = document.getElementById("loginForm");
if(loginForm){
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    if(email === "admin@greenroots.com" && password === "1234"){
      alert("Bienvenido a Green Roots ");
    } else {
      alert("Correo o contraseña incorrectos ");
    }
  });
}

// Registro
const registerForm = document.getElementById("registerForm");
if(registerForm){
  registerForm.addEventListener("submit", function(event){
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){
      alert("Las contraseñas no coinciden ");
      return;
    }

    alert(`Usuario ${name} registrado correctamente `);
    window.location.href = "./index.html";  // Redirige al login
  });
}
