using System;
using System.Threading.Tasks;

namespace TestWEBAPI_DAL
{
    public interface IRepository<T, TypePK>
    {
        Task<T> Delete(T p);
        Task<T> FindAfterId(TypePK id);
        Task<T[]> FindMultiple(Func<T, bool> f);
        Task<T> FindSingle(Func<T, bool> f);
        Task<T[]> GetAll();
        Task<T> Insert(T p);
        Task<T> Update(T p);
        Task<long> Count();
    }

    public interface IRepositoryView<T>
    {
        Task<T[]> GetAll();
        Task<long> Count();
    }
}