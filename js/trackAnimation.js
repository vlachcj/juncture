var doc;

function animateTrack(id, start, dur) {
	var path = doc.querySelector(id);
	var length = path.getTotalLength();
	// Clear any previous transition
	path.style.transition = path.style.WebkitTransition = 'none';
	// Set up the starting positions
	path.style.strokeDasharray = length + ' ' + length;
	path.style.strokeDashoffset = length;
	// Trigger a layout so styles are calculated & the browser
	// picks up the starting position before animating
	path.getBoundingClientRect();
	// Define our transition
	path.style.transition = path.style.WebkitTransition =
	  'stroke-dashoffset ' + dur + ' ease-in-out ' + start + ', opacity 2s 4s';
	// Go!
	path.style.strokeDashoffset = '0';
	path.style.opacity = "0";
        
}

function fadeImage(id) {
	var img = doc.querySelector(id);
	img.style.transition = img.style.WebkitTransition = 'none';
	// img.style.opacity = '0';
	img.getBoundingClientRect();
	img.style.transition = img.style.WebkitTransition =
	'opacity 4s ease-in 2s';
	img.style.opacity = '1';
}

function fitImage(id) {
	$(id).height($(window).height());
	$(id).width($(window).width());
}

function driveAnimation(_doc) {
	doc = _doc;

	//ajust svg size before revealing it
	fitImage("#track-drawing");
	doc.querySelector("#purple-rect").style.opacity = '1';

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
}