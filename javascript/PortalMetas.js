
function Login(){
	let usuario = $("#username").val(),
	pasword = $("#password").val(),
	captcha = hcaptcha.getResponse();

	if(usuario.replace(/\s/g,"") == "" && pasword.replace(/\s/g,"") == ""){
		Swal.fire({
			title: "Aviso",
			text: 'Favor de validar usuario o contraseña',
			icon: 'info',
			allowOutsideClick: false,
			confirmButtonText: "Aceptar",
		});
	}

	$.ajax({
		url: "./utileria.php",
		type: "post",
		data: {"param": 6, "username":usuario, "password":pasword, "captcha":captcha},
		success: function(result) {
			$('.cargando').hide(); // Oculta la imagen de cargando 
			if(data.length){
				for(i=0;i<data.length;i++){
					if(data[i]['usuario'] !=""){
						//window.location='dashboard.php';
						if( data[i]['usuario'] == "Favor de Capturar el captcha"){
							document.getElementById('mensaje').innerHTML = '';
							$('#mensaje').append("<pre>Favor de Capturar el captcha.</pre>");
						}
						else if(data[i]['usuario'] == "Error en envio de información"){
							document.getElementById('mensaje').innerHTML = '';
							$('#mensaje').append("<pre>Error en envio de información.</pre>");
						}
						else{
							if(data[i]['NoEmpleado'] !=""){
								window.location='dashboard.php';
							}else{
								document.getElementById('mensaje').innerHTML = '';
								$('#mensaje').append("<pre>No se encontró el usuario, verifique los datos.</pre>");
							}
						}
					}else{
						 document.getElementById('mensaje').innerHTML = '';
						 $('#mensaje').append("<pre>No se encontró el usuario, verifique los datos.</pre>");
					}
				}
				
			}
			else{
				 //No se encontró el usuario, verifique los datos.
				 document.getElementById('mensaje').innerHTML = '';
				 $('#mensaje').append("<pre>No se encontró el usuario, verifique los datos.</pre>");
				 $("#username").val("");
				 $("#password").val("");
			}
			let data = JSON.parse(result);
			if (data.estatus == "success") {
				let datos = data.data;
				for(i = 0; i < datos.length; i++){
					if(datos[i]['usuario'] !=""){
						//window.location='dashboard.php';
						if( datos[i]['usuario'] == "Favor de Capturar el captcha"){
							// document.getElementById('mensaje').innerHTML = '';
							// $('#mensaje').append("<pre>Favor de Capturar el captcha.</pre>");
							Swal.fire({
								title: "Aviso",
								text: "<pre>Favor de Capturar el captcha.</pre>",
								icon: 'info',
								allowOutsideClick: false,
								confirmButtonText: "Aceptar",
							});
						}else if(datos[i]['usuario'] == "Error en envio de información"){
							// document.getElementById('mensaje').innerHTML = '';
							// $('#mensaje').append("<pre>Error en envio de información.</pre>");
							Swal.fire({
								title: "Aviso",
								text: "<pre>Error en envio de información.</pre>",
								icon: 'info',
								allowOutsideClick: false,
								confirmButtonText: "Aceptar",
							});
						}else{
							if(datos[i]['NoEmpleado'] !=""){
								window.location='dashboard.php';
							}else{
								// document.getElementById('mensaje').innerHTML = '';
								// $('#mensaje').append("<pre>No se encontró el usuario, verifique los datos.</pre>");
								Swal.fire({
									title: "Aviso",
									text: "<pre>No se encontró el usuario, verifique los datos.</pre>",
									icon: 'info',
									allowOutsideClick: false,
									confirmButtonText: "Aceptar",
								});
							}
						}
					}else{
						//  document.getElementById('mensaje').innerHTML = '';
						//  $('#mensaje').append("<pre>No se encontró el usuario, verifique los datos.</pre>");
						Swal.fire({
							title: "Aviso",
							text: "<pre>No se encontró el usuario, verifique los datos.</pre>",
							icon: 'info',
							allowOutsideClick: false,
							confirmButtonText: "Aceptar",
						});
					}
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

function Validar() {
	let elInput = document.getElementById('password');
	elInput.addEventListener('keyup', function(e) {
	  let keycode = e.keyCode || e.which;
	  if (keycode == 13) {
		Login();
	  }
	});
}

function CerrarSesion(){
	$.ajax({
		url: "./utileria.php",
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

$(function(){
  $('.validanumericos').keypress(function(e) {
	if(isNaN(this.value + String.fromCharCode(e.charCode))) 
     return false;
  })
  .on("cut copy paste",function(e){
	e.preventDefault();
  });

});