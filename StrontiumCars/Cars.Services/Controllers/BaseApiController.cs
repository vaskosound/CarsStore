using Cars.Model;
using Cars.Services.Models;
using System;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;

namespace Cars.Services.Controllers
{
    public class BaseApiController : ApiController
    {
        protected T TryExecuteOperation<T>(Func<T> operation)
        {
            try
            {
                return operation();
            }
            catch (Exception ex)
            {
                var errResponse = this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
                throw new HttpResponseException(errResponse);
            }
        }

        protected static void ValidateUser(User user)
        {
            if (user == null)
            {
                throw new ServerErrorException("User has not logged in!");
            }
        }

        protected static void ValidateMaker(string maker)
        {
            if (maker == null || maker == "")
            {
                throw new ServerErrorException("Maker is required!");
            }
        }

        protected static void ValidateModel(string model)
        {
            if (model == null || model == "")
            {
                throw new ServerErrorException("Model is required!");
            }
        }
        protected static void ValidateProductionYear(int productionYear)
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

        protected static void ValidatePrice(decimal price)
        {
            if (price <= 0)
            {
                throw new ServerErrorException("Price is required!");
            }
        }

        protected static void ValidateEngine(string engine)
        {
            if (engine == null || engine == "")
            {
                throw new ServerErrorException("Engine is required!");
            }
        }

        protected static void ValidateGear(string gear)
        {
            if (gear == null || gear == "")
            {
                throw new ServerErrorException("Gear is required!");
            }
        }

        protected static void ValidateDoors(string doors)
        {
            if (doors == null || doors == "")
            {
                throw new ServerErrorException("Doors is required!");
            }
        }

        protected static void ValidateFuelType(string fuelType)
        {
            if (fuelType == null || fuelType == "")
            {
                throw new ServerErrorException("Fuel type is required!");
            }
        }

        protected static void ValidateImageUrl(string imageUrl)
        {
            if (imageUrl == null || imageUrl == "")
            {
                throw new ServerErrorException("Image Url is required!");
            }            
        }

        protected static void ValidateHp(int hp)
        {
            if (hp == 0)
            {
                throw new ServerErrorException("Power is required!");
            }
        }

        protected static void ValidateMileage(int mileage)
        {
            if (mileage == 0)
            {
                throw new ServerErrorException("Mileage is required!");
            }
        }

        protected static void ValidateEngineVolume(int engineVolume)
        {
            if (engineVolume == 0)
            {
                throw new ServerErrorException("Engine volume is required!");
            }
        }
    }    
}
