using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DesafioPomar.Models;
using DesafioPomar.Services.Interface;
using System.Threading.Tasks;
using DesafioPomar.Data;

namespace DesafioPomar.Services.Concrete
{
    public class BaseService<T> : IService<T> where T : Base, new()
    {
        private readonly IDataContext _DbContext;
        private readonly DbSet<T> _dbSet;
        public BaseService(IDataContext DbContext)
        {
            _DbContext = DbContext;
            _dbSet = _DbContext.GetRepository<T>();
        }
        public async Task<bool> Delete(long id)
        {
            try
            {
                var data = await _dbSet.AsNoTracking().Where(x => x.Id == id).FirstOrDefaultAsync();
                if (data == null)
                {
                    return false;
                }
                else
                {
                    _dbSet.Remove(data);

                    await _DbContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        public async Task<List<T>> GetMany(Expression<Func<T, bool>> predicate)
        {
            return await GetQuery().Where(predicate).ToListAsync();
        }

        public async Task<T> GetSingle(Expression<Func<T, bool>> predicate)
        {
            return await GetQuery().Where(predicate).FirstOrDefaultAsync();
        }

        public async Task<bool> Insert(T model)
        {
            try
            {
                await _dbSet.AddAsync(model);

                await _DbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        public async Task<bool> Update(T model)
        {
            try
            {
                _dbSet.Update(model);

                await _DbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        public virtual IQueryable<T> GetQuery()
        {
            /*
             Criar expression para carregar objetos relacionados
             */
            var query = _dbSet;
            var expression = new List<Expression<Func<T, object>>>();

            Type type = typeof(T);
            foreach (var prop in type.GetProperties().Where(p => p.GetMethod.IsVirtual))
            {
                var parameterExpression = Expression.Parameter(type);
                var exp = Expression.PropertyOrField(parameterExpression, prop.Name);
                var lamb = Expression.Lambda<Func<T, object>>(exp, parameterExpression);
                query.Include(lamb);
            }

            return query.AsQueryable();
        }
    }
}