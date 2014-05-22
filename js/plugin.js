var jQuery;
(function( $ ){
	$.fn.walidacjaPol = function (options){
		var ustawienia = $.extend({
			minDlugoscHasla: 5,
			minDlugoscImienia: 3
		}, options);

		var funkcje = {
			init: function (formularz){
				
				var elementyInput = $(formularz).find('input');
				
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
			blad: function (pole){
				if($(pole).hasClass('walidacjaPoprawna')) {
					$(pole).removeClass('walidacjaPoprawna');
				}
				$(pole).addClass('walidacjaNiepoprawna');
			},
			sukces: function( pole ) {
				if($(pole).hasClass('walidacjaNiepoprawna')) {
							$(pole).removeClass('walidacjaNiepoprawna');
				}
				$(pole).addClass('walidacjaPoprawna');
			}
		};
		return this.each(function() {
			funkcje.init(this);
		});
	};

})( jQuery );