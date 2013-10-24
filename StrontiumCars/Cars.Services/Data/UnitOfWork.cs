using System;
using Cars.Data;
using Cars.Model;
using Cars.Repositories;

namespace Cars.Services.Data
{
    public class UnitOfWork : IDisposable
    {
        private CarsContext context = new CarsContext();
        public IRepository<User> userRepository { get; private set; }
        public IRepository<Car> carRepository { get; private set; }
        public IRepository<Extra> extraRepository { get; private set; }
        private bool disposed = false;

        public UnitOfWork()
        {
            this.userRepository = new EfRepository<User>(this.context);
            this.carRepository = new EfRepository<Car>(this.context);
            this.extraRepository = new EfRepository<Extra>(this.context);
        }

        public void Save()
        {
            this.context.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    this.context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}