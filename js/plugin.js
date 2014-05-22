var jQuery;
(function( $ ){
	$.fn.walidacjaPol = function (options){
		var ustawienia = $.extend({
			minDlugoscHasla: 5,
			minDlugoscImienia: 3
		}, options);

		var formularzGlobal;
		var funkcje = {
			init: function (formularz){
				
				var elementyInput = $(formularz).find('input');
				formularzGlobal = formularz;
				
				$($(formularz).find('[id="wyslijBTN"]')).attr('disabled', true);
				
				$(elementyInput).keyup(function(){
					var nazwaPola = $(this).attr('name');	
					switch(nazwaPola){
						case 'imie':
							funkcje.walidacjaImie(this);
							break;
						case 'email':
							funkcje.walidacjaEmail(this);
							break;
						case 'haslo':
							funkcje.walidacjaHasla(this);
							break;
					}
				});
			},
			walidacjaImie: function (pole){
				//pobieramy zawartość pola
				var imie = $(pole).val();
				//sprawdzamy czy imie pasuje do wzorca oraz czy jest odpowiednio długie
				if ( ustawienia.wzorzecImie.test(imie) && (imie).length >= ustawienia.minDlugoscImienia){
					funkcje.sukces(pole);
				}
				else{
					funkcje.blad(pole);
				}
			},
			walidacjaEmail: function (pole){
				var wzorzecEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2}/;
				var email = $(pole).val(); 
				if (wzorzecEmail.test(email)){
					funkcje.sukces(pole);
				}
				else{
					funkcje.blad(pole);
				}
			},
			walidacjaHasla: function (pole){
				var haslo = $(pole).val();						
				var wielkieLitery = /[A-Z]/g; // wyszukiwanie wielkich liter w haśle
				var maleLitery = /[a-z]/g;		// wyszukiwanie małych liter w haśle
				var cyfry = /[0-9]/g;					// wyszukiwanie cyfr w haśle
				var znakiSpecjalne = /[!,@,#,$,%,^,&,*,?,_,~]/g; //wyszukiwanie znaków specjalnych w haśle
				var silaHasla = 0;
				
				var zliczWystapienia = function (string){
					var liczbaZnakow = haslo.match(string);
					if (liczbaZnakow === null){
						liczbaZnakow = 0;
					}
					else{
						liczbaZnakow = haslo.match(string).length;
					}
					return liczbaZnakow;
				};

				var wielkieLiteryIlosc = zliczWystapienia(wielkieLitery);
				var maleLiteryIlosc = zliczWystapienia(maleLitery);
				var cyfryIlosc = zliczWystapienia(cyfry);
				var znakiSpecjalneIlosc = zliczWystapienia(znakiSpecjalne);

				// sprawdzanie długości hasla
				if (haslo.length < ustawienia.minDlugoscHasla){
					funkcje.blad(pole);
				} 
				else{	
					funkcje.sukces(pole);
				}
				// litery w haśle
				if (wielkieLiteryIlosc === 0 && maleLiteryIlosc !== 0){ 
					silaHasla = silaHasla + 3; 
				}
				if (wielkieLiteryIlosc !== 0 && maleLiteryIlosc ===0){
					silaHasla = silaHasla + 5;
				}
				if (wielkieLiteryIlosc !== 0 && maleLiteryIlosc !== 0){ 
					silaHasla = silaHasla + 10; 
				}
				// cyfry w haśle
				if (cyfryIlosc === 1){
					silaHasla = silaHasla + 3;
				}
				if (cyfryIlosc === 2){
					silaHasla = silaHasla + 5;
				}
				if (cyfryIlosc > 2){
					silaHasla = silaHasla + 10;
				}
				//znaki specjalne w haśle
				if (znakiSpecjalneIlosc === 1){
					silaHasla = silaHasla + 3;
				}   
				if (znakiSpecjalneIlosc === 2){
					silaHasla = silaHasla + 5;
				}
				if (znakiSpecjalneIlosc > 2){
					silaHasla = silaHasla + 10;
				}
				// długość hasła
				if (haslo.length < 6){
					silaHasla = silaHasla + 1;
				}
				if ((haslo.length > 6) && (haslo.length <= 8) ){
					silaHasla = silaHasla + 2;
				}
				if (haslo.length > 8){
					silaHasla = silaHasla + 3;
				}
				if (haslo.length > 15){
					silaHasla = silaHasla + 10;
				}
				var silaHaslaText = "";
				if (silaHasla >= 20){
					silaHaslaText = "Hasło silne";
				}
				else if (silaHasla >= 10){
					silaHaslaText = "Hasło średnie";
				}
				else{
					silaHaslaText = "Hasło słabe";
				}
				$("#silaHasla").remove();
				$(pole).parent().append("<p id='silaHasla'>" + silaHaslaText + "</p>");
			},
			blokadaGuzika: function(){
				var elementyInput = $(formularzGlobal).find('input');
				var formularzWypelnionyPrawidlowo = 1;
				for (var i = 0; i < elementyInput.length; i++ ){
					if ($(elementyInput[i]).hasClass('walidacjaNiepoprawna') || elementyInput[i].value === '' ) { 
						formularzWypelnionyPrawidlowo = 0;
					}
				}
				if (formularzWypelnionyPrawidlowo === 0) {
					$($(formularzGlobal).find('[id="wyslijBTN"]')).attr('disabled', true);
				}
				else {
					$($(formularzGlobal).find('[id="wyslijBTN"]')).attr('disabled', false);
				}
			},
			blad: function (pole){
				if($(pole).hasClass('walidacjaPoprawna')) {
					$(pole).removeClass('walidacjaPoprawna');
				}
				$(pole).addClass('walidacjaNiepoprawna');
				funkcje.blokadaGuzika();
			},
			sukces: function (pole) {
				if($(pole).hasClass('walidacjaNiepoprawna')) {
							$(pole).removeClass('walidacjaNiepoprawna');
				}
				$(pole).addClass('walidacjaPoprawna');
				funkcje.blokadaGuzika();
			}
		};
		return this.each(function() {
			funkcje.init(this);
		});
	};
})( jQuery );