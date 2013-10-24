window.viewModelFactory = window.viewModelFactory || {};

(function (factory) {

    var getSearchViewModel = function () {

        var getMakers = function () {
            var manufacturerData = [];
            for (var i = 0; i < manufacturersAndModels.length; i++) {
                manufacturerData.push({ makerId: i, maker: manufacturersAndModels[i][0] });
            }

            return manufacturerData;
        };

        var getModels = function (selectedId) {
            var modelsData = [];
            var justModels = manufacturersAndModels[selectedId];
            for (var i = 2; i < justModels.length; i++) {
                modelsData.push({ model: justModels[i] });
            }

            return modelsData;
        };
        
        var gridSourceDataSource = new kendo.data.DataSource({
            data: []
        });
       

        var modelDataSource = new kendo.data.DataSource({
            data: getModels(0)
        });

        var searchViewModel = {
            makerValue: { makerId: "0", maker: "Acura" },
            modelValue: { modelId: "0", model: "Integra" },
            startYearValue: { startyear: 2000 },
            endYearValue: { endyear: 2000 },
            startHp: 0,
            endHp: 0,
            engineValue: { engine: "Diesel" },
            gearValue: { gear: "Manual" },
            makers: getMakers(),
            models: modelDataSource,
            hidden: "none",
            makerChange: function () {
                var self = this;
                var selectedMaker = this.get("makerValue");
                var id = selectedMaker.makerId;
                var modelsData = getModels(id);

                this.models.fetch(function () {
                    self.models.data(getModels(id));
                });
                //this.set("models", modelsData);
                this.set("modelValue", { modelId: 0, model: modelsData[0] });
            },
            startyears: [
                { startyear: "1999" },
                { startyear: "2000" },
                { startyear: "2001" },
                { startyear: "2002" },
                { startyear: "2003" },
                { startyear: "2004" },
                { startyear: "2005" },
                { startyear: "2006" },
                { startyear: "2007" },
                { startyear: "2008" },
                { startyear: "2009" },
                { startyear: "2010" },
                { startyear: "2011" },
                { startyear: "2012" },
                { startyear: "2013" }
            ],
            endyears: [
                { endyear: "1999" },
                { endyear: "2000" },
                { endyear: "2001" },
                { endyear: "2002" },
                { endyear: "2003" },
                { endyear: "2004" },
                { endyear: "2005" },
                { endyear: "2006" },
                { endyear: "2007" },
                { endyear: "2008" },
                { endyear: "2009" },
                { endyear: "2010" },
                { endyear: "2011" },
                { endyear: "2012" },
                { endyear: "2013" }
            ],
            engines: [
                { engine: "Diesel" },
                { engine: "Benzin" }
            ],
            gears: [
                { gear: "Manual" },
                { gear: "Automatic" }
            ],
            gridSource: gridSourceDataSource,
            search: function () {

                var self = this;

                var maker = this.get("makerValue");
                var model = this.get("modelValue");
                var startyear = this.get("startYearValue");
                var endyear = this.get("endYearValue");
                var startHp = this.get("startHp");
                var endHp = this.get("endHp");
                var engine = this.get("engineValue");
                var gear = this.get("gearValue");
                var persister = persisters.getPersister();

                var searchDTO = {
                    maker: maker.maker || maker,
                    model: model.model || model,
                    startyear: startyear.startyear || startyear,
                    endyear: endyear.endyear || endyear,
                    startHp: startHp,
                    endHp: endHp,
                    engine: engine.engine || engine,
                    gear: gear.gear || gear
                };

                persister.cars.search(searchDTO).then(function (searchResult) {

                    self.set('hidden', "block");
                    gridSourceDataSource.fetch(function () {
                        gridSourceDataSource.data(searchResult);
                    });
                    
                    //self.set("gridSource", searchResult);
                }, function (error) {
                    console.log("err" + error);
                });
            }
        };

        return kendo.observable(searchViewModel);
    };

    factory.getSearchViewModel = getSearchViewModel;

})(window.viewModelFactory);

