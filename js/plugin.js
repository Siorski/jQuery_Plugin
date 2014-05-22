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
				// sprawdzanie długości hasla
				if (haslo.length < ustawienia.minDlugoscHasla){
					funkcje.blad(pole);
				} 
				else{	
					funkcje.sukces(pole);
				}
			},
			blokadaGuzika: function(){
				var elementyInput = $(formularzGlobal).find('input');
				var formularzWypelnionyPrawidlowo = 1;
				for (var i = 0; i < elementyInput.length; i++ ){
					if ($(elementyInput[i]).hasClass('walidacjaNiepoprawna') || elementyInput[i].value === '' ) { 
						formularzWypelnionyPrawidlowo = 0;
					}
				}
				
				if( formularzWypelnionyPrawidlowo === 0) {
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