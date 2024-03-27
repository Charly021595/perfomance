<?php
	header('Content-Type: text/html; charset=utf-8');
	//error_reporting(E_ALL ^ E_NOTICE);
	$param = $_POST['param'];	
	switch($param) {
		case '1': //Consulta
			$data = array();
			$validar = true;
			$empleado = $_POST['empleado'];
			$query = array();
			include './db/conectar2.php';
			$sql = "{call RHMet_ObtenerDatosEmpleado2(?)}";
			$params = array($empleado);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if ($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}	
			while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
				$record = array(
					"Empleado"	=> utf8_encode ($row['IdPersonal']),
					"Nombre" 	=>utf8_encode ( $row['Nombre_Completo'])!= null ? utf8_encode ($row['Nombre_Completo']):"",
					"UnidaddeNegocio" => utf8_encode ($row['RazonSocial']),
				);
				array_push($query, $record);
			}

			if (count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }
		
			echo json_encode($data);
			sqlsrv_free_stmt( $stmt);	
	
		break;
		case '2': //Guardar
			$data = array();
			$NoEmpleado = $_POST['NoEmpleado'];
			$NombreEmpleado =  utf8_decode($_POST['NombreEmpleado']);
			$arrayListadoMetas = json_decode($_POST['arrayListadoMetas'], true);
			$arrayListadoHitoMetas = json_decode($_POST['arrayListadoHitoMetas'], true);
			$validar = true;
			/*---*/
			foreach ($arrayListadoMetas as $row2) {
				$NoMetaArrayMEta = $row2['NoMeta'];
				$NoMeta = $row2['NoMeta'];
				$NombreMeta = utf8_decode($row2['NombreMeta']);
				$Ponderacion = $row2['Ponderacion'];
				$Fecha = $row2['Fecha'];
				$IdMeta = utf8_decode($row2['IdMeta']);
				//
				$UnidadMedida = $row2['UnidadMedida'];
				$MinimoMeta = $row2['MinimoMeta'];
				$SatisfactorioMeta = $row2['SatisfactorioMeta'];
				$ExcelenteMeta = $row2['ExcelenteMeta'];
				include './db/conectar.php';
				$sql = "{call RHMet_GuardaMetas(?,?,?,?,?,?,?,?,?,?,?)}";
				$params = array($NoEmpleado,$NombreEmpleado,$NoMeta,$NombreMeta,$Ponderacion,$Fecha,$IdMeta,$UnidadMedida,$MinimoMeta,$SatisfactorioMeta,$ExcelenteMeta);
				$stmt = sqlsrv_query($conn, $sql, $params);
				if($stmt === false) {
					$validar = false;
					$mensaje = sqlsrv_errors();
					$data = array(
						"estatus" => 'error_consulta',
						"Validar" => $validar,
						"mensaje" => $mensaje[0]['message']
					);
					echo json_encode($data);
					die();
				}
				while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
					$query = array();
					$record = array(
						"IDMeta"  => utf8_decode($row['IDMeta'])
					);
					array_push($query, $record);
				}
				
				foreach ($record as $row1) {
					foreach ($arrayListadoHitoMetas as $row3) {
						
						$NoMetaHito = $row3['NoMeta'];
						$NoHito = $row3['NoHito'];
						$NoHitoArrayHito = $row3['NoHito'];
						$NombreHito = utf8_decode($row3['NombreHito']);
						$FechaHito = $row3['FechaHito'];
						$IdHito = utf8_decode($row3['IdHito']);
						if($NoMetaArrayMEta == $NoMetaHito){	
							include './db/conectar.php';
							$sql = "{call RHMet_GuardaHitos(?,?,?,?,?,?)}";
							$params = array($row1,$NoMetaHito,$NoHito,$NombreHito,$FechaHito,$IdHito);
							$stmt = sqlsrv_query($conn, $sql, $params);
							if($stmt === false) {
								$validar = false;
								$mensaje = sqlsrv_errors();
								$data = array(
									"estatus" => 'error_consulta',
									"Validar" => $validar,
									"mensaje" => $mensaje[0]['message']
								);
								echo json_encode($data);
								die();
							}
							sqlsrv_free_stmt( $stmt );
							sqlsrv_close($conn);
						}
						
					}
				}
			
			}
			
			$query2 = array();
			$record2 = array(
				"Validar"=> $validar
			);
			
			array_push($query2, $record2);
			
			if($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => 'La información ha sido guardada correctamente.'
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "La información no pudo ser guardada."
                );		
            }

			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);
		break;
		case '3':
			$data = array();
			$empleado = $_POST['empleado'];
			$query = array();
			$validar = true;
			include './db/conectar.php';
			$sql = "{call RHMet_SeleccionarMetas(?)}";
			$params = array($empleado);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if ($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}

			while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
				$record = array(
					"id"			=> $row['id'],
					"idMeta"		=> utf8_encode ($row['idMeta']),
					"Empleado"		=> utf8_encode ($row['Empleado']),
					"NoEmpleado"	=> $row['NoEmpleado'],
					"meta"			=> utf8_encode ($row['meta']),
					"Estatus"		=> $row['Estatus'],
					"Ponderacion"	=> $row['Ponderacion'],
					"FechaMeta"		=> $row['Fecha'] ->format('Y-m-d'),
					"AnioMeta"		=> $row['Anio'],
					"NoMeta"		=> $row['NoMeta'],
					"idHito"		=> utf8_encode ($row['idHito']),
					"Hito"			=> utf8_encode ($row['Hito']),
					"FechaHito"		=> $row['FechaHito']  != null ? $row['FechaHito']->format('Y-m-d'):"",
										
					"AnioHito"		=> $row['AnioHito'],
					"NoHito"		=> $row['NoHito'],
					"UnidadMedida"	=> $row['UnidadMedida'],
					"MinimoMeta"	=> utf8_encode ($row['MinimoMeta']),
					"ExcelenteMeta"	=> utf8_encode ($row['ExcelenteMeta']),
					"SatisfactorioMeta"			=> utf8_encode ($row['SatisfactorioMeta']),
					"ComentarioRechazo"			=> utf8_encode ($row['ComentarioRechazo']),
					"ComentarioSolicitudCambios" => utf8_encode ($row['ComentarioSolicitudCambios']),
					"RechazoAutorizacion" => utf8_encode ($row['RechazoAutorizacion']),
					"ResultadoLogrado"		=> $row['ResultadoLogrado'],
					"CalificacionPonderada"		=> $row['CalificacionPonderada'],
					"Calificacion"		=> $row['Calificacion'],
					"ComentarioRechazoCalificacion" => utf8_encode ($row['ComentarioRechazoCalificacion']),
				);
				array_push($query, $record);
			}
			
			if (count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay metas"
                );		
            }

			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);	
		break;
		case '4':
				$IdHito =  utf8_decode($_POST['IdHito']);
				$NoMeta =  $_POST['NoMeta'];
				$validar = true;
				include './db/conectar.php';
				$sql = "{call RHMet_EliminarHitos(?,?)}";
				$params = array($IdHito,$NoMeta);
				$stmt = sqlsrv_query($conn, $sql, $params);
				if ( $stmt === false) {
					die( print_r( sqlsrv_errors(), true) );
					$validar = false;
				}
				$record = array(
					"Validar"	=> $validar
				);
				$query = array();
				array_push($query, $record);
				echo json_encode($query);
				sqlsrv_free_stmt( $stmt );
				sqlsrv_close($conn);
				
				
			break;
		case '5':
			$data = array();
			$NoMeta =  utf8_decode($_POST['NoMeta']);
			$validar = true;
			include './db/conectar.php';
			$sql = "{call RHMet_EliminarMeta(?)}";
			$params = array($NoMeta);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}
			$record = array(
				"Validar"	=> $validar
			);
			$query = array();
			array_push($query, $record);

			if($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => 'La información ha sido eliminada correctamente.'
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "La información no pudo ser eliminada."
                );		
            }
		
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);		
		break;
		case '6': //Consulta
			$data = array();
			$username = $_POST['username'];
			$password = $_POST['password'];
			$query = array();
			$query2 = array();
			$validar = true;
			//
			include './db/conectar.php';
			$sql = "{call RHMet_LoginEncuesta(?, ?)}";
			$params = array($username, $password);
			$stmt = sqlsrv_query($conn, $sql, $params);
			
			if(isset($_POST['captcha'])){
				$captcha=$_POST['captcha'];
			}

			if(!$captcha){
				$record2 = array(
					"usuario" => "Favor de Capturar el captcha",
					"NoEmpleado" => null
				);
				array_push($query, $record2);
				session_start();
				//$_SESSION['RHEvaluacion'] = $query;
			}else{
				$secret = '0xb233eDE533c821E94A437BC0Fd7C9f293358457c';
				$verifyResponse = file_get_contents('https://hcaptcha.com/siteverify?secret='.$secret.'&response='.$captcha.'&remoteip='.$_SERVER['REMOTE_ADDR']);
				$responseData = json_decode($verifyResponse);
				if($responseData->success){
					if ($stmt === false) {
						$validar = false;
						$mensaje = sqlsrv_errors();
						$data = array(
							"estatus" => 'error_consulta',
							"Validar" => $validar,
							"mensaje" => $mensaje[0]['message']
						);
						echo json_encode($data);
						die();
					}	

					while($row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
						$record = array(
							"valido" => $row['valido'],
						);
						array_push($query, $record);
					}
					if(count($query) > 0){
						session_start();
						$_SESSION['RHEvaluacion'] = $username;
					}
			
					sqlsrv_free_stmt($stmt);		
					sqlsrv_close($conn);
					$record2 = array(
						"NoEmpleado" => $_SESSION['RHEvaluacion'],
						"usuario" => "true"
					);
				}else{
					$record2 = array(
					"usuario" => "Error en envio de información",
					"NoEmpleado" => null
					);
					array_push($query, $record2);
					session_start();
				}
			}
			
			array_push($query2,$record2);
			echo json_encode($query2);
			if($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}	

			while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
				$record = array(
					"valido" => $row['valido'],
				);
				array_push($query, $record);
			}
			if(count($query) > 0){
				session_start();
				$_SESSION['RHEvaluacion'] = $username;
			}

			$record2 = array(
				"NoEmpleado" => $_SESSION['RHEvaluacion'],
				"usuario" => "true"
			);

			array_push($query, $record2);

			if (count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }
			
			sqlsrv_free_stmt($stmt);
			echo json_encode($data);		
			sqlsrv_close($conn);
		break;
		case '7': //Consulta
			session_start();
			session_unset();
			session_destroy();
			$data = array(
				"estatus" => "success"
			);
			echo json_encode($data);
		break;		
		case '8': //Guardar
			$data = array();
			$NoEmpleado = $_POST['NoEmpleado'];
			$NombreEmpleado =  utf8_decode($_POST['NombreEmpleado']);
			$arrayListadoMetas = json_decode($_POST['arrayListadoMetas'], true);
			$arrayListadoHitoMetas = json_decode($_POST['arrayListadoHitoMetas'], true);
			$validar = true;
			/*---*/
			foreach ($arrayListadoMetas as $row2) {
				$NoMetaArrayMEta = $row2['NoMeta'];
				$NoMeta = $row2['NoMeta'];
				$NombreMeta = utf8_decode($row2['NombreMeta']);
				$Ponderacion = $row2['Ponderacion'];
				$Fecha = $row2['Fecha'];
				$IdMeta = utf8_decode($row2['IdMeta']);
				//
				$UnidadMedida = $row2['UnidadMedida'];
				$MinimoMeta = $row2['MinimoMeta'];
				$SatisfactorioMeta = $row2['SatisfactorioMeta'];
				$ExcelenteMeta = $row2['ExcelenteMeta'];
				include './db/conectar.php';
				$sql = "{call RHMet_ValidarMetas(?,?,?,?,?,?,?,?,?,?,?)}";
				$params = array($NoEmpleado,$NombreEmpleado,$NoMeta,$NombreMeta,$Ponderacion,$Fecha,$IdMeta,$UnidadMedida,$MinimoMeta,$SatisfactorioMeta,$ExcelenteMeta);
				$stmt = sqlsrv_query($conn, $sql, $params);
				if ( $stmt === false) {
					$validar = false;
					$mensaje = sqlsrv_errors();
					$data = array(
						"estatus" => 'error_consulta',
						"Validar" => $validar,
						"mensaje" => $mensaje[0]['message']
					);
					echo json_encode($data);
					die();
				}
				while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
					$query = array();
					$record = array(
						"IDMeta"  => utf8_decode($row['IDMeta'])
					);
					array_push($query, $record);
				}
				
				foreach ($record as $row1) {
					foreach ($arrayListadoHitoMetas as $row3) {
						$NoMetaHito = $row3['NoMeta'];
						$NoHito = $row3['NoHito'];
						$NoHitoArrayHito = $row3['NoHito'];
						$NombreHito = utf8_decode($row3['NombreHito']);
						$FechaHito = $row3['FechaHito'];
						$IdHito = utf8_decode($row3['IdHito']);
						if($NoMetaArrayMEta == $NoMetaHito){	
							include './db/conectar.php';
							$sql = "{call RHMet_GuardaHitos(?,?,?,?,?,?)}";
							$params = array($row1,$NoMetaHito,$NoHito,$NombreHito,$FechaHito,$IdHito);
							$stmt = sqlsrv_query($conn, $sql, $params);
							if ( $stmt === false) {
								die( print_r( sqlsrv_errors(), true) );
								$validar = false;
							}

							sqlsrv_free_stmt( $stmt );
							sqlsrv_close($conn);
						}
						
					}
				}
			}
			
			$query2 = array();
			$record2 = array(
				"Validar"=> $validar
			);
			
			array_push($query2,$record2);
			
			if($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => "La información ha sido guardada correctamente"
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "La información no pudo ser guardada"
                );		
            }
		
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);	
		break;
		case '9': //Consulta
			$data = array();
			$empleado = $_POST['empleado'];
			$validar = true;
			$query = array();
			include './db/conectar2.php';
			$sql = "{call RH_ObtenerDependeciaEmpleado(?)}";
			$params = array($empleado);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if ($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}	
			while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
				$NombreEmpleado =  utf8_encode ($row['NombreCompleto']);
				$record = array(
					"Empleado"	=> utf8_encode ($row['Empleado']),
					"Nombre" 	=>utf8_encode ( $row['NombreCompleto'])!= null ? utf8_encode ($row['NombreCompleto']):"",
				);
				array_push($query, $record);
			}

			if(count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no tienes metas definidas."
                );		
            }
		
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);	

		break;
		case '10': //Consulta
			$data = array();
			$IdMeta =  utf8_decode($_POST['IdMeta']);
			$empleado =  $_POST['empleado'];
			$validar = true;
			include './db/conectar.php';
			//$sql = "{call RHMet_EliminarHitos(?,?)}";
			$sql = "{call RHMet_AceptarMeta(?,?)}";
			$params = array($empleado,$IdMeta);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}
			$record = array(
				"Validar"	=> $validar
			);
			$query = array();
			array_push($query, $record);
			
			if ($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => 'La información ha sido guardado correctamente.'
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "La información no pudo ser guardado."
                );		
            }
		
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);	
			sqlsrv_close($conn);
		break;
		case '11': //Consulta
			$data = array();
			$IdMeta =  utf8_decode($_POST['IdMeta']);
			$empleado =  $_POST['empleado'];
			$Comentario =  utf8_decode($_POST['Comentario']);
			$validar = true;
			include './db/conectar.php';
			//$sql = "{call RHMet_EliminarHitos(?,?)}";
			$sql = "{call RHMet_RechazoMeta(?,?,?)}";
			$params = array($empleado,$IdMeta,$Comentario);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}
			$record = array(
				"Validar"	=> $validar
			);
			$query = array();
			array_push($query, $record);

			if ($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => 'La información ha sido guardado correctamente.'
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "La información no pudo ser guardado."
                );		
            }
		
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);

		break;
		// Solicitar cambios
		case '12': //Consulta
			$data = array();
			$IdMeta =  utf8_decode($_POST['IdMeta']);
			$empleado =  $_POST['empleado'];
			$Comentario =  utf8_decode($_POST['Comentario']);
			$validar = true;
			include './db/conectar.php';
			//$sql = "{call RHMet_EliminarHitos(?,?)}";
			$sql = "{call RHMet_SolicitarCambioMeta(?,?,?)}";
			$params = array($empleado,$IdMeta,$Comentario);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if ($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}
			$record = array(
				"Validar"	=> $validar
			);
			$query = array();
			array_push($query, $record);
			
			if ($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => 'La información ha sido guardado correctamente.'
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "La información no pudo ser guardado."
                );		
            }
		
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);

		break;
		case '13': //Consulta
			$data = array();
			$IdMeta =  utf8_decode($_POST['IdMeta']);
			$empleado =  $_POST['empleado'];
			$validar = true;
			include './db/conectar.php';
			
			$sql = "{call RHMet_AceptarCambioMeta(?,?)}";
			$params = array($empleado,$IdMeta);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}

			$record = array(
				"Validar"	=> $validar
			);

			$query = array();
			array_push($query, $record);

			if ($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => 'La información ha sido guardado correctamente.'
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "La información no pudo ser guardado."
                );		
            }
		
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);
		break;
		case '14': //Consulta
			$data = array();
			$IdMeta =  utf8_decode($_POST['IdMeta']);
			$empleado =  $_POST['empleado'];
			$Comentario =  utf8_decode($_POST['Comentario']);
			$validar = true;
			include './db/conectar.php';
			//$sql = "{call RHMet_EliminarHitos(?,?)}";
			$sql = "{call RHMet_RechazoCambioMeta(?,?,?)}";
			$params = array($empleado,$IdMeta,$Comentario);
			$stmt = sqlsrv_query($conn, $sql, $params);

			if($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}

			$record = array(
				"Validar"	=> $validar
			);

			$query = array();
			array_push($query, $record);

			if ($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => 'La información ha sido guardado correctamente.'
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "La información no pudo ser guardado."
                );		
            }
		
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);
		break;
		case '15': //Consulta
			$data = array();
			$IdMeta =  utf8_decode($_POST['IdMeta']);
			$empleado =  $_POST['empleado'];
			$Comentario =  utf8_decode($_POST['Comentario']);
			$validar = true;
			include './db/conectar.php';
			//$sql = "{call RHMet_EliminarHitos(?,?)}";
			$sql = "{call RHMet_RechazoCambioMetaActualizacion(?,?,?)}";
			$params = array($empleado,$IdMeta,$Comentario);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}
			$record = array(
				"Validar"	=> $validar
			);
			$query = array();
			array_push($query, $record);

			if($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => 'La información ha sido guardado correctamente.'
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "La información no pudo ser guardado."
                );		
            }
		
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);

		break;
		case '16': //Consulta
			$data = array();
			$empleado =  $_POST['empleado'];
			$empleadoLogeado =  $_POST['empleadoLogeado'];
			$arrayListadoMetas = json_decode($_POST['arrayListadoMetas'], true);
			$validar = true;
			
			foreach ($arrayListadoMetas as $row3) {
				$IdMeta = $row3['IdMeta'];
				include './db/conectar.php';
				$sql = "{call RHMet_CambiaDepartamento(?,?,?)}";
				$params = array($empleado,$empleadoLogeado,$IdMeta);
				$stmt = sqlsrv_query($conn, $sql, $params);
				if($stmt === false) {
					$validar = false;
					$mensaje = sqlsrv_errors();
					$data = array(
						"estatus" => 'error_consulta',
						"Validar" => $validar,
						"mensaje" => $mensaje[0]['message']
					);
					echo json_encode($data);
					die();
				}
			}
			
			$record = array(
				"Validar"	=> $validar
			);

			$query = array();
			array_push($query, $record);

			if($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => 'La información ha sido guardado correctamente.'
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "La información no pudo ser guardado."
                );		
            }
		
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);
		break;
		case '17': //Consulta
			$data = array();
			$empleado =  				$_POST['empleado'];
			$EvaluacionMetaAnual =   	utf8_decode($_POST['EvaluacionMetaAnual']);
			$ValoresMeta =   			utf8_decode($_POST['ValoresMeta']);
			$DesarrolloMeta =   	 	utf8_decode($_POST['DesarrolloMeta']);
			$AsuntosVariosMeta =   	 	utf8_decode($_POST['AsuntosVariosMeta']);
			$Retroalimentacion =   		$_POST['Retroalimentacion'];
			$FechaRetroalimentacion =	$_POST['FechaRetroalimentacion'];
			$Evaluacion= 				$_POST['Evaluacion'];
			$validar = true;
			
			include './db/conectar.php';
			$sql = "{call RHMet_GuardaRetroalimentaciones(?,?,?,?,?,?,?,?)}";
			$params = array($empleado,$EvaluacionMetaAnual,$ValoresMeta,$DesarrolloMeta,$AsuntosVariosMeta,$Retroalimentacion,$FechaRetroalimentacion,$Evaluacion);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}

			$record = array(
				"Validar"	=> $validar
			);
			$query = array();
			array_push($query, $record);

			if($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => 'La retroalimentacón se guardo correctamente.'
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "La información no pudo ser guardada."
                );		
            }

			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);
		break;
		case '18':
			$data = array();
			$empleado = $_POST['empleado'];
			$query = array();
			$validar = true;
			include './db/conectar.php';
			$sql = "{call RHMet_SelectMetasSinAutorizar(?)}";
			$params = array($empleado);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}
			while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
				$record = array(
					"Resultado"	=> $row['Resultado']
				);
				array_push($query, $record);
			}

			if(count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay metas"
                );		
            }
		
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);	
		break;
		case '19':
			$data = array();
			$empleado = $_POST['empleado'];
			$evaluacion = $_POST['evaluacion'];
			$query = array();
			$validar = true;
			include './db/conectar.php';
			$sql = "{call RHMet_RetroPendiente(?,?)}";
			$params = array($empleado, $evaluacion);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}
			while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
				$record = array(
					"Anio"					=> $row['Anio'],
					"IdRetroalimentacion"	=> utf8_encode ($row['IdRetroalimentacion']),
					"FechaInsercion"		=> utf8_encode ($row['FechaInsercion']),
					"EvaluacionMetaAnual"	=> utf8_encode ($row['EvaluacionMetaAnual']),
					"Valores"				=> utf8_encode ($row['Valores']),
					"Desarrollo"			=> utf8_encode ($row['Desarrollo']),
					"Retroalimentacion"		=> $row['Retroalimentacion'],
					"Empleado"				=> $row['Empleado'],
					"AsuntosVarios"			=> utf8_encode ($row['AsuntosVarios'])
				);
				array_push($query, $record);
			}
			
			if(count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay metas"
                );		
            }
		
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);	
		break;
		case '20': //Consulta
			$data = array();
			$IdMeta =  utf8_decode($_POST['IdMeta']);
			$empleado =  $_POST['empleado'];
			$ResultadoLogrado =  $_POST['ResultadoLogrado'];
			$CalificacionPonderada =  $_POST['CalificacionPonderada'];
			$calificacion =  $_POST['calificacion'];
			$validar = true;
			include './db/conectar.php';
			//$sql = "{call RHMet_EliminarHitos(?,?)}";
			$sql = "{call RHMet_CalculaCalificaciones(?,?,?,?,?)}";
			$params = array($empleado,$IdMeta,$ResultadoLogrado,$CalificacionPonderada,$calificacion);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if ($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}
			$record = array(
				"Validar"	=> $validar
			);
			$query = array();
			array_push($query, $record);

			if ($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => 'La información ha sido guardado correctamente.'
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "La información no pudo ser guardado."
                );		
            }

			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);

		break;
		case '21': //Consulta
			$data = array();
			$IdMeta =  		utf8_decode($_POST['IdMeta']);
			$empleado =  	$_POST['empleado'];
			$Comentario =	utf8_decode($_POST['Comentario']);
			$validar = true;
			include './db/conectar.php';
			$sql = "{call RHMet_RechazoCalificaciones(?,?,?)}";
			$params = array($empleado,$IdMeta,$Comentario);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}
			$record = array(
				"Validar"	=> $validar
			);


			if ($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => 'La información ha sido guardado correctamente'
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay registros"
                );		
            }

			echo json_encode($query);
			sqlsrv_free_stmt( $stmt );
			sqlsrv_close($conn);

		break;
		case '22': //Consulta
			$data = array();
			$IdMeta =  utf8_decode($_POST['IdMeta']);
			$empleado =  $_POST['empleado'];
			$ResultadoLogrado =  $_POST['ResultadoLogrado'];
			$CalificacionPonderada =  $_POST['CalificacionPonderada'];
			$calificacion =  $_POST['calificacion'];
			$validar = true;
			include './db/conectar.php';
			//$sql = "{call RHMet_EliminarHitos(?,?)}";
			$sql = "{call RHMet_CalculaCalificacionesActualizar(?,?,?,?,?)}";
			$params = array($empleado,$IdMeta,$ResultadoLogrado,$CalificacionPonderada,$calificacion);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if ($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}
			$record = array(
				"Validar"	=> $validar
			);
			$query = array();
			array_push($query, $record);

			if($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => 'La información ha sido guardado correctamente.'
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "La información no pudo ser guardado."
                );		
            }

			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);

		break;
		case '23': //Consulta
			$data = array();
			$IdMeta =  		utf8_decode($_POST['IdMeta']);
			$empleado =  	$_POST['empleado'];
			$Comentario =	utf8_decode($_POST['Comentario']);
			$validar = true;
			include './db/conectar.php';
			$sql = "{call RHMet_AceptaCalificaciones(?,?,?)}";
			$params = array($empleado,$IdMeta,$Comentario);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}

			$record = array(
				"Validar"	=> $validar
			);

			if ($validar){
                $data = array(
                    "estatus" => "success",
                    "mensaje" => 'La información ha sido guardado correctamente'
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "La información no pudo ser guardado"
                );		
            }

			echo json_encode($data);
			sqlsrv_free_stmt( $stmt );
			sqlsrv_close($conn);

		break;
		case '24': //Consulta
			$data = array();
			$NoEmpleado = $_POST['empleado'];
			$query = array();
			$validar = true;
			include './db/conectar.php';
			$sql = "{call RHMet_ObtenerAnioHistorial(?)}";
			$params = array($NoEmpleado);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}	
			while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
				$record = array(
					"Anio"	=> $row['Anio'],
				);
				array_push($query, $record);
			}
			
			if(count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay historial"
                );		
            }
		
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);	

		break;
		case '25':
			$data = array();
			$empleado = $_POST['empleado'];
			$Anio = $_POST['Anio'];
			$query = array();
			$validar = true;
			include './db/conectar.php';
			$sql = "{call RHMet_SeleccionarMetasHistorial(?,?)}";
			$params = array($empleado,$Anio);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}	
			while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
				$record = array(
					"id"			=> $row['id'],
					"idMeta"		=> utf8_encode ($row['idMeta']),
					"Empleado"		=> utf8_encode ($row['Empleado']),
					"NoEmpleado"	=> $row['NoEmpleado'],
					"meta"			=> utf8_encode ($row['meta']),
					"Estatus"		=> $row['Estatus'],
					"Ponderacion"	=> $row['Ponderacion'],
					"FechaMeta"		=> $row['Fecha'] ->format('Y-m-d'),
					"AnioMeta"		=> $row['Anio'],
					"NoMeta"		=> $row['NoMeta'],
					"idHito"		=> utf8_encode ($row['idHito']),
					"Hito"			=> utf8_encode ($row['Hito']),
					"FechaHito"		=> $row['FechaHito']  != null ? $row['FechaHito']->format('Y-m-d'):"",
										
					"AnioHito"		=> $row['AnioHito'],
					"NoHito"		=> $row['NoHito'],
					"UnidadMedida"	=> $row['UnidadMedida'],
					"MinimoMeta"	=> utf8_encode ($row['MinimoMeta']),
					"ExcelenteMeta"	=> utf8_encode ($row['ExcelenteMeta']),
					"SatisfactorioMeta"			=> utf8_encode ($row['SatisfactorioMeta']),
					"ComentarioRechazo"			=> utf8_encode ($row['ComentarioRechazo']),
					"ComentarioSolicitudCambios" => utf8_encode ($row['ComentarioSolicitudCambios']),
					"RechazoAutorizacion" => utf8_encode ($row['RechazoAutorizacion']),
					"ResultadoLogrado"		=> $row['ResultadoLogrado'],
					"CalificacionPonderada"		=> $row['CalificacionPonderada'],
					"Calificacion"		=> $row['Calificacion'],
					"ComentarioRechazoCalificacion" => utf8_encode ($row['ComentarioRechazoCalificacion']),
				);
				array_push($query, $record);
			}
			
			if(count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay metas"
                );		
            }
		
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);
		break;
		case '26':
			$data = array();
			$empleado = $_POST['empleado'];
			$Anio = $_POST['Anio'];
			$query = array();
			$validar = true;
			include './db/conectar.php';
			$sql = "{call RHMet_SelectMetasSinAutorizar_Hitorial(?,?)}";
			$params = array($empleado,$Anio);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}	
			while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
				$record = array(
					"Resultado"	=> $row['Resultado']
				);
				array_push($query, $record);
			}

			if(count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay metas"
                );		
            }
		
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);
		break;
		case '27':
			$data = array();
			$empleado = $_POST['empleado'];
			$evaluacion = $_POST['evaluacion'];
			$Anio = $_POST['Anio'];
			$query = array();
			include './db/conectar.php';
			$sql = "{call RHMet_RetroPendienteHistorial(?,?,?)}";
			$params = array($empleado,$evaluacion,$Anio);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_consulta',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();
			}

			while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
				$record = array(
					"Anio"					=> $row['Anio'],
					"IdRetroalimentacion"	=> utf8_encode ($row['IdRetroalimentacion']),
					"FechaInsercion"		=> utf8_encode ($row['FechaInsercion']),
					"EvaluacionMetaAnual"	=> utf8_encode ($row['EvaluacionMetaAnual']),
					"Valores"				=> utf8_encode ($row['Valores']),
					"Desarrollo"			=> utf8_encode ($row['Desarrollo']),
					"Retroalimentacion"		=> $row['Retroalimentacion'],
					"Empleado"				=> $row['Empleado'],
					"AsuntosVarios"			=> utf8_encode ($row['AsuntosVarios'])
				);
				array_push($query, $record);
			}

			if(count($query) != 0){
                $data = array(
                    "estatus" => "success",
                    "data" => $query
                );
            }else{
                $data = array(
                    "estatus" => 'error',
                    "mensaje" => "no hay metas"
                );		
            }
		
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);
			sqlsrv_close($conn);	
		break;
  }
?>