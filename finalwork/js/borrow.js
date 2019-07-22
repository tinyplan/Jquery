var id;
var name;
var author;
var pub;
var price;
var num=0;
$(function () {
    $.ajax({
        url: "../book.json", //json文件位置
        type: "GET", //请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) { //请求成功完成后要执行的方法 
            //each循环 使用$.each方法遍历返回的数据date
            $.each(data.breturn, function (i, item) {
                var str = "<tr><td>" + item.id +
                    "</td><td>" + item.name +
                    "</td><td>" + item.author +
                    "</td><td>" + item.pub +
                    "</td><td>" + "可借阅" +
                    "</td><td><button id='borrow'>借书</button></td></tr>";
                $("#list").append(str);
            })
        }
    });

    $("body").on("click", "#borrow", function () {
        var str = $(this).parent().prev().text();
        if (str == "已借阅") {
            alert("该图书已借阅");
        } else {
            num++;
            $("#info").html("您已借阅"+ num +"本图书");
            $(this).parent().prev().text("已借阅");
        }
    });
});