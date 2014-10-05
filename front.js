jQuery(document).ready(function($){

	// load all relevant data first and prepare an intermediate array

	var github_logo_folders = 'https://api.github.com/repos/endofline/sabah.io/contents/logos/';
	var github_raw_url = 'https://raw.githubusercontent.com/endofline/sabah.io/master/'
	
	$.getJSON(github_logo_folders, function(folderlist){
		var image_store = [];

		$.each(folderlist, function(i, folderobj){
			image_store.push({
				'thumbnail-path': github_raw_url + folderobj.path + '/small.png',
			});
		});

		render_images(image_store);
	})
	.fail(function(e){
		console.log('something went wrong fetching data');
	});

	function render_images(image_store)
	{
		// randomly load images into the thumbnail grid

		var image_count = image_store.length;

		console.log(image_count, ' loaded');

		if(image_count > 0)
		{
			$.each($('#thumbnail-grid .thumbnail'), function(enumeration, thumbnailElement){
				var store_id = Math.floor(Math.random() * image_count); // use a better random number generator and tie it with votes?

				var imageObj = image_store[store_id];

				$(thumbnailElement).css('background-image', 'url(' + imageObj['thumbnail-path'] + ')');
				$(thumbnailElement).css('background-color', Math.floor(Math.random()*16777215).toString(16));
			});
		}
		else
		{
			console.log('nothing to display');
		}
	}

	// clicking/tapping will "pin" the label

	var $currentPinned = false;
	$('div.thumbnail').click(function(e){
		var $element = $(this);

		if($currentPinned)
		{
			$currentPinned.removeClass('pinned');

			if($currentPinned[0] == $element[0])
			{
				$currentPinned = false;
				return false;
			}
		}

		$currentPinned = $element;
		$currentPinned.addClass('pinned');
		console.log('on');
	});
	
	var thumbnailWidth = 150;
	var thumbnailHeight = 150;
	var $thumbnailCanvas = $('#thumbnail-grid');
	var $thumbnailTemplate = $('#thumbnail-template').detach();
	
	$(window).resize(function(e){
		var fullWidth = $(window).width();
		var fullHeight = $(window).height();
		
		var noOfColumns = Math.ceil(fullWidth / thumbnailWidth);
		var noOfRows = Math.ceil(fullHeight / thumbnailHeight);
		var totalNumberOfThumbnails = noOfColumns * noOfRows;
		
		$thumbnailCanvas.empty();
		
		for(var i = 0; i < totalNumberOfThumbnails; i++)
		{
			var _clone = $thumbnailTemplate.clone();
			_clone.removeAttr('id').appendTo($thumbnailCanvas);
		}
		
		$thumbnailCanvas.css({
			// 'margin-top': '-' + Math.round(thumbnailHeight/3) + 'px',
			// 'margin-left': '-' + Math.round(thumbnailWidth/3) + 'px',
			'width': (noOfColumns * thumbnailWidth) + 'px',
			'height': (noOfRows * thumbnailHeight) + 'px'
		});
	});
	
	$(window).resize();
});
