function AppViewModel() {

    this.searchCriteria = ko.observable("bill");
    this.results = ko.observable();
    this.isValid = function () {
        return this.searchCriteria().length > 0;
    };

    this.search = function () {

        var script = $("<script src='https://rcmdemo.boardex.com/dataservices/IndividualService.svc/jsonp/names/?apiKey=32449927-4cc5-41ad-ba82-bd72510591ac&criteria=" + this.searchCriteria() + "&format=json&successCallback=x.searchResponse'></script>");
        $("head").append(script);
    };


    this.searchResponse = function(responseString) {
        this.results($.parseJSON(responseString));
        alert(this.results().Count);
    };

    
}





// Activates knockout.js
var x = new AppViewModel();
ko.applyBindings(x);