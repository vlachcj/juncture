var numAttr = 0;
var curPairIndex = 0;
var started = false;
var paused = false;
var options = [];
var attributes = [];
var pairs = [];

function clearData() {
	numAttr = 0;
	curPairIndex = 0;
	started = false;
	paused = false;
	options = [];
	attributes = [];
	pairs = [];
	pairsDisplayed = 0;
}

function Option(name) {
  	this.name = name;
  	this.valid = true;
  	this.wins = new Array(numAttr);
	this.wins.fill(0);
	this.optionsBeaten = new Array(numAttr);
	this.optionsBeaten.fill([]);
}

function Attribute(name, weight) {
	this.name = name;
	this.valid = true;
	this.weight = weight;
	//list of nodes, tree structure with unique leaves
	// this.transTracker = [];
	numAttr += 1;
}

function Node(option) {
	// data
	this.option = option;
	// pointers to other nodes
	this.optionsBeaten = [];
}

function Pair(first, second, attrIndex) {
	this.choice1 = first;
	this.choice2 = second;
	this.attrIndex = attrIndex;
}



function shuffleArray(array) {
  var currentIndex = array.length - 1, temporaryValue, randomIndex, 
  numToShuff = currentIndex - curPairIndex + 1;

  // While there remain elements to shuffle...
  while (curPairIndex < currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * numToShuff + curPairIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function checkRunReqs() {
	var optCount = 0;
	var attrCount = 0;
	for (var i = 0; i < options.length; i++) {
		if (options[i].valid)
			optCount ++;
		if (optCount > 1) {
			break;
		}
	}
	for (var i = 0; i < attributes.length; i++) {
		if (attributes[i].valid) {
			attrCount ++;
			break;
		}
	}
	if (optCount > 1 && attrCount > 0) {
		return true;
	}
	return false;
}

function displayRun(bool) {
	if (bool) {
		if (!started)
			$("#run").css("visibility", "visible");
		else if (paused)
			resume();
	} else {
		if (started) {
			$("#reqs-container").show();
		}
	}
}

function onAttrDeleted(revIndex) {
	if (started) {
		pause();
	}
	var index = attributes.length - revIndex - 1;
	attributes[index].valid = false;
	displayRun(checkRunReqs());
}

function onOptionDeleted(revIndex) {
	if (started) {
		pause();
	}
	var index = options.length - revIndex - 1;
	options[index].valid = false;
	displayRun(checkRunReqs());
}

function onAttrAdded(text) {

		// get info from form

	var w = 1;
	// add to array
	attributes.push(new Attribute(text, w));
	// add new win column for each option
	for (var i = 0; i < options.length; i++) {
		options[i].wins.push(0);
		options[i].optionsBeaten.push([]);
	};

	// update pairs if started
	if (started) {
		pause();
		for (var j = 0; j < options.length-1; j++) {
			for (var k = j+1; k < options.length; k++) {
				if (options[j].valid && options[k].valid) {
					if (Math.random() < .5) {
						pairs.push(new Pair(options[j], options[k], attributes.length-1));
					} else {
						pairs.push(new Pair(options[k], options[j], attributes.length-1));
					}
				}
			}
		}
		shuffleArray(pairs);
	}

	displayRun(checkRunReqs());
}

function onOptionAdded(text) {
	var newOption = new Option(text);
	// add to array
	options.push(newOption);

	// update pairs if started
	if (started) {
		pause();
		for (var i = 0; i < attributes.length; i++) {
			for (var j = 0; j < options.length-1; j++) {
				if (attributes[i].valid && options[j].valid) {
					if (Math.random() < .5) {
						pairs.push(new Pair(options[j], newOption, i));
					} else {
						pairs.push(new Pair(newOption, options[j], i));
					}
				}			
			}	
		}
		shuffleArray(pairs);
	}

	displayRun(checkRunReqs());
}

function makePairs() {
	for (var i = 0; i < attributes.length; i++) {
		for (var j = 0; j < options.length-1; j++) {
			for (var k = j+1; k < options.length; k++) {
				if (attributes[i].valid && options[j].valid && options[k].valid) {
					if (Math.random() < .5) {
						pairs.push(new Pair(options[j], options[k], i));
					} else {
						pairs.push(new Pair(options[k], options[j], i));
					}
				}
			}			
		}	
	}
	shuffleArray(pairs);

	//check transitive
// 	for (var i = 0; i < attributes.length; i++) {
// 				for (var j = 0; j < options.length-1; j++) {
// 				if (attributes[i].valid && options[j].valid && options[j+1].valid)
// 											pairs.push(new Pair(options[j], options[j+1], i));

// }
// 		for (var j = 0; j < options.length-1; j++) {
// 			for (var k = j+2; k < options.length; k++) {
// 				if (attributes[i].valid && options[j].valid && options[k].valid)
// 					if (Math.random() < .5) {
// 						pairs.push(new Pair(options[j], options[k], i));
// 					} else {
// 						pairs.push(new Pair(options[k], options[j], i));
// 					}
// 			}			
// 		}	
// 	}
}

function preDisplayPair(index) {
	if (index < pairs.length) {
		if (pairs[index].choice1.valid && pairs[index].choice2.valid 
			&& attributes[pairs[index].attrIndex].valid) {
			// check transitive
			if (checkTransitive(curPairIndex)) {
				// don't need to ask user
				curPairIndex += 1;
				preDisplayPair(curPairIndex);
			} else {
				// ask user
				displayPair(index);
			}
		} 
	} else {
		displayResults();
	}
}
var pairsDisplayed = 0;
function displayPair(index) {
	pairsDisplayed += 1;
	var nextPair = pairs[index];
	// display
	$("#option1").text(nextPair.choice1.name);
	$("#option2").text(nextPair.choice2.name);
	$("#attribute").text(attributes[nextPair.attrIndex].name);

	// TEST TRANSITIVE
	// if (nextPair.choice1.name > nextPair.choice2.name) {
	// 	onAnswerClicked(1);
	// } else {
	// 	onAnswerClicked(2);
	// }
}


function onStart() {
	if (paused) {
		resume();
	} else {
		started = true;
		makePairs();
		//show first pair
		preDisplayPair(curPairIndex);
	}
}

//TODO something else for this, like grey out
function pause() {
	// hide current pair until requirements are met again.
	$("#question-container").hide();
	paused = true;
}
function resume() {
	// called after options or attributes were deleted, invalidating conditions,
	// but conditions were met again
	paused = false;
	shuffleArray(pairs);
	preDisplayPair(curPairIndex);
	// do animation
	$("#question-container").show();
}

function checkTransitive(index) {
	// one option won't be 0 layers deep in another option (unless they've already matched up)
	var attrIndex = pairs[index].attrIndex;
	for (var i = 0; i < pairs[index].choice2.optionsBeaten[attrIndex].length; i++) {
		if (lookForOptionInNodes(pairs[index].choice1, pairs[index].choice2.optionsBeaten[attrIndex][i].optionsBeaten[attrIndex], attrIndex)) {
			// option2 beats option1 by transitive
			pairs[index].choice2.wins[attrIndex] += 1;
			return true;
		}
	}
	for (var i = 0; i < pairs[index].choice1.optionsBeaten[attrIndex].length; i++) {
		if (lookForOptionInNodes(pairs[index].choice2, pairs[index].choice1.optionsBeaten[attrIndex][i].optionsBeaten[attrIndex], attrIndex)) {
			// option1 beats option2 by transitive
			pairs[index].choice1.wins[attrIndex] += 1;
			return true;
		}
	}
	return false;
}

function lookForOptionInNodes(option, nodeList, nodeListIndex) {
	// depth first search of nested array
	for (var i = 0; i < nodeList.length; i++) {
		if (nodeList[i] == option)
			return true;
		else {
			for (var i = 0; i < nodeList.length; i++) {
				if (lookForOptionInNodes(option, nodeList[i].optionsBeaten[nodeListIndex], nodeListIndex))
					return true;
			}
			return false;
		}
	}
}
function updateTransitive(winner, loser, attrIndex) {
	winner.optionsBeaten[attrIndex].push(loser);
}

function onAnswerClicked(choice) {
	var winner;
	var loser;
	if (choice == 1) {
		winner = pairs[curPairIndex].choice1;
		loser = pairs[curPairIndex].choice2;
	} else {
		winner = pairs[curPairIndex].choice2;
		loser = pairs[curPairIndex].choice1;		
	}
	// input data
	winner.wins[pairs[curPairIndex].attrIndex] += 1;
	updateTransitive(winner, loser, pairs[curPairIndex].attrIndex);
	// show next pair?
	curPairIndex += 1;
	preDisplayPair(curPairIndex);
}

function displayResults() {
	generateGraph(formatData());
	$("#question-container").hide();
	$("#results-container").show();
	$('html,body').animate({
   scrollTop: $("#results-container").offset().top
});
	// TESTING
	// testResults.push(pairsDisplayed);
	// clearData();
}


function formatData() {
	var formattedData = [];
    var rowZero = ["Options"];
    for (var i = 0; i < attributes.length; i++) {
    	if(attributes[i].valid) {
    		rowZero.push(attributes[i].name);
    	}
    }
    formattedData.push(rowZero);
    for (var i = 0; i < options.length; i++) {
    	if(options[i].valid) {
    		var newRow = [options[i].name];
    		for (var j = 0; j < attributes.length; j++) {
    			if(attributes[j].valid) {
    				newRow.push(options[i].wins[j] * attributes[j].weight);
    			}
    		}
    	}
    	formattedData.push(newRow);
    }
    return formattedData;
}

// TESTING TRANSITIVE EFFICIENCY
// var testResults = [];
// var results = [];
// function simpleResults(arr) {
// 	var sum = 0;
// 	var min = arr[0];
// 	var max = arr[0];
// 	for (var i = 0; i < arr.length; i++) {
// 		sum += arr[i];
// 		if (arr[i] < min) {
// 			min = arr[i];
// 		}
// 		if (arr[i] > max) {
// 			max = arr[i];
// 		}
// 	}
// 	this.min = min;
// 	this.av = sum / arr.length;
// 	this.max = max;
// }
// function runTests() {
// 	for (var i = 0; i < 100; i++) {
// 		runTest();
// 	}
// 	console.log(new simpleResults(testResults));
// 	testResults = [];
// }
// function runTest() {
// 	for (var i = 0; i < 7; i++) {
// 		onOptionAdded(i);
// 	}
// 	onAttrAdded("a");
// 	// onAttrAdded("b");

// 	// make pairs
// 	makePairs();
// 	//show first pair
// 	preDisplayPair(curPairIndex);	
// }
