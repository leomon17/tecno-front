<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div  class="p-2 mr-4 text-end">
                    <span>
                        <button type="button" class="btn btn-primary" @click="formulario()">Guardar</button>
                    </span>
                </div>
                <div id="reporte-titulo" class="text-center">
                    
                   
                        
                    <h1>Reporte de estatus de vehiculos</h1>
                    
                </div>
            </div>
        </div>

        <div class="row">
            <h3>Listado de unidades</h3>
            <div class="col-12">
                <div class="container">
                    <table id="example" class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">IDGPS</th>
                            <th scope="col">MARCA</th>
                            <th scope="col">MODELO</th>
                            <th scope="col">PLACAS</th>
                            <th scope="col">SERIE</th>
                            <th scope="col">AÑO</th>
                            <th scope="col">COLOR</th>
                            <th scope="col">LINEA</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="item in items" >
                                <td> {{ item.IDGPS }}</td>
                                <td> {{ item.MARCA }}</td>
                                <td> {{ item.MODELO }}</td>
                                <td> {{ item.PLACAS }}</td>
                                <td> {{ item.SERIE }}</td>
                                <td> {{ item.ANO }}</td>
                                <td> {{ item.COLOR }}</td>
                                <td> {{ item.LINEA }}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>        
    </div>

    <div>
        <template v-if="modalShow">
        <b-modal
            id="modal-fullCodeEvent"
            ref="modal-fullCodeEvent"
            v-model="modalShow"
            no-close-on-esc
            :hide-footer="true"
            size="gl"
            title="Formulario"
        >
            <form @submit.prevent="submitForm">

                <div class="row">
                    <div class="col-6">
                        <label for="idgps">IDGPS:</label>
                        <input v-model="unit.idgps" type="number" id="idgps" required />
                    </div>
                    <div class="col-6">
                        <label for="brand">Marca:</label>
                        <input v-model="unit.brand" type="text" id="brand" required />
                    </div>
                </div>
             
                <div class="row">
                        <div class="col-6">
                        <label for="model">Modelo:</label>
                <input v-model="unit.model" type="text" id="model" required />

               
                    </div>
                    <div class="col-6">
                        <label for="plate">Placas:</label>
                        <input v-model="unit.plate" type="text" id="plate" required />
                    </div>
                </div>

                <div class="row">
                    <div class="col-6">
                        <label for="serie">Serie:</label>
                    <input v-model="unit.serie" type="text" id="serie" required />
                    </div>

                    <div class="col-6">
                        <label for="year">Año:</label>
                        <input v-model="unit.year" type="text" id="year" required />
                    </div>
                </div>

                <div class="row">
                    <div class="col-6">
                        <label for="color">Color:</label>
                        <input v-model="unit.color" type="text" id="color" required />
                    </div>
                    <div class="col-6">
                        <label for="line">Linea:</label>
                        <input v-model="unit.line" type="text" id="line" required />
                    </div>
                </div>


                <div class="row">
                    <div class="col-6">
                        <label for="unit_name">Nombre de Unidad:</label>
                        <input v-model="unit.unit_name" type="text" id="unit_name" required/>
                    </div>
                    <div class="col-6">
                        <label for="group_name">Nombre de Grupo:</label>
                        <input v-model="unit.group_name" type="text" id="group_name" required/>
                    </div>
                </div>

                <button
                    style="float: right; margin: 8px 4px"
                    class="btn btn-outline-success"
                    type="submit"
                    >
                    Guardar Datos
                </button>
            </form>

        </b-modal>
        </template>
        </div>

  </template>
  
  <script>
        import Swal from 'sweetalert2';
        import axios from "axios";
        import { UnitController } from "../modules/units/adapters/unit.controller";

    export default {
        name:"reporte",
        data() {
            return {
                items: [],
                modalShow:false,
                unit: {
                    idgps: 0,
                    brand: "",
                    model: "",
                    plate: "",
                    serie: "",
                    year: "",
                    color: "",
                    line: "",
                    unit_name: "",
                    group_name: "",
                }
                
            }
        },
        mounted() {
            //Carga general de las unidades
            this.listaunidades();
        },
        methods: {
            
            async listaunidades() {
                try {
                    const url = "https://www.tcvsat.com.mx/tcvback/v3/api/units";
                    const headers = { //key
                    "Tcv-Client-Id":
                        "N2U5YzQyNzgzMTA4ODFhN2U4YTZjZmNkMzU1Yjg3ZjljNWUxYzNlMDRjYjNlODc0MjRiM2Q2YzRkYjkxMTEzNGEyYjcxMjU2YmFjYjAxMzM5YjM1OWU0NzBjYTgwMjMzODI1M2IxOTY5NjI5M2RlNmQyMTBlZDU1ZDU3N2U3M2IK",
                    };
                    
                    const response = await axios.get(url, { headers });
                    this.items = response.data;

                } catch (error) {
                    Swal.fire({
                            title: '¡Atención!',
                            text: 'Error en carga de información',
                            icon: 'warning',
                            confirmButtonText: 'OK',
                    });
                }
            },

            formulario(){
                this.modalShow = true;
            },
            async submitForm() {
                const controller = new UnitController();
                //Envio de Petición
                const resp = await controller.addUnit(this.unit);
                console.log(resp);
                if (resp.result) {
                    this.showModal = false;
                    Swal.fire({
                        title: '¡Registro Éxitoso!',
                        text: 'Se ha Guardado en la Base de datos, una unidad',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                }else{
                    Swal.fire({
                        title: '¡Atención!',
                        text: 'Error al guardar la informacion',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                    });
                }
    },
        }
    }
  </script>
  
  <style>
    .unidad-input{
        width: 50%;
    }

    .item-auto{
        border: 1px solid rgb(182, 213, 241);
        border-radius: 10px;
    }

    #map-api{
        border: 1px solid rgb(182, 213, 241);
        border-radius: 10px;
        width: 100%;
        height: 100%;
    }
    
  </style>