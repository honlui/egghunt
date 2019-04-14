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

    var ALimit = 100, BLimit = 120, CLimit = 60;
    var WarnLimit = 10;
    $("#pGroupATotal").text(ALimit);
    $("#pGroupBTotal").text(BLimit);
    $("#pGroupCTotal").text(CLimit);

    $("a#lGroupALimit").text(ALimit);
    $("a#lGroupBLimit").text(BLimit);
    $("a#lGroupCLimit").text(CLimit);

    // Client method to broadcast the message
    myHub.client.hello = function (message) {
        //save message into hidden field for debugging
        $("#message").text(message);
        
        //split up the message and refresh values
        var _g = message.split(";")
        var ACount = _g[0].split(':')[1];
        var BCount = _g[1].split(':')[1];
        var CCount = _g[2].split(':')[1];
        //$("#pGroupA").text(ACount);
        //$("#pGroupB").text(BCount);
        //$("#pGroupC").text(CCount);

        $("a#lGroupACount").text(ACount);
        $("a#lGroupBCount").text(BCount);
        $("a#lGroupCCount").text(CCount);

        //when the count is within the warning range of the limit, draw attention to the value
        // todo: refactor this junk...
        if (ACount >= (ALimit - WarnLimit)) {
            $("#lGroupACount").css("font-weight", "bold");
            var _str = $("#lGroupACount").text();
            _str = "! " + _str + " !";
            $("#lGroupACount").text(_str);
        }
        else {
            $("#lGroupACount").css("font-weight", "normal");
        }
        if (BCount >= (BLimit - WarnLimit)) {
            $("#lGroupBCount").css("font-weight", "bold");
            var _str = $("#lGroupBCount").text();
            _str = "! " + _str + " !";
            $("#lGroupBCount").text(_str);
        }
        else {
            $("#lGroupBCount").css("font-weight", "normal");
        }
        if (CCount >= (CLimit - WarnLimit)) {
            $("#lGroupCCount").css("font-weight", "bold");
            var _str = $("#pGroupC").text();
            _str = "! " + _str + " !";
            $("#lGroupCCount").text(_str);
        }
        else {
            $("#lGroupCCount").css("font-weight", "normal");
        }

    }; 
        
    $(document).ready(function () {
        
        //link click jquery handlers
        $('#lGroupAI').click(function (e) {
            myHub.server.increment("GroupA");
        });
        $('#lGroupBI').click(function (e) {
            myHub.server.increment("GroupB");
        });
        $('#lGroupCI').click(function (e) {
            myHub.server.increment("GroupC");
        });        
        $("#lGroupAD").click(function () {
            var _hidVal = $("#hidIn").val();
            myHub.server.decrement("GroupA", _hidVal);
        });
        $("#lGroupBD").click(function () {
            var _hidVal = $("#hidIn").val();
            myHub.server.decrement("GroupB", _hidVal);
        });
        $("#lGroupCD").click(function () {
            var _hidVal = $("#hidIn").val();
            myHub.server.decrement("GroupC", _hidVal);
        });

        //div click jquery handlers
        //$('#divGroupA').click(function (e) {
        //    myHub.server.increment("GroupA");
        //});
        //$('#divGroupB').click(function (e) {
        //    myHub.server.increment("GroupB");
        //});
        //$('#divGroupC').click(function (e) {
        //    myHub.server.increment("GroupC");
        //});

        ////Button click jquery handlers
        //$("#btnGroupA").click(function () {
        //    myHub.server.increment("GroupA");
        //});
        //$("#btnGroupB").click(function () {
        //    myHub.server.increment("GroupB");
        //});
        //$("#btnGroupC").click(function () {
        //    myHub.server.increment("GroupC");
        //});

        //$("#btnAdminGroupA").click(function () {
        //    var _hidVal = $("#hidIn").val();
        //    myHub.server.decrement("GroupA", _hidVal);
        //});
        //$("#btnAdminGroupB").click(function () {
        //    var _hidVal = $("#hidIn").val();
        //    myHub.server.decrement("GroupB", _hidVal);
        //});
        //$("#btnAdminGroupC").click(function () {
        //    var _hidVal = $("#hidIn").val();
        //    myHub.server.decrement("GroupC", _hidVal);
        //});
    });
       
    // Load the current counts when the hub is ready
    $.connection.hub.start().done(function () {
        myHub.server.hello();
    });
}());