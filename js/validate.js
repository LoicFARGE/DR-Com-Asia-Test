function Form (name) {
    this.elements = document.getElementById(name).elements;
    
    this.validate = function () {
        var errors = [];
        for (i=0; i < this.elements.length; i++) {
            var conditions = this.elements[i].className.split(' ');
            for (j=0; j < conditions.length; j++) {
                if (conditions[j] == 'required') {
                    if (!this.required(this.elements[i].value)) {
                        errors.push('Field '+this.getLabel(this.elements[i])+' is required.');
                    }
                }
                if (conditions[j].indexOf('greaterthan-') >= 0) {
                    var nbChar = conditions[j].replace('greaterthan-','');
                    if (!this.greaterthan(this.elements[i].value, nbChar)) {
                        errors.push('Field '+this.getLabel(this.elements[i])+' must have at least '+nbChar+' characters.');
                    }
                }
                if (conditions[j] == 'birthdate') {
                    if (!this.checkDateSimple(this.elements[i].value)) {
                        errors.push('Field '+this.getLabel(this.elements[i])+' must be in format YYYY/MM/DD.');
                    }
                    else {
                        if (!this.checkDateGreater(this.elements[i].value)) {
                            errors.push('Field '+this.getLabel(this.elements[i])+' must be lower than 2010.');
                        }
                    }
                }
                if (conditions[j] == 'phone') {
                    if (!this.checkPhone(this.elements[i].value)) {
                        errors.push('Field '+this.getLabel(this.elements[i])+' must contain only digits and dot.');
                    }
                }
            }
        }
        return errors;
    }
    
    this.required = function (string) {
        if (string != '' && string.length > 0) {
            return true;
        }
        return false;
    };
    
    this.greaterthan = function (string, nbChar) {
        if (string.length >= nbChar) {
            return true;
        }
        return false;
    };
    
    this.checkDateSimple = function (string) {
        var pattern = new RegExp("(19|20)[0-9]{2}/(0|1)[0-9]/[0-3][0-9]");
        if(string.match(pattern))
        {
            var date_array = string.split('/');
            var day = date_array[2];

            var month = date_array[1] - 1;
            var year = date_array[0];

            source_date = new Date(year,month,day);

            if(year != source_date.getFullYear())
            {
                return false;
            }

            if(month != source_date.getMonth())
            {
                return false;
            }

            if(day != source_date.getDate())
            {
                return false;
            }
        }
        else
        {
            return false;
        }

        return true;
    }
    
    this.checkDateGreater = function (string) {
        var date_array = string.split('/');
        var year = date_array[0];
        
        if (year >= 2010) {
            return false;
        }
        return true;
    }
    
    this.checkPhone = function (string) {
        var pattern = new RegExp("^[0-9\.]*$");
        if(string.match(pattern))
        {
            return true;
        }
        return false;
    }
    
    this.getLabel = function (inputElem){
        if(inputElem.parentNode){
            if(inputElem.parentNode.tagName=='label'){
                return inputElem.parentNode;
            }
        }
        var labels=document.getElementsByTagName("label"),i;
        for( i=0; i<labels.length;i++ ){
            if(labels[i].htmlFor==inputElem.id){
                return labels[i].innerHTML.replace('<em>*</em>','');
            }
        }
        return false;
    }
}