$(document).ready(function(){

  var last=$(document).scrollTop()
  var offset=last

  var lastPost = 0

  $('.content').waypoint(function(dir){
    if(dir == 'down') hideNav()
    else showNav() 
  })

  setInterval(function(){
    last=offset
    offset=$(document).scrollTop()
    var delta=(offset-last)
    
    //show
    if(delta<-120){
      showNav()
    }
    //hide
    if(delta>120){
      hideNav()
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

function showNav(){
  var dur = 150
  var $enav = $('.topnav')
  var margin = $enav.outerHeight()

  $(".brand").animate({"left":"0px"}, dur)
  $enav.animate({'margin-top':0}, dur)
  $("body").animate({"margin-top":'0px'}, dur)
}

function hideNav(){
  var dur = 150
  var $enav = $('.topnav')
  var margin = $enav.outerHeight()

  $(".brand").animate({"left":"-100%"}, dur)
  $enav.animate({'margin-top':'-'+margin+'px'}, dur)
  $("body").animate({"margin-top":'-'+margin+'px'}, dur)
}

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
        // $("body").css("margin-left", "100%").animate({"margin-left": 0})
});

$(document).ready(function() {
  $(".set").click(function(){
    $(".settings").toggle()
    $(".set").toggleClass("active")
    $(".icon.icon-cog").toggleClass("icon-spin")
  })

})
$(document).ready(function() {
  // $('select#fonts').fontSelector({
  //   options: {
  //     inSpeed: 250,
  //     outSpeed: "slow"
  //   },
    
  //   fontChange: function(e, ui) {
  //     $(".content").css({"font-family":ui.font})
  //   console.log(ui.font)
  //   },
  //   styleChange: function(e, ui) {

  //   }
  // });
})
$(document).ready(function() {

  $("select#size").change(function() {
      $('.content').css("font-size", $(this).val() + "px");
  });
})

$(document).ready(function(){
  $('.item').click(function(){
    var i = $(this).attr('index')
    $('h1.title').text(articles[i].parts.title)
    $('.articleBody').text(articles[i].parts.text)
    $('pre.articleJson').text(JSON.stringify(articles[i], null, 2))
  })
})
