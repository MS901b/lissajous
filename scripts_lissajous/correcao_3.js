
var ggb = false;
var safe_loaded = false;

Event.observe(document, 'dom:safeLoaded', function()
{
	safe_loaded = true;
	if($('SalvaLocal').Pega(nomeSoft, 'atividade_3') != '3')
		$('SalvaLocal').Salva(nomeSoft, 'atividade_3', '2');
	
	tentaCarregarValores();
});

function agendaRefresh()
{
	window.setTimeout("document.ggbApplet.refreshViews()", 100);
	window.setTimeout("document.ggbApplet.refreshViews()", 500);
}

function ggbOnInit()
{
	ggb = true;
	tentaCarregarValores();
}

function tentaCarregarValores()
{
	if(!ggb || !safe_loaded)
		return;
	
	BlocoNotas = new Blocao();
	switch(PosicaoAtual.Parte)
	{
		case 1:
			$w('parte2_q2_a_11 parte2_q2_a_12 parte2_q2_b parte2_q2_c parte2_q2_d parte2_q3_a parte2_q3_b').each(monitora_texto);
			
			$('grade').observe('click', function(ev)
			{
				if(!ggb)return;
				document.ggbApplet.evalCommand('verGrade = '+Event.element(ev).checked);
				agendaRefresh();
			});
		break;
		
		case 2:
			$w('parte3_q4_a_11 parte3_q4_a_12 parte3_q4_b parte3_q4_c').each(monitora_texto);
		break;
		
		case 3:
			$w('parte4_q5_a_1 parte4_q5_a_2 parte4_q5_a_3 parte4_q5_a_4').each(monitora_radio);
		break;
	}
}

function parte_1_atualiza_valores(nome){parte_1.atualiza_valores()};
function parte_1_termina_atualizacao(nome){parte_1.termina_atualizacao()};

//PARTE 1
var parte_1 = {
	selecionada: null,
	atualiza_valores: function()
	{
		var applet = document.ggbApplet;
		var base_name = 'atv3_q1_'+parte_1.selecionada+'_';
		
		setResp(base_name+'f1', applet.getValue('f_1'));
		setResp(base_name+'f2', applet.getValue('f_2'));
		$('parte1_q1_'+parte_1.selecionada).fire('input:change');
	},
	monta_applet: function()
	{
		var applet = document.ggbApplet;
		var base_name = 'atv3_q1_'+parte_1.selecionada+'_';
		var f1_gravado = getResp(base_name+'f1');
		
		applet.unregisterObjectUpdateListener('f_1');
		applet.registerObjectUpdateListener('l', 'parte_1_termina_atualizacao');
		
		if(f1_gravado != 'undefined' && f1_gravado != '')
			applet.setValue('f_1', Number(f1_gravado));	
		
		applet.registerObjectUpdateListener('f_1', 'parte_1_atualiza_valores');
	},
	termina_atualizacao: function()
	{
		var applet = document.ggbApplet;
		var base_name = 'atv3_q1_'+parte_1.selecionada+'_';
		var f2_gravado = getResp(base_name+'f2');
		
		applet.unregisterObjectUpdateListener('f_2');
		applet.unregisterObjectUpdateListener('l');
		
		if(f2_gravado != 'undefined' && f2_gravado != '')
			applet.setValue('f_2', Number(f2_gravado));
		
		applet.registerObjectUpdateListener('f_2', 'parte_1_atualiza_valores');
	},
	seleciona_a: function()
	{
		parte_1.selecionada = 'a';
		parte_1.monta_applet();
	},
	seleciona_b: function()
	{
		parte_1.selecionada = 'b';
		parte_1.monta_applet();
	},
	seleciona_c: function()
	{
		parte_1.selecionada = 'c';
		parte_1.monta_applet();
	},
	seleciona_d: function()
	{
		parte_1.selecionada = 'd';
		parte_1.monta_applet();
	}
};

var parte_2 = {
	
};

// função que é chamada sempre que todas as questões de uma determinada parte são acertadas
function tudoCerto()
{
	if(PosicaoAtual.Parte == 3)
	{
		$('SalvaLocal').Salva(nomeSoft, 'atividade_3', '3');
	}
}



