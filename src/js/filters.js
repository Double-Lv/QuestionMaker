app.filter('qtypestr',function(){
    return function(type){
    	switch(type){
    		case 1:
    			return '选择';
    		break;
    		case 2:
    			return '填空';
    		break;
    	}
    }
})
.filter('qtypestr_en',function(){
    return function(type){
        switch(+type){
            case 1:
                return 'choice';
            break;
            case 2:
                return 'block';
            break;
        }
    }
})
.filter('optionstr', function(){
	return function(index){
		return String.fromCharCode(index+65);
	}
}).
filter('blockfilter', function(){
    return function(cont){
        cont = cont || '';
        return cont.replace(/\$\$/g, '______');
    }
});