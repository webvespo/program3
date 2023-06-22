using AutoMapper;
using BE_CRUDMascotas.Models.DTO;

namespace BE_CRUDMascotas.Models.Profiles
{
	public class DueñoPofile:Profile
	{
		public DueñoPofile()
		{
			CreateMap<Usuario, DueñoDto>();
			CreateMap<DueñoDto, Usuario>();

		}
	}
}
