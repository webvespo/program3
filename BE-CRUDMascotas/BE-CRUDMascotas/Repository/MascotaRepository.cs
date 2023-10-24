using BE_CRUDMascotas.Data;
using BE_CRUDMascotas.Models;
using Microsoft.EntityFrameworkCore;

namespace BE_CRUDMascotas.Repository
{
    public class MascotaRepository : IRepository<Mascota>
    {
        private readonly AplicationDbContext _context;

        public MascotaRepository(AplicationDbContext context)
        {
            _context = context;
        }

		public async Task<Mascota> Add(Mascota mascota)
		{
			_context.Mascotas.Add(mascota);
			_context.Usuarios.Add(mascota.NombreUsuario);
			_context.Raza.Add(mascota.raza);
			await _context.SaveChangesAsync();
			return mascota;
		}

		public async Task Delete(Mascota mascota)
		{
			_context.Mascotas.Remove(mascota);
			await _context.SaveChangesAsync();
		}

		public async Task<Mascota> GetById(int id)
		{
			return await _context.Mascotas.Include(x=>x.NombreUsuario).Include(x=>x.raza).
				Where(x=>x.Id == id).FirstOrDefaultAsync() ?? throw new ArgumentNullException() ;

		}

		public async Task<List<Mascota>> GetList()
		{
			return await _context.Mascotas.Include(x=>x.NombreUsuario).Include(x=>x.raza).ToListAsync();
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
				mascotaItem.NombreUsuario = mascota.NombreUsuario;		

				await _context.SaveChangesAsync();
			}
		}		
	}
}