(function () {
    // Defining a connection to the server hub.
    var myHub = $.connection.counterHub;
    // Setting logging to true so that we can see whats happening in the browser console log. [OPTIONAL]
    $.connection.hub.logging = true;
    // Start the hub
    $.connection.hub.start();    


    // This is the client method which is being called inside the MyHub constructor method every 3 seconds
    myHub.client.SendServerTime = function (serverTime) {
        // Set the received serverTime in the span to show in browser
        $("#newTime").text(serverTime);
    };

    var ALimit = 88, BLimit = 152, CLimit = 35;
    var WarnLimit = 10;
    $("#pGroupATotal").text(ALimit);
    $("#pGroupBTotal").text(BLimit);
    $("#pGroupCTotal").text(CLimit);

    // Client method to broadcast the message
    myHub.client.hello = function (message) {
        //save message into hidden field for debugging
        $("#message").text(message);
        
        //split up the message and refresh values
        var _g = message.split(";")
        var ACount = _g[0].split(':')[1];
        var BCount = _g[1].split(':')[1];
        var CCount = _g[2].split(':')[1];
        $("#pGroupA").text(ACount);
        $("#pGroupB").text(BCount);
        $("#pGroupC").text(CCount);

        //when the count is within the warning range of the limit, draw attention to the value
        // todo: refactor this junk...
        if (ACount >= (ALimit - WarnLimit)) {
            $("#pGroupA").css("font-weight", "bold");
            var _str = $("#pGroupA").text();
            _str = "! " + _str + " !";
            $("#pGroupA").text(_str);
        }
        else {
            $("#pGroupA").css("font-weight", "normal");
        }
        if (BCount >= (BLimit - WarnLimit)) {
            $("#pGroupB").css("font-weight", "bold");
            var _str = $("#pGroupB").text();
            _str = "! " + _str + " !";
            $("#pGroupB").text(_str);
        }
        else {
            $("#pGroupB").css("font-weight", "normal");
        }
        if (CCount >= (CLimit - WarnLimit)) {
            $("#pGroupC").css("font-weight", "bold");
            var _str = $("#pGroupC").text();
            _str = "! " + _str + " !";
            $("#pGroupC").text(_str);
        }
        else {
            $("#pGroupC").css("font-weight", "normal");
        }

    }; 
        
    $(document).ready(function () {
        //div click jquery handlers
        $('#divGroupA').click(function (e) {
            myHub.server.increment("GroupA");
        });
        $('#divGroupB').click(function (e) {
            myHub.server.increment("GroupB");
        });
        $('#divGroupC').click(function (e) {
            myHub.server.increment("GroupC");
        });

        //Button click jquery handlers
        $("#btnGroupA").click(function () {
            myHub.server.increment("GroupA");
        });
        $("#btnGroupB").click(function () {
            myHub.server.increment("GroupB");
        });
        $("#btnGroupC").click(function () {
            myHub.server.increment("GroupC");
        });

        $("#btnAdminGroupA").click(function () {
            var _hidVal = $("#hidIn").val();
            myHub.server.decrement("GroupA", _hidVal);
        });
        $("#btnAdminGroupB").click(function () {
            var _hidVal = $("#hidIn").val();
            myHub.server.decrement("GroupB", _hidVal);
        });
        $("#btnAdminGroupC").click(function () {
            var _hidVal = $("#hidIn").val();
            myHub.server.decrement("GroupC", _hidVal);
        });
    });
       
    // Load the current counts when the hub is ready
    $.connection.hub.start().done(function () {
        myHub.server.hello();
    });
}());