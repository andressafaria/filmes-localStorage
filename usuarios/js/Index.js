/* JavaScript */

var Index = {

	init: function() {
		Index.setForm();
		Index.listUsuarios();
	},

	setForm: function() {
		var form = document.getElementById('form');
		if(form) {
			form.onsubmit = function() {
				Index.saveUsuario(form);
				return false;
			};
		}
	},

	saveUsuario: function(form) {
		var usuario = {};
		usuario.nome  = form.nome.value;
		usuario.cidade = form.cidade.value;
		usuario.bairro = form.bairro.value;
		usuario.rua = form.rua.value;
		usuario.numero = form.numero.value;
		usuario.celular = form.celular.value;
		usuario.celular2 = form.celular2.value;
		usuario.telefone = form.telefone.value;
		
		if(UsuarioDAO.save(usuario) == UsuarioDAO.NEW) {
			TableController.addItem(usuario, Index.edit, Index.delete);
		}
		else {
			TableController.clearList();
			Index.listUsuarios();
		}

		form.nome.value = form.cidade.value = form.bairro.value = form.rua.value = form.numero.value = form.celular.value = form.celular2.value = form.telefone.value = "";
	},

	setTable: function() {
		var table = document.getElementById('tabela-usuarios');
		TableController.setTable(table);
	},

	listUsuarios: function() {
		Index.setTable();
		var usuarioList = UsuarioDAO.retrieve();
		if (usuarioList && usuarioList.length) {
			TableController.addList(usuarioList, Index.edit, Index.delete);
		}
	},

	mascara: function (t, mask){
		var i = t.value.length;
		var saida = mask.substring(1,0);
		var texto = mask.substring(i)
		if (texto.substring(0,1) != saida){
			t.value += texto.substring(0,1);
		}
	}, 

	edit: function(nome) {
		if(confirm("Você deseja editar o usuário " + nome + " ?")) {
			var usuario = UsuarioDAO.get(nome);
			if (comprador) {
				var form = document.getElementById('form');
				form.nome.value  = usuario.nome;
				form.cidade.value = usuario.cidade;
				form.bairro.value = usuario.bairro;
				form.rua.value = usuario.rua;
				form.numero.value = usuario.numero;
				form.celular.value = usuario.celular;
				form.celular2.value = usuario.celular2;
				form.telefone.value = usuario.telefone;
			}
		}
	},

	delete: function(nome, element) {
		if(confirm("Você deseja deletar o usuário " + nome + " ?")) {
			var usuario = UsuarioDAO.get(nome);
			if (usuario) {
				if(UsuarioDAO.delete(nome)) {
					var row = element.parentNode.parentNode;
					row.parentNode.removeChild(row);
				}
			}	
		}
	}
};

//initialization
UsuarioDAO.unserializeAndParse();
Index.init();