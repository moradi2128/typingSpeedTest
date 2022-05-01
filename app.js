let topText = document.querySelector('.top');
let words = document.querySelector('.words')
let refresh = document.querySelector('.refresh');
let time = document.querySelector('.time')
let input = document.querySelector('.input');
let result = document.querySelector('.result')
let wrong_words = document.querySelector('.Wrong-words-right')
let correct_words = document.querySelector('.correct-words-right')
let wpm_number = document.querySelector('.wpm-number')
let keystrokes_true = document.querySelector('.keystrokes-true')
let typed = 0;
let sec = 60;
let min = 1
let start = 0
let errors = 0;
let correct = 0;
let erroAr = []
let correctAr = []



// document.addEventListener('keypress', textInput)
document.addEventListener("keypress", function(event) {
    if (event.keyCode === 32 || event.which === 32) {
        textInput()
        input.value = ""
    }
});
input.addEventListener("keyup", function(event) {
    if (start == 0) {
        start = 1
        time_one = setInterval(timeStart, 1000)
    }
})
refresh.addEventListener('click', function() {
    resetTest()
})

// timer and stop test
function timeStart() {
    min--
    sec--
    if (min == 0) {
        time.innerHTML = `${min}:${sec}`
    }
    if (sec > 9) {
        time.innerHTML = `0:${sec}`
    } else if (sec > 0) {
        time.innerHTML = `0:0${sec}`
    } else {
        time.innerHTML = `0:00`;
        // stao test
        stopTest()
    }
}

html = 'جنباند سابید آهیخت شکرید شنگید ساخت بیختن مرد آموخت درایید کوفت اندوخت نگریست شمارد خفسید ترساند تَفت تندید زیست پير ترکید ناسید آشفت دید جهید كوشا انگیخت رید گَزید نفرید کوبید تاخت بخشود اشاند نگریست ماسید گسست پوشید خزید فَلَنجید فُنود وررفت گسیخت افراخت جُند پاشید پسندید ریخت گنجید اندوخت آژد شنگید تاسید وازد سرید جنگید لیشت بلعید روان کرد غاژید نشاند خسبید واشکافت افراشت ساخت رزید وانهاد ایستاند پرهیزید ورتید چاپید شتابید'
let html_arry = html.split(' ');
html_arry.forEach(char => {
    const charSpan = document.createElement('span');
    charSpan.innerText = char;
    words.appendChild(charSpan);
    words.querySelectorAll('span')[0].classList.toggle('box-select');
});

function textInput() {
    // input value
    inputvalue = input.value;
    // select text and span
    let html_arry_typed = html_arry[typed];
    let quoteSpanArray = words.querySelectorAll('span');
    // box text add & remove
    let b = words.querySelectorAll('span')[typed]
    b.nextElementSibling.classList.toggle('box-select')
    b.classList.toggle('box-select');
    // color text
    // trim() to remove spaces
    if (inputvalue.trim() !== html_arry_typed) {
        quoteSpanArray[typed].classList.add('red');
        erroAr.push(quoteSpanArray[typed].textContent)
        errors++;
    } else if (inputvalue.trim() === html_arry_typed) {
        quoteSpanArray[typed].classList.add('green')
        correctAr.push(quoteSpanArray[typed].textContent)
        correct++
    }
    ++typed;
}

function stopTest() {
    topText.style['display'] = ['none'];
    result.style['display'] = ['block']
    input.value = "";
    // keystrokes
    let correctArLength = correctAr.join('').toString().split('').length
    let erroArLength = erroAr.join('').toString().split('').length
    keystrokes_true.innerHTML = correctArLength
    keystrokes_true.nextElementSibling.innerHTML = erroArLength
    keystrokes_true.nextElementSibling.nextElementSibling.innerHTML = erroArLength + correctArLength
    input.disabled = true;
    // error
    let errorsLenght = [errors];
    wrong_words.innerHTML = errorsLenght;
    // correct
    let correctLenght = [correct];
    correct_words.innerHTML = correctLenght
        // wpm
    wpm_number.innerText = `${parseFloat(errorsLenght) + parseFloat(correctLenght)} WPM`
}

function resetTest() {
    erroAr.length = 0
    correctAr.length = 0
    input.disabled = false;
    typed = 0;
    min = 1;
    sec = 60;
    start = 0;
    errors = 0;
    correct = 0;
    topText.style['display'] = ['flex'];
    result.style['display'] = ['none']
    time.innerHTML = `1:00`;
    clearInterval(time_one);
    // 
    let span = words.querySelectorAll('span')
    for (let i = 0; i < span.length; i++) {
        const span_one = span[i];
        span_one.classList.remove('red', 'green', 'box-select');
        words.querySelectorAll('span')[0].classList.toggle('box-select');
    }

}