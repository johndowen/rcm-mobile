function AppViewModel() {

    this.searchCriteria = ko.observable("bill");
    this.results = ko.observable();
    this.errorx = ko.observable();
    this.logLastStep = ko.observable();
    
    this.isValid = function () {
        return this.searchCriteria().length > 0;
    };

    this.search = function () {
        this.logLastStep("About to Search");
        var script = $("<script src='https://rcmdemo.boardex.com/dataservices/IndividualService.svc/jsonp/names/?apiKey=32449927-4cc5-41ad-ba82-bd72510591ac&criteria=" + this.searchCriteria() + "&format=json&successCallback=x.searchResponse&errorCallback=x.errorResponse'></script>");
        $("head").append(script);
        this.logLastStep("Search Request Sent");
    };

    this.searchResponse = function(responseString) {
        this.logLastStep("Success Response Received");
        this.results($.parseJSON(responseString));
    };

    this.errorResponse = function (responseString) {
        this.logLastStep("Error Response Received");
        this.errorx($.parseJSON(responseString));
    };
}

// Activates knockout.js
var x = new AppViewModel();
ko.applyBindings(x);