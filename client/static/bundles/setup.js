
var follows = [] 

$(document).ready(function(){
  $('.friend').click(function(){
    $(this).toggleClass('selected')
  })

  $('.next').click(function(e){
    e.preventDefault()
    $('.selected').each(function(i, elem){
      follows.push($(elem).attr('tid'))
    })
    // console.log(follows)
    // var $form = $('<form action="/setup/complete">')
    // var $follows = $('<input name="follows">').val(follows)
    // $form.append($follows)
    // console.log($form.find('[name=follows]').val())
    // console.log($follows.val())
    // $form.append('<input value="test">')
    // console.log($form)
    // $form.appendTo('body').submit()

    form = document.createElement('postForm');

    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "/setup/complete");

    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "follows");
    hiddenField.setAttribute("value", follows);
    form.appendChild(hiddenField);

    document.body.appendChild(form);
    console.log('SUBMITTING')
    form.submit(); 

    // $.ajax({
    //   url: '/setup/complete',
    //   type: "POST",
    //   data: follows
    // }).done(function(data){
    //   window.location = '/reader'
    // })
  })
})

$(document).ready(function() {
  $(".selectbutton").click(function() {
    $(".friend").addClass('selected');
  })
})
$(document).ready(function() {
  $(".deselect").click(function() {
    $(".friend").removeClass('selected');
  })
})


