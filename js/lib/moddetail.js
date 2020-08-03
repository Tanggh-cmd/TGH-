define(['cookie'], function() {
    return {
        init: function() {

            //渲染
            let baseUrl = "http://localhost/wampROOM1/twoproject2copy/";
            let id = location.search.split("=")[1];
            const li0 = $('#J_UlThumb li:nth-child(1)');
            const li1 = $('#J_UlThumb li:nth-child(2)');
            const li2 = $('#J_UlThumb li:nth-child(3)');
            const li3 = $('#J_UlThumb li:nth-child(4)');
            const li4 = $('#J_UlThumb li:nth-child(5)');
            const big_pic = $('.tb-gallery');
            const tit = $('.tit1');
            const color_list = $('#color-list li');
            $.ajax({
                type: "GET",
                data: {
                    id: id,
                },
                url: "http://localhost/wampROOM1/twoproject2copy/php/detail.php",
                success: function(data) {

                    var data = JSON.parse(data);
                    var temp0 = '';
                    var temp1 = '';
                    var temp2 = '';
                    var temp3 = '';
                    var temp4 = '';
                    var temp5 = '';
                    var pic = JSON.parse(data.pro_img);
                    var pic_color = JSON.parse(data.pro_classify);
                    temp5 += `<div class="span_small"></div>`
                    temp5 += `<img class="pic" src="${pic[0].src}">`
                    temp0 += `<img class="pic" src="${pic[0].src}">`
                    temp1 += `<img class="pic" src="${pic[1].src}">`
                    temp2 += `<img class="pic" src="${pic[2].src}">`
                    temp3 += `<img class="pic" src="${pic[3].src}">`
                    temp4 += `<img class="pic" src="${pic[4].src}">`
                    li0[0].innerHTML = temp0;
                    li1[0].innerHTML = temp1;
                    li2[0].innerHTML = temp2;
                    li3[0].innerHTML = temp3;
                    li4[0].innerHTML = temp4;
                    big_pic[0].innerHTML = temp5;
                    tit[0].innerHTML = data.pro_title
                    for (var i = 0; i < color_list.length; i++) {
                        // console.log(pic[i].src)
                        color_list[i].innerHTML = `<img  src="${pic_color[i].src}">`
                    }
                    //放大镜
                    const Big_pic = $('.tb-gallery');
                    const small_pic = $('#J_UlThumb li');
                    const span_small = $('.span_small');
                    const Big_pictrue = $('.Big_pictrue');
                    Big_pictrue.html(temp0)
                    Big_pic.on('mousemove', function(e) {
                        $('.Big_pictrue').css('display', 'block')
                        $('.span_small').css('display', 'block')
                        var x = e.pageX - $(Big_pic).offset().left - ($(Big_pic).width() / 4);
                        var y = e.pageY - $(Big_pic).offset().top - ($(Big_pic).height() / 4);
                        if (x <= 0) x = 0
                        if (y <= 0) y = 0
                        if (x >= $(Big_pic).width() - $('.span_small').width()) x = $(Big_pic).width() - $('.span_small').width()
                        if (y >= $(Big_pic).height() - $('.span_small').height()) y = $(Big_pic).height() - $('.span_small').height()
                        $('.span_small').css('left', x);
                        $('.span_small').css('top', y);

                        $('.Big_pictrue img').css('left', -2 * x + 'px');
                        $('.Big_pictrue img').css('top', -2 * y + 'px');
                    })
                    Big_pic.on('mouseleave', function() {
                        $('.Big_pictrue').css('display', 'none')
                        $('.span_small').css('display', 'none')
                    })
                    small_pic.on('click', function() {
                        console.log($(this).index())
                    })

                    function fnn() {
                        $('#J_UlThumb li').on('mouseenter', function() {
                            $(this).addClass('active').siblings().removeClass('active')
                            $($('.tb-gallery')).html($(this).html()).append(temp5)
                            $($('.Big_pictrue')).html($(this).html())
                        })
                        $('#color-list li').on('mouseenter', function() {
                            $(this).addClass('active').siblings().removeClass('active')
                            $($('.tb-gallery')).html($(this).html()).append(temp5)
                            $($('.Big_pictrue')).html($(this).html())
                        })
                    }
                    fnn()
                }


            });
            // 数量加减
            // const plus = $('.spa2')
            const inp = $('.inp')
            const stok = $('.spa5')
            $('.spa1').on('click', () => {
                if (inp[0].innerHTML > 1) {
                    inp[0].innerHTML--
                }
                if (inp[0].innerHTML == '') {
                    inp[0].innerHTML = 1
                }

            })
            $('.spa2').on('click', () => {
                    if (parseInt(inp[0].innerHTML) < parseInt(stok[0].innerHTML) || inp[0].innerHTML == '') {
                        inp[0].innerHTML++
                    }
                })
                // 加入购物车
            const price = $('.tb-2-tit2 span')
            const JR = $('.J-4-2')
            const num = inp[0].innerHTML;
            JR.on('click', () => {
                // set('shop', `[{"id":"${id}","price":"${price[0].innerHTML}","num":"${inp[0].innerHTML}"}]`, 1)
                let shop = get('shop'); //获取cookie中的购物车
                // console.log(shop)
                var detail = {
                    id: id,
                    price: `${price[0].innerHTML}`,
                    num: `${inp[0].innerHTML}`
                }
                if (shop) { //存在
                    shop = JSON.parse(shop); // 将字符串转成数组
                    console.log(shop)
                        // console.log(shop)
                        // 判断数组中已经存在的商品的Id
                        // 只修改num值 而不是将商品放入数组
                    if (shop.some(elm => elm.id == id)) {
                        shop.forEach(elm => {
                            elm.id == id ? elm.num = inp[0].innerHTML : null;
                        })
                    } else {
                        shop.push(detail)
                    }

                } else {
                    shop = []; //不存在新建数组
                    shop.push(detail); //放入商品
                }

                set('shop', JSON.stringify(shop), 1)
                location.href = `http://localhost/wampROOM1/twoproject2copy/html/cart.html`
            })
        }
    }
});