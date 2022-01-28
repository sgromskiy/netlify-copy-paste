jQuery( document ).ready(function() {
    console.log( "ready!" );
    $('<div id="copy-popup"><div><button id="copy">Copy</button> <button id="paste">Paste</button></div><textarea id="paste-area" cols="100" rows="10"></textarea></div>').appendTo('body');
    
    const btnCopy = $('#copy');
    const btnPaste = $('#paste');
    const areaCopy = $('#paste-area');
    btnCopy.on('click', (e) => {
    	e.preventDefault();
    	const btnEdit = $("button:contains('Edit variables')");
    	let formRows;
    	let data = [];
    	btnEdit[0].click();
    	setTimeout(function() {
    	formRows = $('[aria-labelledby="card-title-Environment-variables"]').find('.form-row');
    	$('[aria-labelledby="card-title-Environment-variables"]').find('[aria-label="Show variable"]').trigger('click');
    	formRows.each((idx, row) => {
    		const rowKey = $(row).find('input[name="key"]').val();
    		const rowValue = $(row).find('input[name="value"]').val();
    		data.push({rowKey, rowValue})
    	})
    	console.dir( data );
    	copyToClipboard(data)
    	}, 1000);
    	
    });
    
    btnPaste.on('click', (e) => {
    	e.preventDefault();
    	const btnEdit = $("button:contains('Edit variables')");
    	if(!areaCopy.val()) return;
    	const newData = JSON.parse(areaCopy.val());
    	btnEdit[0].click();
    	setTimeout(function() {
    		const newVar = $("button:contains('New variable')");
    		for(let i=1; i < newData.length; i++) {
    			console.log('click');
    			newVar.trigger('click');
    		}
    	}, 1000);
    	
    	setTimeout(function() {
    		formRows = $('[aria-labelledby="card-title-Environment-variables"]').find('.form-row');
    		$('[aria-labelledby="card-title-Environment-variables"]').find('[aria-label="Show variable"]').trigger('click');
    		formRows.each((idx, row) => {
    		const rowKeyInput = $(row).find('input[name="key"]');
    		const rowValueInput = $(row).find('input[name="value"]');
    		rowKeyInput.val(newData[idx].rowKey);
    		rowValueInput.val(newData[idx].rowValue);
    	})
    	}, 2000);
    	
    	console.log(JSON.parse(areaCopy.val()))
    });
    
    
    function copyToClipboard(data) {
	    const $temp = $("<input>");
	    $("body").append($temp);
	    $temp.val(JSON.stringify(data)).select();
	    document.execCommand("copy");
	    $temp.remove();
	}
});
