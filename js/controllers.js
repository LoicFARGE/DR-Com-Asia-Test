function RouteCtrl($scope) {
    // -- Controller variable --
    var selected = $scope.selected = [];
    var currentUser = null;
    
    var user = new User();
    
    var updateSelected = function(action, id) {
        if (action == 'add' & $scope.selected.indexOf(id) == -1)
            $scope.selected.push(id);
        if (action == 'remove' && $scope.selected.indexOf(id) != -1)
            $scope.selected.splice($scope.selected.indexOf(id), 1);
    }
    
    var modalForm = new Form('userForm');
    // -- End of controller variables --
    
    /**
     * Initialisation of users' scope
     */
    $scope.users = user.getCollection();
    
    // -- All functions which manage selected users --
    $scope.updateSelection = function($event, id) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id);
    };

    $scope.selectAll = function($event) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        for ( var i = 0; i < $scope.users.length; i++) {
            var user = $scope.users[i];
            updateSelected(action, user.id);
        }
    };

    $scope.getSelectedClass = function(user) {
        return $scope.isSelected(user.id) ? 'selected' : '';
    };

    $scope.isSelected = function(id) {
        return $scope.selected.indexOf(id) >= 0;
    };

    $scope.isSelectedAll = function() {
        return $scope.selected.length === $scope.users.length;
    };
    // -- End of all functions which manage selected users --
    
    /**
     * Remove selected Users
     */
    $scope.removeSelected = function () {
        user.removeSeveral(selected)
        
        $scope.users = user.getCollection();
        
        selected = $scope.selected = [];
    }
    
    /**
     * Open Model with form prefilled with user being edited
     */
    $scope.edit = function (user) {
        $scope.title = 'Edit User '+user.firstname+' '+user.lastname;
        currentUser = user.id;
        $scope.modalIsVisible = true;
        document.getElementById('firstname').value = user.firstname;
        document.getElementById('lastname').value = user.lastname;
        document.getElementById('birthday').value = user.birthday;
        document.getElementById('address').value = user.address;
        document.getElementById('zip').value = user.zip;
        document.getElementById('phone').value = user.phone;
    }
    
    /**
     * Remove user with id given in parameter
     */
    $scope.remove = function (id) {
        updateSelected('remove', id);
        user.remove(id);
        $scope.users = user.getCollection();
    }
    
    /**
     * Open Model to create new user
     */
    $scope.add = function () {
        $scope.title = 'Add a new user';
        $scope.modalIsVisible = true;
        currentUser = null;
        document.getElementById('filter-button').disabled = true;
    }
    
    /**
     * Close Modal of user Creation and Edition
     */
    $scope.closeModal = function() {
        $scope.modalIsVisible = false;
        currentUser = null;
        document.getElementById('userForm').reset();
        document.getElementById('filter-button').disabled = false;
    };
    
    /**
     * Close Filter Model
     */
    $scope.closeFilter = function () {
        $scope.filterIsVisible = false;
        document.getElementById('remove-all-button').disabled = false;
        document.getElementById('add-button').disabled = false;
    }
    
    /**
     * Reset filter function
     */
    $scope.resetFilter = function () {
        document.filterForm.reset(); // form reset
        var collection = user.getCollection ();
        for (i=0; i < collection.length; i++) {
            collection[i].show = true;
        }
        $scope.users = user.getCollection();
    }
    
    /**
     * Open Filter Modal
     */
    $scope.openFilter = function () {
        document.getElementById('remove-all-button').disabled = true;
        document.getElementById('add-button').disabled = true;
        document.getElementById("select-all-checkbox").checked = false;
        $scope.filterIsVisible = true;
    }
    
    /**
     * Validate and save user: Insert or Update
     */
    $scope.saveUser = function () {
        $scope.errorIsVisible = false;
        var errors = modalForm.validate();
        if (errors.length > 0) {
            errorString = '<ul>';
            for (i=0; i < errors.length; i++) {
                errorString += '<li>'+errors[i]+'</li>';
            }
            errorString += '</ul>';
            $scope.errors = errorString;
            $scope.errorIsVisible = true;
        }
        else {
            $scope.errorIsVisible = false;
            
            user.init(currentUser);
            user.setFirstname(document.getElementById('firstname').value);
            user.setLastname(document.getElementById('lastname').value);
            user.setBirthday(document.getElementById('birthday').value);
            user.setAddress(document.getElementById('address').value);
            user.setZip(document.getElementById('zip').value);
            user.setPhone(document.getElementById('phone').value);
            if (currentUser) {
                user.setId(currentUser);
                user.update();
            }
            else {
                user.insert();
            }
            
            $scope.users = user.getCollection();
        
            $scope.modalIsVisible = false;
            currentUser = null;
            document.getElementById('userForm').reset();
        }
        document.getElementById('filter-button').disabled = false;
    }
    
    /**
     * Filter the list of user
     * @TODO: move code to user class
     */
    $scope.filter = function () {        
        var filterfirstname = document.getElementById('filterfirstname').value.trim().toLowerCase();
        var filterlastname = document.getElementById('filterlastname').value.trim().toLowerCase();
        var birthdaytype = document.getElementById('birthday-type').value.trim();
        var filterbirthday = document.getElementById('filterbirthday').value.trim();
        var filteraddress = document.getElementById('filteraddress').value.trim().toLowerCase();
        var filterzip = document.getElementById('filterzip').value.trim().toLowerCase();
        var filterphone = document.getElementById('filterphone').value.trim().toLowerCase();
        
        for (i=0; i < $scope.users.length; i++) {
            var validate = true;
            if ($scope.users[i].firstname.toLowerCase().indexOf(filterfirstname) < 0) {
                validate = false;
            }
            else if ($scope.users[i].lastname.toLowerCase().indexOf(filterlastname) < 0) {
                validate = false;
            }
            else if ($scope.users[i].address.toLowerCase().indexOf(filteraddress) < 0) {
                validate = false;
            }
            else if ($scope.users[i].zip.toLowerCase().indexOf(filterzip) < 0) {
                validate = false;
            }
            else if ($scope.users[i].phone.toLowerCase().indexOf(filterphone) < 0) {
                validate = false;
            }
            else if (filterbirthday != ''){
                var filterForm = new Form('filterForm');
                if (!filterForm.checkDateSimple(filterbirthday)) {
                    $scope.filtersError = 'Date must be in format YYYY/MM/DD.';
                }
                else {
                    $scope.filtersError = '';
                    dateToCompare = filterbirthday.replace(/\//g,'');
                    userDate = $scope.users[i].birthday.replace(/\//g,'');
                    if (birthdaytype == 'equal' && dateToCompare != userDate) {
                        validate = false;
                    }
                    else if (birthdaytype == 'greater' && dateToCompare > userDate) {
                        validate = false;
                    }
                    else if (birthdaytype == 'lower' && dateToCompare < userDate) {
                        validate = false;
                    }
                }
            }
            
            if (validate) {
                $scope.users[i].show = true;
            }
            else {
                $scope.users[i].show = false;
            }
        }
    }
}