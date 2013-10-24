namespace Cars.Data.Migrations
{
    using Cars.Model;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    public sealed class Configuration : DbMigrationsConfiguration<Cars.Data.CarsContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(Cars.Data.CarsContext context)
        {
            if (context.Users.Count() == 0)
            {
                User admin = new User() 
                {
                   Username = "Admin",
                   DisplayName = "admin",
                   AuthCode = "f865b53623b121fd34ee5426c792e5c33af8c227",
                   UserType = UserType.Administrator
                };

                User dealer = new User()
                {
                    Username = "Dealer",
                    DisplayName = "dealer",
                    AuthCode = "92bf07a4c0cda37afbfebfc3bf12dd9f09911d7f",
                    UserType = UserType.Dealer
                };
                context.Users.Add(admin);
                context.Users.Add(dealer);
                context.SaveChanges();
            }
        }
    }
}
