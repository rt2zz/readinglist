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
      $(".topnav").addClass("fixed")
    }
    if(delta>200){
      $(".topnav").removeClass("fixed")
    }
  },100)
})

