/*Подгрузка услуг на главной*/


$(document).ready(function () {
    var inProgress = false;
    $('body').on('click', '#services_index_load', function (event) {
        event.preventDefault();
        var dan;
        var st = $(this).attr('start');
        var pr = $(this).attr('parent');
        var serv_tpl = $(this).attr('serv_tpl');
        var ajax_url = $(this).attr('ajax_url');
        dan = "&start=" + st + "&parent=" + pr + '&serv_tpl=' + serv_tpl;
        //var el = $('.services_index');
        var container = $(this).parents('.container');
        var el = container.find('.services_index');
        var btn = $(this);
        if (!inProgress) {
            $.ajax({
                type: "GET",
                url: ajax_url,
                data: dan,
                beforeSend: function () {
                    container.find('.spinner ').show();
                    inProgress = true;
                    el.addClass('no-hover');
                },
                success: function (msg) {
                    el.append(msg);
                    container.find('.spinner ').hide();
                    btn.hide();
                    inProgress = false;
                },
                complete: function () {
                    setTimeout(function () {
                        el.removeClass('no-hover');
                    }, 1000);
                }
            });
        }
    });
});


/*Подгрузка услуг на главной, мобильная*/
$(document).ready(function () {
    var inProgress = false;
    $('body').on('click', '#services_index_load_mobile', function (event) {
        event.preventDefault();
        var dan;
        var st = $(this).attr('start');
        var pr = $(this).attr('parent');
        var serv_tpl = $(this).attr('serv_tpl');
        var ajax_url = $(this).attr('ajax_url');
        dan = "&start=" + st + "&parent=" + pr + '&serv_tpl=' + serv_tpl;
        var el = $('.service-m-el-wrap');
        if (!inProgress) {
            $.ajax({
                type: "GET",
                url: ajax_url,
                data: dan,
                beforeSend: function () {
                    $(".spinner:not(.custom-pages)").show();
                    inProgress = true;
                    el.addClass('no-hover');
                },
                success: function (msg) {
                    el.append(msg);
                    $(".spinner:not(.custom-pages)").hide();
                    $("#services_index_load_mobile").hide();
                    inProgress = false;
                },
                complete: function () {
                    setTimeout(function () {
                        el.removeClass('no-hover');
                    }, 1000);
                }
            });
        }
    });
});


