using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RadicalMotor.Models
{
	public class AppointmentDetail
	{
		public string AppointmentId { get; set; }

		public string ServiceId { get; set; }

		[Column(TypeName = "decimal(18, 2)")]
		public decimal ServiceAmount { get; set; }
		public Appointment Appointments { get; set; }
		public Service Services { get; set; }

	}
}
