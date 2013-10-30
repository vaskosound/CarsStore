window.viewModelFactory = window.viewModelFactory || {};

(function (factory) {
    var getAllUsersViewModel = function (success) {
        var persister = persisters.getPersister();
        return persister.user.getAll()
            .then(function (users) {
                var gridSourceDataSource = new kendo.data.DataSource({
                    data: users
                });
                var allUsersViewModel = {
                    gridSource: gridSourceDataSource,
                    deleteUser: function (ev) {
                        var self = this;
                        var id = ev.target.id;
                        persister.user.deleteUser(id)
                            .then(function (newData) {
                                console.log(newData);
                                gridSourceDataSource.fetch(function () {
                                    gridSourceDataSource.data(newData);
                                });
                            }, function (error) {
                                console.log(error);
                            });
                    },
                    editUser: function (ev) {
                        ev.preventDefault();

                        var id = ev.target.id;
                        success(id);
                    }
                };
                return kendo.observable(allUsersViewModel);
            });
    };
    factory.getAllUsersViewModel = getAllUsersViewModel;

})(window.viewModelFactory);