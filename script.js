var buttons = document.querySelectorAll("main button");
var circle = document.querySelector("#circle");
var cross = document.querySelector("#cross");
var chooseButtons = [circle, cross];
var reset = document.querySelector(".reset");
var modal = document.querySelector(".modal");
var activeObj;

var selectActiveObj = function (element) {
    for (let i = 0; i < chooseButtons.length; i++) {
        chooseButtons[i].classList.remove("active");
    }
    element.classList.add("active");
    activeObj = element;
};

circle.addEventListener('click', function () {selectActiveObj(circle);});
cross.addEventListener('click', function () {selectActiveObj(cross);});

var changeActiveObj = function () {
    if (activeObj == circle) {
        selectActiveObj(cross);
    } else {
        selectActiveObj(circle);
    }
};

var addClickToButton = function (element) {
    element.addEventListener('click', function () {
        element.classList.add(activeObj.dataset.obj);
        element.disabled = true;
        checkForWin(activeObj.dataset.obj);
        if (activeObj == circle) {
            selectActiveObj(cross);
        } else {
            selectActiveObj(circle);
        }
    });
};

reset.addEventListener('click', function () {
    clear();
    selectActiveObj(cross);
});

modal.addEventListener('click', function () {
    modal.style.display = "none";
    clear();
});

var clear = function () {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("circle");
        buttons[i].classList.remove("cross");
        buttons[i].disabled = false;
    }
}

var checkForWin = function (obj) {
    var i = buttons;
    if (i[0].className == i[1].className && i[0].className == i[2].className && i[0].className == obj) {showModal();}
    else if (i[3].className == i[4].className && i[3].className == i[5].className && i[3].className == obj) {showModal();}
    else if (i[6].className == i[7].className && i[6].className == i[8].className && i[6].className == obj) {showModal();}
    //horizontal

    else if (i[0].className == i[3].className && i[0].className == i[6].className && i[0].className == obj) {showModal();}
    else if (i[1].className == i[4].className && i[1].className == i[7].className && i[1].className == obj) {showModal();}
    else if (i[2].className == i[5].className && i[2].className == i[8].className && i[2].className == obj) {showModal();}
    //vertical

    else if (i[0].className == i[4].className && i[0].className == i[8].className && i[0].className == obj) {showModal();}
    else if (i[2].className == i[4].className && i[2].className == i[6].className && i[2].className == obj) {showModal();}
    //cross
};

var showModal = function () {
    modal.style.display = "block";
    modal.children[0].children[0].src = activeObj.children[0].src;
}

for (let i = 0; i < buttons.length; i++) {
    addClickToButton(buttons[i]);
}

selectActiveObj(cross);