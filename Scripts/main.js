const body = document.querySelector('body')
let membersCongress = data.results[0].members
let miembrosDemocratas = []
let miembrosRepublicanos = []
let miembrosIndependientes = []
let promedioPorcentaje = 0
let masComprometidos = []
let menosComprometidos = []
let miembrosOrdenadosDeMenorAMAyor = []
let fullName = ''
let diezPorcientoMenosComprometido = []
let diezPorcientoMasComprometido = []






let chamber = document.querySelector('.senate') ? 'senate' : 'house'
let URLAPI = `https://api.propublica.org/congress/v1/113/${chamber}/members.json`

let init = {
    method: 'GET',
    headers: {
        'X-API-Key': '668ErAQObOI8KrWmhWJDz8oAJbSgFMP537COIUQz'
    }
}

fetch(URLAPI, init)
    .then(response => response.json())
    .then(data => {
        const members = data.results[0].members
        if (body.id == 'bodyCongress') {
            imprimirTabla()
        } else if (body.id == 'bodyAttendance') {
            pushearElDiezPorcientoMenosComprometido(miembrosOrdenadosDeMenoraMayor)
            pushearElDiezPorcientoMasComprometido(miembrosOrdenadosDeMayoraMenor)
            crearTabla1('tablaCuerpo1')
            crearTabla2(diezPorcientoMasComprometido, 'tablaCuerpo2')
            crearTabla3(diezPorcientoMenosComprometido, 'tablaCuerpo3')
        } else if (body.id == 'bodyLoyalty') {
            crearTabla1('tablaCuerpo1')
            pushearElDiezPorcientoMenosLeal(miembrosOrdenadosDeMenoraMayor)
            pushearElDiezPorcientoMasLeal(miembrosOrdenadosDeMayoraMenor)
            crearTabla2(diezPorcientoMasLeal, 'tablaCuerpo2')
            crearTabla3(diezPorcientoMenosLeal, 'tablaCuerpo3')

        }
    })
    .catch(error => console.warn(error.message))















//-----------------------------------------------------JS 1-----------------------------------------------------






