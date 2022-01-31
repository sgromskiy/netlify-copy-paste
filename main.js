jQuery( document ).ready(function() {
    console.log( "script is ready!" );
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
    	
    	copyToClipboard(data);
    	areaCopy.val(JSON.stringify(data));
    	localStorage.removeItem('NETLIFY_DATA');
    	localStorage.setItem('NETLIFY_DATA', JSON.stringify(data));
    	}, 1000);
    	
    });
    
    const savedData = localStorage.getItem('NETLIFY_DATA');
    if(savedData) {areaCopy.val(savedData)};
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
    		const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    		formRows.each((idx, row) => {
    		
    		const rowKeyInput = $(row).find('input[name="key"]');
    		const rowValueInput = $(row).find('input[name="value"]');
    		
    		nativeInputValueSetter.call(rowKeyInput[0], newData[idx].rowKey);
		    const event1 = new Event('input', { bubbles: true });
		    rowKeyInput[0].dispatchEvent(event1);
		    nativeInputValueSetter.call(rowValueInput[0], newData[idx].rowValue);
		    const event2 = new Event('input', { bubbles: true });
		    rowValueInput[0].dispatchEvent(event2);
    		
    		//rowKeyInput.val(newData[idx].rowKey).prop("value", newData[idx].rowKey);
    		//rowValueInput.val(newData[idx].rowValue).prop("value", newData[idx].rowValue);
    		
    		localStorage.removeItem('NETLIFY_DATA');
    		
    	})
    	}, 2000);
    
    });
    
    
    function copyToClipboard(data) {
	    const $temp = $("<input>");
	    $("body").append($temp);
	    $temp.val(JSON.stringify(data)).select();
	    document.execCommand("copy");
	    $temp.remove();
	}
});
