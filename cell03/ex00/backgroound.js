const button = document.getElementById('color-button');

button.addEventListener('click', function(){
    const randomColor = 'rgb(' +
        Math.floor(Math.random() * 256) + ',' +
        Math.floor(Math.random() * 256) + ',' +
        Math.floor(Math.random() * 256) + ')';

    document.body.style.backgroundColor = randomColor;
})