/*Подгрузка товаров и изменение вида отображения товаров*/
$(document).ready(function () {
    var inProgress = false;
    var spinner = '<div class="spinner center"><img src="assets/templates/market/img/spinner.gif" alt=""></div>'

    /*Отображение в виде плитки*/
    $(document).on("click", '.sorting-catalog-view .view a.block', function (event) {
        event.preventDefault();
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            $('.sorting-catalog-view .view a.line').removeClass("active");
            $('.sorting-catalog-view .view a.list').removeClass("active");
            var dan;
            var st = $('#product_site').attr('start');
            var pr = $('#product_site').attr('parent');
            var tp = $('#product_site').attr('type');
            var total = $('#product_site').attr('total');
            var sortby = $('#product_site').attr('sort');
            var sortdir = $('#product_site').attr('sortdir');
            var ajax_url = $('#product_site').attr('ajax_url');
            var fr = $('#product_site').attr('filter');
            var ids = $('#product_site').attr('ids');
            var ids_2 = '';
            ids_2 = $('.eFiltr_results_ids').html();
            if (typeof(ids_2) !== 'undefined') {
                if (ids_2.length > 0) {
                    ids = ids_2;
                }
            }

            var load_prod = 0;
            st = 0;
            $('#product_site').attr('type', 'table');
            tp = 'table';
            dan = "&start=" + st + "&parent=" + pr + "&type=" + tp + "&sortby=" + sortby + "&sortdir=" + sortdir + "&total=" + total + "&load_prod=" + load_prod + "&filter=" + fr + "&documents=" + ids;

            //Получаем параметры фильтрации
            var z = $('#product_site').attr('data-efilter');
            if ((z != '') && (z !== null) && (z !== undefined)) {
                z = JSON.parse(z);
                dan += '&';
                dan += z;
            } else {
                z = '';
            }

            var endd = $('#ajax_stop').val();

            // высота элемента если отключили "наличие и артикул" в разделе товаров каталога
            function noArticleAvail() {
                const windowInnerWidth = document.documentElement.clientWidth;
                const articleAvailability = document.querySelector(".article-and-availability");

                if (articleAvailability && windowInnerWidth > 1200) {
                    const availability = document.querySelector(".article-and-availability .availability");
                    const article = document.querySelector(".article-and-availability .article");

                    if (!availability & !article) {
                        $(".outside-product").addClass("not-article-and-availability");
                    } else {
                        $(".outside-product").removeClass("not-article-and-availability");
                    }
                }
            }

            if (!inProgress) {
                $.ajax({
                    type: "GET",
                    url: ajax_url,
                    data: dan,
                    beforeSend: function () {
                        $('#product_cont').html(spinner);
                        inProgress = true;
                    },
                    success: function (msg) {
                        var suma;
                        suma = parseInt(st) + parseInt(total);
                        $('#product_site').attr('start', suma);
                        $('#product_cont').html(msg);
                        $(".spinner").hide();
                        var endload = $('#ajax_stop').val();
                        if (endload == 'end') {
                            $(".more-prod a.primary-button").hide();
                        }
                        customCounter();
                        inProgress = false;
                        catalogElements();
                        eFavorite_favorite.init();
                        eFavorite_compare.init();
                        noArticleAvail();
                    }
                });
            }
        }
    });


    /*Отображение в виде списка*/


    $(document).on("click", '.sorting-catalog-view .view a.line', function (event) {
        event.preventDefault();
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            $('.sorting-catalog-view .view a.block').removeClass("active");
            $('.sorting-catalog-view .view a.list').removeClass("active");
            var dan;
            var st = $('#product_site').attr('start');
            var pr = $('#product_site').attr('parent');
            var tp = $('#product_site').attr('type');
            var total = $('#product_site').attr('total');
            var sortby = $('#product_site').attr('sort');
            var sortdir = $('#product_site').attr('sortdir');
            var ajax_url = $('#product_site').attr('ajax_url');
            var fr = $('#product_site').attr('filter');
            var ids = $('#product_site').attr('ids');
            var ids_2 = '';
            ids_2 = $('.eFiltr_results_ids').html();
            if (typeof(ids_2) !== 'undefined') {
                if (ids_2.length > 0) {
                    ids = ids_2;
                }
            }
            var load_prod = 0;
            st = 0;
            $('#product_site').attr('type', 'line');
            tp = 'line';
            dan = "&start=" + st + "&parent=" + pr + "&type=" + tp + "&sortby=" + sortby + "&sortdir=" + sortdir + "&total=" + total + "&load_prod=" + load_prod + "&filter=" + fr + "&documents=" + ids;

            //Получаем параметры фильтрации
            var z = $('#product_site').attr('data-efilter');
            if ((z != '') && (z !== null) && (z !== undefined)) {
                console.log(z);
                z = JSON.parse(z);
                dan += '&';
                dan += z;
            } else {
                z = '';
            }

            var endd = $('#ajax_stop').val();
            if (!inProgress) {
                $.ajax({
                    type: "GET",
                    url: ajax_url,
                    data: dan,
                    beforeSend: function () {
                        $('#product_cont').html(spinner);
                        inProgress = true;
                    },
                    success: function (msg) {
                        var suma;
                        suma = parseInt(st) + parseInt(total);
                        $('#product_site').attr('start', suma);
                        $('#product_cont').html(msg);
                        $(".spinner").hide();
                        var endload = $('#ajax_stop').val();
                        if (endload == 'end') {
                            $(".more-prod a.primary-button").hide();
                        }
                        customCounter();
                        inProgress = false;
                        catalogElements();
                        eFavorite_favorite.init();
                        eFavorite_compare.init();
                    }
                });
            }
        }
    });


    /*Отображение в виде листа*/
    $(document).on("click", '.sorting-catalog-view .view a.list', function (event) {
        event.preventDefault();
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            $('.sorting-catalog-view .view a.block').removeClass("active");
            $('.sorting-catalog-view .view a.line').removeClass("active");
            var dan;
            var st = $('#product_site').attr('start');
            var pr = $('#product_site').attr('parent');
            var tp = $('#product_site').attr('type');
            var total = $('#product_site').attr('total');
            var sortby = $('#product_site').attr('sort');
            var sortdir = $('#product_site').attr('sortdir');
            var ajax_url = $('#product_site').attr('ajax_url');
            var fr = $('#product_site').attr('filter');
            var ids = $('#product_site').attr('ids');
            var ids_2 = '';
            ids_2 = $('.eFiltr_results_ids').html();
            if (typeof(ids_2) !== 'undefined') {
                if (ids_2.length > 0) {
                    ids = ids_2;
                }
            }
            var load_prod = 0;
            st = 0;
            $('#product_site').attr('type', 'list');
            tp = 'list';
            dan = "&start=" + st + "&parent=" + pr + "&type=" + tp + "&sortby=" + sortby + "&sortdir=" + sortdir + "&total=" + total + "&load_prod=" + load_prod + "&filter=" + fr + "&documents=" + ids;

            //Получаем параметры фильтрации
            var z = $('#product_site').attr('data-efilter');
            if ((z != '') && (z !== null) && (z !== undefined)) {
                z = JSON.parse(z);
                dan += '&';
                dan += z;
            } else {
                z = '';
            }

            var endd = $('#ajax_stop').val();
            if (!inProgress) {
                $.ajax({
                    type: "GET",
                    url: ajax_url,
                    data: dan,
                    beforeSend: function () {
                        $('#product_cont').html(spinner);
                        inProgress = true;
                    },
                    success: function (msg) {
                        var suma;
                        suma = parseInt(st) + parseInt(total);
                        $('#product_site').attr('start', suma);
                        $('#product_cont').html(msg);
                        $(".spinner").hide();
                        var endload = $('#ajax_stop').val();
                        if (endload == 'end') {
                            $(".more-prod a.primary-button").hide();
                        }
                        customCounter();
                        inProgress = false;
                        catalogElements();
                        eFavorite_favorite.init();
                        eFavorite_compare.init();
                    }
                });
            }
        }
    });


    /*Отработка изменения количества отображаемых товаров*/
    $('.sorting-catalog-view .quantity a').on("click", function (event) {
        event.preventDefault();
        if (!$(this).hasClass("active")) {
            $('.sorting-catalog-view .quantity a').removeClass("active");
            $(this).addClass("active");
            var dan;
            var st = $('#product_site').attr('start');
            var pr = $('#product_site').attr('parent');
            var tp = $('#product_site').attr('type');
            var total = $('#product_site').attr('total');
            var sortby = $('#product_site').attr('sort');
            var sortdir = $('#product_site').attr('sortdir');
            var ajax_url = $('#product_site').attr('ajax_url');
            var fr = $('#product_site').attr('filter');
            var ids = $('#product_site').attr('ids');
            var ids_2 = '';
            ids_2 = $('.eFiltr_results_ids').html();
            if (typeof(ids_2) !== 'undefined') {
                if (ids_2.length > 0) {
                    ids = ids_2;
                }
            }
            total = $(this).html();
            if (total == "Все") {
                total = "0";
            }
            var load_prod = 0;
            st = 0;
            $('#product_site').attr('total', total);
            dan = "&start=" + st + "&parent=" + pr + "&type=" + tp + "&sortby=" + sortby + "&sortdir=" + sortdir + "&total=" + total + "&load_prod=" + load_prod + "&filter=" + fr + "&documents=" + ids;

            //Получаем параметры фильтрации
            var z = $('#product_site').attr('data-efilter');
            if ((z != '') && (z !== null) && (z !== undefined)) {
                z = JSON.parse(z);
                dan += '&';
                dan += z;
            } else {
                z = '';
            }

            var endd = $('#ajax_stop').val();
            if (!inProgress) {
                $.ajax({
                    type: "GET",
                    url: ajax_url,
                    data: dan,
                    beforeSend: function () {
                        $('#product_cont').html(spinner);
                        inProgress = true;
                    },
                    success: function (msg) {
                        var suma;
                        suma = parseInt(st) + parseInt(total);
                        $('#product_site').attr('start', suma);
                        $('#product_cont').html(msg);
                        $(".spinner").hide();
                        var endload = $('#ajax_stop').val();
                        if (endload == 'end') {
                            $(".more-prod a.primary-button").hide();
                        }
                        inProgress = false;
                        eFavorite_favorite.init();
                        eFavorite_compare.init();
                    }
                });
            }
        }
    });

    /*Отработка изменения сортировки товаров товаров*/
    $('.sorting-catalog-view .rate a').on("click", function (event) {
        event.preventDefault();
        if (!$(this).hasClass("active")) {
            $('.sorting-catalog-view .rate a').removeClass("active");
            $(this).addClass("active");
            var dan;
            var st = $('#product_site').attr('start');
            var pr = $('#product_site').attr('parent');
            var tp = $('#product_site').attr('type');
            var total = $('#product_site').attr('total');
            var sortby = $('#product_site').attr('sort');
            var sortdir = $('#product_site').attr('sortdir');
            var ajax_url = $('#product_site').attr('ajax_url');
            var fr = $('#product_site').attr('filter');
            var ids = $('#product_site').attr('ids');


            var ids_2 = '';


            ids_2 = $('.eFiltr_results_ids').html();


            if (typeof(ids_2) !== 'undefined') {


                if (ids_2.length > 0) {


                    ids = ids_2;


                }


            }


            sortby = $(this).attr('id');


            if (sortby == "menuindex") {


                sortby = "c.pagetitle";


            } else if (sortby == "price") {


                sortby = "new_price";


            } else {


                sortby = "rating";


            }


            $('#product_site').attr('sort', sortby);


            if (!$(this).hasClass("up")) {


                sortdir = "ASC";


            } else {


                sortdir = "DESC";


            }


            $('#product_site').attr('sortdir', sortdir);


            var load_prod = 0;


            st = 0;


            dan = "&start=" + st + "&parent=" + pr + "&type=" + tp + "&sortby=" + sortby + "&sortdir=" + sortdir + "&total=" + total + "&load_prod=" + load_prod + "&filter=" + fr + "&documents=" + ids;

            //Получаем параметры фильтрации
            var z = $('#product_site').attr('data-efilter');
            if ((z != '') && (z !== null) && (z !== undefined)) {
                z = JSON.parse(z);
                dan += '&';
                dan += z;
            } else {
                z = '';
            }

            var endd = $('#ajax_stop').val();


            if (!inProgress) {


                $.ajax({


                    type: "GET",


                    url: ajax_url,


                    data: dan,


                    beforeSend: function () {


                        $('#product_cont').html(spinner);


                        inProgress = true;


                    },


                    success: function (msg) {


                        var suma;


                        suma = parseInt(st) + parseInt(total);


                        $('#product_site').attr('start', suma);


                        $('#product_cont').html(msg);


                        $(".spinner").hide();


                        var endload = $('#ajax_stop').val();


                        if (endload == 'end') {


                            $(".more-prod a.primary-button").hide();


                        }


                        inProgress = false;
                        eFavorite_favorite.init();
                        eFavorite_compare.init();
                    }


                });


            }


        } else {


            var dan;


            var st = $('#product_site').attr('start');


            var pr = $('#product_site').attr('parent');


            var tp = $('#product_site').attr('type');


            var total = $('#product_site').attr('total');


            var sortby = $('#product_site').attr('sort');


            var sortdir = $('#product_site').attr('sortdir');


            var ajax_url = $('#product_site').attr('ajax_url');


            var fr = $('#product_site').attr('filter');


            var ids = $('#product_site').attr('ids');


            var ids_2 = '';


            ids_2 = $('.eFiltr_results_ids').html();


            if (typeof(ids_2) !== 'undefined') {


                if (ids_2.length > 0) {


                    ids = ids_2;


                }


            }


            sortby = $(this).attr('id');


            if (sortby == "menuindex") {


                sortby = "c.pagetitle";


            } else if (sortby == "price") {


                sortby = "new_price";


            } else {


                sortby = "rating";


            }


            $('#product_site').attr('sort', sortby);


            $(this).toggleClass('up down')


            if (!$(this).hasClass("up")) {


                sortdir = "ASC";


            } else {


                sortdir = "DESC";


            }


            $('#product_site').attr('sortdir', sortdir);


            var load_prod = 0;


            st = 0;


            dan = "&start=" + st + "&parent=" + pr + "&type=" + tp + "&sortby=" + sortby + "&sortdir=" + sortdir + "&total=" + total + "&load_prod=" + load_prod + "&filter=" + fr + "&documents=" + ids;

            //Получаем параметры фильтрации
            var z = $('#product_site').attr('data-efilter');
            if ((z != '') && (z !== null) && (z !== undefined)) {
                z = JSON.parse(z);
                dan += '&';
                dan += z;
            } else {
                z = '';
            }

            var endd = $('#ajax_stop').val();


            if (!inProgress) {


                $.ajax({


                    type: "GET",


                    url: ajax_url,


                    data: dan,


                    beforeSend: function () {


                        $('#product_cont').html(spinner);


                        inProgress = true;


                    },


                    success: function (msg) {


                        var suma;


                        suma = parseInt(st) + parseInt(total);


                        $('#product_site').attr('start', suma);


                        $('#product_cont').html(msg);


                        $(".spinner").hide();


                        var endload = $('#ajax_stop').val();


                        if (endload == 'end') {


                            $(".more a.primary-button").hide();


                        }


                        inProgress = false;
                        eFavorite_favorite.init();
                        eFavorite_compare.init();
                    }


                });


            }


        }


    });


});


