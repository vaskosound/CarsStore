window.viewModelFactory = window.viewModelFactory || {};

(function (factory) {
    var getAllCarsViewModel = function (data) {
        
        var allCarsViewModel = {
            gridSource: data
        };

        return kendo.observable(allCarsViewModel);
    };

    factory.getAllCarsViewModel = getAllCarsViewModel;

})(window.viewModelFactory);