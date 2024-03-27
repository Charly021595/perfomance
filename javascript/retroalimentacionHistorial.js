
var NoMetas = 0;
var TotalPonderaciones =0;
var arrayListadoMetas = {};
var arrayListadoHitoMetas = {};
//
var FechaActual = 0;
var FechaLimite = 0;
var NumAlerta = 0;
//
$(document).ready(function(){
	BuscarEmpleadoLogeado();
	CargaEmpresa();
	var FechaHoy = new Date();
	var MostrarFechaHoy = moment(FechaHoy).format("DD-MM-YYYY");
	$("#txtFechaRetroalimentacion1").val(MostrarFechaHoy);
	$("#txtFechaRetroalimentacion2").val(MostrarFechaHoy);
	$("#txtFechaRetroalimentacion3").val(MostrarFechaHoy);
	BuscarListadoEmpleado()
	//RevisarEstatusPeriodo();
	//BuscarListadoEmpleado()
	//ValidarFechas();
	
	$("#txtEvaluacionMeta1").attr("disabled", true);
	$("#txtValoresMeta1").attr("disabled", true);
	$("#txtDesarrolloMeta1").attr("disabled", true);
	$("#txtAsuntosVariosMeta1").attr("disabled", true);
	$("#txtRetroalimentacionSi1").attr("disabled", true);
	$("#txtRetroalimentacionNo1").attr("disabled", true);
	$("#GuardarRetroalimentacion1").attr("disabled", true);
	
	$("#txtEvaluacionMeta2").attr("disabled", true);
	$("#txtValoresMeta2").attr("disabled", true);
	$("#txtDesarrolloMeta2").attr("disabled", true);
	$("#txtAsuntosVariosMeta2").attr("disabled", true);
	$("#txtRetroalimentacionSi2").attr("disabled", true);
	$("#txtRetroalimentacionNo2").attr("disabled", true);
	$("#GuardarRetroalimentacion2").attr("disabled", true);
	
	$("#txtEvaluacionMeta3").attr("disabled", true);
	$("#txtValoresMeta3").attr("disabled", true);
	$("#txtDesarrolloMeta3").attr("disabled", true);
	$("#txtAsuntosVariosMeta3").attr("disabled", true);
	$("#txtRetroalimentacionSi3").attr("disabled", true);
	$("#txtRetroalimentacionNo3").attr("disabled", true);
	$("#GuardarRetroalimentacion3").attr("disabled", true);
	
})

