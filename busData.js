    $("#refresh").click(function(){
      console.log('refreshing')
      var temp = $('#stop-div').html();
      $('#stop-div').html("")
      $('#stop-div').html(temp)
    });