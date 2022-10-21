function fonte(e) {
	var elemento = $(".acessibilidade");
	if (e == 'b')
	{
		 var fonte = localStorage.getItem('fonte');
		//var fonte = 100;
		console.log(fonte);
		//fonte('a');
	}else{
		
		var fonte = parseInt(elemento.css('font-size'));

		var body = $("body");
		const fonteNormal = parseInt(body.css('font-size'));

		
		if (e == 'a') {
			fonte++;
		}
		if (e == 'd'){
			fonte--;
		}
		if (e == 'n'){
			fonte = fonteNormal;
		}

	}

	console.log(fonte);
	elemento.css("fontSize", fonte);
	localStorage.setItem('fonte', fonte)
	
	
}