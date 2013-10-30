window.viewModelFactory = window.viewModelFactory || {};

(function (factory) {
    var getMyCarsViewModel = function (success) {
        var persister = persisters.getPersister();        
        return persister.cars.getMyCars()
            .then(function (cars) {
                var gridSourceDataSource = new kendo.data.DataSource({
                    data: cars
                });
                var myCarsViewModel = {
                    gridSource: gridSourceDataSource,
                    deleteCar: function (ev) {
                        var self = this;
                        var id = ev.target.id;
                        persister.cars.deleteCar(id)
                            .then(function (newData) {
                                console.log(newData);
                                gridSourceDataSource.fetch(function () {
                                    gridSourceDataSource.data(newData);
                                });
                            }, function (error) {
                                console.log(error);
                            });
                    },
                    editCar: function (ev) {
                        ev.preventDefault();

                        var id = ev.target.id;
                        success(id);
                    }
                };
                return kendo.observable(myCarsViewModel);
            });
    };

    factory.getMyCarsViewModel = getMyCarsViewModel;

})(window.viewModelFactory);