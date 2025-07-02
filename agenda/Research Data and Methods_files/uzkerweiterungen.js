/* ###### start: Code für das Highlighting von Angesprungenen Anchors (Sprungmarken) ###### */
/* Geschrieben 05.2018 von mdoetin0 */
/* Angepasst 17.05.2018 von tmoll */
/* Überarbeitet 18.6.2018 von mdoetin0 */



// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function(){
    
    
    if (window.location.hash && document.body.innerHTML.includes(window.location.hash.substr(1))) { // run only when URL contains hashtag and is present in site
	rrzkHashanchor();
    }
    
    function rrzkHashanchor() {
	let hashAnchor = window.location.hash; // Get Anchor Hashtag from URL
	let anchorElement = document.querySelector(hashAnchor).classList; // classList of Element that will get faded
	
	// Add .uzk15__anchor class
	if (! anchorElement.contains("article")) { // If classList does not contain article add .uzk15__anchor class
	    anchorElement.add("uzk15__anchor");
	    
	    // After 1 second remove .uzk15__anchor class and add .uzk15__anchorSeen class
	    setTimeout(function(){
		if (anchorElement.contains("uzk15__anchor")) {
		    anchorElement.remove("uzk15__anchor");
		    anchorElement.add("uzk15__anchorSeen");
		};
	    }, 1000); // wait 1 second
	};
    };
    
});

/* ###### end: Code für das Highlighting von Angesprungenen Anchors (Sprungmarken) ###### */


// https://stackoverflow.com/a/6832721
function versionCompare(v1, v2, options) {
  var lexicographical = options && options.lexicographical,
    zeroExtend = options && options.zeroExtend,
    v1parts = v1.split("."),
    v2parts = v2.split(".");
  function isValidPart(x) {
    return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
  }

  if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
    return NaN;
  }
  if (zeroExtend) {
    while (v1parts.length < v2parts.length) v1parts.push("0");
    while (v2parts.length < v1parts.length) v2parts.push("0");
  }
  if (!lexicographical) {
    v1parts = v1parts.map(Number);
    v2parts = v2parts.map(Number);
  }
  for (var i = 0; i < v1parts.length; ++i) {
    if (v2parts.length == i) {
      return 1;
    }
    if (v1parts[i] == v2parts[i]) {
      continue;
    } else if (v1parts[i] > v2parts[i]) {
      return 1;
    } else {
      return -1;
    }
  }
  if (v1parts.length != v2parts.length) {
    return -1;
  }
  return 0;
}


/*


function getAndroidVersion(ua) {
  ua = (ua || navigator.userAgent).toLowerCase();
  var match = ua.match(/android\s([0-9\.]*)/i);
  return match ? match[1] : undefined;
}

function addOldAndroidWarning() {
  var androidVersion = getAndroidVersion();

  if (versionCompare(androidVersion, "7.1.1") <= 0) {
    // Detected Android version is 7.1.1 or older

    // Create div element
    var oldAndroidWarnDiv = document.createElement("div");
    oldAndroidWarnDiv.style.padding = "8px";
    oldAndroidWarnDiv.style.fontSize = "14px";
    oldAndroidWarnDiv.style.marginBottom = "10px";
    oldAndroidWarnDiv.style.marginTop = "-20px";
    oldAndroidWarnDiv.classList.add("uzk15__light_med");
    oldAndroidWarnDiv.classList.add("android-warning");

    var htmlLang = document.querySelector("html").lang.toLowerCase();
    var closeButton =
      '<svg class="android-warning-close" viewBox="0 0 20 20" style="width:10px;fill:#af121d;padding:3px;float:right;"><title>close</title><path id="svgstore79f2293486ca0e62c39ae74f1fd540ecschliessen_1_" d="M19.6 2.4c.5-.5.5-1.4 0-2-.5-.5-1.4-.5-1.9 0L10 8 2.4.4C1.9-.1 1-.1.4.4c-.5.5-.5 1.4 0 2L8 10 .4 17.6c-.5.5-.5 1.4 0 1.9s1.4.5 2 0l7.6-7.6 7.6 7.6c.5.5 1.4.5 1.9 0s.5-1.4 0-1.9L11.9 10m0 0"></path></svg>';
    var germanMessage =
      "Ihre Android Version " +
      androidVersion +
      " ist veraltet. Ab dem 11.01.2021 wird es deshalb zu Problemen kommen. Hinweise und Lösungen erhalten Sie beim <a href='https://itcc.uni-koeln.de'>RRZK</a>.";
    var englishMessage =
      "Your Android version " +
      androidVersion +
      " is outdated. Therefore you will face issues from January 11st 2021 on. You can get hints and solutions at <a href='https://itcc.uni-koeln.de'>RRZK</a>.";
    
    var matomoPixel = '<img src="https://matomo.rrz.uni-koeln.de/matomo.php?idsite=2478&rec=1&bots=1&url=https%3A%2F%2Fitcc.uni-koeln.de%2Falte-android-version%26action_name%3DWarning-shown" style="border:0;” alt="" />'

    oldAndroidWarnDiv.innerHTML = closeButton + germanMessage + matomoPixel;
    if (!htmlLang.includes("de")) {
      oldAndroidWarnDiv.innerHTML = closeButton + englishMessage + matomoPixel;
    }

    var mainContent = document.querySelector(".uzk15__maincontent");

    // Add div element as first child of .uzk15__maincontent
    mainContent.insertBefore(oldAndroidWarnDiv, mainContent.firstChild);

    // Add event listener to close button
    document
      .querySelector(".android-warning-close")
      .addEventListener("click", function () {
        oldAndroidWarnDiv.style.display = "none";
        var closedAt = new Date();
        localStorage.setItem("uocAndroidWarningClosedAt", closedAt.getTime());
        console.log("Stored Android Warning Close Date in localStorage:", closedAt.toISOString());
      });
  }
}

function closedInTheLast24h() {
  var storedClosedAt = localStorage.getItem("uocAndroidWarningClosedAt");

  if (storedClosedAt === undefined || storedClosedAt === null) {
    console.log("Android warning was not closed before");
    return false;
  }

  var now = new Date();
  var storedClosedAtDate = new Date(parseInt(storedClosedAt))
  var oneDay = 24 * 60 * 60 * 1000;

  if ((now - storedClosedAtDate) > oneDay) {
    console.log("Android Warning is older than 24 hours", storedClosedAtDate.toJSON());
    return false
  }

  console.log("Android Warning was closed in the last 24 hours at: ", storedClosedAtDate.toJSON());
  return true
}


document.addEventListener("DOMContentLoaded", function(){
  if (
    navigator.userAgent.toLowerCase().includes("android") && // Only add if Android
    !navigator.userAgent.toLowerCase().includes("firefox") && // don't add when on Firefox
    !document.querySelector(".android-warning") && // Don't add if warning is already in DOM
    !closedInTheLast24h() // Don't add if closed in the last 24h
  ) {
    addOldAndroidWarning();
  }
});

*/
