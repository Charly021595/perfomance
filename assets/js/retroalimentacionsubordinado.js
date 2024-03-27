let FechaActual = 0,
FechaLimite = 0,
NumAlerta = 0;
//

jQuery(function () {
    BuscarEmpleadoLogeado();
	CargaEmpresa();
	let FechaHoy = new Date();
	let MostrarFechaHoy = moment(FechaHoy).format("DD-MM-YYYY");
	$("#txtFechaRetroalimentacion1").val("");
	$("#txtFechaRetroalimentacion2").val("");
	$("#txtFechaRetroalimentacion3").val("");
	
	BuscarListadoEmpleado()
});

function BuscarListadoEmpleado(){
	$("#filtros_validacion").hide();
	let empleado = $("#txtNumEmpleadoLogeado").val();
	if (empleado == "") {
		Swal.fire({
            title: "Aviso",
            text: 'Favor de Agregar un numero de empleado.',
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
        }).then(function(){
            CerrarSesion();
        });
        return false;
    }
	$.ajax({
		type: "POST",
		data: {"param": 9, "empleado":empleado},
		url: "../utileria.php",
		 success: function(result) {
			$("#filtros_validacion").show();
			data = JSON.parse(result);
            if (data.estatus == "success") {
				let datos = data.data;
				let Encabezado = "<option value='0'>Lista de colaboradores</option>";
				$('#txtEmpleadoSeleccionado').append(Encabezado);
				for(i=0; i < datos.length; i++){
					var Empleado = "<option value='"+datos[i]['Empleado']+"'>"+datos[i]['Empleado']+" - "+datos[i]['Nombre']+"</option>";
					$('#txtEmpleadoSeleccionado').append(Empleado);
				}
            }else{
                Swal.fire({
                    title: "Aviso",
                    html: data.mensaje,
                    icon: 'info',
                    allowOutsideClick: false,
                    confirmButtonText: "Aceptar",
                });
				if(document.getElementById('#txtEmpleadoSeleccionado') != null){
					document.getElementById('#txtEmpleadoSeleccionado').innerHTML = "";
					let Empleado = "<option value='0'>No cuentas empleados dependientes</option>";
					$('#txtEmpleadoSeleccionado').append(Empleado);
				}
				$("#filtros_validacion").hide();
            }
		}
	});
}

function ValidarFechas(){
	FechaActual = 0;
	FechaLimite = 0;
	FechaLimite1 = 0
	//
	let fechaActualL = new Date(); //Fecha actual
	let fechaActual2 = moment(fechaActualL).format("DD-MM-YYYY");
	let anio = fechaActualL.getFullYear(); //obteniendo año
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
            Swal.fire({
                title: "Aviso",
                text: 'El periodo de evaluacion ha concluido.',
                icon: 'info',
                allowOutsideClick: false,
                confirmButtonText: "Aceptar",
            }).then(function(){
                NumAlerta =1;
            });
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
	let empleado = $("#txtNumEmpleadoLogeado").val();
	if (empleado == "") {
		Swal.fire({
            title: "Aviso",
            text: 'Favor de Agregar un número de empleado.',
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
        });
        return false;
    }
	$.ajax({
		url: "../utileria.php",
		type: "post",
		data: {"param": 18, "empleado": empleado},
		success: function(result) {
			let data = JSON.parse(result);
			if (data.estatus == "success"){
				let datos = data.data;
				if(datos[0]['Resultado'] == 3){
					// Validar si ya hay algo de falta de seleccionar 
					$.ajax({
						url: "../utileria.php",
						type: "post",
						data: {"param": 19, "empleado": empleado, "evaluacion": 1},
						success: function(result){
							let data = JSON.parse(result);
							if(data.estatus == "success"){
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
								if(data[0]['Retroalimentacion'] == 0){
									$("#txtRetroalimentacionNo1").prop('checked', true);
								}else{
									$("#txtRetroalimentacionSi1").prop('checked', true);
								}
								$('input[name="Retroalimentacion2"]').prop('checked', false);
								/*------------*/
								$.ajax({
									url: "../utileria.php",
									type: "post",
									data: {"param": 19, "empleado": empleado, "evaluacion": 2},
									 success: function(result){
										let data = JSON.parse(result);
										if(data.estatus == "success"){
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
														Swal.fire({
															title: "Aviso",
															text: 'Todas las Retroalimentaciones han sido completadas',
															icon: 'info',
															allowOutsideClick: false,
															confirmButtonText: "Aceptar",
														}).then(function(){
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
															if(data[0]['Retroalimentacion'] == 0){
																$("#txtRetroalimentacionNo3").prop('checked', true);
															}else{
																$("#txtRetroalimentacionSi3").prop('checked', true);
															}
														}); 
													}else{
														Swal.fire({
															title: "Aviso",
															text: 'Aun no guarda retroalimentacion 3.',
															icon: 'info',
															allowOutsideClick: false,
															confirmButtonText: "Aceptar",
														}).then(function(){
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
															if(data[0]['Retroalimentacion'] == 0){
																$("#txtRetroalimentacionNo3").prop('checked', true);
															}else{
																$("#txtRetroalimentacionSi3").prop('checked', true);
															
															}
														});
													}
												}
											});
										}else{
											Swal.fire({
												title: "Aviso",
												text: 'Aun no guarda retroalimentacion 2.',
												icon: 'info',
												allowOutsideClick: false,
												confirmButtonText: "Aceptar",
											}).then(function(){
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
											});
										}
									}
								});
							}else{
								Swal.fire({
									title: "Aviso",
									text: 'Aun no guarda retroalimentacion 1.',
									icon: 'info',
									allowOutsideClick: false,
									confirmButtonText: "Aceptar",
								}).then(function(){
									$("#EMenu1").addClass("active");
									$("#home").addClass("active in");
									$("#EMenu2").removeClass("active");
									$("#menu2").removeClass("active in");
									$("#EMenu3").removeClass("active");
									$("#menu3").removeClass("active in");
									
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
								});	
							}
						}
					});
				}else if(datos[0]['Resultado'] == 2){
					Swal.fire({
						title: "Aviso",
						text: 'Falta autorizar alguna meta de este empleado.',
						icon: 'info',
						allowOutsideClick: false,
						confirmButtonText: "Aceptar",
					}).then(function(){
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
					});
				}else if(datos[0]['Resultado'] == 1){
					Swal.fire({
						title: "Aviso",
						text: 'Falta autorizar alguna meta de este colaborador',
						icon: 'info',
						allowOutsideClick: false,
						confirmButtonText: "Aceptar",
					}).then(function(){
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
					});
				}
			}else{
				Swal.fire({
					title: "Aviso",
					text: data.mensaje,
					icon: 'info',
					allowOutsideClick: false,
					confirmButtonText: "Aceptar",
				});
			}
		}
	});
}

