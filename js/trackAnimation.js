function animateTrack(id, start, dur) {
	var path = document.querySelector(id);
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
	var img = document.querySelector(id);
	img.style.transition = img.style.WebkitTransition = 'none';
	img.style.opacity = '0';
	img.getBoundingClientRect();
	img.style.transition = img.style.WebkitTransition =
	'opacity 4s ease-in 2s';
	img.style.opacity = '1';
}

function fitImage(id) {
	$(id).height($(window).height());
	$(id).width($(window).width());
}