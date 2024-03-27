function CargaEmpresa(){
	$("#navbar_global").removeClass("colores_afflux");
	$("#sidebar_global").removeClass("colores_afflux");
	$("li > a.nav-link").removeClass("letra_iconos_blancos_afflux");
	$("button").removeClass("btn_primary_afflux");
	$('#icono_empresa').hide();
	$('#texto_logo').hide();
	$('#imagen_empresa').attr('src', '');
	$('#imagen_empresa').removeClass("img-afflux");
	let empleado = $("#txtNumEmpleadoLogeado").val()
	if(empleado.replace(/\s/g,"") != ""){
		$.ajax({
			url: "../utileria.php",
			type: "post",
			data: {"param":1, "empleado":empleado},
            success: function(result){
				let data = JSON.parse(result);
				if (data.estatus == "success") {
					let datos = data.data;
					if("AFFLUX CAPITAL" == "AFFLUX CAPITAL"){
						$("#navbar_global").removeClass("color_fratech");
						$("#sidebar_global").removeClass("color_fratech");
						$("#boton_barras_global").removeClass("letra_iconos_blancos");
						$("#letras_inicio_global").removeClass("letra_iconos_blancos");
						$("#icono_usuario_global").removeClass("letra_iconos_blancos");
						$("div.card > div.card-header").removeClass("letra_iconos_blancos");
						$("div.card > div.card-header").removeClass("letra_iconos_blancos");
						$("button").removeClass("btn-primary");
						$("thead").removeClass("color_fratech");
						$("thead").removeClass("letra_iconos_blancos");
						$("#navbar_global").addClass("colores_afflux");
						$("#sidebar_global").addClass("colores_afflux");
						$("#boton_barras_global").addClass("letra_iconos_blancos_afflux");
						$("#letras_inicio_global").addClass("letra_iconos_blancos_afflux");
						$("#icono_usuario_global").addClass("letra_iconos_blancos_afflux");
						$("li > a.nav-link").addClass("letra_iconos_blancos_afflux");
						$("div.card > div.card-header").addClass("colores_afflux");
						$("thead").addClass("colores_afflux");
						$("button").addClass("btn_primary_afflux");
						$('#texto_logo').show();
						$('#texto_logo').html('');
						$('#imagen_empresa').attr('src', '../assets/img/LOGOAFFLUX.jpg');
						$('#imagen_empresa').addClass("img-afflux");
					}else{
						//*** ARZYZ METALSc
						$("#navbar_global").removeClass("colores_afflux");
						$("#sidebar_global").removeClass("colores_afflux");
						$("#boton_barras_global").removeClass("letra_iconos_blancos_afflux");
						$("#letras_inicio_global").removeClass("letra_iconos_blancos_afflux");
						$("#icono_usuario_global").removeClass("letra_iconos_blancos_afflux");
						$("div.card > div.card-header").removeClass("colores_afflux");
						$("div.card > div.card-header").removeClass("letra_iconos_blancos_afflux");
						$("thead").removeClass("colores_afflux");
						$("button").removeClass("btn_primary_afflux");
						$("#navbar_global").addClass("color_fratech");
						$("#sidebar_global").addClass("color_fratech");
						$("#boton_barras_global").addClass("letra_iconos_blancos");
						$("#letras_inicio_global").addClass("letra_iconos_blancos");
						$("#icono_usuario_global").addClass("letra_iconos_blancos");
						$("li > a.nav-link").addClass("letra_iconos_blancos");
						$("div.card > div.card-header").addClass("color_fratech");
						$("div.card > div.card-header").addClass("letra_iconos_blancos");
						$("thead").addClass("color_fratech");
						$("thead").addClass("letra_iconos_blancos");
						$("button").addClass("btn-primary");
						$('#icono_empresa').show();
						$('#icono_empresa').attr('src', '../assets/img/icon.png');
						$('#imagen_empresa').attr('src', '../assets/img/logo.png');
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
	}else{
		Swal.fire({
			title: "Usuario Desconocida",
			text: "Favor de Agregar un numero de empleado.",
			icon: 'info',
			allowOutsideClick: false,
			confirmButtonText: "Aceptar",
		}).then(function(){
			CerrarSesion();
		});
	}
}