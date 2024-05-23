$(document).ready(function(){

let win = $(window).width

if(win <= 767){
    mo()
}else{
    pc()
}

function mo(){

    $(".all_button").on("click",function(){
        $(this).siblings("nav").stop().slideToggle();
    })
    
    $(".gnb>li>a").on("click",function(){
        $(this).siblings(".sub").stop().slideToggle()
        .parents().siblings().children(".sub").slideUp();
    })  
    }//mo끝    
function pc(){
$(".gnb>li>a").on("mouseover",function(){
    $(".sub,.bg").stop().slideDown(500)
}).on("mouseout",function(){
    $(".sub,.bg").stop().slideUp(500)
}
)
}
   
    
    
    





























})//document