// ===== CONSTANTES =====
const FORM_SELECTOR = 'form';
const INPUT_SELECTORS = {
  nombre: '#nombre',
  email: '#email',
  mensaje: '#mensaje'
};
const FORM_FIELD_LABELS = {
  nombre: 'Nombre',
  email: 'Email',
  mensaje: 'Mensaje'
};
const VALIDATION_FIELDS = ['nombre', 'email', 'mensaje'];
const NAV_LINKS = document.querySelectorAll('nav a');
const SECTIONS = document.querySelectorAll('section');
const SCROLL_OFFSET = 100;
const FAVORITES_STORAGE_KEY = 'miempresa-favoritos';
const FAVORITE_BUTTON_SELECTOR = '.favorite-toggle';
const SERVICES_CONTAINER_SELECTOR = '#servicios-list';
const SERVICE_SEARCH_INPUT_SELECTOR = '#servicios-search';
const SERVICE_FILTER_SELECTOR = '#servicios-filter';
const SERVICE_CLEAR_BUTTON_SELECTOR = '#servicios-clear';
const SERVICE_RESULTS_SELECTOR = '#servicios-resultados';

const SERVICES_DATA = [
  {
    id: 'desarrollo-web',
    name: 'Desarrollo Web',
    description: 'Creamos sitios web modernos y funcionales.',
    link: 'desarrollo-web.html',
    img: '../IMG/desarrollo-web.svg',
    alt: 'Desarrollo Web'
  },
  {
    id: 'consultoria',
    name: 'Consultoría',
    description: 'Asesoramiento experto para optimizar tus procesos.',
    link: 'consultoria.html',
    img: '../IMG/consultoria.svg',
    alt: 'Consultoría'
  }
];

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
  for (let i = 0; i < VALIDATION_FIELDS.length; i++) {
    const fieldName = VALIDATION_FIELDS[i];
    const fieldElement = document.querySelector(INPUT_SELECTORS[fieldName]);

    if (!fieldElement) {
      console.warn(`⚠ Campo ${FORM_FIELD_LABELS[fieldName]} no encontrado`);
      return false;
    }
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

// ===== FUNCIÓN: Sistema de favoritos =====
function loadFavorites() {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('⚠ Error al cargar favoritos:', error);
    return [];
  }
}

function saveFavorites(favorites) {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.warn('⚠ Error al guardar favoritos:', error);
  }
}

function getServiceName(card) {
  return card.getAttribute('data-service-name') || card.querySelector('h3')?.textContent.trim() || 'Servicio';
}

function updateFavoritesSummary(favoriteIds) {
  const summary = document.getElementById('favoritos-resumen');
  if (!summary) return;

  if (favoriteIds.length === 0) {
    summary.textContent = 'Marca un servicio como favorito para verlo aquí.';
    return;
  }

  const names = favoriteIds.map((id) => {
    const card = document.querySelector(`.servicio[data-service-id="${id}"]`);
    return card ? getServiceName(card) : id;
  });

  summary.textContent = `Tienes ${favoriteIds.length} ${favoriteIds.length === 1 ? 'favorito' : 'favoritos'}: ${names.join(', ')}.`;
}

function setFavoriteButtonState(button, isFavorite) {
  const card = button.closest('.servicio');
  button.classList.toggle('active', isFavorite);
  button.textContent = isFavorite ? '★' : '☆';
  button.setAttribute('aria-label', `${isFavorite ? 'Eliminar' : 'Agregar'} ${card ? getServiceName(card) : 'servicio'} ${isFavorite ? 'de' : 'a'} favoritos`);
  if (card) {
    card.classList.toggle('favorite', isFavorite);
  }
}

function renderServices() {
  const container = document.querySelector(SERVICES_CONTAINER_SELECTOR);
  if (!container) {
    console.warn('⚠ Contenedor de servicios no encontrado');
    return;
  }

  container.innerHTML = '';

  SERVICES_DATA.forEach((service) => {
    const card = document.createElement('div');
    card.className = 'servicio';
    card.setAttribute('data-service-id', service.id);
    card.setAttribute('data-service-name', service.name);
    card.innerHTML = `
      <button class="favorite-toggle" type="button" aria-label="Agregar ${service.name} a favoritos">☆</button>
      <img src="${service.img}" alt="${service.alt}" width="200" height="150">
      <h3>${service.name}</h3>
      <p>${service.description}</p>
      <a href="${service.link}">Más información</a>
    `;
    container.appendChild(card);
  });
}

