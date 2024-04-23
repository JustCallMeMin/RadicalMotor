using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using RadicalMotor.DTO;
using RadicalMotor.Models;


namespace RadicalMotor.Areas.Admin.Controllers
{
    public class AdminController : Controller
    {
        private readonly HttpClient _httpClient;
        private readonly ApplicationDbContext _dbContext;
        public AdminController(ApplicationDbContext dbContext)
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://localhost:44304/");
            _dbContext = dbContext;
        }
        [Area("Admin")]
        public async Task<ActionResult> Index()
        {
            HttpResponseMessage response = await _httpClient.GetAsync("api/Vehicles");

            if (response.IsSuccessStatusCode)
            {
                string responseDataString = await response.Content.ReadAsStringAsync();

                List<VehicleDTO> responseData = JsonConvert.DeserializeObject<List<VehicleDTO>>(responseDataString);
                var vehicle = responseData.ToList();
                return View(vehicle);
            }
            else
            {
                ViewBag.ErrorMessage = "Failed to retrieve data from the API";
                return View();
            }
        }

        public async Task<ActionResult> Create(VehicleDTO model)
        {
            HttpResponseMessage response = await _httpClient.PostAsJsonAsync("api/Vehicles", model);

            if (response.IsSuccessStatusCode)
            {
                string responseDataString = await response.Content.ReadAsStringAsync();

                List<VehicleTypeDTO> responseData = JsonConvert.DeserializeObject<List<VehicleTypeDTO>>(responseDataString);
                var vehicleTypes = responseData.ToList();
                ViewBag.VehicleTypes = new SelectList(vehicleTypes, "VehicleTypeId", "TypeName");
                return View();
            }
            else
            {
                ViewBag.ErrorMessage = "Failed to retrieve data from the API";
                return View(model);
            }
        }



        public async Task<ActionResult> Detail(string id)
        {
            HttpResponseMessage response = await _httpClient.GetAsync($"api/Vehicles/{id}");

            if (response.IsSuccessStatusCode)
            {
                string responseDataString = await response.Content.ReadAsStringAsync();
                var vehicleDetail = JsonConvert.DeserializeObject<VehicleDTO>(responseDataString);

                return View(vehicleDetail);
            }
            else
            {
                ViewBag.ErrorMessage = "Failed to retrieve vehicle detail from the API";
                return View();
            }
        }

    }
}
