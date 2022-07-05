
Vue.createApp({




    data() {
      return {
        message: 'Hello Vue!',
        URLAPI: '',
        init: {
          method: 'GET',
          headers: {
            'X-API-Key': '668ErAQObOI8KrWmhWJDz8oAJbSgFMP537COIUQz',
          }
        },
        miembros: [],
        checksValue: [],
        selectValue: 'all',
        miembrosEstados: [],
        miembrosFiltrados: [],
        arrayEstados: [],
        arrayEstados: [],
        auxEstados: [],
        aux: [],
  
        miembrosDemocratas: 0,
        miembrosRepublicanos: 0,
        miembrosIndependentistas: 0,
        sumaDePorcentajesDemocratas: 0,
        sumaDePorcentajesRepublicanos: 0,
        sumaDePorcentajesIndependentistas: 0,
        sumaDePorcentajes: 0,
        total: 0,
        percentByPartyD: 0,
        percentByPartyR: 0,
        percentByPartyID: 0,
        totalPorcentajes: 0,
  
        auxPorcentajeAttendance: [],
        auxPorcentaje: [],
        reglaDeTres: 0,
        ordenadoFinalMost: [],
        ordenadoFinalMost1: [],
        ordenadoFinalLeast: [],
        ordenadoFinalLeast1: [],
        totalMath: 0,
      }
    },
  
  
    created() {
      let chamber = document.querySelector('.senate') ? 'senate' : 'house'
      this.URLAPI = `https://api.propublica.org/congress/v1/113/${chamber}/members.json`
      fetch(this.URLAPI, this.init)
        .then(response => response.json())
        .then(data => {
          this.miembros = data.results[0].members
  
          this.miembros.map(element => {
            if (!this.arrayEstados.includes(element.state)) {
                this.arrayEstados.push(element.state)
            }
            return this.arrayEstados.sort()
        })
  
        console.log(this.arrayEstados)
  
        this.tablaDelAttendance()
        this.tabla10Percent()
        this.tabla10PercentLoyalty()
  
        })
    },
  
    methods: {
      tablaDelAttendance: function () {
              
        this.miembrosDemocratas = 0
        this.miembrosRepublicanos = 0
        this.miembrosIndependentistas = 0
        this.sumaDePorcentajesDemocratas = 0
        this.sumaDePorcentajesRepublicanos = 0
        this.sumaDePorcentajesIndependentistas = 0
        this.sumaDePorcentajes = 0
  
        this.miembros.forEach(miembro => {
            if (miembro.party === "D") {
                this.miembrosDemocratas ++
                this.sumaDePorcentajesDemocratas = this.sumaDePorcentajesDemocratas + miembro.votes_with_party_pct
            } else if(miembro.party === "R") {
                this.miembrosRepublicanos ++
                this.sumaDePorcentajesRepublicanos = this.sumaDePorcentajesRepublicanos + miembro.votes_with_party_pct
            } else if (miembro.party === "ID") {
                this.miembrosIndependentistas ++
                this.sumaDePorcentajesIndependentistas = this.sumaDePorcentajesIndependentistas + miembro.votes_with_party_pct
            }
            this.sumaDePorcentajes = this.sumaDePorcentajes + miembro.votes_with_party_pct
  
            this.total = this.miembrosDemocratas + this.miembrosRepublicanos + this.miembrosIndependentistas
  
            this.percentByPartyD = (this.sumaDePorcentajesDemocratas/this.miembrosDemocratas)
            this.percentByPartyR = (this.sumaDePorcentajesRepublicanos/this.miembrosRepublicanos)
            this.percentByPartyID = (this.sumaDePorcentajesIndependentistas/this.miembrosIndependentistas)
            
            if (isNaN(this.percentByPartyID)) {
                this.percentByPartyID = 0
            }
  
            this.totalPorcentajes = (this.sumaDePorcentajes/this.total)
  
        })
        },
        
        tabla10Percent: function () {
  
            this.auxPorcentaje = []           
  
            this.miembros.forEach(member => {
            if (!this.auxPorcentaje.includes(member.votes_with_party_pct)) {
  
                this.auxPorcentaje.push(member)
  
            }
            this.auxPorcentaje.sort(function (a, b){return a.missed_votes_pct - b.missed_votes_pct})
            })
  
            console.log(this.auxPorcentaje)
  
            this.reglaDeTres = Math.floor(this.total*0.10)
  
            console.log(this.reglaDeTres)
  
            this.ordenadoFinalMost1 = this.auxPorcentaje.slice(0, this.reglaDeTres)
            this.ordenadoFinalLeast1 = this.auxPorcentaje.reverse().slice(0, this.reglaDeTres)
  
            console.log (this.ordenadoFinalLeast1)
            console.log (this.ordenadoFinalMost1)
  
            this.totalMath = (this.total/100)
        },
  
        tabla10PercentLoyalty: function () {
            this.auxPorcentaje = []           
  
            this.miembros.forEach(member => {
            if (!this.auxPorcentaje.includes(member.votes_with_party_pct)) {
  
                this.auxPorcentaje.push(member)
  
            }
            this.auxPorcentaje.sort(function (a, b){return a.votes_with_party_pct - b.votes_with_party_pct})
            })
  
            console.log(this.auxPorcentaje)
  
            this.reglaDeTres = Math.floor(this.total*0.10)
  
            console.log(this.reglaDeTres)
  
            this.ordenadoFinalMost = this.auxPorcentaje.slice(0, this.reglaDeTres)
            this.ordenadoFinalLeast = this.auxPorcentaje.reverse().slice(0, this.reglaDeTres)
  
            console.log (this.ordenadoFinalLeast)
            console.log (this.ordenadoFinalMost)
  
            this.totalMath = (this.total/100)
        }
  
    },
  
    computed: {
      filtrador () {
        console.log(this.checksValue)
        console.log(this.valorDelSelect)
        this.aux = []
        this.auxEstados = []
            this.miembros.forEach(miembro =>{
                this.checksValue.forEach(valor => miembro.party == valor ? this.aux.push(miembro) : "")
            })
            console.log(this.aux)
            if (this.checksValue.length == 0) {
                this.aux = this.miembros
            }
        
            this.aux.forEach (member => {
                if (this.valorDelSelect == "all") {
                    this.auxEstados.push(member)
                } else  if (this.valorDelSelect == member.state){
                    this.auxEstados.push(member)
                }
            })
    },
  
  
    },
  
  
  }).mount('#app')
  