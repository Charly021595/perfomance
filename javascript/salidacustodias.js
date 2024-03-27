
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
	BuscarMetasEmpleado();
	//setTimeout(ValidarFecha, 500);
	CargaEmpresa();
})

/*-------------------------*/
function BuscarMetasEmpleado(){
	var empleado = $("#txtNumEmpleadoLogeado").val();
	var IDMeta =0;
	if(empleado.replace(/\s/g,"") != ""){
	
		//LimpiarCampos();
		$.ajax({
            type: "POST",
            data: {
                param: 3,
				empleado: empleado 
            },
            url: "../utileria.php",
            dataType: 'JSON',
             success: function(data) {
				if(data.length){
					for(i=0;i<data.length;i++){
						//$("#NombreCont2").text(data[i]['Nombre']);
						//$("#NombreCont").text(data[i]['Nombre']);
						//
						if(data[i]['Estatus'] ==0){
						//
							if(data[i]['NoMeta']!= IDMeta){
								
								var NuevaMeta = '<table id="TablaMeta'+data[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
								NuevaMeta =  NuevaMeta + '<tr id="Meta'+data[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+data[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+data[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+data[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+data[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
								//tbody
								NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+data[i]['NoMeta']+'">'
								//NuevaMeta =  NuevaMeta + '<tr id="Meta'+data[i]['NoMeta']+'">'
								NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+data[i]['NoMeta']+'" class="NombreMeta"> <input type="text" title="'+data[i]['meta']+'"  class="form-control" id="txtNombreMeta'+data[i]['NoMeta']+'" value="'+data[i]['meta']+'"></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+data[i]['NoMeta']+'"  min="1" max="100"></td>';
								NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+data[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaMeta']+'" /></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+data[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+data[i]['NoMeta']+'" value="'+data[i]['idMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'">';
								//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' onchange='ConteoHitos(\""+data[i]['NoMeta']+"\")'>";
								NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' >";
								
								NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
								NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
								NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
								NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
								NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
								NuevaMeta =  NuevaMeta + '</select></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+data[i]['NoMeta']+'"> <input title'+data[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+data[i]['NoMeta']+'" value="'+data[i]['MinimoMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+data[i]['NoMeta']+'" > <input title="'+data[i]['SatisfactorioMeta']+'" maxlength="15" title="'+data[i]['meta']+'" class="form-control" id="txtSatisfactorioMeta'+data[i]['NoMeta']+'" value="'+data[i]['SatisfactorioMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+data[i]['NoMeta']+'" > <input title="'+data[i]['ExcelenteMeta']+'" maxlength="15" title="Nombre de Meta" class="form-control" id="txtExcelenteMeta'+data[i]['NoMeta']+'" value="'+data[i]['ExcelenteMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-primary ValidaBoton" onclick="AgregarHito('+data[i]['NoMeta']+')">+</button> </td>';
								NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-danger ValidaBoton" onclick="ConfirmacionEliminaAlimento('+data[i]['NoMeta']+')">-</button> </td>';
								//Etiqueta
								NuevaMeta =  NuevaMeta + '<td data-label="">Pendiente por mandar a validación</td>';
								//
								//tbody
								NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
								
								NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+data[i]['NoMeta']+"'>";
								if(data[i]['NoHito'] !=null){
								/*---------*/
								NuevaMeta =  NuevaMeta + '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"><labe >Hito: </label></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="text" class="form-control" title="'+data[i]['Hito']+'"  id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")'>-</button></div></td></tr>";  
								}
								/*---------*/
								NuevaMeta =  NuevaMeta + "</table>"; 
								$('#EspacioMetas').append(NuevaMeta);
								$("#txtCantidadPonderacion"+data[i]['NoMeta']).val(data[i]['Ponderacion']);
								//
									$("#txtUnidadMedida"+data[i]['NoMeta']).val(data[i]['UnidadMedida']);
								//
								IDMeta = data[i]['NoMeta'];
								NoMetas =data[i]['NoMeta'];
							}else{
								if(data[i]['NoHito'] !=null){
								var NuevaMeta = '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"><labe >Hito: </label></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="text" class="form-control" title="'+data[i]['Hito']+'" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")'>-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+data[i]['NoMeta']).append(NuevaMeta);
								}
							}
						MetasSinValidar=1;
						// En validacion
						}else if(data[i]['Estatus'] ==1){
							if(data[i]['NoMeta']!= IDMeta){
								var NuevaMeta = '<table id="TablaMeta'+data[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
								NuevaMeta =  NuevaMeta + '<tr id="Meta'+data[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+data[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+data[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+data[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+data[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
								//tbody
								NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+data[i]['NoMeta']+'">'
								NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+data[i]['NoMeta']+'" class="NombreMeta"> <input  title="'+data[i]['meta']+'" type="text"  class="form-control" id="txtNombreMeta'+data[i]['NoMeta']+'" value="'+data[i]['meta']+'" disabled></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'" disabled>';
								NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+data[i]['NoMeta']+'"  min="1" max="100" disabled></td>';
								NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+data[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+data[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+data[i]['NoMeta']+'" value="'+data[i]['idMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'">';
								//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' onchange='ConteoHitos(\""+data[i]['NoMeta']+"\")' disabled>";
								NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' disabled>";
								
								NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
								NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
								NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
								NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
								NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
								NuevaMeta =  NuevaMeta + '</select></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+data[i]['NoMeta']+'"> <input  disabled  title="'+data[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+data[i]['NoMeta']+'" value="'+data[i]['MinimoMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+data[i]['NoMeta']+'" > <input title="'+data[i]['SatisfactorioMeta']+'" maxlength="15" disabled class="form-control" id="txtSatisfactorioMeta'+data[i]['NoMeta']+'" value="'+data[i]['SatisfactorioMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+data[i]['NoMeta']+'" > <input  disabled  title="'+data[i]['ExcelenteMeta']+'" maxlength="15" class="form-control" id="txtExcelenteMeta'+data[i]['NoMeta']+'" value="'+data[i]['ExcelenteMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label=""> <button disabled class="btn btn-primary ValidaBoton" onclick="AgregarHito('+data[i]['NoMeta']+')">+</button> </td>';
								NuevaMeta =  NuevaMeta + '<td data-label=""> <button disabled class="btn btn-danger ValidaBoton" onclick="ConfirmacionEliminaAlimento('+data[i]['NoMeta']+')">-</button> </td>';
								//Etiqueta
								NuevaMeta =  NuevaMeta + '<td data-label="">Pendiente de Autorización</td>';
								//
								//tbody
								NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
								NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+data[i]['NoMeta']+"'>";
								/*---------*/
								if(data[i]['NoHito'] !=null){
								NuevaMeta =  NuevaMeta + '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="text" class="form-control" title="'+data[i]['Hito']+'" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								}
								/*---------*/
								NuevaMeta =  NuevaMeta + "</table>"; 
								$('#EspacioMetas').append(NuevaMeta);
								$("#txtCantidadPonderacion"+data[i]['NoMeta']).val(data[i]['Ponderacion']);
								$("#txtUnidadMedida"+data[i]['NoMeta']).val(data[i]['UnidadMedida']);
								IDMeta = data[i]['NoMeta'];
								NoMetas =data[i]['NoMeta'];
							}else{
								if(data[i]['NoHito'] !=null){
								var NuevaMeta = '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="text" title="'+data[i]['Hito']+'" class="form-control" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'" disabled /></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'" disabled /></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" disabled/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+data[i]['NoMeta']).append(NuevaMeta);
								}
							}
						MetasPendientesdeValidar=1;
						}else if(data[i]['Estatus'] ==2){ //Aceptado
							if(data[i]['NoMeta']!= IDMeta){
								var NuevaMeta = '<table id="TablaMeta'+data[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
								NuevaMeta =  NuevaMeta + '<tr id="Meta'+data[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+data[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+data[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+data[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+data[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
								//tbody
								NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+data[i]['NoMeta']+'">'
								NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+data[i]['NoMeta']+'" class="NombreMeta"> <input  title="'+data[i]['meta']+'" type="text"  class="form-control" id="txtNombreMeta'+data[i]['NoMeta']+'" value="'+data[i]['meta']+'" disabled></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'" disabled>';
								NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+data[i]['NoMeta']+'"  min="1" max="100" disabled></td>';
								NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+data[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+data[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+data[i]['NoMeta']+'" value="'+data[i]['idMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'">';
								//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' onchange='ConteoHitos(\""+data[i]['NoMeta']+"\")' disabled>";
								NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' disabled>";
								NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
								NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
								NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
								NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
								NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
								NuevaMeta =  NuevaMeta + '</select></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+data[i]['NoMeta']+'"> <input  disabled  title="'+data[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+data[i]['NoMeta']+'" value="'+data[i]['MinimoMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+data[i]['NoMeta']+'" > <input title="'+data[i]['SatisfactorioMeta']+'" maxlength="15" disabled class="form-control" id="txtSatisfactorioMeta'+data[i]['NoMeta']+'" value="'+data[i]['SatisfactorioMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+data[i]['NoMeta']+'" > <input  disabled  title="'+data[i]['ExcelenteMeta']+'" maxlength="15" class="form-control" id="txtExcelenteMeta'+data[i]['NoMeta']+'" value="'+data[i]['ExcelenteMeta']+'"/></td>';
								//NuevaMeta =  NuevaMeta + '<td colspan="2" data-label=""> <button class="btn btn-primary" onclick="SolicitarCambios('+data[i]['idMeta']+')" >Modificar</button> </td>';
								  NuevaMeta =  NuevaMeta + "<td colspan='2' data-label=''> <button class='btn btn-primary ValidaBoton' onclick='SolicitarCambios(\""+data[i]['idMeta']+"\")'>Modificar</button> </td>";
								//Etiqueta
								NuevaMeta =  NuevaMeta + '<td data-label="">Aceptado</td>';
								//
								//tbody
								NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
								
								NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+data[i]['NoMeta']+"'>";
								/*---------*/
								if(data[i]['NoHito'] !=null){
								NuevaMeta =  NuevaMeta + '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="text" class="form-control" title="'+data[i]['Hito']+'" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								}
								/*---------*/
								NuevaMeta =  NuevaMeta + "</table>"; 
								$('#EspacioMetas').append(NuevaMeta);
								$("#txtCantidadPonderacion"+data[i]['NoMeta']).val(data[i]['Ponderacion']);
								$("#txtUnidadMedida"+data[i]['NoMeta']).val(data[i]['UnidadMedida']);
								IDMeta = data[i]['NoMeta'];
								NoMetas =data[i]['NoMeta'];
							}else{
								if(data[i]['NoHito'] !=null){
								var NuevaMeta = '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="text" title="'+data[i]['Hito']+'" class="form-control" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'" disabled /></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'" disabled /></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" disabled/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+data[i]['NoMeta']).append(NuevaMeta);
								}
							}
						 MetasValidadas=1;
						}else if(data[i]['Estatus'] ==3){ //Rechazado
							if(data[i]['NoMeta']!= IDMeta){
								var NuevaMeta = '<table id="TablaMeta'+data[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
								NuevaMeta =  NuevaMeta + '<tr id="Meta'+data[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+data[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+data[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+data[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+data[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  								
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
								//tbody
								NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+data[i]['NoMeta']+'">'
								NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+data[i]['NoMeta']+'" class="NombreMeta"> <input  title="'+data[i]['meta']+'" type="text"  class="form-control" id="txtNombreMeta'+data[i]['NoMeta']+'" value="'+data[i]['meta']+'" ></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'" >';
								NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+data[i]['NoMeta']+'"  min="1" max="100"></td>';
								NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+data[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaMeta']+'" /></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+data[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+data[i]['NoMeta']+'" value="'+data[i]['idMeta']+'" /></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'">';
								//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' onchange='ConteoHitos(\""+data[i]['NoMeta']+"\")'>";
								NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' >";
								
								NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
								NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
								NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
								NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
								NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
								NuevaMeta =  NuevaMeta + '</select></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+data[i]['NoMeta']+'"> <input    title="'+data[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+data[i]['NoMeta']+'" value="'+data[i]['MinimoMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+data[i]['NoMeta']+'" > <input title="'+data[i]['SatisfactorioMeta']+'" maxlength="15" class="form-control" id="txtSatisfactorioMeta'+data[i]['NoMeta']+'" value="'+data[i]['SatisfactorioMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+data[i]['NoMeta']+'" > <input    title="'+data[i]['ExcelenteMeta']+'" class="form-control" maxlength="15" id="txtExcelenteMeta'+data[i]['NoMeta']+'" value="'+data[i]['ExcelenteMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-primary ValidaBoton" onclick="AgregarHito('+data[i]['NoMeta']+')">+</button> </td>';
								NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-danger ValidaBoton" onclick="ConfirmacionEliminaAlimento('+data[i]['NoMeta']+')">-</button> </td>';
								//Etiqueta
								//NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-primary" onclick="VerMotivoRechazo('+data[i]['ComentarioRechazo']+')">Motivo de <br>Rechazo</button></td>';
								NuevaMeta =  NuevaMeta + "<td data-label=''> <button class='btn btn-primary ValidaBoton' onclick='VerMotivoRechazo(\""+data[i]['ComentarioRechazo']+"\")'>Motivo de <br>Rechazo</button> </td>";
								//
								//tbody
								NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
								NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+data[i]['NoMeta']+"'>";
								/*---------*/
								if(data[i]['NoHito'] !=null){
								NuevaMeta =  NuevaMeta + '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input  type="text" class="form-control" title="'+data[i]['Hito']+'" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input  type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input  type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")' >-</button></div></td></tr>";  
								}
								/*---------*/
								NuevaMeta =  NuevaMeta + "</table>"; 
								$('#EspacioMetas').append(NuevaMeta);
								$("#txtCantidadPonderacion"+data[i]['NoMeta']).val(data[i]['Ponderacion']);
								$("#txtUnidadMedida"+data[i]['NoMeta']).val(data[i]['UnidadMedida']);
								IDMeta = data[i]['NoMeta'];
								NoMetas =data[i]['NoMeta'];
							}else{
								if(data[i]['NoHito'] !=null){
								var NuevaMeta = '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="text" title="'+data[i]['Hito']+'" class="form-control" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'"  /></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'"  /></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" /></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")' >-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+data[i]['NoMeta']).append(NuevaMeta);
								}
							}
						 MetasSinValidar=1;
						}else if(data[i]['Estatus'] ==4){ // solicitar cambios
							if(data[i]['NoMeta']!= IDMeta){
								var NuevaMeta = '<table id="TablaMeta'+data[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
								NuevaMeta =  NuevaMeta + '<tr id="Meta'+data[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+data[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+data[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+data[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+data[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td style='width:10%' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td style='width:10%' scope='col'></td></tr></thead>"
								//tbody
								NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+data[i]['NoMeta']+'">'
								NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+data[i]['NoMeta']+'" class="NombreMeta"> <input  title="'+data[i]['meta']+'" type="text"  class="form-control" id="txtNombreMeta'+data[i]['NoMeta']+'" value="'+data[i]['meta']+'" disabled></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'" disabled>';
								NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+data[i]['NoMeta']+'"  min="1" max="100" disabled></td>';
								NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+data[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+data[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+data[i]['NoMeta']+'" value="'+data[i]['idMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'">';
								//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' onchange='ConteoHitos(\""+data[i]['NoMeta']+"\")' disabled>";
								NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' disabled>";
								
								NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
								NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
								NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
								NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
								NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
								NuevaMeta =  NuevaMeta + '</select></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+data[i]['NoMeta']+'"> <input  disabled  title="'+data[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+data[i]['NoMeta']+'" value="'+data[i]['MinimoMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+data[i]['NoMeta']+'" > <input title="'+data[i]['SatisfactorioMeta']+'" disabled class="form-control" maxlength="15" id="txtSatisfactorioMeta'+data[i]['NoMeta']+'" value="'+data[i]['SatisfactorioMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+data[i]['NoMeta']+'" > <input  disabled  title="'+data[i]['ExcelenteMeta']+'" class="form-control" maxlength="15" id="txtExcelenteMeta'+data[i]['NoMeta']+'" value="'+data[i]['ExcelenteMeta']+'"/></td>';
								//NuevaMeta =  NuevaMeta + '<td data-label=""> <button disabled class="btn btn-primary" onclick="AgregarHito('+data[i]['NoMeta']+')">Agregar Hito</button> </td>';
								//NuevaMeta =  NuevaMeta + '<td data-label=""> <button disabled class="btn btn-danger" onclick="ConfirmacionEliminaAlimento('+data[i]['NoMeta']+')">Eliminar</button> </td>';
								//Etiqueta
								NuevaMeta =  NuevaMeta + '<td data-label="" colspan="3">Pendiente de autorización de cambios</td>';
								//
								//tbody
								NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
								NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+data[i]['NoMeta']+"'>";
								/*---------*/
								if(data[i]['NoHito'] !=null){
								NuevaMeta =  NuevaMeta + '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="text" class="form-control" title="'+data[i]['Hito']+'" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								}
								/*---------*/
								NuevaMeta =  NuevaMeta + "</table>"; 
								$('#EspacioMetas').append(NuevaMeta);
								$("#txtCantidadPonderacion"+data[i]['NoMeta']).val(data[i]['Ponderacion']);
								$("#txtUnidadMedida"+data[i]['NoMeta']).val(data[i]['UnidadMedida']);
								IDMeta = data[i]['NoMeta'];
								NoMetas =data[i]['NoMeta'];
							}else{
								if(data[i]['NoHito'] !=null){
								var NuevaMeta = '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="text" title="'+data[i]['Hito']+'" class="form-control" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'" disabled /></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'" disabled /></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" disabled/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+data[i]['NoMeta']).append(NuevaMeta);
								}
							}
							MetasPendientesdeValidar=1;
						}else if(data[i]['Estatus'] ==5){
						//
							if(data[i]['NoMeta']!= IDMeta){
								
								var NuevaMeta = '<table id="TablaMeta'+data[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
								NuevaMeta =  NuevaMeta + '<tr id="Meta'+data[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+data[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+data[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+data[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+data[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
								//tbody
								NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+data[i]['NoMeta']+'">'
								//NuevaMeta =  NuevaMeta + '<tr id="Meta'+data[i]['NoMeta']+'">'
								NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+data[i]['NoMeta']+'" class="NombreMeta"> <input type="text" title="'+data[i]['meta']+'"  class="form-control" id="txtNombreMeta'+data[i]['NoMeta']+'" value="'+data[i]['meta']+'"></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+data[i]['NoMeta']+'"  min="1" max="100"></td>';
								NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+data[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaMeta']+'" /></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+data[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+data[i]['NoMeta']+'" value="'+data[i]['idMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'">';
								//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' onchange='ConteoHitos(\""+data[i]['NoMeta']+"\")'>";
								NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' >";
								NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
								NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
								NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
								NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
								NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
								NuevaMeta =  NuevaMeta + '</select></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+data[i]['NoMeta']+'"> <input title="'+data[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+data[i]['NoMeta']+'" value="'+data[i]['MinimoMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+data[i]['NoMeta']+'" > <input title="'+data[i]['SatisfactorioMeta']+'" maxlength="15" title="Nombre de Meta" class="form-control" id="txtSatisfactorioMeta'+data[i]['NoMeta']+'" value="'+data[i]['SatisfactorioMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+data[i]['NoMeta']+'" > <input title="'+data[i]['ExcelenteMeta']+'" maxlength="15" title="Nombre de Meta" class="form-control" id="txtExcelenteMeta'+data[i]['NoMeta']+'" value="'+data[i]['ExcelenteMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-primary ValidaBoton" onclick="AgregarHito('+data[i]['NoMeta']+')">+</button> </td>';
								NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-danger ValidaBoton" onclick="ConfirmacionEliminaAlimento('+data[i]['NoMeta']+')">-</button> </td>';
								//Etiqueta
								//NuevaMeta =  NuevaMeta + '<td data-label="">'+data[i]['RechazoAutorizacion']+'</td>';
								NuevaMeta =  NuevaMeta + "<td data-label=''> <button class='btn btn-primary ValidaBoton' onclick='VerMotivoRechazo(\""+data[i]['RechazoAutorizacion']+"\")'>Motivo de <br>Rechazo</button> </td>";
								//
								//tbody
								NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
			
								NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+data[i]['NoMeta']+"'>";
								if(data[i]['NoHito'] !=null){
								/*---------*/
								NuevaMeta =  NuevaMeta + '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"><labe >Hito: </label></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="text" class="form-control" title="'+data[i]['Hito']+'"  id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")'>-</button></div></td></tr>";  
								}
								/*---------*/
								NuevaMeta =  NuevaMeta + "</table>"; 
								$('#EspacioMetas').append(NuevaMeta);
								$("#txtCantidadPonderacion"+data[i]['NoMeta']).val(data[i]['Ponderacion']);
								//
									$("#txtUnidadMedida"+data[i]['NoMeta']).val(data[i]['UnidadMedida']);
								//
								IDMeta = data[i]['NoMeta'];
								NoMetas =data[i]['NoMeta'];
							}else{
								if(data[i]['NoHito'] !=null){
									var NuevaMeta = '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
									NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
									NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
									NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"><labe >Hito: </label></td>';
									NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="text" class="form-control" title="'+data[i]['Hito']+'" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'"/></td>';
									NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
									NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'"/></td>';  
									NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"/></td>';  
									NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")'>-</button></div></td></tr>";  
									$("#TablaHitos_Meta"+data[i]['NoMeta']).append(NuevaMeta);
								}
							}
						MetasSinValidar=1;
						// En validacion
						}else if(data[i]['Estatus'] ==6){
							if(data[i]['NoMeta']!= IDMeta){
								var NuevaMeta = '<table id="TablaMeta'+data[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
								NuevaMeta =  NuevaMeta + '<tr id="Meta'+data[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+data[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+data[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+data[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+data[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
								//tbody
								NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+data[i]['NoMeta']+'">'
								NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+data[i]['NoMeta']+'" class="NombreMeta"> <input  title="'+data[i]['meta']+'" type="text"  class="form-control" id="txtNombreMeta'+data[i]['NoMeta']+'" value="'+data[i]['meta']+'" disabled></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'" disabled>';
								NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+data[i]['NoMeta']+'"  min="1" max="100" disabled></td>';
								NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+data[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+data[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+data[i]['NoMeta']+'" value="'+data[i]['idMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'">';
								//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' onchange='ConteoHitos(\""+data[i]['NoMeta']+"\")' disabled>";
								NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' disabled>";
								
								NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
								NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
								NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
								NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
								NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
								NuevaMeta =  NuevaMeta + '</select></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+data[i]['NoMeta']+'"> <input  disabled  title="'+data[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+data[i]['NoMeta']+'" value="'+data[i]['MinimoMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+data[i]['NoMeta']+'" > <input title="'+data[i]['SatisfactorioMeta']+'" disabled maxlength="15" class="form-control" id="txtSatisfactorioMeta'+data[i]['NoMeta']+'" value="'+data[i]['SatisfactorioMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+data[i]['NoMeta']+'" > <input  disabled  title="'+data[i]['ExcelenteMeta']+'" class="form-control" maxlength="15" id="txtExcelenteMeta'+data[i]['NoMeta']+'" value="'+data[i]['ExcelenteMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label=""> <button disabled class="btn btn-primary ValidaBoton" onclick="AgregarHito('+data[i]['NoMeta']+')">+</button> </td>';
								NuevaMeta =  NuevaMeta + '<td data-label=""> <button disabled class="btn btn-danger ValidaBoton" onclick="ConfirmacionEliminaAlimento('+data[i]['NoMeta']+')">-</button> </td>';
								//Etiqueta
								NuevaMeta =  NuevaMeta + '<td data-label="">Pendiente de Autorizacion en cambios</td>';
								//
								//tbody
								NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
								NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+data[i]['NoMeta']+"'>";
								/*---------*/
								if(data[i]['NoHito'] !=null){
								NuevaMeta =  NuevaMeta + '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="text" class="form-control" title="'+data[i]['Hito']+'" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								}
								/*---------*/
								NuevaMeta =  NuevaMeta + "</table>"; 
								$('#EspacioMetas').append(NuevaMeta);
								$("#txtCantidadPonderacion"+data[i]['NoMeta']).val(data[i]['Ponderacion']);
								$("#txtUnidadMedida"+data[i]['NoMeta']).val(data[i]['UnidadMedida']);
								IDMeta = data[i]['NoMeta'];
								NoMetas =data[i]['NoMeta'];
							}else{
								if(data[i]['NoHito'] !=null){
								var NuevaMeta = '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="text" title="'+data[i]['Hito']+'" class="form-control" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'" disabled /></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'" disabled /></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" disabled/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+data[i]['NoMeta']).append(NuevaMeta);
								}
							}
						MetasPendientesdeValidar=1;
						}else if(data[i]['Estatus'] ==7){ //Aceptado
							if(data[i]['NoMeta']!= IDMeta){
								var NuevaMeta = '<table id="TablaMeta'+data[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
								NuevaMeta =  NuevaMeta + '<tr id="Meta'+data[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+data[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+data[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+data[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+data[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
								//tbody
								NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+data[i]['NoMeta']+'">'
								NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+data[i]['NoMeta']+'" class="NombreMeta"> <input  title="'+data[i]['meta']+'" type="text"  class="form-control" id="txtNombreMeta'+data[i]['NoMeta']+'" value="'+data[i]['meta']+'" disabled></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'" disabled>';
								NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+data[i]['NoMeta']+'"  min="1" max="100" disabled></td>';
								NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+data[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+data[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+data[i]['NoMeta']+'" value="'+data[i]['idMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'">';
								//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' onchange='ConteoHitos(\""+data[i]['NoMeta']+"\")' disabled>";
								NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"'  disabled>";
								NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
								NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
								NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
								NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
								NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
								NuevaMeta =  NuevaMeta + '</select></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+data[i]['NoMeta']+'"> <input  disabled  title="'+data[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+data[i]['NoMeta']+'" value="'+data[i]['MinimoMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+data[i]['NoMeta']+'" > <input title="'+data[i]['SatisfactorioMeta']+'" maxlength="15" disabled class="form-control" id="txtSatisfactorioMeta'+data[i]['NoMeta']+'" value="'+data[i]['SatisfactorioMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+data[i]['NoMeta']+'" > <input  disabled  title="'+data[i]['ExcelenteMeta']+'" maxlength="15" class="form-control" id="txtExcelenteMeta'+data[i]['NoMeta']+'" value="'+data[i]['ExcelenteMeta']+'"/></td>';
								//NuevaMeta =  NuevaMeta + '<td colspan="2" data-label=""> <button class="btn btn-primary" onclick="SolicitarCambios('+data[i]['idMeta']+')" >Modificar</button> </td>';
								  NuevaMeta =  NuevaMeta + "<td colspan='2' data-label=''> <button class='btn btn-primary ValidaBoton' onclick='SolicitarCambios(\""+data[i]['idMeta']+"\")'>Modificar</button> </td>";
								//Etiqueta
								NuevaMeta =  NuevaMeta + '<td colspan="2" data-label="">Aceptado</td>';
								//
								//tbody
								NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
								NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+data[i]['NoMeta']+"'>";
								/*---------*/
								if(data[i]['NoHito'] !=null){
								NuevaMeta =  NuevaMeta + '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="text" class="form-control" title="'+data[i]['Hito']+'" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td data-label="">Pendiente por validar la calificacion</td></tr>';  
								}
								/*---------*/
								NuevaMeta =  NuevaMeta + "</table>"; 
								$('#EspacioMetas').append(NuevaMeta);
								$("#txtCantidadPonderacion"+data[i]['NoMeta']).val(data[i]['Ponderacion']);
								$("#txtUnidadMedida"+data[i]['NoMeta']).val(data[i]['UnidadMedida']);
								IDMeta = data[i]['NoMeta'];
								NoMetas =data[i]['NoMeta'];
							}else{
								if(data[i]['NoHito'] !=null){
								var NuevaMeta = '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="text" title="'+data[i]['Hito']+'" class="form-control" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'" disabled /></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'" disabled /></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" disabled/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+data[i]['NoMeta']).append(NuevaMeta);
								}
							}
						MetasCalificada=1;
						}else if(data[i]['Estatus'] ==8){ //Aceptado
							if(data[i]['NoMeta']!= IDMeta){
								var NuevaMeta = '<table id="TablaMeta'+data[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
								NuevaMeta =  NuevaMeta + '<tr id="Meta'+data[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+data[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+data[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+data[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+data[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
								//tbody
								NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+data[i]['NoMeta']+'">'
								NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+data[i]['NoMeta']+'" class="NombreMeta"> <input  title="'+data[i]['meta']+'" type="text"  class="form-control" id="txtNombreMeta'+data[i]['NoMeta']+'" value="'+data[i]['meta']+'" disabled></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'" disabled>';
								NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+data[i]['NoMeta']+'"  min="1" max="100" disabled></td>';
								NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+data[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+data[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+data[i]['NoMeta']+'" value="'+data[i]['idMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'">';
								//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' onchange='ConteoHitos(\""+data[i]['NoMeta']+"\")' disabled>";
								NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' disabled>";
								
								NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
								NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
								NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
								NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
								NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
								NuevaMeta =  NuevaMeta + '</select></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+data[i]['NoMeta']+'"> <input  disabled  title="'+data[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+data[i]['NoMeta']+'" value="'+data[i]['MinimoMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+data[i]['NoMeta']+'" > <input title="'+data[i]['SatisfactorioMeta']+'" maxlength="15" disabled class="form-control" id="txtSatisfactorioMeta'+data[i]['NoMeta']+'" value="'+data[i]['SatisfactorioMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+data[i]['NoMeta']+'" > <input  disabled  title="'+data[i]['ExcelenteMeta']+'" maxlength="15" class="form-control" id="txtExcelenteMeta'+data[i]['NoMeta']+'" value="'+data[i]['ExcelenteMeta']+'"/></td>';
								//NuevaMeta =  NuevaMeta + '<td colspan="2" data-label=""> <button class="btn btn-primary" onclick="SolicitarCambios('+data[i]['idMeta']+')" >Modificar</button> </td>';
								NuevaMeta =  NuevaMeta + '<td colspan="2" data-label="">Calficacion Rechazada</td>'; 
								//Etiqueta
								NuevaMeta =  NuevaMeta + '<td data-label="">Aceptado</td>';
								//
								//tbody
								NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
								NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+data[i]['NoMeta']+"'>";
								/*---------*/
								if(data[i]['NoHito'] !=null){
								NuevaMeta =  NuevaMeta + '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="text" class="form-control" title="'+data[i]['Hito']+'" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								}
								/*---------*/
								NuevaMeta =  NuevaMeta + "</table>"; 
								$('#EspacioMetas').append(NuevaMeta);
								$("#txtCantidadPonderacion"+data[i]['NoMeta']).val(data[i]['Ponderacion']);
								$("#txtUnidadMedida"+data[i]['NoMeta']).val(data[i]['UnidadMedida']);
								IDMeta = data[i]['NoMeta'];
								NoMetas =data[i]['NoMeta'];
							}else{
								if(data[i]['NoHito'] !=null){
								var NuevaMeta = '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="text" title="'+data[i]['Hito']+'" class="form-control" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'" disabled /></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'" disabled /></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" disabled/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+data[i]['NoMeta']).append(NuevaMeta);
								}
							}
							MetasCalificada=1;
						}else if(data[i]['Estatus'] ==9){ //Aceptado
							if(data[i]['NoMeta']!= IDMeta){
								var NuevaMeta = '<table id="TablaMeta'+data[i]['NoMeta']+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
								NuevaMeta =  NuevaMeta + '<tr id="Meta'+data[i]['NoMeta']+'" ><th id ="tdEtiquetaNoMeta'+data[i]['NoMeta']+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+data[i]['NoMeta']+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+data[i]['NoMeta']+'"  scope="col" class="Fecha" > Fecha: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Mínimo: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+data[i]['NoMeta']+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
								NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+data[i]['NoMeta']+'"  scope="col" class="Minimo"> Excelente: </th>';
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
								NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
								//tbody
								NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+data[i]['NoMeta']+'">'
								NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+data[i]['NoMeta']+'" class="NombreMeta"> <input  title="'+data[i]['meta']+'" type="text"  class="form-control" id="txtNombreMeta'+data[i]['NoMeta']+'" value="'+data[i]['meta']+'" disabled></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'" disabled>';
								NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+data[i]['NoMeta']+'"  min="1" max="100" disabled></td>';
								NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+data[i]['NoMeta']+'" class="FechaHito"> <input title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+data[i]['NoMeta']+'" style="display:none;"> <input  type="text"  class="form-control" id="txtID_Meta'+data[i]['NoMeta']+'" value="'+data[i]['idMeta']+'" disabled/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+data[i]['NoMeta']+'">';
								//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' onchange='ConteoHitos(\""+data[i]['NoMeta']+"\")' disabled>";
								NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+data[i]['NoMeta']+"' disabled>";
								
								NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
								NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
								NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
								NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
								NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
								NuevaMeta =  NuevaMeta + '</select></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+data[i]['NoMeta']+'"> <input  disabled  title="'+data[i]['MinimoMeta']+'" class="form-control" maxlength="15" id="txtMinimoMeta'+data[i]['NoMeta']+'" value="'+data[i]['MinimoMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+data[i]['NoMeta']+'" > <input title="'+data[i]['SatisfactorioMeta']+'" maxlength="15" disabled class="form-control" id="txtSatisfactorioMeta'+data[i]['NoMeta']+'" value="'+data[i]['SatisfactorioMeta']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+data[i]['NoMeta']+'" > <input  disabled  title="'+data[i]['ExcelenteMeta']+'" maxlength="15" class="form-control" id="txtExcelenteMeta'+data[i]['NoMeta']+'" value="'+data[i]['ExcelenteMeta']+'"/></td>';
								//NuevaMeta =  NuevaMeta + '<td colspan="2" data-label=""> <button class="btn btn-primary" onclick="SolicitarCambios('+data[i]['idMeta']+')" >Modificar</button> </td>';
								NuevaMeta =  NuevaMeta + '<td data-label="" colspan="2" >Calficacion Aceptada</td>'; 
								//Etiqueta
								NuevaMeta =  NuevaMeta + '<td data-label="">Aceptado</td>';
								//
								//tbody
								NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
								NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+data[i]['NoMeta']+"'>";
								/*---------*/
								if(data[i]['NoHito'] !=null){
								NuevaMeta =  NuevaMeta + '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="text" class="form-control" title="'+data[i]['Hito']+'" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'"/></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input disabled type="date" class="form-control" title="Fecha de Hito" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'"/></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input disabled type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								}
								/*---------*/
								NuevaMeta =  NuevaMeta + "</table>"; 
								$('#EspacioMetas').append(NuevaMeta);
								$("#txtCantidadPonderacion"+data[i]['NoMeta']).val(data[i]['Ponderacion']);
								$("#txtUnidadMedida"+data[i]['NoMeta']).val(data[i]['UnidadMedida']);
								IDMeta = data[i]['NoMeta'];
								NoMetas =data[i]['NoMeta'];
							}else{
								if(data[i]['NoHito'] !=null){
								var NuevaMeta = '<tr id="NoHito'+data[i]['NoHito']+'_Meta'+data[i]['NoMeta']+'">';
								NuevaMeta =  NuevaMeta + '<td id="IDtdNoHito'+data[i]['NoHito']+'-NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoMeta']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none">'+data[i]['NoHito']+'</td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaNoHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Hito: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="text" title="'+data[i]['Hito']+'" class="form-control" id="txtNombreHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['Hito']+'" disabled /></td>';
								NuevaMeta =  NuevaMeta + '<td id="tdEtiquetaFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'">Fecha: </td>';
								NuevaMeta =  NuevaMeta + '<td id ="tdFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" value="'+data[i]['FechaHito']+'" disabled /></td>';  
								NuevaMeta =  NuevaMeta + '<td id ="tdIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" style="display:none;" > <input type="text" value="'+data[i]['idHito']+'" class="form-control" id="txtIDHito'+data[i]['NoHito']+'_NoMeta'+data[i]['NoMeta']+'" disabled/></td>';  
								NuevaMeta =  NuevaMeta + "<td><div class='Mov'><button class='btn btn-danger ValidaBoton' onclick='ConfirmacionEliminaHito("+data[i]['NoMeta']+","+data[i]['NoHito']+")' disabled>-</button></div></td></tr>";  
								$("#TablaHitos_Meta"+data[i]['NoMeta']).append(NuevaMeta);
								}
							}
						 MetasCalificada=1;
						}
						
						//
					}
				}
				//
				if(MetasPendientesdeValidar != 0){
					$("#ValidarMetas").attr("disabled", true);
					//$("#GuardarMetas").attr("disabled", true);
					
				}else{
					$("#ValidarMetas").removeAttr("disabled");
				}
				if(MetasValidadas == 0){
					//AgregarMetas
					$("#AgregarMetas").attr("disabled", true);
				}else{
					$("#AgregarMetas").removeAttr("disabled");
					if(MetasPendientesdeValidar != 0){
					$("#ValidarMetas").attr("disabled", true);
					}
					if(MetasSinValidar ==0){
						$("#GuardarMetas").attr("disabled", true);
					}if(MetasPendientesdeValidar==0){
						$("#ValidarMetas").attr("disabled", true);
					}
				}
				if(MetasSinValidar == 0){
					//AgregarMetas
					$("#GuardarMetas").attr("disabled", true);
				}else{
					$("#GuardarMetas").removeAttr("disabled");
					$("#AgregarMetas").removeAttr("disabled");
					$("#ValidarMetas").removeAttr("disabled");
					
				}
				if( MetasValidadas==0 && MetasPendientesdeValidar==0 && MetasSinValidar==0){
					$("#GuardarMetas").removeAttr("disabled");
					$("#AgregarMetas").removeAttr("disabled");
					$("#ValidarMetas").removeAttr("disabled");
				}
				if(MetasCalificada==1){
					$("#GuardarMetas").attr("disabled", true);
					$("#AgregarMetas").attr("disabled", true);
					$("#ValidarMetas").attr("disabled", true);
					$(".ValidaBoton").attr("disabled", true);
					//ValidaBoton
				}
				//
			}
			
		});
		 //setTimeout(ValidarFecha, 400);
	//
	}else{
		alert("Favor de Agregar un numero de empleado.");
	}
	
	//
}
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

function AgregarMeta(){
	debugger;
	var CantidaddeMetas = document.getElementsByClassName("TablasMetas").length;
	if(CantidaddeMetas >= 0 && CantidaddeMetas < 6){
	var ValidarCampos = ValidacionCamposVacios();
		if(ValidarCampos == 0){
			ObtenerUltimaMeta(NoMetas);
			NoMetas = NoMetas +1;
			
			var NuevaMeta = '<table id="TablaMeta'+NoMetas+'" class="table table-bordered table-hover TablaResponsiva TablasMetas" ><thead>';
			NuevaMeta =  NuevaMeta + '<tr id="Meta'+NoMetas+'"><th id ="tdEtiquetaNoMeta'+NoMetas+'" scope="col" class="MetaAnual"> Meta Anual: </th>';
			NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaPonderacion'+NoMetas+'"  scope="col" class="Ponderacion" > Ponderación: </th>';
			NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaFecha'+NoMetas+'"  scope="col" class="Fecha" > Fecha: </th>';
			NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+NoMetas+'"  scope="col" class="UnidadMedida"> Unidad de Medida: </th>';
			NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaMinimoMeta'+NoMetas+'"  scope="col" class="Minimo"> Mínimo: </th>';
			NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaSatisfactorio'+NoMetas+'"  scope="col" class="Satisfactorio"> Satisfactorio: </th>';
			NuevaMeta =  NuevaMeta + '<th id ="tdEtiquetaExcelenteMeta'+NoMetas+'"  scope="col" class="Minimo"> Excelente: </th>';
			NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
			NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td>";  
			NuevaMeta =  NuevaMeta + "<td class='Ponderacion' scope='col'></td></tr></thead>"
			//tbody
			NuevaMeta =  NuevaMeta + '<tbody id="TablaBodyMeta'+NoMetas+'">'
			NuevaMeta =  NuevaMeta + '<tr><td id="tdNometa'+NoMetas+'" style="display:none">'+NoMetas+'</td>';
			NuevaMeta =  NuevaMeta + '<td data-label="Meta Anual:" id ="tdNombreMeta'+NoMetas+'" class="NombreMeta"> <input title="Nombre de Meta" type="text" class="form-control" id="txtNombreMeta'+NoMetas+'"></td>';
			NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+NoMetas+'">';
			NuevaMeta =  NuevaMeta + '<input type="number" title="Ponderacion de Meta"  class="form-control" id="txtCantidadPonderacion'+NoMetas+'" min="1" max="100"></td>';
			NuevaMeta =  NuevaMeta + '<td  data-label="Fecha:" id ="tdFechaMeta'+NoMetas+'" class="FechaHito"> <input  title="Fecha de Meta" type="date" class="form-control" id="txtFechaMeta'+NoMetas+'"/></td>';
			NuevaMeta =  NuevaMeta + '<td id ="tdID_Meta'+NoMetas+'" style="display:none;"> <input  type="text" value="0" class="form-control" id="txtID_Meta'+NoMetas+'"/></td>';
			NuevaMeta =  NuevaMeta + '<td data-label="Ponderación:" id ="tdPonderacion'+NoMetas+'">';
			
			//NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+NoMetas+"'  onchange='ConteoHitos(\""+NoMetas+"\")'>";
			NuevaMeta =  NuevaMeta + "<select title='Unidad de Medida de Meta' data-label='Unidad de Medida:' class='form-control' id='txtUnidadMedida"+NoMetas+"'  >";
			//
			NuevaMeta =  NuevaMeta + '<option value="0">-Seleccionar-</option>';
			NuevaMeta =  NuevaMeta + '<option value="1">Hito</option>';
			NuevaMeta =  NuevaMeta + '<option value="2">Número</option>';
			NuevaMeta =  NuevaMeta + '<option value="3">$</option>';
			NuevaMeta =  NuevaMeta + '<option value="4">%</option>';
			NuevaMeta =  NuevaMeta + '</select></td>';
			NuevaMeta =  NuevaMeta + '<td data-label="Mínimo:" id ="tdMinimoMeta'+NoMetas+'"> <input title="Calificacion minima de Meta" class="form-control" maxlength="15" id="txtMinimoMeta'+NoMetas+'"/></td>';
			NuevaMeta =  NuevaMeta + '<td data-label="Satisfactorio:" id ="tdSatisfactorioMeta'+NoMetas+'" > <input title="Calificacion satisfactoria de Meta" maxlength="15" class="form-control" id="txtSatisfactorioMeta'+NoMetas+'"/></td>';
			NuevaMeta =  NuevaMeta + '<td data-label="Excelente:" id ="tdExcelenteMeta'+NoMetas+'" > <input title="Calificacion excelente de Meta" class="form-control" maxlength="15" id="txtExcelenteMeta'+NoMetas+'"/></td>';
			NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-primary" onclick="AgregarHito('+NoMetas+')">+</button> </td>';
			NuevaMeta =  NuevaMeta + '<td data-label=""> <button class="btn btn-danger" onclick="ConfirmacionEliminaAlimento('+NoMetas+')">-</button> </td>';
			NuevaMeta =  NuevaMeta + '<td data-label="">  </td>';	
			//tbody
			NuevaMeta =  NuevaMeta + "</tr></tbody></table>";  
			NuevaMeta =  NuevaMeta + "<table class='table table-bordered table-hover TablaResponsiva' id='TablaHitos_Meta"+NoMetas+"'>";
			//NuevaMeta =  NuevaMeta + '<tr><th id ="tdEtiquetaNoMeta'+NoMetas+'"> Meta Anual No. '+NoMetas+': </th></tr>';
			NuevaMeta =  NuevaMeta + "</table>";  
			$('#EspacioMetas').append(NuevaMeta);
			setFocusToTextBox(NoMetas)
			$("#GuardarMetas").removeAttr("disabled");
			$("#AgregarMetas").removeAttr("disabled");
			$("#ValidarMetas").removeAttr("disabled");
		}else{
			alert("Falta agregar informacion el registro anterior");
		}
	}else{
		alert("El número de metas anuales ha sido completado");
	}
}
//
function ValidacionCamposVacios(){
	if(NoMetas!=0){
		//if(comentarios.replace(/\s/g,"") != "")
		var NombreMeta = $("#txtNombreMeta"+NoMetas).val();
		var CantidadPonderacion = $("#txtCantidadPonderacion"+NoMetas).val();
		var FechaMeta =$("#txtFechaMeta"+NoMetas).val();
		//
		var UnidadMedida =$("#txtUnidadMedida"+NoMetas).val();
		var MinimoMeta =$("#txtMinimoMeta"+NoMetas).val();
		var SatisfactorioMeta =$("#txtSatisfactorioMeta"+NoMetas).val();
		var ExcelenteMeta =$("#txtExcelenteMeta"+NoMetas).val();
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
function ConfirmacionEliminaAlimento(NoMetas){
	var NoMeta = NoMetas;
	 var Confirmar = confirm("Deseas eliminar el registro?");
      if (Confirmar){
		   var IdMeta = $("#txtID_Meta"+NoMetas).val();
		   if(IdMeta=="0"){
			ElimarAlimento(NoMeta)
		   }else{
			    ElimarMetaBD(IdMeta);
				
		   }
      }else{
        return false;
	  }
}
function ElimarMetaBD(IdMeta){
	$.ajax({
            type: "POST",
            data: {
                param: 5,
				NoMeta: IdMeta,
            },
            url: "../utileria.php",
            dataType: 'JSON',
             success: function(data) {
			   for(i=0;i<data.length;i++){
					if(data[i]['Validar'] == true ){
						alert("La información ha sido eliminada correctamente");
						location.reload();
					}
						else{
							alert("La información no pudo ser eliminada");
						}
					}
			}
		});
}
function ElimarAlimento(NoMeta){
	$("#TablaMeta" + NoMeta).remove();
	$("#TablaHitos_Meta" + NoMeta).remove();
	
	if( !$.trim( $('#EspacioMetas').html() ).length ){
		Metas = 0;
	}
	else{
		//Metas = 1;
		Metas = ObtenerUltimaMeta();
	}
	//var Metas = $('#EspacioMetas:empty').length 
	if(Metas == 0){
		NoMetas=0;
	}
	
}
function ObtenerUltimaMeta(){
	var nuevaNoMeta =0;
	for(i=0;i<=NoMetas;i++){
		if ( $("#TablaMeta"+i).length ) {
		  nuevaNoMeta = i;
		}
	}
	NoMetas= nuevaNoMeta
}
function AgregarHito(NoMeta){
	//El parametro de numero de meta es para validar en que tabla debe de agregarse
	var ValidarCampos = ValidacionCamposVaciosHitos(NoMeta);
	if(ValidarCampos == 0){
		var Lineas = $("#TablaHitos_Meta"+NoMeta+" tr").length;
		var NoHito = 0;
		if(Lineas <=5){
			if(Lineas == 0){
				NoHito=1;
				var NuevoHito = '<tr id="NoHito'+NoHito+'_Meta'+NoMeta+'">';
				NuevoHito =  NuevoHito + '<td id="IDtdNoHito'+NoHito+'-NoMeta'+NoMeta+'" style="display:none">'+NoMeta+'</td>';
				NuevoHito =  NuevoHito + '<td id="tdNoHito'+NoHito+'_NoMeta'+NoMeta+'" style="display:none">'+NoHito+'</td>';
				NuevoHito =  NuevoHito + '<td id="tdEtiquetaNoHito'+NoHito+'_NoMeta'+NoMeta+'"><labe>Hito: </label></td>';
				NuevoHito =  NuevoHito + '<td id ="tdNombreHito'+NoHito+'_NoMeta'+NoMeta+'"> <input type="text" title="Nombre de Hito" class="form-control" id="txtNombreHito'+NoHito+'_NoMeta'+NoMeta+'"/></td>';
				NuevoHito =  NuevoHito + '<td id="tdEtiquetaFechaHito'+NoHito+'_NoMeta'+NoMeta+'">Fecha: </td>';
				NuevoHito =  NuevoHito + '<td id ="tdFechaHito'+NoHito+'_NoMeta'+NoMeta+'"> <input type="date" title="Fecha de Hito" class="form-control" id="txtFechaHito'+NoHito+'_NoMeta'+NoMeta+'"/></td>';  
				NuevoHito =  NuevoHito + '<td id ="tdIDHito'+NoHito+'_NoMeta'+NoMeta+'" style="display:none;" > <input  type="text" value="0" class="form-control" id="txtIDHito'+NoHito+'_NoMeta'+NoMeta+'"/></td>';  
				NuevoHito =  NuevoHito + "<td><div class='Mov'><button class='btn btn-danger' onclick='ConfirmacionEliminaHito("+NoMeta+","+NoHito+")'>-</button></div></td></tr>";  
				  
				$("#TablaHitos_Meta"+NoMeta).append(NuevoHito);
				
			}else{
				NoHito = GuardarRecordatorio(NoMeta);
				NoHito = NoHito+1;
				var NuevoHito = '<tr id="NoHito'+NoHito+'_Meta'+NoMeta+'">';
				NuevoHito =  NuevoHito + '<td id="IDtdNoHito'+NoHito+'-NoMeta'+NoMeta+'" style="display:none">'+NoMeta+'</td>';
				NuevoHito =  NuevoHito + '<td id="tdNoHito'+NoHito+'_NoMeta'+NoMeta+'" style="display:none">'+NoHito+'</td>';
				NuevoHito =  NuevoHito + '<td id="tdEtiquetaNoHito'+NoHito+'_NoMeta'+NoMeta+'"><labe>Hito: </label></td>';
				NuevoHito =  NuevoHito + '<td id ="tdNombreHito'+NoHito+'_NoMeta'+NoMeta+'"> <input title="Nombre de Hito" type="text" class="form-control" id="txtNombreHito'+NoHito+'_NoMeta'+NoMeta+'"/></td>';
				NuevoHito =  NuevoHito + '<td id="tdEtiquetaFechaHito'+NoHito+'_NoMeta'+NoMeta+'">Fecha: </td>';
				NuevoHito =  NuevoHito + '<td id ="tdFechaHito'+NoHito+'_NoMeta'+NoMeta+'"> <input title="Fecha de Hito" type="date" class="form-control" id="txtFechaHito'+NoHito+'_NoMeta'+NoMeta+'"/></td>';  
				NuevoHito =  NuevoHito + '<td id ="tdIDHito'+NoHito+'_NoMeta'+NoMeta+'" style="display:none;"> <input type="text" value="0" class="form-control" id="txtIDHito'+NoHito+'_NoMeta'+NoMeta+'"/></td>';  
				NuevoHito =  NuevoHito + "<td><button class='btn btn-danger' onclick='ConfirmacionEliminaHito("+NoMeta+","+NoHito+")'>-</button></td></tr>";  
				
				$("#TablaHitos_Meta"+NoMeta).append(NuevoHito);
			}
			//ConteoHitos(NoMeta);
		}else{
			alert("El limite de los hitos ha sido alcanzado");
		}
	}else{
		alert("Falta agregar informacion el registro anterior");
	}
}
function ConfirmacionEliminaHito(NoMetas,Hito){
	var NoMeta = NoMetas;
	 var Confirmar = confirm("Deseas eliminar el registro?");
      if (Confirmar){
		  var IdHito = $("#txtIDHito"+Hito+"_NoMeta"+NoMetas).val();
		  if(IdHito=="0"){
			ElimarHito(NoMeta, Hito)
		  }else{
			  //alert("Borra desde la base de datos");
			  ElimarHitoBD(IdHito,NoMetas);
		  }
      }
	  else{
        return false;
	  }
}
function ElimarHitoBD(IdHito,NoMeta){
	$.ajax({
            type: "POST",
            data: {
                param: 4,
				IdHito: IdHito,
				NoMeta: NoMeta,
            },
            url: "../utileria.php",
            dataType: 'JSON',
             success: function(data) {
			   for(i=0;i<data.length;i++){
					if(data[i]['Validar'] == true ){
						alert("La información ha sido eliminada correctamente");
						location.reload();
						
					}
						else{
							alert("La información no pudo ser eliminada");
						}
					}
			}
		});
}
function ElimarHito(NoMeta, Hito){
	$("#NoHito"+Hito+"_Meta"+NoMeta).remove(); 
	//ConteoHitos(NoMeta);
}
function ValidacionCamposVaciosHitos(NoMeta){
	var Lineas = $("#TablaHitos_Meta"+NoMeta+" tr").length;
	var NoHito = GuardarRecordatorio(NoMeta);
	if(NoHito!=0){
		//if(comentarios.replace(/\s/g,"") != "") txtNombreHito1_NoMeta1
		var NombreHito = $("#txtNombreHito"+NoHito+"_NoMeta"+NoMeta).val();
		var CantidadPonderacion = $("#txtFechaHito"+NoHito+"_NoMeta"+NoMeta).val();
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
    var arrayRecordatorio24H = [];
	var numHito = 0;
        $("#TablaHitos_Meta"+NoMeta+" tr").each(function(index, value) {
            var campo1, campo2, campo3;
			var i =0;
			
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
function ValidarPonderacion(){
	TotalPonderaciones =0;
	for(i=0;i<=NoMetas;i++){
		if ( $("#txtCantidadPonderacion"+i).length > 0 ) {
			TotalPonderaciones = TotalPonderaciones + parseFloat($("#txtCantidadPonderacion"+i).val());
		}
	}
	return TotalPonderaciones;
}
function GuardarMetas(){
	var CantidaddeMetas = document.getElementsByClassName("TablasMetas").length;
	if(CantidaddeMetas >0){
		var TotalEnPonderacion = ValidarPonderacion();
		if(TotalEnPonderacion <= 100){
			//alert("Guarda");
			//var arrayAgregaAcompaniantes = {};
			var NoEmpleado = $("#txtNumEmpleadoLogeado").val();
			var NombreEmpleado = $("#NombreCont2").text();
			
			arrayListadoMetas = GuardarListadoMetas();
			arrayListadoHitoMetas = GuardarListadoHitos();
			/*---*/
			$.ajax({
					type: "POST",
					data: {
						param: 2,
						NoEmpleado: NoEmpleado,
						NombreEmpleado: NombreEmpleado,
						arrayListadoMetas : JSON.stringify(arrayListadoMetas),
						arrayListadoHitoMetas : JSON.stringify(arrayListadoHitoMetas),
					},
					url: "../utileria.php", 
					dataType: 'JSON',
					 success: function(data) {
					   for(i=0;i<data.length;i++){
							if(data[i]['Validar'] == true ){
								alert("La información ha sido guardada correctamente");
								location.reload();
							}
								else{
									alert("La información no pudo ser guardada");
								}
							}
					}
			});
			/*---*/
		}
		else{
			alert("El total de los porcentajes debe de ser menor 100% ");
		}
	}else{
		alert("Es necesario tener tres metas o mas, para poder guardar.")
	}
	
}
function GuardarListadoMetas() {
    var arrayListaMetas = [];
	var CantidaddeMetas = document.getElementsByClassName("TablasMetas").length;
		for(i=0;i<=NoMetas;i++){
			
			$("#TablaBodyMeta"+i+" tr").each(function(index, value) {
				var NoMeta, NombreMeta, Ponderacion, Fecha, IdMeta,UnidadMedida,MinimoMeta,SatisfactorioMeta,ExcelenteMeta;
				$(this).children("td").each(function(index2) {
					switch (index2) {
						case 0:
							 NoMeta = $(this).text();
						break;
						case 1:
							 NombreMeta = $("#txtNombreMeta"+i).val();
						break;
						case 2:
							 Ponderacion = $("#txtCantidadPonderacion"+i).val();
						break;
						case 3:
							 Fecha = $("#txtFechaMeta"+i).val();
						break;
						case 4:
							 IdMeta = $("#txtID_Meta"+i).val();
						break;
						case 5:
							 UnidadMedida = $("#txtUnidadMedida"+i).val();
						break;
						case 6:
							 MinimoMeta = $("#txtMinimoMeta"+i).val();
						break;
						case 7:
							 SatisfactorioMeta = $("#txtSatisfactorioMeta"+i).val();
						break;
						case 8:
							 ExcelenteMeta = $("#txtExcelenteMeta"+i).val();
						break;
					}
				});
				//$('#txtPercepcionLiq').val(TotalRefacc);
				var Array = {};
				Array.NoMeta = NoMeta;
				Array.NombreMeta = NombreMeta;
				Array.Ponderacion = Ponderacion;
				Array.Fecha = Fecha;
				Array.IdMeta = IdMeta;
				//
				Array.UnidadMedida = UnidadMedida;
				Array.MinimoMeta = MinimoMeta;
				Array.SatisfactorioMeta = SatisfactorioMeta;
				Array.ExcelenteMeta = ExcelenteMeta;
				arrayListaMetas.push(Array);
			});
		}
        return arrayListaMetas;
}
function GuardarListadoHitos() {
    var arrayListaHitos = [];
	var CantidaddeMetas = document.getElementsByClassName("TablasMetas").length;
		for(i=0;i<=NoMetas;i++){
			
			$("#TablaHitos_Meta"+i+" tr").each(function(index, value) {
				var Hito=0;
				var NoMeta, NoHito, NombreHito, FechaHito, IdHito;
				$(this).children("td").each(function(index2) {
					Hito = Hito +1;
					switch (index2) {
						case 0:
							 NoMeta = $(this).text();
						break;
						case 1:
							 NoHito = $(this).text();
						break;
						case 2:
							 NombreHito = $("#txtNombreHito"+NoHito+"_NoMeta"+NoMeta).val();
						break;
						case 3:
							 FechaHito = $("#txtFechaHito"+NoHito+"_NoMeta"+NoMeta).val();
						break;
						case 4:
							 IdHito = $("#txtIDHito"+NoHito+"_NoMeta"+NoMeta).val();
						break;
					}
				});
				//$('#txtPercepcionLiq').val(TotalRefacc);
				var Array = {};
				Array.NoMeta = NoMeta;
				Array.NoHito = NoHito;
				Array.NombreHito = NombreHito;
				Array.FechaHito = FechaHito;
				Array.IdHito = IdHito;
				arrayListaHitos.push(Array);
			});
		}
        return arrayListaHitos;
}
function ValidarMetas(){
	debugger;
	var CantidaddeMetas = document.getElementsByClassName("TablasMetas").length;
	if(CantidaddeMetas >= 3 && CantidaddeMetas < 6){
		var TotalEnPonderacion = ValidarPonderacion();
		if(TotalEnPonderacion == 100){
			//alert("Guarda");
			//var arrayAgregaAcompaniantes = {};
			var NoEmpleado = $("#txtNumEmpleadoLogeado").val();
			var NombreEmpleado = $("#NombreCont2").text();
			
			arrayListadoMetas = GuardarListadoMetas();
			arrayListadoHitoMetas = GuardarListadoHitos();
			/*---*/
			$.ajax({
					type: "POST",
					data: {
						param: 8,
						NoEmpleado: NoEmpleado,
						NombreEmpleado: NombreEmpleado,
						arrayListadoMetas : JSON.stringify(arrayListadoMetas),
						arrayListadoHitoMetas : JSON.stringify(arrayListadoHitoMetas),
					},
					url: "../utileria.php", 
					dataType: 'JSON',
					 success: function(data) {
					   for(i=0;i<data.length;i++){
							if(data[i]['Validar'] == true ){
								alert("La información ha sido guardada correctamente");
								location.reload();
							}
								else{
									alert("La información no pudo ser guardada");
								}
							}
					}
			});
			/*---*/
		}
		else{
			alert("El total de los porcentajes debe de ser 100% ");
		}
	}else{
		alert("Es necesario tener minimo 3 metas maximo 6 metas, para poder guardar.")
	}
	
}
function VerMotivoRechazo(MotivoMensaje){
	$("#txtComentarioMeta").val(MotivoMensaje);
	$('#ModalMotivoRechazo').modal('show');
}
function SolicitarCambios(IdMeta){
	$("#txtIdMetaCambios").val(IdMeta);
	$("#txtComentarioCambios").val("");
	$('#ModalMotivoCambios').modal('show');
}
function ConfirmacionCambiosMeta(){
	var ComentarioCambios = $("#txtComentarioCambios").val();	
	if(ComentarioCambios.replace(/\s/g,"")!= ""){
	  var Confirmar = confirm("Desea solicitar cambios de la meta");
      if (Confirmar){
		SolicitarCambiosMeta();
	  }
      else{
		return false;
	  }
	}else{
		alert("Favor de agregar informacion en el comentario");
	}
}
function SolicitarCambiosMeta(){
	var IdMeta = $("#txtIdMetaCambios").val();
	var empleado = $("#txtNumEmpleadoLogeado").val();
	var Comentario =  $("#txtComentarioCambios").val();
	$.ajax({
				type: "POST",
				data: {
					param: 12,
					empleado: empleado,
					IdMeta: IdMeta,
					Comentario:Comentario
				},
				url: "../utileria.php",
				dataType: 'JSON',
				 success: function(data) {
					for(i=0;i<data.length;i++){
						if(data[i]['Validar'] == true ){
							alert("La información ha sido guardado correctamente");
							location.reload();
						}
						else{
							alert("La información no pudo ser guardado");
						}
					}
					
				}
			});
}
function ConteoHitos(NoMeta){
	var unidadMedida = $("#txtUnidadMedida"+NoMeta).val();
	if(unidadMedida =="1"){
		var Lineas = $("#TablaHitos_Meta"+NoMeta+" tr").length;
		$("#txtExcelenteMeta"+NoMeta).val(Lineas);
	}
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