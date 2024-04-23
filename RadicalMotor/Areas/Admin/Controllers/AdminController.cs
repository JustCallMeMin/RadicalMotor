using Microsoft.AspNetCore.Mvc;
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

        public async Task<ActionResult> Create(VehicleDTO model, IFormFile imageUrl)
        {
            HttpResponseMessage response = await _httpClient.PostAsJsonAsync("api/Vehicles", model);

            if (response.IsSuccessStatusCode)
            {

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
        private async Task<string> SaveImage(IFormFile image)
        {
            var savePath = Path.Combine("wwwroot/img", image.FileName);

            using (var fileStream = new FileStream(savePath, FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
            }
            return "/img/" + image.FileName;
        }
    }
}
