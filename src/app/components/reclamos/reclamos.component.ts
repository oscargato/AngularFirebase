import { Component, OnInit } from '@angular/core';
import { ServicioReclamosService } from '../../services/servicio-reclamos.service';
import { Reclamo } from '../../models/reclamo';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.css']
})

export class ReclamosComponent implements OnInit {

  recLista:Reclamo[];

  constructor(private servicio:ServicioReclamosService, private toastr:ToastrService){ }

  ngOnInit() {
  	this.obtenerInformacion();
  }

  obtenerInformacion(){
    let contenido = this.servicio.getReclamos();
    contenido.snapshotChanges().subscribe(data => {
      this.recLista = [];
      data.forEach(elemento => {
        let registro = elemento.payload.toJSON();
        registro['$key'] = elemento.key;
        this.recLista.push(registro as Reclamo);
      });
      console.log(this.recLista);
    });
  }

  editar(item:Reclamo){
    this.servicio.selectedReclamo = Object.assign({},item);
  }

  eliminar(item){
    if(confirm('Esta seguro de Eliminar??')){
        this.servicio.deleteReclamo(item.$key);
        this.toastr.success('Eliminado!','Exitosamente!');
    }
  }

  onSubmit(reclamo:NgForm){
    if(this.servicio.selectedReclamo.$key == null){
        this.servicio.addReclamo(reclamo.value);
        this.toastr.success('Agregado!','Exitosamente!');
    }
    else{
        this.servicio.editReclamo(reclamo.value);
        this.toastr.success('Editado!','Exitosamente!');
    }
  }

  resetForm(reclamo:NgForm){
  	if(reclamo != null){
      reclamo.reset();
      this.servicio.selectedReclamo = {
        $key: null,
        titulo:'',
        texto:'',
        categoria:'',
        locacion:''
      }
    }
  }

}
