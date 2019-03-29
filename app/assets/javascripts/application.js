// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.

// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.

// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.

// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.

// = require_self
= require application/jquery
// = require application/jquery-ui.min
// = require application/jquery.form.min
// = require jquery_ujs
// = require twitter/bootstrap
// = require bootstrap-tagsinput
// = require jquery_nested_form
// = require application/main
// = require application/jquery.ui.touch-punch.min
// = require application/Tocca.min



function get_data(url, data, callback, data_type){
  return $.ajax({
    url: url,
    dataType: data_type || "json",
    data: data,
    success: function( data ) {
      callback(data);
    },
    error: function(data){
      callback(data);
    }
  });
}

// Dependency function: required jquery-geoLocation plugin in place
// along with the function map called to set options for the geoLocation 
// for the holder with id attr_holder
function initMap(attr_holder){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      map(attr_holder, { latitude: position.coords.latitude, longitude: position.coords.longitude });
    });
  } else { 
    map(attr_holder);
  }
}

function gst_no_strength_indicator(gst_no){
  gst = gst_no.parent();

  gst_no.attr("placeholder", 'must be 15 characters')
  $(gst_no).on("keyup", function(){
    if (gst_no.val().length === 15) {
      confirmed(gst);
      gst_no.css('border-bottom-color','rgba(37, 212, 168, 1)');
    } else {
      bg_col = "#fff";
      col = "#D91B34";
      popover_msg = 'GST No must be 15 characters';
      update_popover(gst, popover_msg);
      gst_no.css('border-bottom-color','#666');
    }
  });
}

function password_strength_indicator(password, password_confirmation){
  password.attr("placeholder", "Use upper case or lower case, numbers or symbols to make password stronger.");
  
  pass = password.parent();
  pass_confirm = password_confirmation.parent();

  $(password).on('keyup', function() {
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var okRegex = new RegExp("(?=.{8,}).*", "g");
    if (okRegex.test(password.val()) === false) {
      bg_col = '#fff';
      col = "#D91B34";
      popover_msg = 'Password must be min 8 characters';
      update_popover(pass, popover_msg);
      password.css('border-bottom-color','#666');
    }else if (strongRegex.test(password.val())) {
      confirmed(pass);
      password.css('border-bottom-color','rgba(37, 212, 168, 1)');
    }else if (mediumRegex.test(password.val())) {
      confirmed(pass);
      password.css('border-bottom-color','rgba(37, 212, 168, 0.9)');
    }else {
      confirmed(pass);
      password.css('border-bottom-color','rgba(37, 212, 168, 0.8)');
    }
    check_both();
  });
  password.blur(function(){
    please_confirm();
  });
  $(password_confirmation).on('keyup', function() {
    if(password.val() == '' && password_confirmation.val() != ''){
      bg_col = '#fff';
      col = "#666";
      popover_msg = 'Please Fill Password Field First';
      update_popover(pass_confirm, popover_msg);
    } else {
      pass_confirm.popover("destroy");
    }
    check_both();
  }); 
  password_confirmation.blur(function(){
    please_confirm();
  });
  function check_both(){
    if(password.val() != '' && password_confirmation.val() != ''){
      if(password_confirmation.val() != password.val()){  
        bg_col = '#f88787';
        popover_msg = '-';
        update_popover(pass_confirm, popover_msg);
        pass_confirm.siblings('.popover').html("<i class='fa fa-times-circle'></i>");
        password_confirmation.css('border-bottom-color','#f88787');
        return false;
      } 
      else if(password_confirmation.val() == password.val()){
        confirmed(pass_confirm);
        password_confirmation.css('border-bottom-color','rgb(37, 212, 168)');
      }
    }
    else if(password.val() != '' && password_confirmation.val() == ''){
      pass_confirm.popover("destroy");
      password_confirmation.css('border-bottom-color','#666');
    }
  }
  function please_confirm(){
    if(password.val() != '' && password_confirmation.val() == ''){
      bg_col = '#fff';
      col = "#D91B34";
      popover_msg = 'Please confirm password';
      update_popover(pass_confirm, popover_msg);
      return false;
    } 
  }

  return true;
}

function confirmed(pass_check){
  col = "";
  bg_col = '#22d4ae';
  popover_msg = '-';
  update_popover(pass_check, popover_msg);
  pass_check.siblings('.popover').html("<i class='fa fa-check-circle'></i>");
  return false;
}

function update_popover(pass_holder, pass_msg){
  pass_holder.popover("destroy");
  pass_holder.popover({
    placement: "right",
    trigger: "manual",
    content: pass_msg
  }).popover("show");
  pass_holder.siblings('.popover').css({'background':bg_col, 'color':col, 'z-index':'1'});
}

function post_data(url, data, callback){
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: data,
    success: function( data ) {
      callback(data);
    },
    error: function(data){
      callback(data);
    }
  });
}

function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

function diff_months(en_d, st_d) {
  var diff =(en_d.getTime() - st_d.getTime()) / 1000;
  diff /= (60 * 60 * 24 * 7 * 4);
  return Math.abs(Math.round(diff));
}

function date_picker() {
  $("#startDate").datepicker({
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    changeYear: true,
    maxDate: 0,
    onSelect: function(selected) {
      $("#endDate").datepicker("option","minDate", selected)
    }
  });

  $("#endDate").datepicker({
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    changeYear: true,
    maxDate: 0,
    onSelect: function(selected) {
      $("#startDate").datepicker("option","maxDate", selected)
    }
  });
}

function get_page_num(url_params){
  var pg = 1;
  $.each( url_params, function( i, v ) {
    var index = v.indexOf("page=")
    if(index > -1){
      pg = v.split('page=')[1];
      return pg;
    }
  });
  return pg;
}
