using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.Serialization;
using Cars.Model;

namespace Cars.Services.Models
{
    public class UserRegisterRequestModel
    {
        public static Func<UserRegisterRequestModel, User> ToEntity { get; set; }

        public string Username { get; set; }

        public string DisplayName { get; set; }

        public string AuthCode { get; set; }

        public string Mail { get; set; }

        public string Phone { get; set; }

        public string Location { get; set; }

        public UserType UserType { get; set; }

        static UserRegisterRequestModel()
        {
            ToEntity = x => new User
            {
                Username = x.Username,
                DisplayName = x.DisplayName,
                AuthCode = x.AuthCode,
                UserType = x.UserType,
                Mail = x.Mail,
                Phone = x.Phone,
                Location = x.Location
            };
        }
    }

    [DataContract]
    public class UserRegisterResponseModel
    {
        public static Func<User, UserRegisterResponseModel> FromEntity { get; set; }

        [DataMember(Name = "displayName")]
        public string DisplayName { get; set; }

        [DataMember(Name = "sessionKey")]
        public string SessionKey { get; set; }

        [DataMember(Name = "userType")]
        public UserType UserType { get; set; }

        static UserRegisterResponseModel()
        {
            FromEntity = x => new UserRegisterResponseModel
            {
                DisplayName = x.DisplayName,
                SessionKey = x.SessionKey,
                UserType = x.UserType
            };
        }
    }

    public class UserLoginRequestModel
    {
        public static Func<UserLoginRequestModel, User> ToEntity { get; set; }

        public string Username { get; set; }

        public string AuthCode { get; set; }

        public UserType UserType { get; set; }

        static UserLoginRequestModel()
        {
            ToEntity = x => new User { Username = x.Username, AuthCode = x.AuthCode, UserType = x.UserType };
        }
    }

    [DataContract]
    public class UserLoginResponseModel
    {
        public static Func<User, UserLoginResponseModel> FromEntity { get; set; }

        [DataMember(Name = "displayName")]
        public string DisplayName { get; set; }

        [DataMember(Name = "sessionKey")]
        public string SessionKey { get; set; }

        [DataMember(Name = "userType")]
        public UserType UserType { get; set; }

        static UserLoginResponseModel()
        {
            FromEntity = x => new UserLoginResponseModel { DisplayName = x.DisplayName, SessionKey = x.SessionKey, UserType = x.UserType };
        }
    }

    public class UserLogoutRequestModel
    {
        public string SessionKey { get; set; }
    }

    public class UserModel
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string DisplayName { get; set; }

        public UserType UserType { get; set; }

        public string Mail { get; set; }

        public string Phone { get; set; }

        public string Location { get; set; }
    }

    public class UserDetailedModel : UserModel
    {
        public ICollection<CarModel> Cars { get; set; }
    }
}