$(document).ready(function () {


    var inProgress = false;


    $('body').on('click', '#product_cont .more-prod a.primary-button', function (event) {


        event.preventDefault();


        var dan;


        var st = $('#product_site').attr('start');


        var pr = $('#product_site').attr('parent');


        var tp = $('#product_site').attr('type');


        var total = $('#product_site').attr('total');


        var sortby = $('#product_site').attr('sort');


        var sortdir = $('#product_site').attr('sortdir');


        var ajax_url = $('#product_site').attr('ajax_url');


        var fr = $('#product_site').attr('filter');


        var ids = $('#product_site').attr('ids');


        var ids_2 = '';


        ids_2 = $('.eFiltr_results_ids').html();


        if (typeof(ids_2) !== 'undefined') {


            if (ids_2.length > 0) {


                ids = ids_2;


            }


        }


        var load_prod = 1;


        dan = "&start=" + st + "&parent=" + pr + "&type=" + tp + "&sortby=" + sortby + "&sortdir=" + sortdir + "&total=" + total + "&load_prod=" + load_prod + "&filter=" + fr + "&parents=" + ids;

        //Получаем параметры фильтрации
        var z = $('#product_site').attr('data-efilter');
        if ((z != '') && (z !== null) && (z !== undefined)) {
            z = JSON.parse(z);
            dan += '&';
            dan += z;
        } else {
            z = '';
        }

        var endd = $('#ajax_stop').val();


        if ((!inProgress) && (endd != 'end')) {


            $.ajax({


                type: "GET",


                url: ajax_url,


                data: dan,


                beforeSend: function () {


                    $(".pagination").remove();


                    $(".spinner").show();


                    inProgress = true;


                },


                success: function (msg) {


                    var suma;


                    suma = parseInt(st) + parseInt(total);


                    $('#product_site').attr('start', suma);


                    $('#product_cont>div:first-child').append(msg);


                    catalogElements();


                    $(".spinner").hide();


                    var endload = $('#ajax_stop').val();


                    if (endload == 'end') {


                        $(".more-prod").hide();


                    }


                    /*var this_url = window.location.pathname;



                     var url = this_url + delim + get_page;



                     history.pushState(null, null, url);*/


                    inProgress = false;

                    eFavorite_favorite.init();
                    eFavorite_compare.init();
                }


            });


        }


    });


});


