const loading = document.querySelector(".loading");
const startButton = document.querySelector(".startButton")
const start = document.querySelector(".start")
const game = document.querySelector(".game")
const gameContainer = document.querySelector(".game-container");
const playAgain = document.querySelector(".playAgain")
const final = document.querySelector(".final");
const scoreCount = document.querySelector(".scoreCount");
// const wrong = document.querySelector(".pop");
const close = document.querySelector(".close");
const againButton = document.querySelector(".againButton");
const gap = document.querySelector(".gap");

let startGame = false;
let player = { step: 4 }
let time;
let right;
let score;

var owl = $(".owl-carousel");

var objects = ["flower1", "flower2", "banana", "stone"]

setTimeout(function() {
    //your code to be executed after 1 second

    document.body.style.display = "block"
    onLoadSplash();

}, 500);

function onLoadSplash()
{
    console.log("Hi")
    var delayInMilliseconds = 2000;
    setTimeout(function() {
        //your code to be executed after 1 second
        console.log("test")
        loading.classList.add("fade");
        var delayInMilliseconds = 2000;
        setTimeout(function() {
            //your code to be executed after 1 second
            loading.classList.add("hide")
        }, delayInMilliseconds);
    }, delayInMilliseconds);
}

startButton.addEventListener("click", () => {
    start.classList.add("hide")
    game.classList.remove("hide")
    startGame = true
    score = 0
    began()
})

window.addEventListener('dblclick', function (event) {
    event.preventDefault();
}, { passive: false });

// close.addEventListener("click", () => {
//     wrong.classList.add("hide")
//     gap.setAttribute("style", "z-index: 0;")
//     startGame = true
//     fallingObject()
// })


function spawnObject() {
    let border = gameContainer.getBoundingClientRect();
    let object = document.createElement("div");
    var index = Math.floor(Math.random() * Math.floor(objects.length))
    // console.log(index)
    // console.log(objects.length)
    // console.log(border.width)
    object.classList.add(objects[index])
    object.y = 0;
    object.style.top = object.y + 'px';
    object.style.left = Math.floor(Math.random() * (border.width - 200)) + 'px';
    gameContainer.appendChild(object);
    function addMark() {
        object.addEventListener("click", () => {
            object.classList.add("fadeOut")
            right = true;
            score = score + 1
        })
    }
    function noMark() {
        //     object.addEventListener("click", () => {
        //         object.classList.add("hide")
        //         right = false;
        //         startGame = false;
        //         wrong.classList.remove("hide")
        //         gap.setAttribute("style", "z-index: 100;")
        // })
        object.addEventListener("click", () => {
            object.classList.add("fadeOut")
            right = false;
            if (score > 0) {
                score = score - 1
            }

        })
    }
    if (objects[index] == "flower1") {
        addMark();
    }
    if (objects[index] == "flower2") {
        addMark();
    }
    if (objects[index] == "banana") {
        noMark();
    }
    if (objects[index] == "stone") {
        noMark();
    }
}

function fallingObject() {
    if (startGame) {
        moveObject()
        window.requestAnimationFrame(fallingObject);
    }
}

function moveObject() {
    let flower1 = document.querySelectorAll(".flower1");
    let flower2 = document.querySelectorAll(".flower2");
    let banana = document.querySelectorAll(".banana");
    let stone = document.querySelectorAll(".stone");

    let border = gameContainer.getBoundingClientRect();

    let spwanTime = border.height / 4

    function spawnItem(item) {
        if (item.y >= spwanTime && item.y < (spwanTime + 4)) {
            spawnObject();
        }
        if (item.y > (border.height + 200)) {
            gameContainer.removeChild(item);
        }
        item.y = item.y + player.step;
        item.style.top = item.y + "px";
        // console.log("s" + spwanTime)
        // console.log("d" + item.y)
    }


    flower1.forEach(function (item) {
        spawnItem(item);
    })
    flower2.forEach(function (item) {
        spawnItem(item);
    })
    banana.forEach(function (item) {
        spawnItem(item);
    })
    stone.forEach(function (item) {
        spawnItem(item);
    })

}
var timer = 60;
function countDown() {
    // console.log(timer);
    document.querySelector(".count").innerHTML = `<div class="TimeCount">${timer}</div>`
    timer -= 1
    if (timer > 0) {
        setTimeout(countDown, 1000);

    }
    if (timer == 0) {
        document.querySelector('.win-lose').innerHTML = '<h2>Try again!</h2>';
        document.querySelector('small').classList.add('hide');

        clearInterval(timer);
        let delay = setTimeout(() => {
            startGame = false
            remove()
            game.classList.add("hide")
            final.classList.remove("hide")

            owl.owlCarousel({
                loop: true,
                margin: 10,
                nav: false,
                arrows: false,
                autoplay: false,
                autoplayTimeout: 10000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 1
                    },
                    1000: {
                        items: 1
                    }
                }
            })

        }, 1000);
    }
}


function began() {
    if (startGame == true) {
        spawnObject()
        countDown();
        window.requestAnimationFrame(fallingObject);
    }
}



againButton.addEventListener("click", () => {
    window.location.reload();
})

function updateScore() {
    if (startGame == true) {
        scoreCount.innerHTML = `${score}/10`;
        if (score == 10) {
            countDown(timer = 0);
            // console.log("stop")
            document.querySelector('.screenshoot').classList.remove('hide');
            let delay = setTimeout(() => {
                startGame = false
                remove()
                game.classList.add("hide")
                final.classList.remove("hide")

                owl.owlCarousel({
                    loop: true,
                    margin: 10,
                    nav: false,
                    arrows: false,
                    autoplay: false,
                    autoplayTimeout: 10000,
                    autoplayHoverPause: true,
                    responsive: {
                        0: {
                            items: 1
                        },
                        600: {
                            items: 1
                        },
                        1000: {
                            items: 1
                        }
                    }
                })

            }, 200);
            document.querySelector('.win-lose').innerHTML = '<h2>Well Done!</h2>';
            document.querySelector('.againButton').classList.add('hide');
        }
    }
}

owl.on('dragged.owl.carousel', function (event) {
    owl.trigger('stop.owl.autoplay');
});

function remove() {
    let flower1 = document.querySelectorAll(".flower1");
    let flower2 = document.querySelectorAll(".flower2");
    let banana = document.querySelectorAll(".banana");
    let stone = document.querySelectorAll(".stone");


    flower1.forEach(function (item) {
        gameContainer.removeChild(item);
    })
    flower2.forEach(function (item) {
        gameContainer.removeChild(item);
    })
    banana.forEach(function (item) {
        gameContainer.removeChild(item);
    })
    stone.forEach(function (item) {
        gameContainer.removeChild(item);
    })

}

setInterval(updateScore, 1)



document.querySelector('.screenshoot').addEventListener('click', function () {
    html2canvas(document.querySelector('.canva-container'), {
        onrendered: function (canvas) {
            // document.body.appendChild(canvas);
            return Canvas2Image.saveAsPNG(canvas);
        }
    });
});


