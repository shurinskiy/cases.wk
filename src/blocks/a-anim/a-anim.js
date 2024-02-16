import { scrollClassToggle } from "../../js/libs/scroll";

(() => {
	const toggle = scrollClassToggle({
		class: 'active',
		onadd: function() {
			console.log(this.index);
		}
	});

})();