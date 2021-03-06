import React, {useState} from 'react';


const ScrollButton = () =>{

	const [visible, setVisible] = useState(false)

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 300){
		setVisible(true)
		}
		else if (scrolled <= 300){
		setVisible(false)
		}
	};

	const scrollToTop = () =>{
		window.scrollTo({
		top: 0,
		behavior: 'smooth'
		});
	};

	window.addEventListener('scroll', toggleVisible);
	return (
		<i className={`fa fa-arrow-circle-up ${visible? "active": ""}`} onClick={scrollToTop} ></i>
	)
}

export default ScrollButton;
