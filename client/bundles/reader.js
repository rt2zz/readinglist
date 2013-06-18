$(document).ready(function(){
  var last=$(document).scrollTop()
  var offset=last
  setInterval(function(){
    console.log("interval")
    last=offset
    offset=$(document).scrollTop()
    var delta=(offset-last)
    console.log(delta)  
    if(delta<-200){
      if(!$(".topnav").hasClass('fixed')){
        $(".topnav").addClass("fixed").hide().slideDown({duration:100, easing:'linear'})
        $("body").animate({"margin-top":"100px"}, {duration:100, easing:'linear'})
      }
    }
    if(delta>200){
      if($(".topnav").hasClass('fixed')){
        $(".topnav").slideUp({duration:100, easing:'linear', complete: function(){
          $(this).removeClass('fixed')
        }})
        $("body").animate({"margin-top":"0px"}, {duration:100, easing:'linear'})
      }
    }
  },100)
})

