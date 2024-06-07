<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div  class="p-2 mr-4 text-end">
                    <div class="row">
                        <div  class="p-2 mr-4 text-end">
                    <span>
                        <button type="button" class="btn btn-success" @click="formulario()">Guardar unidad</button>
                    </span>
                </div>
                    </div>
                    <div class="row">
                        <div class="row" name='form'>
                            <div class="col-4 form-group">
                                <h4>Fecha inicio por año: </h4>
                                <select :placeholder="2024" v-model="unitdto.startdate">
                                    <option disabled value="">Selecciona un año</option>
                                    <option v-for="anion in anions" :value="anion.value">
                                        {{ anion.text }}
                                    </option>
                                </select>  
                            </div>
                            <div class="col-3 form-group">
                                <h4>Fecha fin por año: </h4>
                                <select :placeholder="2024" v-model="unitdto.enddate">
                                    <option disabled value="">Selecciona un año</option>
                                    <option v-for="anion in anions" :value="anion.value">
                                        {{ anion.text }}
                                    </option>
                                </select>  
                            </div>
                            <div class="col-3" name='form'>
                                <h4>IDGPS: </h4>
                                <div class="form-group">
                                    <input type="text" v-model="unitdto.idgps">
                                    
                                </div>                              
                            </div>
                            <div class="col-2 text-center mt-3" name='form'>
                                <span>
                                        <button type="button" class="ml-3 btn btn-primary" @click="buscar()">Buscar</button>
                                </span>
                            </div>
                        </div>
                       
                       
                    </div>
                    
                   
                </div>
                <div id="reporte-titulo" class="text-center">
                    <h1>Reporte de estatus de vehiculos en local</h1>                    
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="container">
                    <h3>Listado de unidades</h3>

                    <table id="example" class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">IDGPS</th>
                            <th scope="col">MODELO</th>
                            <th scope="col">SERIE</th>
                            <th scope="col">AÑO</th>
                            <th scope="col">COLOR</th>
                            <th scope="col">LINEA</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="item in items" >
                                <td> {{ item.idgps }}</td>
                                <td> {{ item.model }}</td>
                                <td> {{ item.serie }}</td>
                                <td> {{ item.year }}</td>
                                <td> {{ item.color }}</td>
                                <td> {{ item.line }}</td>
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
                        <label for="serie">Serie:</label>
                    <input v-model="unit.serie" type="text" id="serie" required />
                    </div>
                    
                </div>
             
                <div class="row">
                    <div class="col-6">
                        <label for="model">Modelo:</label>
                        <input v-model="unit.model" type="text" id="model" required />
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

                <div class="row m-1 pt-3">
                    <button
                        style="float: right;"
                        class="btn btn-success"
                        type="submit"
                        >
                        Guardar Datos
                    </button>
                </div>
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
        name:"reportelocal",
        data() {
            return {
                anions: [
                    { text: '2024', value: '2024' },
                    { text: '2023', value: '2023' },
                    { text: '2022', value: '2022' },
                    { text: '2021', value: '2021' },
                    { text: '2020', value: '2020' },
                    { text: '2019', value: '2019' },
                    { text: '2018', value: '2018' },
                    { text: '2017', value: '2017' },
                ],
                items: [],
                unitdto: {
                    idgps:0,
                    startdate: 0,
                    enddate: 0,
                },
                modalShow:false,
                unit: {
                    idgps: 0,
                    brand: "HYUNDAI",
                    model: "I10",
                    plate: "PWX013D",
                    serie: "MALB24BC3NM102665",
                    year: "2022",
                    color: "BLANCO",
                    line: "5580457081",
                    unit_name: "16 A GRAND i10 2022 - DANIEL O",
                    group_name: "1 TCV ADMINISTRATIVOS UTILITARIOS",
                },                
            }
        },
        mounted() {
            //Carga general de las unidades
            this.listaunidades();
        },
        methods: {
            
            async listaunidades() {
                try {
                    if (this.unitdto.idgps === '') {
                        this.unitdto.idgps = 0;
                    }
                    const controller = new UnitController();
                    const resp = await controller.getUnits(this.unitdto);
                    //Asignar Datos de Peticion
                    this.items = resp.entities;
                    console.log(resp);
                    if (resp.result) {
                        if (resp.entities.length === 0) {
                        Swal.fire({
                            title: "¡Alerta!",
                            text: "Ingresa un rango de Años correcto",
                            icon: "warning",
                            confirmButtonText: "OK",
                        });
                        }
                    }

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
                const resp = await controller.addUnit(this.unit);3
                console.log(resp.status);
                if (resp.status === 200) {
                    this.showModal = false;
                    Swal.fire({
                        title: '¡Registro Éxitoso!',
                        text: 'Se ha Guardado en la Base de datos, una unidad',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        preConfirm: function(){
                            location.reload();
                        },
                    })
                }else{
                    Swal.fire({
                        title: '¡Atención!',
                        text: 'Error al guardar la informacion',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                });
            }
            },

            async buscar(){
                if (this.unitdto.startdate == '' || this.unitdto.enddate == ''  || this.unitdto.startdate < this.unitdto.enddate) {
                    try {
                        if (this.unitdto.idgps === '') {
                            this.unitdto.idgps = 0;
                        }
                        const controller = new UnitController();
                        const resp = await controller.getUnits(this.unitdto);
                        //Asignar Datos de Peticion
                        this.items = resp.entities;
                        console.log(resp);
                        if (resp.result) {
                            if (resp.entities.length === 0) {
                                Swal.fire({
                                    title: "¡Alerta!",
                                    text: "Sin registros guardados",
                                    icon: "warning",
                                    confirmButtonText: "OK",
                                });
                            }
                        }

                    } catch (error) {
                        Swal.fire({
                                title: '¡Atención!',
                                text: 'Error en carga de información',
                                icon: 'warning',
                                confirmButtonText: 'OK',
                        });
                    }
                }else{
                    Swal.fire({
                                title: '¡Atención!',
                                text: 'Fechas invalidas',
                                icon: 'warning',
                                confirmButtonText: 'OK',
                        });
                }
            }
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
    .text-end{
        padding-right: 10%;
    }
    
  </style>