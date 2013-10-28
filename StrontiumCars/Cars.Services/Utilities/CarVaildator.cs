using Cars.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cars.Services.Utilities
{
    public static class CarVaildator
    {
        public static void ValidateMaker(string maker)
        {
            if (maker == null || maker == "")
            {
                throw new ServerErrorException("Maker is required!");
            }
        }

        public static void ValidateModel(string model)
        {
            if (model == null || model == "")
            {
                throw new ServerErrorException("Model is required!");
            }
        }
        public static void ValidateProductionYear(int productionYear)
        {
            if (productionYear == 0)
            {
                throw new ServerErrorException("Production year is required!");
            }
            if (productionYear < 1950 || productionYear > DateTime.Now.Year)
            {
                throw new ServerErrorException("Production year is invalid!");
            }
        }

        public static void ValidatePrice(decimal price)
        {
            if (price <= 0)
            {
                throw new ServerErrorException("Price is required!");
            }
        }

        public static void ValidateEngine(string engine)
        {
            if (engine == null || engine == "")
            {
                throw new ServerErrorException("Engine is required!");
            }
        }

        public static void ValidateGear(string gear)
        {
            if (gear == null || gear == "")
            {
                throw new ServerErrorException("Gear is required!");
            }
        }

        public static void ValidateDoors(string doors)
        {
            if (doors == null || doors == "")
            {
                throw new ServerErrorException("Doors is required!");
            }
        }

        public static void ValidateFuelType(string fuelType)
        {
            if (fuelType == null || fuelType == "")
            {
                throw new ServerErrorException("Fuel type is required!");
            }
        }

        public static void ValidateImageUrl(string imageUrl)
        {
            if (imageUrl == null || imageUrl == "")
            {
                throw new ServerErrorException("Image Url is required!");
            }
        }

        public static void ValidateHp(int hp)
        {
            if (hp == 0)
            {
                throw new ServerErrorException("Power is required!");
            }
        }

        public static void ValidateMileage(int mileage)
        {
            if (mileage == 0)
            {
                throw new ServerErrorException("Mileage is required!");
            }
        }

        public   static void ValidateEngineVolume(int engineVolume)
        {
            if (engineVolume == 0)
            {
                throw new ServerErrorException("Engine volume is required!");
            }
        }
    }
}