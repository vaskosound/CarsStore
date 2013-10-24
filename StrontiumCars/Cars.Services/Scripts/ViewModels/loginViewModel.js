window.viewModelFactory = window.viewModelFactory || {};

(function (factory) {
    var getLoginViewModel = function (success) {

        var loginViewModel = {
            username: "",
            password: "",
          
            login: function () {
                var persister = persisters.getPersister();
                persister.user.login({
                    username: this.get("username"),
                    password: this.get("password"),
                }).then(function (data) {
                    console.log(data);
                    success();
                }, function (error) {
                    console.log(error);
                });
            }
        };

        return kendo.observable(loginViewModel);
    };

    factory.getLoginViewModel = getLoginViewModel;
   
})(window.viewModelFactory);