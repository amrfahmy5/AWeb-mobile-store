const Mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
var User = Mongoose.Schema ({
    user_name : {
        type: String ,
        require:true

    },
    PassWord : {
        type: String ,
        require:true

    },
    email : {
        type: String ,
        require:true
    },
    agree:{
        type:Boolean,
        require:true

    }
})

User.methods.hashPassword= (PassWord)=> {
    return bcrypt.hashSync(PassWord,bcrypt.genSaltSync(5),null)
}

User.methods.ComparePw=(pw)=>{
    return bcrypt.compareSync(this.PassWord,pw);
}

module.exports=Mongoose.model('User',User)