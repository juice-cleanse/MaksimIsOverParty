
	$('#listbutton').on('click', function(){	


			$("#showcontent").empty();
			
			$.getJSON("rooms.json", function (data){
		
				var items = [];			
			
				$.each(data, function( key, val ) {	

					items.push({key: key, value: val});
				});

			$("<ul/>", {"id": "my-new-list"}).appendTo("#showcontent");			
			
			$.each(items[0].value, function (key, val){
			
				$("<li class='ui-btn ui-shadow ui-corner-all col-10 col-md-3' onclick='display" + key + "()' id = '" + key + "'>" + val + "</li>").appendTo("#my-new-list");			
			});

			});	
	});

	$("#searchbutton").on('click', function(){		


			//div wird geleert, Suchleiste erscheint -> nur vorhandene Räume werden akzeptiert

			$("#showcontent").empty();

			$("<label for ='suche'>Raum eingeben:</label><input type = 'search' class='col-7 col-md-6' id = 'suche' placeholder='A2.06, A5.08,...' pattern='A((2\.0[67]{1})|(5\.08)|(6\.(10|(0[89]{1})))){1}'><button class ='btn' type='submit' onclick='searchdisplay()'>Suchen</button>").appendTo("#showcontent");

	});

	function searchdisplay(){

		//Eingabe aus der Suchleiste wird gelesen, je nach Eingabe wird das jeweilige XML Dokument aufgerufen

		var searchcontent = document.querySelector("#suche").value;

		switch (searchcontent){

			case "A2.06": displayRaum1();
			break;

			case "A2.07": displayRaum2();
			break;

			case "A5.08": displayRaum3();
			break; 

			case "A6.08": displayRaum4();
			break;

			case "A6.09": displayRaum5();
			break;

			case "A6.10": displayRaum6();
			break;
		};

	};

	function openQRCamera(node) {

		//QR-Code wird eingelesen und decodiert, bei Error kommt eine Fehlermeldung, sonst wird je nach Raum die jeweilige XML-Datei aufgerufen
  	
	  	var reader = new FileReader();

	  	reader.readAsDataURL(node.files[0]);
	  	
		reader.onload = function() {

		  	qrcode.decode(reader.result);
		    
		    	qrcode.callback = function(res) {

		      		if(res instanceof Error) {

		        		alert("Es konnte kein QR-Code gefunden werden. Bitte versuchen Sie es erneut!");
		        		
		      		} else {        

				        switch (res){

				        	case "EDVA206": displayRaum1();
							break;

							case "EDVA207": displayRaum2();
							break;

							case "EDVA508": displayRaum3();
							break; 

							case "EDVA608": displayRaum4();
							break;

							case "EDVA609": displayRaum5();
							break;

							case "EDVA610": displayRaum6();
							break;

							default:  alert("Ungültiger QR-Code.");
							break;
				        };
		      		};
		    	};
		  	};
		};


	function displayRaum1(){

		/*
			Div wird geleert, eine h3-Überschrift und eine Tabelle werden eingefügt, anschließend wird die XML-Datei geladen
			Datum wird mit new Date initialisiert (hier auf den 16.1.2018 festgelegt, da die XML files nicht aktuell sind)
			Wir wollen zum Vergleichen nur Tag, Monat und Jahr, deshalb wird eine extra Variable verwendet
			Vor Tag und Monat wird jeweils eine 0 gesetzt, mit slice(-2) werden aber immer nur die letzten 2 Ziffern angezeigt -> 01 für Jänner aber nicht 012 für Dezember
			Wenn das "heutige" Datum mit dem eingetragenen Datum aus der XML Datei übereinstimmt, werden die jeweiligen Daten als neue tr eingefügt
		*/

		$("#showcontent").empty();
		$("<h3>Heutige Raumbelegung - A2.06</h3>").appendTo("#showcontent");
		$("<div class='tablescroll'><table class='table table-hover col-12' id='roomtable'><tr><th>Datum</th><th>Von</th><th>Bis</th><th>Lektoren</th><th>Gruppen</th><th>Lehrfach</th></tr></table></div>").appendTo("#showcontent");

		$.get( "edva206.xml", function( data ) {

			var date = new Date(2018,0,16);
			var fulldate = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth()+1)).slice(-2) + '.' + date.getFullYear();

			var $xmlTree = $( data );
			var $daten = $xmlTree.find( "LVDaten" );
		  
			$daten.each(function(){
				//var $person = $(this);
				var $datum = $(this).find("Datum");
				var $von = $(this).find("Von");		
				var $bis = $(this).find("Bis");		
				var $lektoren = $(this).find("Lektoren");		
				var $gruppen = $(this).find("Gruppen");
				var $lehrfach = $(this).find("Lehrfach");

				if (fulldate == $datum.text()){		

					$("<tr><td>" + $datum.text() + "</td><td>" + $von.text() + "</td><td>" + $bis.text() + "</td><td>" + $lektoren.text() + "</td><td>" + $gruppen.text() + "</td><td>" + $lehrfach.text() + "</td></tr>").appendTo("#roomtable");
				};
			});	
		});

	};

	function displayRaum2(){

		$("#showcontent").empty();
		$("<h3>Heutige Raumbelegung - A2.07</h3>").appendTo("#showcontent");
		$("<div class='tablescroll'><table class='table table-hover col-12' id='roomtable'><tr><th>Datum</th><th>Von</th><th>Bis</th><th>Lektoren</th><th>Gruppen</th><th>Lehrfach</th></tr></table></div>").appendTo("#showcontent");

		$.get( "edva207.xml", function( data ) {

			var date = new Date(2018,0,16);
			var fulldate = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth()+1)).slice(-2) + '.' + date.getFullYear();

			var $xmlTree = $( data );
			var $daten = $xmlTree.find( "LVDaten" );
		  
			$daten.each(function(){
				//var $person = $(this);
				var $datum = $(this).find("Datum");
				var $von = $(this).find("Von");		
				var $bis = $(this).find("Bis");		
				var $lektoren = $(this).find("Lektoren");		
				var $gruppen = $(this).find("Gruppen");
				var $lehrfach = $(this).find("Lehrfach");

				if (fulldate == $datum.text()){		

					$("<tr><td>" + $datum.text() + "</td><td>" + $von.text() + "</td><td>" + $bis.text() + "</td><td>" + $lektoren.text() + "</td><td>" + $gruppen.text() + "</td><td>" + $lehrfach.text() + "</td></tr>").appendTo("#roomtable");
				};
			});	
		});

	};

	function displayRaum3(){

		$("#showcontent").empty();
		$("<h3>Heutige Raumbelegung - A5.08</h3>").appendTo("#showcontent");
		$("<div class='tablescroll'><table class='table table-hover col-12' id='roomtable'><tr><th>Datum</th><th>Von</th><th>Bis</th><th>Lektoren</th><th>Gruppen</th><th>Lehrfach</th></tr></table></div>").appendTo("#showcontent");

		$.get( "edva508.xml", function( data ) {

			var date = new Date(2018,0,16);
			var fulldate = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth()+1)).slice(-2) + '.' + date.getFullYear();

			var $xmlTree = $( data );
			var $daten = $xmlTree.find( "LVDaten" );
		  
			$daten.each(function(){
				//var $person = $(this);
				var $datum = $(this).find("Datum");
				var $von = $(this).find("Von");		
				var $bis = $(this).find("Bis");		
				var $lektoren = $(this).find("Lektoren");		
				var $gruppen = $(this).find("Gruppen");
				var $lehrfach = $(this).find("Lehrfach");

				if (fulldate == $datum.text()){		

					$("<tr><td>" + $datum.text() + "</td><td>" + $von.text() + "</td><td>" + $bis.text() + "</td><td>" + $lektoren.text() + "</td><td>" + $gruppen.text() + "</td><td>" + $lehrfach.text() + "</td></tr>").appendTo("#roomtable");
				};
			});	
		});

	};

	function displayRaum4(){

		$("#showcontent").empty();
		$("<h3>Heutige Raumbelegung - A6.08</h3>").appendTo("#showcontent");
		$("<div class='tablescroll'><table class='table table-hover col-12' id='roomtable'><tr><th>Datum</th><th>Von</th><th>Bis</th><th>Lektoren</th><th>Gruppen</th><th>Lehrfach</th></tr></table></div>").appendTo("#showcontent");

		$.get( "edva608.xml", function( data ) {

			var date = new Date(2018,0,16);
			var fulldate = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth()+1)).slice(-2) + '.' + date.getFullYear();

			var $xmlTree = $( data );
			var $daten = $xmlTree.find( "LVDaten" );
		  
			$daten.each(function(){
				//var $person = $(this);
				var $datum = $(this).find("Datum");
				var $von = $(this).find("Von");		
				var $bis = $(this).find("Bis");		
				var $lektoren = $(this).find("Lektoren");		
				var $gruppen = $(this).find("Gruppen");
				var $lehrfach = $(this).find("Lehrfach");

				if (fulldate == $datum.text()){		

					$("<tr><td>" + $datum.text() + "</td><td>" + $von.text() + "</td><td>" + $bis.text() + "</td><td>" + $lektoren.text() + "</td><td>" + $gruppen.text() + "</td><td>" + $lehrfach.text() + "</td></tr>").appendTo("#roomtable");
				};
			});	
		});

	};

	function displayRaum5(){

		$("#showcontent").empty();
		$("<h3>Heutige Raumbelegung - A6.09</h3>").appendTo("#showcontent");
		$("<div class='tablescroll'><table class='table table-hover col-12' id='roomtable'><tr><th>Datum</th><th>Von</th><th>Bis</th><th>Lektoren</th><th>Gruppen</th><th>Lehrfach</th></tr></table></div>").appendTo("#showcontent");

		$.get( "edva609.xml", function( data ) {

			var date = new Date(2018,0,16);
			var fulldate = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth()+1)).slice(-2) + '.' + date.getFullYear();

			var $xmlTree = $( data );
			var $daten = $xmlTree.find( "LVDaten" );
		  
			$daten.each(function(){
				//var $person = $(this);
				var $datum = $(this).find("Datum");
				var $von = $(this).find("Von");		
				var $bis = $(this).find("Bis");		
				var $lektoren = $(this).find("Lektoren");		
				var $gruppen = $(this).find("Gruppen");
				var $lehrfach = $(this).find("Lehrfach");

				if (fulldate == $datum.text()){		

					$("<tr><td>" + $datum.text() + "</td><td>" + $von.text() + "</td><td>" + $bis.text() + "</td><td>" + $lektoren.text() + "</td><td>" + $gruppen.text() + "</td><td>" + $lehrfach.text() + "</td></tr>").appendTo("#roomtable");
				};
			});	
		});

	};

	function displayRaum6(){

		$("#showcontent").empty();
		$("<h3>Heutige Raumbelegung - A6.10</h3>").appendTo("#showcontent");
		$("<div class='tablescroll'><table class='table table-hover col-12' id='roomtable'><tr><th>Datum</th><th>Von</th><th>Bis</th><th>Lektoren</th><th>Gruppen</th><th>Lehrfach</th></tr></table></div>").appendTo("#showcontent");

		$.get( "edva610.xml", function( data ) {

			var date = new Date(2018,0,16);
			var fulldate = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth()+1)).slice(-2) + '.' + date.getFullYear();

			var $xmlTree = $( data );
			var $daten = $xmlTree.find( "LVDaten" );
		  
			$daten.each(function(){
				//var $person = $(this);
				var $datum = $(this).find("Datum");
				var $von = $(this).find("Von");		
				var $bis = $(this).find("Bis");		
				var $lektoren = $(this).find("Lektoren");		
				var $gruppen = $(this).find("Gruppen");
				var $lehrfach = $(this).find("Lehrfach");

				if (fulldate == $datum.text()){		

					$("<tr><td>" + $datum.text() + "</td><td>" + $von.text() + "</td><td>" + $bis.text() + "</td><td>" + $lektoren.text() + "</td><td>" + $gruppen.text() + "</td><td>" + $lehrfach.text() + "</td></tr>").appendTo("#roomtable");
				};
			});	
		});

	};


