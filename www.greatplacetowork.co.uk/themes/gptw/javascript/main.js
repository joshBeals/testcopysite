$(document).ready(function () {
	var navbar = $('#navbarSettings');
	var sticky = $('#wantToBeSticky');

	$(window).bind('scroll', function () {
		var topOffset = $(window).scrollTop();
		if (topOffset > 144) {
			navbar.addClass('navbar-sm');
			sticky.addClass('getSticky');
		} else {
			navbar.removeClass('navbar-sm');
			sticky.removeClass('getSticky');
		}
	});
});

$(document).ready(function () {
	var nav = $('#wpFilter');
	if (nav.length) {
		var navpos = nav.offset();
		$(window).bind('scroll', function () {
			if ($(window).width < 767) {
			}
			if ($(window).scrollTop() > navpos.top - 25) {
				$('#wpFilter').addClass('subnavbar-fixed-top');
			} else {
				$('#wpFilter').removeClass('subnavbar-fixed-top');
			}
		});
	}
});

function toggleFilter() {
	$('.workplaceFilterButton').click(function () {
		$(window).scrollTop($('#filterTarget').offset().top - 100);
	});
	jQuery('.workplaceSubNavContainer').slideToggle(300);
}

function fixTables(){
	$('table').wrap("<div class='table table-responsive'>");
	$('table').addClass('table table-responsive');
}