$(document).ready(function () {


    $('.sorting-catalog-view .sorting-select-mobile > select').change(function (event) {


        event.preventDefault();


        var mobile_sort_type = $(".sorting-catalog-view .sorting-select-mobile > select option:selected").val();


        switch (mobile_sort_type) {


            case 'sort_menuindex':


                $('.sorting-catalog-view .rate #menuindex').click();


                break;


            case 'sort_price':


                $('.sorting-catalog-view .rate #price').click();


                break;


            case 'sort_rating':


                $('.sorting-catalog-view .rate #rating').click();


                break;


            case 'count_12':


                $('.sorting-catalog-view .quantity a:first-of-type').click();


                break;


            case 'count_48':


                $('.sorting-catalog-view .quantity a:nth-of-type(2)').click();


                break;


            case 'count_all':


                $('.sorting-catalog-view .quantity a:last-of-type').click();


                break;


        }


    });


});


/*Пагинация в карточке товара*/


$(document).ready(function () {


    $('body').on('click', '.ajax-pages a', function (event) {


        event.preventDefault();


        var this_url = window.location.pathname;


        var input_data = '';


        var link_pagin_url = $(this).attr('href');


        var link_pagin_url_arr = link_pagin_url.split('?');


        var ajax_url = link_pagin_url_arr[0];


        input_data = link_pagin_url_arr[1];


        var params = input_data


            .split('&')


            .reduce(
                function (p, e) {


                    var a = e.split('=');


                    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);


                    return p;


                },


                {}
            );


        var page_val = params['product_page'];


        var get_page = '';


        if (page_val !== undefined && page_val !== '' && page_val !== 0 && page_val !== null) {


            get_page = 'product_page=' + page_val;


        }


        if (!inProgress) {


            $.ajax({


                type: "GET",


                url: ajax_url,


                data: input_data,


                beforeSend: function () {


                    $('#product_cont').html('');


                    $(".spinner").show();


                    inProgress = true;


                    if (get_page != '') {


                        var delim = '?';


                    } else {


                        delim = '';


                    }


                    var url = this_url + delim + get_page;


                    history.pushState(null, null, url);


                },


                success: function (msg) {


                    $('#product_cont').html(msg);


                    $(".spinner").hide();


                    inProgress = false;

                    eFavorite_favorite.init();
                    eFavorite_compare.init();
                },


                complete: function () {


                    var destination = $('body').offset().top;


                    $('html').animate({scrollTop: destination}, 700);


                }


            });


        }


    });


});