function RevisarEstatusPeriodo(){
	debugger;
	var empleado = $("#txtNumEmpleadoLogeado").val();
	var Anio = $("#txtAnioSeleccionado").val();
	/**/
	
	$("#txtEvaluacionMeta1").val("");
	$("#txtValoresMeta1").val("");
	$("#txtDesarrolloMeta1").val("");
	$("#txtAsuntosVariosMeta1").val("");
	$('input[name="Retroalimentacion1"]').prop('checked', false);
	$("#txtEvaluacionMeta2").val("");
	$("#txtValoresMeta2").val("");
	$("#txtDesarrolloMeta2").val("");
	$("#txtAsuntosVariosMeta2").val("");
	$('input[name="Retroalimentacion2"]').prop('checked', false);
	$("#txtEvaluacionMeta3").val("");
	$("#txtValoresMeta3").val("");
	$("#txtDesarrolloMeta3").val("");
	$("#txtAsuntosVariosMeta3").val("");
	$('input[name="Retroalimentacion3"]').prop('checked', false);
	/**/
	//LimpiarCampos();
	$.ajax({
		type: "POST",
		data: {
			param: 26,
			empleado: empleado,
			Anio: Anio 
		},
		url: "../utileria.php",
		dataType: 'JSON',
			success: function(data) {
			if(data[0]['Resultado'] == 3){
				//
				// Validar si ya hay algo de falta de seleccionar 
				$.ajax({
					type: "POST",
					data: {
						param: 27,
						empleado: empleado,
						evaluacion: 1,
						Anio: Anio
					
					},
					url: "../utileria.php",
					dataType: 'JSON',
						success: function(data) {
						if(data.length != 0){ 
							
							$("#txtEvaluacionMeta2").val("");
							$("#txtValoresMeta2").val("");
							$("#txtDesarrolloMeta2").val("");
							$('input[name="Retroalimentacion2"]').prop('checked', false);
							
							
							/*------------*/
							$("#txtEvaluacionMeta1").val(data[0]['EvaluacionMetaAnual']);
							$("#txtValoresMeta1").val(data[0]['Valores']);
							$("#txtDesarrolloMeta1").val(data[0]['Desarrollo']);
							$("#txtFechaRetroalimentacion1").val(data[0]['FechaInsercion']);
							$("#txtAsuntosVariosMeta1").val(data[0]['AsuntosVarios']);
							if(data[0]['Retroalimentacion'] == 0){
								
								$("#txtRetroalimentacionNo1").prop('checked', true);
							}else{
								$("#txtRetroalimentacionSi1").prop('checked', true);
							
							}
							$('input[name="Retroalimentacion2"]').prop('checked', false);
							/*------------*/
							
							$.ajax({
								type: "POST",
								data: {
									param: 27,
									empleado: empleado,
									evaluacion: 2,
									Anio: Anio
								
								},
								url: "../utileria.php",
								dataType: 'JSON',
									success: function(data) {
									if(data.length != 0){
										
										$("#txtEvaluacionMeta2").val("");
										$("#txtValoresMeta2").val("");
										$("#txtDesarrolloMeta2").val("");
										$('input[name="Retroalimentacion2"]').prop('checked', false);
										
										
										//
										$("#txtEvaluacionMeta2").val(data[0]['EvaluacionMetaAnual']);
										$("#txtValoresMeta2").val(data[0]['Valores']);
										$("#txtDesarrolloMeta2").val(data[0]['Desarrollo']);
										$("#txtFechaRetroalimentacion2").val(data[0]['FechaInsercion']);
										$("#txtAsuntosVariosMeta2").val(data[0]['AsuntosVarios']);
										if(data[0]['Retroalimentacion'] ==0){
											
											$("#txtRetroalimentacionNo2").prop('checked', true);
										}else{
											$("#txtRetroalimentacionSi2").prop('checked', true);
										
										}
										//
										$.ajax({
											type: "POST",
											data: {
												param: 27,
												empleado: empleado,
												evaluacion: 3,
												Anio: Anio
											
											},
											url: "../utileria.php",
											dataType: 'JSON',
												success: function(data) {
												if(data.length != 0){
													//alert("Todas las Retroalimentaciones han sido completadas")
													
													$("#EMenu1").removeClass("active");
													$("#home").removeClass("active in");
													$("#EMenu2").removeClass("active");
													$("#menu2").removeClass("active in");
													$("#EMenu3").addClass("active");
													$("#menu3").addClass("active in");
														// sirve para deshabilitar las pestañas
														//$( "#Liga1" ).addClass( "disabled" );
														//$( "#Liga2" ).addClass( "disabled" );
													
													$("#txtEvaluacionMeta3").val("");
													$("#txtValoresMeta3").val("");
													$("#txtDesarrolloMeta3").val("");
													$('input[name="Retroalimentacion3"]').prop('checked', false);
													
													
													$("#txtAsuntosVariosMeta3").val(data[0]['AsuntosVarios']);
													/*------------*/
													$("#txtEvaluacionMeta3").val(data[0]['EvaluacionMetaAnual']);
													$("#txtValoresMeta3").val(data[0]['Valores']);
													$("#txtDesarrolloMeta3").val(data[0]['Desarrollo']);
													$("#txtFechaRetroalimentacion3").val(data[0]['FechaInsercion']);
													if(data[0]['Retroalimentacion'] ==0){
														
														$("#txtRetroalimentacionNo3").prop('checked', true);
													}else{
														$("#txtRetroalimentacionSi3").prop('checked', true);
													
													} 
												}else{
													//alert("Aun no guarda retroalimentacion 3.");
													$("#EMenu1").removeClass("active");
													$("#home").removeClass("active in");
													$("#EMenu2").removeClass("active");
													$("#menu2").removeClass("active in");
													$("#EMenu3").addClass("active");
													$("#menu3").addClass("active in");
														// sirve para deshabilitar las pestañas
														//$( "#Liga1" ).addClass( "disabled" );
														//$( "#Liga2" ).addClass( "disabled" );
													
													$("#txtEvaluacionMeta3").val("");
													$("#txtValoresMeta3").val("");
													$("#txtDesarrolloMeta3").val("");
													$('input[name="Retroalimentacion3"]').prop('checked', false);
													
													
													
													/*------------*/
													$("#txtEvaluacionMeta3").val(data[0]['EvaluacionMetaAnual']);
													$("#txtValoresMeta3").val(data[0]['Valores']);
													$("#txtDesarrolloMeta3").val(data[0]['Desarrollo']);
													$("#txtFechaRetroalimentacion3").val(data[0]['FechaInsercion']);
													if(data[0]['Retroalimentacion'] ==0){
														
														$("#txtRetroalimentacionNo3").prop('checked', true);
													}else{
														$("#txtRetroalimentacionSi3").prop('checked', true);
													
													}
							
												}
												
											}
										});
									}else{
										//alert("Aun no guarda retroalimentacion 2.");
										$("#EMenu1").removeClass("active");
										$("#home").removeClass("active in");
										$("#EMenu2").addClass("active");
										$("#menu2").addClass("active in");
										$("#EMenu3").removeClass("active");
										$("#menu3").removeClass("active in");
											// sirve para deshabilitar las pestañas
											//$( "#Liga1" ).addClass( "disabled" );
											//$( "#Liga3" ).addClass( "disabled" );
											$("#txtEvaluacionMeta2").val("");
											$("#txtValoresMeta2").val("");
											$("#txtDesarrolloMeta2").val("");
											$('input[name="Retroalimentacion2"]').prop('checked', false);
											
											$("#txtEvaluacionMeta1").attr("disabled", true);
											$("#txtValoresMeta1").attr("disabled", true);
											$("#txtDesarrolloMeta1").attr("disabled", true);
											$("#txtAsuntosVariosMeta1").attr("disabled", true);
											$("#txtRetroalimentacionSi1").attr("disabled", true);
											$("#txtRetroalimentacionNo1").attr("disabled", true);
											$("#GuardarRetroalimentacion1").attr("disabled", true);
											
											$("#txtEvaluacionMeta2").attr("disabled", true);
											$("#txtValoresMeta2").attr("disabled", true);
											$("#txtDesarrolloMeta2").attr("disabled", true);
											$("#txtAsuntosVariosMeta2").attr("disabled", true);
											$("#txtRetroalimentacionSi2").attr("disabled", true);
											$("#txtRetroalimentacionNo2").attr("disabled", true);
											$("#GuardarRetroalimentacion2").attr("disabled", true);
											
											$("#txtEvaluacionMeta3").attr("disabled", true);
											$("#txtValoresMeta3").attr("disabled", true);
											$("#txtDesarrolloMeta3").attr("disabled", true);
											$("#txtAsuntosVariosMeta3").attr("disabled", true);
											$("#txtRetroalimentacionSi3").attr("disabled", true);
											$("#txtRetroalimentacionNo3").attr("disabled", true);
											$("#GuardarRetroalimentacion3").attr("disabled", true);
									}
									//ValidarFechas();
								}
								
							});
						}else{
							//alert("Aun no guarda retroalimentacion 1.");
							$("#EMenu1").addClass("active");
							$("#home").addClass("active in");
							$("#EMenu2").removeClass("active");
							$("#menu2").removeClass("active in");
							$("#EMenu3").removeClass("active");
							$("#menu3").removeClass("active in");
							
							// sirve para deshabilitar las pestañas
							//$( "#Liga2" ).addClass( "disabled" );
							//$( "#Liga3" ).addClass( "disabled" );
							$("#txtEvaluacionMeta1").val("");
							$("#txtValoresMeta1").val("");
							$("#txtDesarrolloMeta1").val("");
							$('input[name="Retroalimentacion1"]').prop('checked', false);
							
							$("#txtEvaluacionMeta1").attr("disabled", true);
							$("#txtValoresMeta1").attr("disabled", true);
							$("#txtDesarrolloMeta1").attr("disabled", true);
							$("#txtAsuntosVariosMeta1").attr("disabled", true);
							$("#txtRetroalimentacionSi1").attr("disabled", true);
							$("#txtRetroalimentacionNo1").attr("disabled", true);
							$("#GuardarRetroalimentacion1").attr("disabled", true);
							
							$("#txtEvaluacionMeta2").attr("disabled", true);
							$("#txtValoresMeta2").attr("disabled", true);
							$("#txtDesarrolloMeta2").attr("disabled", true);
							$("#txtAsuntosVariosMeta2").attr("disabled", true);
							$("#txtRetroalimentacionSi2").attr("disabled", true);
							$("#txtRetroalimentacionNo2").attr("disabled", true);
							$("#GuardarRetroalimentacion2").attr("disabled", true);
							
							$("#txtEvaluacionMeta3").attr("disabled", true);
							$("#txtValoresMeta3").attr("disabled", true);
							$("#txtDesarrolloMeta3").attr("disabled", true);
							$("#txtAsuntosVariosMeta3").attr("disabled", true);
							$("#txtRetroalimentacionSi3").attr("disabled", true);
							$("#txtRetroalimentacionNo3").attr("disabled", true);
							$("#GuardarRetroalimentacion3").attr("disabled", true);
						}
						//ValidarFechas();
					}
				});
				//
				//
			}else if(data[0]['Resultado'] == 2){
				//alert("Falta autorizar alguna meta de este empleado.");
				
					$("#txtEvaluacionMeta1").attr("disabled", true);
					$("#txtValoresMeta1").attr("disabled", true);
					$("#txtDesarrolloMeta1").attr("disabled", true);
					$("#txtAsuntosVariosMeta1").attr("disabled", true);
					$("#txtRetroalimentacionSi1").attr("disabled", true);
					$("#txtRetroalimentacionNo1").attr("disabled", true);
					$("#GuardarRetroalimentacion1").attr("disabled", true);
					
					$("#txtEvaluacionMeta2").attr("disabled", true);
					$("#txtValoresMeta2").attr("disabled", true);
					$("#txtDesarrolloMeta2").attr("disabled", true);
					$("#txtAsuntosVariosMeta2").attr("disabled", true);
					$("#txtRetroalimentacionSi2").attr("disabled", true);
					$("#txtRetroalimentacionNo2").attr("disabled", true);
					$("#GuardarRetroalimentacion2").attr("disabled", true);
					
					$("#txtEvaluacionMeta3").attr("disabled", true);
					$("#txtValoresMeta3").attr("disabled", true);
					$("#txtDesarrolloMeta3").attr("disabled", true);
					$("#txtAsuntosVariosMeta3").attr("disabled", true);
					$("#txtRetroalimentacionSi3").attr("disabled", true);
					$("#txtRetroalimentacionNo3").attr("disabled", true);
					$("#GuardarRetroalimentacion3").attr("disabled", true);
			}else if(data[0]['Resultado'] == 1){
				//alert("Falta autorizar alguna meta de este colaborador");
				
					$("#txtEvaluacionMeta1").attr("disabled", true);
					$("#txtValoresMeta1").attr("disabled", true);
					$("#txtDesarrolloMeta1").attr("disabled", true);
					$("#txtAsuntosVariosMeta1").attr("disabled", true);
					$("#txtRetroalimentacionSi1").attr("disabled", true);
					$("#txtRetroalimentacionNo1").attr("disabled", true);
					$("#GuardarRetroalimentacion1").attr("disabled", true);
					
					$("#txtEvaluacionMeta2").attr("disabled", true);
					$("#txtValoresMeta2").attr("disabled", true);
					$("#txtDesarrolloMeta2").attr("disabled", true);
					$("#txtAsuntosVariosMeta2").attr("disabled", true);
					$("#txtRetroalimentacionSi2").attr("disabled", true);
					$("#txtRetroalimentacionNo2").attr("disabled", true);
					$("#GuardarRetroalimentacion2").attr("disabled", true);
					
					$("#txtEvaluacionMeta3").attr("disabled", true);
					$("#txtValoresMeta3").attr("disabled", true);
					$("#txtDesarrolloMeta3").attr("disabled", true);
					$("#txtAsuntosVariosMeta3").attr("disabled", true);
					$("#txtRetroalimentacionSi3").attr("disabled", true);
					$("#txtRetroalimentacionNo3").attr("disabled", true);
					$("#GuardarRetroalimentacion3").attr("disabled", true);
			}
			//ValidarFechas();
		}
		
	});
}

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

