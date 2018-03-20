// importar objetos desde express
import { Router, Request, Response } from "express";
import  Persona  from "../models/Persona";
import { stat } from "fs";

class ControladorPersonas {
    private router: Router;
    constructor() {
        this.router = Router(); // se le dan todas las funcionalidades de Router de express a esta variable privada llamada router
    }

    /**
     * 
     * @param req Captura los datos enviados desde el Front-End
     * @param res Respuesta que envia de acuerdo a los datos que recibe
     */
    public ObtenerPersonas(req: Request, res: Response):void{
        //no se estan enviando condiciones
        Persona.find({})

        //manejar la respuesta con promesas, data contiene todos los datos
        .then(personas => {
            res.json(personas);
        })
        .catch(err => {
            const statusCode = req.statusCode;
            res.json({
                statusCode,
                err
            })
        })
    }

    private ObtenerPersona(req: Request, res: Response): void {
        let cedula = req.params.cedula

        Persona.find({ Cedula: cedula })

        .then(persona => {
            res.json(persona)
        })
        .catch(err => {
            const statusCode = req.statusCode;

            res.json({
                statusCode,
                err
            })
        })
    }

    private GuardarPersona (req: Request, res: Response){
        let nombre: string = req.body.nombre
        let cedula: number = req.body.cedula
        let apellido1: string = req.body.apellido1
        let apellido2: string = req.body.apellido2
        let edad: number = req.body.edad
        let fechaNacimiento: Date = req.body.fechaNacimiento
        let genero: boolean = req.body.genero
        let hijos: Array<any> = req.body.hijos

        const persona = new Persona({
            nombre,
            apellido1,
            apellido2,
            cedula,
            edad,
            fechaNacimiento,
            genero,
            hijos
        })
        persona.save()
        .then(personaGuardada => {
            res.json({
                message: 'Persona guardada con exito'
            })
        })
        .catch(err => {
            let statusCode = req.statusCode

            res.json({
                ErrorCode: statusCode,
                Error: err
            })
        })
    }

    private EliminarPersona(req: Request, res: Response){
        let cedula = req.params.cedula
        Persona.findOneAndRemove({
            Cedula: cedula
        })
        .then(personaEliminada => {
            res.json({
                message: 'La persona a sido eliminada correctamente.',
                personDeleted: personaEliminada
            })
        })
        .catch(err => {
            let statusCode = req.statusCode
            res.json({
                ErrorCode: statusCode,
                Error: err
            })
        })
    }

    public Rutas(): void{
        this.router.get('/', this.ObtenerPersonas)
        this.router.get('/:cedula',this.ObtenerPersona)
        this.router.post('/',this.GuardarPersona)
        this.router.delete('/:cedula',this.EliminarPersona)
    }
}

let ControladorPersona = new ControladorPersonas()
ControladorPersona.Rutas()

export default ControladorPersona