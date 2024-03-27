let FechaActual = 0,
FechaLimite = 0;

jQuery(function () {
	BuscarEmpleadoLogeado();
	CargaEmpresa();

	let FechaHoy = new Date();
	let MostrarFechaHoy = moment(FechaHoy).format("DD-MM-YYYY");

	$("#txtFechaRetroalimentacion1").val(MostrarFechaHoy);
	$("#txtFechaRetroalimentacion2").val(MostrarFechaHoy);
	$("#txtFechaRetroalimentacion3").val(MostrarFechaHoy);
	BuscarListadoEmpleado();
	
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

function RevisarEstatusPeriodo(){
	let empleado = $("#txtNumEmpleadoLogeado").val(),
	Anio = $("#txtAnioSeleccionado").val();
	
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
		url: "../utileria.php",
		type: "post",
		data: {"param":26, "empleado":empleado, "Anio":Anio},
		success: function(result) {
			let data = JSON.parse(result);
			if (data.estatus == "success") {
				let datos = data.data;
				if(datos[0]['Resultado'] == 3){
					// Validar si ya hay algo de falta de seleccionar 
					$.ajax({
						url: "../utileria.php",
						type: "post",
						data: {"param":27, "empleado":empleado, "evaluacion":1, "Anio":Anio},
						success: function(result) {
							let data = JSON.parse(result);
							if (data.estatus == "success"){
								let datos = data.data;
								$("#txtEvaluacionMeta2").val("");
								$("#txtValoresMeta2").val("");
								$("#txtDesarrolloMeta2").val("");
								$('input[name="Retroalimentacion2"]').prop('checked', false);
								
								$("#txtEvaluacionMeta1").val(datos[0]['EvaluacionMetaAnual']);
								$("#txtValoresMeta1").val(datos[0]['Valores']);
								$("#txtDesarrolloMeta1").val(datos[0]['Desarrollo']);
								$("#txtFechaRetroalimentacion1").val(datos[0]['FechaInsercion']);
								$("#txtAsuntosVariosMeta1").val(datos[0]['AsuntosVarios']);
								if(datos[0]['Retroalimentacion'] == 0){
									$("#txtRetroalimentacionNo1").prop('checked', true);
								}else{
									$("#txtRetroalimentacionSi1").prop('checked', true);
								}
								$('input[name="Retroalimentacion2"]').prop('checked', false);
								
								$.ajax({
									url: "../utileria.php",
									type: "post",
									data: {"param":27, "empleado":empleado, "evaluacion":2, "Anio":Anio},
									success: function(result) {
										let data = JSON.parse(result);
										if(data.estatus == "success"){
											let datos = data.data;
											$("#txtEvaluacionMeta2").val("");
											$("#txtValoresMeta2").val("");
											$("#txtDesarrolloMeta2").val("");
											$('input[name="Retroalimentacion2"]').prop('checked', false);
											
											$("#txtEvaluacionMeta2").val(datos[0]['EvaluacionMetaAnual']);
											$("#txtValoresMeta2").val(datos[0]['Valores']);
											$("#txtDesarrolloMeta2").val(datos[0]['Desarrollo']);
											$("#txtFechaRetroalimentacion2").val(datos[0]['FechaInsercion']);
											$("#txtAsuntosVariosMeta2").val(datos[0]['AsuntosVarios']);
											if(datos[0]['Retroalimentacion'] == 0){
												$("#txtRetroalimentacionNo2").prop('checked', true);
											}else{
												$("#txtRetroalimentacionSi2").prop('checked', true);
											}
								
											$.ajax({
												url: "../utileria.php",
												type: "post",
												data: {"param":27, "empleado":empleado, "evaluacion":3, "Anio":Anio},
												success: function(result) {
													let data = JSON.parse(result);
													if(data.estatus == "success"){
														let datos = data.data;
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
														
														
														$("#txtAsuntosVariosMeta3").val(datos[0]['AsuntosVarios']);
														
														$("#txtEvaluacionMeta3").val(datos[0]['EvaluacionMetaAnual']);
														$("#txtValoresMeta3").val(datos[0]['Valores']);
														$("#txtDesarrolloMeta3").val(datos[0]['Desarrollo']);
														$("#txtFechaRetroalimentacion3").val(datos[0]['FechaInsercion']);
														if(datos[0]['Retroalimentacion'] == 0){
															$("#txtRetroalimentacionNo3").prop('checked', true);
														}else{
															$("#txtRetroalimentacionSi3").prop('checked', true);
														}
													}else{
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
														$("#txtEvaluacionMeta3").val(data.data[0]['EvaluacionMetaAnual']);
														$("#txtValoresMeta3").val(data.data[0]['Valores']);
														$("#txtDesarrolloMeta3").val(data.data[0]['Desarrollo']);
														$("#txtFechaRetroalimentacion3").val(data.data[0]['FechaInsercion']);
														if(data.data[0]['Retroalimentacion'] == 0){
															$("#txtRetroalimentacionNo3").prop('checked', true);
														}else{
															$("#txtRetroalimentacionSi3").prop('checked', true);
														}
													}
												}
											});
										}else{
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
									}
								});
							}else{
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
						}
					});
				}else if(datos[0]['Resultado'] == 2){
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
				}else if(datos[0]['Resultado'] == 1){
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

function BuscarListadoEmpleado(){
	let empleado = $("#txtNumEmpleadoLogeado").val(),
	anioAnterior = 0;

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
		data: {"param":24, "empleado": empleado},
		success: function(result) {
			let data = JSON.parse(result);
			if (data.estatus == "success") {
				let datos = data.data,
				Encabezado = "<option value='0'>Lista de colaboradores</option>";
				$('#txtAnioSeleccionado').append(Encabezado);
				for(i = 0; i < datos.length; i++){
					if(anioAnterior != data[i]['Anio']){
						let Anio = "<option value='"+datos[i]['Anio']+"'>"+datos[i]['Anio']+"</option>";
						$('#txtAnioSeleccionado').append(Anio);
						anioAnterior = data[i]['Anio'];
					}
				}
			}else{
				if(document.getElementById('#txtAnioSeleccionado') != null){
					document.getElementById('#txtAnioSeleccionado').innerHTML = "";
					let Anio = "<option value='0'>No cuentas empleados dependientes</option>";
					$('#txtAnioSeleccionado').append(Anio);
				}
			}
		}
	});
}