// ===== CONSTANTES =====
const FORM_SELECTOR = 'form';
const INPUT_SELECTORS = {
  nombre: '#nombre',
  email: '#email',
  mensaje: '#mensaje'
};
const NAV_LINKS = document.querySelectorAll('nav a');
const SECTIONS = document.querySelectorAll('section');
const SCROLL_OFFSET = 100;

// ===== VARIABLES CON LET =====
let currentActiveSection = null;
let formIsValid = false;
let scrollTimeout = null;

// ===== FUNCIÓN: Validar formulario =====
function validateForm() {
  const nombre = document.querySelector(INPUT_SELECTORS.nombre);
  const email = document.querySelector(INPUT_SELECTORS.email);
  const mensaje = document.querySelector(INPUT_SELECTORS.mensaje);

  let isValid = true;
  let errors = [];

  // Validaciones con estructura mejorada
  if (!nombre || !email || !mensaje) {
    console.warn('⚠ Campos del formulario no encontrados');
    return false;
  }

  // Validar nombre con estructura detallada
  const nombreValue = nombre.value.trim();
  if (!nombreValue) {
    errors.push('El nombre es obligatorio.');
    isValid = false;
  } else if (nombreValue.length < 3) {
    errors.push('El nombre debe tener al menos 3 caracteres.');
    isValid = false;
  } else if (nombreValue.length > 100) {
    errors.push('El nombre no puede exceder 100 caracteres.');
    isValid = false;
  } else {
    // Validar que no contenga números
    for (let i = 0; i < nombreValue.length; i++) {
      const char = nombreValue[i];
      if (!isNaN(char) && char !== ' ') {
        errors.push('El nombre no puede contener números.');
        isValid = false;
        break;
      }
    }
  }

  // Validar email
  const emailValue = email.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValue) {
    errors.push('El email es obligatorio.');
    isValid = false;
  } else if (!emailRegex.test(emailValue)) {
    errors.push('Por favor, ingresa un email válido.');
    isValid = false;
  }

  // Validar mensaje con estructura mejorada
  const mensajeValue = mensaje.value.trim();
  if (!mensajeValue) {
    errors.push('El mensaje es obligatorio.');
    isValid = false;
  } else if (mensajeValue.length < 10) {
    errors.push('El mensaje debe tener al menos 10 caracteres.');
    isValid = false;
  } else if (mensajeValue.length > 1000) {
    errors.push('El mensaje no puede exceder 1000 caracteres.');
    isValid = false;
  }

  formIsValid = isValid;

  // Limpiar alertas anteriores
  const existingAlert = document.querySelector('.form-errors');
  if (existingAlert) {
    existingAlert.remove();
  }

  // Mostrar errores si los hay
  if (errors.length > 0) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-errors';
    
    let errorHTML = '<ul>';
    for (let i = 0; i < errors.length; i++) {
      errorHTML += `<li>✗ ${errors[i]}</li>`;
    }
    errorHTML += '</ul>';
    
    errorDiv.innerHTML = errorHTML;
    errorDiv.style.cssText = `
      background-color: #ffe6e6;
      color: #c92a2a;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      border-left: 4px solid #c92a2a;
    `;
    
    const form = document.querySelector(FORM_SELECTOR);
    if (form && form.parentElement) {
      form.parentElement.insertBefore(errorDiv, form);
    }
  }

  return isValid;
}

// ===== FUNCIÓN: Actualizar navegación activa =====
function updateActiveNavLink() {
  let activeFound = false;

  // Usar for para iterar sobre SECTIONS
  for (let i = 0; i < SECTIONS.length; i++) {
    const section = SECTIONS[i];
    const rect = section.getBoundingClientRect();
    
    // Si la sección está en el viewport
    if (rect.top <= SCROLL_OFFSET && rect.bottom > SCROLL_OFFSET) {
      const sectionId = section.getAttribute('id');
      
      // Resetear todos los enlaces primero
      for (let j = 0; j < NAV_LINKS.length; j++) {
        NAV_LINKS[j].style.color = '#fff';
        NAV_LINKS[j].style.borderBottom = 'none';
      }

      // Encontrar y resaltar el enlace activo
      const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.style.color = '#3498db';
        activeLink.style.borderBottom = '2px solid #3498db';
        currentActiveSection = sectionId;
        activeFound = true;
      }
      
      // Si encontramos la sección activa, no necesitamos seguir buscando
      break;
    }
  }

  // Si no hay sección activa, resetear todos los enlaces
  if (!activeFound && NAV_LINKS.length > 0) {
    for (let k = 0; k < NAV_LINKS.length; k++) {
      NAV_LINKS[k].style.color = '#fff';
      NAV_LINKS[k].style.borderBottom = 'none';
    }
  }
}

