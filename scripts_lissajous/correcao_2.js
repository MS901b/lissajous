var MAX_INTERVAL = 80;
var popupInicial, popupInicial2;
var ggb = false;
var salva_local = true;

Event.observe(document, 'dom:safeLoaded', function(ev) {
    BlocoNotas = new Bloco();

    popupInicial = new Popup($('link_valor_inicial'), 'Verifique se você cometeu algum erro ao preencher as informações da curva.', ['seta_baixo', 'direita'], 9);
    popupInicial2 = new Popup($('link_valor_inicial'), 'Escolha um intervalo menor.', ['seta_baixo', 'direita'], 9);
    document.observe('mousedown', popupInicial.fecha.bind(popupInicial));
    document.observe('mousedown', popupInicial2.fecha.bind(popupInicial2));

    salva_local = true;
    if ($('SalvaLocal').Pega(nomeSoft, 'atividade_2') != '3')
        $('SalvaLocal').Salva(nomeSoft, 'atividade_2', '3');

    desenhaInicio();
});

function agendaRefresh() {
    window.setTimeout("document.ggbApplet.refreshViews()", 100);
    window.setTimeout("document.ggbApplet.refreshViews()", 500);
}

function ggbOnInit() {
    ggb = true;
    desenhaInicio();
}


function desenhaInicio() {
    if (ggb && salva_local) {
        set_inicial(true);
    }
}

/**
 * Desenha a função paramétrica de acordo com os dados que estão no SalvaLocal
 * Se nada é encontrado, não faz nada.
 * Essa função espera que a string da função já esteja formatada para mandar pro ggb.
 *
 * @return boolean True se desenhou e false se não
 */
function desenhaCurva() {
    var zoom;
    var prop = 380 / 519;
    var applet = document.ggbApplet;


    var func_x = getResp('func_x');
    var func_y = getResp('func_y');
    var min_t = getResp('min_t');
    var max_t = getResp('max_t');

    if (func_x != '' && func_x != 'undefined' && func_y != '' && func_y != 'undefined') {
        apagaCurva();

        applet.evalCommand('f(x)=' + func_x.replace(/t/gi, 'x'));
        applet.setVisible('f', false);
        applet.evalCommand('g(x)=' + func_y.replace(/t/gi, 'x'));
        applet.setVisible('g', false);

        if (applet.exists('f') && applet.isDefined('f') && applet.exists('g') && applet.isDefined('g')) {
            //Procura pelos máximos e mínimos da função
            applet.evalCommand('lista_x = Sequence[f(a),a,' + min_t + ',' + max_t + ',0.1]');
            applet.evalCommand('lista_y = Sequence[g(a),a,' + min_t + ',' + max_t + ',0.1]');

            applet.evalCommand('num = Max[lista_x]');
            var max_x = applet.getValue('num');
            applet.evalCommand('num = Min[lista_x]');
            var min_x = applet.getValue('num');

            applet.evalCommand('num = Max[lista_y]');
            var max_y = applet.getValue('num');
            applet.evalCommand('num = Min[lista_y]');
            var min_y = applet.getValue('num');

            applet.deleteObject('lista_x');
            applet.deleteObject('lista_y');
            applet.deleteObject('num');

            // Com os valores de máximos e mínimos, acerta os eixos
            valores = [max_x, min_x, max_y / prop, min_y / prop];
            zoom = Math.max(Math.abs(valores.max()), Math.abs(valores.min()));

            // console.log(valores);
            // console.log(zoom);

            applet.evalCommand('a = Curve[' + func_x + ', ' + func_y + ', t, ' + min_t + ',' + max_t + ']');
            applet.evalCommand('A = Point[a]');
            applet.setLabelVisible('A', true);
            applet.setLabelStyle('A', 2);
            applet.setColor('A', 0, 0, 200);
            applet.setCoordSystem(-zoom / prop, zoom / prop, -zoom, zoom);

            applet.setFixed('xtext', false);
            applet.setFixed('ytext', false);

            applet.evalCommand('xtext=Text["x(t) = ' + func_x + '"]');
            applet.evalCommand('ytext=Text["y(t) = ' + func_y + '"]');
            applet.setFixed('xtext', true);
            applet.setFixed('ytext', true);

            agendaRefresh();



            return true;
        }

        if (applet.exists('f'))
            applet.deleteObject('f');
        if (applet.exists('g'))
            applet.deleteObject('g');
    }

    return false;
}

