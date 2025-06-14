const carrito = [];

function agregarAlCarrito(nombre, precio) {
  const producto = carrito.find(p => p.nombre === nombre);
  if (producto) {
    producto.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  renderizarCarrito();
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  renderizarCarrito();
}

function actualizarCantidad(index, cantidad) {
  carrito[index].cantidad = parseInt(cantidad) || 1;
  renderizarCarrito();
}

function vaciarCarrito() {
  carrito.length = 0;
  renderizarCarrito();
}

function renderizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.classList.add("carrito-item");
    li.innerHTML = `
      <span class="producto-nombre">${producto.nombre}</span>
      <span class="producto-precio">$${producto.precio.toLocaleString()}</span>
      <input class="input-cantidad" type="number" min="1" value="${producto.cantidad}" onchange="actualizarCantidad(${index}, this.value)">
      <button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    total += producto.precio * producto.cantidad;
    lista.appendChild(li);
  });

  document.getElementById("total").textContent = `Total: $${total.toLocaleString()}`;
}
