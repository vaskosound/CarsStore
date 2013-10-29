using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.Web.Http;
using System.Web.Http.ValueProviders;
using Cars.Model;
using Cars.Services.Attributes;
using Cars.Services.Data;
using Cars.Services.Models;
using Cars.Services.Utilities;

namespace Cars.Services.Controllers
{
    public class CarsController : BaseApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork();

        [HttpGet]
        [ActionName("all")]
        public IEnumerable<CarModel> GetAll(
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))] string sessionKey)
        {
            var messageResponse = this.TryExecuteOperation<IEnumerable<CarModel>>(() =>
            {
                var user = unitOfWork.userRepository.All().Single(x => x.SessionKey == sessionKey);
                UserValidator.ValidateUser(user);

                var matchedCars = unitOfWork.carRepository.All();
                var carModels = matchedCars.Select(x => new CarModel()
                {
                    Id = x.Id,
                    Maker = x.Maker,
                    Model = x.Model,
                    ProductionYear = x.ProductionYear,
                    Price = x.Price,
                    Engine = x.Engine,
                    Gear = x.Gear,
                    HP = x.HP,
                    ImageUrl = x.ImageUrl,
                    Doors = x.Doors,
                    FuelType = x.FuelType,
                    Mileage = x.Mileage,
                    EngineVolume = x.EngineVolume
                });

                return carModels;
            });

            return messageResponse;
        }

        [HttpGet]
        [ActionName("my-cars")]
        public IEnumerable<CarModel> GetMyCars(
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))] string sessionKey)
        {
            var messageResponse = this.TryExecuteOperation<IEnumerable<CarModel>>(() =>
            {
                var user = unitOfWork.userRepository.All().Single(x => x.SessionKey == sessionKey);
                UserValidator.ValidateUser(user);
                UserValidator.ValidateDealer(user.UserType);
                var matchedCars = unitOfWork.carRepository.All()
                    .Where(x => x.Owner.DisplayName == user.DisplayName);
                var carModels = matchedCars.Select(x => new CarModel()
                {
                    Id = x.Id,
                    Maker = x.Maker,
                    Model = x.Model,
                    ProductionYear = x.ProductionYear,
                    Price = x.Price,
                    Engine = x.Engine,
                    Gear = x.Gear,
                    HP = x.HP,
                    ImageUrl = x.ImageUrl,
                    Doors = x.Doors,
                    FuelType = x.FuelType,
                    Mileage = x.Mileage,
                    EngineVolume = x.EngineVolume
                });

                return carModels;
            });

            return messageResponse;
        }

        [HttpGet]
        [ActionName("makers")]
        public MakersModel[] GetAllMakers()
        {
            var messageResponse = this.TryExecuteOperation<MakersModel[]>(() =>
            {
                var makers =  unitOfWork.carRepository.All().Select(x => x.Maker).ToArray();
                MakersModel[] makersmodels = new MakersModel[makers.Count()];
                for (int i = 0; i < makersmodels.Length; i++)
                {
                    makersmodels[i] = new MakersModel(){Id = i,Maker = makers[i]};
                }

                return makersmodels;
            });

            return messageResponse;
        }

        [HttpGet]
        [ActionName("models")]
        public ModelModel[] GetAllModels()
        {
            var messageResponse = this.TryExecuteOperation<ModelModel[]>(() =>
            {
                var models = unitOfWork.carRepository.All().Select(x => x.Model).ToArray();
                ModelModel[] modelsmodels = new ModelModel[models.Count()];
                for (int i = 0; i < modelsmodels.Length; i++)
                {
                    modelsmodels[i] = new ModelModel(){Model = models[i],Id = i};
                }
                return modelsmodels;
            });

            return messageResponse;
        }

        [HttpGet]
        [ActionName("single")]
        public CarDetailedModel GetCarById(int id, 
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))] string sessionKey)
        {
            var messageResponse = this.TryExecuteOperation<CarDetailedModel>(() =>
            {
                var user = unitOfWork.userRepository.All().Single(x => x.SessionKey == sessionKey);
                UserValidator.ValidateUser(user);

                var car = unitOfWork.carRepository.All().Single(x => x.Id == id);
                var carModel = new CarDetailedModel()
                {
                    Id = car.Id,
                    Maker = car.Maker,
                    Model = car.Model,
                    ProductionYear = car.ProductionYear,
                    Price = car.Price,
                    Engine = car.Engine,
                    EngineVolume = car.EngineVolume,
                    FuelType = car.FuelType,
                    Mileage = car.Mileage,
                    Doors = car.Doors,
                    Gear = car.Gear,
                    HP = car.HP,
                    ImageUrl = car.ImageUrl,
                    Extras = (from extra in car.Extras
                             select new ExtrasModel()
                             {
                                 Name = extra.Name
                             }).ToList()
                };

                return carModel;
            });

            return messageResponse;
        }

        [HttpPost]
        [ActionName("create")]
        public HttpResponseMessage PostCar([FromBody] CarDetailedModel car,
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))] string sessionKey)
        {
            var messageResponse = this.TryExecuteOperation<HttpResponseMessage>(() =>
            {
                var user = unitOfWork.userRepository.All().Single(x => x.SessionKey == sessionKey);
                UserValidator.ValidateUser(user);
                CarVaildator.ValidateMaker(car.Maker);
                CarVaildator.ValidateModel(car.Model);
                CarVaildator.ValidateProductionYear(car.ProductionYear);
                CarVaildator.ValidatePrice(car.Price);
                CarVaildator.ValidateEngine(car.Engine);
                CarVaildator.ValidateFuelType(car.FuelType);
                CarVaildator.ValidateEngineVolume(car.EngineVolume);
                CarVaildator.ValidateHp(car.HP);
                CarVaildator.ValidateMileage(car.Mileage);
                CarVaildator.ValidateGear(car.Gear);
                CarVaildator.ValidateDoors(car.Doors);
                CarVaildator.ValidateImageUrl(car.ImageUrl);

                var newCar = new Car()
                {
                    Maker = car.Maker,
                    Model = car.Model,
                    ProductionYear = car.ProductionYear,
                    Price = car.Price,
                    Engine = car.Engine,
                    HP = car.HP,
                    Gear = car.Gear,
                    ImageUrl = car.ImageUrl,
                    Doors = car.Doors,
                    EngineVolume = car.EngineVolume,
                    FuelType = car.FuelType,
                    Mileage = car.Mileage,
                    Owner = user,
                };

                if (car.Extras != null)
                {
                    foreach (var extra in car.Extras)
                    {
                        var newExtra = new Extra();
                        var existingExtra =
                            this.unitOfWork.extraRepository.All().FirstOrDefault(x => x.Name == extra.Name);
                        if (existingExtra == null)
                        {
                            newExtra.Name = extra.Name;
                        }
                        else
                        {
                            newExtra = existingExtra;
                        }

                        newCar.Extras.Add(newExtra);
                    }
                }

                unitOfWork.carRepository.Add(newCar);

                return Request.CreateResponse(HttpStatusCode.Created, car);
            });

            return messageResponse;
        }

        [HttpPut]
        [ActionName("edit")]
        public HttpResponseMessage UpdateCar(int id, [FromBody] CarDetailedModel car,
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))] string sessionKey)
        {
            var messageResponse = this.TryExecuteOperation<HttpResponseMessage>(() =>
            {
                var user = unitOfWork.userRepository.All().Single(x => x.SessionKey == sessionKey);
                UserValidator.ValidateUser(user);
                UserValidator.ValidateDealer(user.UserType);
                CarVaildator.ValidateMaker(car.Maker);
                CarVaildator.ValidateModel(car.Model);
                CarVaildator.ValidateProductionYear(car.ProductionYear);
                CarVaildator.ValidatePrice(car.Price);
                CarVaildator.ValidateEngine(car.Engine);
                CarVaildator.ValidateFuelType(car.FuelType);
                CarVaildator.ValidateEngineVolume(car.EngineVolume);
                CarVaildator.ValidateHp(car.HP);
                CarVaildator.ValidateMileage(car.Mileage);
                CarVaildator.ValidateGear(car.Gear);
                CarVaildator.ValidateDoors(car.Doors);
                CarVaildator.ValidateImageUrl(car.ImageUrl);

                var carToUpdate = new Car()
                {
                    Id = id,
                    Maker = car.Maker,
                    Model = car.Model,
                    ProductionYear = car.ProductionYear,
                    Price = car.Price,
                    Engine = car.Engine,
                    HP = car.HP,
                    Gear = car.Gear,
                    ImageUrl = car.ImageUrl,
                    Doors = car.Doors,
                    EngineVolume = car.EngineVolume,
                    FuelType = car.FuelType,
                    Mileage = car.Mileage,
                    Owner = user,
                };

                if (car.Extras != null)
                {
                    foreach (var extra in car.Extras)
                    {
                        var newExtra = new Extra();
                        var existingExtra =
                            this.unitOfWork.extraRepository.All().FirstOrDefault(x => x.Name == extra.Name);
                        if (existingExtra == null)
                        {
                            newExtra.Name = extra.Name;
                        }
                        else
                        {
                            newExtra = existingExtra;
                        }

                        carToUpdate.Extras.Add(newExtra);
                    }
                }
                unitOfWork.carRepository.Update(carToUpdate);
                return Request.CreateResponse(HttpStatusCode.OK, car);
            });

            return messageResponse;
        }

        [HttpDelete]
        [ActionName("delete")]
        public HttpResponseMessage DeleteCar(int id,
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))] string sessionKey)
        {
            var messageResponse = this.TryExecuteOperation <HttpResponseMessage>(() =>
            {
                var user = unitOfWork.userRepository.All().Single(x => x.SessionKey == sessionKey);
                UserValidator.ValidateUser(user);
                UserValidator.ValidateDealer(user.UserType);

                unitOfWork.carRepository.Delete(id);
                var myCars = unitOfWork.carRepository.All().Where(c => c.Owner.DisplayName == user.DisplayName);
                var carModels = myCars.Select(x => new CarModel()
                {
                    Id = x.Id,
                    Maker = x.Maker,
                    Model = x.Model,
                    ProductionYear = x.ProductionYear,
                    Price = x.Price,
                    Engine = x.Engine,
                    Gear = x.Gear,
                    HP = x.HP,
                    ImageUrl = x.ImageUrl,
                    Doors = x.Doors,
                    FuelType = x.FuelType,
                    Mileage = x.Mileage,
                    EngineVolume= x.EngineVolume
                });
                return Request.CreateResponse(HttpStatusCode.OK, carModels);
            });

            return messageResponse;
        }

        [HttpPost]
        [ActionName("search")]
        public IEnumerable<CarModel> Search([FromBody] CarSearchModel carModel, 
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))] string sessionKey)
        {
            var messageResponse = this.TryExecuteOperation<IEnumerable<CarModel>>(() =>
            {
                var user = unitOfWork.userRepository.All().Single(x => x.SessionKey == sessionKey);
                UserValidator.ValidateUser(user);

                var matchedCars =
                    unitOfWork.carRepository.All();

                if (carModel.Maker != null)
                {
                    matchedCars = matchedCars.Where(x => x.Maker == carModel.Maker);
                }

                if (carModel.Model != null)
                {
                    matchedCars = matchedCars.Where(x => x.Model == carModel.Model);
                }

                if (carModel.StartYear != null)
                {
                    matchedCars = matchedCars.Where(x => x.ProductionYear >= carModel.StartYear);
                }

                if (carModel.EndYear != null)
                {
                    matchedCars = matchedCars.Where(x => x.ProductionYear <= carModel.EndYear);
                }

                if (carModel.StartHP != null)
                {
                    matchedCars = matchedCars.Where(x => x.HP >= carModel.StartHP);
                }

                if (carModel.EndHP != null)
                {
                    matchedCars = matchedCars.Where(x => x.ProductionYear <= carModel.EndYear);
                }

                if (carModel.Engine != null)
                {
                    matchedCars = matchedCars.Where(x => x.FuelType == carModel.Engine);
                }

                if (carModel.Gear != null)
                {
                    matchedCars = matchedCars.Where(x => x.Gear == carModel.Gear);
                }

                var carModels = matchedCars.Select(x => new CarDetailedModel()
                {
                    Id = x.Id,
                    Maker = x.Maker,
                    Model = x.Model,
                    ProductionYear = x.ProductionYear,
                    Price = x.Price,
                    Engine = x.Engine,
                    Gear = x.Gear,
                    HP = x.HP,
                    ImageUrl = x.ImageUrl,
                    Doors = x.Doors,
                    FuelType = x.FuelType,
                    Mileage = x.Mileage,
                    EngineVolume = x.EngineVolume
                });

                return carModels;
            });

            return messageResponse;
        }
    }
}
