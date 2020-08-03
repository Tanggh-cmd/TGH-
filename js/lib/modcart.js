define([], function() {
    return {
        init: function() {
            const baseUrl = 'http://localhost/wampROOM1/LAOpengL/7.23ZYshoping/shopping/img/';
            let shop = get('shop');
            let list = $('.order-content')

            if (shop) {
                shop = JSON.parse(shop);
                let idlist = shop.map(elm => elm.id).join();
                $.ajax({
                    type: "get",
                    url: `http://localhost/wampROOM1/LAOpengL/7.23ZYshoping/shopping/php/cart.php`,
                    data: {
                        id: idlist,
                    },
                    dataType: "json",
                    success: function(res) {
                        console.log(res)
                        let temp = '';
                        temp = '<ul id="list_shop">'
                        res.forEach(elm => {
                            var pic = JSON.parse(elm.pro_img)
                            let arr = shop.filter(val => val.id == elm.pro_id)
                            temp += `<li class="${elm.pro_id}">
                                           <div class="check_box">
                                                <input class="check_all" type="checkbox">
                                           </div>
                                            <div class="spa1">
                                                <img src="${pic[0].src}">
                                            </div>
                                            <div class="spa2">
                                                <span>
                                                        ${elm.pro_title}
                                                </span>
                                            </div>
                                            <div class="spa3">
                                                ${elm.pro_price}
                                            </div>
                                            <div class="spa4">
                                                <div class="jian">-</div>
                                                <input class="inp" type="number" value="${arr[0].num}">
                                                <div class="jia">+</div>
                                            </div>
                                            
                                            <div class="spa5">
                                            ${arr[0].num*elm.pro_price}
                                            </div>
                                             <div class="spa6">
                                                <a class="del">删除</a>
                                            </div>
                                    </li>`
                        });
                        temp += '</ul>'

                        $('.order-content').html(temp);
                        // 删除
                        $('.del').on('click', function() {
                                let sure = confirm('你确定删除吗?')
                                shop = get('shop');
                                shop = JSON.parse(shop);
                                if (sure) {
                                    let shop_id = $(this).parent().parent().attr('class')
                                    let coo = [];

                                    shop.forEach((elm, index) => { //循环遍历判断删除指定的数据
                                            if (elm.id !== shop_id) {
                                                // console.log(elm.id, shop_id)
                                                coo.push(elm);
                                            }
                                        })
                                        // console.log(coo)
                                    set('shop', JSON.stringify(coo), { expires: 7 })
                                    $(this).parents('li').remove();
                                }
                            })
                            //总价格运算函数
                        var total;

                        function total_price() {
                            total = 0;
                            $('.check_all').not('#J_SelectAllCbx1').not('.J_CheckBoxShop').each(function(j) {
                                if ($(this).prop('checked')) {
                                    total += parseInt($('.spa5').eq(j).text())
                                }
                                $('.total_shop').html(parseFloat(total));
                            })
                        }
                        // 数量加减运算
                        function JJ() {
                            const inp = $('.inp')
                                // 失去焦点小计刷新价格
                            $('.inp').change(function() {
                                    $(this).parent().next().html(`${$(this).val()*$(this).parent().prev().html()}`)
                                    fn_total()
                                    total_price();
                                })
                                // 加数量刷新价格
                            $('.jian').on('click', function() {
                                let num1 = $(this).next().val();
                                num1--
                                $(this).next().val(num1);
                                if (num1 <= 1) {
                                    $(this).next().val(1)
                                }

                                $(this).parent().next().html(`${$(this).next().val() * $(this).parent().prev().html()}`)
                                total_price();
                                fn_total()
                            });
                            // 减数量刷新价格
                            $('.jia').on('click', function() {
                                    let num = $(this).prev().val();
                                    num++
                                    $(this).prev().val(num)
                                    $(this).parent().next().html(`${$(this).prev().val() * $(this).parent().prev().html()}`)
                                    fn_total()
                                    total_price();
                                })
                                //总费用
                            function fn_total() {
                                // 获取所有单选框的元素
                                var btns = $('.check_all').not('#J_SelectAllCbx1').not('.J_CheckBoxShop')
                                    // 所有单选框的点击事件
                                $(btns).on('click', function() {
                                    //赋值一个变量为0
                                    total = 0;
                                    // 除去两个全选框的单选框遍历
                                    $('.check_all').not('#J_SelectAllCbx1').not('.J_CheckBoxShop').each(function(j) {
                                        //如果单选框为真也就是选上勾了,总价格加上后面小计的金额
                                        if ($(this).prop('checked')) {
                                            total += parseInt($('.spa5').eq(j).text())
                                        }
                                        //给总价格赋值
                                        $('.total_shop').html(total.toFixed(2));
                                    })
                                });
                                // 全选框的点击事件
                                $('#J_SelectAllCbx1').on('click', function() {
                                        // if全选框为true 
                                        if ($('#J_SelectAllCbx1').prop('checked') == true) {
                                            total = 0.00;
                                            // 遍历除去全选框的单选框,给总价格赋值
                                            $('.check_all').not('#J_SelectAllCbx1').not('.J_CheckBoxShop').each(function(j) {
                                                total += parseInt($('.spa5').eq(j).text())
                                                $('.total_shop').html(total.toFixed(2));
                                            })
                                        } else {
                                            //否则为0
                                            total = 0.00;
                                            $('.total_shop').html(total.toFixed(2));

                                        }
                                    })
                                    // 全选框数量为true 给已选商品数量相应的数量
                                function select_all() {
                                    var index = 0;
                                    btns.each(function(i) {
                                        if ($('#J_SelectAllCbx1').prop('checked')) {
                                            index += $(btns[i]).length;
                                        }
                                        $('#J_SelectedItemsCount').html(index)

                                    })

                                }
                                $('#J_SelectAllCbx1').on('click', function() {
                                    select_all();
                                });
                                // 单选数量加减
                                btns.on('click', function() {
                                        var index = 0;
                                        btns.each(function(i) {
                                            if ($(btns[i]).prop('checked')) {
                                                // qqq()
                                                index += $(btns[i]).prop('checked')
                                                console.log(index)
                                                $('#J_SelectedItemsCount').html(index)
                                            }
                                            if (index == 0) {
                                                index = 0
                                                $('#J_SelectedItemsCount').html(index)
                                            }
                                        })
                                    })
                                    // 单选数量加减end
                            }
                            fn_total()
                        }
                        JJ();
                        // 结算亮和不亮start
                        $('input').not('.inp').on('click', function() {
                            if ($('#J_SelectedItemsCount').html() > 0) {
                                $('.submit-btn').css({
                                    background: '#f40',
                                    cursor: 'pointer'
                                })
                            } else {
                                $('.submit-btn').css({
                                    background: '#B0B0B0',
                                    cursor: 'not-allowed'
                                })
                            }
                        })

                        // 结算亮和不亮end 
                        //全选单选效果start
                        function check() {
                            var btns = $('input').not('#J_SelectAllCbx1').not('.J_CheckBoxShop')
                            var btn_first = $('#J_SelectAllCbx1')
                            var btn_last = $('#J_SelectAllCbx2')
                            btn_first.on('click', function() {
                                btns.prop('checked', $(this).prop('checked'));
                                btn_last.prop('checked', $(this).prop('checked'))
                            })
                            btn_last.on('click', function() {
                                btns.prop('checked', $(this).prop('checked'));
                                btn_first.prop('checked', $(this).prop('checked'))
                            })
                            btns.on('click', function() {

                                if (btns.length === $('input:checked').not('#J_SelectAllCbx1').not('#J_SelectAllCbx2').length) {
                                    btn_first.prop('checked', true);
                                    btn_last.prop('checked', true);
                                } else {
                                    btn_first.prop('checked', false);
                                    btn_last.prop('checked', false);
                                }
                            });
                        }
                        check()
                            //全选end
                    }
                })

            }
        }
    }
});