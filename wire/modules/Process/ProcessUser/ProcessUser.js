$(document).ready(function() {
	
	if($("#Inputfield_id").val() == 40) {
		// guest user
		// hide fields that aren't necessary ehre
		$("#wrap_Inputfield_pass").hide(); 	
		$("#wrap_Inputfield_email").hide();	
		$("#wrap_Inputfield_roles input").attr('disabled', 'disabled');
		//$("#wrap_submit_save").remove();
	}

	var $guestRole = $("#Inputfield_roles_37"); 
	if($guestRole.size() > 0 && !$guestRole.is(":checked")) {
		$guestRole.attr('checked', 'checked'); 
	}
	
	$("#wrap_Inputfield_roles").find("input[type=checkbox]").each(function() {
		if($.inArray(parseInt($(this).val()), ProcessWire.config.ProcessUser.editableRoles) == -1) {
			$(this).closest('label').addClass('ui-priority-secondary').click(function() {
				var $alert = $(this).find(".ui-state-error-text");
				if($alert.length == 0) {
					$alert = $("<span class='ui-state-error-text'>&nbsp;(" + ProcessWire.config.ProcessUser.notEditableAlert + ")</span>");
					$(this).append($alert);
					setTimeout(function() {
						$alert.fadeOut('normal', function() {
							$alert.remove();
						});
					}, 2000);
				} else {
					$alert.remove();
				}
				return false;
			});
		}
	});

	// from @horst-n #1236:
	// prevent browser supported autocomplete for password fields (e.g. on Profilepage)
	// to force this, attribute autocomplete='off' needs to be set for the password field
	// this fix is only needed in Mozilla Firefox apparently
	if($(".FieldtypePassword[autocomplete='off']").length) {
		// simply set the value empty on document.ready doesn't work in FireFox,
		// but one second later, it works :)
		setTimeout(function() {
			$(".FieldtypePassword[autocomplete='off']").attr('value', '')
				.closest('.Inputfield').removeClass('InputfieldStateChanged'); // @GerardLuskin
		}, 1000);
	}
}); 
