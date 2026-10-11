
let carrito = [];

function agregarProducto(nombre, precio) {
    const producto = carrito.find(item => item.nombre === nombre);

    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    mostrarCarrito();
}

function eliminarProducto(nombre) {
    const producto = carrito.find(item => item.nombre === nombre);

    if (producto) {
        producto.cantidad--;

        if (producto.cantidad <= 0) {
            carrito = carrito.filter(item => item.nombre !== nombre);
        }
    }

    mostrarCarrito();
}

function mostrarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const cantidad = document.getElementById("cantidad");
    const totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    let total = 0;
    let unidades = 0;

    if (carrito.length === 0) {
        lista.innerHTML = '<p class="vacio">Tu carrito está vacío 🛒</p>';
    }

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;
        unidades += producto.cantidad;

        const elemento = document.createElement("div");
        elemento.className = "item-carrito";

        const informacion = document.createElement("span");
        informacion.textContent =
            `${producto.nombre} × ${producto.cantidad} — S/ ${subtotal.toFixed(2)}`;

        const boton = document.createElement("button");
        boton.textContent = "Quitar";
        boton.type = "button";
        boton.addEventListener("click", () => {
            eliminarProducto(producto.nombre);
        });

        elemento.appendChild(informacion);
        elemento.appendChild(boton);
        lista.appendChild(elemento);
    });

    cantidad.textContent = unidades;
    totalElemento.textContent = `S/ ${total.toFixed(2)}`;
}

function finalizarPedido() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega algún producto primero.");
        return;
    }

    let resumen = "RESUMEN DE TU PEDIDO\n\n";
    let total = 0;

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;

        resumen += `${producto.nombre} x ${producto.cantidad}: S/ ${subtotal.toFixed(2)}\n`;
        total += subtotal;
    });

    resumen += `\nTOTAL: S/ ${total.toFixed(2)}`;
    resumen += "\n\nEste es un pedido de demostración.";

    alert(resumen);
}

mostrarCarrito();