/*Подгрузка страниц пользователя на главной*/


$(document).ready(function () {


    var inProgress = false;


    $('body').on('click', '#custom_pages_index_load', function (event) {


        event.preventDefault();


        var dan;


        var st = $(this).attr('start');


        var pr = $(this).attr('parent');


        var ajax_url = $(this).attr('ajax_url');


        dan = "&start=" + st + "&parent=" + pr;


        var el = $('.services_index');


        if (!inProgress) {


            $.ajax({


                type: "GET",


                url: ajax_url,


                data: dan,


                beforeSend: function () {


                    $(".spinner.custom-pages").show();


                    inProgress = true;


                    el.addClass('no-hover');


                },


                success: function (msg) {


                    $('.services_index.custom-pages').append(msg);


                    $(".spinner.custom-pages").hide();


                    $("#custom_pages_index_load").hide();


                    inProgress = false;


                },


                complete: function () {


                    setTimeout(function () {


                        el.removeClass('no-hover');


                    }, 1000);


                }


            });


        }


    });


});


/*Функция обновления вывода диллеров на странице контакты*/


function contacts_dealers_filter(inProgress) {


    var region_id = $('select[name="select-region"]').val();


    var pr = $('#contact-dealers-params').attr('parent');


    var fltr = $('select[name="select-city"]').val();


    var ajax_url_dialers = $('#contact-dealers-params').attr('ajax_url_dialers');


    var dan = '&region_id=' + region_id + '&parent=' + pr + '&filter=' + fltr;


    var elw = $('.contact-dealers-wrap');


    if (!inProgress) {


        $.ajax({


            type: "GET",


            url: ajax_url_dialers,


            data: dan,


            beforeSend: function () {


                elw.html('');


                $(".spinner:not(.custom-pages)").show();


                inProgress = true;


            },


            success: function (msg) {


                elw.html(msg);


                $(".spinner:not(.custom-pages)").hide();


                inProgress = false;


            },


            complete: function () {


            }


        });


    }


}


/*Подгрузка городов в контактах*/


$(document).ready(function () {


    inProgress = false;


    $('body').on('change', 'select[name="select-region"]', function (event) {


        event.preventDefault();


        var dan;


        var region_id = $(this).val();


        var pr = $('#contact-dealers-params').attr('parent');


        var ajax_url_city = $('#contact-dealers-params').attr('ajax_url_city');


        dan = "&region_id=" + region_id;


        var el = $('select[name="select-city"]');


        if (region_id == '') {


            el.prop('disabled', true);


            el.html('<option></option>');


            contacts_dealers_filter(inProgress);


        } else {


            if (!inProgress) {


                $.ajax({


                    type: "GET",


                    url: ajax_url_city,


                    data: dan,


                    beforeSend: function () {


                        $(".spinner:not(.custom-pages)").show();


                        inProgress = true;


                    },


                    success: function (msg) {


                        el.html('<option></option>' + msg);


                        $(".spinner:not(.custom-pages)").hide();


                        el.prop('disabled', false);


                        inProgress = false;


                    },


                    complete: function () {


                        contacts_dealers_filter(inProgress);


                    }


                });


            }


        }


    });


    $('body').on('change', 'select[name="select-city"]', function (event) {


        event.preventDefault();


        contacts_dealers_filter(inProgress);


    });


});


/*Подгрузка товаров в карточке товара*/


$(document).ready(function () {


    var inProgress = false;


    $('body').on('click', '.card_reviews_load', function (event) {


        event.preventDefault();


        var dan;


        var st = $(this).attr('start');


        var pr = $(this).attr('parent');


        var tpl = $(this).attr('tpl');


        var ajax_url = $(this).attr('ajax_url');


        dan = "&start=" + st + "&parent=" + pr + '&tpl=' + tpl;


        var el = $('.card-review-wrap');


        if (!inProgress) {


            $.ajax({


                type: "GET",


                url: ajax_url,


                data: dan,


                beforeSend: function () {


                    $(".spinner:not(.custom-pages)").show();


                    inProgress = true;


                    el.addClass('no-hover');


                },


                success: function (msg) {


                    $('.card-review-wrap').append(msg);


                    $(".spinner:not(.custom-pages)").hide();


                    $(".card_reviews_load").hide();


                    inProgress = false;
                    eFavorite_favorite.init();
                    eFavorite_compare.init();
                },


                complete: function () {


                    setTimeout(function () {


                        el.removeClass('no-hover');


                        customSelectReinit();


                    }, 1000);


                }


            });


        }


    });


});


/*Подгрузка товаров в карточке товара*/


