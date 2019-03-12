class InfiniteRoll {
    /**
     * Journal
     * 
     * + TO DO:
     * - Make some check on options
     * #Done - Add direction LTR
     * - Add intersection observer to stop rolling on off screen
     * #Done - Add manually pause method
     * - Add destroy method
     */

    constructor(options) {
        
        this.element = options.element;
        this.speed = options.speed || 1;
        this.direction = options.direction || "rtl";
        this.type = options.type || "text";

        this.elementContent = this.type === "text" ? document.createTextNode(this.element.textContent) : this.element.firstElementChild;
        this.pos = 0;
        this.raf;
        
        this.scrollWrapper = document.createElement("div");
        this.scrollWrapper.classList.add("infiniteRollWrapper");
        this.scrollRail = document.createElement("div");
        this.scrollRail.classList.add("infiniteRollRail");
        this.scrollItem = document.createElement("div");
        this.scrollItem.classList.add("infiniteRollItem");
        this.scrollItem.appendChild(this.elementContent);

        this.scrollRail.appendChild(this.scrollItem);
        this.scrollWrapper.appendChild(this.scrollRail);

        this.element.innerHTML = "";
        this.element.appendChild(this.scrollWrapper);

        this.scrollItemWidth = this.scrollItem.getBoundingClientRect().width;
        this.totalItem = (this.element.getBoundingClientRect().width / this.scrollItemWidth + 1).toFixed(0);

        console.log(this.totalItem)


        this.generateScrollItems();

        return this;

    }

    generateScrollItems() {

        for(let i = 1; i <= this.totalItem; i++) {
            this.scrollRail.appendChild(this.scrollItem.cloneNode(true));
        }
    }


    play() {
        const scrollItems = this.scrollRail.querySelectorAll(".infiniteRollItem");

        if(this.direction === "rtl") {
            this.toLeft(scrollItems);
        }

        if(this.direction === "ltr") {
            this.toRight(scrollItems);
        }
    
        this.move(this.pos);
    
        this.raf = requestAnimationFrame(this.play.bind(this));
    }

    pause() {
        cancelAnimationFrame(this.raf);
    }

    toLeft(scrollItems) {
    
        if(scrollItems[0].getBoundingClientRect().right < 0) {
            
            this.scrollRail.appendChild(scrollItems[0]);
            this.pos += this.scrollItemWidth;
    
        } else {
            this.pos += -this.speed;
        }

    }

    toRight(scrollItems) {
    
        if(scrollItems[0].getBoundingClientRect().left > 0) {
            
            this.scrollRail.insertBefore(scrollItems[this.totalItem - 1], scrollItems[0]);
            this.pos -= this.scrollItemWidth;
    
        } else {
            this.pos += this.speed;
        }

    }

    move(pos) {
        this.scrollRail.style.transform = `translate3D(${pos}px, 0, 0)`;
    }

    destroy() {

    }
}
