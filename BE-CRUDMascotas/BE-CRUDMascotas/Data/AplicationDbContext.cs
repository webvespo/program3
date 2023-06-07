using BE_CRUDMascotas.Models;
using Microsoft.EntityFrameworkCore;

namespace BE_CRUDMascotas.Data
{
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Mascota> Mascotas { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
	
	}
}
