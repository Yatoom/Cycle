function getLevel() {
	var level = -1;
	$.ajax({
		type: "POST",
		url: "util/getlevel.php",
		data: "uid="+sessionStorage['uid'],
		async:false,
		success: function(html){
			level = html;
		}
		
	});
	return level;
}

function goToLevel(level){
	$.ajax({
		type:"POST",
		url: "util/gotonextlevel.php",
		data: "level="+level+"&uid="+sessionStorage['uid'],
		success:function(html){
			if(html == "true"){
				$("#log").hide();
				$( ".game" ).fadeOut( "fast", function() {

				 	 
				 	    $(".game").removeAttr("style").css("display", "none");
				 	    $(".game").load("levels/"+level+".html", function(){
				 	    	$( ".game" ).fadeIn( "fast");	
				 	    });
				 	    
				 	});
				$(document).ready(function(){
					console.log("Document is ready after reloading new level");
					loadInteraction();
				});
			}
		}
	});
}


function addItem(item) {
	$.ajax({
		type: "POST",
		url: "util/additem.php",
		data: "uid="+sessionStorage['uid']+"&item="+item,
		success: function(html){
			loadInteraction();
		}
	});
}

function removeItem(item) {
	var response = "";
	$.ajax({
		type: "POST",
		url: "util/removeitem.php",
		data: "uid="+sessionStorage['uid']+"&item="+item,
		async:false,
		success: function(html){
			response = html;
			loadInteraction();
		}
	});
	return response;
}

function hasItem(item) {
	var items = false;
	$.ajax({
		type: "POST",
		url: "util/hasitem.php",
		data: "uid="+sessionStorage['uid']+"&item="+item,
		async:false,
		success: function(html){
			if(html == 'true'){
				items = true;
			}else{
				items = false;
			}
		}
	});
	return items;
}

function numItems(){
	var items = 0;
	$.ajax({
		type: "POST",
		url: "util/numitems.php",
		async:false,
		success: function(html){
			items = html;
		}
	});
	return items;
}

function getItemName(id){
	var name = "";
	$.ajax({
		type: "POST",
		url: "util/getitem.php",
		data: "id="+id,
		async:false,
		success: function(html){
			name = html;
		}
	});
	return name;
}

function getItemAmount(item){
	var items = 0;
	$.ajax({
		type: "POST",
		url: "util/getitem.php",
		data: "uid="+sessionStorage['uid']+"&item="+item,
		async:false,
		success: function(html){
			items = html;
		}
	});
	return items;
}



function getUid(username){
	var uid = -1;
	$.ajax({
		type:"POST",
		url:"util/getuid.php",
		data: "username="+username,
		async:false,
		success:function(html){
			uid = html;
		}
	});
	return uid;
}

function setConfig(configid, value) {
	$.ajax({
		type: "POST",
		url: "util/setconfig.php",
		data: "uid="+sessionStorage['uid']+"&config="+configid+"&value="+value,
	});
}

function setLevel(level) {
	var html ="";
	$.ajax({
		type: "POST",
		url: "util/setlevel.php",
		data: "uid="+sessionStorage['uid']+"&level="+level,
		async:false,
		success:function(html){
			html = html;
		}
	});
	return html;
}

function getConfig(configid) {
	var val = -1;
	$.ajax({
		type: "POST",
		url: "util/getconfig.php",
		data: "uid="+sessionStorage['uid']+"&cid="+configid,
		async:false,
		success:function(html){
			val = html;
		}
	});
	return val;
}


function insertItem(name){
	if(name == ""){
		return "No name";
		//do nothing
	}
	var respond = "";
	$.ajax({
		type: "POST",
		url: "util/insertitem.php",
		data: "name="+name,
		async:false,
		success: function(html){    
			respond = html;
		}
	});
	return respond;
}

function loadItems(){
	$("#invtable").empty();
	$.ajax({
		type: "POST",
		url: "util/loaditems.php",
		data: "uid="+sessionStorage['uid'],
		async:false,
		success: function(html){    
			$("#invtable").html(html);
		}
	});
}

