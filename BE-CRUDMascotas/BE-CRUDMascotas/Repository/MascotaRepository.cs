﻿using BE_CRUDMascotas.Data;
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
			_context.Usuario.Add(mascota.usuario);
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
			return await _context.Mascotas.Include(x=>x.usuario).
				Where(x=>x.Id == id).FirstOrDefaultAsync() ?? throw new ArgumentNullException() ;

		}

		public async Task<List<Mascota>> GetList()
		{
			return await _context.Mascotas.Include(x=>x.usuario).ToListAsync();
		}

		public async Task Update(Mascota mascota)
		{
			var mascotaItem = await _context.Mascotas.FirstOrDefaultAsync(x => x.Id == mascota.Id);

			if (mascotaItem != null)
			{
				mascotaItem.Nombre = mascota.Nombre;
				mascotaItem.Raza = mascota.Raza;
				mascotaItem.Edad = mascota.Edad;
				mascotaItem.Peso = mascota.Peso;
				mascotaItem.Color = mascota.Color;
				mascotaItem.usuario.Nombre = mascota.usuario.Nombre;

				await _context.SaveChangesAsync();
			}
		}		
	}
}