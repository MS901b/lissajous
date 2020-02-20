
//Funcao que pega no flash o valor da resposta do id passado.
function getResp(id) {
	return $('SalvaLocal').Pega(nomeSoft,id);
}

//Funcao que guarda no flash o valor da resposta do id passado.
function setResp(id,valor) {
	$('SalvaLocal').Salva(nomeSoft,id,valor);
}

// Apaga todas as resposta guardadas.
function apagaTodasResp() {
	return ($('SalvaLocal').ApagaTudo(nomeSoft));
}

function apagaResp(valor) {
	return $('SalvaLocal').Apaga(nomeSoft,valor);
}

function monitora_texto(item)
{
	if(typeof item == 'object')
		item = item.id;
	
	var valor = $('SalvaLocal').Pega(nomeSoft, PosicaoAtual.Atividade + item);
	if(valor != 'undefined')
		$(item).setValue(valor);
	var funcao = function(ev)
	{
		var item = Event.element(ev);
		$('SalvaLocal').Salva(nomeSoft, PosicaoAtual.Atividade + item.id, item.value);
	}
	$(item).observe('change', funcao);
	$(item).observe('input:change', funcao);
}

function monitora_radio(item)
{
	var valor = $('SalvaLocal').Pega(nomeSoft, PosicaoAtual.Atividade + item);
	if(valor != 'undefined')
		$(item).checked = eval(valor);
	
	$(item).observe('change', function(ev)
	{
		ev.findElement('.input_radio').select('input[type=radio]').each(function(item){
			$('SalvaLocal').Salva(nomeSoft, PosicaoAtual.Atividade + item.id, item.checked);
		})
	});
}
