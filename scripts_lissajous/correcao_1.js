var ggb = false;
var safeLoaded = true;

document.observe('dom:safeLoaded', function(ev)
{
	safeLoaded = true;
	tentaCarregar();
});

function agendaRefresh()
{
	window.setTimeout("document.ggbApplet.refreshViews()", 100);
	window.setTimeout("document.ggbApplet.refreshViews()", 500);
}

function ggbOnInit()
{
	ggb = true;
	tentaCarregar();
}

function tentaCarregar()
{
	if(!ggb || !safeLoaded)
		return;

	if($('SalvaLocal').Pega(nomeSoft, 'atividade_1') != '3')
		$('SalvaLocal').Salva(nomeSoft, 'atividade_1', '2');

	BlocoNotas = new Blocao();
	switch(PosicaoAtual.Parte)
	{
		case 0:
			$w('parte1_q1_a_11 parte1_q1_a_12 parte1_q1_b_11 parte1_q1_b_12 parte1_q1_c_11 parte1_q1_c_12 parte1_q1_d_11 parte1_q1_d_12').each(monitora_texto);
		break;


		case 1:
			$w('parte2_q2_a_1 parte2_q2_a_2 parte2_q2_a_3 parte2_q2_a_4').each(monitora_radio);

			parte_2.escondeSeletores();
			$('incremento').observe('input:change', parte_2.arrumaSeletor);
			$('incremento').fire('input:change');
		break;


		case 2:
			//Monta o popup que avisa sobre valores iniciais errados
			parte_3.popupInicial = new Popup($('link_valor_inicial'), 'Escolha dois números não nulos entre -3 e 3 para x<sub>0</sub> e y<sub>0</sub>.', ['seta_baixo', 'direita'], 8);
			document.observe('mousedown', parte_3.popupInicial.fecha.bind(parte_3.popupInicial));

			//Controla o valor inicial
			var x0 = processaExpressao(getResp('x0_parte_3'));
			var y0 = processaExpressao(getResp('y0_parte_3'));
			if(x0 && y0 && !isNaN(x0) && !isNaN(y0))
			{
				$('input_valor_inicial_x0').value = x0;
				$('input_valor_inicial_y0').value = y0;
				parte_3.set_inicial();
				parte_3.ver_curva();
			}

			$w('parte3_q3_a parte3_q3_b_11 parte3_q3_b_21').each(monitora_texto);
			$w('parte3_q4_a_1 parte3_q4_a_2 parte3_q4_a_3 parte3_q4_a_4').each(monitora_radio);
		break;


		case 3:
			//Monta o popup que avisa sobre valores iniciais errados
			parte_4.popupInicial = new Popup($('link_valor_inicial'), 'Escolha dois números entre -3 e 3 para <em>a<sub>1</sub></em> e <em>a<sub>2</sub></em> que sejam diferentes entre si.', ['seta_baixo', 'direita'], 8);
			document.observe('mousedown', parte_4.popupInicial.fecha.bind(parte_4.popupInicial));

			//Controla o valor inicial
			var a1 = processaExpressao(getResp('a1_parte_4'));
			var a2 = processaExpressao(getResp('a2_parte_4'));
			if(a1 && a2)
			{
				$('input_valor_inicial_a1').value = a1;
				$('input_valor_inicial_a2').value = a2;
				parte_4.set_inicial();
				parte_4.ver_curva();
			}

			$w('parte4_q6_a parte4_q6_b').each(monitora_texto);
			$w('parte4_q7_a_1 parte4_q7_a_2 parte4_q7_a_3 parte4_q7_a_4').each(monitora_radio);
		break;
	}
}


