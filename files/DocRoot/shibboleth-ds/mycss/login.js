$(document).ready(function() {

$('.input-go').blur(function() {
	this.value=removeSpaces(this.value);
});

	$(window).resize(function() {
		StickyFooter();
	});

  var backups = readCookie('backups');
  if (backups == null) {
    $(".backup-devices").hide();
	StickyFooter();
  } else {
    showBackupFull()
    $(".passcode-options").hide();
    $("#otp").focus();

    var activedevice = readCookie('active-device');
    var activefactor = readCookie('active-factor');
    var activeid = '#device-' + activedevice + '-' + activefactor;
    var otptext;
    var helptext;
    var up_arrow = '<a class="up-arrow click-focus" href="#mf-backup"><i class="fa fa-chevron-circle-up"></i></a>';
    if (activefactor == "o30") {
      helptext = "When your code arrives, enter it in the box at the top of the page. " + up_arrow;
      otptext = "<p class='help-text'>When your code arrives, enter it above.</p>";
    }

    if (activefactor == "v") {
      helptext = "Follow the instructions in the phone call.";
      otptext="";
    }

    if (activefactor == "mp") {
      helptext = "Approve the request on your device.";
      otptext="";
    }

    $(activeid + ' .backup-button').after("<p>" + helptext + "</p>");
    $("#otp-box").after(otptext);
    var text = $(activeid + ' .backup-button').attr("value") + " Again";
    $(activeid + ' .backup-button').attr('value', text).addClass("sent");

  }
  // end of there's a cookie

  $(".passcode-options").click(function() {
    showBackupFull()
    return false;
  });

  $(".close-link").click(function() {
    hideBackupFull()
    return false;
  });

  $('.factor-button').bind('submit', function() {
    var device = $(this).children("input[name='device_id']").val();
    createCookie('active-device', device, 5);
    var factor = $(this).children("input[name='factor_type']").val();
    createCookie('active-factor', factor, 5);
  });

  $(".click-focus").click(function() {
    $("#otp").focus();
    return false;
  });

  $(".authenticator.other").click(function() {
    var otptext;
    $("#otp").focus();
    otptext = "<p class='help-text'>Open your authenticator app and enter the passcode above.</p>";
    $("#otp-box").after(otptext);
    return false;
  });

  $(".authenticator.duo").click(function() {
    var otptext;
    $("#otp").focus();
    otptext = "<p class='help-text'>Open the Duo Mobile app and tap on the key icon for Stanford.  Enter the code above.</p>";
    $("#otp-box").after(otptext);
    return false;
  });

   $(".token").click(function() {
    var otptext;
    $("#otp").focus();
    otptext = "<p class='help-text'>Get a passcode from your hardware token and enter it above.</p>";
    $("#otp-box").after(otptext);
    return false;
  });

  $(".waiting-button").click(function() {
    $(this).prop('value', 'Sending...').addClass('sending');
    $("#mf-default").append("<p>Approve the request on your device</p>")
  });

});
// end of docready
function showPasscode() {
  $(".passcode-default").show();
}

function showBackupFull() {
  $(".backup-devices").show();
  $(".passcode-options").hide();
  StickyFooter();
  createCookie('backups', 'showbackup', 5);
}

function hideBackupFull() {
  $(".backup-devices").hide();
  $(".passcode-options").show();
  StickyFooter();
  eraseCookie('backups');
}

function sf() {
  if ("#otp") {
    $("#otp").focus();
  } else {
    document.multifactor_send.send.focus();
  }
}

function createCookie(name, value,minutes) {
    var date = new Date();
  date.setTime(date.getTime() + (minutes * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();

  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ')
    c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0)
      return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name, null, -1);
}

function StickyFooter() {
	var docHeight = $(window).height();
	var footerHeight = $('#global-footer').height();
	var footerTop = $('#global-footer').position().top + footerHeight;
	if (footerTop < docHeight) {
		$('#global-footer').css('margin-top', (docHeight - footerTop) + 'px');
	}
	else {
		$('#global-footer').css('margin-top', '30px');
	}
}

function removeSpaces(string) {
 return string.split(' ').join('');
}