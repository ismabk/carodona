let encenderMaquina = false;
let frutaGuardada;
let peso;
let total = 0;
let flagPeso = false;
let flagPesado = false;
let flagCobrar = false;

let arrayFrutas = [
  { nombre: "fresa", precio: 2.9, peso: 0, importe: 0 },
  { nombre: "cantalupe", precio: 4, peso: 0, importe: 0 },
  { nombre: "cereza", precio: 2, peso: 0, importe: 0 },
  { nombre: "coco", precio: 3.2, peso: 0, importe: 0 },
  { nombre: "kiwi", precio: 2.5, peso: 0, importe: 0 },
  { nombre: "mango", precio: 6, peso: 0, importe: 0 },
  { nombre: "manzana", precio: 1.8, peso: 0, importe: 0 },
  { nombre: "melecoton", precio: 1.9, peso: 0, importe: 0 },
  { nombre: "melon", precio: 2, peso: 0, importe: 0 },
  { nombre: "naranja", precio: 1, peso: 0, importe: 0 },
  { nombre: "peras", precio: 0.5, peso: 0, importe: 0 },
  { nombre: "piña", precio: 2.3, peso: 0, importe: 0 },
  { nombre: "platano", precio: 1.9, peso: 0, importe: 0 },
  { nombre: "sandia", precio: 2.1, peso: 0, importe: 0 },
  { nombre: "ciruela", precio: 1.4, peso: 0, importe: 0 },
];

function encender() {
  if (encenderMaquina === false) {
    console.log("Encendiendo");
    document.getElementById("maquina").classList.add("encenderMaquina");
    document.getElementById("btn-nuevo").classList.add("encenderMaquina");
    encenderMaquina = true;
  }
}
function apagar() {
  if (encenderMaquina === true) {
    console.log("Apagando");
    document.getElementById("maquina").classList.remove("encenderMaquina");
    document.getElementById("btn-nuevo").classList.remove("encenderMaquina");
    limpiar();
    encenderMaquina = false;
  }
}
function euro(precio) {
  return precio.toLocaleString("es", {
    style: "currency",
    currency: "EUR",
  });
}
function precio(fruta) {
  frutaGuardada = fruta;
  arrayFrutas.forEach((frut) => {
    if (fruta == frut.nombre) {
      document.getElementById("display__articulo").innerHTML =
        frut.nombre.toUpperCase();
      document.getElementById("display__precio").innerHTML = euro(frut.precio);
      document.getElementById("display__peso").innerHTML = "0.00 Kg";
      document.getElementById("display__total").innerHTML =
        document.getElementById("display__total").innerHTML = euro(
          arrayFrutas.reduce((previous, current) => {
            return (total = previous + current.importe);
          }, 0)
        );
      flagPeso = true;
      flagPesado = false;
    }
  });
}

function pesar() {
  if (flagPeso === true) {
    arrayFrutas.forEach((frut) => {
      if (frutaGuardada === frut.nombre) {
        frut.peso = (Math.random() * 5 + 0.5).toFixed(2);
        document.getElementById("display__peso").innerHTML = `${frut.peso} Kg`;
      }
    });
    flagPesado = true;
  }
}
function codigoBarras() {
  return Math.round(Math.random() * 999999999999 + 100000000000);
}
function limpiar() {
  document.getElementById("display__articulo").innerHTML = "";
  document.getElementById("display__precio").innerHTML = "";
  document.getElementById("display__peso").innerHTML = "";
  document.getElementById("display__total").innerHTML = "";
  arrayFrutas.forEach((frut) => {
    frut.importe = 0;
  });
  document.getElementById("ticket").style.display = "none";
  document.getElementById("cuerpoTicket").innerHTML = `<tr></tr>`;
  total = 0;
  flagPeso = false;
  flagPesado = false;
}
function añadir() {
  if (flagPesado === true) {
    arrayFrutas.forEach((frut) => {
      if (frutaGuardada === frut.nombre && frut.importe === 0) {
        frut.importe = frut.peso * frut.precio;
      }
      document.getElementById("display__total").innerHTML = euro(
        arrayFrutas.reduce((previous, current) => {
          return (total = previous + current.importe);
        }, 0)
      );
    });
  }
}

function cobrar() {
  arrayFrutas.forEach((frut) => {
    if (frut.importe !== 0) {
      flagCobrar = true;
    }
  });
  if (flagCobrar) {
    if (confirm("Desea generar el ticket de compra?")) {
      document.getElementById("ticket").style.display = "block";
      let fecha = new Date();
      document.getElementById(
        "fecha"
      ).innerHTML = `Fecha: ${fecha.toLocaleString()}`;
      arrayFrutas.forEach((frut) => {
        if (frut.importe !== 0) {
          document.getElementById(
            "cuerpoTicket"
          ).innerHTML += `<tr><td>${frut.nombre.toUpperCase()}</td><td>${
            frut.peso
          }</td><td>${frut.precio}</td><td>${frut.importe.toFixed(
            2
          )}</td></tr>`;
        }
      });
      document.getElementById(
        "cuerpoTicket"
      ).innerHTML += `<tr class="border border-bottom-0 border-end-0 border-start-0"><td colspan="2"></td><td>Total:</td><td>${euro(
        total
      )}</td></tr>`;
    }
  }
}

function generarcodigobarras() {
  const svg = document.querySelector("svg");
  svg.setAttribute("jsbarcode-value", generateUPCA().toString());
  JsBarcode(".barcode").init();
}

function generateUPCA() {
  let upc = "";
  for (let i = 0; i < 11; i++) {
    upc += Math.floor(Math.random() * 10);
  }
  let sum =
    (parseInt(upc[0]) +
      parseInt(upc[2]) +
      parseInt(upc[4]) +
      parseInt(upc[6]) +
      parseInt(upc[8]) +
      parseInt(upc[10])) *
    3;
  sum +=
    parseInt(upc[1]) +
    parseInt(upc[3]) +
    parseInt(upc[5]) +
    parseInt(upc[7]) +
    parseInt(upc[9]);
  let checkDigit = (10 - (sum % 10)) % 10;
  return upc + checkDigit;
}