//PARTE 4
var parte_4 = {
	popupInicial:null,
	ativa: false,
	associada_desativa: function()
	{
		if(!parte_4.ativa)
			return;

		parte_4.ver_curva();
		var applet = document.ggbApplet;
		if(applet.getVisible('a'))
		{
			applet.setVisible('a', false);
			applet.setVisible('b', false);
			applet.setVisible('texto1', false);
			applet.setVisible('texto2', false);
			applet.setVisible('c_1', false);
			applet.setVisible('c_2', false);
		}

		agendaRefresh();

		parte_4.ativa = false;
	},
	associada_ativa: function()
	{
		if(parte_4.ativa)
			return;

		parte_4.esconde_curva()
		var applet = document.ggbApplet;
		applet.setVisible('a', true);
		applet.setVisible('b', true);
		applet.setVisible('texto1', true);
		applet.setVisible('texto2', true);
		applet.setVisible('c_1', true);
		applet.setVisible('c_2', true);
	
		applet.setValue('b_1', processaExpressao(getResp('b1_parte_4')));
		applet.setValue('b_2', processaExpressao(getResp('b2_parte_4')));
		parte_4.ativa = true;

		agendaRefresh();
	},
	ver_curva: function()
	{
		var applet = document.ggbApplet;

		if(applet.getVisible('c'))
			return;

		var a1 = processaExpressao(getResp('a1_parte_4'));
		var a2 = processaExpressao(getResp('a2_parte_4'));

		if(a1 && a2 && !isNaN(a1) && !isNaN(a2))
		{
			applet.setValue('a_1', a1);
			applet.setValue('a_2', a2);
			applet.setVisible('c', true);
			applet.setVisible('texto3', true);
		}
	},
	esconde_curva: function()
	{
		var applet = document.ggbApplet;
		applet.setVisible('c', false);
		applet.setVisible('texto3', false);
	},
	set_inicial: function()
	{
		var a1 = processaExpressao($('input_valor_inicial_a1').value);
		var a2 = processaExpressao($('input_valor_inicial_a2').value);

		if(!isNaN(a1) && !isNaN(a2) && a1 && a2 && Math.abs(a1) <= 3 && Math.abs(a2) <= 3 && a1 != a2)
		{
			removeEsperando({Parte: 3, Questao:'parte4_q6', Item: 0});
			removeEsperando({Parte: 3, Questao:'parte4_q6', Item: 1});
			removeEsperando({Parte: 3, Questao:'parte4_q7', Item: 0});
			removeEsperando({Parte: 3, Questao:'parte4_q8', Item: 0});

			$('valor_inicial').addClassName('desabilitada');
			$('link_valor_inicial').hide();
			$('unset_inicial').show();

			$('input_valor_inicial_a1').trava();
			$('input_valor_inicial_a2').trava();

			setResp('a1_parte_4', a1);
			setResp('a2_parte_4', a2);

			setResp('b1_parte_4','0');
			setResp('b2_parte_4','0');
			if(!processaExpressao(getResp('b1_parte_4')))
				while (getResp('b1_parte_4')==0)
				{
					setResp('b1_parte_4', Math.round(Math.random()*3));
				}
			if(!processaExpressao(getResp('b2_parte_4')))
				while (getResp('b2_parte_4')==0)
				{
					setResp('b2_parte_4', Math.round(Math.random()*3));
				}
					
			parte_4.ver_curva();
		}
		else
		{
			parte_4.popupInicial.abre();
		}
	},
	unset_inicial: function()
	{
		if (this.resultado == 'sim')
		{
			adicionaEsperando({Parte: 3, Questao:'parte4_q6', Item: 0});
			adicionaEsperando({Parte: 3, Questao:'parte4_q6', Item: 1});
			adicionaEsperando({Parte: 3, Questao:'parte4_q7', Item: 0});
			adicionaEsperando({Parte: 3, Questao:'parte4_q8', Item: 0});

			$('valor_inicial').removeClassName('desabilitada');

			$('link_valor_inicial').show();
			$('unset_inicial').hide();

			$('input_valor_inicial_a1').destrava();
			$('input_valor_inicial_a1').setValue('');
			$('input_valor_inicial_a2').destrava();
			$('input_valor_inicial_a2').setValue('');
			parte_4.esconde_curva();

			setResp('a1_parte_4', '');
			setResp('a2_parte_4', '');
			setResp('b1_parte_4', '');
			setResp('b2_parte_4', '');
		}
	}
}

