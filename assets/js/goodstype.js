function hide(){
    /*默认隐藏*/
    $("nav .indexAsideNav").hide();
    /*鼠标事件*/
    $("nav .category").mouseover(function(){
        $(".asideNav").slideDown();
    });
    $("nav .asideNav").mouseleave(function(){
        $(".asideNav").slideUp();
    });
}
function show(){
    /*默认显示*/
    $("nav .indexAsideNav").show();
    /*卸载鼠标事件*/
    $("nav .category").off("mouseover");
    $("nav .asideNav").off("mouseleave");
}
//导出这两个函数
export {hide,show}