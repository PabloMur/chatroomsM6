let nombre = prompt("Ingrese nombre");
document.write(`Nombre del Cliente: ${nombre} <br></br>`);
let articulo = prompt("Ingrese artículo");
document.write(`Articulos seleccionados: ${articulo} <br></br>`);
let articuloPrecio = parseFloat(prompt("Precio del articuló"));
document.write(`Precio del articulo: $${articuloPrecio} <br></br>`);
let cantidadArticulo = parseInt(prompt("Cantidad de artículos"));
document.write(`Cantidad de artículos: ${cantidadArticulo} <br></br>`);

const descuentoUno = 0.2;
const descuentoDos = 0.1;
const iva = 1.21;
const subTotal = articuloPrecio * cantidadArticulo;
const descuentoUnoAplicado = subTotal * descuentoUno;
const descuentoDosAplicado = subTotal * descuentoDos;
// const total = subTotal -;

if (subTotal >= 1000) {
    document.write(`Descuento del 20%: $${descuentoUnoAplicado}<br></br>
  Total a pagar:${(subTotal - descuentoUnoAplicado) * iva}`);
} else if (subTotal >= 500) {
    document.write(`Descuento del 10%: $${descuentoDosAplicado}<br></br>
  Total a pagar: $${total - descuentoDosAplicado}`);
} else {
    document.write(`Total a pagar: $${total}<br></br>`);
}