$(function () {
    var funList = ["sysTab"]; //初始选项卡的数量及种类，点击手风琴时向内增加，刷新页面后重置
    var funPage = { //选项卡
        //个人信息
        "role": [
            "<li id='roleTab'><a href='#roleTabPage'>个人信息</a></li>",
            "<div id='roleTabPage'>用户信息<br/></div>"
        ],
        //修改密码
        "pms": [
            "<li id='pmsTab'><a href='#pmsTabPage'>修改密码</a></li>",
            "<div id='pmsTabPage'>" +
            "<form method='post'>" +
            "旧密码:<input type='text' name='old'/><br/>" +
            "新密码:<input type='text' name='new'/><br/>" +
            "<input type='submit' value='修改'/></form>" +
            "</div>"
        ],
        //修改信息
        "data": [
            "<li id='dataTab'><a href='#dataTabPage'>修改个人信息</a></li>",
            "<div id='dataTabPage'>修改个人信息" +
            "<form method='post'>" +
            "姓名:<input type='text' name='name'/><br/>" +
            "昵称:<input type='text' name='nickName'/><br/>" +
            "生日:<input type='text' name='birth'/><br/>" +
            "<input type='submit' value='修改'/></form>" +
            "</div>"
        ],
        //图书列表
        "all": [
            "<li id='allTab'><a href='#allTabPage'>图书列表</a></li>",
            "<div id='allTabPage'>图书列表<br/>"+
                "<table id='blist' border='1' width='500'><tr><td>书号</td><td>书名</td><td>作者</td><td>出版社</td><td>价格</td><tr></table></div>"
        ],
        //借书列表
        "borrow": [
            "<li id='borrowTab'><a href='#borrowTabPage'>借书列表</a></li>",
            "<div id='borrowTabPage'>借书列表<br/>"+
                "<table id='borrowlist' border='1' width='500'><tr><td>书号</td><td>书名</td><td>作者</td><td>出版社</td><td>价格</td><tr></table>"+
            "</div>"
        ],
        //还书列表
        "breturn": [
            "<li id='breturnTab'><a href='#breturnTabPage'>还书列表</a></li>",
            "<div id='breturnTabPage'>还书列表<br/>"+
                "<table id='returnlist' border='1' width='500'><tr><td>书号</td><td>书名</td><td>作者</td><td>出版社</td><td>价格</td><tr></table>"+
                "</div>"
        ],
    }
    $("#dialog").dialog({
        autoOpen: false,
        modal: true
    });
    $("#accordion").accordion({
        collapsible: true
    });
    $("#tabs").tabs();
    $("#accordion p").click(function () {
        //alert(this.id);
        var index = funList.indexOf(this.id + "Tab");
        if (index < 0) {
            funList.push(this.id + "Tab");
            $("#tabs ul").append($(funPage[this.id][0]));
            $("#tabs").append($(funPage[this.id][1]));
            $("#tabs").tabs("refresh").tabs({
                active: funList.length - 1
            });
        } else{
            $("#tabs").tabs({
                active: index
            });
        }
    })
    //选项卡双击事件
    $("#tabs ul").on("dblclick", "li", function () {
        var id = this.id;
        if (id == "sysTab") return;
        $("#dialog").dialog({
            buttons: {
                //确认
                OK: function () {
                    $("#" + id).remove();
                    $("#" + id + "Page").remove();
                    funList.splice(funList.indexOf(id), 1);
                    $(this).dialog("close");
                    $("#tabs").tabs("refresh").tabs({
                        active: funList.length - 1
                    });
                    // alert(funList);
                },
                //取消
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        }).dialog("open");
    });
    //用户信息动态添加
    $("#role").one("click", function () {
        $.getJSON("../user.json", function (data) {
            $.each(data.admin, function (i, val) {
                if (i == 0) { //模拟是第二名用户登录系统
                    var str = "<table><tr><td>用户名:</td><td>" + val.nickName +
                        "</td></tr>" +
                        "<tr><td>姓名:</td><td>" + val.name + "</td></tr>" +
                        "<tr><td>性别:</td><td>" + val.gender + "</td></tr>" +
                        "<tr><td>生日:</td><td>" + val.birth + "</td></tr>" +
                        "<tr><td>用户编号:</td><td>" + val.id +
                        "</td></tr></table>";
                    $("#roleTabPage").append(str);
                }
            })
        })
    })

    //图书信息
    $("#all").one("click", function () {
        $.getJSON("../book.json", function (data) {
            $.each(data.booklist, function (i, val) {
                var str = "<tr><td>"+ val.id+"</td><td>"+val.name +"</td><td>"+ val.author +"</td><td>"+ val.pub+"</td><td>"+ val.price+"</td></tr>"
                $("#blist").append(str);
            });
        });
    });

    //借书信息
    $("#borrow").one("click", function () {
        $.getJSON("../book.json", function (data) {
            $.each(data.borrow, function (i, val) {
                var str = "<tr><td>"+ val.id+"</td><td>"+val.name +"</td><td>"+ val.author +"</td><td>"+ val.pub+"</td><td>"+ val.price+"</td></tr>"
                $("#borrowlist").append(str);
            });
        });
    });

    //还书信息
    $("#breturn").one("click", function () {
        $.getJSON("../book.json", function (data) {
            $.each(data.breturn, function (i, val) {
                var str = "<tr><td>"+ val.id+"</td><td>"+val.name +"</td><td>"+ val.author +"</td><td>"+ val.pub+"</td><td>"+ val.price+"</td></tr>"
                $("#returnlist").append(str);
            });
        });
    });

});