// ===== FUNCIÓN: Manejar evento de scroll con throttle =====
function handleScroll() {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  scrollTimeout = setTimeout(() => {
    updateActiveNavLink();
  }, 100);
}

// ===== FUNCIÓN: Configurar evento del formulario =====
function setupFormValidation() {
  const form = document.querySelector(FORM_SELECTOR);
  
  if (form) {
    const submitBtn = form.querySelector('input[type="submit"]');

    // Validar en tiempo real cuando el usuario escribe
    form.addEventListener('input', () => {
      validateForm();
    });

    // Validar al hacer submit
    form.addEventListener('submit', (event) => {
      if (!validateForm()) {
        event.preventDefault();
        console.log('Formulario no válido. Por favor, corrige los errores.');
      } else {
        console.log('✓ Formulario válido. Enviando...');
        // Aquí iría la lógica para enviar el formulario
        // event.preventDefault(); // Descomentar si quieres prevenir el envío
      }
    });
  }
}

// ===== FUNCIÓN: Smooth scroll a secciones =====
function setupSmoothScroll() {
  if (!NAV_LINKS || NAV_LINKS.length === 0) {
    console.warn('⚠ No se encontraron enlaces de navegación');
    return;
  }

  // Usar forEach para agregar listeners
  NAV_LINKS.forEach((link, index) => {
    if (!link) return; // Saltar si el enlace no existe
    
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      
      // Validar que el href sea un ancla
      if (href && href.startsWith('#')) {
        event.preventDefault();
        
        const targetSection = document.querySelector(href);
        if (targetSection) {
          // Agregar clase activa para feedback visual
          targetSection.classList.add('active-scroll');
          
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Remover clase después de la animación
          setTimeout(() => {
            if (targetSection.classList.contains('active-scroll')) {
              targetSection.classList.remove('active-scroll');
            }
          }, 800);
        } else {
          console.warn(`⚠ Sección ${href} no encontrada`);
        }
      }
    });
  });
}

// ===== FUNCIÓN: Mejorar apariencia de inputs =====
function enhanceInputs() {
  const inputs = document.querySelectorAll('input, textarea');
  
  if (!inputs || inputs.length === 0) {
    console.warn('⚠ No se encontraron campos input o textarea');
    return;
  }
  
  // Usar for para mayor control
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    
    if (!input) continue; // Saltar inputs nulos
    
    // Evento focus
    input.addEventListener('focus', function() {
      this.style.boxShadow = '0 0 10px rgba(52, 152, 219, 0.3)';
      this.style.borderColor = '#3498db';
      this.style.transition = 'all 0.3s ease';
      
      // Agregar atributo de estado
      this.setAttribute('data-focused', 'true');
    });

    // Evento blur
    input.addEventListener('blur', function() {
      this.style.boxShadow = 'none';
      this.style.borderColor = '#ddd';
      
      // Remover atributo de estado
      this.removeAttribute('data-focused');
      
      // Validar si es un input requerido y está vacío
      if (this.hasAttribute('required') && !this.value.trim()) {
        this.style.borderColor = '#c92a2a';
      }
    });
    
    // Evento input para validación en tiempo real
    input.addEventListener('input', function() {
      if (this.hasAttribute('required') && !this.value.trim()) {
        this.style.borderColor = '#c92a2a';
      } else if (this.hasAttribute('required')) {
        this.style.borderColor = '#27ae60';
      }
    });
  }
}

// ===== FUNCIÓN: Inicializar todas las funcionalidades =====
function initialize() {
  console.log('✓ Script cargado - Inicializando sitio web...');
  
  // Array de funciones inicializadoras con validación
  const initializers = [
    { name: 'Validación de formularios', fn: setupFormValidation },
    { name: 'Scroll suave', fn: setupSmoothScroll },
    { name: 'Navegación activa', fn: updateActiveNavLink },
    { name: 'Mejora de inputs', fn: enhanceInputs }
  ];
  
  // Ejecutar cada inicializador con manejo de errores
  for (let i = 0; i < initializers.length; i++) {
    const initializer = initializers[i];
    try {
      if (typeof initializer.fn === 'function') {
        initializer.fn();
        console.log(`✓ ${initializer.name} inicializado`);
      } else {
        console.warn(`⚠ ${initializer.name} no es una función válida`);
      }
    } catch (error) {
      console.error(`✗ Error al inicializar ${initializer.name}:`, error);
    }
  }
  
  // Agregar evento de scroll
  if (window) {
    window.addEventListener('scroll', handleScroll);
  }
  
  console.log('✓ Todas las funcionalidades inicializadas correctamente');
}

// ===== EJECUTAR AL CARGAR EL DOM =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  // El DOM ya está cargado
  initialize();
}
