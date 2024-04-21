using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RadicalMotor.Models
{
	public class Appointment
	{
		[Key]
		public string AppointmentId { get; set; }

		[Required]
		[ForeignKey("Account")]
		public string AccountId { get; set; }

		[Required]
		public DateTime ServiceDate { get; set; }

		[Required]
		[ForeignKey("Service")]
		public string ServiceId { get; set; }

		public string Notes { get; set; }

		public virtual Account Account { get; set; }
		public virtual Service Service { get; set; }
	}
}
