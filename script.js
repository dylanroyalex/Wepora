// =====================================
// MENÚ RESPONSIVE
// =====================================

const botonMenu = document.getElementById("botonMenu");
const navegacion = document.getElementById("navegacion");

if (botonMenu && navegacion) {

    botonMenu.addEventListener("click", () => {

        const estaAbierto =
            navegacion.classList.toggle("activo");

        botonMenu.setAttribute(
            "aria-expanded",
            estaAbierto
        );

        botonMenu.setAttribute(
            "aria-label",
            estaAbierto
                ? "Cerrar menú"
                : "Abrir menú"
        );

        botonMenu.textContent =
            estaAbierto ? "✕" : "☰";

    });


    const enlacesMenu =
        document.querySelectorAll(".navegacion a");

    enlacesMenu.forEach((enlace) => {

        enlace.addEventListener("click", () => {

            navegacion.classList.remove("activo");

            botonMenu.setAttribute(
                "aria-expanded",
                "false"
            );

            botonMenu.setAttribute(
                "aria-label",
                "Abrir menú"
            );

            botonMenu.textContent = "☰";

        });

    });

}


// =====================================
// MODO CLARO / OSCURO
// =====================================

const botonTema =
    document.getElementById("botonTema");

const preferenciaSistema =
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    );


function obtenerTemaInicial() {

    const temaGuardado =
        localStorage.getItem("tema");

    if (temaGuardado) {
        return temaGuardado;
    }

    return preferenciaSistema.matches
        ? "oscuro"
        : "claro";

}


function aplicarTema(tema) {

    const logos =
        document.querySelectorAll(".logo-tema");

    if (tema === "oscuro") {

        document.body.classList.add(
            "modo-oscuro"
        );

        logos.forEach((logo) => {

            logo.src = "img/logo1.png";

        });

        if (botonTema) {

            botonTema.textContent = "☀";

            botonTema.setAttribute(
                "aria-label",
                "Cambiar a modo claro"
            );

            botonTema.setAttribute(
                "title",
                "Cambiar a modo claro"
            );

        }

    } else {

        document.body.classList.remove(
            "modo-oscuro"
        );

        logos.forEach((logo) => {

            logo.src = "img/logo2.png";

        });

        if (botonTema) {

            botonTema.textContent = "☾";

            botonTema.setAttribute(
                "aria-label",
                "Cambiar a modo oscuro"
            );

            botonTema.setAttribute(
                "title",
                "Cambiar a modo oscuro"
            );

        }

    }

}


let temaActual =
    obtenerTemaInicial();

aplicarTema(temaActual);


if (botonTema) {

    botonTema.addEventListener(
        "click",
        () => {

            temaActual =
                document.body.classList.contains(
                    "modo-oscuro"
                )
                    ? "claro"
                    : "oscuro";

            aplicarTema(temaActual);

            localStorage.setItem(
                "tema",
                temaActual
            );

        }
    );

}


preferenciaSistema.addEventListener(
    "change",
    (evento) => {

        const temaGuardado =
            localStorage.getItem("tema");

        if (!temaGuardado) {

            aplicarTema(
                evento.matches
                    ? "oscuro"
                    : "claro"
            );

        }

    }
);


// =====================================
// CARRITO DE COMPRAS
// =====================================

const botonCarrito =
    document.getElementById("botonCarrito");

const cerrarCarrito =
    document.getElementById("cerrarCarrito");

const carrito =
    document.getElementById("carrito");

const fondoCarrito =
    document.getElementById("fondoCarrito");

const carritoProductos =
    document.getElementById("carritoProductos");

const contadorCarrito =
    document.getElementById("contadorCarrito");

const carritoSubtotal =
    document.getElementById("carritoSubtotal");

const botonFinalizar =
    document.getElementById("botonFinalizar");

const botonVaciar =
    document.getElementById("botonVaciar");

