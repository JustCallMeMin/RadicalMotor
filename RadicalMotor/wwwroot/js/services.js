$(document).ready(function () {
    // Khởi tạo datetime picker
    $('#date1').datetimepicker({
        format: 'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
    });

    // Tải danh sách dịch vụ ngay khi trang web được tải xong
    function fetchServices() {
        fetch('https://localhost:44304/api/Service', {
            credentials: 'include'  // Đảm bảo cookie được gửi cùng với yêu cầu
        })
            .then(response => response.json())
            .then(services => {
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
    }

    fetchServices();

    // Xử lý khi form được gửi
    $('form').submit(function (event) {
        event.preventDefault();
        checkLoginStatusAndSubmitForm();
    });

    // Kiểm tra trạng thái đăng nhập
    function checkLoginStatusAndSubmitForm() {
        fetch('https://localhost:44304/api/LoginApi/check', {
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.isLoggedIn) {
                    submitAppointmentForm();
                } else {
                    alert('Please log in to book an appointment.');
                }
            })
            .catch(error => {
                console.error('Failed to check login status:', error);
                alert('There was an error processing your request. Please try again.');
            });
    }

    // Gửi form đặt lịch hẹn
    function submitAppointmentForm() {
        var formData = {
            FullName: $('input[placeholder="Your Name"]').val(),
            PhoneNumber: $('input[placeholder="Your Phone Number"]').val(),
            ServiceId: $('#service-select').val(),
            ServiceDate: $('#date1').data("DateTimePicker").date().toISOString(),
            Notes: $('textarea[placeholder="Notes"]').val()
        };

        $.ajax({
            url: 'https://localhost:44304/api/AppointmentDetails/book',
            type: 'POST',
            data: JSON.stringify(formData),
            contentType: 'application/json; charset=utf-8',
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
            },
            success: function (response) {
                console.log('Booking successful', response);
                alert('Your appointment has been successfully booked!');
                // Có thể chuyển hướng người dùng hoặc làm mới trang ở đây nếu cần
            },
            error: function (xhr, status, error) {
                console.error('Error while booking appointment:', error);
                alert('Failed to book your appointment. Please try again.');
            }
        });
    }
});
