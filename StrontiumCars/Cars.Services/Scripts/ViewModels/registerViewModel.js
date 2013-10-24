window.viewModelFactory = window.viewModelFactory || {};

(function (factory) {
    var getRegisterViewModel = function (success) {
        var registerViewModel = {
            username: "",
            password: "",
            displayName: "",
            mail: "",
            phone: "",
            location: "",
            register: function () {
                var persister = persisters.getPersister();
                persister.user.register({
                    username: this.get("username"),
                    password: this.get("password"),
                    displayName: this.get("displayName"),
                    mail: this.get("mail"),
                    phone: this.get("phone"),
                    location: this.get("location")
                }).then(function (data) {
                    console.log(data);
                    success();
                }, function (error) {
                    console.log(error);
                });
            }
        };

        return kendo.observable(registerViewModel);
    };
    
    factory.getRegisterViewModel = getRegisterViewModel;

})(window.viewModelFactory);