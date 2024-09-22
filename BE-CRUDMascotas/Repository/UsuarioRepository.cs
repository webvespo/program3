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
			_context.Usuarios.Add(usuario);
			await _context.SaveChangesAsync();
			return usuario;
		}

        public async Task Delete(Usuario usuario)
		{
			_context.Usuarios.Remove(usuario);
			await _context.SaveChangesAsync();
		}

        public async Task<Usuario> GetById(int id)
		{
			return await _context.Usuarios.Where(x=>x.Id == id).FirstOrDefaultAsync() ?? throw new ArgumentNullException() ;

		}
        public async Task<List<Usuario>> GetList()
        {
			return await _context.Usuarios.ToListAsync();
        }

        public async Task Update(Usuario usuario)
        {
		var usuarioItem = await _context.Usuarios.FirstOrDefaultAsync(x => x.Id == usuario.Id);

			if (usuarioItem != null)
			{
				usuarioItem.NombreUsuario = usuario.NombreUsuario;
				usuarioItem.Nombre = usuario.Nombre;
				usuarioItem.Apellido = usuario.Apellido;
				usuarioItem.Sexo = usuario.Sexo;
				
				await _context.SaveChangesAsync();
			}        }
    }
} 