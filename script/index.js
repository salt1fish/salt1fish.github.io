$(function () {
    //一段正则，匹配所有_min.的图片src属性
    let test = /_min\./
    //遍历所有的图片节点
    $("img").each(function (index, obj) {
        if (test.test($(this).attr("src"))) {
            var reSrc = $(this).attr("src").replace(test, ".");
            $(this).attr("src", reSrc)
        }
    })

    // 网页初始化
    window.addEventListener("camera-init", (event) => {
        console.log("prepare init");
        let tem = document.body.offsetWidth;
        let intervalBox = setInterval(function () {
            if (document.body.offsetWidth > tem) {
                console.log("start init");
                myInit();
                console.log("init success");
                clearInterval(intervalBox);//清除interval定时器
            }
        }, 1000);

    });

    window.AndroidBack.push('close_modal', () => {
        // 关闭弹窗
        console.log('close_modal');
        lclick();
    });
})

function pushHistory() {
    $(window).on('popstate', function (event) {
        location.reload();
    });
    var state = {
        title: '',
        url: ''
    };
    window.history.replaceState(state, '', '');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function myInit() {
    let dis = Math.ceil((document.body.offsetWidth - window.innerWidth) / 2);
    $("#l-img").css("left", dis + "px");
    $("#r-img").css("right", dis + "px");
    // sleep(5000);
    $("#sk-fa").remove();
    if (getCookie("index_flag") == null) {
        // 引导操作
        swal("Добро пожаловать в древний мир Китая, сканируйте вспомогательную графику, чтобы раскрыть тайны китайской культуры.", {
            buttons: false,
            className: "swal-overlay",
        });
        setCookie("index_flag", "true", "s300");
    }
    pushHistory();
    $("#logo-btn").css("pointer-events", "auto");
    $("#btn").css({"pointer-events": "auto"});
    $("#rbtn").css({"pointer-events": "auto"});
    $("#play-btn").css({"pointer-events": "auto"});
}

// 设置cookie
// 设定过期时间的使用示例：
// s20是代表20秒
// h是指小时，如12小时则是：h12
// d是天数，30天则：d30
function setCookie(name, value, time) {
    let strsec = getsec(time);
    let exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

// 设置过期时间
function getsec(str) {
    let str1 = str.substring(1, str.length) * 1;
    let str2 = str.substring(0, 1);
    if (str2 === "s") {
        return str1 * 1000;
    } else if (str2 === "h") {
        return str1 * 60 * 60 * 1000;
    } else if (str2 === "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}

// 读取cookie
function getCookie(cookieName) {
    const strCookie = document.cookie;
    const cookieList = strCookie.split(';');

    for (let i = 0; i < cookieList.length; i++) {
        const arr = cookieList[i].split('=');
        if (cookieName === arr[0].trim()) {
            return arr[1];
        }
    }

    return null;
}