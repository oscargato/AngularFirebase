import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Reclamo } from '../models/reclamo';

@Injectable({
  providedIn: 'root'
})

export class ServicioReclamosService {

  reclamosLista: AngularFireList<any>;
  selectedReclamo: Reclamo = new Reclamo();

  constructor(private dataBase:AngularFireDatabase){ }

  //Retorna Todos los reclamos
  getReclamos(){
  	return this.reclamosLista = this.dataBase.list('reclamos');
  }

  //Agrear un Reclamo
  addReclamo(reclamo:Reclamo){
    console.log(reclamo);
  	this.reclamosLista.push({
  		titulo:reclamo.titulo,
  		texto:reclamo.texto,
  		categoria:'A',
  		locacion:reclamo.locacion,
  	});
  }


  //Edita un Reclamo
  editReclamo(reclamo:Reclamo){
  	this.reclamosLista.update(reclamo.$key,{
   		titulo:reclamo.titulo,
  		texto:reclamo.texto,
  		locacion:reclamo.locacion, 		
  	});
  }


  //Elimina un Reclamo
  deleteReclamo(identificador:any){
  	this.reclamosLista.remove(identificador);
  }
}