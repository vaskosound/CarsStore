using Cars.Model;
using Cars.Services.Models;
using System;
using System.Linq;

namespace Cars.Services.Utilities
{
    public static class UserValidator
    {
        private const string ValidUsernameChars =
           "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_1234567890";
        private const string ValidNicknameChars =
            "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_1234567890 -";
        private const int MinUsernameNicknameChars = 4;
        private const int MaxUsernameNicknameChars = 30;
        private const int Sha1CodeLength = 40;

        public static void ValidateUser(User user)
        {
            if (user == null)
            {
                throw new ServerErrorException("User has not logged in!");
            }
        }

        public static void ValidateDealer(UserType userType)
        {
            if (userType != UserType.Dealer)
            {
                throw new ServerErrorException("User is not a dealer!");
            }
        }

        public static void ValidateAdmin(UserType userType)
        {
            if (userType != UserType.Administrator)
            {
                throw new ServerErrorException("User is not an administrator!");
            }
        }
        public static void ValidateUsername(string username)
        {
            if (username == null || username.Length < MinUsernameNicknameChars || username.Length > MaxUsernameNicknameChars)
            {
                throw new ArgumentException(string.Format(
                    "Username should be between {0} and {1} symbols long",
                    MinUsernameNicknameChars,
                    MaxUsernameNicknameChars));
            }
            else if (username.Any(ch => !ValidUsernameChars.Contains(ch)))
            {
                throw new ArgumentException("Username contains invalid characters");
            }
        }

        public static void ValidateNickname(string nickname)
        {
            if (nickname == null || nickname.Length < MinUsernameNicknameChars || nickname.Length > MaxUsernameNicknameChars)
            {
                throw new ArgumentException(string.Format(
                    "Nickname should be between {0} and {1} symbols long",
                    MinUsernameNicknameChars,
                    MaxUsernameNicknameChars));
            }
            else if (nickname.Any(ch => !ValidNicknameChars.Contains(ch)))
            {
                throw new ArgumentException("Nickname contains invalid characters");
            }
        }

        public static void ValidateAuthCode(string authCode)
        {
            if (authCode.Length != Sha1CodeLength)
            {
                throw new ArgumentException("Invalid user authentication");
            }
        }
    }
}