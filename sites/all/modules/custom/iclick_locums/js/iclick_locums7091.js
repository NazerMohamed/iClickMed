/**
 * @file
 * This file contains most of the code for the configuration page.
 */
(function($) {
    Drupal.behaviors.iclick_hos_job = {
        attach: function(context, settings) {
            var pathname = window.location.pathname.split('/')[1];
            //Locum listing: Views::locums-listing/% 
            $("#edit-field-speciality-employment-tid").change(function() {
                var speciality_id = this.value;
                var url_ajax = Drupal.settings.basePath + "subspecial_id/" + speciality_id;
                var loadingOverlay = $('#loading-overlay');
                loadingOverlay.show();
                $('body').css('overflow', 'hidden');
                jQuery.ajax({
                    url: url_ajax,
                    data: {
                        uid: speciality_id,
                    },
                    cache: false,
                    type: "POST",
                    success: function(data) {
                        console.log(data);
                        var department = JSON.parse(data);
                        var result = [];

                        for (var i in department)
                            result.push([i, department [i]]);

                        var newArray = result.sort(function(a, b) {
                            return b - a
                        });
                        $("#edit-field-sub-specialities-employmen-tid").html("");
                        $.each(newArray, function(i) {
                            $('#edit-field-sub-specialities-employmen-tid').append($('<option>', {value: newArray[i][0]}).text(newArray[i][1]));
                        });
                        $('#edit-field-sub-specialities-employmen-tid').data("selectBox-selectBoxIt").refresh();
                    },
                    complete: function() {
                        loadingOverlay.hide();
                        $('body').css('overflow', 'auto');
                    }
                });
            });
            
            //Find a locum page for hospitals
            $("#edit-field-lp-speciality-tid").change(function() {
                var speciality_id = this.value;
                var url_ajax = Drupal.settings.basePath + "subspecial_id/" + speciality_id;
                var loadingOverlay = $('#loading-overlay');
                loadingOverlay.show();
                $('body').css('overflow', 'hidden');
                jQuery.ajax({
                    url: url_ajax,
                    data: {
                        uid: speciality_id,
                    },
                    cache: false,
                    type: "POST",
                    success: function(data) {
                        console.log(data);
                        var department = JSON.parse(data);
                        var result = [];

                        for (var i in department)
                            result.push([i, department [i]]);

                        var newArray = result.sort(function(a, b) {
                            return b - a
                        });
                        $("#edit-field-lp-sub-specialities-tid").html("");
                        $.each(newArray, function(i) {
                            $('#edit-field-lp-sub-specialities-tid').append('<option value="'+newArray[i][0]+'">'+newArray[i][1]+'</option>');
                        });                        
                    },
                    complete: function() {
                        loadingOverlay.hide();
                        $('body').css('overflow', 'auto');
                    }
                });
            });

            $("#edit-field-speciality-employment-und").change(function() {
                var speciality_id = this.value;
                var url_ajax = Drupal.settings.basePath + "subspecial_id/" + speciality_id;
                var loadingOverlay = $('#loading-overlay');
                loadingOverlay.show();
                $('body').css('overflow', 'hidden');
                jQuery.ajax({
                    url: url_ajax,
                    data: {
                        uid: speciality_id,
                    },
                    cache: false,
                    type: "POST",
                    success: function(data) {
                        console.log(data);
                        var department = JSON.parse(data);
                        var result = [];

                        for (var i in department)
                            result.push([i, department [i]]);

                        var newArray = result.sort(function(a, b) {
                            return b - a
                        });
                        $("#edit-field-sub-specialities-employmen-und").html("");
                        $.each(newArray, function(i) {
                            $('#edit-field-sub-specialities-employmen-und').append($('<option>', {value: newArray[i][0]}).text(newArray[i][1]));
                        });
                        $('#edit-field-sub-specialities-employmen-und').data("selectBox-selectBoxIt").refresh();
                    },
                    complete: function() {
                        loadingOverlay.hide();
                        $('body').css('overflow', 'auto');
                    }
                });
            });

            //Hospial invite to locum (Invite button) (alert and db save)
            $('.view-locums-listing .locums-invite, .view-locums-listing .views-field-php .offer').click(function(e) {
                console.log('12');
                if (confirm("Are you sure?"))
                {
                    var hospital_nid = window.location.pathname.split('/')[2];
                    var locums_nid = $(this).parent().siblings(":first").text().trim();

                    jQuery.ajax({
                        type: "POST",
                        url: Drupal.settings.basePath + 'save/invite',
                        data: {
                            hospital_nid: hospital_nid,
                            locums_nid: locums_nid,
                            class: this.className,
                        },
                        cache: false,
                        success: function(data) {
                            location.reload();
                        },
                        complete: function() {
                        },
                        error: function() {
                        }

                    });
                }
                else
                {
                    e.preventDefault();
                }
            });

            //Are you sure alert and db Status Update @ Job Invitaion
            //@NOTE: For shortlisted-locums/% as hospital side  hospital_nid => locum uid and locums_nid => job nid            
            $('.view-open-jobs .views-field-php-1 .apply, .view-open-jobs .views-field-php .decline').click(function(e) {
                console.log('test');
                if (this.className === 'decline invalid' || this.className === 'apply activeinvalid') {
                    confirm("Please complete your profile");
                }
                else {
                    if (confirm("Are you sure?"))
                    {
                        var hospital_nid = $(this).parent().siblings(":first").text().trim();
                        var locums_nid = window.location.pathname.split('/')[2];
                        jQuery.ajax({
                            type: "POST",
                            url: Drupal.settings.basePath + 'save/accept/decline',
                            data: {
                                hospital_nid: hospital_nid,
                                locums_nid: locums_nid,
                                class: this.className,
                            },
                            cache: false,
                            success: function(data) {
                                location.reload();
                            },
                            complete: function() {
                            },
                            error: function() {
                            }

                        });
                    }
                    else
                    {
                        e.preventDefault();
                    }
                }
            });
            
            $('.page-shortlisted-locums- .decline').click(function(e) {
                console.log('test1');
                if (confirm("Are you sure?"))
                {
                    var hospital_nid = window.location.pathname.split('/')[2];
                    var locums_nid = $(this).parent().siblings(":first").text().trim();
                    jQuery.ajax({
                        type: "POST",
                        url: Drupal.settings.basePath + 'save/accept/decline',
                        data: {
                            hospital_nid: hospital_nid,
                            locums_nid: locums_nid,
                            class: this.className,
                        },
                        cache: false,
                        success: function(data) {
                            location.reload();
                        },
                        complete: function() {
                        },
                        error: function() {
                        }

                    });
                }
                else
                {
                    e.preventDefault();
                }

            });
            
            //Hospital offerd to locum (Offer button)
            $('.page-shortlisted-locums- .locums-invite').click(function(e) {
                console.log(this.className);
                if (this.className === 'locums-invite active offer') {
                    console.log('1');
                    if (confirm("Are you sure?"))
                    {
                        var hospital_nid = window.location.pathname.split('/')[2];
                        var locums_nid = $(this).parent().siblings(":first").text();
                        jQuery.ajax({
                            type: "POST",
                            url: Drupal.settings.basePath + 'save/accept/decline',
                            data: {
                                hospital_nid: hospital_nid,
                                locums_nid: locums_nid,
                                class: this.className,
                            },
                            cache: false,
                            success: function(data) {
                                location.reload();
                            },
                            complete: function() {
                            },
                            error: function() {
                            }

                        });
                    }
                    else
                    {
                        e.preventDefault();
                    }
                }
            });


            //Are you sure alert and db Status Update @ Job Application Locum side
            $('.view-open-jobs .views-field-php .locum-accept, .view-open-jobs .views-field-php .locum-withdraw').click(function(e) {
                if (this.className === 'active locum-accept' || this.className === 'active locum-withdraw') {
                    if (confirm("Are you sure?"))
                    {
                        console.log(this.className);
                        var hospital_nid = $(this).parent().siblings(":first").text().trim();
                        console.log(this.hospital_nid);
                        jQuery.ajax({
                            type: "POST",
                            url: Drupal.settings.basePath + 'save/accept/decline',
                            data: {
                                hospital_nid: hospital_nid,
                                class: this.className,
                            },
                            cache: false,
                            success: function(data) {
                                location.reload();
                            },
                            complete: function() {
                            },
                            error: function() {
                            }

                        });
                    }
                    else
                    {
                        e.preventDefault();
                    }
                }
            });


            //Job application
            $('#myDiv').click(function(e) {
                var txt = $('#myDiv').attr('value');
                var arr = txt.split('/');
                var hospital_nid = arr[0];
                var uid = arr[1];
                jQuery.ajax({
                    type: "POST",
                    url: Drupal.settings.basePath + 'job/aplication',
                    data: {
                        hospital_nid: hospital_nid,
                        uid: uid,
                    },
                    cache: false,
                    success: function(data) {
                        var baseUrl = document.location.origin;
                        window.location.href = baseUrl + '/' + 'job-application';
                    },
                    complete: function() {
                    },
                    error: function() {
                    }

                });
            });

            //Not confirm locum
            $('#hospital-job-view #profileNotComplete').click(function(e) {
                if (confirm("Please complete your profile")) {
                    e.preventDefault();
                }
                else {
                    e.preventDefault();
                }
            });
            $('.page-confirm-locums .CancelButton').click(function(e) {
                if (confirm("Are you sure you want to cancel.")) {
                    var hospital_job_nid = window.location.pathname.split('/')[2];
                    var baseUrl = document.location.origin;
                    window.location.href = baseUrl + '/' + 'job/' + hospital_job_nid + '/view';
                }
                else {
                    e.preventDefault();
                }
            });

            //Locum time sheet submit buttom
            $('.locum-time-submit-button').click(function(e) {
                if (confirm("Are you sure you want to submit?"))
                {
                    var job_nid = window.location.pathname.split('/')[2];
                    var job_number = window.location.pathname.split('/')[3];
                    jQuery.ajax({
                        type: "POST",
                        url: Drupal.settings.basePath + 'locum-time-sheet-submit',
                        data: {
                            job_nid: job_nid,
                            job_number: job_number,
                        },
                        cache: false,
                        success: function(data) {
                            var delay = 1000; //Your delay in milliseconds
                            setTimeout(function() {
                                var baseUrl = document.location.origin;
                                window.location.href = baseUrl + '/' + 'weeks/' + job_nid;
                            }, delay);
                        },
                        complete: function() {
                        },
                        error: function() {
                        }

                    });
                }
                else
                {
                    e.preventDefault();
                }
            });
            //Locum dashboard
            var dt = new Date();
            $(document).on('click', '.page-locum-dashboard .inner', function() {
                var date = $(this).closest('td').attr('data-date');
                var elem = $(this);
                $('body').append("<div class='overlay-loader-container'></div>");
                $('body').append("<div class='ajax-load-image'></div>");
                console.log('triggered');
                jQuery.ajax({
                    type: "POST",
                    url: Drupal.settings.basePath + 'locum-dashboard-job-update',
                    data: {
                        date: date,
                        dataType: "json"
                    },
                    cache: false,
                    success: function(data) {
                        $('.overlay-loader-container').remove();
                        $('.ajax-load-image').remove();
                        var dataArray = jQuery.parseJSON(data);
                        $('.invitation-job').html('0' + dataArray[0]);
                        $('.application-job').html('0' + dataArray[1]);
                        $('.booked-job').html('0' + dataArray[2]);
                        var baseUrl = document.location.origin;
                        $(".invitation-job-wrapper .jobs-after").prop("href", baseUrl + '/job-invitation?' + dataArray[3]);
                        $(".application-job-wrapper .jobs-after").prop("href", baseUrl + '/job-application?' + dataArray[4]);
                        $(".booked-job-wrapper .jobs-after").prop("href", baseUrl + '/booked-jobs?' + dataArray[5]);
                    },
                    complete: function() {
                        $('.month-view td').removeClass('active-date');
                        $(elem).closest('td').addClass('active-date');
                    },
                    error: function() {
                    }

                });
            });

            $(window).load(function() {
                $('.page-locum-dashboard .inner').each(function() {
                    if ($(this).find('.day').text().trim() == dt.getDate()) {
                        $(this).trigger('click');
                    }
                });
            });

            //Hospital dashboard
            var dt = new Date();
            $(document).on('click', '.page-hospital-dashboard .inner', function() {
                var date = $(this).closest('td').attr('data-date');
                var elem = $(this);
                $('body').append("<div class='overlay-loader-container'></div>");
                $('body').append("<div class='ajax-load-image'></div>");

                jQuery.ajax({
                    type: "POST",
                    url: Drupal.settings.basePath + 'hospital-dashboard-job-update',
                    data: {
                        date: date,
                        dataType: "json"
                    },
                    cache: false,
                    success: function(data) {
                        $('.overlay-loader-container').remove();
                        $('.ajax-load-image').remove();
                        var dataArray = jQuery.parseJSON(data);
                        $('.select-day-job').html('0' + dataArray[0]);
                        $('.available-locums').html('0' + dataArray[1]);
                        $('.shortlisted-locums').html('0' + dataArray[2]);
                        $('.unfilled .count-job').html('0' + dataArray[5]);
                        console.log("TEST");
                        console.log(dataArray[6]);
                        console.log("TEST!");
                        var baseUrl = document.location.origin;
                        $(".add-job .jobs-after").prop("href", baseUrl + '/open-jobs?' + dataArray[3]);
                        $(".download-job .jobs-after").prop("href", baseUrl + '/find-a-locum?' + dataArray[4]);
//                        if (dataArray[5].length != 0) {
//                            $(".shortlisted .jobs-after").prop("href", baseUrl + '/shortlisted-locums?' + dataArray[5]);
//                        }
                        $(".shortlisted .jobs-after").prop("href", baseUrl + '/find-a-locum?' + dataArray[6]);
                        $(".unfilled  .jobs-after").prop("href", baseUrl + '/open-jobs');
                    },
                    complete: function() {
                        $('.month-view td').removeClass('active-date');
                        $(elem).closest('td').addClass('active-date');
                    },
                    error: function() {
                    }

                });
            });


            $(window).load(function() {
                $('.page-hospital-dashboard .inner').each(function() {
                    if ($(this).find('.day').text().trim() == dt.getDate()) {
                        $(this).trigger('click')
                    }
                });
            });
            
            if(pathname == 'job-application' || pathname == 'booked-jobs') {
                $("#edit-tid").change(function() {
                var speciality_id = this.value;
                var url_ajax = Drupal.settings.basePath + "subspecial_id/" + speciality_id;
                console.log(url_ajax);
                var loadingOverlay = $('#loading-overlay');
                loadingOverlay.show();
                $('body').css('overflow', 'hidden');
                jQuery.ajax({
                    url: url_ajax,
                    data: {
                        uid: speciality_id,
                    },
                    cache: false,
                    type: "POST",
                    success: function(data) {
                        console.log(data);
                        var department = JSON.parse(data);
                        var result = [];

                        for (var i in department)
                            result.push([i, department [i]]);

                        var newArray = result.sort(function(a, b) {
                            return b - a
                        });
                        $("#edit-tid-1").html("");
                        $.each(newArray, function(i) {
                            $('#edit-tid-1').append($('<option>', {value: newArray[i][0]}).text(newArray[i][1]));
                        });
                        $('#edit-tid-1').data("selectBox-selectBoxIt").refresh();
                    },
                    complete: function() {
                        loadingOverlay.hide();
                        $('body').css('overflow', 'auto');
                    }
                });
            });
            }
            

        }
    };
})(jQuery);


