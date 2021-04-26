//Función de Selección Automático
function opcion1() {
  document.getElementById("manual").style.display = "none";
  document.getElementById("manual").style.visibility = "hidden";

  var op1 = document.getElementById("config1");
  var op2 = document.getElementById("config2");

  op1.style.background = "rgb(116,0,184)";
  op1.style.color = "white";

  op2.style.background = "white";
  op2.style.color = "black";
}

//Función de Selección Manual
function opcion2() {
  document.getElementById("manual").style.display = "block";
  document.getElementById("manual").style.visibility = "visible";

  var op1 = document.getElementById("config1");
  var op2 = document.getElementById("config2");

  op1.style.background = "white";
  op1.style.color = "black";

  op2.style.background = "rgb(116,0,184)";
  op2.style.color = "white";
}

//Función de Selección Auditiva
function opcionA() {
  console.log("opcion A");
  var opA = document.getElementById("configA");
  var opB = document.getElementById("configB");
  var opC = document.getElementById("configC");

  opA.style.background = "rgb(116,0,184)";
  opA.style.color = "white";

  opB.style.background = "white";
  opB.style.color = "black";

  opC.style.background = "white";
  opC.style.color = "black";
}

//Función de Selección Visual
function opcionB() {
  var opA = document.getElementById("configA");
  var opB = document.getElementById("configB");
  var opC = document.getElementById("configC");

  opA.style.background = "white";
  opA.style.color = "black";

  opB.style.background = "rgb(116,0,184)";
  opB.style.color = "white";

  opC.style.background = "white";
  opC.style.color = "black";
}

//Función de Selección Ambas
function opcionC() {
  var opA = document.getElementById("configA");
  var opB = document.getElementById("configB");
  var opC = document.getElementById("configC");

  opA.style.background = "white";
  opA.style.color = "black";

  opB.style.background = "white";
  opB.style.color = "black";

  opC.style.background = "rgb(116,0,184)";
  opC.style.color = "white";
}
