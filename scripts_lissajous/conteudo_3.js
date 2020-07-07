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
            enunciadoGeral: 'Encontre os valores de <em>f<sub>1</sub></em> e <em>f<sub>2</sub></em> que resultem nas curvas mostradas abaixo.',
            itens: [{ //A
                    tipo: 'generico',
                    corrigir: corrige_q_1_a,
                    associado: true,
                    selecionada: parte_1.seleciona_a,
                    enunciado: '<img src="imgs/atv3_q1_a.png" alt="" />',
                    dados: '',
                    msgErro: 'Varie o valor dos parâmetros <em style="color:red;">f<sub style="color:red;">1</sub></em> e <em style="color:red;">f<sub style="color:red;">2</sub></em> nos seletores azuis até obter a curva acima.'
                },
                { //B
                    tipo: 'generico',
                    corrigir: corrige_q_1_b,
                    associado: true,
                    selecionada: parte_1.seleciona_b,
                    enunciado: '<img src="imgs/atv3_q1_b.png" alt="" />',
                    dados: '',
                    msgErro: 'Varie o valor dos parâmetros <em style="color:red;">f<sub style="color:red;">1</sub></em> e <em style="color:red;">f<sub style="color:red;">2</sub></em> nos seletores azuis até obter a curva acima.'
                },
                { //C
                    tipo: 'generico',
                    corrigir: corrige_q_1_c,
                    associado: true,
                    selecionada: parte_1.seleciona_c,
                    enunciado: '<img src="imgs/atv3_q1_c.png" alt="" />',
                    dados: '',
                    msgErro: 'Varie o valor dos parâmetros <em style="color:red;">f<sub style="color:red;">1</sub></em> e <em style="color:red;">f<sub style="color:red;">2</sub></em> nos seletores azuis até obter a curva acima.'
                },
                { //D
                    tipo: 'generico',
                    corrigir: corrige_q_1_d,
                    associado: true,
                    selecionada: parte_1.seleciona_d,
                    enunciado: '<img src="imgs/atv3_q1_d.png" alt="" />',
                    dados: '',
                    msgErro: 'Varie o valor dos parâmetros <em style="color:red;">f<sub style="color:red;">1</sub></em> e <em style="color:red;">f<sub style="color:red;">2</sub></em> nos seletores azuis até obter a curva acima.'
                }
            ]
        }
    },
    { //Parte 2
        parte2_q2: //Questão 2
        {
            itens: [{ //A
                    tipo: 'generico',
                    corrigir: corrige_q_2_a,
                    enunciado: 'Quais são as coordenadas do ponto <em>l(0)</em>?',
                    dados: '<div><span class="a_esquerda"><big>(</big></span><div><input id="parte2_q2_a_11" style="width:40px; margin: 0 5px !important;"/></div><span class="a_esquerda antes_depois"><strong>;</strong></span><div><input id="parte2_q2_a_12" style="width:40px; margin: 0 5px !important;"/></div><span class="a_esquerda"><big>)</big></span></div><br class="limpador" />',
                    msgErro: 'Substitua  <em style="color:red;">t=0</em> na expressão que determina a curva.'
                },
                { //B
                    tipo: 'input',
                    corrigir: corrige_q_2_b,
                    enunciado: 'Qual é o menor valor positivo de <em>t</em> para o qual <em>l(t)=(0,0)</em>, ou seja, para o qual a curva corta a origem?',
                    caracteres_especiais: ['pi', 'raiz', 'alfa'],
                    dados: [
                        [{ tipo: 'pequeno', depois: ';' }, { tipo: 'pequeno' }]
                    ],
                    msgErro: 'Use o <a id="seletor_vermelho" style="float: none; margin: 0;">seletor vermelho</a> para variar  o valor de <em style="color:red;">t</em> t até que o ponto vermelho esteja na origem pela primeira vez.'
                },
                { //C
                    tipo: 'input',
                    corrigir: corrige_q_2_c,
                    enunciado: 'Para qual valor de <em>t</em> a curva <em>l(t)</em> corta novamente a origem?',
                    caracteres_especiais: ['pi', 'raiz', 'alfa'],
                    dados: [
                        [{ tipo: 'pequeno', depois: ';' }, { tipo: 'pequeno' }]
                    ],
                    msgErro: '<span id="q_2c_errmsg_1">Use o <a id="seletor_vermelho2" style="float: none; margin: 0;">seletor vermelho</a> para variar  o valor de <em style="color:red;">t</em> até que o ponto vermelho esteja na origem pela primeira vez.</span><span id="q_2c_errmsg_2">Essa é a primeira vez que a curva cruza a origem. Agora, encontre o próximo valor de <em style="color:red;">t</em> para o qual isso acontece novamente.</span>'
                },
                { //D
                    tipo: 'input',
                    corrigir: corrige_q_2_d,
                    enunciado: 'Qual valor de <em>t</em> que faz com que a curva <em>l(t)</em> volte para o ponto l(0)?',
                    caracteres_especiais: ['pi', 'raiz', 'alfa'],
                    dados: [
                        [{ tipo: 'pequeno', depois: ';' }, { tipo: 'pequeno' }]
                    ],
                    msgErro: 'Use o <a id="seletor_vermelho3" style="float: none; margin: 0;">seletor vermelho</a> para variar o valor de <em>t</em> até que o ponto vermelho volte para a posição (1,0).'
                }
            ]
        },
        parte2_q3: //Questão 3
        {
            itens: [{ //A
                    tipo: 'input',
                    corrigir: corrige_q_3_a,
                    enunciado: 'Quando <em>t</em> varia de 0 a 2&#960;, quantas vezes a curva <nobr><em>l(t)</em></nobr> tangencia a lateral esquerda da grade?',
                    msgErro: 'Analise visualmente a curva e veja quantas vezes ela toca a lateral esquerda da grade. Certifique-se de que você marcou a opção "Ver grade auxiliar".'
                },
                { //b
                    tipo: 'input',
                    corrigir: corrige_q_3_b,
                    enunciado: 'Quando <em>t</em> varia de 0 a 2&#960;, quantas vezes a curva <nobr><em>l(t)</em></nobr> tangencia a parte superior da grade?',
                    msgErro: 'Analise visualmente a curva e veja quantas vezes ela toca a parte superior da grade. Certifique-se de que você marcou a opção “Ver grade auxiliar".'
                }
            ]
        }
    },
    { //Parte 3
        parte3_q4: {
            enunciadoGeral: 'Responda as questões abaixo sobre a curva <em>l<sub>2</sub></em>.',
            itens: [{ //A
                    tipo: 'generico',
                    corrigir: corrige_q_4_a,
                    enunciado: 'Quais as coordenadas do ponto <em>l<sub>2</sub>(0)</em> ?',
                    dados: '<div><span class="a_esquerda"><big>(</big></span><div><input id="parte3_q4_a_11" style="width:40px; margin: 0 5px !important;"/></div><span class="a_esquerda antes_depois"><strong>;</strong></span><div><input id="parte3_q4_a_12" style="width:40px; margin: 0 5px !important;"/></div><span class="a_esquerda"><big>)</big></span></div><br class="limpador" />',
                    msgErro: 'Substitua  <em style="color:red;">t=0</em> na expressão que determina a curva.'
                },
                { //B
                    tipo: 'input',
                    corrigir: corrige_q_4_b,
                    enunciado: 'Qual é o menor valor positivo de t para o qual <em>l<sub>2</sub>(t)=(0,0)</em>, ou seja, para o qual a curva corta a origem?',
                    caracteres_especiais: ['pi', 'raiz', 'alfa'],
                    dados: [
                        [{ tipo: 'pequeno', depois: ';' }, { tipo: 'pequeno' }]
                    ],
                    msgErro: 'Use o <a id="seletor_vermelho2" style="float: none; margin: 0;">seletor vermelho</a> para variar o valor de <em style="color:red;">t</em> até encontrar o momento em que o ponto vermelho está na origem pela primeira vez.'
                },
                { //C
                    tipo: 'input',
                    corrigir: corrige_q_4_c,
                    enunciado: 'Qual é o menor valor de t que faz com que a curva <em>l<sub>2</sub>(t)</em> volte para o ponto <em>l(0)</em> ?',
                    caracteres_especiais: ['pi', 'raiz', 'alfa'],
                    dados: [
                        [{ tipo: 'pequeno', depois: ';' }, { tipo: 'pequeno' }]
                    ],
                    msgErro: 'Use o <a id="seletor_vermelho3" style="float: none; margin: 0;">seletor vermelho</a> para variar o valor de <em style="color:red;">t</em> até que o ponto vermelho volte para a posição (1,0).'
                }
            ]
        }
    },
    { //Parte 4
        parte4_q5: {
            itens: [{ //A
                tipo: 'multipla_escolha',
                corrigir: corrige_q_5_a,
                enunciado: 'O que se pode dizer sobre as curvas l(t) e l3(t)?',
                dados: [
                    { value: '1', label: 'Possuem a mesma forma e completam seus ciclos ao mesmo tempo.' },
                    { value: '2', label: 'Possuem a mesma forma, mas l(t) leva mais tempo para completar seu ciclo.' },
                    { value: '3', label: 'Possuem a mesma forma, mas l<sub>3</sub>(t) leva mais tempo para completar seu ciclo.' },
                    { value: '4', label: 'Não possuem a mesma forma.' }
                ],
                msgErro: 'Analise visualmente as duas curvas representadas na ferramenta, ao lado, e analise o comportamento do ponto vermelho ao variar o valor de <em style="color:red">t</em>.'
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