const numeroWhatsApp =
    "573025848217";


let carritoCompra =
    JSON.parse(
        localStorage.getItem("carritoWepora")
    ) || [];


// =====================================
// ABRIR CARRITO
// =====================================

function abrirCarrito() {

    if (!carrito) return;

    carrito.classList.add("activo");

    if (fondoCarrito) {
        fondoCarrito.classList.add("activo");
    }

    document.body.classList.add(
        "carrito-abierto"
    );

}


// =====================================
// CERRAR CARRITO
// =====================================

function cerrarPanelCarrito() {

    if (!carrito) return;

    carrito.classList.remove("activo");

    if (fondoCarrito) {
        fondoCarrito.classList.remove("activo");
    }

    document.body.classList.remove(
        "carrito-abierto"
    );

}


if (botonCarrito) {

    botonCarrito.addEventListener(
        "click",
        abrirCarrito
    );

}


if (cerrarCarrito) {

    cerrarCarrito.addEventListener(
        "click",
        cerrarPanelCarrito
    );

}


if (fondoCarrito) {

    fondoCarrito.addEventListener(
        "click",
        cerrarPanelCarrito
    );

}


// =====================================
// FORMATEAR PRECIOS
// =====================================

function formatearPrecio(precio) {

    return new Intl.NumberFormat(
        "es-CO"
    ).format(precio) + " COP";

}


// =====================================
// GUARDAR CARRITO
// =====================================

function guardarCarrito() {

    localStorage.setItem(
        "carritoWepora",
        JSON.stringify(carritoCompra)
    );

}


// =====================================
// CONTADOR DEL CARRITO
// =====================================

function actualizarContador() {

    if (!contadorCarrito) return;

    const cantidadTotal =
        carritoCompra.reduce(
            (total, producto) =>
                total + producto.cantidad,
            0
        );

    contadorCarrito.textContent =
        cantidadTotal;


    contadorCarrito.classList.remove(
        "animar-contador"
    );

    void contadorCarrito.offsetWidth;

    contadorCarrito.classList.add(
        "animar-contador"
    );

}


// =====================================
// CALCULAR SUBTOTAL
// =====================================

function calcularSubtotal() {

    return carritoCompra.reduce(
        (total, producto) => {

            return total +
                (
                    producto.precio *
                    producto.cantidad
                );

        },
        0
    );

}


// =====================================
// MOSTRAR CARRITO
// =====================================

function mostrarCarrito() {

    if (!carritoProductos) return;


    if (carritoCompra.length === 0) {

        carritoProductos.innerHTML = `

            <div class="carrito-vacio">

                <div class="carrito-vacio-icono">
                    🛒
                </div>

                <p>
                    Tu carrito está vacío.
                </p>

            </div>

        `;

    } else {

        carritoProductos.innerHTML =
            carritoCompra
                .map(
                    (producto) => `

                    <div
                        class="item-carrito"
                        data-id="${producto.id}"
                    >

                        <div
                            class="item-carrito-imagen"
                        >

                            <img
                                src="${escapeHTML(producto.imagen)}"
                                alt="${escapeHTML(producto.nombre)}"
                            >

                        </div>


                        <div
                            class="item-carrito-info"
                        >

                            <h3>
                                ${escapeHTML(producto.nombre)}
                            </h3>


                            <p
                                class="item-carrito-precio"
                            >
                                ${formatearPrecio(
                                    producto.precio
                                )}
                            </p>


                            <div
                                class="cantidad-control"
                            >

                                <button
                                    class="disminuir-cantidad"
                                    data-id="${producto.id}"
                                    aria-label="Disminuir cantidad"
                                >
                                    −
                                </button>


                                <span>
                                    ${producto.cantidad}
                                </span>


                                <button
                                    class="aumentar-cantidad"
                                    data-id="${producto.id}"
                                    aria-label="Aumentar cantidad"
                                >
                                    +
                                </button>

                            </div>

                        </div>


                        <button
                            class="eliminar-item"
                            data-id="${producto.id}"
                            aria-label="Eliminar producto"
                            title="Eliminar producto"
                        >
                            ✕
                        </button>

                    </div>

                `
                )
                .join("");

    }


    const subtotal =
        calcularSubtotal();


    if (carritoSubtotal) {

        carritoSubtotal.textContent =
            formatearPrecio(subtotal);

    }


    if (botonFinalizar) {

        botonFinalizar.disabled =
            carritoCompra.length === 0;

    }


    actualizarContador();

}


