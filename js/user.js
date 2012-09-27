function User () {
    // -- Begin of class attributes --
    this.id;
    this.firstname;
    this.lastname;
    this.birthday;
    this.address;
    this.zip;
    this.phone;
    this.show;
    
    this.collection = [{
        id: 1, 
        firstname: 'Loic', 
        lastname: 'FARGE', 
        birthday: '1987/07/15', 
        address: '316, Hoa Hung P13', 
        zip: 'District 10', 
        phone: '0935153082',
        show: true
    },
    {
        id: 2, 
        firstname: 'Theo', 
        lastname: 'SCHAEFFER', 
        birthday: '1991/04/09', 
        address: '316, Hoa Hung P13', 
        zip: 'District 10', 
        phone: '0918352694',
        show: true
    },
    {
        id: 3, 
        firstname: 'Hector', 
        lastname: 'JUSFORGUES', 
        birthday: '1992/09/07', 
        address: '316, Hoa Hung P14', 
        zip: 'District 10', 
        phone: '0918536497',
        show: true
    }];
    // -- End of class attribute
    
    /**
     * Init function which can initialize current object --
     */
    this.init = function (id) {
        if (id != 'null') {
            for (i=0; i< this.collection.length; i++) {
                if (this.collection[i].id == id) {
                    this.id = id;
                    this.firstname = this.collection[i].firstname;
                    this.lastname = this.collection[i].lastname;
                    this.birthday = this.collection[i].birthday;
                    this.address = this.collection[i].address;
                    this.zip = this.collection[i].zip;
                    this.phone = this.collection[i].phone;
                }
            }
        }
        
    }
    
    // -- Begin of getters and setters --
    this.getId = function () {
        return this.id;
    }
    
    this.setId = function (id) {
        this.id = id;
    }
    
    this.getFirstname = function () {
        return this.firstname;
    }
    
    this.setFirstname = function (firstname) {
        this.firstname = firstname;
    }
    
    this.getLastname = function () {
        return this.lastname;
    }
    
    this.setLastname = function (lastname) {
        this.lastname = lastname;
    }
    
    this.getBirthday = function () {
        return this.birthday;
    }
    
    this.setBirthday = function (birthday) {
        this.birthday = birthday;
    }
    
    this.getAddress = function () {
        return this.address;
    }
    
    this.setAddress = function (address) {
        this.address = address;
    }
    
    this.getZip = function () {
        return this.zip;
    }
    
    this.setZip = function (zip) {
        this.zip = zip;
    }
    
    this.getPhone = function () {
        return this.phone;
    }
    
    this.setPhone = function (phone) {
        this.phone = phone;
    }
    
    this.getShow = function () {
        return this.show;
    }
    
    this.setShow = function (show) {
        this.show = show;
    }
    // -- End of getters and setters --
    
    /**
     * Update function
     */
    this.update = function () {
        for (i=0; i< this.collection.length; i++) {
            if (this.collection[i].id == this.id) {
                this.collection[i].id = this.id;
                this.collection[i].firstname = this.firstname;
                this.collection[i].lastname = this.lastname;
                this.collection[i].birthday = this.birthday;
                this.collection[i].address = this.address;
                this.collection[i].zip = this.zip;
                this.collection[i].phone = this.phone;
            }
        }
    }
    
    /**
     * Insert function
     */
    this.insert = function () {
        this.id = this.generateId();
        this.collection.push({
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            birthday: this.birthday,
            address: this.address,
            zip: this.zip,
            phone: this.phone
        });
    }
    
    /**
     * Generate an incremental id.
     */
    this.generateId = function () {
        var id = 0;
        for (i=0; i< this.collection.length; i++) {
            if (this.collection[i].id > id) {
                id = this.collection[i].id;
            }
        }
        id++;
        return id;
    }
    
    /**
     * Return current collection
     */
    this.getCollection = function () {
        return this.collection;
    }
    
    /**
     * Remove user from collection
     */
    this.remove = function (id) {
        for (i=0; i < this.collection.length; i++) {
            if (this.collection[i].id == id) {
                this.collection.splice(i,1);
            }
        }
        
    }
    
    this.removeSeveral = function (list) {
        var newUser = [];
        
        for (i=0; i< this.collection.length; i++) {
            if (list.indexOf(this.collection[i].id) < 0) {
                newUser.push(this.collection[i]);
            }
        }
        
        this.collection = newUser;
    }
}