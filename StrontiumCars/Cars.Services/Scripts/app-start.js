/// <reference path="libs/_references.js" />

(function () {
    var router = new kendo.Router();
    var layout = new kendo.Layout("layout-template");
    var menu;
    var mainContentContainer;
    var registerLoginContainer;
    var logoutButton;

    var notLoggedDataSource = [{
        text: "Home",
        url: "#/home"
    }];

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
        }];

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
                router.navigate('/cars');
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
                    //$("#car-details").kendoTreeView({
                    //    template: kendo.template($("#car-template").html()),
                    //    dataSource: vm
                    //}); 
                });
        });
    });

    router.route("/admin", function (id) {
        clearMainContainer();
        if (globalPersister.getUserType() !== "0") {
        } else {
            loginPageCheck();
            viewsFactory.getUsersView().then(function (allUsersView) {
                var view = new kendo.View(allUsersView);
                var persister = persisters.getPersister();
                persister.user.getAll().then(function (data) {
                    console.log(data);
                    layout.showIn("#main-content", view);
                    $("#grid1").kendoGrid({
                        dataSource: data,
                        rowTemplate: kendo.template($("#rowTemplate1").html()),
                    });
                });
            });
        }
    });

    function clearMainContainer() {
        document.getElementById('main-content').innerHTML = "";
    }

    function loginPageCheck() {
        if (globalPersister.isLoggedIn()) {
            registerLoginContainer.style.display = "none";
            mainContentContainer.classList.remove('span8');
            mainContentContainer.classList.add('span12');
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
        var container = $('header > nav ul');
        var button = $('<button id="logoutButton"></button>');
        button.addClass("btn");
        button.addClass("btn-danger");
        button.addClass("pull-right");
        button.html("Logout");
        container.append(button);
    }

    function handleMenuTemplate() {
        var persister = persisters.getPersister();
        var menuContent = $("#menuContainer").data("kendoMenu");

        var len = menuContent.element.children('li').length - 1;
        for (var i = 0; i < len; i++) {
            var item = menuContent.element;
            item = item.children("li").eq(1);
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

            var persister = persisters.getPersister();
            persister.user.logout(function () {
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

