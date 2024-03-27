
var NoMetas = 0;
var TotalPonderaciones =0;
var arrayListadoMetas = {};
var arrayListadoHitoMetas = {};
//
var MetasSinValidar=0;
var MetasValidadas=0;
var MetasPendientesdeValidar=0;
var MetasCalificada=0;
//
var FechaActual = 0;
var FechaLimite = 0;
//
$(document).ready(function(){
	BuscarEmpleadoLogeado();
	CargaEmpresa();
	
})

/*-------------------------*/


function BuscarEmpleadoLogeado(){
	var empleado = $("#txtNumEmpleadoLogeado").val()
	if(empleado.replace(/\s/g,"") != ""){
	
		//LimpiarCampos();
		$.ajax({
            type: "POST",
            data: {
                param: 1,
				empleado: empleado 
            },
            url: "../utileria.php",
            dataType: 'JSON',
             success: function(data) {
				if(data.length){
					for(i=0;i<data.length;i++){
						$("#NombreCont2").text(data[i]['Nombre']);
						$("#NombreCont").text(data[i]['Nombre']);
					}
				}
				
			}
		});
	
	}else{
		alert("Favor de Agregar un numero de empleado.");
		CerrarSesion();
		
	}
}

function CerrarSesion(){
	$.ajax({
			type: "POST",
			//async: false,
			data: {
			  param: 7
			},
			
			url: "../utileria.php", 
		    dataType: 'JSON',
			success: function(data) {
				$('.cargando').hide(); // Oculta la imagen de cargando 
				if(data.length){
					window.location='../index.php';
				}
				
				
			}
		});
	
}
