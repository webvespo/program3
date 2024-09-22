using BE_CRUDMascotas.Models;

namespace BE_CRUDMascotas.Repository
{   
	public interface IRepository<T>
	{
		Task<List<T>> GetList();
		Task<T> GetById(int id);
		Task Delete(T entity);
		Task<T> Add(T entity);
		Task Update(T entity);
	}

}