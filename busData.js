    $("#toggle").click(function(){
      $("#times").toggle();
    });

    $("#refresh").click(function(){
      getTimes()
      console.log('refreshing')
    });


    var getTimes = function() {
      var Pierponturl = 'http://www.corsproxy.com/mbus.doublemap.com/map/v2/eta?stop=98'
      var FXBurl = 'http://www.corsproxy.com/mbus.doublemap.com/map/v2/eta?stop=91'
      $("#CS").html("")
      $("#NW").html("")
      $("#CN").html("")
      $("#NE").html("")
      $.get(Pierponturl, function(data){
          $.each(data['etas']['98']['etas'], function(i, item){
            //console.log(data['etas']['98']['etas'][0])
            console.log(item)
            if(item.route == 98 || item.route == 99)
              $("<li>"+ item.avg +" minutes</li>").appendTo("#NW")
            else if(item.route == 92)
              $("<li>"+ item.avg +" minutes</li>").appendTo("#CS")
          })

      })

      $.get(FXBurl, function(data){
          $.each(data['etas']['91']['etas'], function(i, item){
            //console.log(data['etas']['98']['etas'][0])
            console.log(item)
            if(item.route == 89)
              $("<li>"+ item.avg +" minutes</li>").appendTo("#CN")
            else if(item.route == 102)
              $("<li>"+ item.avg +" minutes</li>").appendTo("#NE")
          })

      })
    }

    getTimes();