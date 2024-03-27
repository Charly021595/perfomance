var NoAlimento=0;
var NoDatosBioquimicos = 0;

$(document).ready(function () {
	//var empleado = $("#txtNumEmpleado").val();
	BuscarEmpleadoLogeado();
	CargaEmpresa();
});
function CerrarSesion(){
	$.ajax({
			type: "POST",
			//async: false,
			data: {
			  param: 7
			},
			
			url: "utileria.php", 
		    dataType: 'JSON',
			success: function(data) {
				$('.cargando').hide(); // Oculta la imagen de cargando 
				if(data.length){
					window.location='index.php';
				}
				
				
			}
		});
	
}
function BuscarEmpleadoLogeado(){
	var empleado = $("#txtNumEmpleado").val()
	if(empleado.replace(/\s/g,"") != ""){
		
		//LimpiarCampos();
		$.ajax({
            type: "POST",
            data: {
                param: 1,
				empleado: empleado 
            },
            url: "utileria.php",
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