/**
 * Apaga a curva paramétrica desenhada no applet do ggb.
 */
function apagaCurva() {
    var applet = document.ggbApplet;
    if (applet.exists('a'))
        applet.deleteObject('a');
    if (applet.exists('A'))
        applet.deleteObject('A');
    if (applet.exists('f'))
        applet.deleteObject('f');
    if (applet.exists('g'))
        applet.deleteObject('g');

    applet.setFixed('xtext', false);
    applet.setFixed('ytext', false);

    applet.evalCommand('xtext=Text["x(t) = "]');
    applet.evalCommand('ytext=Text["y(t) = "]');
    applet.setFixed('xtext', true);
    applet.setFixed('ytext', true);



}

function set_inicial(dados_antigos) {
    if (dados_antigos == true) {
        // Recebendo a string do SalvaLocal
        var func_x = getResp('func_x');
        var func_y = getResp('func_y');
        var min_t = processaExpressao(getResp('min_t'));
        var max_t = processaExpressao(getResp('max_t'));

        if (func_x == '' || func_x == 'undefined' ||
            func_y == '' || func_y == 'undefined' ||
            isNaN(min_t) || isNaN(max_t))
            return;

        $('input_x').setValue(func_x);
        $('input_y').setValue(func_y);
        $('input_t_min').setValue(min_t);
        $('input_t_max').setValue(max_t);
    } else {
        // Recebendo a string direto do input
        var func_x = $('input_x').getValue();
        var func_y = $('input_y').getValue();
        var min_t = processaExpressao($('input_t_min').getValue());
        var max_t = processaExpressao($('input_t_max').getValue());

        // Limitando o intervalo, para não sobrecarregar o comando curva
        if (Math.abs(min_t - max_t) > MAX_INTERVAL) {
            popupInicial2.abre();
            return;
        }

        // Tratamento da string
        func_x = func_x.replace(/sen/gi, 'sin');
        func_y = func_y.replace(/sen/gi, 'sin');

        // Salvar no SalvaLocal
        setResp('func_x', func_x);
        setResp('func_y', func_y);
        setResp('min_t', String(min_t));
        setResp('max_t', String(max_t));
    }

    var applet = document.ggbApplet;
    applet.setErrorDialogsActive(false);

    if (!isNaN(min_t) && !isNaN(max_t) && desenhaCurva()) {
        permiteContinuar(true);

        $('valor_inicial').addClassName('desabilitada');
        $('link_valor_inicial').hide();
        $('unset_inicial').show();

        $('input_x').trava();
        $('input_y').trava();
        $('input_t_min').trava();
        $('input_t_max').trava();
    } else {
        permiteContinuar(false);

        popupInicial.abre();
        setResp('func_x', '');
        setResp('func_y', '');
        setResp('min_t', '');
        setResp('max_t', '');
    }
}

function unset_inicial() {
    if (this.resultado == 'sim') {
        setResp('func_x', '');
        setResp('func_y', '');
        setResp('min_t', '');
        setResp('max_t', '');

        apagaCurva();
        permiteContinuar(false);

        $('valor_inicial').removeClassName('desabilitada');
        $('link_valor_inicial').show();
        $('unset_inicial').hide();

        $('input_x').destrava();
        $('input_y').destrava();
        $('input_t_min').destrava();
        $('input_t_max').destrava();
    }
}


// função que é chamada sempre que todas as questões de uma determinada parte são acertadas
function tudoCerto() {}