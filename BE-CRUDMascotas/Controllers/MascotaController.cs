using AutoMapper;
using BE_CRUDMascotas.Models;
using BE_CRUDMascotas.Models.DTO;
using BE_CRUDMascotas.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

namespace BE_CRUDMascotas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MascotaController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly IRepository<Mascota> _mascotaRepository;
        private readonly IRepository<Usuario> _usuarioRepository;
        private readonly IRepository<Raza> _razaRepository;

        public MascotaController(IMapper mapper, IRepository<Mascota> mascotaRepository,
                        IRepository<Usuario> usuarioRepository, IRazaRepository razaRepository)
        {
            _mapper = mapper;
            _mascotaRepository = mascotaRepository;
            _usuarioRepository = usuarioRepository;
            _razaRepository = razaRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listMascotas = await _mascotaRepository.GetList();

                var listMascotasDto = _mapper.Map<IEnumerable<MascotaDTO>>(listMascotas);

                return Ok(listMascotasDto);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var mascota = await _mascotaRepository.GetById(id);

                if (mascota == null)
                {
                    return NotFound();
                }

                var mascotaDto = _mapper.Map<MascotaDTO>(mascota);

                return Ok(mascotaDto);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var mascota = await _mascotaRepository.GetById(id);

                if (mascota == null)
                {
                    return NotFound();
                }

                await _mascotaRepository.Delete(mascota);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(MascotaDTO mascotaDto)
        {
            try
            {
                var usuario = await _usuarioRepository.GetById(mascotaDto.NombreUsuario.Id);
                if (usuario == null)
                {
                    return BadRequest("Invalid Usuario ID");
                }

                var raza = await _razaRepository.GetByNombre(mascotaDto.raza.Nombre);
                if (raza == null)
                {
                    raza = await _razaRepository.Add(new Raza { Nombre = mascotaDto.raza.Nombre });
                }

                var mascota = _mapper.Map<Mascota>(mascotaDto);

                mascota.FechaCreacion = DateTime.Now;
                mascota.NombreUsuario = usuario;
                mascota.raza = raza;

                mascota = await _mascotaRepository.Add(mascota);

                var mascotaItemDto = _mapper.Map<MascotaDTO>(mascota);

                return CreatedAtAction("Get", new { id = mascotaItemDto.Id }, mascotaItemDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, MascotaDTO mascotaDto)
        {
            try
            {
                var mascota = _mapper.Map<Mascota>(mascotaDto);

                if (id != mascota.Id)
                {
                    return BadRequest();
                }

                var mascotaItem = await _mascotaRepository.GetById(id);

                if (mascotaItem == null)
                {
                    return NotFound();
                }

                mascotaItem.Nombre = mascotaDto.Nombre;
                mascotaItem.Color = mascotaDto.Color;
                mascotaItem.Edad = mascotaDto.Edad;
                mascotaItem.Peso = mascotaDto.Peso;
                mascotaItem.FechaCreacion = mascotaDto.FechaCreacion;

                if (mascotaItem.raza.Nombre != mascotaDto.raza.Nombre)
                {
                    var existingRaza = await _razaRepository.GetByNombre(mascotaDto.raza.Nombre);
                    if (existingRaza == null)
                    {
                        existingRaza = await _razaRepository.Add(new Raza { Nombre = mascotaDto.raza.Nombre });
                    }
                    mascotaItem.raza = existingRaza;
                }

                var usuario = await _usuarioRepository.GetById(mascotaDto.NombreUsuario.Id);
                if (usuario == null)
                {
                    return BadRequest("Invalid Usuario ID");
                }
                mascotaItem.NombreUsuario = usuario;

                await _mascotaRepository.Update(mascotaItem);

                return NoContent();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
