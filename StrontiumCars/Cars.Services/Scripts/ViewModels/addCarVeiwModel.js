window.viewModelFactory = window.viewModelFactory || {};

(function (factory) {
    var getAddCarViewModel = function (success) {
        var addCarViewModel = {
            maker: "",
            model: "",
            productionYear: undefined,
            price: undefined,
            engine: "",
            gear: "",
            hp: undefined,
            mileage: undefined,
            doors: "",
            fuelType: "",
            engineVolume: undefined,
            imageUrl: "",
            airConditioning: false,
            climatronic: false,
            leather: false,
            electricWindows: false,
            electricMirrors: false,
            electricSeats: false,
            sunroof: false,
            steroSystem: false,
            aluminiumRims: false,
            dvd: false,
            multifunctionalSteeringWheel: false,
            seatsHeating: false,
            awd: false,
            abs: false,
            esp: false,
            airbag: false,
            xenon: false,
            halogen: false,
            asr: false,
            parktronic: false,
            alarm: false,
            immobilizer: false,
            insurance: false,
            armour: false,
            tiptronic: false,
            autopilot: false,
            servo: false,
            computer: false,
            guarantee: false,
            navigation: false,
            rightSteeringWheel: false,
            tuning: false,
            taxi: false,
            retro: false,
            refrigerator: false,
            military: false,
            extras: [], //just name {name: "name"}
            addCar: function () {
                var self = this;
                self.set("extras", []);
                //comfort
                (function(){
                    if (self.airConditioning) {
                        self.extras.push({ name: "Air conditioning" });
                    }
                    if (self.climatronic) {
                        self.extras.push({ name: "Climatronic" });
                    }
                    if (self.leather) {
                        self.extras.push({ name: "Leather saloon" });
                    }
                    if (self.electricWindows) {
                        self.extras.push({ name: "Electric windows" });
                    }
                    if (self.electricMirrors) {
                        self.extras.push({ name: "Electric mirrors" });
                    }
                    if (self.electircSeats) {
                        self.extras.push({ name: "Electric seats" });
                    }
                    if (self.sunroof) {
                        self.extras.push({ name: "Sunroof" });
                    }
                    if (self.steroSystem) {
                        self.extras.push({ name: "Stereo system" });
                    }
                    if (self.aluminiumRims) {
                        self.extras.push({ name: "Aluminium rims" });
                    }
                    if (self.dvd) {
                        self.extras.push({ name: "DVD/TV" });
                    }
                    if (self.multifunctionalSteeringWheel) {
                        self.extras.push({ name: "Multifunctional steering wheel" });
                    }
                    if (self.seatsHeating) {
                        self.extras.push({ name: "Seats heating" });
                    }
                })();
                //security
                (function () {
                    if (self.awd) {
                        self.extras.push({ name: "4x4" });
                    }
                    if (self.abs) {
                        self.extras.push({ name: "ABS" });
                    }
                    if (self.esp) {
                        self.extras.push({ name: "ESP" });
                    }
                    if (self.airbag) {
                        self.extras.push({ name: "Aibags" });
                    }
                    if (self.xenon) {
                        self.extras.push({ name: "Xenon" });
                    }
                    if (self.halogen) {
                        self.extras.push({ name: "Halogen" });
                    }
                    if (self.asr) {
                        self.extras.push({ name: "ASR" });
                    }
                    if (self.parktronic) {
                        self.extras.push({ name: "Parktronic" });
                    }
                    if (self.alarm) {
                        self.extras.push({ name: "Alarm" });
                    }
                    if (self.immobilizer) {
                        self.extras.push({ name: "Immobilizer" });
                    }
                    if (self.insurance) {
                        self.extras.push({ name: "Insurance" });
                    }
                    if (self.armour) {
                        self.extras.push({ name: "Armoured vehicle" });
                    }
                })();
                //others
                (function () {
                    if (self.tiptronic) {
                        self.extras.push({ name: "Tiptronic" });
                    }
                    if (self.autopilot) {
                        self.extras.push({ name: "Autopilot" });
                    }
                    if (self.servo) {
                        self.extras.push({ name: "Servo steering" });
                    }
                    if (self.computer) {
                        self.extras.push({ name: "On board computer" });
                    }
                    if (self.guarantee) {
                        self.extras.push({ name: "Guarantee" });
                    }
                    if (self.navigation) {
                        self.extras.push({ name: "Navigation" });
                    }
                    if (self.rightSteeringWheel) {
                        self.extras.push({ name: "Right steering wheel" });
                    }
                    if (self.tuning) {
                        self.extras.push({ name: "Tuning" });
                    }
                    if (self.taxi) {
                        self.extras.push({ name: "Taxi" });
                    }
                    if (self.retro) {
                        self.extras.push({ name: "Retro" });
                    }
                    if (self.refrigerator) {
                        self.extras.push({ name: "Refrigerator" });
                    }
                    if (self.military) {
                        self.extras.push({ name: "Military" });
                    }
                })();
                var addDTO = {
                    maker: this.get("maker"),
                    model: this.get("model"),
                    productionYear: this.get("productionYear") == undefined ? undefined : this.get("productionYear").getFullYear(),
                    price: this.get("price"),
                    engine: this.get("engine"),
                    gear: this.get("gear"),
                    hp: this.get("hp"),
                    mileage: this.get("mileage"),
                    doors: this.get("doors"),
                    fuelType: this.get("fuelType"),
                    engineVolume: this.get("engineVolume"),
                    imageUrl: this.get("imageUrl"),
                    extras: this.get("extras")
                }
                var persister = persisters.getPersister();
                persister.cars.addCar(addDTO)
                    .then(function (data) {
                    console.log(data);
                    $("#error-message").text("");
                    success();
                }, function (error) {
                    console.log(error);
                    $("#error-message").text(error.responseJSON.Message);
                });
            }
        };

        return kendo.observable(addCarViewModel);
    };

    factory.getAddCarViewModel = getAddCarViewModel;

})(window.viewModelFactory);