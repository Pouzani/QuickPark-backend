const { db } = require("../helpers/admin");



exports.users = async (req, res) => {
    const usersRef = db.collection('users');
    await usersRef.doc('SF').set({
        name: 'Soumya Kaddouri', age: 21
    });
   
   
    const snapshot = await usersRef.get();
    snapshot.forEach(doc =>{
        console.log(doc.id, '=>', doc.data());
    })
};