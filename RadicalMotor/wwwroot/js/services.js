$(document).ready(function () {
    $('form').submit(function (event) {
        event.preventDefault();

        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!localStorage.getItem('isLoggedIn')) {
            console.error('User is not logged in.');
            // Nếu người dùng chưa đăng nhập, bạn có thể chuyển hướng hoặc hiển thị thông báo
            return;
        }

        // Lấy dữ liệu từ form và gửi yêu cầu tạo cuộc hẹn mới
        var formData = {
            FullName: $('input[placeholder="Your Name"]').val(),
            PhoneNumber: $('input[placeholder="Your Phone Number"]').val(),
            ServiceId: $('.form-select').val(),
            ServiceDate: $('#date1').datetimepicker('viewDate').toISOString(),
            Notes: $('textarea[placeholder="Notes"]').val()
        };

        $.ajax({
            url: 'https://localhost:44304/api/AppointmentDetails/book',
            type: 'POST',
            data: JSON.stringify(formData),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                console.log('Booking successful', response);
                alert('Booking successful!');
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('https://localhost:44304/api/Service')
        .then(response => response.json())
        .then(services => {
            console.log(services);
            const selectElement = document.getElementById('service-select');
            services.forEach(function (service) {
                var option = document.createElement("option");
                option.value = service.serviceId;
                option.text = service.serviceName;
                selectElement.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading services:', error);
        });
});