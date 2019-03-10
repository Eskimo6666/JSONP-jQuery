

button.addEventListener('click', function (e) {
    
    $.ajax({
        url:'http://jack.com:8002/pay',
        jsonp: "callback",
        dataType: 'jsonp',
        success: function(response){
            if(response.success){
                amount.innerText = response.left
            }else{
                alert('打钱失败')
            }
        }
    })
    
    // let script = document.createElement('script')
    // let functionName = "Humble" + parseInt(Math.random() * 100000, 10)
    // window[functionName] = function (result) {
        
    //     if (result.success) {
    //         amount.innerText = amount.innerText - 1
    //     } else {
    //         alert('打钱失败')
    //     }
    // }
    // script.src = 'http://jack.com:8002/pay?callbackName='+functionName
    // document.body.appendChild(script)
    // script.onload = function (e) {
    //     e.currentTarget.remove()
    //     delete window[functionName]
    // }
    // script.onerror = function (e) {
    //     e.currentTarget.remove()
    //     delete window[functionName]
    // }

})
