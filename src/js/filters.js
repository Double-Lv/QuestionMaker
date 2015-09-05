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
.filter('qtypestr_en_to_num',function(){
    return function(type){
        switch(type){
            case 'choice':
                return 1;
            break;
            case 'block':
                return 2;
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