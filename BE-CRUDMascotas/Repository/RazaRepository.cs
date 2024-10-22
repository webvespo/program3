using BE_CRUDMascotas.Data;
using BE_CRUDMascotas.Models;
using BE_CRUDMascotas.Repository;
using Microsoft.EntityFrameworkCore;

public interface IRazaRepository : IRepository<Raza>
{
    Task<Raza> GetByNombre(string nombre);
}

public class RazaRepository : IRazaRepository
{
    private readonly AplicationDbContext _context;

    public RazaRepository(AplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Raza> Add(Raza entity)
    {
        _context.Set<Raza>().Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task Delete(Raza entity)
    {
        _context.Set<Raza>().Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<Raza> GetById(int id)
    {
        return await _context.Set<Raza>().FindAsync(id);
    }

    public async Task<IEnumerable<Raza>> GetList()
    {
        return await _context.Set<Raza>().ToListAsync();
    }

    public async Task<Raza> GetByNombre(string nombre)
    {
        return await _context.Set<Raza>()
            .FirstOrDefaultAsync(r => r.Nombre.ToLower() == nombre.ToLower());
    }

    public async Task Update(Raza entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    Task<List<Raza>> IRepository<Raza>.GetList()
    {
        throw new NotImplementedException();
    }
}