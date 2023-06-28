using System.ComponentModel.DataAnnotations;

namespace BE_CRUDMascotas.Models
{
	public class Raza
	{
		[Key]
		public int Id { get; set; }
		public string? Nombre { get; set; }
	}
}