var List=[
    [
        {pid:0,ptext:"床前明月光,"},
        {pid:1,ptext:"疑是地上霜."},
        {pid:2,ptext:"举头望明月,"},
        {pid:3,ptext:"低头思故乡."}
    ],
    [
        {pid:0,ptext:"煮豆持作羹,"},
        {pid:1,ptext:"漉菽以为汁."},
        {pid:2,ptext:"萁在釜下燃,"},
        {pid:3,ptext:"豆在釜中泣."},
        {pid:4,ptext:"本自同根生,"},
        {pid:5,ptext:"相煎何太急?"}
    ]
];
var index=0;
var len=List.length-1;
$(function(){
    play(List);
});
function play(List){
    var poemList=List[index].sort(function(){//打乱原数组
        return 0.5-Math.random();
    });
    $.each(poemList,function(id,value){
        $("#poem").append($("<tr id="+value.pid +"><td>"+value.ptext+"</td></tr>"));
    });
    $("#poem").tableDnD({
        onDrop:function(table,row){
            var flag=true;
            $(table).find("tr").each(function(id,element){
                if(id!=element.id){
                    flag=false;
                }; 
            });
            if(flag){
                if(confirm("过关")){
                    if(index!=len){
                        index++;    
                    }else{
                        index=0;
                    }
                    $("#poem").empty();
                    play(List);
                }
            };
        }
    });
}