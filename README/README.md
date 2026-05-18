# Proyecto 1 - Sitio Web Profesional

## 📋 Descripción

Sitio web profesional desarrollado como proyecto académico del curso de Front End. Este proyecto demuestra la creación de un sitio web moderno, responsivo y funcional utilizando HTML5, CSS3 y JavaScript.

## 🎯 Objetivos del Proyecto

- ✅ Implementar estructura semántica HTML correcta
- ✅ Aplicar estilos CSS profesionales y responsivos
- ✅ Crear un diseño visual atractivo con imágenes SVG
- ✅ Desarrollar múltiples páginas de servicios
- ✅ Gestionar el proyecto con Git y GitHub
- ✅ Utilizar ramas de desarrollo (`main` y `develop`)
- ✅ Realizar commits progresivos y merges documentados

## 📁 Estructura del Proyecto

```
proyecto 1/
├── index.html                 # Página principal
├── CSS/
│   ├── estilos.css           # Estilos principales
│   └── flexbox.css           # Ejemplos de Flexbox
├── JS/
│   ├── index.html            # Copia de página principal
│   ├── desarrollo-web.html   # Página detallada de servicios web
│   └── consultoria.html      # Página detallada de consultoría
├── IMG/
│   ├── desarrollo-web.svg    # Imagen servicio desarrollo web
│   ├── consultoria.svg       # Imagen servicio consultoría
│   ├── equipo.svg            # Imagen del equipo
│   └── flexbox.html          # Ejemplos de Flexbox con imágenes
└── README/README.md          # Este archivo
```

## 📁 Estructura de carpetas y prompts utilizados

### Estructura de carpetas
- `index.html` : Página principal del sitio.
- `CSS/estilos.css` : Estilos principales para todo el sitio.
- `CSS/flexbox.css` : Estilos de ejemplo específicos para Flexbox.
- `JS/index.html` : Página duplicada de la principal dentro de la carpeta JS.
- `JS/desarrollo-web.html` : Página dedicada al servicio de desarrollo web.
- `JS/consultoria.html` : Página dedicada al servicio de consultoría.
- `IMG/desarrollo-web.svg`, `IMG/consultoria.svg`, `IMG/equipo.svg` : Imágenes SVG profesionales.
- `IMG/flexbox.html` : Ejemplos de layout Flexbox con imágenes.
- `README/README.md` : Documentación del proyecto y prompts usados.

### Prompts utilizados durante el desarrollo
- **"Crea estructura semántica con header, nav, main, section y footer"**: Se utilizó para construir la base HTML semántica del sitio, asegurando que la página tuviera una estructura clara y accesible.
- **"creame los estilos adicionales"**: Se utilizó para diseñar y añadir estilos CSS profesionales al sitio completo, incluyendo el header, navegación, secciones, servicios y footer.
- **"agregale imagenes, enlaces y formularios"**: Se utilizó para enriquecer el contenido de la página con imágenes, enlaces externos y un formulario de contacto funcional.
- **"como se crea el archivo flexbox"**: Se utilizó para generar un archivo de ejemplo separado que muestra cómo funciona Flexbox con diferentes configuraciones y diseños.
- **"pero para poner imagenes"**: Se utilizó para adaptar el ejemplo de Flexbox y el sitio principal para que incluyeran imágenes dentro de los layouts flexibles.
- **"coloca imagenes para el sitio web"**: Se usó para crear imágenes SVG personalizadas y representativas para los servicios del sitio.
- **"en donde dice desarrollo web, al pinchar mas informacion que salga mas informacion dentro"**: Se utilizó para transformar el enlace de servicio en información expandible dentro de la misma página.
- **"pero que te mande a otro pagina con esa informacion"**: Se usó para crear páginas dedicadas separadas (`desarrollo-web.html` y `consultoria.html`) con contenido extenso y profesional.
- **"como hacer para que se guarden los cambios en github"**: Se utilizó para documentar y ejecutar el flujo de trabajo de Git: add, commit y push al repositorio remoto.
- **"como crear una rama que se llame develop"**: Se usó para crear y publicar la rama `develop`, siguiendo buenas prácticas de Git en el desarrollo.
- **"como cambiar de rama"**: Se utilizó para mostrar cómo cambiar entre ramas con `git checkout`.
- **"Debe existir evidencia de commits progresivos y merges entre ramas"**: Se utilizó para crear compromiso con commits claros y hacer merge de `develop` a `main`, proporcionando evidencia de un flujo de trabajo real.
- **"en la parte de contacto al momento de colocar el nombre, Email y el mensaje, sean enviados al correo Korstarck@gmail.com"**: Se usó para integrar un formulario que enviara datos a ese correo mediante FormSubmit.
- **"regresalo a como estaba anteriormente"**: Se usó para revertir cambios de formulario y volver al estado previo sin envío por FormSubmit.
- **"en bienvenida que tenga un poco mas deinformacion que atraiga a las personas"**: Se usó para expandir y hacer más llamativa la sección de bienvenida con razones de valor.
- **"coloca fondos llamativos en la web para que se vea mejor"**: Se utilizó para mejorar visualmente el sitio con gradientes y efectos CSS más atractivos.
- **"en Acerca de nosotros tambien ponle mas informacion para que se vea mas llamativa y traiga la atencion de los usuarios"**: Se utilizó para enriquecer la sección Acerca de Nosotros con historia, estadísticas, misión y valores.

