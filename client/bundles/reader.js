$(document).ready(function(){

  var last=$(document).scrollTop()
  var offset=last

  var $enav = $('.topnav')
  var margin = $enav.outerHeight()
  var dur = 150

  setInterval(function(){
    last=offset
    offset=$(document).scrollTop()
    var delta=(offset-last)
    
    //show
    if(delta<-120){
      if(!$enav.hasClass('fixed')){
        $(".brand").css({'left': '-100%'}).animate({"left":"0px"}, dur)
        $enav.addClass("fixed").css({'margin-top': '-'+margin+'px'}).animate({'margin-top':0}, dur)
        //hide().slideDown({duration:100, easing:'linear'})
        $("body").animate({"margin-top":margin+'px'}, dur)

      }
    }
    //hide
    if(delta>120){
      if($enav.hasClass('fixed')){
        $(".brand").animate({"left":"-100%"}, dur)
        $enav.animate({'margin-top':'-'+margin+'px'}, dur, function(){
          $enav.removeClass('fixed').css({'margin-top':0})

        })
        $("body").animate({"margin-top":"0px"}, dur)

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

$(document).ready(function() {
  $(".set").click(function(){
    $(".settings").toggle()
    $(".set").toggleClass("active")
  })

})
$(document).ready(function() {
  $('select#fonts').fontSelector({
    options: {
      inSpeed: 250,
      outSpeed: "slow"
    },
    
    fontChange: function(e, ui) {
      $(".content").css({"font-family":ui.font})
    console.log(ui.font)
    },
    styleChange: function(e, ui) {

    }
  });
})