if (body.id == 'bodyCongress') {

    let tBody = document.querySelector('#tBodyCongress')
    let selectState = document.querySelector('#state')
    let capturaDeLosCheckboxDePartidos = document.querySelector('#inputs')
    let valoresDeCheckboxSegunPartido = []
    let selectChooseState = ''
    let miembroAImprimirLuegoDeFiltrar = []


    function imprimirTabla() {
        tBody.innerHTML = []
        filtroPorPartido()
        filtrarPorEstado()
        console.log(miembroAImprimirLuegoDeFiltrar)


        miembroAImprimirLuegoDeFiltrar.forEach(member => {
            if (member.first_name == null) {
                member.first_name = ''
            }
            if (member.middle_name == null) {
                member.middle_name = ''
            }
            if (member.last_name == null) {
                member.last_name = ''
            }
            var fullName = member.first_name + ' ' + member.middle_name + ' ' + member.last_name


            let filaMembers = document.createElement('tr')
            filaMembers.innerHTML = `
            <td>${fullName}</td>
            <td>${member.party}</td>
            <td>${member.state}</td>
            <td>${member.seniority}</td>
            <td>${member.votes_with_party_pct}</td>
             `
            tBody.appendChild(filaMembers)
        })
    }



    capturaDeLosCheckboxDePartidos.addEventListener('change', event => {
        let changedCheckbox = event.target.value
        if (!valoresDeCheckboxSegunPartido.includes(changedCheckbox)) {
            valoresDeCheckboxSegunPartido.push(changedCheckbox)
        } else {
            valoresDeCheckboxSegunPartido = valoresDeCheckboxSegunPartido.filter(otrosPartidos => otrosPartidos != changedCheckbox)
        }
        imprimirTabla()
    })



    selectState.addEventListener('change', event => {
        selectChooseState = event.target.value
        imprimirTabla()
    })



    function filtroPorPartido() {
        miembroAImprimirLuegoDeFiltrar = []
        membersCongress.forEach(member => {
            if (!valoresDeCheckboxSegunPartido.includes('R') && !valoresDeCheckboxSegunPartido.includes('D') && !valoresDeCheckboxSegunPartido.includes('ID')) {
                miembroAImprimirLuegoDeFiltrar = membersCongress
                return
            } else {
                if (member.party === 'R' && valoresDeCheckboxSegunPartido.includes('R')) {
                    miembroAImprimirLuegoDeFiltrar.push(member)
                    return
                }
                if (member.party === 'D' && valoresDeCheckboxSegunPartido.includes('D')) {
                    miembroAImprimirLuegoDeFiltrar.push(member)
                    return
                }
                if (member.party === 'ID' && valoresDeCheckboxSegunPartido.includes('ID')) {
                    miembroAImprimirLuegoDeFiltrar.push(member)
                    return
                }
            }
        })
    }



    function filtrarPorEstado() {
        console.log(selectChooseState)
        if (selectChooseState != '') {
            miembroAImprimirLuegoDeFiltrar = miembroAImprimirLuegoDeFiltrar.filter(member => member.state == selectChooseState)
        }
    }

    /*     imprimirTabla() */




} else if (body.id == 'bodyAttendance') {








    //-----------------------------------------------------JS 2-----------------------------------------------------














    membersCongress.forEach(member => {
        if (member.first_name == null) {
            member.first_name = ''
        }
        if (member.middle_name == null) {
            member.middle_name = ''
        }
        if (member.last_name == null) {
            member.last_name = ''
        }
        fullName = member.first_name + ' ' + member.middle_name + ' ' + member.last_name

    })

    membersCongress.forEach(miembro => {
        if (miembro.party == 'D') {
            miembrosDemocratas.push(miembro)
        }
        if (miembro.party == 'R') {
            miembrosRepublicanos.push(miembro)
        }
        if (miembro.party == 'ID') {
            miembrosIndependientes.push(miembro)
        }
    })
    console.log(miembrosDemocratas)
    console.log(miembrosRepublicanos)
    console.log(miembrosIndependientes)


    function votedWithPartyPorcentaje(array) {
        let porcentaje = 0
        array.forEach(miembro => {
            porcentaje += miembro.votes_with_party_pct
            promedioPorcentaje = Math.round(porcentaje / array.length)
            if (array.length === 0) {
                promedioPorcentaje = 0
            }
        })
        return promedioPorcentaje
    }



    function crearTabla1(idTabla) {
        var tBody = document.querySelector(`#${idTabla}`)


        let trMembers1 = document.createElement('tr')
        trMembers1.innerHTML = `
    <th>Democrats</th>
    <td>${miembrosDemocratas.length}</td>
    <td>${votedWithPartyPorcentaje(miembrosDemocratas)}</td>
     `
        tBody.appendChild(trMembers1)


        let trMembers2 = document.createElement('tr')
        trMembers2.innerHTML = `
    <th>Republicans</th>
    <td>${miembrosRepublicanos.length}</td>
    <td>${votedWithPartyPorcentaje(miembrosRepublicanos)}</td>
     `
        tBody.appendChild(trMembers2)


        let trMembers3 = document.createElement('tr')
        trMembers3.innerHTML = `
    <th>Independents</th>
    <td>${miembrosIndependientes.length}</td>
    <td>${votedWithPartyPorcentaje(miembrosIndependientes)}</td>
     `
        tBody.appendChild(trMembers3)


        let trMembers4 = document.createElement('tr')
        trMembers4.innerHTML = `
    <th>Total</th>
    <td>${membersCongress.length}</td>
    <td>${votedWithPartyPorcentaje(membersCongress)}</td>
     `
        tBody.appendChild(trMembers4)

    }
    /* crearTabla1('tablaCuerpo1') */


    //--------------------------EXERCISE 2------------------------------


    var datosNecesariosMiembros = membersCongress.map(function (member) {
        let rMember = {};
        rMember["first_name"] = member.first_name;
        rMember["middle_name"] = member.middle_name;
        rMember["last_name"] = member.last_name;
        rMember["missed_votes"] = member.missed_votes;
        rMember["missed_votes_pct"] = member.missed_votes_pct;
        return rMember;
    });


    var miembrosOrdenadosDeMenoraMayor = datosNecesariosMiembros.map(function (member) {
        return member
    })
    miembrosOrdenadosDeMenoraMayor.sort((m1, m2) => {
        if (m1.missed_votes_pct < m2.missed_votes_pct) {
            return -1;
        } else if (m1.missed_votes_pct > m2.missed_votes_pct) {
            return 1;
        } else {
            return 0;
        }
    })


    var miembrosOrdenadosDeMayoraMenor = datosNecesariosMiembros.map(function (member) {
        return member
    })
    miembrosOrdenadosDeMayoraMenor.sort((m1, m2) => {
        if (m1.missed_votes_pct > m2.missed_votes_pct) {
            return -1;
        } else if (m1.missed_votes_pct < m2.missed_votes_pct) {
            return 1;
        } else {
            return 0;
        }
    })




    function pushearElDiezPorcientoMenosComprometido(array) {
        for (i = 0; i <= (array.length * 0.1); i++) {
            diezPorcientoMenosComprometido.push(array[i])
        }
    }
    /* pushearElDiezPorcientoMenosComprometido(miembrosOrdenadosDeMenoraMayor) */


    function pushearElDiezPorcientoMasComprometido(array) {
        for (i = 0; i <= (array.length / 100) * 10; i++) {
            diezPorcientoMasComprometido.push(array[i])
        }
    }
    /* pushearElDiezPorcientoMasComprometido(miembrosOrdenadosDeMayoraMenor) */


    function crearTabla2(array, idTbody) {
        let tBody = document.querySelector(`#${idTbody}`)

        array.forEach(member => {
            let tableRow = document.createElement('tr')
            tableRow.innerHTML = `
        <td>${member.first_name}, ${member.middle_name} ${member.last_name}</td>
        <td>${member.missed_votes}</td>
        <td>${member.missed_votes_pct}</td>
        `
            tBody.appendChild(tableRow)
        })

    }
    /* crearTabla2(diezPorcientoMasComprometido, 'tablaCuerpo2') */



    function crearTabla3(array, idTbody) {
        let tBody = document.querySelector(`#${idTbody}`)
        let array2 = Array.from(array)
        array2.forEach(member => {
            let tableRow = document.createElement('tr')
            tableRow.innerHTML = `
        <td>${member.first_name}, ${member.middle_name} ${member.last_name}</td>
        <td>${member.missed_votes}</td>
        <td>${member.missed_votes_pct}</td>
        `
            tBody.appendChild(tableRow)
        })

    }
    /* crearTabla3(diezPorcientoMenosComprometido, 'tablaCuerpo3') */






} else if (body.id == 'bodyLoyalty') {









    //-----------------------------------------------------JS 3-----------------------------------------------------













    membersCongress.forEach(member => {
        if (member.first_name == null) {
            member.first_name = ''
        }
        if (member.middle_name == null) {
            member.middle_name = ''
        }
        if (member.last_name == null) {
            member.last_name = ''
        }
        fullName = member.first_name + ' ' + member.middle_name + ' ' + member.last_name

    })

    membersCongress.forEach(miembro => {
        if (miembro.party == 'D') {
            miembrosDemocratas.push(miembro)
        }
        if (miembro.party == 'R') {
            miembrosRepublicanos.push(miembro)
        }
        if (miembro.party == 'ID') {
            miembrosIndependientes.push(miembro)
        }
    })
    console.log(miembrosDemocratas)
    console.log(miembrosRepublicanos)
    console.log(miembrosIndependientes)


    function votedWithPartyPorcentaje(array) {
        let porcentaje = 0
        array.forEach(miembro => {
            porcentaje += miembro.votes_with_party_pct
            promedioPorcentaje = Math.round(porcentaje / array.length)
        })
        if (array.length === 0) {
            promedioPorcentaje = 0
        }
        return promedioPorcentaje
    }



    function crearTabla1(idTabla) {
        var tBody = document.querySelector(`#${idTabla}`)


        let trMembers1 = document.createElement('tr')
        trMembers1.innerHTML = `
    <th>Democrats</th>
    <td>${miembrosDemocratas.length}</td>
    <td>${votedWithPartyPorcentaje(miembrosDemocratas)}</td>
     `
        tBody.appendChild(trMembers1)


        let trMembers2 = document.createElement('tr')
        trMembers2.innerHTML = `
    <th>Republicans</th>
    <td>${miembrosRepublicanos.length}</td>
    <td>${votedWithPartyPorcentaje(miembrosRepublicanos)}</td>
     `
        tBody.appendChild(trMembers2)


        let trMembers3 = document.createElement('tr')
        trMembers3.innerHTML = `
    <th>Independents</th>
    <td>${miembrosIndependientes.length}</td>
    <td>${votedWithPartyPorcentaje(miembrosIndependientes)}</td>
     `
        tBody.appendChild(trMembers3)


        let trMembers4 = document.createElement('tr')
        trMembers4.innerHTML = `
    <th>Total</th>
    <td>${membersCongress.length}</td>
    <td>${votedWithPartyPorcentaje(membersCongress)}</td>
     `
        tBody.appendChild(trMembers4)

    }
    /* crearTabla1('tablaCuerpo1') */


    //--------------------------EXERCISE 2------------------------------



    var datosNecesariosMiembros = membersCongress.map(function (member) {
        let rMember = {};
        rMember["first_name"] = member.first_name;
        rMember["middle_name"] = member.middle_name;
        rMember["last_name"] = member.last_name;
        rMember["votes_with_party"] = Math.round((member.total_votes / 100) * member.missed_votes_pct);
        rMember["votes_with_party_pct"] = member.missed_votes_pct;
        return rMember;
    });



    var miembrosOrdenadosDeMenoraMayor = datosNecesariosMiembros.map(function (member) {
        return member
    })
    miembrosOrdenadosDeMenoraMayor.sort((m1, m2) => {
        if (m1.votes_with_party_pct < m2.votes_with_party_pct) {
            return -1;
        } else if (m1.votes_with_party_pct > m2.votes_with_party_pct) {
            return 1;
        } else {
            return 0;
        }
    })


    var miembrosOrdenadosDeMayoraMenor = datosNecesariosMiembros.map(function (member) {
        return member
    })
    miembrosOrdenadosDeMayoraMenor.sort((m1, m2) => {
        if (m1.votes_with_party_pct > m2.votes_with_party_pct) {
            return -1;
        } else if (m1.votes_with_party_pct < m2.votes_with_party_pct) {
            return 1;
        } else {
            return 0;
        }
    })


    var diezPorcientoMenosLeal = []
    var diezPorcientoMasLeal = []

    function pushearElDiezPorcientoMenosLeal(array) {
        for (i = 0; i <= (array.length / 100) * 10; i++) {
            diezPorcientoMenosLeal.push(array[i])
        }
    }
    /* pushearElDiezPorcientoMenosLeal(miembrosOrdenadosDeMenoraMayor) */


    function pushearElDiezPorcientoMasLeal(array) {
        for (i = 0; i <= (array.length / 100) * 10; i++) {
            diezPorcientoMasLeal.push(array[i])
        }
    }
    /* pushearElDiezPorcientoMasLeal(miembrosOrdenadosDeMayoraMenor) */


    function crearTabla2(array, idTbody) {
        let tBody = document.querySelector(`#${idTbody}`)

        array.forEach(member => {
            let tableRow = document.createElement('tr')
            tableRow.innerHTML = `
        <td>${member.first_name}, ${member.middle_name} ${member.last_name}</td>
        <td>${member.votes_with_party}</td>
        <td>${member.votes_with_party_pct}</td>
        `
            tBody.appendChild(tableRow)
        })

    }
    /* crearTabla2(diezPorcientoMasLeal, 'tablaCuerpo2') */




    function crearTabla3(array, idTbody) {
        let tBody = document.querySelector(`#${idTbody}`)

        array.forEach(member => {
            let tableRow = document.createElement('tr')
            tableRow.innerHTML = `
        <td>${member.first_name}, ${member.middle_name} ${member.last_name}</td>
        <td>${member.votes_with_party}</td>
        <td>${member.votes_with_party_pct}</td>
        `
            tBody.appendChild(tableRow)
        })

    }
    /* crearTabla3(diezPorcientoMenosLeal, 'tablaCuerpo3') */
}


