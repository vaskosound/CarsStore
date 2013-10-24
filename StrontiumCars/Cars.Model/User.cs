using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cars.Model
{
    public class User
    {
        public User()
        {
            this.Cars = new HashSet<Car>();
        }

        public int Id { get; set; }

        [Required]
        [MinLength(4)]
        [MaxLength(30)]
        [StringLength(30)]
        public string Username { get; set; }

        [Required]
        [MinLength(4)]
        [MaxLength(30)]
        [StringLength(30)]
        public string DisplayName { get; set; }

        [MinLength(40)]
        [MaxLength(40)]
        [StringLength(40)]
        public string AuthCode { get; set; }

        [MinLength(50)]
        [MaxLength(50)]
        [StringLength(50)]
        public string SessionKey { get; set; }

        public UserType UserType { get; set; }

        public string Mail { get; set; }

        public string Phone { get; set; }

        public string Location { get; set; }

        public virtual ICollection<Car> Cars { get; set; } 
    } 
}
