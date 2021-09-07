function showWorkplaceSubNavTab(filter) {
	console.log('showWorkplaceSubNavTab');

	jQuery('.workplaceSubNavTab').removeClass('workplaceSubNavTabActive');
	jQuery('.workplaceSubNavTab_' + filter).addClass('workplaceSubNavTabActive');
	jQuery('.workplaceSubNavContent:visible').fadeOut(100, function () {
		jQuery('.workplaceSubNavContent_' + filter).fadeIn(200);
	});
}

function liveWorkplaces() {
	console.log('liveWorkplaces');

	var filter = jQuery('#filterForm').serialize();

	jQuery('.ajaxContent').load(currentLink + '/liveWorkplaces/?' + filter, function () {
		jQuery('.ajaxLoading').fadeOut(300, function () {
			jQuery('.ajaxContent').fadeIn(200, function () {
				jQuery('.ajaxContent').jscroll({
					loadingHtml: '<img alt="loading" src="/themes/gptw/images/loading.gif" class="loadingGif center-block" />',
					nextSelector: 'a:last'
				});
			});
		});
	});
	// jQuery('.workplaceSubNavContainer').fadeOut(400);
}

function randWorkplaces() {
	console.log('randWorkplaces');

	var filter = jQuery('#filterForm').serialize();
	jQuery('.ajaxContent').load(currentLink + '/getRandomWorkplaces/?' + filter, function () {
		jQuery('.ajaxLoading').fadeOut(300, function () {
			jQuery('.ajaxContent').fadeIn(200, function () {
				jQuery('.ajaxContent').jscroll({
					loadingHtml: '<img alt="loading" src="/themes/gptw/images/loading.gif" class="loadingGif center-block" />',
					nextSelector: 'a:last'
				});
			});
		});
	});
}

function searchLiveWorkplaces() {
	console.log('searchLiveWorkplaces');

	// jQuery('#ajaxContentWp').remove();

	var filter = jQuery('#filterForm').serialize();

	jQuery('.ajaxContent').hide();

	jQuery('.ajaxContentSearch').load(currentLink + '/searchLiveWorkplaces/?' + filter, function () {
		jQuery('.ajaxLoading').fadeOut(300, function () {
			jQuery('.ajaxContentSearch').fadeIn(200, function () {
				// jQuery('.ajaxContentSearch').jscroll({
				//     loadingHtml: '<img alt="loading" src="/themes/gptw/images/loading.gif" class="loadingGif center-block" />',
				//     nextSelector: 'a:last'
				// });
			});
		});
	});
}

function countLiveWorkplaces() {
	var filter = jQuery('#filterForm').serialize();
	jQuery('.countItems').load(currentLink + '/countLiveWorkplaces/?' + filter);
}

function previewWorkplaces() {
	// jQuery('.ajaxPreviewContent').load(currentLink + '/previewWorkplaces/');
}

// Germany Poster Filter Functions

function getPosters() {
	var filter = jQuery('#posterFilter').serialize();
	jQuery('.ajaxPoster').load(currentLink + '/getPosters/?' + filter, function () {
		jQuery('.ajaxLoading').fadeOut(300, function () {
			jQuery('.ajaxPoster').fadeIn(200);
		});
	});
}

function ajaxDownload(valFileDownloadPath) {
	return $.ajax({
		method: "POST",
		url: valFileDownloadPath
	}).done(function (result) {
		$.ajax({
			url: result, // my URL
			type: "GET",
			dataType: 'binary',
			success: function (result2) {
				var url = URL.createObjectURL(result2);
				var fileName = result.replace("assets/Uploads/", "");

				if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {

					// var $ie = $('<a />', {
					//     'href': url,
					//     'text': "IEDownloadPDF"
					// }).appendTo("hiddenIE")[0];
					jQuery('.hiddenIE').html('<span id="IEDownload">' + url + '</span>');
				} else {
					var $a = $('<a />', {
						'href': url,
						'download': fileName,
						'text': "click"
					}).hide().appendTo("body")[0].click();
				}

			},
			error: function (error) {
				console.log(error);
			}
		});
	});
}

