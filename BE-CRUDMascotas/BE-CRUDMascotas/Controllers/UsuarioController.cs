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
                var listUsuario = await _usuarioRepository.GetList();

                var listUsuarioDto = _mapper.Map<IEnumerable<DueñoDto>>(listUsuario);

                return Ok(listUsuarioDto);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }



    }

        


}