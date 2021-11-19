

var search={
    schrch:function () {
        var q=$('input[name="search"]').val();

        $.ajax({
            url:'/index/search/',

        })
    }
}