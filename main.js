var deviceInfo = function() {
    document.getElementById("platform").innerHTML = device.platform;
    document.getElementById("version").innerHTML = device.version;
    document.getElementById("uuid").innerHTML = device.uuid;
    document.getElementById("name").innerHTML = device.name;
    document.getElementById("width").innerHTML = screen.width;
    document.getElementById("height").innerHTML = screen.height;
    document.getElementById("colorDepth").innerHTML = screen.colorDepth;
};

var getLocation = function() {
    var suc = function(p) {
        alert(p.coords.latitude + " " + p.coords.longitude);
    };
    var locFail = function() {
    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};

var beep = function() {
    navigator.notification.beep(2);
};

var vibrate = function() {
    navigator.notification.vibrate(0);
};

function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

var accelerationWatch = null;

function updateAcceleration(a) {
    document.getElementById('x').innerHTML = roundNumber(a.x);
    document.getElementById('y').innerHTML = roundNumber(a.y);
    document.getElementById('z').innerHTML = roundNumber(a.z);
}

var toggleAccel = function() {
    if (accelerationWatch !== null) {
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : ""
        });
        accelerationWatch = null;
    } else {
        var options = {};
        options.frequency = 1000;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                }, options);
    }
};

var preventBehavior = function(e) {
    e.preventDefault();
};

function dump_pic(data) {
    var viewport = document.getElementById('viewport');
    console.log(data);
    viewport.style.display = "";
    viewport.style.position = "absolute";
    viewport.style.top = "10px";
    viewport.style.left = "10px";
    document.getElementById("test_img").src = "data:image/jpeg;base64," + data;
}

function fail(msg) {
    alert(msg);
}

function show_pic() {
    navigator.camera.getPicture(dump_pic, fail, {
        quality : 50
    });
}

function close() {
    var viewport = document.getElementById('viewport');
    viewport.style.position = "relative";
    viewport.style.display = "none";
}

// This is just to do this.
function readFile() {
    navigator.file.read('/sdcard/phonegap.txt', fail, fail);
}

function writeFile() {
    navigator.file.write('foo.txt', "This is a test of writing to a file",
            fail, fail);
}

function contacts_success(contacts) {
    alert(contacts.length
            + ' contacts returned.'
            + (contacts[2] && contacts[2].name ? (' Third contact is ' + contacts[2].name.formatted)
                    : ''));
}

function get_contacts() {
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    obj.limit = 5;
    navigator.service.contacts.find(
            [ "displayName", "name" ], contacts_success,
            fail, obj);
}

var networkReachableCallback = function(reachability) {
    // There is no consistency on the format of reachability
    var networkState = reachability.code || reachability;

    var currentState = {};
    currentState[NetworkStatus.NOT_REACHABLE] = 'No network connection';
    currentState[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'Carrier data connection';
    currentState[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK] = 'WiFi connection';

    confirm("Connection type:\n" + currentState[networkState]);
};

function check_network() {
    navigator.network.isReachable("www.mobiledevelopersolutions.com",
            networkReachableCallback, {});
}

function rotate(value) {
	document.getElementById('div1').style.webkitTransform="rotate(" + value + "deg)";
	document.getElementById('div1').style.msTransform="rotate(" + value + "deg)";
	document.getElementById('div1').style.MozTransform="rotate(" + value + "deg)";
	document.getElementById('div1').style.OTransform="rotate(" + value + "deg)";
	document.getElementById('div1').style.transform="rotate(" + value + "deg)";
	//document.getElementById('span1').innerHTML=value + "deg";
}


var rotation = 0;
function teste() {
	//alert("teste");
	rotation += 1;
	if (rotation>20) {
		navigator.notification.alert('Change: left overflow!');
		document.location = 'index.html';
	}
	rotate(rotation);
	
	
	//document.location = 'index.html';
}

function teste2() {
	//alert("teste");
	rotation -= 1;
	if (rotation<-20) {
		navigator.notification.alert('Change: left overflow!');
		document.location = 'index.html';
	}
	rotate(rotation);
	
	//document.location = 'index.html';
}



function check_network2() {
    alert("check_network2");
    navigator.notification.alert('You are the winner!');
    /*function onSuccess(heading) {
	    alert('Heading: ' + heading);
	};
	
	function onError() {
	    alert('onError!');
	};
    navigator.compass.getCurrentHeading(onSuccess, onError);*/

    document.getElementById("accel-data").innerHTML += "<img id='div2' src='./img/left.png' alt='Angry face' onclick='teste2();'/>\n";
    document.getElementById("accel-data").innerHTML = "<img id='div1' src='./img/eu.jpg' alt='Angry face' />\n";
    document.getElementById("accel-data").innerHTML += "<img id='div2' src='./img/right.png' alt='Angry face' onclick='teste();'/>\n";
    
    
    
    
}

function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", deviceInfo, true);
}
