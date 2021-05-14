function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomColor() {
    let colorVal = "#" + getRandomInt(0, 256).toString(16) + getRandomInt(0, 256).toString(16) + getRandomInt(0, 256).toString(16);
    console.log('colorValは: ' + colorVal);
    return colorVal;
}

var canvas = document.getElementById("myCanvas"); //htmlをjsで扱う
var ctx = canvas.getContext("2d"); //2dとして土地を扱う

class Dvds {
    constructor(x, y, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }
}

dvd_list = [];

var infinity = false;

function add_dvd() {
    dvd_list.push(new Dvds(
        getRandomInt(60, canvas.width - 60),
        getRandomInt(60, canvas.height - 60),
        2 * getRandomInt(0, 2) - 1,
        2 * getRandomInt(0, 2) - 1,
        '#333333'
    ));
}

function inf() {
    infinity = true;
}

function res() {
    dvd_list.splice(1);
    infinity = false;
}

add_dvd();

// たまをうごかす
function drawBall() {
    ctx.beginPath();
    ctx.font = "48px bold sans-serif";
    ctx.textAlign = "center";
    // for (let i = 0; i < dvd_list.length; i++) {
    //     ctx.fillStyle = dvd_list[i].color;
    //     ctx.fillText("DVD", dvd_list[i].x, dvd_list[i].y);
    //     console.log('drawball:' + i + ', drawBallColor:' + dvd_list[i].color);
    // }
    dvd_list.forEach(function (element) {
        ctx.fillStyle = element.color;
        ctx.fillText("DVD", element.x, element.y);
        // console.log('drawBallColor:' + element.color);
    });
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    // let randColor = getRandomColor();
    text_info = ctx.measureText("DVD");
    // for (let i = 0; i < dvd_list.length; i++) {
    //     if (dvd_list[i].x + dvd_list[i].dx > canvas.width - text_info.actualBoundingBoxLeft || dvd_list[i].x + dvd_list[i].dx < text_info.actualBoundingBoxRight) { // もしx軸上の範囲外に行ったら
    //         dvd_list[i].dx = -dvd_list[i].dx; // dxの正負を逆転
    //         dvd_list[i].color = getRandomColor();
    //         // console.log('左右の壁にあたった');
    //         console.log('drawのi' + i + ', 跳ね返り色:' + dvd_list[i].color);

    //         if (infinity === true) {
    //             add_dvd();
    //         }
    //     }
    //     if (dvd_list[i].y + dvd_list[i].dy > canvas.height - text_info.actualBoundingBoxDescent || dvd_list[i].y + dvd_list[i].dy < text_info.actualBoundingBoxAscent) { // もしy軸上の範囲外に行ったら
    //         dvd_list[i].dy = -dvd_list[i].dy; // dyの正負を逆転
    //         dvd_list[i].color = getRandomColor();
    //         // console.log('跳ね返り色:' + element.color);
    //         // console.log('上下の壁にあたった');
    //         console.log('drawのi' + i + ', 跳ね返り色:' + dvd_list[i].color);

    //         if (infinity === true) {
    //             add_dvd();
    //         }
    //     }
    //     dvd_list[i].x += dvd_list[i].dx;
    //     dvd_list[i].y += dvd_list[i].dy;
    //     document.getElementById("edit_area").innerHTML = "<p>DVD Counter: " + dvd_list.length + "</p><p>Infinity Mode: " + infinity + "</p>";
    //     drawBall();
    // }

    dvd_list.forEach(function (element) {
        if (element.x + element.dx > canvas.width - text_info.actualBoundingBoxLeft || element.x + element.dx < text_info.actualBoundingBoxRight) { // もしx軸上の範囲外に行ったら
            element.dx = -element.dx; // dxの正負を逆転
            element.color = getRandomColor();
            // console.log('左右の壁にあたった');
            // console.log('跳ね返り色:' + element.color);

            if (infinity === true) {
                add_dvd();
            }
        }
        if (element.y + element.dy > canvas.height - text_info.actualBoundingBoxDescent || element.y + element.dy < text_info.actualBoundingBoxAscent) { // もしy軸上の範囲外に行ったら
            element.dy = -element.dy; // dyの正負を逆転
            element.color = getRandomColor();
            // console.log('跳ね返り色:' + element.color);
            // console.log('上下の壁にあたった');
            if (infinity === true) {
                add_dvd();
            }
        }
        element.x += element.dx;
        element.y += element.dy;
        document.getElementById("edit_area").innerHTML = "<p>DVD Counter: " + dvd_list.length + "</p><p>Infinity Mode: " + infinity + "</p>";
    });
}
setInterval(draw, 10);