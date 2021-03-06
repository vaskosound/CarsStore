﻿window.viewsFactory = (function () {
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

    function getMyCarsView() {
        return getTemplate("my-cars");
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

    function getEditCarView() {
        return getTemplate("edit");
    }
    
    function getUsersView() {
        return getTemplate("admin");
    }

    function getEditUserView() {
        return getTemplate("editUser");
    }

    return {
        getLoginView: getLoginView,
        getRegisterView: getRegisterView,
        getAllCarsView: getAllCarsView,
        getMyCarsView: getMyCarsView,
        getSearchView: getSearchView,
        getCarView: getCarView,
        getAddCarView: getAddCarView,
        getEditCarView: getEditCarView,
        getUsersView: getUsersView,
        getEditUserView: getEditUserView
    };
}());