function calcularIMC() {
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert("Por favor, ingresa valores válidos para peso y altura.");
        return;
    }

    let imc = peso / (altura * altura);
    let resultadoTexto = "";
    let imagen = "imagenes/defecto.png"; 

    if (imc < 18.5) {
        resultadoTexto = "Bajo peso";
        imagen = "imagenes/bajopeso.png";
    } else if (imc >= 18.5 && imc < 24.9) {
        resultadoTexto = "Peso normal";
        imagen = "imagenes/normal.png";
    } else if (imc >= 25 && imc < 29.9) {
        resultadoTexto = "Sobrepeso";
        imagen = "imagenes/sobrepeso.png";
    } else {
        resultadoTexto = "Obesidad";
        imagen = "imagenes/obesidad.png";
    }

    document.getElementById("resultado").innerText = `IMC: ${imc.toFixed(2)} - ${resultadoTexto}`;
    document.getElementById("imagen-resultado").src = imagen;
}
