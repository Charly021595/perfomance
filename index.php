<?php
  
   session_start(); 
  if(!isset($_SESSION['RHEvaluacion'])){ 
		//$a= "No PAsaria 1";
  }else{
	 echo "<script> window.location='dashboard.php'</script>";
  }
 ?>

<html>
<head>
 <title>Performance ARZYZ</title>	
 <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="libraries/css/bootstrap.min.css" crossorigin="anonymous">
    <link rel="stylesheet" href="libraries/css/estilos.css" type="text/css">
    <!--JSSH Se agrega dependencias de Datatables-->
    <link rel="stylesheet" type="text/css" href="libraries/datatables/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="libraries/datatables/dataTables.bootstrap.min.css">
    <script src="libraries/js/jquery-1.12.3.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="libraries/datatables/jquery.dataTables.min.js"></script>
    <script src="libraries/datatables/dataTables.bootstrap.min.js"></script>
	<script src="https://js.hcaptcha.com/1/api.js?hl=es" async defer></script>
    <link rel="icon" type="image/png" href="libraries/img/icon2.png"/>
	<script src="javascript/PortalMetas.js?t=<?=time()?>"></script>
</head>
<body>
<div id="cuerpo_pequeno">
<div class="espacio-medio"></div>
<div>
    <img src="libraries/img/logo.jpg" width="420" height="65" alt="ARZYZ" class="img-responsive centrar">    
</div>
<div class="espacio-pequeno"></div>
<div class="">
    <!-- <form method="post"> -->
        <div class="form-group">
            <label for="username">No. Empleado:</label>
            <input type="text" id="username" name="username" class="form-control validanumericos" placeholder="Usuario" required/> 
        </div>
        <div class="form-group">
            <label for="password">Contraseña:</label>
            <input id="password" type="password" name="password" class="form-control" onkeyup="Validar()" placeholder="Contraseña" required/>        
        </div><br>
		<div class="h-captcha" data-sitekey="32665cd7-a6ef-468f-9e1c-9058c0dbb23f" data-size="compact"></div>
		<br>
        <div class="centrar">
            <button class="EnviarContactoDetalleProducto btn-lg" onclick="Login();" id="login">Ingresar</button>
            <!--JSSH Se solicita eliminar el boton Cancelar-->
            <!--<input class="btn btn-default" id="reset-btn" type="reset" value="Cancelar" />-->
        </div>
        <!--JSSH Agregar opción quiero ser proveedor y redireccionar a Contactanos-->
        <!--Redireccionamiento a Desarrollo-->
        <br/>
       
    <!-- </form> -->
    <br>
    <div id="mensaje"></div>
</div>
</div>
<br/>
<br/>
<br/>
<br/>
<footer style="width:100%; margin-left: 0px;height: 7px;">
<br><br>
<div><img src = "libraries/img/TipsAnonimos.jpg" class="img-responsive centrar"></div>
</footer>


</body>

</html>
