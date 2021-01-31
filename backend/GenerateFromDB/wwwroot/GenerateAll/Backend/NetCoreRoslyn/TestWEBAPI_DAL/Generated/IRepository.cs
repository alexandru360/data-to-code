using System;
using System.Threading.Tasks;
using TestWebAPI_Searches;
using System.Linq;
namespace TestWebAPI_DAL
{
     public interface IRepository<T, TypePK1, TypePK2>
    {
        Task<T> DeleteById(TypePK1 id1,TypePK2 id2);
        Task<T> Delete(T p);
        Task<T> FindAfterId(TypePK1 id1, TypePK2 id2);
        Task<T[]> FindAfterIds(string namePK, TypePK1[] id1, TypePK2[] id2);
        Task<T[]> FindMultiple(System.Linq.Expressions.Expression<Func<T, bool>> f);
        //Task<T> FindSingle(Func<T, bool> f);
        Task<T[]> GetAll();
        Task<T> Insert(T p);
        Task<T> Update(T p);
        Task<long> Count();
        Task<PaginatedRecords<T>> SearchPaginated(SearchModel search);
        IQueryable<T> GetSearch(IQueryable<T> data,SearchModel search, bool paginated);
    }

    public interface IRepository<T, TypePK>
    {
        Task<T> DeleteById(TypePK id);
        Task<T> Delete(T p);
        Task<T> FindAfterId(TypePK id);
        Task<T[]> FindAfterIds(TypePK[] id);
        Task<T[]> FindMultiple(System.Linq.Expressions.Expression<Func<T, bool>> f);
        //Task<T> FindSingle(Func<T, bool> f);
        Task<T[]> GetAll();
        Task<T> Insert(T p);
        Task<T> Update(T p);
        Task<long> Count();
        Task<PaginatedRecords<T>> SearchPaginated(SearchModel search);
        IQueryable<T> GetSearch(IQueryable<T> data,SearchModel search, bool paginated);
    }

    public interface IRepositoryView<T>
    {
        Task<T[]> GetAll();
        Task<long> Count();
        Task<PaginatedRecords<T>> SearchPaginated(SearchModel search);
        IQueryable<T> GetSearch(IQueryable<T> data, SearchModel search,bool paginated);

    }
}