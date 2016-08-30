		function pos_on_page(){

			var body = document.body, html = document.documentElement;
			var doc_height = Math.max( body.scrollHeight, body.offsetHeight, 
					       html.clientHeight, html.scrollHeight, html.offsetHeight );
			var scroll_top = window.pageYOffset || html.scrollTop;
			var win_height = window.outerHeight;
			return  Math.round(100*(scroll_top) / (doc_height - win_height));
		}

		function delay(ms) {
	    		var start = +new Date;
	        	while ((+new Date - start) < ms);
		}


		window.onload = function() {
			Parse.initialize("ayCTTGvjAQ7Po3k1qAfvkJkPu00gWZ0V0ZSKnXB8", 
					"LsgPzOsHk7VJBhsi84qPXucluhVaflBFfMCbbtZf");
  			TimeMe.setIdleDurationInSeconds(180);
  			TimeMe.setCurrentPageName("amber");
  			TimeMe.initialize();  
		}

		window.onbeforeunload = write_out;
		
		function write_out() {
    			var time_on_page = Math.round( TimeMe.getTimeOnCurrentPageInSeconds() );
    			var UserOnPage = Parse.Object.extend("user_on_page");
			var user = new UserOnPage();
			
			user.set("time_on_page", time_on_page);
			user.set("page_position_onexit", pos_on_page());

			user.save(null, {
		  		success: function(gameScore) {
		    		},
		      		error: function(gameScore, error) {
			    	}
			});

			delay(300);
		}