## 🌟 Características Principales

### Sección de Bienvenida
- Presentación atractiva con propuesta de valor
- 4 razones por las que elegir la empresa:
  - 🚀 Innovación Continua
  - 👥 Equipo Experto
  - 📈 Resultados Comprobados
  - 🤝 Soporte Continuo

### Navegación
- Menú de navegación responsivo
- Enlaces internos a todas las secciones principales
- Diseño profesional con colores corporativos

### Servicios
- **Desarrollo Web**: Página detallada con tecnologías, precios y proceso
- **Consultoría**: Página con metodologías, beneficios y paquetes de servicios

### Página de Contacto
- Formulario de contacto funcional
- Campos: Nombre, Email, Mensaje
- Diseño profesional con validación HTML

### Acerca de Nosotros
- Descripción de la empresa
- Enlaces a redes sociales
- Imágenes representativas

## 🎨 Diseño y Estilos

### Colores Corporativos
- **Primario**: #3498db (Azul)
- **Secundario**: #2c3e50 (Gris Oscuro)
- **Acentos**: #27ae60 (Verde), #e74c3c (Rojo)

### Características de CSS
- Diseño Flexbox para layouts
- CSS Grid para componentes complejos
- Efectos hover interactivos
- Diseño responsivo para todos los dispositivos
- Tipografía profesional

### Imágenes SVG
- Gráficos escalables sin pérdida de calidad
- Gradientes profesionales
- Iconografía moderna

## 🔄 Gestión con Git

### Ramas Disponibles
- **main**: Rama de producción (código estable)
- **develop**: Rama de desarrollo (nuevas características)
- **feature/estructura**: Rama para estructura HTML
- **feature/estilos**: Rama para estilos CSS

### Commits Documentados
```
feat: expandir sección de bienvenida con razones atractivas
revert: revertir integración de FormSubmit
feat: integrar FormSubmit para envío de emails
feat: agregar introducción descriptiva a la sección de servicios
style: agregar estilos CSS para el slogan del header
feat: agregar slogan al header
Agregar estructura semántica HTML, estilos CSS profesionales...
```

## 💻 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos avanzados (Flexbox, Grid)
- **SVG**: Gráficos vectoriales
- **Git**: Control de versiones
- **GitHub**: Repositorio remoto

## 📱 Responsividad

El sitio web es completamente responsivo y se adapta a:
- 💻 Computadoras de escritorio
- 📱 Tablets
- 📞 Dispositivos móviles

## 🚀 Cómo Usar

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Luis8111/Proyecto1.git
   ```

2. **Abrir el proyecto**:
   - Abre `JS/index.html` en tu navegador
   - O usa un servidor local (Live Server en VS Code)

3. **Explorar las páginas**:
   - Inicio: Bienvenida y razones de la empresa
   - Servicios: Desarrollo Web y Consultoría
   - Acerca de: Información de la empresa
   - Contacto: Formulario de contacto

## 📊 Estructura de Commits

El proyecto demuestra un flujo de trabajo profesional:

1. **Rama develop**: Desarrollo con múltiples commits
2. **Merge a main**: Integración de cambios completados
3. **Push a GitHub**: Sincronización con repositorio remoto
4. **Historial traceable**: Cada cambio documentado

## 🔗 Enlaces Importantes

- **Repositorio GitHub**: https://github.com/Luis8111/Proyecto1.git
- **Autor**: Luis8111
- **Fecha**: Abril 2026

## ✅ Checklist de Funcionalidades

- [x] Estructura HTML semántica completa
- [x] Estilos CSS profesionales y responsivos
- [x] Múltiples páginas de servicios
- [x] Imágenes SVG personalizadas
- [x] Formulario de contacto
- [x] Navegación funcional
- [x] Ejemplos de Flexbox
- [x] Gestión con Git y ramas
- [x] Commits progresivos documentados
- [x] Merges entre ramas

## 📝 Notas de Desarrollo

- El proyecto utiliza buenas prácticas de Git con ramas de desarrollo
- Cada funcionalidad tiene commits específicos y descriptivos
- El código está comentado y es fácil de mantener
- Los estilos CSS están organizados por secciones

## 🎓 Propósito Educativo

Este proyecto fue desarrollado con fines educativos para demostrar:
- Conocimiento de HTML5 semántico
- Manejo avanzado de CSS3
- Uso profesional de Git y GitHub
- Estructura y organización de proyectos web
- Mejores prácticas en desarrollo front-end

---

**Última actualización**: Abril 13, 2026
