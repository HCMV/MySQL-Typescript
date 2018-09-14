"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/personas', (req, res) => {
    const query = `
     SELECT * 
     FROM persona
    `;
    mysql_1.default.ejecutarQuery(query, (err, personas) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        else {
            res.json({
                ok: true,
                personas
            });
        }
    });
});
router.get('/personas/:id', (req, res) => {
    const id = req.params.id;
    const EscapedID = mysql_1.default.instance.con.escape(id);
    const query = `
    SELECT * 
    FROM persona
    WHERE ID = ${EscapedID} `;
    mysql_1.default.ejecutarQuery(query, (err, persona) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        else {
            res.json({
                ok: true,
                persona: persona[0]
            });
        }
    });
});
exports.default = router;
