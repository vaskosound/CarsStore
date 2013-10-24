window.viewsFactory = (function () {
    var rootUrl = "Scripts/Views/";

    var templates = {};

    function getTemplate(name) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            if (templates[name]) {
                resolve(templates[name]);
            }
            else {
                $.ajax({
                    url: rootUrl + name + ".html",
                    type: "GET",
                    success: function (templateHtml) {
                        templates[name] = templateHtml;
                        resolve(templateHtml);
                    },
                    error: function (err) {
                        reject(err);
                    }
                });
            }
        });
        return promise;
    }

    function getLoginView() {
        return getTemplate("login");
    }
    
    function getRegisterView() {
        return getTemplate("register");
    }

    function getAllCarsView() {
        return getTemplate("all-cars");
    }

    function getCarView() {
        return getTemplate("car-details");
    }

    function getSearchView() {
        return getTemplate("search");
    }

    function getAddCarView() {
        return getTemplate("add");
    }
    
    function getUsersView() {
        return getTemplate("admin");
    }

    return {
        getLoginView: getLoginView,
        getRegisterView: getRegisterView,
        getAllCarsView: getAllCarsView,
        getSearchView: getSearchView,
        getCarView: getCarView,
        getAddCarView: getAddCarView,
        getUsersView: getUsersView
    };
}());