"use strict";
/*global alert: true, console */
(function ($) {
  function visualize() { 
    //Here what should happen
    //1- get the code written by the student
    $('#container div').empty();
    // Code from Dan to send the code of the student to the server
    var data = {};
    data.code = $('#studentCodeTextArea').val();

    /* Send the data using post and put the results in a div */
    jQuery.ajax({
      url: "http://opendsa.cc.vt.edu:8090/api/v1/studentcode/startvisualizing/",
      type: "post",
      data: data,
      contentType: "application/json; charset=utf-8",
      datatype: "json",
      xhrFields: {withCredentials: true},
      success: function(data) {
        // alert("success");
        //alert (data.data);
        //reset(true);
        if (data.data == "Empty") {
          alert("Please enter a code to visualize!")
        }
        else {
          eval(data.data );
        } 
      },
      error:function(data) {
        //alert("failure");
        $("#result").html('there is an error while submit');
      }   
    });
  }
}(jQuery));