function setupFavorites() {
  const favorites = loadFavorites();
  const buttons = document.querySelectorAll(FAVORITE_BUTTON_SELECTOR);

  buttons.forEach((button) => {
    const card = button.closest('.servicio');
    if (!card) return;

    const serviceId = card.getAttribute('data-service-id');
    const isFavorite = favorites.includes(serviceId);
    setFavoriteButtonState(button, isFavorite);

    button.addEventListener('click', () => {
      const activeFavorites = loadFavorites();
      const index = activeFavorites.indexOf(serviceId);
      let nextFavorites;
      let nowFavorite;

      if (index === -1) {
        nextFavorites = [...activeFavorites, serviceId];
        nowFavorite = true;
      } else {
        nextFavorites = [...activeFavorites.slice(0, index), ...activeFavorites.slice(index + 1)];
        nowFavorite = false;
      }

      saveFavorites(nextFavorites);
      setFavoriteButtonState(button, nowFavorite);
      updateFavoritesSummary(nextFavorites);
      filterServices();
    });
  });

  updateFavoritesSummary(favorites);
  filterServices();
}

function filterServices() {
  const searchInput = document.querySelector(SERVICE_SEARCH_INPUT_SELECTOR);
  const filterSelect = document.querySelector(SERVICE_FILTER_SELECTOR);
  const resultMessage = document.querySelector(SERVICE_RESULTS_SELECTOR);
  const favorites = loadFavorites();
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const filterOption = filterSelect ? filterSelect.value : 'all';
  const serviceCards = document.querySelectorAll('.servicio');
  let visibleCount = 0;

  serviceCards.forEach((card) => {
    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const description = card.querySelector('p')?.textContent.toLowerCase() || '';
    const serviceName = card.getAttribute('data-service-name')?.toLowerCase() || '';
    const serviceId = card.getAttribute('data-service-id');
    const isFavorite = favorites.includes(serviceId);
    const matchesSearch = query === '' || title.includes(query) || description.includes(query) || serviceName.includes(query);
    const matchesFilter = filterOption === 'all' || (filterOption === 'favoritos' && isFavorite);
    const visible = matchesSearch && matchesFilter;

    card.style.display = visible ? 'flex' : 'none';
    if (visible) visibleCount++;
  });

  if (resultMessage) {
    if (visibleCount === 0) {
      resultMessage.textContent = 'No se encontraron servicios que coincidan con la búsqueda.';
    } else if (visibleCount === 1) {
      resultMessage.textContent = '1 servicio coincide con la búsqueda.';
    } else {
      resultMessage.textContent = `${visibleCount} servicios coinciden con la búsqueda.`;
    }
  }
}

function setupServiceFilter() {
  const searchInput = document.querySelector(SERVICE_SEARCH_INPUT_SELECTOR);
  const filterSelect = document.querySelector(SERVICE_FILTER_SELECTOR);
  const clearButton = document.querySelector(SERVICE_CLEAR_BUTTON_SELECTOR);

  if (!searchInput && !filterSelect && !clearButton) {
    return;
  }

  const update = () => filterServices();
  if (searchInput) {
    searchInput.addEventListener('input', update);
  }
  if (filterSelect) {
    filterSelect.addEventListener('change', update);
  }
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
      }
      if (filterSelect) {
        filterSelect.value = 'all';
      }
      filterServices();
      if (searchInput) {
        searchInput.focus();
      }
    });
  }

  filterServices();
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
    { name: 'Render de servicios', fn: renderServices },
    { name: 'Validación de formularios', fn: setupFormValidation },
    { name: 'Scroll suave', fn: setupSmoothScroll },
    { name: 'Navegación activa', fn: updateActiveNavLink },
    { name: 'Mejora de inputs', fn: enhanceInputs },
    { name: 'Sistema de favoritos', fn: setupFavorites },
    { name: 'Búsqueda y filtro de servicios', fn: setupServiceFilter }
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
