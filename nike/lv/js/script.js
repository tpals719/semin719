$(document).ready(function(){



$(".all_button").on("click",function(){
    $(this).siblings(".gnb").stop().slideToggle();
})

$(".gnb>li>a").on("mouseover",function(){
    $(this).siblings(".sub").stop().slideDown();
})
$(".gnb>li>a").on("mouseout",function(){
    $(this).siblings(".sub").stop().slideUp();
})































})//document