// =====================================
// CARGAR PRODUCTOS DESDE SUPABASE
// =====================================

async function cargarProductos() {

    const catalogo =
        document.getElementById(
            "catalogoProductos"
        );

    if (!catalogo) return;


    catalogo.innerHTML = `

        <div class="cargando-productos">

            <p>
                Cargando colección...
            </p>

        </div>

    `;


    if (
        typeof supabaseClient === "undefined"
    ) {

        console.error(
            "Supabase no está disponible."
        );

        catalogo.innerHTML = `

            <div class="error-productos">

                <p>
                    No se pudo conectar con el catálogo.
                </p>

            </div>

        `;

        return;

    }


    const { data, error } =
        await supabaseClient
            .from("productos")
            .select("*")
            .eq("disponible", true)
            .order("orden", {
                ascending: true
            })
            .order("created_at", {
                ascending: true
            });


    if (error) {

        console.error(
            "Error cargando productos:",
            error
        );

        catalogo.innerHTML = `

            <div class="error-productos">

                <p>
                    No se pudieron cargar los productos.
                </p>

            </div>

        `;

        return;

    }


    if (!data || data.length === 0) {

        catalogo.innerHTML = `

            <div class="catalogo-vacio">

                <p>
                    Actualmente no hay productos disponibles.
                </p>

            </div>

        `;

        return;

    }


    catalogo.innerHTML =
        data
            .map(
                (producto) => {

                    const id =
                        String(producto.id);

                    const nombre =
                        producto.nombre ||
                        "Producto";

                    const precio =
                        Number(producto.precio) || 0;

                    const categoria =
                        producto.categoria ||
                        "JOYERÍA";

                    const descripcion =
                        producto.descripcion ||
                        "Pieza de joyería artesanal Wepora.";

                    const imagen =
                        producto.imagen ||
                        "img/logo2.png";

                    const stock =
                        Math.max(
                            0,
                            Number(producto.stock) || 0
                        );

                    const agotado =
                        stock <= 0;


                    return `

                        <article
                            class="producto animar"
                            data-id="${id}"
                            data-nombre="${escapeHTML(nombre)}"
                            data-precio="${precio}"
                            data-stock="${stock}"
                        >

                            <div class="producto-imagen">

                                <img
                                    src="${escapeHTML(imagen)}"
                                    alt="${escapeHTML(nombre)}"
                                    class="imagen-ampliable"
                                    loading="lazy"
                                >

                            </div>


                            <div class="producto-info">

                                <p class="producto-categoria">
                                    ${escapeHTML(categoria)}
                                </p>


                                <h3>
                                    ${escapeHTML(nombre)}
                                </h3>


                                <p>
                                    ${escapeHTML(descripcion)}
                                </p>


                                <p class="producto-precio">
                                    $${new Intl.NumberFormat(
                                        "es-CO"
                                    ).format(precio)} COP
                                </p>


                                <p
                                    class="producto-stock ${
                                        agotado
                                            ? "agotado"
                                            : ""
                                    }"
                                >

                                    ${
                                        agotado
                                            ? "Agotado"
                                            : `Stock: ${stock} ${
                                                stock === 1
                                                    ? "unidad"
                                                    : "unidades"
                                            }`
                                    }

                                </p>


                                <button
                                    class="boton-agregar"
                                    data-id="${id}"
                                    type="button"
                                    ${agotado ? "disabled" : ""}
                                >

                                    ${
                                        agotado
                                            ? "AGOTADO"
                                            : "AGREGAR AL CARRITO"
                                    }

                                </button>

                            </div>

                        </article>

                    `;

                }
            )
            .join("");


    activarAnimacionesProductos();

}


