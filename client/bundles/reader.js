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
          $(".brand").animate({"margin-left":"0px"}, {duration:100, easing:'linear'})

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
      $(this).animate({'width':'400px'},function(){
        scroller()
      })
      $(this).removeClass('closed')
      state='open'
      $('.drawer .icon-double-angle-left').fadeOut()
      $('.border .icon-double-angle-right').fadeIn()
    }
  })
  $('.drawerwrapper .border').click(function(){
    if(state=='open'){
      $('.drawer .icon-double-angle-left').fadeIn()
      $('.border .icon-double-angle-right').fadeOut()
      $(this).parent().addClass('closed')
      $(this).parent().animate({'width':'100px'},function(){
        state='closed'
      })
    }
  })
})

function scroller(){
    
  var rightHeight = $('#right').height()
  var docHeight = $(document).height()

  $(window).scroll(function(){
    var offset = $(window).scrollTop();
    var windowHeight = window.innerHeight
    var maxDiff = rightHeight - windowHeight
    var maxOffset = docHeight-windowHeight
    var diff = maxDiff*(offset/maxOffset)
    $('#right').css({'margin-top':-diff})
  })
}

$(document).ready(function() {
        $("body").css("margin-left", "100%").animate({"margin-left": 0})
});



