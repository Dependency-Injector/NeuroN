using System.Collections.Generic;

namespace ApiNeuron.Repositories
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T Get(int id);
        T Add(T entity);
        T Update(T entity);
        T Remove(int id);        
    }
}