function isSelected(itemName) {
	return $("#"+itemName).hasClass("selected");
}

function whichSelected() {
	return $(".selected").attr("id");
}

//Checks if any item is selected.
function anyItemSelected(){
	var result = false;
	$(".filleditem").each(function() {
		if ($(this).hasClass("selected")) {
			console.log("An item is selected");
			result = true;
		}
	});
	return result;
}


function loadInteraction(){
	loadItems()
	//Deselect any selected item
	$(document).mouseup(function(e){
        // Left mouse button was released
        if(e.which === 1){
        	var target = $(e.target);
        	if(target.is(".interactable") && anyItemSelected()){
        		
        		var currentItem = whichSelected();

        		if (target.hasClass(Match[currentItem])){
				// Yeah, you picked the rigt item with the right object!
				
				
			} else {
				fail.play();
				deselect();
			}

		}else{
			
			// if you have an item selected and click on something that is not the inventory or an interactable item
			if(anyItemSelected() && !target.is(".filleditem")){
				deselect();	
				fail.play();				
			}
			if(anyItemSelected() && target.is("filleditem")) {
				deselect();		//if you want to select another item, deselect the current one but don't play a sound
			}
		}
	}
});
	
  //Select item from inventory
  $(".filleditem").click(function(){
  	
  	if(anyItemSelected() == true) {
  		deselect();
  	}
  	console.log("clicked!");
  	$(this).toggleClass("selected");
	//play audio
	Select.play();
});
}


function log(text) {

	// Hide
	$("#log").hide();

	// Add text to the log.
	var log = text + "<a class='close' onClick='hideLog()'>×</a>"
	$("#log").html(log);

	// This handles all the CSS.
	$("#log").removeClass("speechballoon").addClass("comment");
	
	// Hide on click.
	$("#log").click(function(){hideLog();});

    // Show.
    $("#log").fadeIn();
}

function speak(name, text) {
	// Hide
	$("#log").hide();

	// Add text to the log.
	var log = "<b>" + name + ": </b>" + text + "<a class='close' onClick='hideLog()'>×</a>"
	$("#log").html(log);

	// This handles all the CSS.
	$("#log").removeClass("comment").addClass("speechballoon");
	
	// Do not hide on click.
	$("#log").unbind("click");

	// Show.
	$("#log").fadeIn();
}

function hideLog() {
	$("#log").fadeOut();
}

function deselect(){
	$(".selected").removeClass("selected");
}

$(document).ready(function(){
	$(".draggable").draggable();

	//sound files
	Select = new Audio("levels/Sounds/interact.ogg");
	fail = new Audio("levels/Sounds/fail.ogg");

	//Loggout
	$("#loggout").click(function(){	
		for(var i = 0; i < sessionStorage.length; i++) {
			var key = sessionStorage.key(i);
			if(key !== 'undefined') {
				sessionStorage.clear();
			}
		}
		window.location = "index.php";
	});


	/*
	DEBUG
	*/
	var borders = false;
	//Go to specified level
	$("#gotolevel").click(function(){	
		level=$("#newlevel").val();
		goToLevel(level);
	});
	//Add item in database
	$("#additem").click(function(){	
		name=$("#itemname").val();
		respond = insertItem(name);
		$("#debug").html(respond);
	});

	//add borders to show clickable area
	$("#addborders").click(function(){	
		if(borders == false){
			borders = true;
			$(".click").css("border","1px dashed black");
			$("#addborders").attr("value","Hide fields");
		}else{
			borders = false;
			$(".click").css("border","none");
			$("#addborders").attr("value","Show fields");
		}
	});
	/*
	END OF DEBUG
	*/


	username=sessionStorage["username"];
	if(username !== 'undefined'){ 
		sessionStorage['uid'] = getUid(username);
		var uid = sessionStorage['uid'];
		var level = getLevel(); 
		if (level !== "-1") {
			$(".game").load("levels/"+level+".html");		
		}
	}else{
		window.location = "index.php";
	}

	loadInteraction();

});

