const pacientes = [
  {
    "id": 1,
    "nombreCompleto": "Lucía Fernández Herrera",
    "dni": "28341567",
    "domicilio": {
      "calle": "Av. San Martín 1245",
      "ciudad": "Buenos Aires",
      "provincia": "Buenos Aires",
      "codigoPostal": "1416"
    },
    "contacto": {
      "telefono": "011-4523-8890",
      "email": "lucia.fernandez@gmail.com"
    },
    "fechaAlta": "2023-08-15",
    "obraSocialPrincipal": "OSDE 410"
  },
  {
    "id": 2,
    "nombreCompleto": "Marcos Rodríguez Pérez",
    "dni": "33892014",
    "domicilio": {
      "calle": "Calle 9 N° 342",
      "ciudad": "La Plata",
      "provincia": "Buenos Aires",
      "codigoPostal": "1900"
    },
    "contacto": {
      "telefono": "0221-456-7712",
      "email": "marcos.rodriguez@hotmail.com"
    },
    "fechaAlta": "2022-11-03",
    "obraSocialPrincipal": "IOMA"
  },
  {
    "id": 3,
    "nombreCompleto": "Valentina Gómez Castro",
    "dni": "41203875",
    "domicilio": {
      "calle": "Bv. Oroño 870",
      "ciudad": "Rosario",
      "provincia": "Santa Fe",
      "codigoPostal": "2000"
    },
    "contacto": {
      "telefono": "0341-512-3344",
      "email": "vgomez.castro@gmail.com"
    },
    "fechaAlta": "2024-01-22",
    "obraSocialPrincipal": "Swiss Medical"
  },
  {
    "id": 4,
    "nombreCompleto": "Jorge Alberto Soria",
    "dni": "25678943",
    "domicilio": {
      "calle": "Tucumán 587 3°B",
      "ciudad": "Córdoba",
      "provincia": "Córdoba",
      "codigoPostal": "5000"
    },
    "contacto": {
      "telefono": "0351-423-6601",
      "email": "jsoria@yahoo.com.ar"
    },
    "fechaAlta": "2021-06-10",
    "obraSocialPrincipal": "PAMI"
  },
  {
    "id": 5,
    "nombreCompleto": "Ana Paula Suárez",
    "dni": "38457621",
    "domicilio": {
      "calle": "Mitre 1023 1°A",
      "ciudad": "Mendoza",
      "provincia": "Mendoza",
      "codigoPostal": "5500"
    },
    "contacto": {
      "telefono": "0261-489-2250",
      "email": "anapaula.suarez@gmail.com"
    },
    "fechaAlta": "2023-03-18",
    "obraSocialPrincipal": "Galeno"
  },
  {
    "id": 6,
    "nombreCompleto": "Diego Martín Villalba",
    "dni": "30145782",
    "domicilio": {
      "calle": "Belgrano 234",
      "ciudad": "Salta",
      "provincia": "Salta",
      "codigoPostal": "4400"
    },
    "contacto": {
      "telefono": "0387-422-1198",
      "email": "dvillalba@gmail.com"
    },
    "fechaAlta": "2022-07-30",
    "obraSocialPrincipal": "OSDE 210"
  },
  {
    "id": 7,
    "nombreCompleto": "Sofía Belén Torres",
    "dni": "44561230",
    "domicilio": {
      "calle": "Rivadavia 2890 PB",
      "ciudad": "Buenos Aires",
      "provincia": "Buenos Aires",
      "codigoPostal": "1406"
    },
    "contacto": {
      "telefono": "011-3987-5541",
      "email": "sofia.torres@outlook.com"
    },
    "fechaAlta": "2024-04-05",
    "obraSocialPrincipal": "Medicus"
  },
  {
    "id": 8,
    "nombreCompleto": "Ramón Ezequiel Blanco",
    "dni": "27893410",
    "domicilio": {
      "calle": "Av. Colón 1560",
      "ciudad": "Mar del Plata",
      "provincia": "Buenos Aires",
      "codigoPostal": "7600"
    },
    "contacto": {
      "telefono": "0223-478-3312",
      "email": "reblanco@gmail.com"
    },
    "fechaAlta": "2020-09-14",
    "obraSocialPrincipal": "PAMI"
  },
  {
    "id": 9,
    "nombreCompleto": "Natalia Andrea Acosta",
    "dni": "36712589",
    "domicilio": {
      "calle": "San Lorenzo 445 2°C",
      "ciudad": "Tucumán",
      "provincia": "Tucumán",
      "codigoPostal": "4000"
    },
    "contacto": {
      "telefono": "0381-431-7890",
      "email": "natalia.acosta@gmail.com"
    },
    "fechaAlta": "2023-12-01",
    "obraSocialPrincipal": "Accord Salud"
  },
  {
    "id": 10,
    "nombreCompleto": "Federico Leandro Mora",
    "dni": "29034876",
    "domicilio": {
      "calle": "Urquiza 789",
      "ciudad": "Paraná",
      "provincia": "Entre Ríos",
      "codigoPostal": "3100"
    },
    "contacto": {
      "telefono": "0343-412-5567",
      "email": "flmora@hotmail.com"
    },
    "fechaAlta": "2021-02-28",
    "obraSocialPrincipal": "IAPOS"
  }
];

const pacientesConUUID = pacientes.map(paciente => ({...paciente, uuid: crypto.randomUUID()}))

export default pacientesConUUID