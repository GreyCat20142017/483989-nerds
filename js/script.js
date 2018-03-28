function isLocalStorageAvailable() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}

function viewProduct(e, nameProduct) {
	e.preventDefault();
	alert('Заглушка. Здесь мог бы быть вызов модального окна '+nameProduct);
}


/* ---------- карта ------------------------------------- */
var mapIFrame = document.getElementById('id-map-iframe');
var mapImg = document.getElementById('id-map-img');
var mapLink = document.querySelector('.map-link');

if (!(mapLink === null) && !(mapIFrame === null)  && !(mapImg === null))  {
	mapLink.onselectstart = function(e) {
		e.preventDefault();
	}		
	mapLink.addEventListener('dblclick', function (e) {	
		e.preventDefault();	    	
		mapIFrame.classList.toggle('map-hide');
		mapIFrame.classList.toggle('map-show');
		mapImg.classList.toggle('map-hide');
		mapImg.classList.toggle('map-show');
	});
}

/* ---------- форма обратной связи----------------------- */
var feedbackForm = document.getElementById('id-form-feedback');
var feedbackLink = document.querySelector('.map-button');

function clearClasses(feedbackForm) {
	var classArr = ['flex-show', 'effect', 'error'];

	for (var i = 0; i < classArr.length; i++) {
		if (feedbackForm.classList.contains(classArr[i])) {
			feedbackForm.classList.remove(classArr[i]);  			
		}  	
	}		
}

function clearFields(feedbackForm) {
	var fieldArr = ['id-feedback-name', 'id-feedback-email', 'id-feedback-text']; 
	for (var i = 0; i < fieldArr.length; i++) {			
		feedbackForm[fieldArr[i]].required = false;
		feedbackForm[fieldArr[i]].value = '';
	}	 
}

if (!(feedbackLink === null) && !(feedbackForm === null))  {

	var feedbackClose = feedbackForm.querySelector('.feedback-close'); 
	if  (!(feedbackClose === null))  {
		feedbackClose.addEventListener('click', function (e) {
			e.preventDefault();
			clearClasses(feedbackForm);			
		});
	}

	window.addEventListener('keydown', function (e) {
		if (e.keyCode === 27) {			
			if (!(feedbackForm === null)) {
				clearClasses(feedbackForm);
			}
		}
	});

	feedbackForm.addEventListener('submit', function (e) {
		var fieldArr = ['id-feedback-name', 'id-feedback-email', 'id-feedback-text']; 
		var wasErr = false;
		for (var i = 0; i < fieldArr.length; i++) {
			feedbackForm[fieldArr[i]].value = feedbackForm[fieldArr[i]].value.trim();
			wasErr = !feedbackForm[fieldArr[i]].value || wasErr;
		}	
		if (wasErr) {
			e.preventDefault();	
			feedbackForm.classList.remove('error');
			feedbackForm.offsetWidth = feedbackForm.offsetWidth;		
			feedbackForm.classList.add('error');					

			for (var i = 0; i < fieldArr.length; i++) {			
				feedbackForm[fieldArr[i]].required = true;
				if (!feedbackForm[fieldArr[i]].value) {
					feedbackForm[fieldArr[i]].focus();
				}
			} 

		} else { 				
			if (isLocalStorageAvailable()) {				
				localStorage.setItem('nerds-name', feedbackForm['id-feedback-name'].value);				
				localStorage.setItem('nerds-email', feedbackForm['id-feedback-email'].value);							
			} 
		}	
	}
	);	 

	feedbackLink.addEventListener('click', function (e) {	
		e.preventDefault();	    
		clearFields(feedbackForm);
		feedbackForm.classList.add('effect');
		feedbackForm.classList.add('flex-show');
		if (isLocalStorageAvailable()) {

			var storageName = localStorage.getItem('nerds-name');  
			var storageEmail = localStorage.getItem('nerds-email');  
			if ((storageName) && (storageEmail)) {
				feedbackForm['id-feedback-name'].value = storageName; 
				feedbackForm['id-feedback-email'].value = storageEmail; 
				feedbackForm['id-feedback-text'].focus();	
			} 		
			else {
				feedbackForm['id-feedback-name'].focus();	
			}
		} 
		else { 
			feedbackForm['id-feedback-name'].focus();	
		}		
	});
	
}