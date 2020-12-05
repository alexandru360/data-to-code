using System;
using System.Threading.Tasks;
using TestWebAPI_Searches;

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
        Task<PaginatedRecords<T>> SearchPaginated(SearchModel<T> search);
    }

    public interface IRepositoryView<T>
    {
        Task<T[]> GetAll();
        Task<long> Count();
    }
}