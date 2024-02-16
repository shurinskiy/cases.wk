import scrollLock from 'scroll-lock';
import { makeModalFrame } from "../../js/libs/modal";
// import Inputmask from "inputmask";

(() => {
	makeModalFrame({ 
		select: '[data-modal]', 
		class: 'modal', 
		scrollLock,
	});
	
})();