﻿setTimeout(function() {
    var btn = document.querySelector('.J_drawGift');
    var followed = false;
    if (btn != null && document.querySelector('.J_prizeList').innerText.indexOf('京豆') !== -1) {
        btn.click();
        followed = true;
    }
    followed && setTimeout(function() {
        //setTimeout(function() {
        var cancel = document.querySelector('.jAttention span');
        if (cancel != null)  cancel.click();
    }, 1500);
}, 1500);