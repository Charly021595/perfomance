
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
	$("#txtFechaRetroalimentacion1").val("");
	$("#txtFechaRetroalimentacion2").val("");
	$("#txtFechaRetroalimentacion3").val("");
	
	//RevisarEstatusPeriodo();
	//ValidarFechas();
	BuscarListadoEmpleado()
})


function BuscarListadoEmpleado(){
	debugger;
	var empleado = $("#txtNumEmpleadoLogeado").val();
	if(empleado.replace(/\s/g,"") != ""){
		
		//LimpiarCampos();
		$.ajax({
            type: "POST",
            data: {
                param: 9,
				empleado: empleado 
            },
            url: "../utileria.php",
            dataType: 'JSON',
             success: function(data) {
				if(data.length){
					var Encabezado = "<option value='0'>Lista de colaboradores</option>";
					$('#txtEmpleadoSeleccionado').append(Encabezado);
					for(i=0;i<data.length;i++){
						var Empleado = "<option value='"+data[i]['Empleado']+"'>"+data[i]['Empleado']+" - "+data[i]['Nombre']+"</option>";
						$('#txtEmpleadoSeleccionado').append(Empleado);
						
					}
				}else{
					if(document.getElementById('#txtEmpleadoSeleccionado') != null){
						document.getElementById('#txtEmpleadoSeleccionado').innerHTML = "";
						var Empleado = "<option value='0'>No cuentas empleados dependientes</option>";
						$('#txtEmpleadoSeleccionado').append(Empleado);
					}
				}
				
			}
		});
	
	}else{
		alert("Favor de Agregar un numero de empleado.");
	}
}
function ValidarFechas(){
	debugger;
	FechaActual = 0;
	FechaLimite = 0;
	FechaLimite1 =0
	//
	var fechaActualL = new Date(); //Fecha actual
	var fechaActual2 = moment(fechaActualL).format("DD-MM-YYYY");
	var anio = fechaActualL.getFullYear(); //obteniendo año
	FechaLimite = '01-03-'+anio;
	FechaLimite1 = '31-05-'+anio;
	FechaLimite2 = '01-06-'+anio;
	FechaLimite3 = '31-08-'+anio;
	FechaLimite4 = '01-09-'+anio;
	FechaLimite5 = '30-11-'+anio;
	FechaActual = fechaActual2;
	FechaLimite= FechaLimite.replace(/-/g, "");
	FechaActual= FechaActual.replace(/-/g, "");
	FechaLimite1= FechaLimite1.replace(/-/g, "");
	FechaLimite2= FechaLimite2.replace(/-/g, "");
	FechaLimite3= FechaLimite3.replace(/-/g, "");
	FechaLimite4= FechaLimite4.replace(/-/g, "");
	FechaLimite5= FechaLimite5.replace(/-/g, "");
	//
	FechaActual = parseInt(FechaActual);
	FechaLimite = parseInt(FechaLimite);
	FechaLimite1 = parseInt(FechaLimite1);
	FechaLimite2 = parseInt(FechaLimite2);
	FechaLimite3 = parseInt(FechaLimite3);
	FechaLimite4 = parseInt(FechaLimite4);
	FechaLimite5 = parseInt(FechaLimite5);
	if(FechaActual > FechaLimite && FechaLimite1 < FechaActual){

		if($("#txtValoresMeta1").val()==""){
			$("#txtEvaluacionMeta1").attr("disabled", false);
			$("#txtValoresMeta1").attr("disabled", false);
			$("#txtDesarrolloMeta1").attr("disabled", false);
			$("#txtAsuntosVariosMeta1").attr("disabled", false);
			$("#txtRetroalimentacionSi1").attr("disabled", false);
			$("#txtRetroalimentacionNo1").attr("disabled", false);
			$("#GuardarRetroalimentacion1").attr("disabled", false);
		}
	}else if(FechaActual > FechaLimite2 && FechaLimite3 < FechaActual){
		if($("#txtValoresMeta2").val()==""){		
			$("#txtEvaluacionMeta2").attr("disabled", false);
			$("#txtValoresMeta2").attr("disabled", false);
			$("#txtDesarrolloMeta2").attr("disabled", false);
			$("#txtAsuntosVariosMeta2").attr("disabled", false);
			$("#txtRetroalimentacionSi2").attr("disabled", false);
			$("#txtRetroalimentacionNo2").attr("disabled", false);
			$("#GuardarRetroalimentacion2").attr("disabled", false);
		}					
	}else if(FechaActual > FechaLimite4 && FechaLimite5 < FechaActual){
		if($("#txtValoresMeta3").val()==""){
			$("#txtEvaluacionMeta3").attr("disabled", false);
			$("#txtValoresMeta3").attr("disabled", false);
			$("#txtDesarrolloMeta3").attr("disabled", false);
			$("#txtAsuntosVariosMeta3").attr("disabled", false);
			$("#txtRetroalimentacionSi3").attr("disabled", false);
			$("#txtRetroalimentacionNo3").attr("disabled", false);
			$("#GuardarRetroalimentacion3").attr("disabled", false);
		}
	}else{
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
		if(NumAlerta ==0){
			alert("El periodo de evaluacion ha concluido.");
			NumAlerta =1;
		}
	}
}
function LimpiarCampos(){
	$("#txtEvaluacionMeta1").val("");
	$("#txtValoresMeta1").val("");
	$("#txtDesarrolloMeta1").val("");
	$('input[name="Retroalimentacion1"]').prop('checked', false);
	$("#txtAsuntosVariosMeta1").val("");
	$("#txtEvaluacionMeta2").val("");
	$("#txtValoresMeta2").val("");
	$("#txtDesarrolloMeta2").val("");
	$('input[name="Retroalimentacion2"]').prop('checked', false);
	$("#txtAsuntosVariosMeta2").val("");
	$("#txtEvaluacionMeta3").val("");
	$("#txtValoresMeta3").val("");
	$("#txtDesarrolloMeta3").val("");
	$('input[name="Retroalimentacion3"]').prop('checked', false);
	$("#txtAsuntosVariosMeta3").val("");	
	$("#txtFechaRetroalimentacion1").val("");
	$("#txtFechaRetroalimentacion2").val("");
	$("#txtFechaRetroalimentacion3").val("");
	
}
function RevisarEstatusPeriodo(){
	debugger;
	var empleado = $("#txtEmpleadoSeleccionado").val();
	LimpiarCampos();
	if(empleado.replace(/\s/g,"") != "0"){
		$.ajax({
			type: "POST",
			data: {
				param: 18,
				empleado: empleado 
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
							param: 19,
							empleado: empleado,
							evaluacion: 1
						
						},
						url: "../utileria.php",
						dataType: 'JSON',
						 success: function(data) {
							if(data.length != 0){
								
								$("#txtEvaluacionMeta2").val("");
								$("#txtValoresMeta2").val("");
								$("#txtDesarrolloMeta2").val("");
								$('input[name="Retroalimentacion2"]').prop('checked', false);
								$("#txtAsuntosVariosMeta1").val("");
								
								/*------------*/
								$("#txtEvaluacionMeta1").val(data[0]['EvaluacionMetaAnual']);
								$("#txtValoresMeta1").val(data[0]['Valores']);
								$("#txtDesarrolloMeta1").val(data[0]['Desarrollo']);
								$("#txtFechaRetroalimentacion1").val(data[0]['FechaInsercion']);
								$("#txtAsuntosVariosMeta1").val(data[0]['AsuntosVarios']);
								if(data[0]['Retroalimentacion'] ==0){
									
									$("#txtRetroalimentacionNo1").prop('checked', true);
								}else{
									$("#txtRetroalimentacionSi1").prop('checked', true);
								
								}
								$('input[name="Retroalimentacion2"]').prop('checked', false);
								/*------------*/
								
								$.ajax({
									type: "POST",
									data: {
										param: 19,
										empleado: empleado,
										evaluacion: 2
									
									},
									url: "../utileria.php",
									dataType: 'JSON',
									 success: function(data) {
										if(data.length != 0){
											
											$("#txtEvaluacionMeta2").val("");
											$("#txtValoresMeta2").val("");
											$("#txtDesarrolloMeta2").val("");
											$('input[name="Retroalimentacion2"]').prop('checked', false);
											$("#txtAsuntosVariosMeta2").val("");
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
													param: 19,
													empleado: empleado,
													evaluacion: 3
												
												},
												url: "../utileria.php",
												dataType: 'JSON',
												 success: function(data) {
													if(data.length != 0){
														
														
														$("#EMenu1").removeClass("active");
														$("#home").removeClass("active in");
														$("#EMenu2").removeClass("active");
														$("#menu2").removeClass("active in");
														$("#EMenu3").addClass("active");
														$("#menu3").addClass("active in");
															
														
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
														
														
														$("#txtEvaluacionMeta3").val("");
														$("#txtValoresMeta3").val("");
														$("#txtDesarrolloMeta3").val("");
														$('input[name="Retroalimentacion3"]').prop('checked', false);
														$("#txtAsuntosVariosMeta3").val("");
														
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
											alert("Aun no guarda retroalimentacion 2.");
											$("#EMenu1").removeClass("active");
											$("#home").removeClass("active in");
											$("#EMenu2").addClass("active");
											$("#menu2").addClass("active in");
											$("#EMenu3").removeClass("active");
											$("#menu3").removeClass("active in");
												
												$("#txtEvaluacionMeta2").val("");
												$("#txtValoresMeta2").val("");
												$("#txtDesarrolloMeta2").val("");
												$('input[name="Retroalimentacion2"]').prop('checked', false);
												
												
										}
										//ValidarFechas();
									}
									
								});
							}else{
								alert("El empleado no ha llenado retroalimentaiones.");
								
								
								
							}
							//ValidarFechas();
						}
					});
					//
					//
				}else if(data[0]['Resultado'] == 2){
					alert("Falta autorizar alguna meta de este empleado.");
					
						
				}else if(data[0]['Resultado'] == 1){
					alert("Falta autorizar alguna meta de este colaborador");
					
						
				}
				//ValidarFechas();
			}
			
		});
	}else{
		alert("Favor de Agregar un numero de empleado.");
	}
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
