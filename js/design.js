$(document).ready(function() {

// runTests();

$("#run i").click(function (e) {
	$("#run").hide();
	$("#question-container").show();
	onStart();
});

function titleClick() {
	$("#title-add").hide();
	$("#title-edit").show();
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
    $("#option-list").prepend("<li><span><span class='glyphicon glyphicon-remove' aria-hidden='true'></span>"+text+"</span></li>");
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
	onOptionDeleted($(this).parent().parent().index());
	$(this).parent().parent().hide();

});
$('#option-list').on('mouseenter', 'span', function (e) {
    $(this).children(".glyphicon").css("opacity", "1");
});
$('#option-list').on('mouseleave', 'span', function (e) {
    $(this).children(".glyphicon").css("opacity", "0");
});

function attrClick() {
	var text = $("#attribute-input").val();
	$("#attribute-input").val("");
    $("#attribute-list").prepend("<li><span><span class='glyphicon glyphicon-remove' aria-hidden='true'></span>"+text+"</span><canvas width='15' height='15'></canvas></li>");
    var chart = makeMiniWeight($("#attribute-list").children(0).children("canvas"), .7);
    onAttrAdded(text, chart);
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
	onAttrDeleted($(this).parent().parent().index());
	$(this).parent().parent().hide();
});
$('#attribute-list').on('click','canvas', function (e) {
	$("#weight-adjuster-modal").modal("show");
	showWeightAdjuster($(this).parent().index());
});
$('#attribute-list').on('mouseenter', 'span', function (e) {
    $(this).children(".glyphicon").css("opacity", "1");
});
$('#attribute-list').on('mouseleave', 'span', function (e) {
    $(this).children(".glyphicon").css("opacity", "0");
});


$("#option1").click(function (e) {
	onAnswerClicked(1);
});
$("#option2").click(function (e) {
	onAnswerClicked(2);
});

document.getElementById("track-drawing").addEventListener("load", function() {
	var doc = this.getSVGDocument();
	driveAnimation(doc);
});


});