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

    // Client method to broadcast the message
    myHub.client.hello = function (message) {
        $("#message").text(message);
    };

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
        myHub.server.decrement("GroupA","aoiuajPYUQ4J;L18793214hja");
    });
    $("#btnAdminGroupB").click(function () {
        myHub.server.decrement("GroupB","aoiuajPYUQ4J;L18793214hja");
    });
    $("#btnAdminGroupC").click(function () {
        myHub.server.decrement("GroupC", "aoiuajPYUQ4J;L18793214hja");
    });



    // Load the current counts when the hub is ready
    $.connection.hub.start().done(function () {
        myHub.server.hello();
    });
}());