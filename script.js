var buttons = document.querySelectorAll("main button");
var circle = document.querySelector("#circle");
var cross = document.querySelector("#cross");
var reset = document.querySelector(".reset");
var activeObj = cross;
var clickCounter = 0;

var selectActiveObj = function (element) {
    cross.classList.remove("active");
    circle.classList.remove("active");
    element.classList.add("active");
    activeObj = element;
};

circle.addEventListener('click', function () {selectActiveObj(circle);cross.disabled = true;circle.disabled = true;});
cross.addEventListener('click', function () {selectActiveObj(cross);cross.disabled = true;circle.disabled = true;});

var changeObj = function () {
    if (activeObj == circle) {
        selectActiveObj(cross);
    } else {
        selectActiveObj(circle);
    }
}

var addClickToButton = function (element) {
    element.addEventListener('click', function () {
        cross.disabled = true;
        circle.disabled = true;
        element.classList.add(activeObj.dataset.obj);
        element.disabled = true;
        clickCounter++;
        checkForWin(activeObj.dataset.obj);
    });
};

reset.addEventListener('click', function () {clear();});

var clear = function () {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("circle");
        buttons[i].classList.remove("cross");
        buttons[i].disabled = false;
    }
    clickCounter = 0;
    cross.disabled = false;
    circle.disabled = false;
    selectActiveObj(cross);
}

var checkForWin = function (obj) {
    var i = buttons;
    if (i[0].className == i[1].className && i[0].className == i[2].className && i[0].className == obj) {roundEnds();}
    else if (i[3].className == i[4].className && i[3].className == i[5].className && i[3].className == obj) {roundEnds();}
    else if (i[6].className == i[7].className && i[6].className == i[8].className && i[6].className == obj) {roundEnds();}
    //horizontal

    else if (i[0].className == i[3].className && i[0].className == i[6].className && i[0].className == obj) {roundEnds();}
    else if (i[1].className == i[4].className && i[1].className == i[7].className && i[1].className == obj) {roundEnds();}
    else if (i[2].className == i[5].className && i[2].className == i[8].className && i[2].className == obj) {roundEnds();}
    //vertical

    else if (i[0].className == i[4].className && i[0].className == i[8].className && i[0].className == obj) {roundEnds();}
    else if (i[2].className == i[4].className && i[2].className == i[6].className && i[2].className == obj) {roundEnds();}
    //diagonal

    else {
        changeObj();
        if (clickCounter === 9) {
            roundEnds(clickCounter);
        }
    }
};

var roundEnds = function (clickCounter) {
    if (clickCounter === 9) {
        var modal = document.querySelector(".draw");
    } else {
        var modal = document.querySelector(".win");
        modal.children[0].children[0].src = activeObj.children[0].src;
    }
    modal.style.display = "block";
    restartGame(modal);
}

var restartGame = function (element) {
    element.addEventListener('click', function () {
        element.style.display = "none";
        clear();
    });
}

for (let i = 0; i < buttons.length; i++) {
    addClickToButton(buttons[i]);
}