//PARTE 3
var parte_3 = {
	popupInicial:null,
	ativa: false,
	associada_desativa: function ()
	{
		if(!parte_3.ativa)
			return;

		parte_3.ver_curva();
		var applet = document.ggbApplet;
		applet.setVisible('a', false);
		applet.setVisible('b', false);
		applet.setVisible('x_2', false);
		applet.setVisible('y_2', false);
		applet.setVisible('texto1', false);
		applet.setVisible('texto2', false);

		agendaRefresh();

		parte_3.ativa = false;
	},
	associada_ativa: function()
	{
		if(parte_3.ativa)
			return;

		parte_3.esconde_curva()
		var applet = document.ggbApplet;
		applet.setVisible('a', true);
		applet.setVisible('b', true);
		applet.setVisible('x_2', true);
		applet.setVisible('y_2', true);
		applet.setVisible('texto2', true);
		applet.setValue('x_1', processaExpressao(getResp('x1_parte_3')));
		applet.setValue('y_1', processaExpressao(getResp('y1_parte_3')));

		agendaRefresh();

		parte_3.ativa = true;
	},
	ver_curva: function()
	{
		var applet = document.ggbApplet;

		applet.setValue('x_0', processaExpressao(getResp('x0_parte_3')));
		applet.setValue('y_0', processaExpressao(getResp('y0_parte_3')));
		applet.setVisible('c', true);
		applet.setVisible('texto3', true);

		agendaRefresh();
	},
	esconde_curva: function()
	{
		var applet = document.ggbApplet;
		applet.setVisible('c', false);
		applet.setVisible('texto3', false);
	},
	set_inicial: function()
	{
		var x0 = processaExpressao($('input_valor_inicial_x0').value);
		var y0 = processaExpressao($('input_valor_inicial_y0').value);

		if(!isNaN(x0) && !isNaN(y0) && x0 && y0 && Math.abs(x0) <= 3 && Math.abs(y0) <= 3)
		{
			removeEsperando({Parte: 2, Questao:'parte3_q3', Item: 0});
			removeEsperando({Parte: 2, Questao:'parte3_q3', Item: 1});
			removeEsperando({Parte: 2, Questao:'parte3_q4', Item: 0});
			removeEsperando({Parte: 2, Questao:'parte3_q5', Item: 0});

			$('valor_inicial').addClassName('desabilitada');
			$('link_valor_inicial').hide();
			$('unset_inicial').show();

			$('input_valor_inicial_x0').trava();
			$('input_valor_inicial_y0').trava();

			setResp('x0_parte_3', x0);
			setResp('y0_parte_3', y0);
			if(!processaExpressao(getResp('x1_parte_3')))	setResp('x1_parte_3', Math.round(Math.random()*6-3));
			if(!processaExpressao(getResp('y1_parte_3')))	setResp('y1_parte_3', Math.round(Math.random()*6-3));

			parte_3.ver_curva();
		}
		else
		{
			parte_3.popupInicial.abre();
		}
	},
	unset_inicial: function()
	{
		if (this.resultado == 'sim')
		{
			adicionaEsperando({Parte: 2, Questao:'parte3_q3', Item: 0}, '');
			adicionaEsperando({Parte: 2, Questao:'parte3_q3', Item: 1}, '');
			adicionaEsperando({Parte: 2, Questao:'parte3_q4', Item: 0}, '');
			adicionaEsperando({Parte: 2, Questao:'parte3_q5', Item: 0}, '');

			$('valor_inicial').removeClassName('desabilitada');

			$('link_valor_inicial').show();
			$('unset_inicial').hide();

			$('input_valor_inicial_x0').destrava();
			$('input_valor_inicial_x0').setValue('');
			$('input_valor_inicial_y0').destrava();
			$('input_valor_inicial_y0').setValue('');
			parte_3.esconde_curva();

			setResp('x0_parte_3', '');
			setResp('y0_parte_3', '');
			setResp('x1_parte_3', '');
			setResp('y1_parte_3', '');
		}
	}
}

