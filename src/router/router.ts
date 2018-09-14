import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();


router.get('/personas', (req: Request, res: Response) => {

    const query = `
     SELECT * 
     FROM persona
    `;

    MySQL.ejecutarQuery(query, ( err: any, personas: object[] ) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            });
        }else{
            res.json({
                ok: true,
                personas
            });
        }
    });
});

router.get('/personas/:id', (req: Request, res: Response) => {

    const id = req.params.id;
    const EscapedID = MySQL.instance.con.escape( id );
    const query = `
    SELECT * 
    FROM persona
    WHERE ID = ${EscapedID} `;

    MySQL.ejecutarQuery( query, (err: any, persona: object[] ) =>{
        if(err){
            res.status(400).json({
                ok:false,
                err
            });
        }else{
            res.json({
                ok:true,
                persona: persona[0]
            });
        }
    });
    
});

export default router;