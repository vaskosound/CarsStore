window.viewModelFactory = window.viewModelFactory || {};

(function (factory) {
    var getEditUserViewModel = function (id, success) {
        var persister = persisters.getPersister();
        return persister.user.getUser(id)
            .then(function (user) {
                var editUserViewModel = {
                    username: user.Username,
                    mail: user.Mail,
                    phone: user.Phone,
                    location: user.Location,
                    userType: user.UserType,
                    editUser: function () {
                        var self = this;
                        var editDTO = {
                            username: this.get("username"),
                            mail: this.get("mail"),
                            phone: this.get("phone"),
                            location: this.get("location"),
                            userType: this.get("userType")
                        }
                        persister.user.editUser(id, editDTO)
                            .then(function (data) {
                                console.log(data);
                                success();
                            }, function (error) {
                                console.log(error);
                                $('#error-message').append('<div id="alertdiv" class="alert alert-error"><span>' + error.responseJSON.Message + '</span></div>');
                                setTimeout(function () {
                                    $("#alertdiv").remove();
                                }, 3000);
                            });
                    }
                };
                return kendo.observable(editUserViewModel);
            });
    };

    factory.getEditUserViewModel = getEditUserViewModel;

})(window.viewModelFactory);