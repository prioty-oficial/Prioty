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
  const nuevaCantidad = parseInt(cantidad);
  if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
    carrito[index].cantidad = nuevaCantidad;
  } else {
    carrito[index].cantidad = 1;
  }
  renderizarCarrito();
}

function vaciarCarrito() {
  if (confirm("¿Estás seguro de vaciar el carrito?")) {
    carrito.length = 0;
    renderizarCarrito();
  }
}

function renderizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${producto.nombre}</strong> - $${producto.precio} x</span>
      <input type="number" min="1" value="${producto.cantidad}" onchange="actualizarCantidad(${index}, this.value)">
      <button onclick="eliminarProducto(${index})" class="btn">Eliminar</button>
    `;
    total += producto.precio * producto.cantidad;
    lista.appendChild(li);
  });

  document.getElementById("total").textContent = `Total: $${total.toFixed(2)}`;
}

// Animaciones de scroll (requiere clase .fade-in en HTML)
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");
  const options = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, options);

  faders.forEach(el => {
    appearOnScroll.observe(el);
  });
});
