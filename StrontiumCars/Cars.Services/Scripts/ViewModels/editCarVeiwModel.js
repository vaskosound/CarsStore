window.viewModelFactory = window.viewModelFactory || {};

(function (factory) {
    var getEditCarViewModel = function (id, success) {
        function isInArray(array, search) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].Name == search) {
                    return true;
                }
            }
            return false;
        }
        var persister = persisters.getPersister();
        return persister.cars.getCarById(id)
            .then(function (car) {
                var editCarViewModel = {
                    maker: car.Maker,
                    model: car.Model,
                    productionYear: new Date(car.ProductionYear + ""),
                    price: car.Price,
                    engine: car.Engine,
                    gear: car.Gear,
                    hp: car.HP,
                    mileage: car.Mileage,
                    doors: car.Doors,
                    fuelType: car.FuelType,
                    engineVolume: car.EngineVolume,
                    imageUrl: car.ImageUrl,
                    airConditioning: isInArray(car.Extras, "Air conditioning"),
                    climatronic: isInArray(car.Extras, "Climatronic"),
                    leather: isInArray(car.Extras, "Leather saloon"),
                    electricWindows: isInArray(car.Extras, "Electric windows"),
                    electricMirrors: isInArray(car.Extras, "Electric mirrors"),
                    electricSeats: isInArray(car.Extras, "Electric seats"),
                    sunroof: isInArray(car.Extras, "Sunroof"),
                    steroSystem: isInArray(car.Extras, "Stereo system"),
                    aluminiumRims: isInArray(car.Extras, "Aluminium rims"),
                    dvd: isInArray(car.Extras, "DVD/TV"),
                    multifunctionalSteeringWheel: isInArray(car.Extras, "Multifunctional steering wheel"),
                    seatsHeating: isInArray(car.Extras, "Seats heating"),
                    awd: isInArray(car.Extras, "4x4"),
                    abs: isInArray(car.Extras, "ABS"),
                    esp: isInArray(car.Extras, "ESP"),
                    airbag: isInArray(car.Extras, "Airbag"),
                    xenon: isInArray(car.Extras, "Xenon"),
                    halogen: isInArray(car.Extras, "Halogen"),
                    asr: isInArray(car.Extras, "ASR"),
                    parktronic: isInArray(car.Extras, "Parktronic"),
                    alarm: isInArray(car.Extras, "Alarm"),
                    immobilizer: isInArray(car.Extras, "Immobilizer"),
                    insurance: isInArray(car.Extras, "Insurance"),
                    armour: isInArray(car.Extras, "Armour"),
                    tiptronic: isInArray(car.Extras, "Tiptronic"),
                    autopilot: isInArray(car.Extras, "Autopilot"),
                    servo: isInArray(car.Extras, "Servo steering"),
                    computer: isInArray(car.Extras, "On board computer"),
                    guarantee: isInArray(car.Extras, "Guarantee"),
                    navigation: isInArray(car.Extras, "Navigation"),
                    rightSteeringWheel: isInArray(car.Extras, "Right steering wheel"),
                    tuning: isInArray(car.Extras, "Tuning"),
                    taxi: isInArray(car.Extras, "Taxi"),
                    retro: isInArray(car.Extras, "Retro"),
                    refrigerator: isInArray(car.Extras, "Refrigerator"),
                    military: isInArray(car.Extras, "Military"),
                    extras: [], //just name {name: "name"}
                    editCar: function () {
                        var self = this;
                        self.set("extras", []);
                        //comfort
                        (function () {
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
                        var prodYear = this.get("productionYear");
                        prodYear = prodYear == undefined ? undefined : prodYear.getFullYear();
                        var addDTO = {
                            maker: this.get("maker"),
                            model: this.get("model"),
                            productionYear: prodYear,
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
                        persister.cars.editCar(id, addDTO)
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
                return kendo.observable(editCarViewModel);
            });
    };

    factory.getEditCarViewModel = getEditCarViewModel;

})(window.viewModelFactory);