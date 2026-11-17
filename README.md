# Delivery con Charly Brito · Carlos Alberto Ruiz Brito

Sitio personal de **Carlos Alberto Ruiz Brito**, Senior Delivery Manager: Delivery Management, infraestructura crítica, Disaster Recovery e IA aplicada a la entrega.

**Sitio:** https://carlosruizbrito.com · **Correo:** carlos@carlosruizbrito.com · **LinkedIn:** [linkedin.com/in/carlosruizb](https://www.linkedin.com/in/carlosruizb)

## Estructura

```
/
├── index.html            Inicio bilingüe (ES/EN): perfil, trayectoria, casos, LinkedIn, recursos
├── cv.html               CV web bilingüe con descargas PDF (noindex)
├── 404.html              Página de error con accesos a Inicio, Recursos y CV
├── css/sitio.css         Estilos compartidos
├── js/                   Scripts del sitio (sin scripts inline, compatibles con la CSP)
│   ├── arranque.js       Idioma inicial (único script sin defer, en <head>)
│   ├── nav.js            Navegación y selector de idioma
│   ├── hero.js · inicio.js
│   ├── cv.js · catalogo.js · tablero.js
├── recursos/
│   ├── index.html        Catálogo de recursos con filtros por tema
│   ├── recursos.js       Lista de recursos: el inicio y el catálogo se dibujan solos
│   ├── tablero-ejecutivo.html  Página del Tablero Ejecutivo de Delivery
│   ├── Tablero_Ejecutivo_Delivery_v1.1.xlsx · Executive_Delivery_Dashboard_v1.1.xlsx
│   ├── tablero-*.jpg · tablero-como-usarlo*.mp4   Miniaturas, vista previa, pósters y videos
│   ├── CV_Carlos_Ruiz_Brito_ES_WEB.pdf · CV_Carlos_Ruiz_Brito_EN_WEB_1.pdf
│   └── og-image.png      Imagen para vista previa en redes
├── foto-carlos.jpg · favicon.ico · favicon.png · apple-touch-icon.png
├── robots.txt · sitemap.xml
└── CNAME                 Dominio personalizado (carlosruizbrito.com)
```

Las rutas públicas (`recursos/…`, CV en PDF, `tablero-ejecutivo.html`) están enlazadas desde LinkedIn y documentos compartidos. **No se renombran ni se mueven.**

## Recursos gratuitos

| Recurso | Estado | Archivos |
|---|---|---|
| Tablero Ejecutivo de Delivery v1.1 | Disponible | `Tablero_Ejecutivo_Delivery_v1.1.xlsx` (ES) · `Executive_Delivery_Dashboard_v1.1.xlsx` (EN) · página `tablero-ejecutivo.html` |
| Registro de riesgos | En preparación | — |
| Checklist de cambio en sistemas 24x7 | En preparación | — |

Para publicar un recurso: subir sus archivos a `recursos/`, agregar su bloque en `recursos/recursos.js` y actualizar `sitemap.xml` y esta tabla.

## Reglas técnicas

- Content-Security-Policy idéntica en cada página: sin scripts inline ni atributos `on…=`; solo Google Fonts (Inter e IBM Plex Mono) como dependencia externa.
- Todo texto visible existe en español e inglés (clases `.es` / `.en`).
- Sin teléfono ni números de cédula en el sitio ni en los CV web. Clientes actuales anónimos.
- Diseño responsivo: sin scroll horizontal a 375 px; respeta `prefers-reduced-motion`.

## Publicación

GitHub Pages desde la rama `main`, carpeta raíz. DNS en Cloudflare (modo "DNS only").

## Licencias

Ver [LICENSE.md](LICENSE.md).

- **Recursos gratuitos** (`recursos/`, excepto los CV y `og-image.png`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es). Puedes usarlos, copiarlos y adaptarlos, incluso con fines comerciales, citando a Carlos Alberto Ruiz Brito · Delivery con Charly Brito · carlosruizbrito.com.
- **Resto del sitio** (código, textos, CV, imágenes y marca): © 2026 Carlos Alberto Ruiz Brito · Todos los derechos reservados.

#DeliveryConCharlyBrito

---
Documento elaborado por Carlos Alberto Ruiz Brito · 11/10/2026 · actualizado 17/11/2026
