$(document).ready(function(){
  var last=$(document).scrollTop()
  var offset=last
  setInterval(function(){
    last=offset
    offset=$(document).scrollTop()
    var delta=(offset-last)
    if(delta<-200){
      if(!$(".topnav").hasClass('fixed')){
        $(".topnav").addClass("fixed").hide().slideDown({duration:100, easing:'linear'})
        $("body").animate({"margin-top":"100px"}, {duration:100, easing:'linear'})
      }
    }
    if(delta>200){
      if($(".topnav").hasClass('fixed')){
        $(".topnav").slideUp({duration:100, easing:'linear', complete: function(){
          $(this).removeClass('fixed').show()
        }})
        $("body").animate({"margin-top":"0px"}, {duration:100, easing:'linear'})
      }
    }
  },100)
})
$(document).ready(function(){
  var state='closed'
  $('.drawerwrapper').click(function(){
    if(state=='closed'){
      $(this).animate({'width':'400px'})
      state='open'
    }
  })
  $('.drawerwrapper .border').click(function(){
    if(state=='open'){
      $(this).parent().animate({'width':'100px'},function(){
      state='closed'
      })
    }
  })
})
