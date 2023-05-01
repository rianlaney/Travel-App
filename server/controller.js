require('dotenv').config()    
const { CONNECTION_STRING } = process.env
const Sequelize = require('sequelize')
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {

    //get
    getHomePage: (req,res)=>{
        res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
    },
    getStates: (req,res)=>{
        sequelize.query(`
        SELECT * FROM states;
        `)
        .then((dbRes)=> res.status(200).send(dbRes[0]))
        .catch((err)=> console.log(err))
    
    },

    getActivities: (req,res)=>{
        let { id } = req.params
        sequelize.query(`
        SELECT activities FROM states
        WHERE state_id = ${id};
        `)
    },


    // put
    updateVisited: (req,res)=>{ 
        let { id } = req.params     
        sequelize.query(`
        UPDATE states
        SET visited = true
        WHERE state_id = ${id};
        `)
        .then((dbRes)=> res.status(200).send(dbRes[0]))
        .catch((err)=> console.log(err))
    },

    updateActivity: (req,res)=>{ 
        let { input, id } = req.params     
        sequelize.query(`
        UPDATE states
        SET activities = ${input}
        WHERE state_id = ${id};
        `)
        .then((dbRes)=> res.status(200).send(dbRes[0]))
        .catch((err)=> console.log(err))
    },


    //post
    createActivity: (req,res)=>{ 
        let { activities } = req.params     
        sequelize.query(`
        INSERT INTO states (activities)
        values (${activities});
        `)
        .then((dbRes)=> res.status(200).send(dbRes[0]))
        .catch((err)=> console.log(err))
    },

    //delete
    deleteActivity: (req,res)=>{
        let { id } = req.params     
        sequelize.query(`
        DELETE FROM states
        WHERE activities = ${id};
        `)
        .then((dbRes)=> res.status(200).send(dbRes[0]))
        .catch((err)=> console.log(err))
    },




    seed: (req, res) => {
        sequelize.query(`
            DROP TABLE IF exists states;

            CREATE TABLE states (
                state_id serial primary key, 
                name varchar(100),
                visited boolean,
                activities varchar (250)
            );

            

            INSERT INTO states (name, visited)
            values ('Alabama', false),
            ('Alaska', false),
            ('Arizona', false),
            ('Arkansas', false),
            ('California', false),
            ('Colorado', false),
            ('Connecticut', false),
            ('Delaware', false),
            ('Florida', false),
            ('Georgia', false),
            ('Hawaii', false),
            ('Idaho', false),
            ('Illinois', false)
            ('Indiana', false)
            ('Iowa', false),
            ('Kansas', false),
            ('Kentucky', false),
            ('Louisiana', false),
            ('Maine', false),
            ('Maryland', false),
            ('Massachusetts', false),
            ('Michigan', false),
            ('Minnesota', false),
            ('Mississippi', false),
            ('Missouri', false),
            ('Montana', false),
            ('Nebraska', false),
            ('Nevada', false),
            ('New Hampshire', false),
            ('New Jersey', false),
            ('New Mexico', false),
            ('New York', false),
            ('North Carolina', false),
            ('North Dakota', false),
            ('Ohio', false),
            ('Oklahoma', false),
            ('Oregon', false),
            ('Pennsylvania', false),
            ('Rhode Island', false),
            ('South Carolina', false),
            ('South Dakota', false),
            ('Tennessee', false),
            ('Texas', false),
            ('Utah', false),
            ('Vermont', false),
            ('Virginia', false),
            ('Washington', false),
            ('West Virginia', false),
            ('Wisconsin', false),
            ('Wyoming', false);

        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}