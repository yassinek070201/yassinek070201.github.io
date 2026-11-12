const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function setMenu(abierto) {
    navLinks.classList.toggle("active", abierto);
    menuToggle.setAttribute("aria-expanded", String(abierto));
    menuToggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    menuToggle.textContent = abierto ? "✕" : "☰";
}

menuToggle.addEventListener("click", () => {
    setMenu(!navLinks.classList.contains("active"));
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        setMenu(false);
    }
});

document.addEventListener("click", event => {
    const dentro = navLinks.contains(event.target) || menuToggle.contains(event.target);
    if (!dentro) {
        setMenu(false);
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
        setMenu(false);
    }
});




const secciones = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {

    const observador = new IntersectionObserver(entradas => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) {
                return;
            }
            navLinks.querySelectorAll("a").forEach(enlace => {
                enlace.classList.remove("is-active");
                enlace.removeAttribute("aria-current");
            });
            const activo = navLinks.querySelector('a[href="#' + entrada.target.id + '"]');
            if (activo) {
                activo.classList.add("is-active");
                activo.setAttribute("aria-current", "true");
            }
        });
    }, { rootMargin: "-45% 0px -50% 0px" });

    secciones.forEach(seccion => observador.observe(seccion));

}
