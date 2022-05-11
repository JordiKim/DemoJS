var saveLoading = '<div class="jsSaveLoading"><div class="Loading-box"><span>儲存中請稍後</span> <i class="fas fa-circle-notch fa-spin fa-3x" style="vertical-align: middle;"></i></div></div>';
        var jsCheckFile = '<div class="jsErrMessModal"><div class="Modal-box" ><div class="Modal-b-title">提示訊息</div><div class="Modal-b-info"></div><div class="text-right"><div class="Modal-b-close">確認</div></div></div></div>';
$('body').prepend(saveLoading + jsCheckFile);
$('.js-i-pdf').text("請上傳檔案，檔案大小不可超過30MB，限類型為文書類型");
$('.js-i-pdf-30').text("請上傳檔案，檔案大小不可超過30MB，限類型為文書類型");
$('.js-i-sort').text("數字越大，排序越前面");
$('.js-i-img').text("請上傳圖檔，檔案大小不可超過5MB，限類型為GIF、JPG");//寬為800px 以上 * 高不限，

$('.Modal-b-close').on('click', function () {
    $('.jsErrMessModal').removeClass("jsErrActive");
});
        /*
    Pic Or File
*/
function checkImgWH(files, thisobj, callback) {
    var reader = new FileReader();
    var img = new Image();

    reader.onload = function (e) {
        img.src = e.target.result;
        img.onload = function () {
            callback({ w: this.width, h: this.height }, thisobj);
        };
    };

    reader.readAsDataURL(files);
}

$('.jsCheckPic').on('change', function () {
    var $thisfile = this.files[0];
    if ($thisfile === undefined) {
        $(this).val("");
        $(this).next().find("span").text("請選擇一個檔案");
        return false;
    }

    var fileExtension = ['jpeg', 'jpg', 'gif'];
    var $jsErrMessModal_ = $('.jsErrMessModal');
    var thisFileExt = $(this).val().split('.').pop().toLowerCase();
    var file5M = 5 * 1024 * 1024;
    var fileSize = this.files[0].size;

    if ($.inArray(thisFileExt, fileExtension) === -1) {
        $jsErrMessModal_.addClass("jsErrActive");
        $jsErrMessModal_.find('.Modal-b-info').text("允許檔案類型為 jpg、gif，您的檔案：" + thisFileExt);
        $(this).val("");
        $(this).next().find("span").text("請選擇一個檔案");
        return false;
    }

    if (fileSize > file5M) {
        $jsErrMessModal_.addClass("jsErrActive");
        $jsErrMessModal_.find('.Modal-b-info').text("檔案大小限制 5MB ，你的檔案大小為：" + (fileSize / 1024 / 1024).toFixed(1) + "MB");
        $(this).val("");
        $(this).next().find("span").text("請選擇一個檔案");
        return false;
    }

    var picWH = $(this).data("wh").split('|');

    switch (picWH[2]) {
        case "1": {
            //限制寬度
            checkImgWH(this.files[0], $(this), function (val_wh, funthisobj ) {
                if (picWH[0] > val_wh.w) {
                    $jsErrMessModal_.addClass("jsErrActive");
                    $jsErrMessModal_.find('.Modal-b-info').text("請上傳寬 " + picWH[0] + "px，高 不限的 圖檔 ");
                    funthisobj.val("");
                    funthisobj.next().find("span").text("請選擇一個檔案");
                }
            });
            break;
        }
        case "2": {
            //限制寬度
            checkImgWH(this.files[0], $(this), function (val_wh, funthisobj) {
                if (picWH[0] > val_wh.w ||
                    picWH[1] > val_wh.h ||
                    val_wh.w != val_wh.h) {
                    $jsErrMessModal_.addClass("jsErrActive");
                    $jsErrMessModal_.find('.Modal-b-info').text("請上傳 寬 x 高 " + picWH[0] + "px 以上 的正方形 圖檔 ");
                    funthisobj.val("");
                    funthisobj.next().find("span").text("請選擇一個檔案");
                }
            });
            break;
        }
        case "3": {
            //限制寬度
            checkImgWH(this.files[0], $(this), function (val_wh, funthisobj) {
                if (picWH[0] != val_wh.w ||
                    picWH[1] != val_wh.h) {
                    $jsErrMessModal_.addClass("jsErrActive");
                    $jsErrMessModal_.find('.Modal-b-info').text("請上傳 寬 " + picWH[0] + " x 高 " + picWH[1] + " 的圖檔 ");
                    funthisobj.val("");
                    funthisobj.next().find("span").text("請選擇一個檔案");
                }
            });
            break;
        }
        default: {
            break;
        }
    }
});

$('.jsCheckFile').on('change', function () {
    var fileExtension = ['pdf'];
    //, 'jpg', 'gif', 'png', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'
    var $jsErrMessModal_ = $('.jsErrMessModal');
    var file30M = 5 * 1024 * 1024;

    if ($(this).val() !== '' && $(this).val() !== undefined) {
        var fileSize = this.files[0].size;
        var thisFileExt = $(this).val().split('.').pop().toLowerCase();

        if ($.inArray(thisFileExt, fileExtension) === -1) {
            $jsErrMessModal_.addClass("jsErrActive");
            //、Word、Excel、PPT、JPG、GIF 
            $jsErrMessModal_.find('.Modal-b-info').text("允許檔案類型為 PDF，您的檔案：" + thisFileExt);
            $(this).val("");
            $(this).next().find("span").text("請選擇一個檔案");
        }

        if (fileSize > file30M) {
            $jsErrMessModal_.addClass("jsErrActive");
            $jsErrMessModal_.find('.Modal-b-info').text("檔案大小限制 5MB ，你的檔案大小為：" + (fileSize / 1024 / 1024).toFixed(1) + "MB");
            $(this).val("");
            $(this).next().find("span").text("請選擇一個檔案");
        }

    }
});