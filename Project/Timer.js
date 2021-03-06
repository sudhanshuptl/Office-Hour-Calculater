
	var sessionExpireTime=16; //hours

	function getTimeInUnix(){
		return parseInt((new Date().getTime() / 1000).toFixed(0));
	}

	function getCookie(cname) {
    	var name = cname + "=";
    	var decodedCookie = decodeURIComponent(document.cookie);
    	var ca = decodedCookie.split(';');
    	for(var i = 0; i < ca.length; i++) {
        	var c = ca[i];
        	while (c.charAt(0) == ' ') {
         	   c = c.substring(1);
        	}
        	if (c.indexOf(name) == 0) {
            	return c.substring(name.length, c.length);
        	}
    	}
    	return "";
	}
	
	function setCookie(cname,cvalue,hour) {
    	var d = new Date();
    	d.setTime(d.getTime() + (hour*60*60*1000));
    	var expires = "expires=" + d.toGMTString();
    	document.cookie = cname + "=" + cvalue + ";" + expires + "; path=/";
	}

	function FormateTime(hour,min,sec){
		var HH=hour;
		var MM=min;
		var SS=sec;
		if (hour<10) {
			HH='0'+hour;
		}
		if (min<10) {
			MM='0'+min;
		}
		if (sec<10) {
			SS='0'+sec;
		}
		return HH+':'+MM+':'+SS
	}

	function getSessionTime(){
		// Check The Cookies for Start Time.
		var startTime=getCookie("firstLoginTime");
		if (startTime == "") {
			//Set Cookie
			var setTimeUnix=parseInt((new Date().getTime() / 1000).toFixed(0));
			setCookie("firstLoginTime",setTimeUnix,sessionExpireTime);
			return "00.00"; //since session just started now  
		}
		else{
			startTime = parseInt(startTime);
			var endTime =  parseInt((new Date().getTime() / 1000).toFixed(0));

			var timeElapseInSecond = endTime - startTime;
			var seconds = timeElapseInSecond % 60;
			var minute = parseInt(timeElapseInSecond / 60);
			var hour = parseInt(minute/60);
			minute = minute%60;

			return FormateTime(hour,minute,seconds);

		}

	}
//chrome.runtime.sendMessage(getSessionTime());
document.write(getSessionTime());
