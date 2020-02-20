function validaExpressao(valor)
{
	valor = String(valor).replace(/\,/g,".");
	valor = valor.replace(/[0-9\+\-\*\/\(\)π\.]/gi,"");
	valor = valor.replace(/pi/gi,"");
	valor = valor.replace(/√/gi,"");
	valor = valor.replace(/\^/gi,"");
	valor = valor.replace(/[²³]/gi,"");
	valor = valor.replace(/\s/gi,"");
	if (valor.length==0) return true;
	else return false;
}


function contaParenteses(valor)
{

	valor = String(valor);
	var novovalor1 = valor.replace(/\)/g,"");
	var novovalor2 = valor.replace(/\(/g,"");
	
	return (novovalor1.length == novovalor2.length);

}

function processaExpressaoParenteses(valor)
{

	if ((valor!='') && (validaExpressao(valor)) && contaParenteses(valor))
	{
		var count = 0;
		var countMax = 0;
		valor = String(valor);
		valor = valor.replace(/\s/gi,"");

		for (var i=0;i<valor.length;i++) 
		{
			if (valor.charAt(i)=="(") 
				{
				count++;
				countMax=Math.max(countMax,count);
				valor = valor.replace(/\(/,"{"+String(count)+"}");
				}
			if (valor.charAt(i)==")") 
				{
				valor = valor.replace(/\)/,"{"+String(count)+"}");
				count--;
				}
		}
		
		

		var debug = 100;
		var conteudo = "";
		var elements = Array(); 
		while ((valor.indexOf('{')>-1) && (debug>0))
		{
			valor = valor.replace("{"+countMax+"}","{X}");
			valor = valor.replace("{"+countMax+"}","{X}");
			var re = /\{X\}(.*)\{X\}/;
			elements.push(re.exec(valor)[1]);
			valor = valor.replace(re,"["+Number(elements.size()-1)+"]");
			if (valor.indexOf("{"+countMax+"}")==-1) countMax--;
			debug--;	
		}
		elements.push(valor);

		
		for (var i=0;i<elements.size();i++) 
		{
			var re = /\[(.{0,2})\]/;
			
			debug = 100;
			while (re.test(elements[i]) && (debug>0))
			{
				elements[i]=elements[i].replace(re,'('+elements[re.exec(elements[i])[1]]+')');
				debug--;
			}

			elements[i]=processaExpressao(elements[i]);
			
		}
		
		return elements.last();
	
	} else return NaN;
	

}

function processaExpressao(valor)
{
	
	if ((valor!='') && (validaExpressao(valor)))
	{

		valor = valor.replace(/\,/g,".");
		valor = String(valor).replace(/pi/gi,'π');
		valor = colocaOperacoesPI(valor);
		valor = processaRaiz(valor);
		valor = processaPow(valor);
		valor = valor.replace(/π/gi,'Math.PI');
		valor = valor.replace(/\-\-/gi,'- -');
		
		
		try
		{
			eval('var resp='+valor);
		}
		catch (err) {var resp = NaN};
		return resp;
	}
	else return NaN;
}

function colocaOperacoesPI(valor)
{
	valor = String(valor).replace(/([0-9\)π\.])π/g,'$1*π');
	valor = String(valor).replace(/π([0-9\(π\.])/g,'π*$1');
	return valor;
}

function processaRaiz(valor)
{

	valor = String(valor).replace(/√([π,0-9\.\(\)²³]{0,})/g,'Math.sqrt($1)');
	return valor;
}

function processaPow(valor)
{	
	
	valor = String(valor).replace(/²/g,'^2');
	valor = String(valor).replace(/³/g,'^3');

	
	var re1 = /[\√\^\+\-\*\/]{1,}\^/;
	var re2 = /\^[\√\^\+\-\*\/]{1,}/;
	
	
	if ((re1.test(valor)) || (re2.test(valor))) {
		return 'Math.pow()';
	} 
	else
	{
		
		// (1) ^ (2)
		valor = String(valor).replace(/\(([\^π0-9\.\-]{1,})\)\^\(([\^π0-9\.\-]{1,})\)/g,'Math.pow($1,$2)');
		
		// 1 ^ (2)
		valor = String(valor).replace(/([√π,0-9\.]{1,})\^\(([π,0-9\.\-]{1,})\)/g,'Math.pow($1,$2)');
		
		// (1) ^ 2
		valor = String(valor).replace(/\(([\^√π,0-9\.\-]{1,})\)\^([π,0-9\.]{1,})/g,'Math.pow($1,$2)');
		
		// 1 ^ 2
		valor = String(valor).replace(/([√π,0-9\.]{1,})\^([π,0-9\.]{1,})/g,'Math.pow($1,$2)');
		
		
		return valor;
	}
}



function roundNumber(num, dec) {
	var result = Math.round( Math.round( num * Math.pow( 10, dec + 1 ) ) / Math.pow( 10, 1 ) ) / Math.pow(10,dec);
	return result;
}


