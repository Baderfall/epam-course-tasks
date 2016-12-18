(function(){
    $(document).ready(() => {
        
        function City(city, celsius, imageUrl) {
            this.city = city;
            this.celsius = celsius;
            this.fahrenheit = Math.round(celsius * (9/5) + 32);
            this.imageUrl = imageUrl;
            this.id = generateId();
        }
    
        function getCounter() {
            let currentCount = 1;
            return function() {
                return currentCount++;
            };
        }
    
        const generateId = getCounter();
    
        const slider = $('.slider');
        const slides = $('.slides');
        const cityArr = [];
        let inCelsius = true;
    
        $('.add-place-button').click(() => {
            $('.add-place-form').toggle();
        });
    
        $('#add-place').click(() => {
            $('.add-place-form').toggle();
            let city = $('#city').val();
            let celsius = $('#celsius').val();
            let imageUrl = $('#image-url').val();
            cityArr.push(new City(city, celsius, imageUrl));
            $('#city').val('');
            $('#celsius').val('');
            $('#image-url').val('');
            drawSlider();
        });
    
        function drawSlider() {
            slider.empty();
            slides.empty();
            cityArr.forEach((city) => {

                let slideLabel = $('<label>');
                slideLabel.prop('for', `slide-dot-${city.id}`);
                slideLabel.click(() => {
                    $('.weather-info').empty();
                    $('.weather-info').append(`<p class="temperature">${inCelsius ? city.celsius : city.fahrenheit}</p>
                                               <p>${city.city}</p>
                                               <p>8:34 am</p>`);
                });
                slider.append(slideLabel);
    
                slides.append(`<input id="slide-dot-${city.id}" type="radio" name="slides">`);
                let slideDiv = $('<div>');
                slideDiv.addClass('slide');
                slideDiv.css('background',`url(${city.imageUrl})`);
                slides.append(slideDiv);
            });
            resetView();
        }
    
        function resetView() {
            $('.weather-info').empty();
            $('.weather-info').append(`<p class="temperature">${inCelsius ? cityArr[0].celsius : cityArr[0].fahrenheit}</p>
                                       <p>${cityArr[0].city}</p>
                                       <p>8:34 am</p>`);
            $('.slides input').first().prop('checked', true);
        }
    
        $('#celsius-unit').click(() => {
            switchTempUnit();
        });
        $('#fahrenheit-unit').click(() => {
            switchTempUnit();
        });
    
        function switchTempUnit() {
            inCelsius = !inCelsius;
            $('#celsius-unit').toggleClass('active');
            $('#fahrenheit-unit').toggleClass('active');
            resetView();
        }
        
    });
}());