// =====================================
// PROTEGER TEXTO GENERADO EN HTML
// =====================================

function escapeHTML(texto) {

    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// =====================================
// ANIMACIONES DE PRODUCTOS DINÁMICOS
// =====================================

function activarAnimacionesProductos() {

    const elementos =
        document.querySelectorAll(
            "#catalogoProductos .animar"
        );


    if (
        !("IntersectionObserver" in window)
    ) {

        elementos.forEach(
            (elemento) => {

                elemento.classList.add(
                    "visible"
                );

            }
        );

        return;

    }


    const observador =
        new IntersectionObserver(
            (entradas) => {

                entradas.forEach(
                    (entrada) => {

                        if (
                            entrada.isIntersecting
                        ) {

                            entrada.target.classList.add(
                                "visible"
                            );

                            observador.unobserve(
                                entrada.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    elementos.forEach(
        (elemento) => {

            observador.observe(
                elemento
            );

        }
    );

}


// =====================================
// OBTENER STOCK ACTUAL DE UN PRODUCTO
// =====================================

async function obtenerStockProducto(id) {

    if (
        typeof supabaseClient === "undefined"
    ) {

        return null;

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from("productos")
            .select("stock, disponible")
            .eq("id", id)
            .single();


    if (error) {

        console.error(
            "Error consultando stock:",
            error
        );

        return null;

    }


    return data;

}


// =====================================
// AGREGAR PRODUCTO AL CARRITO
// =====================================
// Se utiliza delegación de eventos porque
// los productos vienen de Supabase.

if (document.body) {

    document.body.addEventListener(
        "click",
        async (evento) => {

            const boton =
                evento.target.closest(
                    ".boton-agregar"
                );


            if (!boton) return;


            if (boton.disabled) return;


            const productoHTML =
                boton.closest(".producto");


            if (!productoHTML) return;


            const id =
                productoHTML.dataset.id;


            const nombre =
                productoHTML
                    .querySelector("h3")
                    ?.textContent
                    .trim()
                    || "Producto";


            const precio =
                Number(
                    productoHTML.dataset.precio
                );


            const imagen =
                productoHTML
                    .querySelector("img")
                    ?.getAttribute("src")
                    || "";


            // Consultar stock real

            const productoSupabase =
                await obtenerStockProducto(id);


            if (
                !productoSupabase ||
                !productoSupabase.disponible
            ) {

                alert(
                    "Este producto ya no está disponible."
                );

                await cargarProductos();

                return;

            }


            const stockDisponible =
                Math.max(
                    0,
                    Number(
                        productoSupabase.stock
                    ) || 0
                );


            if (stockDisponible <= 0) {

                alert(
                    "Este producto está agotado."
                );

                await cargarProductos();

                return;

            }


            const productoExistente =
                carritoCompra.find(
                    (producto) =>
                        String(producto.id) ===
                        String(id)
                );


            if (productoExistente) {

                if (
                    productoExistente.cantidad >=
                    stockDisponible
                ) {

                    alert(
                        `Solo hay ${stockDisponible} ${
                            stockDisponible === 1
                                ? "unidad"
                                : "unidades"
                        } disponibles.`
                    );

                    return;

                }


                productoExistente.cantidad += 1;

                productoExistente.stock =
                    stockDisponible;

            } else {

                carritoCompra.push({

                    id: id,

                    nombre: nombre,

                    precio: precio,

                    imagen: imagen,

                    cantidad: 1,

                    stock: stockDisponible

                });

            }


            guardarCarrito();

            mostrarCarrito();


            // Animación del botón

            boton.classList.add(
                "agregado"
            );


            const textoOriginal =
                boton.textContent;


            boton.textContent =
                "✓ AGREGADO";


            setTimeout(
                () => {

                    boton.classList.remove(
                        "agregado"
                    );

                    boton.textContent =
                        textoOriginal;

                },
                1000
            );


            abrirCarrito();

        }
    );

}


// =====================================
// CONTROLES DEL CARRITO
// =====================================

if (carritoProductos) {

    carritoProductos.addEventListener(
        "click",
        async (evento) => {

            const boton =
                evento.target.closest(
                    "button"
                );


            if (!boton) return;


            const id =
                boton.dataset.id;


            if (!id) return;


            // =================================
            // AUMENTAR
            // =================================

            if (
                boton.classList.contains(
                    "aumentar-cantidad"
                )
            ) {

                const producto =
                    carritoCompra.find(
                        (item) =>
                            String(item.id) ===
                            String(id)
                    );


                if (!producto) return;


                const productoSupabase =
                    await obtenerStockProducto(id);


                if (
                    !productoSupabase ||
                    !productoSupabase.disponible
                ) {

                    alert(
                        "Este producto ya no está disponible."
                    );

                    carritoCompra =
                        carritoCompra.filter(
                            (item) =>
                                String(item.id) !==
                                String(id)
                        );

                    guardarCarrito();

                    mostrarCarrito();

                    return;

                }


                const stockDisponible =
                    Math.max(
                        0,
                        Number(
                            productoSupabase.stock
                        ) || 0
                    );


                if (
                    producto.cantidad >=
                    stockDisponible
                ) {

                    alert(
                        `Solo hay ${stockDisponible} ${
                            stockDisponible === 1
                                ? "unidad"
                                : "unidades"
                        } disponibles.`
                    );

                    return;

                }


                producto.cantidad += 1;

                producto.stock =
                    stockDisponible;

            }


            // =================================
            // DISMINUIR
            // =================================

            if (
                boton.classList.contains(
                    "disminuir-cantidad"
                )
            ) {

                const producto =
                    carritoCompra.find(
                        (item) =>
                            String(item.id) ===
                            String(id)
                    );


                if (producto) {

                    producto.cantidad -= 1;


                    if (
                        producto.cantidad <= 0
                    ) {

                        carritoCompra =
                            carritoCompra.filter(
                                (item) =>
                                    String(item.id) !==
                                    String(id)
                            );

                    }

                }

            }


            // =================================
            // ELIMINAR
            // =================================

            if (
                boton.classList.contains(
                    "eliminar-item"
                )
            ) {

                carritoCompra =
                    carritoCompra.filter(
                        (item) =>
                            String(item.id) !==
                            String(id)
                    );

            }


            guardarCarrito();

            mostrarCarrito();

        }
    );

}


// =====================================
// VACIAR CARRITO
// =====================================

if (botonVaciar) {

    botonVaciar.addEventListener(
        "click",
        () => {

            if (
                carritoCompra.length === 0
            ) {

                return;

            }


            const confirmar =
                confirm(
                    "¿Quieres vaciar el carrito?"
                );


            if (!confirmar) return;


            carritoCompra = [];


            guardarCarrito();

            mostrarCarrito();

        }
    );

}


// =====================================
// FINALIZAR COMPRA POR WHATSAPP
// =====================================

if (botonFinalizar) {

    botonFinalizar.addEventListener(
        "click",
        async () => {

            if (
                carritoCompra.length === 0
            ) {

                return;

            }


            // Verificar stock antes de enviar

            for (
                const producto of carritoCompra
            ) {

                const productoSupabase =
                    await obtenerStockProducto(
                        producto.id
                    );


                if (
                    !productoSupabase ||
                    !productoSupabase.disponible
                ) {

                    alert(
                        `${producto.nombre} ya no está disponible.`
                    );

                    return;

                }


                const stockDisponible =
                    Number(
                        productoSupabase.stock
                    ) || 0;


                if (
                    producto.cantidad >
                    stockDisponible
                ) {

                    alert(
                        `${producto.nombre}: solo quedan ${stockDisponible} ${
                            stockDisponible === 1
                                ? "unidad"
                                : "unidades"
                        } disponibles.`
                    );

                    return;

                }

            }


            let mensaje =
                "Hola, Wepora. Quiero realizar el siguiente pedido:%0A%0A";


            carritoCompra.forEach(
                (producto) => {

                    const subtotalProducto =
                        producto.precio *
                        producto.cantidad;


                    mensaje +=
                        `• ${producto.nombre} × ${producto.cantidad} — ${formatearPrecio(subtotalProducto)}%0A`;

                }
            );


            const subtotal =
                calcularSubtotal();


            mensaje +=
                `%0A*Total: ${formatearPrecio(subtotal)}*`;


            mensaje +=
                "%0A%0A¿Cómo puedo continuar con la compra?";


            const urlWhatsApp =
                `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;


            window.open(
                urlWhatsApp,
                "_blank"
            );

        }
    );

}


// =====================================
// VISOR DE IMÁGENES
// =====================================

const visorImagen =
    document.getElementById(
        "visorImagen"
    );

const imagenAmpliada =
    document.getElementById(
        "imagenAmpliada"
    );

const cerrarVisor =
    document.getElementById(
        "cerrarVisor"
    );


// =====================================
// ABRIR VISOR
// =====================================

if (document.body) {

    document.body.addEventListener(
        "click",
        (evento) => {

            const imagen =
                evento.target.closest(
                    ".imagen-ampliable"
                );


            if (!imagen) return;

            if (!visorImagen) return;


            imagenAmpliada.src =
                imagen.src;


            imagenAmpliada.alt =
                imagen.alt;


            visorImagen.classList.add(
                "activo"
            );


            document.body.style.overflow =
                "hidden";

        }
    );

}


function cerrarVisorImagen() {

    if (!visorImagen) return;


    visorImagen.classList.remove(
        "activo"
    );


    if (
        !document.body.classList.contains(
            "carrito-abierto"
        )
    ) {

        document.body.style.overflow =
            "";

    }

}


if (cerrarVisor) {

    cerrarVisor.addEventListener(
        "click",
        cerrarVisorImagen
    );

}


if (visorImagen) {

    visorImagen.addEventListener(
        "click",
        (evento) => {

            if (
                evento.target ===
                visorImagen
            ) {

                cerrarVisorImagen();

            }

        }
    );

}


// =====================================
// TECLA ESCAPE
// =====================================

document.addEventListener(
    "keydown",
    (evento) => {

        if (
            evento.key === "Escape"
        ) {

            cerrarPanelCarrito();


            if (
                visorImagen?.classList.contains(
                    "activo"
                )
            ) {

                cerrarVisorImagen();

            }

        }

    }
);


// =====================================
// INICIAR
// =====================================

mostrarCarrito();


if (
    document.getElementById(
        "catalogoProductos"
    )
) {

    cargarProductos();

}


// =====================================
// ANIMACIONES AL HACER SCROLL
// =====================================

const elementosAnimados =
    document.querySelectorAll(".animar");


if ("IntersectionObserver" in window) {

    const observador =
        new IntersectionObserver(
            (entradas) => {

                entradas.forEach((entrada) => {

                    if (
                        entrada.isIntersecting
                    ) {

                        entrada.target.classList.add(
                            "visible"
                        );

                        observador.unobserve(
                            entrada.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    elementosAnimados.forEach((elemento) => {

        observador.observe(elemento);

    });

} else {

    elementosAnimados.forEach((elemento) => {

        elemento.classList.add("visible");

    });

}