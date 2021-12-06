var flag = true;
function submit() {
    validate();
}

function validate() {
    var a,b,c;
    flag = true;
    if (document.getElementById("coeffA").value === "") {
        a = 0;
    } else {
        if (isNaN(a = parseFloat(document.getElementById("coeffA").value))) {
            flag = false;
        }
    }
    if (document.getElementById("coeffB").value === "") {
        b = 0;
    } else {
        if (isNaN(b = parseFloat(document.getElementById("coeffB").value))) {
            flag = false;
        } 
    }
    if (document.getElementById("coeffC").value === "") {
        c = 0;
    } else {
        if (isNaN(c = parseFloat(document.getElementById("coeffC").value))) {
            flag = false;
        }
    }
    if (flag === true) {
        findRoots(a,b,c);
    }
    else {
        alert("Invalid input");
    }
}

function findRoots(a, b, c) {
    var result;
    if (a == 0 && b == 0 && c == 0) {
        result = "Любое действительное число может быть корнем";
    }
    else {
        if (a == 0 && b == 0) {
            result = "Корней нет, функция - прямая, параллельная оси Ox";
        }
        else if (a == 0) {
            result = "Единственный корень, x = " + -c/b;
        } 
        else {
            var d = b*b - 4*a*c;
            if (d < 0) {
                result = "Корней нет, дискриминант отрицателен"
            }
            else {
                if (d == 0) {
                    result = "Единственный корень, x = " + -b/(2*a);
                }
                else {
                    result = "Два корня: x1 = " + parseFloat(((-b + Math.sqrt(d))/(2*a)).toFixed(4)) + ", x2 = " 
                    + parseFloat(((-b - Math.sqrt(d))/(2*a)).toFixed(4));
                }
            }
        }
    }
    addResultRow(a,b,c,result);
}

function addResultRow(a,b,c,result) {
    var table = document.getElementById("results");
    var resultsRow = document.createElement("tr");
    var exprCol = document.createElement("td");
    exprCol.style.textAlign = "center";
    var resCol = document.createElement("td");
    resCol.style.textAlign = "center";
    var expr = "";
    if (a != 0) {
        expr = a + "x^2";
    }
    if (b > 0 && a != 0) {
        expr = expr + " + " + b + "x";
    }
    else if (b != 0) {
        expr = expr + b + "x";
    }
    if ((a != 0 || b != 0) && c > 0) {
        expr = expr + " + " + c;
    }
    else if (c < 0 || (a == 0 && b == 0)) {
        expr = expr + c;
    }
    expr = expr + " = 0";
    var parsedExpr = expr.split("^2");
    var exprText1 = document.createTextNode(parsedExpr[0]);
    exprCol.appendChild(exprText1);
    if (parsedExpr.length > 1) {
        var index = document.createElement("sup");
        index.innerText = "2";
        exprCol.appendChild(index);
        var exprText2 = document.createTextNode(parsedExpr[1]);
        exprCol.appendChild(exprText2);
    }
    var resText = document.createTextNode(result);
    resCol.appendChild(resText);
    var delButton = document.createElement("button");
    delButton.textContent = "Удалить";
    delButton.addEventListener("click", delRow);
    delButton.style.textAlign = "center";
    delButton.style.width = "100%";
    delButton.style.height = "100%";
    delButton.style.backgroundColor = window.getComputedStyle(resCol).backgroundColor;
    resultsRow.appendChild(exprCol);
    resultsRow.appendChild(resCol);
    resultsRow.appendChild(delButton);
    table.appendChild(resultsRow);
}

function delRow() {
    document.getElementById("results").removeChild(this.parentNode);
}