$(document).ready(function(){
console.log($);

  

  $('#article-search').heapbox(
  	{'onChange':function() {  //on change of select menu the value is saved as variable
 	
 	var topicChoice = document.getElementById('article-search').value;
 	console.log(topicChoice);

  	$('.article-container').append('<img src="images/ajax-loader.gif"  class="ajax-loader" id="loader"/>'); //loading gif is appended
  	$('header').addClass('header-search');		//header is shrunk on select change
  	$('.nyt-symbol').removeClass('nyt-symbol').addClass('nyt-search-size'); 

		  // set some initial variables
		var articleData, articleItems = '', articleName, url, 
		      $articleList = $('.article-list'); //accessing element like this is slower/costly so we store it in a variable when we have to access it more than once

		$('.article-list').empty(); //any previous articles searched are removed from the page
		 
		//api key is concatenated with the variable retrieved from onChange function and the api key    
		var url = 'https://api.nytimes.com/svc/topstories/v2/'+ topicChoice +'.json'; 
		url += '?' + $.param({
		  'api-key':"35c46b5e6cbb49dc9e14fa340746b634"});
			//ajax function retrieves data object from NYTimes
			$.ajax({
			url: url,
			method: 'GET'

			})

			.done(function(data) {
			console.log(data);
			articleData = data.results; 
			articleItems = ''; 
			var i = 0;
			

				$.each(articleData, function(key, value) {

					if (value.multimedia.length && i < 12) { //only 12 articles will be appended
						articleImageUrl = value.multimedia[3].url; // setting variables for the different data sets retreived from api
						articleCaption = value.abstract;
						articleLink = value.url;
						

						//below article items are appended to the html article list

						articleItems += '<li class="article">';
						articleItems += 	'<a class="caption-font" href="' + articleLink + '" target"_blank">';
						articleItems += 	'<div class="article-box" style="background-image: url('+ articleImageUrl +')">';
						articleItems += 			'<div class="caption">'	;
						articleItems += 			'<p>' + articleCaption + '</p>';
						articleItems += 			'</div>';		
						articleItems += 	'</div>';
						articleItems += 	'</a>';
						articleItems += '</li>';
						i++;
					};	


				});
				

					$articleList.append(articleItems); 


			}).fail(function() {
			  $articleList.append('<li>Sorry! There was a problem, please try again.</li>'); //if the get function fails a message is displayed


			})
			    .always(function() {
      			$('#loader').remove(); //removes loading gif when search is complete
 			 });
  		
		}
  	});
});
