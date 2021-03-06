

function ggbOnInit(){ggb = true;}
var ggb = false;

document.observe('dom:safeLoaded', function(ev)
{
	if($('SalvaLocal').Pega(nomeSoft, 'atividade_4') != '3')
		$('SalvaLocal').Salva(nomeSoft, 'atividade_4', '2');

	BlocoNotas = new Bloco();
	switch(PosicaoAtual.Parte)
	{
		case 1:
			parte_2.iniciaSeguro();
		break;

		case 2:
			$('SalvaLocal').Salva(nomeSoft, 'atividade_4', '3');
		break;
	}
});

document.observe('dom:afterPermiteContinuar', function(ev)
{
	if(PosicaoAtual.Parte == 1)
		permiteContinuar(true);
});

var parte_2 = new (Class.create({
	pontos: ['1.01', '22.68','49','67','98.7'],
	initialize: function()
	{
		this.ponto_destacado = '';
		this.loaded = false;
		//document.observe('flash:videoLoaded', this.onLoad.bind(this));
		//document.observe('flash:cuePoint', this.cuePoint.bind(this));
		//document.observe('flash:videoStoped', this.parou.bind(this));
		//document.observe('flash:videoPaused', this.pausou.bind(this));
		//document.observe('flash:videoPlay', this.tocou.bind(this));
		//document.observe('flash:videoChange', this.alterou.bind(this));


	},
	onLoad: function(ev)
	{
		if (this.loaded)
			return;
		//this.video = $('Video');
		//this.video.adicionaPontos(parte_2.pontos);
		this.loaded = true;

		//this.destaca(0);
	},
	iniciaSeguro: function()
	{
		//$('reproduzir').observe('click', $('video').play());
		//$('pausar').observe('click', $('video').pause());
		$R('l1', 'l5').each(function(link){
			$(link).observe('click', this.vaiPra.bindAsEventListener(this, link[1]));
		}.bind(this));
		this.montaCSS();
		this.destaca(0);

		// Eventos video HTML5
		$('video').ontimeupdate = function() {parte_2.alterou(this);};

		$('video').onplay = function(){ parte_2.tocou(this) };
		$('video').onpause = function(){ parte_2.pausou(this) };
		$('video').onended = function(){ parte_2.parou(this) };





	},
	montaCSS: function()
	{
		var pts = this.pontos.length;
		$R('p0', 'p'+pts).each(function(n)
		{
			if(p = $(n))
				p.setStyle({marginTop: '5px',padding: '10px', border: '1px solid transparent'});
		});
	},
	limpaDestaques: function()
	{
		var pts = this.pontos.length;
		$R('p0', 'p'+pts).each(function(n)
		{
			if(p = $(n))
				p.setStyle({backgroundColor: 'transparent', borderColor: 'transparent'});
		});
	},
	vaiPra: function(ev, n)
	{
		$("video").currentTime = this.pontos[n-1];
		$("video").pause();
	},
	destaca: function(n)
	{
		n = Number(n);
		var p = $('p' + n);
		if(p && this.ponto_destacado !== n)
		{
			this.limpaDestaques();
			this.ponto_destacado = n;
			p.setStyle({backgroundColor: '#FFFF30', borderColor: 'black'});
			if (p.viewportOffset().top+p.getHeight()+60 > document.viewport.getHeight())
				Effect.ScrollTo(p, {duration: 0.4, offset: -(document.viewport.getHeight()-p.getHeight()-60)});
			if (p.viewportOffset().top-40 < 0)
				Effect.ScrollTo(p, {duration: 0.4, offset: -40});
		}
	},
	cuePoint: function(ev)
	{
		//this.onLoad(ev);
		//var ponto = Number(ev.memo);
		var ponto = Number($('video').currentTime);
		if (this.ponto_destacado != ponto+1)
			this.pause();
		this.destaca(ponto+1);
	},
	pause: function(){this.video.paraVideo();},
	stop: function(){this.video.paraVideo(true);},
	play: function()
	{
		permiteContinuar(true);
		this.video.rodaVideo();
		$('reproduzir').trava();
		$('pausar').destrava();
	},
	alterou: function(ev)
	{
		var novo_tempo = $('video').currentTime;

		var i = this.pontos.length-1;

		while (i && novo_tempo < this.pontos[i]) i--;
		this.destaca(i+1);
	},
	parou: function(ev){this.onLoad(ev); this.destaca(0); this.pausou(ev);},
	pausou: function(ev){this.onLoad(ev); $('reproduzir').destrava(); $('pausar').trava();},
	tocou: function(ev){this.onLoad(ev); $('reproduzir').trava(); $('pausar').destrava();}
}))();
