'use strict';

$(function() {

	//get infoArea
	var infoA = $("#infoArea");
	//get tweetArea
	var tweetA = $("#tweetArea");
	//get form submit button
	//var idArray = [];
	$("#rep-lookup").submit(function(e) {
		e.preventDefault();

		var zip = $("#state").val().toLowerCase();
		var sunapikey = "eb24a386fa7649539dce2182d5f8186d";
		var requestURL = "https://congress.api.sunlightfoundation.com/legislators/locate?callback=?";
		var twitterURL = "https://api.twitter.com/1.1/statuses/user_timeline.json?callback=?";
		var twitterapi = '62972312-AHdWkSEODAvHPcKxjsRNHfW40k6wdkAjTJk0vka7z';
		if(zip.length===5 && $.isNumeric(zip)){
			//call to JSON
			$.getJSON(requestURL, {'apikey' : sunapikey, 'zip' : zip}, function(result) {

			//log the resulting data and test in browser
			console.log(result);

			//check that there's data
			if ( result.results.length > 0 && result.results ) {
				//start html to show results
				var mySenators = "<p>Here are the legislators of your zip: </p>";

				//iterate thru the results and build html
				//giving the data.results and a iteraing function (index, item)
				$.each(result.results, function(index, item) {
				// 	//check that the item is of chamber senate

					mySenators += '<p>';
					// 		//create anchor link to contact page
					mySenators += '<a href="'+ item.contact_form+'" target="blank">';
					// 		//get name
					mySenators += item.first_name+" "+item.last_name;
					// 		//close tags
					mySenators += '</a>';
					mySenators += "<p>Twitter name: @"+item.twitter_id.toLowerCase()+"</p>";
					mySenators += '</p>';

					// //idArray = idArray.push(item.twitter_id);

					// //use js to print out html with ruby getting the instance variables from mash_controller
					// //call mash_controller with tweet = MashController.new
					// //tweet.index()
					// // theTweets += "<p><% tweetCall = MashController.new %>
					// // <% tweetCall.index(idArray)%></p>"
					// theTweets += "<%= @header %>\n"+item.first_name+" "+item.last_name +"\n"+ "<%= @tweets.each {|t| puts "Tweet: #{t["text"]} \n\n".ljust(30)} %></p>"

					// theTweetArea = document.createElement('p');
					// theTweetText = document.createTextNode("theTweets")
					
				});
				// });
				//	mySenators += "<p>Please write to your senators</p>"

				//display result on screen
				infoA.html(mySenators);
				// if(tweetA){
					// tweetA.appendChild(theTweetArea);
				// }else{
				// 	tweetA.html("<p>Error retrieving tweets. Please try again</p>");
				// }
			//test that results can be displayed
			//infoA.html('Your senators for ' + state +' are:');
			}else {
				//display error message
				infoA.html("<p>Error finding your senators. Please try again</p>");
				tweetA.html("<p>Error retrieving tweets. Please try again</p>");
			}
		});

		}else{
			infoA.html("Please enter a 5 digit number");
		}
	});
});