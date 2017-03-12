
(function() {
var splash = $('.splashscreen-overlay')
    welcome = $('#welcomePage'),
    evSelect = $('#eventSelection'),
    evResult = $('#eventResult'),
    activityItem = $('.select-activity-item'),
    otherOpt = $('#otherOptions'),
    moreOpt = $('#moreOptions');


    var hideSplashscreen = function() {
        splash.addClass('hide');
    }
    
    var showOtherEvents = function() {

    };

    otherOpt.on('click', showOtherEvents());



    setTimeout(hideSplashscreen(), 4000);

    
}());