function downloadPoster() {
	var filter = jQuery('#posterFilter').serialize();
	var valFileDownloadPath = currentLink + '/downloadPoster/?' + filter;

	$.when(ajaxDownload(valFileDownloadPath)).done(function (e) {
		if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
			window.open(window.location.origin + '/' + e);
			// var testUrl = jQuery('#IEDownload').text();
			// console.log('TestURL: '  + testUrl);
			// window.navigator.msSaveOrOpenBlob(testUrl, 'TestPDF');
		}
	});
}

function getPosterData(resetDates) {
	$('#downloadBtn').prop('disabled', true);
	var filter = jQuery('#posterFilter').serialize();
	if (resetDates) {
		searchStr = filter.indexOf("&date=");
		filter = filter.substring(0, searchStr);
	}
	$('#dateSelect').empty();
	var json2 = $.getJSON(currentLink + '/getPosterDates/?' + filter, function (data) {
		var options = $('#dateSelect');
		options.append($('<option>').text("Bitte auswählen").attr('value', ""));
		$.each(data, function (i, obj) {
			options.append($('<option>').text(obj).attr('value', i))
		});
		$("#dateSelect").selectpicker('refresh');
	});
	// console.log(json2);
}


function clearAllFilter() {
	$('.workplaceSubNavContent').find('input[type=checkbox]:checked').removeAttr('checked');
	$('.countRegion').html('').removeClass('navlabelBorder');
	$('#region').html('');
	$('.countSize').html('').removeClass('navlabelBorder');
	$('#size').html('');
	$('.countSector').html('').removeClass('navlabelBorder');
	$('#sector').html('');
	$('.countSpecialCategory').html('').removeClass('navlabelBorder');
	$('#specialCategory').html('');
}

function changePrice(input) {
	$('.certPrice > div').hide();
	$('.certCount > label').removeClass('active');

	// console.log(input);

	if (input == 'smallPrice') {
		$('.certSmall').fadeIn(300);
		$('#certSmall').addClass('active');
	} else if (input == 'mediumPrice') {
		$('.certMedium').fadeIn(300);
		$('#certMedium').addClass('active');
	} else if (input == 'bigPrice') {
		$('.certBig').fadeIn(300);
		$('#certBig').addClass('active');
	} else if (input == 'veryBigPrice') {
		$('.certVeryBig').fadeIn(300);
		$('#certVeryBig').addClass('active');
	} else if (input == 'veryveryBigPrice') {
		$('.certVeryVeryBig').fadeIn(300);
		$('#certVeryVeryBig').addClass('active');
	} else if (input == 'veryveryveryBigPrice') {
		$('.certVeryVeryVeryBig').fadeIn(300);
		$('#certVeryVeryVeryBig').addClass('active');
	}
}

function toggleLang(id) {
	$('.toggleDrop').removeClass(' activeLang');
	$('.langDropdown').removeClass(' openLang');
	$('.langCheckBox').removeClass('langCheckBoxChecked');
	$('.langCheckBox').addClass('langCheckBoxUnChecked');
	$('.toggleDrop_' + id).addClass(' activeLang');
	// $('.langDropdown_' + id).slideToggle(300);

	$('.langDropdown_' + id).addClass(' openLang');

	// console.log($('.langDropdown_' + id).css('display'));

	if ($('.langDropdown_' + id).css('display') == 'none') {
		$('.langCheckBox_' + id).removeClass('langCheckBoxChecked');
		$('.langCheckBox_' + id).addClass('langCheckBoxUnChecked');
	} else {
		$('.langCheckBox_' + id).removeClass('langCheckBoxUnChecked')
		$('.langCheckBox_' + id).addClass('langCheckBoxChecked');
	}
}

function changeLocale(link, code) {

	var exists = code.split("|");
	// console.log(exists);
	var helpBoolean = Boolean(exists[1]);


	if (helpBoolean) {
		// console.log('exists');
		document.location = link + '&locale=' + exists[0];
	} else {
		// console.log('exists not');
		document.location = 'home/&locale=' + exists[0];
	}
}

/*$(document).ready(function () {
	$(".circle-button").click(function() {
	$('html, body').animate({
			scrollTop: $("#contactform").offset().top-150
		}, 1000);
	});
});
*/


function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= ((window.innerHeight || document.documentElement.clientHeight) + 400) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}