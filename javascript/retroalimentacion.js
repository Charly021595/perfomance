
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
	
	RevisarEstatusPeriodo();
	//ValidarFechas();
	
})
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
function RevisarEstatusPeriodo(){
	debugger;
	var empleado = $("#txtNumEmpleadoLogeado").val();
	//LimpiarCampos();
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
							
							$("#txtEvaluacionMeta1").attr("disabled", true);
							$("#txtValoresMeta1").attr("disabled", true);
							$("#txtDesarrolloMeta1").attr("disabled", true);
							$("#txtAsuntosVariosMeta1").attr("disabled", true);
							$("#txtRetroalimentacionSi1").attr("disabled", true);
							$("#txtRetroalimentacionNo1").attr("disabled", true);
							$("#GuardarRetroalimentacion1").attr("disabled", true);
							
							$("#txtEvaluacionMeta2").attr("disabled", false);
							$("#txtValoresMeta2").attr("disabled", false);
							$("#txtDesarrolloMeta2").attr("disabled", false);
							$("#txtAsuntosVariosMeta2").attr("disabled", false);
							$("#txtRetroalimentacionSi2").attr("disabled", false);
							$("#txtRetroalimentacionNo2").attr("disabled", false);
							$("#GuardarRetroalimentacion2").attr("disabled", false);
							
							$("#txtEvaluacionMeta3").attr("disabled", true);
							$("#txtValoresMeta3").attr("disabled", true);
							$("#txtDesarrolloMeta3").attr("disabled", true);
							$("#txtAsuntosVariosMeta3").attr("disabled", true);
							$("#txtRetroalimentacionSi3").attr("disabled", true);
							$("#txtRetroalimentacionNo3").attr("disabled", true);
							$("#GuardarRetroalimentacion3").attr("disabled", true);
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
										
										$("#txtEvaluacionMeta1").attr("disabled", true);
										$("#txtValoresMeta1").attr("disabled", true);
										$("#txtDesarrolloMeta1").attr("disabled", true);
										$("#txtAsuntosVariosMeta1").attr("disabled", true);
										$("#txtRetroalimentacionSi1").attr("disabled", true);
										$("#txtRetroalimentacionNo1").attr("disabled", true);
										$("#GuardarRetroalimentacion1").attr("disabled", true);
										
										$("#txtEvaluacionMeta2").attr("disabled", false);
										$("#txtValoresMeta2").attr("disabled", false);
										$("#txtDesarrolloMeta2").attr("disabled", false);
										$("#txtRetroalimentacionSi2").attr("disabled", false);
										$("#txtAsuntosVariosMeta2").attr("disabled", false);
										$("#txtRetroalimentacionNo2").attr("disabled", false);
										$("#GuardarRetroalimentacion2").attr("disabled", false);
										
										$("#txtEvaluacionMeta3").attr("disabled", true);
										$("#txtValoresMeta3").attr("disabled", true);
										$("#txtDesarrolloMeta3").attr("disabled", true);
										$("#txtAsuntosVariosMeta3").attr("disabled", true);
										$("#txtRetroalimentacionSi3").attr("disabled", true);
										$("#txtRetroalimentacionNo3").attr("disabled", true);
										$("#GuardarRetroalimentacion3").attr("disabled", true);
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
													alert("Todas las Retroalimentaciones han sido completadas")
													
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
													
													$("#txtEvaluacionMeta1").attr("disabled", true);
													$("#txtValoresMeta1").attr("disabled", true);
													$("#txtDesarrolloMeta1").attr("disabled", true);
													$("#txtRetroalimentacionSi1").attr("disabled", true);
													$("#txtRetroalimentacionNo1").attr("disabled", true);
													$("#GuardarRetroalimentacion1").attr("disabled", true);
													
													$("#txtEvaluacionMeta2").attr("disabled", true);
													$("#txtValoresMeta2").attr("disabled", true);
													$("#txtDesarrolloMeta2").attr("disabled", true);
													$("#txtRetroalimentacionSi2").attr("disabled", true);
													$("#txtRetroalimentacionNo2").attr("disabled", true);
													$("#GuardarRetroalimentacion2").attr("disabled", true);
													
													$("#txtEvaluacionMeta3").attr("disabled", true);
													$("#txtValoresMeta3").attr("disabled", true);
													$("#txtDesarrolloMeta3").attr("disabled", true);
													$("#txtRetroalimentacionSi3").attr("disabled", true);
													$("#txtRetroalimentacionNo3").attr("disabled", true);
													$("#GuardarRetroalimentacion3").attr("disabled", true);
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
													alert("Aun no guarda retroalimentacion 3.");
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
													
													$("#txtEvaluacionMeta3").attr("disabled", false);
													$("#txtValoresMeta3").attr("disabled", false);
													$("#txtDesarrolloMeta3").attr("disabled", false);
													$("#txtAsuntosVariosMeta3").attr("disabled", false);
													$("#txtRetroalimentacionSi3").attr("disabled", false);
													$("#txtRetroalimentacionNo3").attr("disabled", false);
													$("#GuardarRetroalimentacion3").attr("disabled", false);
													
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
										alert("Aun no guarda retroalimentacion 2.");
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
											
											$("#txtEvaluacionMeta2").attr("disabled", false);
											$("#txtValoresMeta2").attr("disabled", false);
											$("#txtDesarrolloMeta2").attr("disabled", false);
											$("#txtAsuntosVariosMeta2").attr("disabled", false);
											$("#txtRetroalimentacionSi2").attr("disabled", false);
											$("#txtRetroalimentacionNo2").attr("disabled", false);
											$("#GuardarRetroalimentacion2").attr("disabled", false);
											
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
							alert("Aun no guarda retroalimentacion 1.");
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
							
							$("#txtEvaluacionMeta1").attr("disabled", false);
							$("#txtValoresMeta1").attr("disabled", false);
							$("#txtDesarrolloMeta1").attr("disabled", false);
							$("#txtAsuntosVariosMeta1").attr("disabled", false);
							$("#txtRetroalimentacionSi1").attr("disabled", false);
							$("#txtRetroalimentacionNo1").attr("disabled", false);
							$("#GuardarRetroalimentacion1").attr("disabled", false);
							
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
				alert("Falta autorizar alguna meta de este empleado.");
				
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
				alert("Falta autorizar alguna meta de este colaborador");
				
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

function GuardarRetroalimentacion1(){
	var EvaluacionMetaAnual = $("#txtEvaluacionMeta1").val();
	var ValoresMeta1 = $("#txtValoresMeta1").val();
	var DesarrolloMeta1 = $("#txtDesarrolloMeta1").val();
	var AsuntosVariosMeta1 = $("#txtAsuntosVariosMeta1").val();
	var Retroalimentacion1 = $('input:radio[name=Retroalimentacion1]:checked').val();
	var FechaRetroalimentacion1 = $("#txtFechaRetroalimentacion1").val();
	var empleado = $("#txtNumEmpleadoLogeado").val();
	if(EvaluacionMetaAnual.replace(/\s/g,"") != "" && ValoresMeta1.replace(/\s/g,"") != "" && DesarrolloMeta1.replace(/\s/g,"") != "" ){
		if(Retroalimentacion1 != undefined){
			$.ajax({
				type: "POST",
				data: {
					param: 17, // El Rechazo de la solicitud a modificacion pasa a Aceptado ya que anteriormente ya habia sido aceptado
					empleado: empleado,
					EvaluacionMetaAnual: EvaluacionMetaAnual,
					ValoresMeta:ValoresMeta1,
					DesarrolloMeta:DesarrolloMeta1,
					AsuntosVariosMeta:AsuntosVariosMeta1,
					Retroalimentacion:Retroalimentacion1,
					FechaRetroalimentacion:FechaRetroalimentacion1,
					Evaluacion:1,
				},
				url: "../utileria.php",
				dataType: 'JSON',
				 success: function(data) {
					for(i=0;i<data.length;i++){
						if(data[i]['Validar'] == true ){
							alert("La información ha sido guardado correctamente");
							//location.reload();
							$("#txtEvaluacionMeta1").prop( "disabled", true ); 
							$("#txtValoresMeta1").prop( "disabled", true ); 
							$("#txtDesarrolloMeta1").prop( "disabled", true ); 
							$("#txtAsuntosVariosMeta1").attr("disabled", true);
							$("#txtRetroalimentacionSi1").prop( "disabled", true ); 
							$("#txtRetroalimentacionNo1").prop( "disabled", true ); 
							$("#txtFechaRetroalimentacion1").prop( "disabled", true );
							$("#GuardarRetroalimentacion1").prop( "disabled", true );
						}
						else{
							alert("La información no pudo ser guardado");
						}
					}
				}
			});
		}else{
			alert("Favor de llenar todos los campos.");
		}
	}else{
		alert("Favor de llenar todos los campos.");
	}
	
}


function GuardarRetroalimentacion2(){
	var EvaluacionMetaAnual = $("#txtEvaluacionMeta2").val();
	var ValoresMeta1 = $("#txtValoresMeta2").val();
	var DesarrolloMeta1 = $("#txtDesarrolloMeta2").val();
	var AsuntosVariosMeta1 = $("#txtAsuntosVariosMeta2").val();
	var Retroalimentacion1 = $('input:radio[name=Retroalimentacion2]:checked').val();
	var FechaRetroalimentacion1 = $("#txtFechaRetroalimentacion2").val();
	var empleado = $("#txtNumEmpleadoLogeado").val();
	if(EvaluacionMetaAnual.replace(/\s/g,"") != "" && ValoresMeta1.replace(/\s/g,"") != "" && DesarrolloMeta1.replace(/\s/g,"") != "" ){
		if(Retroalimentacion1 != undefined){
			$.ajax({
				type: "POST",
				data: {
					param: 17, // El Rechazo de la solicitud a modificacion pasa a Aceptado ya que anteriormente ya habia sido aceptado
					empleado: empleado,
					EvaluacionMetaAnual: EvaluacionMetaAnual,
					ValoresMeta:ValoresMeta1,
					DesarrolloMeta:DesarrolloMeta1,
					AsuntosVariosMeta:AsuntosVariosMeta1,
					Retroalimentacion:Retroalimentacion1,
					FechaRetroalimentacion:FechaRetroalimentacion1,
					Evaluacion:2,
				},
				url: "../utileria.php",
				dataType: 'JSON',
				 success: function(data) {
					for(i=0;i<data.length;i++){
						if(data[i]['Validar'] == true ){
							alert("La información ha sido guardado correctamente");
							//location.reload();
							$("#txtEvaluacionMeta2").prop( "disabled", true ); 
							$("#txtValoresMeta2").prop( "disabled", true ); 
							$("#txtDesarrolloMeta2").prop( "disabled", true ); 
							$("#txtAsuntosVariosMeta2").attr("disabled", true);
							$("#txtRetroalimentacionSi2").prop( "disabled", true ); 
							$("#txtRetroalimentacionNo2").prop( "disabled", true ); 
							$("#txtFechaRetroalimentacion2").prop( "disabled", true );
							$("#GuardarRetroalimentacion2").prop( "disabled", true );
						}
						else{
							alert("La información no pudo ser guardado");
						}
					}
				}
			});
		}else{
			alert("Favor de llenar todos los campos.");
		}
	}else{
		alert("Favor de llenar todos los campos.");
	}
	
}

function GuardarRetroalimentacion3(){
	var EvaluacionMetaAnual = $("#txtEvaluacionMeta3").val();
	var ValoresMeta1 = $("#txtValoresMeta3").val();
	var DesarrolloMeta1 = $("#txtDesarrolloMeta3").val();
	var AsuntosVariosMeta1 = $("#txtAsuntosVariosMeta3").val();
	var Retroalimentacion1 = $('input:radio[name=Retroalimentacion3]:checked').val();
	var FechaRetroalimentacion1 = $("#txtFechaRetroalimentacion3").val();
	var empleado = $("#txtNumEmpleadoLogeado").val();
	if(EvaluacionMetaAnual.replace(/\s/g,"") != "" && ValoresMeta1.replace(/\s/g,"") != "" && DesarrolloMeta1.replace(/\s/g,"") != "" ){
		if(Retroalimentacion1 != undefined){
			$.ajax({
				type: "POST",
				data: {
					param: 17, // El Rechazo de la solicitud a modificacion pasa a Aceptado ya que anteriormente ya habia sido aceptado
					empleado: empleado,
					EvaluacionMetaAnual: EvaluacionMetaAnual,
					ValoresMeta:ValoresMeta1,
					DesarrolloMeta:DesarrolloMeta1,
					AsuntosVariosMeta:AsuntosVariosMeta1,
					Retroalimentacion:Retroalimentacion1,
					FechaRetroalimentacion:FechaRetroalimentacion1,
					Evaluacion:3,
				},
				url: "../utileria.php",
				dataType: 'JSON',
				 success: function(data) {
					for(i=0;i<data.length;i++){
						if(data[i]['Validar'] == true ){
							alert("La información ha sido guardado correctamente");
							//location.reload();
							
							$("#txtEvaluacionMeta3").prop( "disabled", true ); 
							$("#txtValoresMeta3").prop( "disabled", true ); 
							$("#txtDesarrolloMeta3").prop( "disabled", true ); 
							$("#txtAsuntosVariosMeta3").attr("disabled", true);
							$("#txtRetroalimentacionSi3").prop( "disabled", true ); 
							$("#txtRetroalimentacionNo3").prop( "disabled", true ); 
							$("#txtFechaRetroalimentacion3").prop( "disabled", true );
							$("#GuardarRetroalimentacion3").prop( "disabled", true );
							
						}
						else{
							alert("La información no pudo ser guardado");
						}
					}
					
				}
			});
		}else{
			alert("Favor de llenar todos los campos.");
		}
	}else{
		alert("Favor de llenar todos los campos.");
	}
	
}