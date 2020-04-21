/*
	Padronização do ID: 
		- [['p/parte','q/questao','/item'],'_'] vai gerar um id do tipo p1_q2_1
		- [['p/parte','q/questao','/itemletra'],'_'] vai gerar um id do tipo p1_q2_a
	Palavras-chave: questao, parte, item, itemletra, subitem
	Devem ser precedidas de uma barra '/'.
	A palavra-chave subitem será usada somente em questões com mais de um campo
*/

var IdPadrao = [
    ['parte/parte', 'q/questao', '/itemletra', '/subitem'], '_'
];

/*
	Questoes
	
	Aqui ficam concentrados todos os conteudos das questões da atividade!
	Veja que está separado por Parte/Questão/Item
	
	ATENÇÃO: Cada tipo possui um formato de entrada característico.
*/

var Partes = ['1', '2', '3', '4'];
var nomeSoft = 'lissajous';

var Questoes = [{ //Parte 1
        parte1_q1: //Questão 1
        {
            enunciadoGeral: 'Calcule os pontos relativos aos valores de t indicados nos itens abaixo. Use uma calculadora se achar necessário.',
            itens: [{ //A
                    tipo: 'generico',
                    corrigir: corrige_q_1_a,
                    enunciado: 'c(0)',
                    dados: '<div><span class="a_esquerda"><big>(</big></span><div><input id="parte1_q1_a_11" style="width:40px; margin: 0 5px !important;"/></div><span class="a_esquerda antes_depois" style="font-weight: bold;">;</span><div><input id="parte1_q1_a_12" style="width:40px; margin: 0 5px !important;"/></div><span class="a_esquerda"><big>)</big></span></div><br class="limpador" />',
                    msgErro: 'Calcule c(0)=(cos(0);sen(0))',
                    msgAjuda: 'Dê sua resposta na forma decimal. E arredonde com duas casas depois da vírgula.'
                },
                { //B
                    tipo: 'generico',
                    corrigir: corrige_q_1_b,
                    enunciado: 'c(&#960;/6)',
                    dados: '<div><span class="a_esquerda"><big>(</big></span><div><input id="parte1_q1_b_11" style="width:40px; margin: 0 5px !important;"/></div><span class="a_esquerda antes_depois" style="font-weight: bold;">;</span><div><input id="parte1_q1_b_12" style="width:40px; margin: 0 5px !important;"/></div><span class="a_esquerda"><big>)</big></span></div><br class="limpador" />',
                    msgErro: 'Calcule c(&#960;/6)=(cos(&#960;/6);sen(&#960;/6))',
                    msgAjuda: 'Dê sua resposta na forma decimal. E arredonde com duas casas depois da vírgula.'
                },
                { //C
                    tipo: 'generico',
                    corrigir: corrige_q_1_c,
                    enunciado: 'c(&#960;/3)',
                    dados: '<div><span class="a_esquerda"><big>(</big></span><div><input id="parte1_q1_c_11" style="width:40px; margin: 0 5px !important;"/></div><span class="a_esquerda antes_depois" style="font-weight: bold;">;</span><div><input id="parte1_q1_c_12" style="width:40px; margin: 0 5px !important;"/></div><span class="a_esquerda"><big>)</big></span></div><br class="limpador" />',
                    msgErro: 'Calcule c(&#960;/3)=(cos(&#960;/3);sen(&#960;/3))',
                    msgAjuda: 'Dê sua resposta na forma decimal. E arredonde com duas casas depois da vírgula.'
                },
                { //D
                    tipo: 'generico',
                    corrigir: corrige_q_1_d,
                    enunciado: 'c(&#960;/2)',
                    dados: '<div><span class="a_esquerda"><big>(</big></span><div><input id="parte1_q1_d_11" style="width:40px; margin: 0 5px !important;"/></div><span class="a_esquerda antes_depois" style="font-weight: bold;">;</span><div><input id="parte1_q1_d_12" style="width:40px; margin: 0 5px !important;"/></div><span class="a_esquerda"><big>)</big></span></div><br class="limpador" />',
                    msgErro: 'Calcule c(&#960;/2)=(cos(&#960;/2);sen(&#960;/2))',
                    msgAjuda: 'Dê sua resposta na forma decimal. E arredonde com duas casas depois da vírgula.'
                }
            ]
        }
    },
    { //Parte 2
        parte2_q2: //Questão 2
        {
            itens: [{ //A
                tipo: 'multipla_escolha',
                corrigir: corrige_q_2_a,
                enunciado: 'Que curva é essa?',
                dados: [
                    { value: '1', label: 'uma circunferência de raio 1' },
                    { value: '2', label: 'uma circunferência de raio 2' },
                    { value: '3', label: 'uma parábola' },
                    { value: '4', label: 'uma reta' }
                ],
                msgErro: 'Escolha alguns valores de incremento para t e movimente o seletor azul para observar o comportamento dos pontos descritos pela equação paramétrica dada.'
            }]
        }
    },
    { //Parte 3
        parte3_q3: {
            itens: [{ //A
                    tipo: 'input',
                    enunciado: 'Qual é o raio da circunferência obtida?',
                    corrigir: corrige_q_3_a,
                    selecionada: parte_3.associada_desativa,
                    esperando: true,
                    msgErro: 'Analise visualmente a curva obtida.'
                },
                { //B
                    tipo: 'multiplo_input_com_unidade',
                    enunciado: 'Quais são as coordenadas do centro da circunferência?',
                    corrigir: corrige_q_3_b,
                    selecionada: parte_3.associada_desativa,
                    esperando: true,
                    dados: [
                        [{ antes: 'x =', depois: ' ' }],
                        [{ antes: 'y =', depois: ' ' }]
                    ],
                    msgErro: 'Analise visualmente a curva obtida. Se desejar, volte e defina novos valores para x0 e y0 e veja o que acontece com o raio e o centro da circunferência obtida.'
                }
            ]
        },
        parte3_q4: {
            itens: [{
                tipo: 'multipla_escolha',
                enunciado: 'Qual é o efeito dos parâmetros x<sub>0</sub> e y<sub>0</sub> na circunferência obtida?',
                corrigir: corrige_q_4_a,
                selecionada: parte_3.associada_desativa,
                esperando: true,
                dados: [
                    { value: '1', label: 'eles não alteram o raio nem o centro da circunferência' },
                    { value: '2', label: 'eles alteram o raio da circunferência e não alteram a posição do centro' },
                    { value: '3', label: 'eles não alteram o raio da circunferência e alteram a posição do centro' },
                    { value: '4', label: 'eles alteram tanto o raio como a posição do centro da circunferência' }
                ],
                msgErro: 'Se você não está conseguindo responder esta questão, volte, defina valores diferentes para x0 e y0 e responda a questão 3 novamente.'
            }]
        },
        parte3_q5: {
            itens: [{
                tipo: 'generico',
                corrigir: corrige_q_5_a,
                selecionada: parte_3.associada_ativa,
                esperando: true,
                associado: true,
                enunciado: 'Ajuste os valores de x<sub>0</sub> e y<sub>0</sub> nos <a id="seletor_azul">seletores azuis</a> na ferramenta ao lado para que a circunferência azul centrada na origem se sobreponha à circunferência verde.',
                msgErro: 'Se você não está conseguindo responder esta questão, volte e resolva novamente as questões 1 e 2.'
            }]
        }
    },
    { //Parte 4
        parte4_q6: {
            itens: [{ //A
                    tipo: 'input',
                    enunciado: 'Qual é a <a id="amplitude_horizontal">amplitude horizontal</a>?',
                    corrigir: corrige_q_6_a,
                    selecionada: parte_4.associada_desativa,
                    esperando: true,
                    msgErro: 'Leia atentamente o significado de <a id="amplitude_horizontal2" style="float:none;margin:0;">amplitude horizontal</a> e analise visualmente a curva plotada.'
                },
                { //B
                    tipo: 'input',
                    enunciado: 'Qual é a <a id="amplitude_vertical">amplitude vertical</a>',
                    corrigir: corrige_q_6_b,
                    selecionada: parte_4.associada_desativa,
                    esperando: true,
                    msgErro: 'Leia atentamente o significado de <a id="amplitude_vertical2" style="float:none;margin:0;">amplitude vertical</a> e analise visualmente a curva plotada.'
                }
            ]
        },
        parte4_q7: {
            itens: [{
                tipo: 'multipla_escolha',
                enunciado: 'Qual é o efeito dos parâmetros <em>a<sub>1</sub></em> e <em>a<sub>2</sub></em> na curva obtida?',
                corrigir: corrige_q_7_a,
                selecionada: parte_4.associada_desativa,
                esperando: true,
                dados: [
                    { value: '1', label: 'eles alteram o centro da curva obtida' },
                    { value: '2', label: 'eles alteram a amplitude horizontal e vertical da curva, respectivamente' },
                    { value: '3', label: 'eles alteram a amplitude vertical e horizontal da curva, respectivamente' },
                    { value: '4', label: 'eles não provocam nenhuma alteração na curva' }
                ],
                msgErro: 'Se você não está conseguindo responder esta questão volte, defina valores diferentes para <em style="color: red;">a<sub style="color: red;">1</sub></em> e <em style="color: red;">a<sub style="color: red;">2</sub></em> e responda a questão 6 novamente.'
            }]
        },
        parte4_q8: {
            itens: [{
                tipo: 'generico',
                corrigir: corrige_q_8_a,
                selecionada: parte_4.associada_ativa,
                esperando: true,
                associado: true,
                enunciado: 'Ajuste os valores de <em>a<sub>1</sub></em> e <em>a<sub>2</sub></em> nos <a id="seletor_azul">seletores azuis</a> na ferramenta ao lado para que a circunferência azul centrada na origem se sobreponha à curva verde.',
                msgErro: 'Se você não está conseguindo responder esta questão, volte e resolva novamente as questões 6 e 7.'
            }]
        }
    }
]

/*
	Bloco de Notas
	
	Nesse Array ficam os dados que aparecem no Bloquinho de notas.
	Se você for na linha 35 do exemplo_correcao.js verá que está sendo criada uma instância
	de "Blocao", uma classe de bloco de notas que permite tabelas no conteúdo. Se não for
	usar tabelas no Software, altere para "Bloco". Ambas classes utilizam a variavel global
	MeuBloco para preencher o seu conteúdo.
*/

var MeuBloco = new Array();