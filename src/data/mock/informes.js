const informes = [
  {
    "id": "INF-2024-00847",
    "estudio": {
      "tipo": "Tomografía Computada (TC)",
      "regionAnatomica": "Tórax con contraste",
      "fechaRealizacion": "2024-09-14",
      "fechaInforme": "2024-09-15",
      "estado": "Firmado"
    },
    "paciente": {
      "id": 4,
      "nombreCompleto": "Jorge Alberto Soria",
      "dni": "25678943",
      "fechaNacimiento": "1968-04-22",
      "edad": 56,
      "sexo": "Masculino",
      "obraSocial": "PAMI",
      "numeroAfiliado": "03-0256789-43"
    },
    "medicoSolicitante": {
      "nombreCompleto": "Dra. Claudia Verónica Ibáñez",
      "especialidad": "Neumonología",
      "matricula": "MP 48.321",
      "institucion": "Hospital Provincial de Córdoba"
    },
    "parametrosTecnicos": {
      "equipo": "Siemens SOMATOM Definition AS+ 128 cortes",
      "kvp": 120,
      "mAs": 210,
      "espesordCorte_mm": 1.5,
      "contraste": {
        "tipo": "Iohexol",
        "concentracion_mgml": 350,
        "volumen_ml": 80
      },
      "fase": "Portal venosa (70 seg)"
    },
    "hallazgos": [
      {
        "region": "Parénquima pulmonar",
        "descripcion": "Nódulo sólido de 8 mm en lóbulo inferior derecho, de bordes bien definidos, sin calcificaciones. Sin otros nódulos identificables."
      },
      {
        "region": "Mediastino",
        "descripcion": "Centrado. Sin adenopatías mediastinales ni hiliares de tamaño significativo. Estructuras vasculares de calibre conservado."
      },
      {
        "region": "Pleura",
        "descripcion": "Sin derrame ni engrosamiento. Ambos senos costofrénicos libres."
      },
      {
        "region": "Corazón",
        "descripcion": "Tamaño normal. No se observan signos de derrame pericárdico."
      },
      {
        "region": "Estructuras óseas",
        "descripcion": "Sin lesiones líticas ni blásticas. Columna dorsal con cambios degenerativos leves."
      }
    ],
    "conclusion": "Nódulo pulmonar sólido de 8 mm en lóbulo inferior derecho de características indeterminadas. Se recomienda seguimiento con TC de baja dosis a los 3 meses para evaluar evolución, según guías Fleischner Society. Resto del estudio sin hallazgos significativos.",
    "medicoInformante": {
      "nombreCompleto": "Dr. Hernán Pablo Castillo",
      "especialidad": "Diagnóstico por Imágenes",
      "matricula": "MP 61.047",
      "firmaDigital": {
        "valida": true,
        "fechaHora": "2024-09-15T14:32:00"
      }
    }
  }
]

export default informes