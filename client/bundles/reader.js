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
    
    var mainHeight = $('.content').height()
    var rightHeight = $('#right').height()
    var maxDiff = (mainHeight-rightHeight)
    console.log('maxDiff', maxDiff)
    var docHeight = $(document).height()
    console.log('docHeight', docHeight)

  $(window).scroll(function(){
    var offset = $(window).scrollTop();
    console.log('offset', offset)
    var windowHeight = window.innerHeight
    console.log('windowHeight', windowHeight)
    var maxOffset = docHeight-windowHeight
    console.log('maxOffset', maxOffset)
    var diff = maxDiff*(offset/maxOffset)
    $('#right').css({'margin-top':diff})
    console.log(diff)
})
}