$(document).ready(function () {
    var inProgress = false;
    $('body').on('click', 'a.btn-show-fast-view', function (event) {
        event.preventDefault();
        var result = '';
        var doc_id_val = $(this).attr('data-id');
        var fast_view_block = $('#fast-view');
        var ajax_url = fast_view_block.attr('data-ajax_url');
        var dan = {
            doc_id: doc_id_val,
        }


        if (!inProgress) {
            $.ajax({
                type: "GET",
                url: ajax_url,
                data: dan,
                beforeSend: function () {
                    fast_view_block.html('');
                    $(".spinner:not(.custom-pages)").show();
                    inProgress = true;
                },

                success: function (msg) {
                    fast_view_block.html(msg);
                    $(".spinner:not(.custom-pages)").hide();
                    inProgress = false;
                    eFavorite_favorite.init();
                    eFavorite_compare.init();
                },


                complete: function () {
                    /*Слайдер*/
                    var fastViewSlider = $(".fast-view-slider");

                    if (fastViewSlider.length) {
                        setTimeout(function () {
                            fastViewSlider.slick({
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                dots: true,
                                appendDots: $("#fast-view .wrap-images-slider"),
                                arrows: false,
                                customPaging: function (slider, i) {
                                    var source = $(slider.$slides[i]).find('img').attr('src') + "";
                                    return '<a class="pager__item"><img src=' + source + '></a>';
                                },
                            });
                        }, 1000);
                    }

                    //Scroll bar compare product
                    var customScrollbar = function () {
                        var blockProductInfo = $(".modal-fast-view .wrap-product-info");
                        if (blockProductInfo.length) {
                            blockProductInfo.mCustomScrollbar();
                        }
                    };
                    customScrollbar();

                    /*Таймер*/
                    var endAction = $('.modal-fast-view span.active_to').text();
                    // var endAction = 'Sep 10 2020 00:00:00';
                    $('.modal-fast-view #countdown').timeTo({
                        timeTo: new Date(new Date(endAction)),
                        // timeTo: new Date(endAction),
                        //displayDays: 3,
                        captionSize: 11,
                        fontFamily: '',
                        fontSize: 14,
                        lang: 'ru',
                        displayCaptions: true,
                    });

                    $(".star-rating").raty({
                        path: function () {
                            return this.dataset.path || "/assets/snippets/star_rating/assets/img/"
                        },
                        starOn: function () {
                            return this.dataset.on || "star-on.png"
                        },
                        starOff: function () {
                            return this.dataset.off || "star-off.png"
                        },
                        starHalf: function () {
                            return this.dataset.half || "star-half.png"
                        },
                        number: function () {
                            return this.dataset.stars || 5
                        },
                        score: function () {
                            return this.dataset.rating || 0
                        },

                        readOnly: function () {
                            return 1 == this.dataset.disabled
                        },
                        starType: function () {
                            return this.dataset.type || "img"
                        },
                        click: function (s) {

                            var a = $(this)

                                , i = a.closest(".star-rating-container")

                                , e = this.dataset.id
                                , ajax_url = this.dataset.url;

                            if (ajax_url == '' || ajax_url == undefined) {
                                ajax_url = window.location.href
                            }

                            $.ajax({

                                url: ajax_url,

                                type: "get",

                                data: {

                                    rid: e,

                                    vote: s

                                },

                                success: function (s) {

                                    s ? (i.find(".msg").remove(),

                                        s.success !== !0 || s.error ? a.raty("reload") : (i.find(".star-rating-votes").text(s.votes),

                                            i.find(".star-rating-rating").text(s.rating),

                                            a.raty("score", s.rating),

                                            a.raty("readOnly", !0)),

                                        a.append('<div class="msg">' + s.message + "</div>"),

                                        a.find(".mask").fadeOut(100, function () {

                                            $(this).remove()

                                        }),

                                        setTimeout(function () {

                                            i.find(".msg").fadeOut(1e3)

                                        }, 2e3)) : alert("Unknown error. Try again later")

                                },
                                beforeSend: function () {
                                    a.append('<div class="mask" />')
                                }
                            });
                        }
                    });
                    customCounter();
                }
            });
        }
    });
});

/*Подгрузка товаров для результатов фильтрации*/
/*$(document).ready(function () {
var inProgress = false;
var spinner = '<div class="spinner center"><img src="assets/templates/market/img/spinner.gif" alt=""></div>';
$('body').on('change', '#eFiltr select, #eFiltr input', function (event) {
    $('#eFiltr').submit();
});
$('body').on('submit', '#eFiltr', function (event) {
    event.preventDefault();
    var form_select = $(this);
    var z = form_select.serialize();
    //console.log(z);

    var dan;
    var st = $('#product_site').attr('start');
    var pr = $('#product_site').attr('parent');
    var tp = $('#product_site').attr('type');
    var total = $('#product_site').attr('total');
    var sortby = $('#product_site').attr('sort');
    var sortdir = $('#product_site').attr('sortdir');
    var ajax_url = $('#product_site').attr('ajax_url');
    var fr = $('#product_site').attr('filter');
    var ids = $('#product_site').attr('ids');
    var ids_2 = '';
    var load_prod = 0;
    dan = "&start=" + st + "&parent=" + pr + "&type=" + tp + "&sortby=" + sortby + "&sortdir=" + sortdir + "&total=" + total + "&load_prod=" + load_prod + "&filter=" + fr + "&documents=" + ids;
    dan += '&';
    dan += z;
    //console.log(dan);
    var endd = $('#ajax_stop').val();
    if (!inProgress) {

        $.ajax({
            type: "GET",
            url: ajax_url,
            data: dan,
            beforeSend: function () {
                $('#product_cont').html(spinner);
                inProgress = true;
            },
            success: function (msg) {
                var suma;
                suma = parseInt(st) + parseInt(total);
                $('#product_site').attr('start', suma);
                //console.log(msg);
                $('#product_cont').html(msg);
                $(".spinner").hide();
                var endload = $('#ajax_stop').val();
                if (endload == 'end') {
                    $(".more-prod a.primary-button").hide();
                }

                //Пишем данные с фильтра
                var z_json = JSON.stringify(z);
                $('#product_site').attr('data-efilter', z_json);

                customCounter();
                inProgress = false;
                catalogElements();
            }
        });
    }
});
});*/


