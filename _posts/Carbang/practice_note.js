prototype.calendarClose = function(_o) {
    let _id = sampleCalendar.calId;

    if(!$(_o).hasClass('moca_ica_btn') && _id != null && $.trim(_id) != "" && $.closest('moca_calendar').length != 1) {
        $('moca_calendar').remove();
        _id = null;
    } else if ($(_o).hasClass('moca_ica_btn') && _id != null && $.trim(_id) != "") {
        $('moca_calendar').remove();
        _id = null;
    }
}