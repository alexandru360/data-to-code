using System;
using System.Threading.Tasks;
using TestWebAPI_Searches;

namespace TestWebAPI_DAL
{
     public interface IRepository<T, TypePK1, TypePK2>
    {
        Task<T> Delete(TypePK1 id1,TypePK2 id2);
        Task<T> Delete(T p);
        Task<T> FindAfterId(TypePK1 id1, TypePK2 id2);
        Task<T[]> FindAfterIds(string namePK, TypePK1[] id1, TypePK2[] id2);
        Task<T[]> FindMultiple(System.Linq.Expressions.Expression<Func<T, bool>> f);
        //Task<T> FindSingle(Func<T, bool> f);
        Task<T[]> GetAll();
        Task<T> Insert(T p);
        Task<T> Update(T p);
        Task<long> Count();
        Task<PaginatedRecords<T>> SearchPaginated(SearchModel<T> search);
    }

    public interface IRepository<T, TypePK>
    {
        Task<T> Delete(TypePK id);
        Task<T> Delete(T p);
        Task<T> FindAfterId(TypePK id);
        Task<T[]> FindAfterIds(TypePK[] id);
        Task<T[]> FindMultiple(System.Linq.Expressions.Expression<Func<T, bool>> f);
        //Task<T> FindSingle(Func<T, bool> f);
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
        Task<PaginatedRecords<T>> SearchPaginated(SearchModel<T> search);

    }
}