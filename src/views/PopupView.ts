class PopupView {

  modal: HTMLElement;

	constructor(element: HTMLElement) {
		this.modal = element;

    this.modal.querySelector(".modal__close").addEventListener("click",()=>{
      this.hide();
    });

    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.hide();
      }
    });
    
	}

  show(newContent :HTMLElement ){
    this.modal.classList.add('modal_active');
    // this.modal.ensure
    const holder = this.modal.querySelector('.modal__content');
    holder.innerHTML="";
    holder.appendChild(newContent);
  }

  hide(){
    this.modal.classList.remove('modal_active');
  }
  

}

export{PopupView}