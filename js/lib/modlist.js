define([], function() {
    return {
        init: function() {
            document.cookie = "name=value";
            const tianjia = $('#tianjia');
            let baseUrl = "http://localhost/wampROOM1/twoproject2copy/";
            $.ajax({
                type: "GET",
                url: "http://localhost/wampROOM1/twoproject2copy/php/list.php",
                success: function(data) {
                    var data = JSON.parse(data)
                    var temp = '';
                    temp = '<ul>'
                    for (var key of data) {
                        var pic = JSON.parse(key.pro_img)
                        temp += `
            <li>
            <a href="${baseUrl}html/detail.html?id=${key.pro_id} " target="_blank">
                <div>
                     <img src="${pic[0].src}">
                        <p>${key.pro_title}</p>
                          <p>  
                             <span>
                            ¥${key.pro_price}
                             </span>
                             <span>销量:${key.pro_sales}</span>
                         </p>
                </div>
                </a>
          </li>
            `
                    }
                    temp += '</ul>'
                        // cookie.set(`${pro_id}`, )
                    tianjia[0].innerHTML = temp;
                }

            });
        }
    }
});