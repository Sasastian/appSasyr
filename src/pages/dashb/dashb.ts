import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
* Generated class for the DashbPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/


@Component({
	selector: 'page-dashb',
	templateUrl: 'dashb.html',
})
export class DashbPage {

	constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider,  public formBuilder: FormBuilder,private alertCtrl: AlertController) {
		var dat = new Date()
	
		var semana = this.ISO8601_week_no(dat);
		semana = semana - 1;
		var anno = dat.getFullYear();
		// console.log('carga dash'+semana+" - "+anno);
		var fecha = this.yyyymmdd();
		var ayer = this.fechaDeAyer();

		
		var ft = this.fechatitulomesdia(dat);
		this.ftitulo = ft;
		this.ayer = ayer;
		this.getDailyWeek(semana, anno);
		this.getDaily(fecha, ayer);


	}
dly: any;
submitted: any;
acumsubmitted: any;
approvals: any;
acumapprovals: any;
micro_applied: any;
acummicro_applied: any;
micro_approved: any;
acummicro_approved: any;
receptions: any;
acumreceptions: any;
rejections: any;
acumrejections: any;
week: any;
fecha: any;
ayer:any;
ftitulo:any;

	//UTIL
	fechatitulomesdia(dt){
		var tdt = new Date(dt.valueOf());

		var ft2 = tdt.toString().split(" ");

		// this.ftitulo = ft2[1]+" "+ft2[0]+" "+ft2[2];
		return ft2[1]+" "+ft2[0]+" "+ft2[2];
	}
	ISO8601_week_no(dt){
		var tdt = new Date(dt.valueOf());

		var ft2 = tdt.toString().split(" ");

		this.ftitulo = ft2[1]+" "+ft2[0]+" "+ft2[2];

		
		var dayn = (dt.getDay() + 6) % 7;
		tdt.setDate(tdt.getDate() - dayn + 3);
		var firstThursday = tdt.valueOf();
		tdt.setMonth(0, 1);
		if (tdt.getDay() !== 4) 
		{
			tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
		}
		return 1 + Math.ceil((firstThursday - Number(tdt)) / 604800000);
	}
	yyyymmdd() {
    	var now = new Date();
    	var y = now.getFullYear();
    	var m = now.getMonth() + 1;
    	var d = now.getDate();
    	return '' + y + "-"+(m < 10 ? '0' : '-') + m +"-"+ (d < 10 ? '0' : '') + d;
	}
	fechaDeAyer(){
    let hoy = new Date();
    let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
    let ayer = new Date(hoy.getTime() - DIA_EN_MILISEGUNDOS);
    var y = ayer.getFullYear();
    var m = ayer.getMonth()+1;
    var d = ayer.getDate();

    	return '' + y + "-"+(m < 10 ? '0' : '-') + m +"-"+ (d < 10 ? '0' : '') + d;
    
	}
	//UTIL


	getDaily(fecha, ayer){
		this.fecha = fecha;
		this.restProvider.daily(fecha, ayer)
		.then(data => {
			 // console.log('resultDAILY');
			 // console.log(data);
			this.dly = data;
			this.submitted = data[0]['submitted'];
			this.approvals = data[0]['approvals'];
			this.micro_applied = data[0]['micro_applied'];
			this.micro_approved = data[0]['micro_approved'];
			this.receptions = data[0]['receptions'];
			this.rejections = data[0]['rejections'];

			this.acumsubmitted = data[0]['acum_submitted'];
			this.acumapprovals = data[0]['acum_approvals'];
			this.acummicro_applied = data[0]['acum_micro_applied'];
			this.acummicro_approved = data[0]['acum_micro_approved'];
			this.acumrejections = data[0]['acum_rejecetions'];
			this.acumreceptions = data[0]['acum_receptions'];
			this.fecha =data[0]['fecha_daily'];


			
		});
	}
	getDailyWeek(semana, anno) {
		this.week = semana;
		this.restProvider.dailyweek(semana, anno)
		.then(data => {
			 console.log('result');
			 console.log(data);
			let data1 = [
			data[0]['site_presented'], data[0]['site_auth']];
			let clone = JSON.parse(JSON.stringify(this.barChartData));
			clone[0].data = data1;
		
			this.barChartData = clone;


			let dataacum = [
			data[0]['acum_site_presented'], data[0]['acum_site_auth']];
			let cloneacum = JSON.parse(JSON.stringify(this.barChartDataAcum));
			cloneacum[0].data = dataacum;
			this.barChartDataAcum = cloneacum;

			let datamicro = [
			data[0]['radio_presented'], data[0]['radio_auth']];
			let clonemicro = JSON.parse(JSON.stringify(this.barChartDataMicro));
			clonemicro[0].data = datamicro;
			this.barChartDataMicro = clonemicro;

			let datamicroacum = [
			data[0]['acum_radio_presented'], data[0]['acum_radio_auth']];
			let clonemicroacum = JSON.parse(JSON.stringify(this.barChartDataMicroAcum));
			clonemicroacum[0].data = datamicroacum;
			this.barChartDataMicroAcum = clonemicroacum;

			this.week =data[0]['week'];


		});




	}

	ionViewDidLoad() {
		// console.log('ionViewDidLoad DashbPage');
	}
	/*PRESENTADOS ACUMULADOS*/
	public barChartOptionsAcum:any = {
		scaleShowVerticalLines: false,
		responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
	};


	public barChartColorsAcum: any [] =[
    {
        backgroundColor:'rgba(1, 151, 196, 1)',
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2
    }
	];

	public barChartLabelsAcum:string[] = ['Presented Accumulated', 'Authorized Accumulated'];
	public barChartTypeAcum:string = 'bar';
	public barChartLegendAcum:boolean = false;

	public barChartDataAcum:any[] = [
	{data: [0,0]}
	];
	/*PESENTADOS AUTORIZADOS WEEK||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/
		public barChartColors: any [] =[
    {
        backgroundColor:'rgba(251, 157, 33, 1)',
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2
    }
	];
	public barChartOptions:any = {
		scaleShowVerticalLines: false,
		responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
	};
	public barChartLabels:string[] = ['Presented', 'Authorized'];
	public barChartType:string = 'bar';
	public barChartLegend:boolean = false;

	public barChartData:any[] = [
	{data: [0, 0]}
	];


	/*PESENTADOS micro WEEK |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/
	public barChartColorsMicro: any [] =[
    {
        backgroundColor:'rgba(251, 157, 33, 1)',
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2
    }
	];
	public barChartOptionsMicro:any = {
		scaleShowVerticalLines: false,
		responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
	};
	public barChartLabelsMicro:string[] = ['Presented', 'Authorized'];
	public barChartTypeMicro:string = 'bar';
	public barChartLegendMicro:boolean = false;

	public barChartDataMicro:any[] = [
	{data: [0, 0]}
	];

	/*PESENTADOS micro Acum WEEK |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/
	public barChartColorsMicroAcum: any [] =[
    {
        backgroundColor:'rgba(1, 151, 196, 1)',
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2
    }
	];
	public barChartOptionsMicroAcum:any = {
		scaleShowVerticalLines: false,
		responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
	};
	public barChartLabelsMicroAcum:string[] = ['Presented Accumulated', 'Authorized Accumulated'];
	public barChartTypeMicroAcum:string = 'bar';
	public barChartLegendMicroAcum:boolean = false;

	public barChartDataMicroAcum:any[] = [
	{data: [0, 0]}
	];



	// events
	public chartClicked(e:any):void {
		console.log(e);
	}

	public chartHovered(e:any):void {
		console.log(e);
	}

	public randomize():void {
		// Only Change 3 values
		let data = [
		Math.round(Math.random() * 100),
		59,
		];
		let clone = JSON.parse(JSON.stringify(this.barChartData));
		clone[0].data = data;
		this.barChartData = clone;

}

}
