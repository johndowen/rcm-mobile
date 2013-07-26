function AppViewModel() {

    var self = this;
    var rcmDemoApiKey = "32449927-4cc5-41ad-ba82-bd72510591ac";
    var rcmDemoRoot = "rcmdemo.boardex.com";
    var alphaApiKey = "AA5C2D5B-D128-4BB4-AAC5-C778C7BECD17";
    var alphaRoot = "alpharcmoutput";
    //var localApiKey = "AA5C2D5B-D128-4BB4-AAC5-C778C7BECD17";
    var localApiKey = "eb83b426-dc6d-4813-82b7-0ac8bbce345f";
    //var localRoot = "mdl0158.mdlimited.com";
    var localRoot = "systemdl.boardex.com";

    this.searchCriteria = ko.observable("bill");
    this.results = ko.observable();
    this.lastError = ko.observable();
    this.logLastStep = ko.observable();
    this.searchCount = ko.observable();

    this.isValid = function () {
        return this.searchCriteria().length > 0;
    };

    this.searchOld = function () {
        this.logLastStep("About to Search");
        
        var url = buildSearchUrl(localRoot, localApiKey, this.searchCriteria());
        var script = $("<script src='" + url + "'></script>");
        $("head").append(script);
        
        this.logLastStep("Search Request Sent");
    };
    
    this.search = function () {
        self.logLastStep("About to Search");
        self.searchCount(self.searchCount() + 1);

        var url = buildSearchUrl(localRoot, localApiKey, this.searchCriteria());

        $.ajax(
            {
                url: url
            }).done(function (response) {
                self.logLastStep("Success Response Received - " + response.Count);
                
                try {
                    //$("body").text(response.Count);
                    self.results(response);
                } catch(e) {
                    self.logLastStep("Error");
                } 

            }).fail(function (error)
            {
                self.logLastStep("Error Response Received - " + error.status + " - " + error.statusText);
            });

        this.logLastStep("Search Request Sent");
    };

    this.searchResponse = function(responseString) {
        this.logLastStep("Success Response Received");
        this.results($.parseJSON(responseString));
    };

    this.errorResponse = function (responseString) {
        this.logLastStep("Error Response Received");
        this.lastError($.parseJSON(responseString));
    };
    
    function buildSearchUrl(root, apiKey, criteria) {
        return "https://"
            + root
            + "/dataservices/IndividualService.svc/names/?apiKey="
            + apiKey 
            + "&criteria="
            + criteria
            //+ "&format=json&successCallback=x.searchResponse&errorCallback=x.errorResponse";
            + "&format=json";
    }

    self.searchCount(0);
}

// Activates knockout.js
var x = new AppViewModel();
ko.applyBindings(x);