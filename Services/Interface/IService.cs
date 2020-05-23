using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DesafioPomar.Services.Interface
{
    public interface IService<T> where T : class, new()
    {
        Task<bool> Delete(long id);        
        Task<bool> Insert(T model);
        Task<bool> Update(T model);
        Task<T> GetSingle(Expression<Func<T, bool>> predicate, bool noTrcking = false);
        Task<List<T>> GetMany(Expression<Func<T, bool>> predicate);
        IQueryable<T> GetQuery();
    }
}