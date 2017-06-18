window.onload=function() {
	//creare canvas
	var canvas=document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var w = 960;
	var h = 1350;	
	//dimensiune patrat sarpe
	var sw = 30;
	var d;
	var soricel;
	var score;
	
	
	var sarpe_array; //sirul din ce va fi compus sarpele
	
	function init()
	{
		d = "right"; //directia de plecare
		creare_sarpe();
		creare_soricel(); //prada
		score = 0;//initializare scor 0;
		
		//game_loop-ul care va initializa functia paint la un interval de 200 ms
		//cu cat este mai mare cu atat sarpele se misca mai greu
		
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 200);
	}
	init();
	
	function creare_sarpe()
	{
		var length = 5; //Length of the sarpe
		sarpe_array = [];
		for(var i = length-1; i>=0; i--)
		{
			
			sarpe_array.push({x: i, y:0});// crearea sarpelui pornind dintr-o pozitie orizontala
		}
	}
	
	
	function creare_soricel()
	{
		soricel = {
			x: Math.round(Math.random()*(w-sw)/sw), 
			y: Math.round(Math.random()*(h-sw)/sw), 
		};

	}
	
	
	function paint()
	{
		
		//pentru evitarea unui sarpe continuu, acesta trebuie citit pe fiecare frame
		//culori canvas
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		//inceput miscare sarpe
		//de fiecare data cand un soarece este mancat "capul" se duce in spate cu o pozitie
		var bx = sarpe_array[0].x;
		var by = sarpe_array[0].y;
		//miscarea cozi sarpelui
		
		if(d == "right") bx++;
		else if(d == "left") bx--;
		else if(d == "up") by--;
		else if(d == "down") by++;
		
		//resetarea jocului daca sarpele se mananca sau se loveste de zid
		if(bx == -1 || bx == w/sw || by == -1 || by == h/sw || check_collision(bx, by, sarpe_array))
		{
			//resetare joc
			init();
			return;
		}
		
		//daca sarpele mananca soarecele, atunci sarpele primese un nou "cap"
		if(bx == soricel.x && by == soricel.y)
		{
			
			
			navigator.vibrate(500);
			
			var tail = {x: bx, y: by};
			score++;
			//recreare soricel
			creare_soricel();
		}
		else
		{
			var tail = sarpe_array.pop(); //coada este impinsa cu o valoare in spate
			tail.x = bx; tail.y = by;
		}
		
		
		sarpe_array.unshift(tail); 
		
		for(var i = 0; i < sarpe_array.length; i++)
		{
			var c = sarpe_array[i];
			//deseneaza celula random
			paint_cell(c.x, c.y);
		}
		
		//deseneaza soricelul
		paint_cell(soricel.x, soricel.y);
		//deseneaza scorul
		var score_text = "Score: " + score;
		ctx.font='50px Arial';
		ctx.fillText(score_text, 5, h-5);
		
	}
	
	function paint_cell(x, y)
	{
		ctx.fillStyle = "blue";
		ctx.fillRect(x*sw, y*sw, sw, sw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*sw, y*sw, sw, sw);
	}
	
	function check_collision(x, y, array)
	{
		//functia de verificare a coliziunii
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
	//controale din butoane
	document.addEventListener("keydown",keyPush);
	function keyPush(e){
		var key = e.which;
		//clausa pentru ca sarpele sa nu mearga in directia opusa deplasari
		if(key == "37" && d != "right") d = "left";
		else if(key == "38" && d != "down") d = "up";
		else if(key == "39" && d != "left") d = "right";
		else if(key == "40" && d != "up") d = "down";
	}
	var beta;
var gamma;
var alpha;
	window.addEventListener("deviceorientation", on_device_orientation);	
function on_device_orientation(evt){
	 alpha=Math.round(evt.alpha);
	 beta=Math.round(evt.beta);
	 gamma=Math.round(evt.gamma);
	 document.getElementById("beta").innerHTML = "Beta = "+beta;
document.getElementById("gamma").innerHTML = "Gama = "+gamma;
	
	 if(beta>0 && d!="up")
	 {
	 d="down";}
	 if(beta<0 && d!="down")
	 {
	 d="up";
	 }
	 if(beta>0&&gamma>10 && d!="left")
	 {
	 
	 d="right";
	 }
	 if(beta>0&&gamma<-10 && d!="right")
	 {
	 d="left";
	 
	 }
	 }
	
	
	
	
	
	
}