function ValidarFecha(){
	FechaActual = 0;
	FechaLimite = 0;
	//
	var fechaActualL = new Date(); //Fecha actual
	var fechaActual2 = moment(fechaActualL).format("DD-MM-YYYY");
	var anio = fechaActualL.getFullYear(); //obteniendo año
	FechaLimite = '01-10-'+anio;
	FechaActual = fechaActual2;
	FechaLimite= FechaLimite.replace(/-/g, "");
	FechaActual= FechaActual.replace(/-/g, "");
	//
	FechaActual = parseInt(FechaActual);
	FechaLimite = parseInt(FechaLimite);
	if(FechaActual > FechaLimite){
		alert("La fecha actual es mayor a la fecha limite de modificación");
		$(".ValidaBoton").prop( "disabled", true ); 
	}
}



function BuscarListadoEmpleado(){
	debugger;
	var empleado = $("#txtNumEmpleadoLogeado").val();
	if(empleado.replace(/\s/g,"") != ""){
	var anioAnterior = 0;	
		//LimpiarCampos();
		$.ajax({
            type: "POST",
            data: {
                param: 24,
				empleado: empleado 
            },
            url: "../utileria.php",
            dataType: 'JSON',
             success: function(data) {
				if(data.length){
					var Encabezado = "<option value='0'>Lista de colaboradores</option>";
					$('#txtAnioSeleccionado').append(Encabezado);
					for(i=0;i<data.length;i++){
						if(anioAnterior != data[i]['Anio']){
							var Anio = "<option value='"+data[i]['Anio']+"'>"+data[i]['Anio']+"</option>";
							$('#txtAnioSeleccionado').append(Anio);
							anioAnterior = data[i]['Anio'];
						}
						
					}
				}else{
					if(document.getElementById('#txtAnioSeleccionado') != null){
						document.getElementById('#txtAnioSeleccionado').innerHTML = "";
						var Anio = "<option value='0'>No cuentas empleados dependientes</option>";
						$('#txtAnioSeleccionado').append(Anio);
					}
				}
				
			}
		});
	
	}else{
		alert("Favor de Agregar un numero de empleado.");
	}
}