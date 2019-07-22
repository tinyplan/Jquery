var id;
var name;
var author;
var pub;
var price;
$(function () {
    $("button").button();
    $.ajax({
        url: "../book.json", //json文件位置
        type: "GET", //请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) { //请求成功完成后要执行的方法 
            //each循环 使用$.each方法遍历返回的数据date
            $.each(data.booklist, function (i, item) {
                var str = "<tr><td>" + item.id +
                    "</td><td>" + item.name +
                    "</td><td>" + item.author +
                    "</td><td>" + item.pub +
                    "</td><td>" + item.price +
                    "</td><td><button id='update'>修改</button><button id='delete'>删除</button></td></tr>";
                $("#list").append(str);
            })
        }
    });

    $("body").on("click", "#update", function () {
        var $father = $(this).parent().parent();
        id = $father.children().eq(0).text();
        name = $father.children().eq(1).text();
        author = $father.children().eq(2).text();
        pub = $father.children().eq(3).text();
        price = $father.children().eq(4).text();

        var $tr = "<tr><td><input type='text' value='" + id + "' id='id1'/>" +
            "</td><td><input type='text' value=' " + name + "' id='name1'/>" +
            "</td><td> <input type='text' value=' " + author + " ' id = 'author1'/>" +
            "</td><td> <input type='text' value=' " + pub + "' id = 'author1'/>" +
            "</td><td> <input type='text' value=' " + price + "' id = 'price1'/>" +
            "</td><td><button id='submit'>确认</button><button id='cancel'>取消</button></td></tr>";
        $father.replaceWith($tr);
    });

    $("body").on("click", "#submit", function () {
        var $father = $(this).parent().parent();
        if (confirm("确认修改")) {
            var id1 = $father.children().eq(0).children().eq(0).val();
            var name1 = $father.children().eq(1).children().eq(0).val();
            var author1 = $father.children().eq(2).children().eq(0).val();
            var pub1 = $father.children().eq(3).children().eq(0).val();
            var price1 = $father.children().eq(4).children().eq(0).val();

            var $tr = "<tr><td>" + id1 +
                "</td><td>" + name1 +
                "</td><td>" + author1 +
                "</td><td>" + pub1 +
                "</td><td>" + price1 +
                "</td><td><button id='update'>修改</button><button id='delete'>删除</button></td></tr>";
            $father.replaceWith($tr);
        } else {
            var $tr = "<tr><td>" + id +
                "</td><td>" + name +
                "</td><td>" + author +
                "</td><td>" + pub +
                "</td><td>" + price +
                "</td><td><button id='update'>修改</button><button id='delete'>删除</button></td></tr>";
            $father.replaceWith($tr);
        }
    });

    $("body").on("click", "#cancel", function () {
        var $father = $(this).parent().parent();
        var $tr = "<tr><td>" + id +
            "</td><td>" + name +
            "</td><td>" + author +
            "</td><td>" + pub +
            "</td><td>" + price +
            "</td><td><button id='update'>修改</button><button id='delete'>删除</button></td></tr>";
        $father.replaceWith($tr);
    });

    $("body").on("click", "#delete", function () {
        if (confirm("删除数据")) {
            $(this).parent().parent().remove();
        }
    });

    $("body").on("click", "#add", function () {
        var $father = $(this).parent().parent();
        var id1 = $father.children().eq(0).children().eq(0).val();
        var name1 = $father.children().eq(1).children().eq(0).val();
        var author1 = $father.children().eq(2).children().eq(0).val();
        var pub1 = $father.children().eq(3).children().eq(0).val();
        var price1 = $father.children().eq(4).children().eq(0).val();

        var $tr = "<tr><td>" + id1 +
            "</td><td>" + name1 +
            "</td><td>" + author1 +
            "</td><td>" + pub1 +
            "</td><td>" + price1 +
            "</td><td><button id='update'>修改</button><button id='delete'>删除</button></td></tr>";
        $("#list").append($tr);

        $tr = "<tr id='trinput'>" +
            "<td><input type='text' id='id' width='80px' /></td>" +
            "<td><input type='text' id='name' width='80px'/></td>" +
            "<td><input type='text' id='author' width='80px' /></td>" +
            "<td><input type='text' id='pub' width='80px' /></td>" +
            "<td><input type='text' id='price' width='80px' /></td>" +
            "<td colspan='2'><button id='add' width=80px>添加</button></td>" +
            "</tr>";
        $father.replaceWith($tr);
    });
});