$(document).ready(function() {

// runTests();

$("#reqs-container").hide();
$("#question-container").hide();
$("#run").css("visibility", "hidden");

$("#run").click(function (e) {
	$("#run").css("visibility","hidden");
	$("#question-container").show();
	onStart();
});

var title = "";
$("#title-edit").hide();
function titleClick() {
	$("#title-add").hide();
	// $("#title-edit").show();
	$("#title-input").addClass("title-done-editing");
	$("#option-input").focus();
}
$("#title-add").click(function (e) {
	titleClick();
});
$("#title-input").keyup(function (e) {
    if (e.keyCode == 13) {
    	titleClick();
    }
});
$("#title-input").hover(function (e) {
	if ($(this).hasClass("title-done-editing")) {
		$("#title-edit").show();
	}
});
$("#title-edit").hover($(this).show());
function editTitleClick() {
	$("#title-add").show();
	$("#title-edit").hide();
	$("#title-input").removeClass("title-done-editing");
	$("#title-input").focus();
}
$("#title-edit").click(function (e) {
	editTitleClick();
});
$("#title-input").click(function (e) {
	editTitleClick();
});

function optionClick() {
	var text = $("#option-input").val();
	$("#option-input").val("");
    $("#option-list").prepend("<li><span class='glyphicon glyphicon-remove' aria-hidden='true'></span>"+text+"</li>");
    onOptionAdded(text);
}
$("#option-add").click(function (e) {
	optionClick();
});
$("#option-input").keyup(function (e) {
    if (e.keyCode == 13) {
		optionClick();
    }
});
$('#option-list').on('click','.glyphicon', function (e) {
	onOptionDeleted($(this).parent().index());
	$(this).parent().hide();

});


$('#option-list').on('mouseenter', 'li', function (e) {
    $(this).children(0).css("visibility", "visible");
});
$('#option-list').on('mouseleave', 'li', function (e) {
    $(this).children(0).css("visibility", "hidden");
});

function attrClick() {
	var text = $("#attribute-input").val();
	$("#attribute-input").val("");
    $("#attribute-list").prepend("<li><span class='glyphicon glyphicon-remove' aria-hidden='true'></span>"+text+"</li>");
    onAttrAdded(text);
}
$("#attribute-add").click(function (e) {
	attrClick();
});
$("#attribute-input").keyup(function (e) {
    if (e.keyCode == 13) {
		attrClick();
    }
});
$('#attribute-list').on('click','.glyphicon', function (e) {
	onAttrDeleted($(this).parent().index());
	$(this).parent().hide();
});
$('#attribute-list').on('mouseenter', 'li', function (e) {
    $(this).children(0).css("visibility", "visible");
});
$('#attribute-list').on('mouseleave', 'li', function (e) {
    $(this).children(0).css("visibility", "hidden");
});


$("#option1").click(function (e) {
	onAnswerClicked(1);
});
$("#option2").click(function (e) {
	onAnswerClicked(2);
});
	fitImage("#track-drawing");

	animateTrack("#main_l", "0s", "2s");
	animateTrack("#main_r", "0s", "2s");
	animateTrack("#left_l", "1s", "2s");
	animateTrack("#left_branch_r", "1s", "2s");
	animateTrack("#left_branch_l", "2s", "2s");
	animateTrack("#left_r", "2s", "2s");
	animateTrack("#main_branch_r", "3s", "2s");
	animateTrack("#main_branch_l", "3s", "2s");
	animateTrack("#right_l", "2s", "3s");
	animateTrack("#right_r", "2s", "3s");
	animateTrack("#cross_r", "2s", "1s");
	animateTrack("#cross_l", "2s", "1s");
	animateTrack("#cross_r_tip", "4s", ".5s");
	animateTrack("#cross_l_tip", "4s", ".5s");

	fadeImage("#track-drawing image");
});