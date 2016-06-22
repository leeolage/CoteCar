var app = angular.module('pw2App', []); 
app.controller('CadastroController',['$scope','$http',function($scope, $http){
	$scope.cadastro = {usuario: '', email: '', nome: '', sexo: '', senha: '', receberEmail: ''};
	
	$scope.inserirUsuario = function(){
		if($scope.frm.$valid){
			//formulário válido, pode inserir
			$scope.limparNovo();
		}else{
			//Erro
			$scope.frm.usuario.$setDirty();
			$scope.frm.email.$setDirty();
			$scope.frm.nome.$setDirty();
			$scope.frm.senha.$setDirty();
		}
	}
   
	$scope.limparNovo = function(){
		$scope.cadastro = {id:'',nome:'',nota:1,conteudo:''};
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