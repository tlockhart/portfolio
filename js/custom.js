	//Put JQuery in script tag or external file
	/*******************************Start hiding PAGES*********************************/
	$(document).ready(function () {
		$("#home_button").addClass("buttons");
		$("#projects_button").addClass("buttons");
		$("#resume_button").addClass("buttons");
		$("#teaching_button").addClass("buttons");

		$("#intro").addClass("pages");
		$("#projects").addClass("pages");
		$("#resume").addClass("pages");
		$("#teaching").addClass("pages");

		$("#intro").show();
		$("#nav_menu #home_button").animate({ color: "#0B305D" }, 'fast');//Then change the one selected to Dark blue
		$("#projects").hide();
		$("#resume").hide();
		$("#teaching").hide();

		//variables
		let projectActive = false;
		let introActive = false;
		let resumeActive = false;
		let teachingActive = false;

		/*HelperFunctions*/
		/*******************************************************/
		function fadeall() {
			$("#intro").hide();
			$("#projects").hide();
			$("#resume").hide();
			$("#teaching").hide();
		}
		function changeNavWhite() {
			$('#nav_menu h1').css('color', 'white');//Change everything to white
		}
		function setPagesToInactive(){
			projectActive = false;
			introActive = false;
			resumeActive = false;
			teachingActive = false;
		}
		function setPageToActive(){
			return true;
		}
		/*********************************************************/
		
		//INTRO BUTTON
		//////////////
		$("#home_button").click(function () {
			//Solution2 of 2
			if (($("#home_button").css('color') == "rgb(255, 255, 255)") ||($("#home_button").css('color') == "rgb(115, 197, 255)")){//white or ltBlue
				/****Start NEW*****/
				changeNavWhite();//change nav to white
				/****END NEW*****/
				//$('#nav_menu h1').css('color', 'white');//Change everything to white
				$(this).animate({ color: "#0B305D" }, 'fast');//Then change the one selected to Dark blue
				setPagesToInactive();
				introActive = setPageToActive();
				/****Start NEW*****/
				fadeall();//hide all pages
				$("#intro").fadeIn();//display intro page
				/****End NEW*****/
				/*if ($("#home_button").css('color') == "rgb(255, 255, 255)") {//white
					$(this).animate({ color: "rgb(11,48,93)" }, 'fast');//Then change the one selected to Dark blue
				}//inner if*/
			}//outer if
		});
		//Project Button
		////////////////
		$("#projects_button").click(function () {
			/*if ($("#projects_button").css('color')=="rgb(115, 197, 255)") {//=lt Blue
			  $('#nav_menu h1').css('color','white');//Change everything to white
			  fadeall();*/
			if (($("#projects_button").css('color') == "rgb(255, 255, 255)") || ($("#projects_button").css('color') == "rgb(115, 197, 255)")) {//white or ltblue
				/****Start NEW*****/
				changeNavWhite();//change nav to white
				/****END NEW*****/
				$(this).animate({ color: "#0B305D" }, 'fast');//Then change the one selected to Dark blue
				setPagesToInactive();
				//projectActive = true;
				projectActive = setPageToActive();
				/****Start NEW*****/
				fadeall();//hide all pages
				$("#projects").fadeIn();//display projects
				//$("#projects").show();
				/****End NEW*****/
			}//if
			/*First if } */
		});
		//Resume Button
		///////////////
		$("#resume_button").click(function () {
			/*if ($("#resume_button").css('color')=="rgb(115, 197, 255)") {//=lt Blue
			  $('#nav_menu h1').css('color','white');//Change everything to white
			  fadeall();
			  $("#resume").fadeIn();*/
			if (($("#resume_button").css('color') == "rgb(255, 255, 255)") || ($("#resume_button").css('color') == "rgb(115, 197, 255)")) {//white or ltblue
				changeNavWhite();//change nav text to white
				$(this).animate({ color: "#0B305D" }, 'fast');//Then change the one selected to Dark blue
				setPagesToInactive();
				resumeActive = setPageToActive();
				/****Start NEW*****/
				fadeall();//hide all content
				$("#resume").fadeIn();//display intro page
				//$("#resume").show();//Show resume content
				/****End NEW*****/
			}//if
			/*}*/
		});
		//Teaching Button
		/////////////////
		$("#teaching_button").click(function() {
		if (($("#teaching_button").css('color') == "rgb(255, 255, 255)") || ($("#teaching_button").css('color')=="rgb(115, 197, 255)")) {//white or ltBlue
			changeNavWhite();//change nav text to white
			$(this).animate({ color: "#0B305D" }, 'fast');//Then change the one selected to Dark blue
			setPagesToInactive();
			teachingActive = setPageToActive();
			/*$('#nav_menu h1').css('color','white');//Change everything to white*/
		  /****Start NEW*****/
		  fadeall();
		  $("#teaching").fadeIn();
		  /****End NEW*****/
		  /*if ($("#teaching_button").css('color')=="rgb(255, 255, 255)") {//white*/
	 /* }*/
		  }
		});
//HOVER BUTTONS
///////////////

//home
///////
$("#home_button").hover(function () {
	//if ($(this).css('color') != "#0B305D")//!=darkblue
	if(!introActive)
	{
		$(this).animate({ color: "rgb(115, 197, 255)" }, 'fast');//Change to ltBlue
	}
});
$("#home_button").mouseout(function () {
	//if (($(this).css('color') != "#0B305D")|| ($(this).css('color') != "rgb(11, 48, 93"))//!=darkblue
	if(!introActive){
		$(this).animate({ color: "rgb(255, 255, 255)" }, 'fast');//change to white
		//console.log($(this).css('color'));
	}
});
//Projects
//////////
		$("#projects_button").hover(function () {
			//if ($(this).css('color') != "#0B305D")//!=darkblue
			if(!projectActive)
			{
				$(this).animate({ color: "rgb(115, 197, 255)" }, 'fast');//Change to ltBlue
			}
		});
		$("#projects_button").mouseout(function () {
			//if (($(this).css('color') != "#0B305D")|| ($(this).css('color') != "rgb(11, 48, 93"))//!=darkblue
			if(!projectActive){
				$(this).animate({ color: "rgb(255, 255, 255)" }, 'fast');//change to white
				//console.log($(this).css('color'));
			}
		});
		//RESUME
		////////
		$("#resume_button").hover(function () {
			//if ($(this).css('color') != "#0B305D")//!=darkblue
			if(!resumeActive)
			{
				$(this).animate({ color: "rgb(115, 197, 255)" }, 'fast');//Change to ltBlue
			}
		});
		$("#resume_button").mouseout(function () {
			//if (($(this).css('color') != "#0B305D")|| ($(this).css('color') != "rgb(11, 48, 93"))//!=darkblue
			if(!resumeActive){
				$(this).animate({ color: "rgb(255, 255, 255)" }, 'fast');//change to white
				//console.log($(this).css('color'));
			}
		});
		//TEACHING
		////////
		$("#teaching_button").hover(function () {
			//if ($(this).css('color') != "#0B305D")//!=darkblue
			if(!teachingActive)
			{
				$(this).animate({ color: "rgb(115, 197, 255)" }, 'fast');//Change to ltBlue
			}
		});
		$("#teaching_button").mouseout(function () {
			//if (($(this).css('color') != "#0B305D")|| ($(this).css('color') != "rgb(11, 48, 93"))//!=darkblue
			if(!teachingActive){
				$(this).animate({ color: "rgb(255, 255, 255)" }, 'fast');//change to white
				//console.log($(this).css('color'));
			}
		});		
		/***********************Start Load and Animate Images**************************/
		$("#imgAnimate1").hover(
			function (e) {
				$(this).attr("src", "img/HeadTurn.gif");
			},
			function () {
				$(this).attr("src", "img/HeadTurn.png");
			});
		$("#imgAnimate2").hover(
			function () {
				$(this).attr("src", "img/WalkCycle.gif");
			},
			function () {
				$(this).attr("src", "img/WalkCycle.png");
			});
		$("#imgAnimate3").hover(
			function () {
				$(this).attr("src", "gif/1303642234740.gif");
			},
			function () {
				$(this).attr("src", "STATIC IMAGE URL HERE");
			});
		$("#imgAnimate4").hover(
			function () {
				$(this).attr("src", "gif/1303822879528.gif");
			},
			function () {
				$(this).attr("src", "STATIC IMAGE URL HERE");
			});
		$("#imgAnimate5").hover(
			function () {
				$(this).attr("src", "gif/1303825584512.gif");
			},
			function () {
				$(this).attr("src", "STATIC IMAGE URL HERE");
			});

		/*Shorten Script*/
		/*******************/
		$(".comment").shorten();

		$(".comment-small").shorten({ showChars: 208 });
		$(".comment-medium").shorten({ showChars: 315 });
		$(".comment-long").shorten({ showChars: 357 });
		$(".comment-extralong").shorten({ showChars: 627 });/*504*/
	});/*document ready*/

/*Wait until all contents have been loaded on the page*/
$(window).load(function () {
	/*alert('All Contents Loaded');	*/

});
/*Set focus to iFrame*/
function setFocusIframe() {
	var iframe = $('iframe')[1];
	//document.getElementById('pickContent').contentWindow.focus();
	iframe.contentWindow.focus();
}
/***********************END Load and Animate Images**************************/