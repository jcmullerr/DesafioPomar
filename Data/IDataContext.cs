using System.Threading;
using System.Threading.Tasks;
using DesafioPomar.Models;
using Microsoft.EntityFrameworkCore;

namespace DesafioPomar.Data
{
    public interface IDataContext
    {
        DbSet<T> GetRepository<T>() where T : Base, new();
        Task<int> SaveChanges(CancellationToken cancellationToken = default(CancellationToken));
        DbSet<Arvore> Arvores{get;set;}
        DbSet<Colheita> Colheita{get;set;}
        DbSet<Especie> Especie{get;set;}
        DbSet<Grupo> Grupo{get;set;}
    }
}