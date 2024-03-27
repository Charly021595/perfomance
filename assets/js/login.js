let bandera_login = true;

$("#login").on("click", function(e){
  $("#login").addClass("deshabilitar");
  $('#login').attr("disabled", true);
  e.preventDefault();
  let usuario = $("#username").val(),
  pasword = $("#password").val();
  if(usuario == ''){
    Swal.fire({
      title: "Aviso",
      text: 'El usuario no puede ir vacío.',
      icon: 'info',
      allowOutsideClick: false,
      confirmButtonText: "Aceptar",
    }).then(function(){
      $("#login").removeAttr("disabled, disabled");
      $("#login").removeClass("deshabilitar");
      $('#login').attr("disabled", false);
    });     
  }
  if(pasword == ''){
    Swal.fire({
      title: "Aviso",
      text: 'La contraseña no puede ir vacía.',
      icon: 'info',
      allowOutsideClick: false,
      confirmButtonText: "Aceptar",
    }).then(function(){
      $("#login").removeAttr("disabled, disabled");
      $("#login").removeClass("deshabilitar");
      $('#login').attr("disabled", false);
    });     
  }
  $.ajax({
    url: "./utileria.php",
    type: "post",
    data: {"param":1, "username": usuario, "password": pasword},
    success: function(result) {
      let data = JSON.parse(result);
      if(data.estatus == 'success') {
        window.location.href='dashboard.php';
      }else{
        Swal.fire({
          title: "Aviso",
          text: data.mensaje,
          icon: 'info',
          allowOutsideClick: false,
          confirmButtonText: "Aceptar",
        }).then(function(){
          $("#login").removeAttr("disabled, disabled");
          $("#login").removeClass("deshabilitar");
          $('#login').attr("disabled", false);
        });
        return false;
      }
    }
  });
});

function Validar() {
	let elInput = document.getElementById('password');
	elInput.addEventListener('keyup', function(e) {
	  let keycode = e.keyCode || e.which;
	  if (keycode == 13) {
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

$("#mostrar_password").on("click", function(){
  let password = $("#password").val();
  if (password != '') {
    document.getElementById('password').type = bandera_login ? 'text' :'password';
    bandera_login = bandera_login ? false : true; 
  }
});