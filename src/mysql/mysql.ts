

import  mysql = require('mysql');

export default class MySQL {

    private static _instance: MySQL;

    con: mysql.Connection;
    conectado: boolean = false;


    constructor(){
        console.log('Clase inicializada');

        this.con = mysql.createConnection({
            host     : 'localhost',
            user     : 'node_user',
            password : '123456',
            database : 'node_db'
          });

          this.conectarDB();
    }

    public static get instance(){
        return this._instance || ( this._instance = new this() );

    }

    static ejecutarQuery( query: string, callback: Function){

        this.instance.con.query(query, (err, results: object[], fields) =>{
            if (err){
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }

            if( results.length === 0){
                callback('El registro solicitado no existe');
            }else{
                callback( null, results );
            }
        });

    }


    private conectarDB(){
        this.con.connect((err: mysql.MysqlError ) => {
            if(err){
                console.log(err.message);
                return;
            }

            this.conectado = true;
            console.log('BD Online');
        });
    }


}