using System.Runtime.CompilerServices;
using System;
using System.Linq;
using DesafioPomar.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;

namespace DesafioPomar.Data
{
    public class DataContext : DbContext,IDataContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}
        public DbSet<Arvore> Arvores{get;set;}
        public DbSet<Colheita> Colheita{get;set;}
        public DbSet<Especie> Especie{get;set;}
        public DbSet<Grupo> Grupo{get;set;}

        public DbSet<T> GetRepository<T>() where T : Base, new()
        {
            Type type = this.GetType();
            Type repositoryType = typeof(DbSet<>).MakeGenericType(typeof(T));

            var propertyInfo = type.GetProperties().FirstOrDefault(p => p.PropertyType == repositoryType);

            return (DbSet<T>)propertyInfo.GetValue(this);
        }
        public async Task<int> SaveChanges(CancellationToken cancellationToken = default(CancellationToken))
        {
            return await SaveChangesAsync(cancellationToken);
        }
        
        
    }
}