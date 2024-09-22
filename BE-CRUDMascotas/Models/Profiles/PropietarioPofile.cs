using AutoMapper;
using BE_CRUDMascotas.Models.DTO;

namespace BE_CRUDMascotas.Models.Profiles
{
	public class PropietarioPofile:Profile
	{
		public PropietarioPofile()
		{
			CreateMap<Usuario, PropietarioDto>();
			CreateMap<PropietarioDto, Usuario>();

		}
	}
}
