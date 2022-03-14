// need to track whose turn it is 
var current_turn="X";// true is X and false is O
var playable=false, players=1;
var boxes= {
	"square_0_0":false,	"square_0_1":false,	"square_0_2":false,
	"square_1_0":false,	"square_1_1":false,	"square_1_2":false,
	"square_2_0":false,	"square_2_1":false,	"square_2_2":false
};
var turns=0; //to know when last turn is taken
document.addEventListener("DOMContentLoaded", function() {
	playable=true;
	$(".square").on("click",function(){
		//track if all spaces are taken
		var i,j,div,thisid=$(this).attr("id");
		if (boxes[thisid] || !playable) {return;} else {boxes[thisid]=current_turn}

		document.getElementById(thisid).innerHTML=current_turn;
		//set color
		$(this).addClass(current_turn);
		
		
		//test if anyone has won going horizontally
		var match = true;
		for (i=0;i<3;i++) {
			match = true;
			for (j=0;j<3;j++) {
				div="square_"+i+"_"+j;
				if (boxes[div]!=current_turn) {match=false;}
			}
			if (match) {
				won_the_game();
				return;
			}
		}
		//vertical
		for (i=0;i<3;i++) {
			match = true;
			for (j=0;j<3;j++) {
				div="square_"+j+"_"+i;
				if (boxes[div]!=current_turn) {match=false;}
			}
			if (match) {
				won_the_game();
				return;
			}
		}

		//diagonal
		if (current_turn==boxes["square_0_0"] && current_turn==boxes["square_1_1"]&&current_turn==boxes["square_2_2"]) {
			won_the_game();
		} else if (current_turn==boxes["square_2_0"] && current_turn==boxes["square_1_1"]&&current_turn==boxes["square_0_2"]) {
			won_the_game();
		}
		turns++;
		if (turns>=9) {
			playable=false;
			document.getElementById("message").innerHTML="It's a draw";
		} else  {
			current_turn= current_turn=="X" ? "O" : "X";
		}
		
	});

	$("#new-game2").on("click",function(){
		$(".square").html("");
		$(".square").removeClass("X");
		$(".square").removeClass("O")
		boxes= {
			"square_0_0":false,	"square_0_1":false,	"square_0_2":false,
			"square_1_0":false,	"square_1_1":false,	"square_1_2":false,
			"square_2_0":false,	"square_2_1":false,	"square_2_2":false
		};
		current_turn="X";
		document.getElementById("message").innerHTML="";
		playable=true; turns=0;
	});

	function won_the_game() {
		playable=false;
		document.getElementById("message").innerHTML=current_turn+" wins!";
	}
});


