using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace BE_CRUDMascotas.Models
{
    public class Mascota
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Color { get; set; }
        public int Edad { get; set; }
        public float Peso { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int UsuarioId { get; set; }        
        public Usuario? NombreUsuario { get; set; }
        public int RazaId { get; set; }      
        public Raza? raza { get; set; }
    }

}
