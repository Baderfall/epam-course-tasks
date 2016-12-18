(function(){
    $(document).ready(() => {
    
        $('#draw-circle').click(() => {
            $('.circle-around').empty();
            $('.circle-fill').empty();
    
            let firstInput = Number($('.circle-input-first-value').val());
            let secondInput = Number($('.circle-input-second-value').val());
            let thirdInput = Number($('.circle-input-third-value').val());
    
            if (!$.isNumeric(firstInput)|| !$.isNumeric(secondInput) || !$.isNumeric(thirdInput) ||
                firstInput < 0 || firstInput < 0 || firstInput < 0 || 
                firstInput + secondInput + thirdInput > 100) {
                alert('Please, check your values.');
                return;
            }
    
            let firstPart = {
                class: 'circle-straight-first-value',
                color: '#56e5f6',
                value: firstInput
            };
        
            let secondPart = {
                class: 'circle-straight-second-value',
                color: '#4cd9c0',
                value: secondInput
            };
        
            let thirdPart = {
                class: 'circle-straight-third-value',
                color: '#ec747d',
                value: thirdInput
            };
        
            const partsArr = [ firstPart, secondPart, thirdPart ];
            partsArr.sort(valueSort);
        
            function valueSort(a, b) {
                return a.value - b.value;
            }
    
            drawStraightCircle(partsArr);
            drawFillCircle(partsArr);
            drawAroundCircle(partsArr);
        });
    
        function drawStraightCircle(partsArr) {
            const circle = $('.circle-straight');
            circle.empty();
            const circleHeight = circle.height();
    
            partsArr.reduce((filledHeight, part) => {
                const elem = $('<div>');
                const height = circleHeight * (part.value / 100);
    
                elem.addClass(part.class);
                elem.css('bottom', filledHeight);
                elem.height(height);
    
                circle.append(elem);
                return filledHeight + height;
            }, 0);
        }
        
        function drawFillCircle(partsArr) {
            const cFill = document.getElementById('circle-fill');
            const ctxFill = cFill.getContext('2d');
            ctxFill.clearRect(0, 0, cFill.width, cFill.height);
            
            drawParts(cFill, ctxFill, partsArr);
        }
    
        function drawAroundCircle(partsArr) {
            const cFill = document.getElementById('circle-around');
            const ctxFill = cFill.getContext('2d');
            ctxFill.clearRect(0, 0, cFill.width, cFill.height);
            
            drawParts(cFill, ctxFill, partsArr);
    
            drawCircle(cFill, ctxFill, 60, '#ffffff');
        }
    
        function drawParts(canvas, context, partsArr) {
            let filledAngle = -0.5 * Math.PI;
            const centerX = Math.floor(canvas.width / 2);
            const centerY = Math.floor(canvas.height / 2);
            const radius = Math.floor(canvas.width / 2);
            let endAngle;
    
            partsArr.forEach((part) => {
                context.save();
            
                endAngle = filledAngle + (2 * Math.PI) * (part.value / 100);
            
                context.beginPath();
                context.moveTo(centerX, centerY);
                context.arc(centerX, centerY, radius, filledAngle, endAngle, false);
                context.closePath();
            
                context.fillStyle = part.color;
                context.fill();
                
                filledAngle = endAngle;
                context.restore();
            });
        }
    
        function drawCircle(canvas, context, radius, color) {
            const centerX = Math.floor(canvas.width / 2);
            const centerY = Math.floor(canvas.height / 2);
    
            context.beginPath();
            context.moveTo(centerX, centerY);
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            context.closePath();
            context.fillStyle = color;
            context.fill();
        }
    });
}());