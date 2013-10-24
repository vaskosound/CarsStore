window.viewModelFactory = window.viewModelFactory || {};

(function (factory) {
    var getAllUsersViewModel = function (data) {
        
        var allUsersViewModel = {
            gridSource: data
        };

        return kendo.observable(allUsersViewModel);
    };

    factory.getAllUsersViewModel = getAllUsersViewModel;

})(window.viewModelFactory);