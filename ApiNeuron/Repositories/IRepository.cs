using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace ApiNeuron.Repositories
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T Get(int id);
        T Get(Expression<Func<T, bool>> predicate);
        T Add(T entity);
        T Update(T entity);
        T Remove(int id);
    }
}
