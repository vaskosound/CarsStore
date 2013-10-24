using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ValueProviders;
using Cars.Model;
using Cars.Services.Attributes;
using Cars.Services.Data;
using Cars.Services.Models;
using Cars.Services.Utilities;

namespace Cars.Services.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly UnitOfWork unitOfWork = new UnitOfWork();

        [HttpGet]
        [ActionName("all")]
        public IEnumerable<UserModel> GetAll(
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))] string sessionKey)
        {
            var messageResponse = this.TryExecuteOperation<IEnumerable<UserModel>>(() =>
            {
                var user = unitOfWork.userRepository.All().Single(x => x.SessionKey == sessionKey);
                if (user == null)
                {
                    throw new InvalidOperationException("User has not logged in!");
                }

                var users = unitOfWork.userRepository.All();
                var userModels = users.Select(x => new UserModel()
                {
                    Id = x.Id,
                    Username = x.Username,
                    DisplayName = x.DisplayName,
                    Location = x.Location,
                    Mail = x.Mail,
                    Phone = x.Phone,
                    UserType = x.UserType,
                });

                return userModels;
            });

            return messageResponse;
        }

        [HttpGet]
        [ActionName("get-user")]
        public UserDetailedModel GetCarById(int id,
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))] string sessionKey)
        {
            var messageResponse = this.TryExecuteOperation<UserDetailedModel>(() =>
            {
                var user = unitOfWork.userRepository.All().Single(x => x.SessionKey == sessionKey);
                if (user == null)
                {
                    throw new InvalidOperationException("User has not logged in!");
                }

                var selectedUser = unitOfWork.userRepository.All().Single(x => x.Id == id);
                var userModel = new UserDetailedModel()
                {
                    Id = selectedUser.Id,
                    Username = selectedUser.Username,
                    DisplayName = selectedUser.DisplayName,
                    Location = selectedUser.Location,
                    Mail = selectedUser.Mail,
                    Phone = selectedUser.Phone,
                    UserType = selectedUser.UserType,
                    Cars = (from car in selectedUser.Cars
                            select new CarModel()
                            {
                                Id = car.Id,
                                Engine = car.Engine,
                                Gear = car.Gear,
                                HP = car.HP,
                                ImageUrl = car.ImageUrl,
                                Maker = car.Maker,
                                Model = car.Model,
                                Price = car.Price,
                                ProductionYear = car.ProductionYear
                            }).ToList()
                };

                return userModel;
            });

            return messageResponse;
        }

        [HttpPost]
        [ActionName("login")]
        public UserLoginResponseModel Login([FromBody] UserLoginRequestModel userModel)
        {
            var responseMessage = this.TryExecuteOperation(() =>
            {
                var user = this.unitOfWork.userRepository.All().SingleOrDefault(x => x.Username == userModel.Username && x.AuthCode == userModel.AuthCode);
                if (user == null)
                {
                    throw new ArgumentException("User is not registered!");
                }

                if (user.SessionKey == null)
                {
                    user.SessionKey = SessionGenerator.GenerateSessionKey(user.Id);
                    this.unitOfWork.userRepository.Update(user.Id, user);
                }

                return UserLoginResponseModel.FromEntity(user);
            });

            return responseMessage;
        }

        [HttpPost]
        [ActionName("register")]
        public HttpResponseMessage Register([FromBody] UserRegisterRequestModel userModel)
        {
            var responseMessage = this.TryExecuteOperation(() =>
            {
                User user = UserRegisterRequestModel.ToEntity(userModel);
                UserValidator.ValidateUsername(user.Username);
                UserValidator.ValidateNickname(user.DisplayName);
                UserValidator.ValidateAuthCode(user.AuthCode);

                var doesUserExist =
                    this.unitOfWork.userRepository.All()
                              .FirstOrDefault(
                                              x =>
                                              x.Username.ToLower() == user.Username.ToLower() ||
                                              x.DisplayName.ToLower() == user.DisplayName.ToLower());
                if (doesUserExist != null)
                {
                    throw new InvalidOperationException("User already exist in the database!");
                }

                //register all new users as clients
                user.UserType = UserType.Client;
                this.unitOfWork.userRepository.Add(user);
                user.SessionKey = SessionGenerator.GenerateSessionKey(user.Id);
                this.unitOfWork.userRepository.Update(user.Id, user);

                return this.Request.CreateResponse(HttpStatusCode.Created, UserRegisterResponseModel.FromEntity(user));
            });

            return responseMessage;
        }

        [HttpPut]
        [ActionName("logout")]
        public HttpResponseMessage Logout([FromBody] UserLogoutRequestModel userModel)
        {
            var messageResponse = this.TryExecuteOperation(() =>
            {
                var user =
                    this.unitOfWork.userRepository.All().SingleOrDefault(x => x.SessionKey == userModel.SessionKey);
                if (user == null)
                {
                    throw new ArgumentException("User is missing or not logged in!");
                }

                user.SessionKey = null;
                this.unitOfWork.userRepository.Update(user.Id, user);

                return this.Request.CreateResponse(HttpStatusCode.OK, user);
            });

            return messageResponse;
        }

        [HttpDelete]
        [ActionName("delete")]
        public HttpResponseMessage DeleteUser(int id,
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))] string sessionKey)
        {
            var messageResponse = this.TryExecuteOperation<HttpResponseMessage>(() =>
            {
                var user = unitOfWork.userRepository.All().Single(x => x.SessionKey == sessionKey);
                if (user == null)
                {
                    throw new InvalidOperationException("User has not logged in!");
                }
                if (user.UserType != UserType.Administrator)
                {
                    throw new InvalidOperationException("Only administrators can delete users!");
                }

                var userCars = this.unitOfWork.carRepository.All().Where(x => x.Owner.Id == id).ToList();

                for (int i = 0; i < userCars.Count(); i++)
                {
                    unitOfWork.carRepository.Delete(userCars[i].Id);
                }

                unitOfWork.userRepository.Delete(id);
                return Request.CreateResponse(HttpStatusCode.OK);
            });

            return messageResponse;
        }
    }
}