/*form form_authorization (Всплывающая форма Авторизация)*/

function ajax_authorization_alert(response) {
    var o_response = JSON.parse(response);
    sweetAlert({
        'title': o_response.title,
        'text': o_response.text,
        'type': o_response.type,
        'timer': 5000
    });
    if(o_response.redirect != '' && o_response.redirect != undefined){
        setTimeout(function () {
            document.location.href = o_response.redirect;
        }, 5000);
    }
}

function clos_clear_authorization() {
    var form_select = $('#form_authorization');
    form_select.find('input').removeClass("error");
    form_select.find('input[type="text"],input[type="password"],').val('');
}


$(document).ready(function () {
    $(document).on('click', '#authorization .uk-modal-close', function () {
        clos_clear_authorization();
    });

    $('#form_authorization input').focus(function () {
        $(this).removeClass("error");
    });

    $('#form_authorization input[name="email"]').blur(function () {
        var s1 = $(this).val();
        $(this).removeClass("error");
        if ((s1.length < 3) || (s1.length >= 60)) {
            $(this).addClass("error");
        }
    });

    $('#form_authorization input[name="password"]').blur(function () {
        var s5 = $(this).val();
        $(this).removeClass("error");
        if (s5.length < 2 && s5 != '') {
            $(this).addClass("error");
        }
    });

    $('#form_authorization').submit(function (event) {
        event.preventDefault();
        var form_select = $(this);
        var regphone = /(\+)?([-\._\(\) ]?[\d]{2,20}[-\._\(\) ]?){2,10}/;
        var regname = /^[а-яА-ЯёЁa-zA-Z -]+$/;
        var regmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        var valid = false;

        form_select.find('input,textarea').removeClass("error");

        var s1 = form_select.find('input[name="email"]').val();
        var s2 = form_select.find('input[name="password"]').val();
        var s3 = form_select.find('input[name="email_back"]').val();

        if (((s1.length >= 3) && (s1.length < 60)) && (s3.length === 0) && (s2.length > 2 || s2 == '')) {
            valid = true;
        } else {
            if ((s1.length < 3) || (s1.length >= 60)) {
                form_select.find('input[name="email"]').addClass("error");
            }

            if (s3.length !== 0) {
                $('#answer h2').html("Спам!!!");
            }

            if (s2.length <= 2 && s2 != '') {
                form_select.find('textarea[name="message"]').addClass("error");
            }

        }
        if (valid === true) {
            var z = form_select.serialize();
            var a_url = form_select.attr('action');
            form_authorization_ajax(z, a_url);
        }
    });
});

function form_authorization_ajax(val, url_ajax) {
    $.ajax({
        type: "POST",
        url: url_ajax,
        data: val,
        error: function (xhr) {
            ajax_error(xhr)
        },
        success: function (response) {
            ajax_authorization_alert(response);
            setTimeout(function () {
                $("#authorization .uk-modal-close").trigger('click');
            }, 5000);
        }
    });
}


//Регистрация
function clos_clear_registration() {
    var form_select = $('#form_registration');
    form_select.find('input').removeClass("error");
    form_select.find('input[type="text"],input[type="password"],').val('');
}


$(document).ready(function () {

    $('#form_registration').submit(function (event) {
        event.preventDefault();
        var form_select = $(this);
        var regphone = /(\+)?([-\._\(\) ]?[\d]{2,20}[-\._\(\) ]?){2,10}/;
        var regname = /^[а-яА-ЯёЁa-zA-Z -]+$/;
        var regmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        var valid = false;

        form_select.find('input,textarea').removeClass("error");

        var s1 = form_select.find('input[name="registerLogin"]').val();
        var s2 = form_select.find('input[name="registerPassword"]').val();
        var s3 = form_select.find('input[name="email_back"]').val();

        if (((s1.length >= 3) && (s1.length < 60)) && (s3.length === 0) && (s2.length > 2 || s2 == '')) {
            valid = true;
        } else {
            if ((s1.length < 3) || (s1.length >= 60)) {
                form_select.find('input[name="registerLogin"]').addClass("error");
            }

            if (s3.length !== 0) {
                $('#answer h2').html("Спам!!!");
            }

            if (s2.length <= 2 && s2 != '') {
                form_select.find('input[name="registerPassword"]').addClass("error");
            }

        }
        if (valid === true) {
            var z = form_select.serialize();
            var a_url = form_select.attr('action');
            form_registration_ajax(z, a_url);
        }
    });
});

function form_registration_ajax(val, url_ajax) {
    $.ajax({
        type: "POST",
        url: url_ajax,
        data: val,
        error: function (xhr) {
            ajax_error(xhr)
        },
        success: function (response) {
            ajax_authorization_alert(response);
            setTimeout(function () {
                clos_clear_registration();
            }, 5000);
        }
    });
}