// PARTE 1

function corrige_q_1_a(valor)
{
	var correto =  ( (getResp('atv3_q1_a_f1') == '1' && getResp('atv3_q1_a_f2') == '2') || ( (getResp('atv3_q1_a_f1') == '2' && getResp('atv3_q1_a_f2') == '4') ) );
	return [correto];
}
function corrige_q_1_b(valor)
{
	return [getResp('atv3_q1_b_f1') == '1' && getResp('atv3_q1_b_f2') == '3'];
}
function corrige_q_1_c(valor)
{
	return [getResp('atv3_q1_c_f1') == '2' && getResp('atv3_q1_c_f2') == '3'];
} 
function corrige_q_1_d(valor)
{
	return [getResp('atv3_q1_d_f1') == '4' && getResp('atv3_q1_d_f2') == '3'];
} 



//PARTE 2

function corrige_q_2_a()
{
	var correto1 = processaExpressao($('parte2_q2_a_11').value) == 1
	var correto2 = processaExpressao($('parte2_q2_a_12').value) == 0;
	
	$('parte2_q2_a_11').up().removeClassName('correto');
	$('parte2_q2_a_11').up().removeClassName('incorreto');
	$('parte2_q2_a_12').up().removeClassName('correto');
	$('parte2_q2_a_12').up().removeClassName('incorreto');
	
	if(correto1)$('parte2_q2_a_11').up().addClassName('correto');
	else		$('parte2_q2_a_11').up().addClassName('incorreto');
	if(correto2)$('parte2_q2_a_12').up().addClassName('correto');
	else		$('parte2_q2_a_12').up().addClassName('incorreto');
	
	return [correto1&&correto2];
}
function corrige_q_2_b(valor)
{
	var num = processaExpressaoParenteses(valor[0]);
	return [Math.abs(num - Math.PI/2) < 0.005];
}
function corrige_q_2_c(valor)
{
	var resp = processaExpressaoParenteses(valor[0]);
	
	$('q_2c_errmsg_1').show();
	$('q_2c_errmsg_2').hide();
	
	var correto =  (Math.abs(resp - 3*Math.PI/2) < 0.005);
	
	if(correto)
	{
		$('q_2c_errmsg_1').hide();
		$('q_2c_errmsg_2').show();
	}
	
	return [correto];
}
function corrige_q_2_d(valor)
{
	var num = processaExpressaoParenteses(valor[0]);
	return [Math.abs(num - 2*Math.PI) < 0.005];
}
function corrige_q_3_a(valor)
{
	return [processaExpressaoParenteses(valor[0]) == 3];
}
function corrige_q_3_b(valor)
{
	return [processaExpressaoParenteses(valor[0]) == 2];
}



//PARTE 3

function corrige_q_4_a(valor)
{
	var correto1 = processaExpressao($('parte3_q4_a_11').value) == 1
	var correto2 = processaExpressao($('parte3_q4_a_12').value) == 0;
	
	$('parte3_q4_a_11').up().removeClassName('correto');
	$('parte3_q4_a_11').up().removeClassName('incorreto');
	$('parte3_q4_a_12').up().removeClassName('correto');
	$('parte3_q4_a_12').up().removeClassName('incorreto');
	
	if(correto1)$('parte3_q4_a_11').up().addClassName('correto');
	else		$('parte3_q4_a_11').up().addClassName('incorreto');
	if(correto2)$('parte3_q4_a_12').up().addClassName('correto');
	else		$('parte3_q4_a_12').up().addClassName('incorreto');
	
	return [correto1&&correto2];
}
function corrige_q_4_b(valor)
{
	var num = processaExpressaoParenteses(valor[0]);
	return [Math.abs(num - Math.PI/4) < 0.005];
}
function corrige_q_4_c(valor)
{
	var num = processaExpressaoParenteses(valor[0]);
	return [Math.abs(num - Math.PI) < 0.005];
}

// PARTE 4

function corrige_q_5_a(valor)
{
	return [valor[0]?false:null, valor[1]?false:null, valor[2]?true:null, valor[3]?false:null]
}
