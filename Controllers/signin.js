const signInHandler =(req,res,db,bcrypt)=> {
	 db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash); //this returns true or false.
      if (isValid) {
        return db.select('*').from('users') //we use 'return' here else code doesnt work..why?
        //  don't really know yet.
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))

}

module.exports = {
	signInHandler:signInHandler
}