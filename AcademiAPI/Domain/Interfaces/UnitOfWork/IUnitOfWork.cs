using Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        Task BeginTransactionAsync();
        Task<bool> CommitAsync();
        Task RollbackAsync();
        Task<int> SaveChangeAsync(CancellationToken cancellationToken = default);
        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : class;
        Task<int> ExecuteSqlCommandAsync(string sql, params object[] parameters);
        Task<List<TResult>> ExecuteSqlInterpolatedAsync<TResult>(FormattableString sql) where TResult : class;

    }
}