//PARTE 2
var parte_2 = {
	escondeSeletores: function()
	{
		if(!ggb)
			return;

		var applet = document.ggbApplet;
		for(var i = 1; i <= 7; i++)
		{
			applet.setVisible('t_'+i, false);
			applet.setFixed('t_'+i, true);
		}
	},
	arrumaSeletor: function()
	{
		var applet = document.ggbApplet;
		var tipo = $('incremento').getValue();
		var obj = 't_'+tipo;

		parte_2.limpar_rastro();
		parte_2.escondeSeletores();

		applet.setVisible(obj, true);
		applet.evalCommand('P=(cos('+obj+'/4), sin('+obj+'/4))');
		applet.evalCommand('val = '+obj+' / (4 π)');
	},
	limpar_rastro: function()
	{
		var applet = document.ggbApplet;
		applet.refreshViews();
	}
};

//PARTE 1
var parte_1 = {
	plotaPontoQuestao: function(letra)
	{
		if(ggb)
		{
			var el1 = $('parte1_q1_'+letra+'_11'),
				el2 = $('parte1_q1_'+letra+'_12');

			if(el1.value.empty() || el2.value.empty())
				return;

			var x = processaExpressao(el1.value);
			var y = processaExpressao(el2.value);

			var applet = document.ggbApplet;
			if(x !== null && y !== null)
			{
				letra = letra.toUpperCase();
				applet.setFixed(letra, false);
				applet.evalCommand(letra + '=('+x+','+y+')');
				applet.setFixed(letra, true);
				applet.setColor(letra, 0, 204, 0);
				applet.setVisible(letra, true);
			}
		}
		else
		{
			window.setTimeout(function(){parte_1.plotaPontoQuestao(this)}.bind(id), 500);
		}
	},
	removePontoQuestao: function(letra)
	{
		var applet = document.ggbApplet;
		applet.setVisible(letra.toUpperCase(), false);
	}
};


// função que é chamada sempre que todas as questões de uma determinada parte são acertadas
function tudoCerto()
{
	if(PosicaoAtual.Parte == 3)
		$('SalvaLocal').Salva(nomeSoft, 'atividade_1', '3');
}



// Correções da parte 1
function corrige_q_1_a(valor)
{
	var correto1 = processaExpressao($('parte1_q1_a_11').value) == 1
	var correto2 = processaExpressao($('parte1_q1_a_12').value) == 0;

	$('parte1_q1_a_11').up().removeClassName('correto');
	$('parte1_q1_a_11').up().removeClassName('incorreto');
	$('parte1_q1_a_12').up().removeClassName('correto');
	$('parte1_q1_a_12').up().removeClassName('incorreto');

	if(correto1)$('parte1_q1_a_11').up().addClassName('correto');
	else		$('parte1_q1_a_11').up().addClassName('incorreto');
	if(correto2)$('parte1_q1_a_12').up().addClassName('correto');
	else		$('parte1_q1_a_12').up().addClassName('incorreto');

	if(correto1&&correto2)
		parte_1.plotaPontoQuestao('a');
	else
		parte_1.removePontoQuestao('a');

	return [correto1&&correto2];
}

function corrige_q_1_b(valor)
{
	var correto1 = Math.abs(processaExpressao($('parte1_q1_b_11').value) - 0.87) <= 0.01;
	var correto2 = Math.abs(processaExpressao($('parte1_q1_b_12').value) - 0.5) <= 0.01;

	$('parte1_q1_b_11').up().removeClassName('correto');
	$('parte1_q1_b_11').up().removeClassName('incorreto');
	$('parte1_q1_b_12').up().removeClassName('correto');
	$('parte1_q1_b_12').up().removeClassName('incorreto');

	if(correto1)$('parte1_q1_b_11').up().addClassName('correto');
	else		$('parte1_q1_b_11').up().addClassName('incorreto');
	if(correto2)$('parte1_q1_b_12').up().addClassName('correto');
	else		$('parte1_q1_b_12').up().addClassName('incorreto');

	if(correto1&&correto2)
		parte_1.plotaPontoQuestao('b');
	else
		parte_1.removePontoQuestao('b');

	return [correto1&&correto2];
}

