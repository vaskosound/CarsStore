window.viewModelFactory = window.viewModelFactory || {};

(function (factory) {
    var getMyCarsViewModel = function () {
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
                                console.log(gridSource);
                            }, function (error) {
                                console.log(error);
                            });
                    }
                };
                return kendo.observable(myCarsViewModel);
            });
    };

    factory.getMyCarsViewModel = getMyCarsViewModel;

})(window.viewModelFactory);