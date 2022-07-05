
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
      estados: [],
      miembros: [],
      checksValue: [],
      selectValue: 'all',
      miembrosFiltradosPorPartido: [],
      miembrosFiltradosPorEstado: [],
      miembrosFiltrados: [],
      republicanos: [],
      democratas: [],
      independientes: [],
      diezPorCientoMasLeal: [],
      diezPorCientoMenosLeal: [],
      diezPorCientoMasComprometido: [],
      diezPorCientoMenosComprometido: [],
    }
  },


  created() {
    let chamber = document.querySelector('.senate') ? 'senate' : 'house'
    this.URLAPI = `https://api.propublica.org/congress/v1/113/${chamber}/members.json`
    fetch(this.URLAPI, this.init)
      .then(response => response.json())
      .then(data => {
        this.miembros = data.results[0].members
        this.miembrosFiltradosPorEstado = data.results[0].members
      })
  },

  methods: {
    filtro() {
      this.miembrosFiltradosPorPartido = []
      this.miembrosFiltradosPorEstado = []

      this.miembros.forEach(miembro => {
        this.checksValue.forEach(value => miembro.party == value ? this.miembrosFiltradosPorPartido.push(miembro) : null)
      })
      if (this.checksValue.length == 0) {
        this.miembrosFiltradosPorPartido = this.miembros
      }

      if (this.selectValue == 'all') {
        this.miembrosFiltradosPorEstado = this.miembrosFiltradosPorPartido
      } else {
        this.miembrosFiltradosPorPartido.forEach(miembro => {
          if (miembro.state == this.selectValue) {
            this.miembrosFiltradosPorEstado.push(miembro)
          }
        })
      }
    },

    votesWithPartyPorcentaje(array) {
      let porcentaje = 0
      let promedioPorcentaje = 0
      array.forEach(miembro => {
        porcentaje += miembro.votes_with_party_pct
        promedioPorcentaje = porcentaje / array.length
        if (array.length === 0) {
          promedioPorcentaje = 0
        }
      })
      return promedioPorcentaje.toFixed(2)
    }
  },

  computed: {
    estadosSinRepetir() {
      this.miembros.forEach(miembro => !this.estados.includes(miembro.state) ? this.estados.push(miembro.state) : '')
    },

    separarMiembrosPorPartido() {
      this.miembros.forEach(miembro => {
        if (miembro.party == 'D') {
          this.democratas.push(miembro)
        }
        if (miembro.party == 'R') {
          this.republicanos.push(miembro)
        }
        if (miembro.party == 'ID') {
          this.independientes.push(miembro)
        }
      })
    },

    miembrosOrdenadosDeMayoraMenorATTENDANCE() {
      let miembrosOrdenadosDeMayoraMenor = this.miembros.map(member => member)
      miembrosOrdenadosDeMayoraMenor.sort((m1, m2) => m2.missed_votes_pct - m1.missed_votes_pct)

      for (let i = 0; i < (miembrosOrdenadosDeMayoraMenor.length * 0.1); i++) {
        if(!this.diezPorCientoMenosComprometido.includes(miembrosOrdenadosDeMayoraMenor[i])){
          this.diezPorCientoMenosComprometido.push(miembrosOrdenadosDeMayoraMenor[i])
        }

        miembrosOrdenadosDeMayoraMenor.forEach(miembro => {
          if (miembro.missed_votes_pct == miembrosOrdenadosDeMayoraMenor[i].missed_votes_pct && !this.diezPorCientoMenosComprometido.includes(miembro)) {
            this.diezPorCientoMenosComprometido.push(miembro)
          }
        })
      }
    },
    miembrosOrdenadosDeMenoraMayorATTENDANCE() {
      let miembrosOrdenadosDeMenoraMayor = this.miembros.map(member => member)
      miembrosOrdenadosDeMenoraMayor.sort((m1, m2) => m1.missed_votes_pct - m2.missed_votes_pct)

      for (let i = 0; i < (miembrosOrdenadosDeMenoraMayor.length * 0.1); i++) {
        if(!this.diezPorCientoMasComprometido.includes(miembrosOrdenadosDeMenoraMayor[i])){
          this.diezPorCientoMasComprometido.push(miembrosOrdenadosDeMenoraMayor[i])
        }

        miembrosOrdenadosDeMenoraMayor.forEach(miembro => {
          if (miembro.missed_votes_pct == miembrosOrdenadosDeMenoraMayor[i].missed_votes_pct && !this.diezPorCientoMasComprometido.includes(miembro)) {
            this.diezPorCientoMasComprometido.push(miembro)
          }
        })

      }
    },

    miembrosOrdenadosDeMayoraMenorLOYALTY() {
      let miembrosOrdenadosDeMayoraMenor = this.miembros.map(member => member)
      miembrosOrdenadosDeMayoraMenor.sort((m1, m2) => m2.votes_with_party_pct - m1.votes_with_party_pct)

      for (let i = 0; i < (miembrosOrdenadosDeMayoraMenor.length * 0.1); i++) {
        if(!this.diezPorCientoMasLeal.includes(miembrosOrdenadosDeMayoraMenor[i])){
          this.diezPorCientoMasLeal.push(miembrosOrdenadosDeMayoraMenor[i])
        }

        miembrosOrdenadosDeMayoraMenor.forEach(miembro => {
          if (miembro.votes_with_party_pct == miembrosOrdenadosDeMayoraMenor[i].votes_with_party_pct && !this.diezPorCientoMasLeal.includes(miembro)) {
            this.diezPorCientoMasLeal.push(miembro)
          }
        })
      }
    },
    miembrosOrdenadosDeMenoraMayorLOYALTY() {
      let miembrosOrdenadosDeMenoraMayor = this.miembros.map(member => member)
      miembrosOrdenadosDeMenoraMayor.sort((m1, m2) => m1.votes_with_party_pct - m2.votes_with_party_pct)

      for (let i = 0; i < (miembrosOrdenadosDeMenoraMayor.length * 0.1); i++) {
        if(!this.diezPorCientoMenosLeal.includes(miembrosOrdenadosDeMenoraMayor[i])){
          this.diezPorCientoMenosLeal.push(miembrosOrdenadosDeMenoraMayor[i])
        }

        miembrosOrdenadosDeMenoraMayor.forEach(miembro => {
          if (miembro.votes_with_party_pct == miembrosOrdenadosDeMenoraMayor[i].votes_with_party_pct && !this.diezPorCientoMenosLeal.includes(miembro)) {
            this.diezPorCientoMenosLeal.push(miembro)
          }
        })
      }
    },
  },

  /*   sacarLosPartyVotes(){
      
    } */


}).mount('#app')
