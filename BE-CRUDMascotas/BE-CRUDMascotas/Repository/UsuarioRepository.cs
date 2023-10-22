using BE_CRUDMascotas.Data;
using BE_CRUDMascotas.Models;
using Microsoft.EntityFrameworkCore;

namespace BE_CRUDMascotas.Repository
{
    public class usuarioRepository : IRepository<Usuario>
    {
        private readonly AplicationDbContext _context;

        public usuarioRepository(AplicationDbContext context)
        {
            _context = context;
        }

		public async Task<Usuario> Add(Usuario usuario)
		{
			_context.Usuario.Add(usuario);
			await _context.SaveChangesAsync();
			return usuario;
		}

         public Task<Usuario> Add(Usuario entity)
        {
            throw new NotImplementedException();
        } 

        public async Task Delete(Usuario usuario)
		{
			_context.Usuario.Remove(usuario);
			await _context.SaveChangesAsync();
		}

        /* public Task Delete(Usuario entity)
        {
            throw new NotImplementedException();
        } */

       /*  public async Task<Mascota> GetById(int id)
		{
			return await _context.Mascotas.Include(x=>x.usuario).Include(x=>x.raza).
				Where(x=>x.Id == id).FirstOrDefaultAsync() ?? throw new ArgumentNullException() ;

		}

		public async Task<List<Mascota>> GetList()
		{
			return await _context.Mascotas.Include(x=>x.usuario).Include(x=>x.raza).ToListAsync();
		}

		public async Task Update(Mascota mascota)
		{
			var mascotaItem = await _context.Mascotas.FirstOrDefaultAsync(x => x.Id == mascota.Id);

			if (mascotaItem != null)
			{
				mascotaItem.Nombre = mascota.Nombre;
				mascotaItem.raza.Nombre = mascota.raza.Nombre;
				mascotaItem.Edad = mascota.Edad;
				mascotaItem.Peso = mascota.Peso;
				mascotaItem.Color = mascota.Color;
				mascotaItem.usuario.Nombre = mascota.usuario.Nombre;		

				await _context.SaveChangesAsync();
			}
		}

        public Task Update(Usuario entity)
        {
            throw new NotImplementedException();
        }

        Task<Usuario> IRepository<Usuario>.GetById(int id)
        {
            throw new NotImplementedException();
        }

        Task<List<Usuario>> IRepository<Usuario>.GetList()
        {
            throw new NotImplementedException();
        }*/
    }
} 