var Item = {
	AEGIS:1,
	PAPER:5,
	KEY:3,
	LIGHTNING:4,
	ANKH:6,
	EMBER:7,
	SCEPTER:8,
	SCROLL:9,
	HAMMER:10,
}

var Match = {
	"Aegis":"aegis-match",
	"Paper":"paper-match",
	"Key":"key-match",
	"Lightning":"lightning-match",
	"Ankh":"ankh-match",
	"Ember":"ember-match",
	"Scepter":"scepter-match",
	"Scroll":"scroll-match",
	"Hammer":"hammer-match",
}

var Config = {
	OASIS:1,
	TEFNUT:2,
	RA:3,
	SPOKENWITHRA:4,
	HELPEDSHIP:5,
	SUMMONEDTHOR:6,
	VILLAGERSHELPED:7,
	TRADEDHAMMERWITHTHOR: 8,
	SPOKENWITHTHOR: 9,
	PYRAMIDDOOR: 10,
	OASISPROGRESS: 11,
	SHIELDPROGRESS: 12,
	METZEUS: 13,
	ENDGAMESTARTED: 14,
	SPOKENWITHISIS: 15,
	ENTEREDPYRAMID: 16,
	CLICKEDATROCK: 17,
}

function reset(){
	for(i in Item){
		if(hasItem(Item[i])){
			removeItem(Item[i]);
		}
	}
	muteAll();


	addItem(Item.PAPER);

	for(i = 0; i < 21; i++){
		setConfig(i, 0);
	}
	goToLevel("intro");
	log("Game has been reset");
}

function addField(){
	$(".game").append("<a class='click newfield' style='left:0%; top:0%; width:10%; height: 10%; border: 1px dashed black;'>")
	$(".newfield").draggable({
		stop: function( event, ui ) {
			convertToPercentages($(this));
			getFieldData($(this));
		}		
	});
	$(".newfield").resizable({
		stop: function(event, uit){
			convertToPercentages($(this));
			getFieldData($(this));
		}
	});
	$(".newfield").click(function(){
		getFieldData($(this));
	});

}

function convertToPercentages(object) {
	var height = Math.round(100 * parseInt(object.css("height"))/parseInt($(".game").css("height")));
	var width = Math.round(100 * parseInt(object.css("width"))/parseInt($(".game").css("width")));
	object.css("height", height+ "%");
	object.css("width", width + "%");
	var top = Math.round(100 * parseInt(object.css("top"))/parseInt($(".game").css("height")));
	var left = Math.round(100 * parseInt(object.css("left"))/parseInt($(".game").css("width")));
	object.css("top", top + "%");
	object.css("left", left + "%");
}

function getFieldData(object){
	var height = Math.round(100 * parseInt(object.css("height"))/parseInt($(".game").css("height"))) + "%";
	var width = Math.round(100 * parseInt(object.css("width"))/parseInt($(".game").css("width"))) + "%";
	var top = Math.round(100 * parseInt(object.css("top"))/parseInt($(".game").css("height"))) + "%";
	var left = Math.round(100 * parseInt(object.css("left"))/parseInt($(".game").css("width"))) + "%";

	$("#field-data").html("top: " + top + ";\nleft: " + left + ";\nheight: " + height + ";\nwidth: " + width + ";");
}

function mute() {
	if (typeof appearsound != "undefined") {
		appearsound.pause();
	}

	if (typeof sereneNorse != "undefined") {
		sereneNorse.pause();
	}

	if (typeof sound != "undefined") {
		sound.pause();
	}
	if (typeof bgsound != "undefined") {
		bgsound.pause();
	}
	if (typeof doorSound != "undefined") {
		doorSound.pause();
	}
	if (typeof victory != "undefined") {
		victory.pause();
	}
}

function debugMode() {
	$(".debug").show();
}

function playMode() {
	$(".debug").hide();
}

function skipToEndGame() {
	muteAll();
	setConfig(Config.ENDGAMESTARTED, 1);
	addItem(Item.LIGHTNING);
	addItem(Item.KEY);
	goToLevel("desert-pyramid");
}