function corrige_q_1_c(valor)
{
	var correto1 = Math.abs(processaExpressao($('parte1_q1_c_11').value) - 0.5) <= 0.01;
	var correto2 = Math.abs(processaExpressao($('parte1_q1_c_12').value) - 0.87) <= 0.01;
	$('parte1_q1_c_11').up().removeClassName('correto');
	$('parte1_q1_c_11').up().removeClassName('incorreto');
	$('parte1_q1_c_12').up().removeClassName('correto');
	$('parte1_q1_c_12').up().removeClassName('incorreto');

	if(correto1)$('parte1_q1_c_11').up().addClassName('correto');
	else		$('parte1_q1_c_11').up().addClassName('incorreto');
	if(correto2)$('parte1_q1_c_12').up().addClassName('correto');
	else		$('parte1_q1_c_12').up().addClassName('incorreto');

	if(correto1&&correto2)
		parte_1.plotaPontoQuestao('c');
	else
		parte_1.removePontoQuestao('c');

	return [correto1&&correto2];
}

function corrige_q_1_d(valor)
{
	var correto1 = Math.abs(processaExpressao($('parte1_q1_d_11').value) - 0) <= 0.01;
	var correto2 = Math.abs(processaExpressao($('parte1_q1_d_12').value) - 1) <= 0.01;
	$('parte1_q1_d_11').up().removeClassName('correto');
	$('parte1_q1_d_11').up().removeClassName('incorreto');
	$('parte1_q1_d_12').up().removeClassName('correto');
	$('parte1_q1_d_12').up().removeClassName('incorreto');

	if(correto1)$('parte1_q1_d_11').up().addClassName('correto');
	else		$('parte1_q1_d_11').up().addClassName('incorreto');
	if(correto2)$('parte1_q1_d_12').up().addClassName('correto');
	else		$('parte1_q1_d_12').up().addClassName('incorreto');

	if(correto1&&correto2)
		parte_1.plotaPontoQuestao('d');
	else
		parte_1.removePontoQuestao('d');

	return [correto1&&correto2];
}


// Correções da parte 2
function corrige_q_2_a(valor)
{
	return [valor[0]?true:null, valor[1]?false:null, valor[2]?false:null, valor[3]?false:null]
}


// Correções da parte 3
function corrige_q_3_a(valor)
{
	return [processaExpressao(valor[0]) == 1];
}

function corrige_q_3_b(valor)
{
	return [processaExpressao(valor[0]) == processaExpressao(getResp('x0_parte_3')), processaExpressao(valor[1]) == processaExpressao(getResp('y0_parte_3'))];
}

function corrige_q_4_a(valor)
{
	return [valor[0]?false:null, valor[1]?false:null, valor[2]?true:null, valor[3]?false:null];
}

function corrige_q_5_a(valor)
{
	var x1 = processaExpressao(getResp('x1_parte_3'));
	var y1 = processaExpressao(getResp('y1_parte_3'));

	var applet = document.ggbApplet;

	return [applet.getValue('x_2') == x1 && applet.getValue('y_2') == y1];
}


// Correções da parte 4
function corrige_q_6_a(valor)
{
	return [processaExpressao(valor[0]) == Math.abs(2*processaExpressao(getResp('a1_parte_4')))];
}

function corrige_q_6_b(valor)
{
	return [processaExpressao(valor[0]) == Math.abs(2*processaExpressao(getResp('a2_parte_4')))];
}

function corrige_q_7_a(valor)
{
	return [valor[0]?false:null, valor[1]?true:null, valor[2]?false:null, valor[3]?false:null];
}

function corrige_q_8_a(valor)
{
	var b1 = processaExpressao(getResp('b1_parte_4'));
	var b2 = processaExpressao(getResp('b2_parte_4'));
	var applet = document.ggbApplet;

	return [Math.abs(applet.getValue('c_1')) == b1 && Math.abs(applet.getValue('c_2')) == b2];
}
