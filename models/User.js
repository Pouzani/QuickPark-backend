class User {
    constructor(firstName,lastName,email,favoriteParkings){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.favoriteParkings = favoriteParkings;
    }

    get data(){
        return {firstName: this.firstName, lastName: this.lastName, email: this.email, favoriteParkings: this.favoriteParkings};
    }
}
module.exports = {User};