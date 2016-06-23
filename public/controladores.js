var app = angular.module('pw2App', []); 
app.controller('CadastroController',['$scope','$http',function($scope, $http){
	$scope.cadastro = {codigo: 0, usuario: '', email: '', nome: '', sexo: '', senha: '', receberEmail: ''};
	
	$scope.inserirUsuario = function(){
		//formulário válido, pode inserir
		$http.delete('http://localhost:8081/cadastro/3').then(
			function(response){
				alert('Usuário excluído com sucesso');
			},			
			function(response){
				alert('Erro ao excluir usuário');
			}
		);
		if($scope.frm.$valid){
			$http.get('http://localhost:8081/cadastro').then(
				function(response){
					var usuarios = response.data;
					
					if(usuarios.length > 0){
						var maxCod = 0;
						var usuario;
						for(usuario in usuarios){
							if(usuarios[usuario].codigo > maxCod){
								maxCod++;
							}
						}
						
						$scope.cadastro["codigo"] = maxCod + 1;
					}
					else{
						$scope.cadastro["codigo"] = 1;
					}
					
					$http.post('http://localhost:8081/cadastro', $scope.cadastro).then(
						function(response){
							alert('Usuário inserido com sucesso!');
						},
						function(response){
							alert('Erro ao inserir usuário');
						}
					);
					
					$scope.limparNovo();
				},
				function(error){
					alert('Erro ao adicionar usuario');
				}
			);
		}else{
			//Erro
			$scope.frm.usuario.$setDirty();
			$scope.frm.email.$setDirty();
			$scope.frm.nome.$setDirty();
			$scope.frm.senha.$setDirty();
		}
	}
   
	$scope.limparNovo = function(){
		$scope.cadastro = {usuario: '', email: '', nome: '', sexo: '', senha: '', receberEmail: ''};
		$scope.frm.$setPristine();
	}
}]); //fim do controlador

app.controller('LoginController',['$scope','$http',function($scope, $http){
	$scope.login = {emai: '', senha: ''}
	
	$scope.logar = function(){
		if(this.login.email == 'admin@pw2.br' && this.login.senha == '12345'){
			document.getElementById('btnLogin').style.display = 'none';
			document.getElementById('closeModal').click();
		}else{
			this.login.email = '';
			this.login.senha = '';
			window.alert('Login incorreto.');
		}
	}
}]);