# 🏦 Banco Andino S.A. — Sitio Web Institucional

Sitio web corporativo moderno, profesional y responsive para **Banco Andino S.A.**
Desarrollado con HTML5, CSS3 y JavaScript vanilla. **Proyecto educativo / demostrativo.**

---

## 🚀 Cómo ejecutarlo

No requiere instalación de dependencias. Simplemente abre el archivo `index.html` en tu navegador preferido.

### Opción A: Doble clic
Navega a la carpeta del proyecto y haz doble clic en `index.html`.

### Opción B: Servidor local (recomendado)
Para evitar restricciones de CORS al cargar archivos locales, usa un servidor local:

```bash
# Con Python 3
python3 -m http.server 8080
# Luego abre http://localhost:8080

# Con Node.js (npx)
npx serve .
# Luego abre http://localhost:3000

# Con VS Code
# Instala la extensión "Live Server" y haz clic en "Go Live"
```

---

## 📁 Estructura del proyecto

```
WebSite-BancoAndino/
│
├── index.html                  # Página de inicio (Home)
│
├── pages/                      # Páginas internas
│   ├── nosotros.html           # Quiénes somos, historia, directiva
│   ├── productos.html          # Productos y servicios financieros
│   ├── banca-digital.html      # App móvil y banca por internet
│   ├── sucursales.html         # Sucursales y cajeros automáticos
│   └── contacto.html           # Formulario de contacto y FAQ
│
├── css/
│   └── style.css               # Hoja de estilos principal (responsive)
│
├── js/
│   └── main.js                 # JavaScript: nav, cookies, animaciones, form
│
├── img/                        # Carpeta para imágenes (actualmente vacía)
│
└── README.md                   # Este archivo
```

---

## 🎨 Diseño

| Elemento        | Valor                                      |
|-----------------|---------------------------------------------|
| Paleta primaria | Azul oscuro `#0d2d6b` · Azul medio `#1e56a0`|
| Acento          | Dorado `#c9a84c` · Dorado claro `#f0d080`  |
| Fondos          | Blanco `#ffffff` · Gris claro `#f4f6fa`    |
| Tipografía      | Montserrat (títulos) · Open Sans (cuerpo)  |
| Iconos          | Font Awesome 6                             |

El diseño sigue principios **mobile-first** con breakpoints en `768px` y `1024px`.

---

## 📄 Páginas incluidas

| Página               | Descripción                                                      |
|----------------------|------------------------------------------------------------------|
| **Inicio**           | Hero con eslogan, servicios destacados, indicadores de confianza |
| **Nosotros**         | Historia, misión/visión/valores, directiva (Presidenta: Carla Vanesa Mamani Chávez; Vicepresidenta: Keyla Dolores Méndez) |
| **Productos**        | Cuentas de ahorro, corrientes, préstamos, tarjetas, inversiones, seguros |
| **Banca Digital**    | App móvil, banca por internet, características de seguridad      |
| **Sucursales**       | Listado de sucursales, horarios, servicios en cajeros            |
| **Contacto**         | Formulario con validación JS, canales de atención, FAQ, redes sociales |

---

## ⚙️ Funcionalidades JavaScript

- **Header sticky** con efecto de scroll
- **Menú hamburguesa** para móviles con accesibilidad (ARIA)
- **Cookie banner** con persistencia en `localStorage`
- **Animaciones de entrada** usando `IntersectionObserver`
- **Contador animado** de estadísticas
- **Smooth scroll** para anclas internas
- **Validación de formulario** en tiempo real con mensajes de error
- **Modal demo** para "Banca en Línea"

---

## ♿ Accesibilidad

- Atributos `aria-*` en navegación, formularios y diálogos
- `skip-link` para saltar al contenido principal
- Landmarks semánticos (`header`, `main`, `footer`, `nav`, `section`, `article`)
- Contraste de colores WCAG AA
- Teclado navegable (Escape cierra menú/modal)

---

## ⚠️ Disclaimer

> **Este es un proyecto educativo / demostrativo.**
> Banco Andino S.A. es una entidad **ficticia** creada únicamente con fines académicos y de práctica de desarrollo web. No representa ni está afiliada a ninguna institución financiera real.

