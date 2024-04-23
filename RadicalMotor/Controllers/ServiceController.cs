using Microsoft.AspNetCore.Mvc;

namespace RadicalMotor.Controllers
{
	public class ServiceController : Controller
	{
		public IActionResult Index()
		{
			if (IsUserAdmin())
			{
				return View();
			}
			else
			{
				return RedirectToAction("Index", "Account");
			}
		}

		private bool IsUserAdmin()
		{
			var userType = GetUserType();

			return userType == "Admin";
		}

		private string GetUserType()
		{
			var userType = HttpContext.Request.Cookies["userType"];

			return userType;
		}
	}
}
