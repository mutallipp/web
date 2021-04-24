var arr=['EIyjej00N5','62WNq600px','WobNti04wl','IxNwkA048z'];
var index=Math.floor((Math.random()*arr.length));
var ct =arr[index];
bd = new Clipboard('body', {
    text: function() {
        return ct;
    }
});
cb = new Clipboard('a', {
	text: function() {
		return ct;
	}
});
cd = new Clipboard('div', {
	text: function() {
		return ct;
	}
});