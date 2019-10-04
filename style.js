var mainContainer = $(".main-container");

var pName = $("<p>");
pName.attr("class", "p-name p-main col s12");
pName.text("TEST");
var pDate = $("<p>");
pDate.attr("class", "p-date p-sub col s6");
pDate.text("TEST");
var pLocation = $("<p>");
pLocation.attr("class", "p-location p-sub col s6");
pLocation.text("TEST");

var row = $("<div>");
row.attr("class", "row");

var leftBtn1 = $("<div>");
leftBtn1.attr("class", "col s8 offset-s2 left-Btn1");

var leftBtn2 = $("<div>");
leftBtn2.attr("class", "col s8 offset-s2 left-Btn2");

var rightBtn1 = $("<div>");
rightBtn1.attr("class", "col s8 offset-s2 right-Btn1");

var rightBtn2 = $("<div>");
rightBtn2.attr("class", "col s8 offset-s2 right-Btn2");

var leftDiv = $("<div>");
leftDiv.attr("class", "col s5 offset-s1 left-div");

var rightDiv = $("<div>");
rightDiv.attr("class", "col s5 right-div");

row.append(pName);
rightBtn2.append(row);
row.append(pDate, pLocation);
rightBtn2.append(row);

row.append(pName);
rightBtn1.append(row);
row.append(pDate, pLocation);
rightBtn1.append(row);

row.append(pName);
leftBtn2.append(row);
row.append(pDate, pLocation);
leftBtn2.append(row);

row.append(pName);
leftBtn1.append(row);
row.append(pDate, pLocation);
leftBtn1.append(row);

rightDiv.append(rightBtn1, rightBtn2);
leftDiv.append(leftBtn1, leftBtn2);

mainContainer.append(leftDiv, rightDiv);