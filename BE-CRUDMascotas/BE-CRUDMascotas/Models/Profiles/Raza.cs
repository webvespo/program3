using AutoMapper;
using BE_CRUDMascotas.Models.DTO;

namespace BE_CRUDMascotas.Models.Profiles
{
    public class RazaProfile: Profile
    {
        public RazaProfile() {
            CreateMap<Mascota, MascotaDTO>();
            CreateMap<MascotaDTO, Mascota>();
        }
    }
}