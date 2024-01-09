function agregarFila() {
    var tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];
     var nuevaFila = tabla.insertRow();
    
     for (var i = 0; i < 9; i++) {
          var celda = nuevaFila.insertCell(i);
          var contenido = "";
    
            if (i === 0) {
                contenido = "<div contenteditable='true'></div>";
            } else if (i === 1) {
                contenido = "<select>";
                for (var j = 1; j <= 7; j++) {
                    contenido += "<option value='" + j + "'>" + j + "</option>";
                }
                contenido += "</select>";
            } else if (i === 2) {
                contenido = "52";
            } else if (i === 3) {
                contenido = "<select>";
                for (var k = 0; k <= 20; k++) {
                    contenido += "<option value='" + k + "'>" + k + "</option>";
                }
                contenido += "</select>";
            } else if (i === 4) {
     contenido = "<select><option value='0'>0</option><option value='15'>15</option></select>";
            } else if (i === 5) {
                contenido = "<select>";
                for (var l = 1; l <= 9; l++) {
                    contenido += "<option value='" + l + "'>" + l + "</option>";
                }
                contenido += "</select>";
            } else if (i === 6) {
    contenido = "<select><option value='1'>1 hora</option><option 
    value='0.5'>30 minutos</option><option value='0'>0</option</select>";
            } else if (i === 7) {
    contenido = "<select><option value='0.65'>65%</option><option value='0.70'>70%</option></select>";
            } else if (i === 8) {
                contenido = "";
            } else {
                contenido = "Editar";
            }
    
            celda.innerHTML = contenido;
            if (i !== 0 && i !== 1 && i !== 8) {
         celda.setAttribute("contenteditable", true);
            }
        }
    
        calcularCargaLaboral(nuevaFila);
    }
    
    function calcularCargaLaboral(fila) {
        var diasLaboralesSemana = parseInt(fila.cells[1].querySelector('select').value);
        var semanasAnio = parseInt(fila.cells[2].innerHTML);
        var diasFestivos = parseInt(fila.cells[3].querySelector('select').value);
        var vacaciones = parseInt(fila.cells[4].querySelector('select').value);
        var horasLaboralesDiarios = parseInt(fila.cells[5].querySelector('select').value);
        var horaComida = parseFloat(fila.cells[6].querySelector('select').value);
        var productividad = parseFloat(fila.cells[7].querySelector('select').value);
     var cargaLaboral = (((diasLaboralesSemana * semanasAnio) - (diasFestivos + vacaciones))*(horasLaboralesDiarios - horaComida) * productividad)/12;
    
        var celdaCargaLaboral = fila.cells[8];
        celdaCargaLaboral.innerHTML = cargaLaboral.toFixed(2);
    }
    
    document.getElementById("tabla").addEventListener('change', function(event) {
        var fila = event.target.closest('tr');
        if (fila) {
            calcularCargaLaboral(fila);
        }
    });
    function ordenarTrabajadoresPorCarga() {
        var trabajadores = [];
    
        var filas = document.getElementById("tabla").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    
        for (var i = 0; i < filas.length; i++) {
            var nombre = filas[i].cells[0].innerText.trim();
            var cargaLaboral = parseFloat(filas[i].cells[8].innerText.trim());
            trabajadores.push({ nombre: nombre, cargaLaboral: cargaLaboral });
        }
    
        trabajadores.sort((a, b) => b.cargaLaboral - a.cargaLaboral);
    
        var nuevaTabla = document.createElement("table");
        nuevaTabla.id = "tablaOrdenada";
        var thead = document.createElement("thead");
        var tr = document.createElement("tr");
        var thNombre = document.createElement("th");
        thNombre.textContent = "Trabajadores";
        var thCargaLaboral = document.createElement("th");
        thCargaLaboral.textContent = "Carga Laboral";
        tr.appendChild(thNombre);
        tr.appendChild(thCargaLaboral);
        thead.appendChild(tr);
        nuevaTabla.appendChild(thead);
    
        var tbody = document.createElement("tbody");
        trabajadores.forEach((trabajador) => {
            var fila = document.createElement("tr");
            var celdaNombre = document.createElement("td");
            celdaNombre.textContent = trabajador.nombre;
            fila.appendChild(celdaNombre);
    
            var celdaCargaLaboral = document.createElement("td");
            celdaCargaLaboral.textContent = trabajador.cargaLaboral;
            fila.appendChild(celdaCargaLaboral);
    
            tbody.appendChild(fila);
        });
        nuevaTabla.appendChild(tbody);
    
        document.body.appendChild(nuevaTabla);
    }
    window.onload = function() {
        ordenarTrabajadoresPorCarga();
    };
      