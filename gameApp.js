var arr = [];
var lco = JSON.parse(localStorage.getItem("reco"));
if(lco !== null){
    arr = lco;
}

var objName = JSON.parse(localStorage.getItem("obj"));

var col = 15;
var row = 12;

var table = document.getElementsByTagName("table")[0];
for(var j = 0; j < row; j++){
    var tr = document.createElement("tr");
    table.appendChild(tr);
    for(var x = 0; x < col; x++){
        var td = document.createElement("td");
        td.setAttribute("onclick","setBox(this)");
        tr.appendChild(td)
    }
}

var player  = [
    {name:objName.p1,box:0,color:"blue"},
    {name:objName.p2,box:0,color:"red"}
];

var tds = document.getElementsByTagName('td');
var ply = document.getElementById("ply");
var c = document.getElementById("c");
var big = document.getElementById("big");
var tss = document.getElementById("status");
for(var i = 0; i < tds.length; i++){
    tds[i].setAttribute("id",i+1);
}

var box;
var p;
var prvBox;
var id;
var num = 0;
var color = "red";
var prop = [
    "border-top-color",
    "border-bottom-color",
    "border-right-color",
    "border-left-color"
];

function setBox(ele){
    prvBox !== undefined?tds[--prvBox].style.background = "darkgray":console.log(prvBox);
    box = ele;
    id = parseInt(box.getAttribute('id'));
    prvBox = id;
    console.log(prvBox);
    box.style.background = "#902f05";
    dis(true);
}

function up(){
    if(id > col){
        document.getElementById(id-col)
            .style[prop[1]] = color
    }
    if(box.style["border-color"] !== color && box.style["border-top-color"] == color){
        alert("Double line not allowed!")
    }
    else{
    box.style[prop[0]] = color;
    scoring();
    }
}

function down(){
    if(col*row >= id+col){
        document.getElementById(id+col)
            .style[prop[0]] = color
    }
    if(box.style["border-color"] !== color && box.style["border-bottom-color"] == color){
        alert("Double line not allowed!")
    }else{
        box.style[prop[1]] = color;
        scoring();
    }
}

function right(){
    if(id % col !== 0){
        document.getElementById(id+1)
            .style[prop[3]] = color
    }
    if(box.style["border-color"] !== color && box.style["border-right-color"] == color){
        alert("Double line not allowed!")
    }else{
        box.style[prop[2]] = color;
        scoring();
    }
}

function left(){
    if(id % col !== 1){
        document.getElementById(id-1)
            .style[prop[2]] = color
    }
    if(box.style["border-color"] !== color && box.style["border-left-color"] == color){
        alert("Double line not allowed!")
    }else{
        box.style[prop[3]] = color;
        scoring();
    }
}


var button = document.getElementsByTagName("button");
function dis(v){
    for(var i = 0; i < 4; i++){
        if(v){
            button[i].removeAttribute("disabled")
        }else{
            button[i].setAttribute("disabled","disabled")
        }
    }
}

function scoring(){
    dis(false);
    num % 2 == 0?p = player[0]:p = player[1];
    if(p == player[0]){
        ply.innerHTML = player[1].name;
        ply.style.background = player[1].color;
    }else{
        ply.innerHTML = player[0].name;
        ply.style.background = player[0].color;
    }
    console.log(p.name);
    box.style.background = "darkgray";

    if(box.style["border-color"] == color){
        ply.innerHTML = p.name;
        ply.style.background = p.color;
        ++p.box;
        box.style.background = p.color;
        box.innerHTML = p.name.substring(0,1);
        box.removeAttribute("onclick");
        prvBox = undefined;
        console.log(p.box);
        --num;
    }
    num++;
    tss.innerHTML = "<ul>" +
        "<li>Total"+ col*row +"</li>" +
        "<li>"+player[0].name+" "+player[0].box+"</li>" +
        "<li>"+player[1].name+" "+player[1].box+"</li>" +
        "</ul><hr><hr>";

    if(player[0].box + player[1].box == row * col){
        big.innerHTML = "";
        c.style.display = "inline-block";
        c.innerHTML =  "" +
            "<b>Total"+ col*row +"</b><hr>" +
            "<b>"+player[0].name+" "+player[0].box+"</b><hr>" +
            "<b>"+player[1].name+" "+player[1].box+"</b>";

        arr.unshift({
            p1Name:player[0].name,
            p2Name:player[1].name,
            p1Box:player[0].box,
            p2Box:player[1].box,
            mar:Math.max(player[0].box,player[1].box) - Math.min(player[0].box,player[1].box)
        });

        localStorage.setItem("reco",JSON.stringify(arr));
        localStorage.removeItem("obj");
    }
}