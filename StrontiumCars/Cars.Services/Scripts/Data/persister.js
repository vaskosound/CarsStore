var persisters = (function () {

    var storeData = function (data) {
        localStorage.setItem("sessionKey", data.sessionKey);
        localStorage.setItem("displayName", data.displayName);
        localStorage.setItem("userType", data.userType);
    };

    var clearData = function () {
        localStorage.removeItem("sessionKey");
        localStorage.removeItem("displayName");
        localStorage.removeItem("userType");
    };

    var getSessionKey = function () {
        return localStorage.getItem("sessionKey");
    };

    var getSessionKeyHeader = function() {
        var key = getSessionKey();
        return {
            "X-sessionKey": key
        };
    };

    var getDisplayName = function () {
        return localStorage.getItem("displayName");
    };

    var getUserType = function() {
        return localStorage.getItem("userType");
    };

    var MainPersister = Class.create({
        init: function (rootUrl) {
            this.rootUrl = rootUrl;
            this.user = new UserPersister(this.rootUrl);
            this.cars = new CarsPersister(this.rootUrl);
        },
        isLoggedIn: function () {
            return !!(getSessionKey() && getDisplayName());
        },
        getDisplayName: function () {
            return getDisplayName();
        },
        getUserType: function() {
            return getUserType();
        }
    });

    var UserPersister = Class.create({
        init: function (rootUrl) {
            this.rootUrl = rootUrl + 'users/';
        },
        displayName: function () {
            return getDisplayName();
        },
        getAll: function () {
            var header = getSessionKeyHeader();
            return httpRequester.getJSON(this.rootUrl + "all", header);
        },
        login: function (user) {
            var url = this.rootUrl + 'login/';
            var userData =
            {
                username: user.username,
                authCode: CryptoJS.SHA1(user.password).toString()
            };

            return httpRequester.postJSON(url, userData).then(
                function (data) {
                    storeData(data);
                    return data;
                },
                function (error) {
                    console.log(error);
                });
        },
        register: function (user) {
            var url = this.rootUrl + 'register/';
            var userData =
            {
                username: user.username,
                authCode: CryptoJS.SHA1(user.password).toString(),
                displayName: user.displayName,
                mail: user.mail,
                phone: user.phone,
                location: user.location,
            };

            return httpRequester.postJSON(url, userData).then(function (data) {
                storeData(data);
                return data;
            }, function (data) {
                return data;
            });
        },
        logout: function (success) {
            var url = this.rootUrl + "logout/";

            var data = {
                SessionKey: getSessionKey()
            };
            
            return httpRequester.putJSON(url, data).then(
                function (responseData) {
                    console.log(responseData);
                    clearData();
                    success();
                },
                function (error) {
                    return error;
                });
        }
    });

    var CarsPersister = Class.create({
        init: function(rootUrl) {
            this.rootUrl = rootUrl + 'cars/';
        },
        getAll: function() {
            var header = getSessionKeyHeader();
            return httpRequester.getJSON(this.rootUrl + "all", header);
        },
        addCar: function (car) {
            var url = this.rootUrl + "create";
            var header = getSessionKeyHeader();
            return httpRequester.postJSON(url, car, header);
        },
        search: function(data) {

            var searchData = {
                Maker: data.maker,
                Model: data.mode,
                StartYear: data.startyear,
                EndYear: data.endyear,
                StartHp: data.startHp,
                EndHp: data.endHp,
                Engine: data.engine,
                Gear: data.gerar
            };
            var header = getSessionKeyHeader();

            return httpRequester.postJSON(this.rootUrl + "search", searchData, header);
        },
        getCarById: function(id) {
            var header = getSessionKeyHeader();
            return httpRequester.getJSON(this.rootUrl + "single/" + id, header);
        }
    });

    var mainPersister;

    return {
        getPersister: function () {
            return mainPersister || new MainPersister(window.apiRootUrl);
        }
    };
}());