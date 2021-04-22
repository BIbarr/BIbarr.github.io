function opcion1(){
    document.getElementById("manual").style.display = "none";
    document.getElementById("manual").style.visibility = "hidden";

    var op1 = document.getElementById("config1");
    var op2 = document.getElementById("config2");

    op1.style.background = "rgb(116,0,184)";
    op1.style.color = "white";

    op2.style.background = "white";
    op2.style.color = "black";
}

function opcion2(){
    document.getElementById("manual").style.display = "block";
    document.getElementById("manual").style.visibility = "visible";

    var op1 = document.getElementById("config1");
    var op2 = document.getElementById("config2");

    op1.style.background = "white";
    op1.style.color = "black";

    op2.style.background = "rgb(116,0,184)";
    op2.style.color = "white";
}

function opcionA(){
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

function opcionB(){
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

function opcionC(){
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

number = document.getElementById("nums");

function n0(){
    number.innerHTML = number.innerHTML + "0";
}

function n1(){
    number.innerHTML = number.innerHTML + "1";
}

function n2(){
    number.innerHTML = number.innerHTML + "2";
}

function n3(){
    number.innerHTML = number.innerHTML + "3";
}

function n4(){
    number.innerHTML = number.innerHTML + "4";
}

function n5(){
    number.innerHTML = number.innerHTML + "5";
}

function n6(){
    number.innerHTML = number.innerHTML + "6";
}

function n7(){
    number.innerHTML = number.innerHTML + "7";
}

function n8(){
    number.innerHTML = number.innerHTML + "8";
}

function n9(){
    number.innerHTML = number.innerHTML + "9";
}

function C(){
    number.innerHTML = "";
}

function ok(){
    var res = parseFloat(number.innerHTML);
    number.innerHTML = "";
    console.log(res);
}