function BuscarEmpleadoLogeado(){
	$("#nombre_lado_izquierdo").removeClass("tamanos_nombres");
	$("#nombre_lado_izquierdo").removeClass("tamanos_nombres_v2");
	let empleado = $("#txtNumEmpleadoLogeado").val();
	if(empleado == "") {
		Swal.fire({
            title: "Aviso",
            text: 'Favor de Agregar un numero de empleado.',
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
        }).then(function(){
            CerrarSesion();
        });
        return false;
    }
	$.ajax({
		url: "../utileria.php",
		type: "post",
		data: {"param":1, "empleado": empleado},
		 success: function(result) {
			let data = JSON.parse(result);
			if (data.estatus == "success") {
				let datos = data.data;
				for(i = 0; i < datos.length; i++){
					let nombre = datos[i]['Nombre'],
					nombre_separado = nombre.split(" ");
					if(nombre_separado.length == 4){
						$("#NombreCont").text(nombre_separado[0]+' '+nombre_separado[2]+' '+nombre_separado[3]);
						$("#nombre_lado_izquierdo").text(nombre_separado[0]+' '+nombre_separado[2]+' '+nombre_separado[3]);
						$("#nombre_lado_izquierdo").addClass("tamanos_nombres");
					}else if(nombre_separado.length <= 5) {
						$("#NombreCont").text(nombre);
						$("#nombre_lado_izquierdo").text(nombre);
						$("#nombre_lado_izquierdo").addClass("tamanos_nombres");
					}else{
						$("#nombre_lado_izquierdo").addClass("tamanos_nombres_v2");
					}
				}
			}else{
				Swal.fire({
					title: "Usuario Desconocida",
					text: data.mensaje,
					icon: 'info',
					allowOutsideClick: false,
					confirmButtonText: "Aceptar",
				});
			}
		}
	});
}

function CerrarSesion(){
	$.ajax({
		url: "../utileria.php",
		type: "post",
		data: {"param": 7},
		success: function(result) {
			let data = JSON.parse(result);
			if (data.estatus == "success") {
				window.location.href='../index.php';
			}else{
				Swal.fire({
					title: "Aviso",
					text: 'Ocurrio un error al cerrar sesion',
					icon: 'info',
					allowOutsideClick: false,
					confirmButtonText: "Aceptar",
				});
			}
		}
	});
}

function ValidarFecha(){
	FechaActual = 0;
	FechaLimite = 0;
	//
	let fechaActualL = new Date(); //Fecha actual
	let fechaActual2 = moment(fechaActualL).format("DD-MM-YYYY");
	let anio = fechaActualL.getFullYear(); //obteniendo año
	FechaLimite = '01-10-'+anio;
	FechaActual = fechaActual2;
	FechaLimite= FechaLimite.replace(/-/g, "");
	FechaActual= FechaActual.replace(/-/g, "");
	//
	FechaActual = parseInt(FechaActual);
	FechaLimite = parseInt(FechaLimite);
	if(FechaActual > FechaLimite){
		Swal.fire({
			title: "Aviso",
			text: 'La fecha actual es mayor a la fecha limite de modificación',
			icon: 'info',
			allowOutsideClick: false,
			confirmButtonText: "Aceptar",
		}).then(function(){
            $(".ValidaBoton").prop( "disabled", true ); 
        });
	}
}
