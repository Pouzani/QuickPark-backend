class User {
    constructor(firstName,lastName,email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    get data(){
        return {firstName: this.firstName, lastName: this.lastName, email: this.email};
    }
}
module.exports = {User};