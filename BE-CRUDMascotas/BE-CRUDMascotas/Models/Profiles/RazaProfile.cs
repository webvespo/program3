using AutoMapper;
using BE_CRUDMascotas.Models.DTO;

namespace BE_CRUDMascotas.Models.Profiles
{
    public class RazaProfile: Profile
    {
        public RazaProfile() 
        {
            CreateMap<Raza, RazaDto>();
            CreateMap<RazaDto, Raza>();

        }
    }
}