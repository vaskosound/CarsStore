﻿/// <reference path="libs/_references.js" />

(function () {
    var router = new kendo.Router();
    var layout = new kendo.Layout("layout-template");
    var menu;
    var mainContentContainer;
    var registerLoginContainer;
    var logoutButton;

    var notLoggedDataSource = [
        {
            text: "Home",
            url: "#/home"
        },
        {
            text: "About",
            url: "#/about"
        }
    ];

    var adminDataSource = [
        {
            text: "Search",
            url: "#/search"
        },
        {
            text: "Watchlist",
            url: "#/watch"
        },
        {
            text: "Cars",
            url: "#/cars"
        },
        {
            text: "Admin Panel",
            url: "#/admin"
        }];

    var dealerDataSource = [
        {
            text: "Search",
            url: "#/search"
        },
        {
            text: "Watchlist",
            url: "#/watch"
        },
        {
            text: "Cars",
            url: "#/cars"
        },
        {
            text: "Add Car",
            url: "#/add"
        },
        {
            text: "My Cars",
            url: "#/my-cars"
        }
    ];

    var userDataSource = [
       {
           text: "Search",
           url: "#/search"
       },
       {
           text: "Watchlist",
           url: "#/watch"
       },
       {
           text: "Cars",
           url: "#/cars"
       }];

    router.route("/", function () {
        loginPageCheck();
        clearMainContainer();
        handleMenuTemplate();

        router.navigate("/home");
    });

    router.route("/home", function () {
        clearMainContainer();
        loginPageCheck();
        handleMenuTemplate();
        $('#main-content').load('../Scripts/Views/home.html', function () {
        });

        viewsFactory.getLoginView().then(function (loginFormHTML) {
            var viewModel = viewModelFactory.getLoginViewModel(function () {
                loginPageCheck();
                handleMenuTemplate();
            });
            var view = new kendo.View(loginFormHTML, { model: viewModel });
            layout.showIn("#register-login", view);
        });
    });

    router.route("/about", function () {
        loginPageCheck();
        clearMainContainer();
        $('#main-content').load('../Scripts/Views/about.html', function () {
        });
    });

    router.route("/search", function () {
        loginPageCheck();
        clearMainContainer();
        viewsFactory.getSearchView().then(function (searchHTML) {
            var viewModel = viewModelFactory.getSearchViewModel();
            var view = new kendo.View(searchHTML, { model: viewModel });
            layout.showIn("#main-content", view);
            kendo.bind($("#search-form"), viewModel);
            $("#grid").kendoGrid({
                dataSource: viewModel.gridSource,
                rowTemplate: kendo.template($("#rowTemplate").html()),
            });
        });
    });

    router.route("/add", function () {
        loginPageCheck();
        clearMainContainer();
        viewsFactory.getAddCarView().then(function (addCarHTML) {
            var viewModel = viewModelFactory.getAddCarViewModel(function () {
                router.navigate('/my-cars');
            });
            var view = new kendo.View(addCarHTML, { model: viewModel });
            layout.showIn("#main-content", view);
            kendo.bind($("#add-car-form"), viewModel);
            var validator = $("#requiredCarData").kendoValidator().data("kendoValidator");
        });
    });


    router.route("/watch", function () {
        loginPageCheck();
        clearMainContainer();
        $('#main-content').load('../Scripts/Views/watchlist.html', function () {
        });
    });

    router.route("/cars", function () {
        loginPageCheck();
        clearMainContainer();
        viewsFactory.getAllCarsView().then(function (allCarsHtml) {
            var view = new kendo.View(allCarsHtml);
            var persister = persisters.getPersister();
            persister.cars.getAll().then(function (data) {
                console.log(data);
                layout.showIn("#main-content", view);
                $("#grid").kendoGrid({
                    dataSource: data,
                    rowTemplate: kendo.template($("#rowTemplate").html()),
                    
                });
            });
        });
    });

    router.route("/my-cars", function () {
        loginPageCheck();
        clearMainContainer();
        viewsFactory.getMyCarsView().then(function (myCarsHtml) {
            viewModelFactory.getMyCarsViewModel(function (id) {
                router.navigate("/cars/edit/" + id);
            }).then(function (vm) {
                    var view = new kendo.View(myCarsHtml,
                        { model: vm });
                    layout.showIn("#main-content", view);
                    $("#grid").kendoGrid({
                        dataSource: vm.gridSource,
                        rowTemplate: kendo.template($("#rowTemplate").html()),
                    });
                    kendo.bind($("#example"), vm);
                });
        });
    });

    router.route("/cars/single/:id", function (id) {
        loginPageCheck();
        clearMainContainer();
        viewsFactory.getCarView().then(function (carViewHtml) {
            viewModelFactory.getCarViewModel(id)
                .then(function (vm) {
                    var view =
                        new kendo.View(carViewHtml,
                        { model: vm });
                    layout.showIn("#main-content", view);
                 });
        });
    });

    router.route("/cars/edit/:id", function (id) {
        loginPageCheck();
        clearMainContainer();
        viewsFactory.getEditCarView().then(function (editCarHTML) {
            viewModelFactory.getEditCarViewModel(id, function () {
                router.navigate('/my-cars');
            }).then(function (viewModel) {
                var view = new kendo.View(editCarHTML,
                    { model: viewModel });
                layout.showIn("#main-content", view);
                kendo.bind($("#edit-car-form"), viewModel);
                var validator = $("#requiredCarData").kendoValidator().data("kendoValidator");
            });
        });
    });

    router.route("/admin", function () {
        clearMainContainer();
        if (globalPersister.getUserType() == "0") {
            loginPageCheck();
            viewsFactory.getUsersView().then(function (usersHtml) {
                viewModelFactory.getAllUsersViewModel(function (id) {
                    router.navigate("/users/edit/" + id);
                })
                    .then(function (vm) {
                        var view = new kendo.View(usersHtml,
                            { model: vm });
                        layout.showIn("#main-content", view);
                        $("#grid").kendoGrid({
                            dataSource:  vm.gridSource,                        
                            rowTemplate: kendo.template($("#rowTemplate").html()),
                        });
                        kendo.bind($("#admin-panel"), vm);
                    });
            });
        }
    });

    router.route("/users/edit/:id", function (id) {
        loginPageCheck();
        clearMainContainer();
        viewsFactory.getEditUserView().then(function (editUserHTML) {
            viewModelFactory.getEditUserViewModel(id, function () {
                router.navigate('/admin');
            }).then(function (viewModel) {
                var view = new kendo.View(editUserHTML,
                    { model: viewModel });
                layout.showIn("#main-content", view);
                kendo.bind($("#add-car-form"), viewModel);
                var validator = $("#requiredCarData").kendoValidator().data("kendoValidator");
            });
        });
    });

    function clearMainContainer() {
        document.getElementById('main-content').innerHTML = "";
    }

    function loginPageCheck() {
        if (globalPersister.isLoggedIn()) {
            registerLoginContainer.style.display = "none";
            mainContentContainer.classList.remove('span8');
            mainContentContainer.classList.add('span12');
            $("#loggedUser").text("Hi, " + globalPersister.getDisplayName());
            $('#logoutButton').show();

        } else {
            mainContentContainer.classList.remove('span12');
            mainContentContainer.classList.add('span8');
            registerLoginContainer.style.display = "block";
            $('#logoutButton').hide();
        }
        //router.navigate('/home');
    }

    function createLogoutButton() {
        var persister = persisters.getPersister();
        var container = $('header > nav ul');
        var loggedUser = $("<div id='logoutButton'></div>");
        var username = $('<span id="loggedUser"></span>');
        username.addClass("lead");
        var button = $('<button ></button>');
        button.addClass("btn");
        button.addClass("btn-danger");
        loggedUser.addClass("pull-right");
        button.html("Logout");
        loggedUser.append(username);
        loggedUser.append(button);
        container.append(loggedUser);
    }

    function handleMenuTemplate() {
        var persister = persisters.getPersister();
        var menuContent = $("#menuContainer").data("kendoMenu");

        var len = menuContent.element.children('li').length - 1;
        for (var i = 0; i < len; i++) {
            var item = menuContent.element;
            item = item.children("li").eq(2);
            var z = item;

            menuContent.remove(z);
        }

        var userType = persister.getUserType();
        if (userType === "0") {
            menuContent.append(
                adminDataSource
            );
        } else if (userType === "1") {
            menuContent.append(
                dealerDataSource
            );
        } else if (userType === "2") {
            menuContent.append(
                userDataSource
            );
        } else {
            //menuContent.append(
            //    notLoggedDataSource
            //);
        }
    }

    function attachEvents(selector) {
        selector.on('click', '#getLoginForm', function (ev) {
            ev.preventDefault();
            viewsFactory.getLoginView().then(function (loginFormHTML) {
                var viewModel = viewModelFactory.getLoginViewModel(function () {
                    loginPageCheck();
                    handleMenuTemplate();
                });
                var view = new kendo.View(loginFormHTML, { model: viewModel });
                layout.showIn("#register-login", view);
            });
        });

        selector.on('click', '#getRegisterForm', function (ev) {
            ev.preventDefault();
            $("#errors-log-reg").text("");
            viewsFactory.getRegisterView().then(function (registerFormHTML) {
                var viewModel = viewModelFactory.getRegisterViewModel(function () {
                    loginPageCheck();
                    handleMenuTemplate();
                    router.navigate('/');
                });
                var view = new kendo.View(registerFormHTML, { model: viewModel });
                layout.showIn("#register-login", view);
            });
        });

        selector.on('click', '#logoutButton', function (ev) {
            ev.preventDefault();

            globalPersister.user.logout(function () {
                router.navigate('/');
            });
        });

        selector.on('click', '.singleCarPage', function (ev) {
            ev.preventDefault();

            var id = ev.target.id;
            router.navigate("/cars/single/" + id);
        });
    }

    $(function () {
        layout.render($("#master-page"));
        attachEvents($("#master-page"));
        mainContentContainer = document.getElementById('main-content');
        registerLoginContainer = document.getElementById('register-login');
        logoutButton = document.getElementById('logoutButton');

        menu = $("#menuContainer").kendoMenu({
            dataSource: notLoggedDataSource
        });
        handleMenuTemplate();
        createLogoutButton();

        globalPersister = persisters.getPersister();
        router.start();
        router.navigate('/home');
    });

})();

