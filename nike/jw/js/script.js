$(document).ready(function(){



$(".all_button").on("click",function(){
    $(this).siblings("nav").stop().slideToggle();
})

$(".gnb>li>a").on("click",function(){
    $(this).siblings(".sub").stop().slideToggle();
})
































})//document