(function(){
    $(document).ready(() => {
    
        const usdInput = $('.currency-list #usd');
        const gbrInput = $('.currency-list #gbr');
        const eurInput = $('.currency-list #eur');
        let usdToGbrRate = 0.8;
        let usdToEurRate = 0.96;
    
        usdInput.keyup(() => {
            let gbrValue = convert(usdInput.val(), usdToGbrRate);
            gbrInput.val(gbrValue);
            let eurValue = convert(usdInput.val(), usdToEurRate);
            eurInput.val(eurValue);
        });
    
        function convert(value, rate) {
            return Math.round(value * rate * 100) / 100;
        }
    
        $('.add-currency').click(function() {
            $('#eur-li').toggle();
            $(this).toggleClass('add');
            $(this).toggleClass('remove');
        });
    
    });    
}());