using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace Cars.Model
{
    public class Car
    {
        public Car()
        {
            this.Extras = new HashSet<Extra>();
        }

        public int Id { get; set; }

        [Required]
        public string Maker { get; set; }

        [Required]
        public string Model { get; set; }

        [Required]
        public int ProductionYear { get; set; }

        [Required]
        public decimal Price { get; set; }
        
        [Required]
        public string Engine { get; set; }

        public string Gear { get; set; }

        public int HP { get; set; }
       
        public string ImageUrl { get; set; }

        [Required]
        public int Mileage { get; set; }

        public string Doors { get; set; }

        public string FuelType { get; set; }

        public int EngineVolume { get; set; }

        public virtual ICollection<Extra> Extras { get; set; }

        public virtual User Owner { get; set; }
    }
}
