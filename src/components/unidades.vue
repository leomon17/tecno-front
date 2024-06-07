

<template>
    <div class="container-fluid">
        <div class="row">
            
            <div class="col-4" style="max-height: 100%;">
                <div class="text-center">
                    <h3>Listado de unidades</h3>
                </div>
                <div class="container">
                    <div style="display: flex;">
                        <input class="form-control me-1 unidad-input" v-model="idGpsstrg" type="search" placeholder="Buscar unidad por IDGPS" aria-label="Buscar unidad">
                        <button class="btn btn-outline-success" @click="busquedaporid()" > <font-awesome-icon icon="fa-solid fa-user-secret" /> Buscar</button>
                    </div>
                </div>
                <div class="container mt-2" style="overflow-y:scroll; max-height: 75vh;">
                    <div v-for="item in items" class="m-4">
                    
                        <div class="row item-auto">
                            <div class="col-9 text-left">
                                <b>{{ item.IDGPS }}</b> | {{ item.MARCA }} | {{ item.MODELO }} ({{ item.ANO }} ) {{ item.WG2534B }} 
                            </div>
                            <div class="col-3">
                                <button type="button" class="btn btn-primary m-1" @click="busqueda(item.IDGPS)">Detalles</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-8 row">
                <div class="row">
                    <div class="col-8 " >
                    <div class="mb-3 inputdate">
                        Fecha inicio de busqueda 
                        <input
                            type="datetime-local"
                            id="meeting-time"
                            name="meeting-time"
                            value="2018-06-12T19:30"
                            min="2015-06-07T00:00"
                            max="2024-06-14T00:00" 
                            v-model="fechainicio"/>

                    </div>
                    <div class="inputdate">
                        Fecha fin de busqueda
                        <input
                                type="datetime-local"
                                id="meeting-time"
                                name="meeting-time"
                                value="2018-06-12T19:30"
                                min="2015-06-07T00:00"
                                max="2024-06-14T00:00" 
                                v-model="fechafin"/>
                    </div>
                </div>
                <div class="col-4 text-center pt-3">
                    <input type="hidden" v-model="idGps">
                    <button type="button" class="btn btn-info" @click="detalles">Buscar ubicacion</button>
                </div>
                <div class="row mt-1">
                    <h4 class="text-center">Datos de la unidad</h4>
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
                            <th scope="col">ACCIONES</th>

                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="item in itemsp" >
                                <td> {{ item.IDGPS }}</td>
                                <td> {{ item.MARCA }}</td>
                                <td> {{ item.MODELO }}</td>
                                <td> {{ item.PLACAS }}</td>
                                <td> {{ item.SERIE }}</td>
                                <td> {{ item.ANO }}</td>
                                <td> {{ item.COLOR }}</td>
                                <td> {{ item.LINEA }}</td>
                                <td v-if="item"> 
                                    <button type="button" class="btn btn-primary m-1" data-toggle="modal" data-target="#modaleventos" :disabled='isDisabled' @click="detalleseventos(item.IDGPS)">Eventos</button>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                    <div id="map-api" class="mt-2">
                        <GMapMap
                            :center="center"
                            :zoom="zoomdata"
                            map-type-id="terrain"
                            style="width: 100%; height: 600px"
                            >
                            <GMapMarker
                                :key="index"
                                v-for="(m, index) in markers"
                                :position="m.position"
                            >
                                <GMapInfoWindow>
                                <div>
                                    <p>IMEI: {{ m.imei }}</p>
                                </div>
                                </GMapInfoWindow>
                            </GMapMarker>
                        </GMapMap>
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
              size="xl"
              title="Eventos de la unidad"
            >
                <table id="example" class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">NAME_DEVICE</th>
                        <th scope="col">IMEI</th>
                        <th scope="col">DESC_MSG</th>
                        <th scope="col" >LAT - LON</th>
                        <th scope="col" style="width: 20px">VEL</th>
                        <th scope="col">IGNICION</th>
                        <th scope="col">NOMBRE_GRUPO</th>
                        <th scope="col">FECHA REGISTRO</th>

                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in itemsevent" >
                            <td> {{ item.NAME_DEVICE }}</td>
                            <td> {{ item.IMEI }}</td>
                            <td> {{ item.DESC_MSG }}</td>
                            <td> {{ item.LAT }} <br> {{ item.LON }}</td>
                            <td> {{ item.VEL }}</td>
                            <td> {{ item.IGNICION }}</td>
                            <td> {{ item.NOMBRE_GRUPO }}</td>
                            <td> {{ formatDate(item.DT_MSG) }}</td>

                        </tr>
                    </tbody>
                </table>

            </b-modal>
          </template>
        </div>

    </div>   
  </template>
  
  <script>

  import Swal from 'sweetalert2';
  import axios from "axios";
  import { defineComponent } from "vue";
  import moment from 'moment';


    
  

    export default defineComponent({
        name:"unidades",

        data() {
            return {
                items: [],
                itemsp: [],
                itemsevent: [],

                isDisabled:true,
                fechainicio: "",
                fechafin: "",
                idGps: "",
                idGpsstrg: "",

                center: { lat: 19.458077, lng: -99.12991199999999 },
                zoomdata: 10,
                markers:  {
                    position: { lat:0, lng:0 },
                    name: "",
                    imei: "",
                    location: "",
                },
                modalShow:false,

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

            async busquedaporid() {
                try {
                    var idgps = this.idGpsstrg;
                    const url = "https://www.tcvsat.com.mx/tcvback/v3/api/units";
                    const headers = { //key
                    "Tcv-Client-Id":
                        "N2U5YzQyNzgzMTA4ODFhN2U4YTZjZmNkMzU1Yjg3ZjljNWUxYzNlMDRjYjNlODc0MjRiM2Q2YzRkYjkxMTEzNGEyYjcxMjU2YmFjYjAxMzM5YjM1OWU0NzBjYTgwMjMzODI1M2IxOTY5NjI5M2RlNmQyMTBlZDU1ZDU3N2U3M2IK",
                    };
                    const params = {
                        idgps,
                    };
                    const response = await axios.get(url, { headers,params });
                    this.items = response.data;
                } catch (error) {
                    Swal.fire({
                            title: '¡Atención!',
                            text: 'Error en carga de información / Datos no encontrados',
                            icon: 'warning',
                            confirmButtonText: 'OK',
                    });
                }
            },
            
            async busqueda(idGps) {
                try {
                    this.idGps = parseInt(idGps);
                    var idgps = parseInt(idGps);
                    const url = "https://www.tcvsat.com.mx/tcvback/v3/api/units";
                    const headers = { //key
                    "Tcv-Client-Id":
                        "N2U5YzQyNzgzMTA4ODFhN2U4YTZjZmNkMzU1Yjg3ZjljNWUxYzNlMDRjYjNlODc0MjRiM2Q2YzRkYjkxMTEzNGEyYjcxMjU2YmFjYjAxMzM5YjM1OWU0NzBjYTgwMjMzODI1M2IxOTY5NjI5M2RlNmQyMTBlZDU1ZDU3N2U3M2IK",
                    };
                    const params = {
                        idgps,
                    };
                    const response = await axios.get(url, { headers,params });
                    this.itemsp = response.data;
                    this.isDisabled = true;

            
                } catch (error) {
                    Swal.fire({
                            title: '¡Atención!',
                            text: 'Ingresa Datos correctos',
                            icon: 'warning',
                            confirmButtonText: 'OK',
                        });
                }
            },

            async detalles() {
                try {
                    const url = "https://www.tcvsat.com.mx/tcvback/v3/api/events";
                    const dtini = this.fechainicio;
                    const dtfin = this.fechafin;
                    const idgps = this.idGps;
                    const headers = {
                    "Tcv-Client-Id":
                        "N2U5YzQyNzgzMTA4ODFhN2U4YTZjZmNkMzU1Yjg3ZjljNWUxYzNlMDRjYjNlODc0MjRiM2Q2YzRkYjkxMTEzNGEyYjcxMjU2YmFjYjAxMzM5YjM1OWU0NzBjYTgwMjMzODI1M2IxOTY5NjI5M2RlNmQyMTBlZDU1ZDU3N2U3M2IK",
                    };
                    const params = {
                    dtini,
                    dtfin,
                    idgps,
                    };

                    const response = await axios.get(url, { headers, params });
                    this.unidades = response.data;
                    this.itemsevent = response.data;

                    if(response.data.length >5){
                    this.zoomdata = 15;
                    }else{
                    this.zoomdata = 12;
                    }
                    
                    this.markers = response.data.map((item) => ({
                    position: { lat: item.LAT, lng: item.LON },
                    name: item.NAME_DEVICE,
                    imei: item.IMEI,
                    location: item.UBICACION,
                    }));
                    this.isDisabled = false;

                } catch (error) {
                    Swal.fire({
                            title: '¡Atención!',
                            text: 'Sin información sobre eventos',
                            icon: 'warning',
                            confirmButtonText: 'OK',
                        });
                }
            },
            hideModal(){
                this.modalShow = false;
            },

            detalleseventos(idGps) {

                this.modalShow = true;
            },

            formatDate(value){
                if (value) {
                    return moment(String(value)).format('MM/DD/YYYY hh:mm')
                }
            }

        }
    })
  </script>
  
  <style>
    .unidad-input{
        width: 70%;
    }

    .item-auto{
        border: 1px solid rgb(182, 213, 241);
        border-radius: 10px;
    }

    #map-api{
        border: 1px solid rgb(182, 213, 241);
        border-radius: 10px;
        width: 100%;
        
    }
    .inputdate{
        display: flex;
        width: max-content;
    }
  </style>