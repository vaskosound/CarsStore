using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cars.Model;
using Microsoft.Win32;

namespace Cars.Data
{
    public class CarsContext : DbContext
    {
        public CarsContext()
            :base("CarsDb")
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Car> Cars { get; set; }
    }
}
