using AutoMapper;
using BE_CRUDMascotas.Models;
using BE_CRUDMascotas.Models.DTO;
using BE_CRUDMascotas.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

namespace BE_CRUDUsuario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
    private readonly IMapper _mapper;
    private readonly IRepository<Usuario> _usuarioRepository;
    public UsuarioController(IMapper mapper, IRepository<Usuario> usuarioRepository)
        {
            _mapper = mapper;
            _usuarioRepository = usuarioRepository;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listUsuarios = await _usuarioRepository.GetList();

                var listUsuarioDto = _mapper.Map<IEnumerable<DueñoDto>>(listUsuarios);

                return Ok(listUsuarioDto);
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
                var usuario = await _usuarioRepository.GetById(id);

                if (usuario == null)
                {
                    return NotFound();
                }

                var usuarioDto = _mapper.Map<DueñoDto>(usuario);

                return Ok(usuarioDto);

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
                var usuario = await _usuarioRepository.GetById(id);

                if (usuario == null)
                {
                    return NotFound();
                }

                await _usuarioRepository.Delete(usuario);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(DueñoDto usuarioDto)
        {
            try
            {
                var usuario = _mapper.Map<Usuario>(usuarioDto);

                //usuario.FechaCreacion = DateTime.Now;

                usuario = await _usuarioRepository.Add(usuario);

                var usuarioItemDto = _mapper.Map<DueñoDto>(usuario);

                return CreatedAtAction("Get", new { id = usuarioItemDto.Id }, usuarioItemDto);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, DueñoDto usuarioDto)
        {
            try
            {
                var usuario = _mapper.Map<Usuario>(usuarioDto);

                if (id != usuario.Id)
                {
                    return BadRequest();
                }

                var usuarioItem = await _usuarioRepository.GetById(id);

                if (usuarioItem == null)
                {
                    return NotFound();
                }

                await _usuarioRepository.Update(usuario);

                return NoContent();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}