# © Carlos Alberto Ruiz Brito · Delivery con Charly Brito · carlosruizbrito.com · 17/11/2026
# Genera las páginas de inicio en español e inglés desde _fuente/inicio.html.
# Uso: python3 _fuente/build.py [ruta_base]   (ruta_base: "nuevo" mientras sea propuesta; "" para el inicio real)
# Jekyll no publica la carpeta _fuente (empieza con guion bajo).
import sys, os
from bs4 import BeautifulSoup

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
base = sys.argv[1] if len(sys.argv) > 1 else "nuevo"
base = base.strip("/")
SITIO = "https://carlosruizbrito.com/"
url_es = SITIO + (base + "/" if base else "")
url_en = url_es + "en/"
prof = base.count("/") + 1 if base else 0

src = open(os.path.join(RAIZ, "_fuente", "inicio.html"), encoding="utf-8").read()

PAGINAS = {
    "es": dict(dir=base, R="../" * prof, OTHER="en/", OTHER_LANG="en", CANON=url_es,
               TITLE="Carlos Alberto Ruiz Brito · Senior Delivery Manager",
               DESC="Carlos Alberto «Charly» Ruiz Brito, Senior Delivery Manager: decisiones de entrega en infraestructura crítica, Disaster Recovery y transformación digital.",
               MENU="Abrir menú"),
    "en": dict(dir=(base + "/en") if base else "en", R="../" * (prof + 1), OTHER="../", OTHER_LANG="es", CANON=url_en,
               TITLE="Carlos Alberto Ruiz Brito · Senior Delivery Manager",
               DESC="Carlos Alberto “Charly” Ruiz Brito, Senior Delivery Manager: delivery decisions in critical infrastructure, Disaster Recovery and digital transformation.",
               MENU="Open menu"),
}

for lang, p in PAGINAS.items():
    html = src
    for k, v in {"{LANG}": lang, "{TITLE}": p["TITLE"], "{DESC}": p["DESC"], "{CANON}": p["CANON"],
                 "{URL_ES}": url_es, "{URL_EN}": url_en, "{R}": p["R"], "{OTHER}": p["OTHER"],
                 "{OTHER_LANG}": p["OTHER_LANG"],
                 "{ROBOTS}": "" if not base else '<meta name="robots" content="noindex, nofollow">\n'}.items():
        html = html.replace(k, v)
    html = html.replace('aria-label="Abrir menú"', 'aria-label="%s"' % p["MENU"])
    soup = BeautifulSoup(html, "html.parser")
    otro = "en" if lang == "es" else "es"
    for el in soup.select("." + otro):
        el.decompose()
    for el in soup.select("span." + lang):
        el.unwrap()
    out_dir = os.path.join(RAIZ, p["dir"]) if p["dir"] else RAIZ
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, "index.html"), "w", encoding="utf-8") as f:
        f.write(str(soup))
    print("ok", lang, os.path.join(p["dir"], "index.html"))
