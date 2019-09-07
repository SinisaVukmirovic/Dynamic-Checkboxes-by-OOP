// OBJECT ORIENTED APPROACH
const DynamicCheckBoxes = {
    // global properties which will be refered to by other methods/functions
    checkboxes: document.querySelectorAll('.table td input[type="checkbox"]'),
    selectAllTarget: document.querySelector('.js-select-all'),
    clearBtn: document.querySelector('.js-clear'),

    // initialize method to initialize any other functions, 
    // a global place for calling oher methods/functions 
    initialize() {
        this.shiftToSelect();
        this.selectAll();
        this.clearChecked();
        this.showRemoveCheckedBtn();
    },

    shiftToSelect() {
        // getting the instance of all of the checkboxes on the page
        const checkboxes = this.checkboxes;
        let lastChecked;

        function handleCheck(event) {
            let inBetween = false;
            // check if shift key is down and check if checkbox is checked
            if (event.shiftKey && this.checked) {
                checkboxes.forEach(checkbox => {
                    if (checkbox === this || checkbox === lastChecked) {
                        inBetween = !inBetween;
                    }

                    if (inBetween) {
                        checkbox.checked = true;
                    }
                });
            }

            lastChecked = this;
        }

        checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
    },

    selectAll() {
        function handleSelectAll(event) {
            this.checkboxes.forEach(checkbox => {
                checkbox.checked ? checkbox.checked = false : checkbox.checked = true;
            });
        }

        this.selectAllTarget.addEventListener('click', handleSelectAll.bind(this));
    },

    showRemoveCheckedBtn() {
        this.clearBtnDisplay('hidden');
        document.addEventListener('change', this.showBtn.bind(this));
    },

    showBtn() {
        const checkboxesChecked = document.querySelectorAll('.table td input[type="checkbox"]:checked').length;

        if (checkboxesChecked > 0) {
            this.clearBtn.querySelector('span').textContent = checkboxesChecked;
            this.clearBtnDisplay('visible');
        }
        else {
            this.clearBtn.querySelector('span').textContent = '';
            this.clearBtnDisplay('hidden');
        }
    },

    clearBtnDisplay(state) {
        this.clearBtn.style.visibility = state;
    },

    clearChecked() {
        this.clearBtn.addEventListener('click', removeChecked.bind(this), false);

        function removeChecked() {
            this.checkboxes.forEach(checkbox => checkbox.checked = false);
            this.selectAllTarget.checked = false;
            this.clearBtnDisplay('hidden');
        }
    }
}

DynamicCheckBoxes.initialize();