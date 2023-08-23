let columns;
let rainDrops = [];
let isAsian = true;
let interval;
let asianer;

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('Matrix');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    rainDrops = [];

    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    //let asianer = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    let asianer = '01';
    

    const rainbowColors = [
        '#FF0000', '#FF3333', '#FF6666', '#FF9999', // red
        '#FF7F00', '#FF8C26', '#FF9933', '#FFAD66', // orange
        '#FFFF00', '#FFFF33', '#FFFF66', '#FFFF99', // yellow
        '#7FFF00', '#8CFF33', '#99FF33', '#ADFF66', // green
        '#00FF00', '#33FF33', '#66FF66', '#99FF99', // blue
        '#0000FF', '#3333FF', '#6666FF', '#9999FF', // indigo
        '#4B0082', '#5C1A8D', '#702E99', '#8D4DB2', // violet
        '#9400D3', '#9F33E6', '#A966E6', '#C299E6' // purple
    ];

    let colorOffset = 0;

    const linesPerColorGroup = 1; 

    function getColorForColumn(column) {
        const adjustedLength = rainbowColors.length; 
        const groupIndex = Math.floor(column / linesPerColorGroup);
        return rainbowColors[(groupIndex + colorOffset) % adjustedLength];
    }

    
    const updateColorOffset = () => {
        colorOffset = (colorOffset + 1) % rainbowColors.length;
    };

    const draw = () => {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < rainDrops.length; i++) {
            const text = asianer.charAt(Math.floor(Math.random() * asianer.length));
            context.fillStyle = getColorForColumn(i);
            context.font = fontSize + 'px monospace';
            context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    //setInterval(draw, 30);
    setInterval(updateColorOffset, 1000);


    function startMatrixAsians() {
        clearInterval(interval);
        asianer = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        interval = setInterval(draw, 30);
    }
    
    function startMatrixNumbers() {
        clearInterval(interval);
        asianer = '01';
        interval = setInterval(draw, 30);
    }
    
    document.getElementById("toggleMatrix").addEventListener("click", function() {
        if (isAsian) {
            startMatrixNumbers();
        } else {
            startMatrixAsians();
        }
        isAsian = !isAsian;

        localStorage.setItem('isAsian', isAsian.toString());
    });

    window.onload = function() {
        const savedState = localStorage.getItem('isAsian');
        isAsian = savedState !== null ? savedState === "true" : true;
    
        if (isAsian) {
            startMatrixAsians();
        } else {
            startMatrixNumbers();
        }
    }
    

});
