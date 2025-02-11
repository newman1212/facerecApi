

const registerHandler =(req,res,db,bcrypt) => {
    const { email, name, password, entries} = req.body;
    const hash = bcrypt.hashSync(password);
    console.log(hash)

    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
              email: loginEmail[0].email,
              name: name,
              joined: new Date(),
              entries: entries

            })
            .then(user => {
              res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {res.status(400).json('unable to register...');
      console.log(err)
    })
};



module.exports = {
	registerHandler:registerHandler
};