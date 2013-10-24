window.viewModelFactory = window.viewModelFactory || {};

(function (factory) {
    var getCarViewModel = function (id) {
        var persister = persisters.getPersister();
        return persister.cars.getCarById(id)
            .then(function (car) {
                var carViewModel = {
                    carSource: car
                };
                return kendo.observable(carViewModel);
            });
    };

    factory.getCarViewModel = getCarViewModel;

})(window.viewModelFactory);