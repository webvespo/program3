using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BE_CRUDMascotas.Models
{
	public class Usuario
	{
		//[Key]
		public int Id { get; set; }
		public string? NombreUsuario { get; set;}
		public string? Nombre { get; set; }
		public string? Apellido { get; set;}
		public string? Sexo { get; set;}
	}

	
}
