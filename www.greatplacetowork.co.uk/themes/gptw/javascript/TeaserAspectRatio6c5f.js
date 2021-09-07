function setAspectRatio() {
	function setSquare(element) {
		element.innerHeight(Math.ceil(element.outerWidth()));
	}
	jQuery('.teaserAspect').each(function () {
		setSquare(jQuery(this));
	});
}

jQuery(document).ready(function () {
	var timer_id;
	jQuery(window).resize(function () {
		clearTimeout(timer_id);
		timer_id = setTimeout(function () {
			setAspectRatio();
		}, 300);
	});
	setAspectRatio();
});