//Восстановление пароля
function clos_clear_recover() {
    var form_select = $('#form_recover');
    form_select.find('input').removeClass("error");
    form_select.find('input[type="text"],input[type="password"]').val('');
}


$(document).ready(function () {

    $('#form_recover').submit(function (event) {
        event.preventDefault();
        var form_select = $(this);
        var regphone = /(\+)?([-\._\(\) ]?[\d]{2,20}[-\._\(\) ]?){2,10}/;
        var regname = /^[а-яА-ЯёЁa-zA-Z -]+$/;
        var regmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        var valid = false;

        form_select.find('input,textarea').removeClass("error");

        var s1 = form_select.find('input[name="profilePass"]').val();
        var s2 = form_select.find('input[name="profilePassRepeat"]').val();

        if ((s1.length >= 6 ) && (s2.length >= 6)) {
            valid = true;
        } else {
            if (s1.length < 6 ) {
                form_select.find('input[name="profilePass"]').addClass("error");
            }

            if (s2.length < 6 ) {
                form_select.find('input[name="profilePassRepeat"]').addClass("error");
            }

            /*if (s1 != s2) {
                form_select.find('input[name="profilePass"]').addClass("error");
                form_select.find('input[name="profilePassRepeat"]').addClass("error");
            }*/
        }
        if (valid === true) {
            var z = form_select.serialize();
            var a_url = form_select.attr('action');
            form_recover_ajax(z, a_url);
        }
    });
});

function form_recover_ajax(val, url_ajax) {
    $.ajax({
        type: "POST",
        url: url_ajax,
        data: val,
        error: function (xhr) {
            ajax_error(xhr)
        },
        success: function (response) {
            ajax_authorization_alert(response);
            setTimeout(function () {
                clos_clear_recover();
            }, 5000);
        }
    });
}

//Изменение данных в личном кабинете
function clos_clear_profile() {
    var form_select = $('#profileForm');
    form_select.find('input').removeClass("error");
    form_select.find('input[type="text"],input[type="password"]').val('');
}


$(document).ready(function () {

    $('#profileForm').submit(function (event) {

        event.preventDefault();
        var form_select = $(this);
        var regphone = /(\+)?([-\._\(\) ]?[\d]{2,20}[-\._\(\) ]?){2,10}/;
        var regname = /^[а-яА-ЯёЁa-zA-Z -]+$/;
        var regmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        var valid = false;

        form_select.find('input,textarea').removeClass("error");

        var s1 = form_select.find('input[name="profileUsername"]').val();
        var s2 = form_select.find('input[name="profileName"]').val();
        var s3 = form_select.find('input[name="profilePhone"]').val();
        var s4 = form_select.find('input[name="profileEmail"]').val();


        if ((s1.length > 0 ) && (s2.length > 0) && (s3.length > 0) && (s4.length > 0)) {
            valid = true;
        } else {
            if (s1.length = 0) {
                form_select.find('input[name="profileUsername"]').addClass("error");
            }

            if (s2.length = 0) {
                form_select.find('input[name="profileName"]').addClass("error");
            }

            if (s3.length = 0) {
                form_select.find('input[name="profilePhone"]').addClass("error");
            }

            if (s4.length = 0) {
                form_select.find('input[name="profileEmail"]').addClass("error");
            }
        }
        if (valid === true) {
            var z = form_select.serialize();
            var a_url = form_select.attr('action');
            form_profile_ajax(z, a_url);
        }
    });
});

function form_profile_ajax(val, url_ajax) {
    $.ajax({
        type: "POST",
        url: url_ajax,
        data: val,
        error: function (xhr) {
            ajax_error(xhr)
        },
        success: function (response) {
            ajax_authorization_alert(response);
        }
    });
}


//Восстановление пароля по email
function clos_clear_recover_mail() {
    var form_select = $('#form_recover_mail');
    form_select.find('input').removeClass("error");
    form_select.find('input[type="text"],input[type="email"]').val('');
}


$(document).ready(function () {

    $('#form_recover_mail input').focus(function () {
        $(this).removeClass("error");
    });

    $('#form_recover_mail input[name="email"]').blur(function () {
        var regmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        var s3 = $(this).val();
        $(this).removeClass("error");
        if (!regmail.test(s3)) {
            $(this).addClass("error");
        }
    });

    $('#form_recover_mail').submit(function (event) {
        event.preventDefault();
        var form_select = $(this);
        var regphone = /(\+)?([-\._\(\) ]?[\d]{2,20}[-\._\(\) ]?){2,10}/;
        var regname = /^[а-яА-ЯёЁa-zA-Z -]+$/;
        var regmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        var valid = false;

        form_select.find('input,textarea').removeClass("error");

        var s1 = form_select.find('input[name="recoverEmail"]').val();

        if (regmail.test(s1)) {
            valid = true;
        } else {
            if (!regmail.test(s1)) {
                form_select.find('input[name="recoverEmail"]').addClass("error");
            }

        }
        if (valid === true) {
            var z = form_select.serialize();
            var a_url = form_select.attr('action');
            form_recover_mail_ajax(z, a_url);
        }
    });
});

function form_recover_mail_ajax(val, url_ajax) {
    $.ajax({
        type: "POST",
        url: url_ajax,
        data: val,
        error: function (xhr) {
            ajax_error(xhr)
        },
        success: function (response) {
            ajax_authorization_alert(response);
            setTimeout(function () {
                clos_clear_recover_mail();
            }, 5000);
        }
    });
}