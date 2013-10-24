using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Cars.Model;

namespace Cars.Services.Models
{
    public class CarModel
    {
        public int Id { get; set; }

        public string Maker { get; set; }

        public string Model { get; set; }

        public int ProductionYear { get; set; }

        public decimal Price { get; set; }

        public string Engine { get; set; }

        public string Gear { get; set; }

        public int HP { get; set; }

        public int Mileage { get; set; }

        public string Doors { get; set; }

        public string FuelType { get; set; }

        public int EngineVolume { get; set; }

        public string ImageUrl { get; set; }
    }

    public class CarDetailedModel : CarModel
    {
        public IEnumerable<ExtrasModel> Extras { get; set; }
    }

    public class CarSearchModel
    {
        public string Maker { get; set; }

        public string Model { get; set; }

        public int? StartYear { get; set; }

        public int? EndYear { get; set; }

        public int? StartHP { get; set; }

        public int? EndHP { get; set; }

        public string Engine { get; set; }

        public string Gear { get; set; }
    }

    public class MakersModel
    {
        public int Id { get; set; }
        public string Maker { get; set; }
    }

    public class ModelModel
    {
        public int Id { get; set; }
        public string Model { get; set; }
    }
}