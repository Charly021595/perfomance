
let NoMetas = 0,
TotalPonderaciones = 0,
FechaActual = 0,
FechaLimite = 0;

jQuery(function () {
    BuscarEmpleadoLogeado();
	CargaEmpresa();
	BuscarListadoEmpleado();
});
/*-------------------------*/

function BuscarMetasEmpleado(){
	let empleado = $("#txtNumEmpleadoLogeado").val(),
	Anio = $("#txtAnioSeleccionado").val(),
	IDMeta = 0,
	HabilitaCambioDepartamento = 0;

	$(".CambiarDepartamento").prop( "disabled", true ); 
	if(Anio.replace(/\s/g,"") == "") {
		Swal.fire({
            title: "Aviso",
            text: 'Favor de Agregar un numero de empleado.',
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
        });
        return false;
    }

	$.ajax({
		url: "../utileria.php",
		type: "post",
		data: {"param":25, "empleado": empleado, "Anio":Anio},
		success: function(result) {
			$("#EspacioMetas").empty();
			let data = JSON.parse(result);
			if (data.estatus == "success") {
				let datos = data.data;
				for(i=0; i < datos.length; i++){
					datos[i]['meta'] = datos[i]['meta'].replace(/['"]+/g, '');
					if(datos[i]['NoMeta']!= IDMeta){
						let NuevaMeta = '<table id="TablaMeta'+datos[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
						NuevaMeta =  NuevaMeta + '<tr id="Meta'+datos[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+datos[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
						NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+datos[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
						NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+datos[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
						NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
						NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
						NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+datos[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
						NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
						NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaCalificacionMeta'+datos[i]['NoMeta']+'"  scope="col" class="Minimo"> Calificación: </th>';
						NuevaMeta =  NuevaMeta + "<td class='Fecha' scope='col'></td>";  
						NuevaMeta =  NuevaMeta + "<td class='Fecha' scope='col'></td>";  
						NuevaMeta =  NuevaMeta + "<td style='width:4%' scope='col'></td></tr></thead>"
						//tbody
						NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+datos[i]['NoMeta']+'">'
						NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
						NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+datos[i]['NoMeta']+'" class="NombreMeta"> <input type="text" title="'+datos[i]['meta']+'" class="form-control" id="txtNombreMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['meta']+'" disabled></td>';
						NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'" disabled>';
						NuevaMeta =  NuevaMeta + '<select title="Ponderación de Meta" class="form-control" id="txtCantidadPonderacion'+datos[i]['NoMeta']+'" disabled>';
						NuevaMeta =  NuevaMeta + '<option value="10">10%</option>';
						NuevaMeta =  NuevaMeta + '<option value="15">15%</option>';
						NuevaMeta =  NuevaMeta + '<option value="20">20%</option>';
						NuevaMeta =  NuevaMeta + '<option value="25">25%</option>';
						NuevaMeta =  NuevaMeta + '<option value="30">30%</option>';
						NuevaMeta =  NuevaMeta + '<option value="35">35%</option>';
						NuevaMeta =  NuevaMeta + '<option value="40">40%</option>';
						NuevaMeta =  NuevaMeta + '<option value="45">45%</option>';
						NuevaMeta =  NuevaMeta + '<option value="50">50%</option>';
						NuevaMeta =  NuevaMeta + '<option value="55">55%</option>';
						NuevaMeta =  NuevaMeta + '<option value="60">60%</option>';
						NuevaMeta =  NuevaMeta + '<option value="65">65%</option>';
						NuevaMeta =  NuevaMeta + '<option value="70">70%</option>';
						NuevaMeta =  NuevaMeta + '<option value="75">75%</option>';
						NuevaMeta =  NuevaMeta + '<option value="80">80%</option>';
						NuevaMeta =  NuevaMeta + '<option value="85">85%</option>';
						NuevaMeta =  NuevaMeta + '<option value="90">90%</option>';
						NuevaMeta =  NuevaMeta + '<option value="95">95%</option>';
						NuevaMeta =  NuevaMeta + '<option value="100">100%</option>';
						NuevaMeta =  NuevaMeta + '</select></td>';
						NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+datos[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaMeta']+'" disabled/></td>';
						NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+datos[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+datos[i]['NoMeta']+'" value="'+datos[i]['idMeta']+'" disabled/></td>';
						NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+datos[i]['NoMeta']+'">';
						NuevaMeta =  NuevaMeta + '<select title="Unidad de Meta" data-label="Unidad de Medida:" class="form-control" id="txtUnidadMedida'+datos[i]['NoMeta']+'" disabled>';
						NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
						NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
						NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
						NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
						NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
						NuevaMeta =  NuevaMeta + '</select></td>';
						NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+datos[i]['NoMeta']+'"> <input title="'+datos[i]['MinimoMeta']+'" disabled class="form-control" id="txtMinimoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['MinimoMeta']+'"/></td>';
						NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+datos[i]['NoMeta']+'" > <input title="'+datos[i]['SatisfactorioMeta']+'" disabled class="form-control" id="txtSatisfactorioMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['SatisfactorioMeta']+'"/></td>';
						NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+datos[i]['NoMeta']+'" > <input title="'+datos[i]['ExcelenteMeta']+'" disabled class="form-control" id="txtExcelenteMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['ExcelenteMeta']+'"/></td>';
						
						if(datos[i]['CalificacionPonderada'] != null && datos[i]['Estatus'] == 9){
							NumMeta = NumMeta + 1;
							TotalMetas = TotalMetas + datos[i]['Calificacion'];
						}
						
						NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
						NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+datos[i]['NoMeta']+"'>";
						if(datos[i]['NoHito'] !=null){
						NuevaMeta =  NuevaMeta + '<tr id="NoHito'+datos[i]['NoHito']+'_Meta'+datos[i]['NoMeta']+'">';
						NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+datos[i]['NoHito']+'-NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
						NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoHito']+'</td>';
						NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Hito: </td>';
						NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input disabled type="text" class="form-control"   title="'+datos[i]['Hito']+'" id="txtNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['Hito']+'"/></td>';
						NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Fecha: </td>';
						NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input disabled type="date" class="form-control" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'"/></td>';  
						NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"/></td></tr>';  
						}
						NuevaMeta =  NuevaMeta + "</table>"; 
						$('#EspacioMetas').append(NuevaMeta);
						$("#txtCantidadPonderacion"+datos[i]['NoMeta']).val(datos[i]['Ponderacion']);
						$("#txtUnidadMedida"+datos[i]['NoMeta']).val(datos[i]['UnidadMedida']);
						IDMeta = datos[i]['NoMeta'];
						NoMetas =datos[i]['NoMeta'];
					}else{
						if(datos[i]['NoHito'] !=null){
							let NuevaMeta = '<tr id="NoHito'+datos[i]['NoHito']+'_Meta'+datos[i]['NoMeta']+'">';
							NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+datos[i]['NoHito']+'-NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoMeta']+'</td>';
							NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none">'+datos[i]['NoHito']+'</td>';
							NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Hito: </td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="text" class="form-control" title="'+datos[i]['Hito']+'" id="txtNombreHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['Hito']+'" disabled /></td>';
							NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'">Fecha: </td>';
							NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'"> <input type="date" class="form-control" id="txtFechaHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" value="'+datos[i]['FechaHito']+'" disabled /></td>';  
							NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+datos[i]['idHito']+'" class="form-control" id="txtIDHito'+datos[i]['NoHito']+'_NoMeta'+datos[i]['NoMeta']+'" disabled/></td>';  
							$("#TablaHitos_Meta"+datos[i]['NoMeta']).append(NuevaMeta);
						}
					}
				}
			
				if(NumMeta != 0){
					let CalculoDeTotales = TotalMetas/NumMeta;
				}else{
					let CalculoDeTotales = 0;
				}

				let CalculoDeTotales2 = roundToTwo(CalculoDeTotales);
				$("#txtEvaluacionDesempeño").val(CalculoDeTotales2);

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
/*-------------------------*/

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

function ValidacionCamposVacios(){
	if(NoMetas != 0){
		//if(comentarios.replace(/\s/g,"") != "")
		let NombreMeta = $("#txtNombreMeta" + NoMetas).val(),
		CantidadPonderacion = $("#txtCantidadPonderacion"+NoMetas).val(),
		FechaMeta =$("#txtFechaMeta"+NoMetas).val(),
		//
		UnidadMedida =$("#txtUnidadMedida"+NoMetas).val(),
		MinimoMeta =$("#txtMinimoMeta"+NoMetas).val(),
		SatisfactorioMeta =$("#txtSatisfactorioMeta"+NoMetas).val(),
		ExcelenteMeta =$("#txtExcelenteMeta"+NoMetas).val();
		//
		validar = 0;
		if(NombreMeta.replace(/\s/g,"") == ""){
			validar = 1;
		}
		if(CantidadPonderacion.replace(/\s/g,"") == ""){
			validar = 1;
		}
		if(FechaMeta.replace(/\s/g,"") == ""){
			validar = 1;
		}
		if(UnidadMedida == 0){
			validar = 1;
		}
		if(MinimoMeta.replace(/\s/g,"") == ""){
			validar = 1;
		}
		if(SatisfactorioMeta.replace(/\s/g,"") == ""){
			validar = 1;
		}
		if(ExcelenteMeta.replace(/\s/g,"") == ""){
			validar = 1;
		}
		
	}else{
		validar = 0;
	}
	return validar;	
}

function setFocusToTextBox(NoMetas){
    $("#txtNombreMeta"+ NoMetas).focus();
}

function ValidacionCamposVaciosHitos(NoMeta){
	let Lineas = $("#TablaHitos_Meta"+NoMeta+" tr").length,
	NoHito = GuardarRecordatorio(NoMeta);
	if(NoHito!=0){
		//if(comentarios.replace(/\s/g,"") != "") txtNombreHito1_NoMeta1
		let NombreHito = $("#txtNombreHito"+NoHito+"_NoMeta"+NoMeta).val(),
		CantidadPonderacion = $("#txtFechaHito"+NoHito+"_NoMeta"+NoMeta).val();
		validar = 0;
		if(NombreHito.replace(/\s/g,"") == ""){
			validar = 1;
		}
		if(CantidadPonderacion.replace(/\s/g,"") == ""){
			validar = 1;
		}
		
	}else{
		validar = 0;
	}
	return validar;	
}

function GuardarRecordatorio(NoMeta) {
    let arrayRecordatorio24H = [],
	numHito = 0;
	$("#TablaHitos_Meta"+NoMeta+" tr").each(function(index, value) {
		let campo1, campo2, campo3,
		i = 0;
		
		$(this).children("td").each(function(index2) {
			switch (index2) {
				case 0:
						campo1 = $(this).text();
				break;
				case 1:
						campo2 = $(this).text();
				break;
				case 2:
						campo3 = $("#txtNombreHito"+i+"_NoMeta"+NoMeta).val();
				break;
			}
		});
	numHito = parseInt(campo2);
	});
	return numHito;
}

function ValidarPonderacion (){
	TotalPonderaciones =0;
	for( i = 0; i <= NoMetas; i++){
		if ( $("#txtCantidadPonderacion"+i).length > 0 ) {
			TotalPonderaciones = TotalPonderaciones + parseInt($("#txtCantidadPonderacion"+i).val());
		}
	}
	return TotalPonderaciones;
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
					if(anioAnterior != datos[i]['Anio']){
						let Anio = "<option value='"+datos[i]['Anio']+"'>"+datos[i]['Anio']+"</option>";
						$('#txtAnioSeleccionado').append(Anio);
						anioAnterior = datos[i]['Anio'];
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