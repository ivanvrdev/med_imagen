/**
 * InformeMedicoDocument.jsx
 * Requiere: npm install @react-pdf/renderer html-react-parser
 *
 * Uso:
 *   import InformeMedicoDocument from './InformeMedicoDocument';
 *   import { PDFDownloadLink } from '@react-pdf/renderer';
 *
 *   <PDFDownloadLink document={<InformeMedicoDocument data={data} />} fileName="informe.pdf">
 *     Descargar PDF
 *   </PDFDownloadLink>
 *
 *   O para previsualizar:
 *   import { PDFViewer } from '@react-pdf/renderer';
 *   <PDFViewer width="100%" height={800}><InformeMedicoDocument data={data} /></PDFViewer>
 */

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
  PDFViewer
} from "@react-pdf/renderer";
import useInformePDF from "../hooks/useInformePDF";
import { useParams } from "react-router";

// ─── Paleta de colores ────────────────────────────────────────────────────────
const COLORS = {
  primary: "#1B4F72",
  primaryLight: "#2E86C1",
  accent: "#148F77",
  background: "#F4F6F7",
  white: "#FFFFFF",
  border: "#D5D8DC",
  textDark: "#1C2833",
  textMid: "#4D5656",
  textLight: "#7F8C8D",
  headerBg: "#1B4F72",
  rowAlt: "#EBF5FB",
  success: "#1E8449",
  sectionTitle: "#1A5276",
};

// ─── Estilos ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: COLORS.white,
    paddingTop: 0,
    paddingBottom: 60,
    paddingHorizontal: 0,
    fontSize: 9,
    color: COLORS.textDark,
  },

  // Header institucional
  header: {
    backgroundColor: COLORS.headerBg,
    paddingHorizontal: 36,
    paddingVertical: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: "Helvetica-Bold",
    color: COLORS.white,
    letterSpacing: 0.8,
  },
  headerSubtitle: {
    fontSize: 8.5,
    color: "#A9CCE3",
    marginTop: 3,
    letterSpacing: 0.3,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  headerComprobante: {
    fontSize: 8,
    color: "#A9CCE3",
    marginBottom: 2,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.5,
  },
  headerComprobanteValue: {
    fontSize: 13,
    color: COLORS.white,
    fontFamily: "Helvetica-Bold",
  },

  // Banda de estado
  statusBand: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 36,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#ABEBC6",
    marginRight: 6,
  },
  statusText: {
    fontSize: 8,
    color: COLORS.white,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  // Cuerpo principal
  body: {
    paddingHorizontal: 36,
    paddingTop: 20,
  },

  // Tarjeta de datos paciente
  patientCard: {
    backgroundColor: COLORS.background,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 18,
    flexDirection: "row",
    gap: 30,
  },
  patientGroup: {
    flex: 1,
  },
  patientLabel: {
    fontSize: 7,
    color: COLORS.textLight,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  patientValue: {
    fontSize: 10,
    color: COLORS.textDark,
    fontFamily: "Helvetica-Bold",
  },
  patientValueNormal: {
    fontSize: 9,
    color: COLORS.textMid,
  },

  // Sección de estudio
  studySection: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  studyLeft: {},
  studyLabel: {
    fontSize: 7,
    color: "#A9CCE3",
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  studyName: {
    fontSize: 11,
    color: COLORS.white,
    fontFamily: "Helvetica-Bold",
  },
  studyRight: {
    alignItems: "flex-end",
  },
  studyDate: {
    fontSize: 8.5,
    color: "#A9CCE3",
    marginBottom: 2,
  },
  studyDateValue: {
    fontSize: 10,
    color: COLORS.white,
    fontFamily: "Helvetica-Bold",
  },

  // Sección genérica
  sectionWrapper: {
    marginBottom: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  sectionBar: {
    width: 4,
    height: 14,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 2,
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: COLORS.sectionTitle,
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  sectionDivider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 8,
  },

  // Párrafo de contenido
  paragraph: {
    fontSize: 9,
    color: COLORS.textDark,
    lineHeight: 1.55,
    marginBottom: 6,
  },
  paragraphBold: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
    marginTop: 6,
    marginBottom: 2,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 5,
    paddingLeft: 4,
  },
  bulletDot: {
    width: 14,
    fontSize: 9,
    color: COLORS.primaryLight,
    fontFamily: "Helvetica-Bold",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: COLORS.textDark,
    lineHeight: 1.5,
  },

  // Conclusión destacada
  conclusionBox: {
    backgroundColor: "#EBF5FB",
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 18,
  },
  conclusionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: COLORS.accent,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 5,
  },
  conclusionText: {
    fontSize: 9,
    color: COLORS.textDark,
    lineHeight: 1.6,
  },

  // Imágenes
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 18,
  },
  imageCell: {
    width: "48%",
    borderRadius: 4,
    overflow: "hidden",
    border: `1 solid ${COLORS.border}`,
    backgroundColor: COLORS.background,
  },
  imageThumb: {
    width: "100%",
    height: 120,
    objectFit: "cover",
  },
  imageCaption: {
    fontSize: 7,
    color: COLORS.textLight,
    textAlign: "center",
    paddingVertical: 3,
  },

  // Firma médica
  signerCard: {
    backgroundColor: COLORS.background,
    borderRadius: 6,
    border: `1 solid ${COLORS.border}`,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  signerIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  signerInitials: {
    fontSize: 12,
    color: COLORS.white,
    fontFamily: "Helvetica-Bold",
  },
  signerInfo: {
    flex: 1,
  },
  signerName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: COLORS.textDark,
    marginBottom: 2,
  },
  signerSpecialty: {
    fontSize: 8.5,
    color: COLORS.textMid,
    marginBottom: 1,
  },
  signerMatricula: {
    fontSize: 8,
    color: COLORS.textLight,
  },
  signerDate: {
    alignItems: "flex-end",
  },
  signerDateLabel: {
    fontSize: 7,
    color: COLORS.textLight,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  signerDateValue: {
    fontSize: 8.5,
    color: COLORS.textDark,
    fontFamily: "Helvetica-Bold",
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.headerBg,
    paddingHorizontal: 36,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 7,
    color: "#A9CCE3",
    letterSpacing: 0.3,
  },
  footerBold: {
    fontSize: 7,
    color: COLORS.white,
    fontFamily: "Helvetica-Bold",
  },
});

// ─── Utilidades ───────────────────────────────────────────────────────────────

/**
 * Parser simple de HTML a elementos @react-pdf/renderer.
 * Soporta: h2, p, ul, li, strong, em, br.
 */
function parseHtmlContent(html) {
  if (!html) return null;

  // Limpiar y normalizar
  const clean = html
    .replace(/\r?\n/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  const elements = [];
  let remaining = clean;
  let key = 0;

  // Regex para bloques de nivel superior
  const blockRe =
    /<(h2|h1|h3|p|ul|ol|li)\b[^>]*>([\s\S]*?)<\/\1>|<br\s*\/?>/gi;

  let lastIndex = 0;
  let match;
  const regex = new RegExp(blockRe.source, "gi");

  while ((match = regex.exec(clean)) !== null) {
    // Texto suelto antes del bloque
    const before = clean.slice(lastIndex, match.index).trim();
    if (before) {
      elements.push(
        <Text key={key++} style={styles.paragraph}>
          {stripTags(before)}
        </Text>
      );
    }
    lastIndex = regex.lastIndex;

    const tag = (match[1] || "").toLowerCase();
    const inner = match[2] || "";

    if (tag === "h1" || tag === "h2" || tag === "h3") {
      elements.push(
        <Text key={key++} style={styles.paragraphBold}>
          {stripTags(inner).toUpperCase()}
        </Text>
      );
    } else if (tag === "p") {
      const text = stripTags(inner).trim();
      if (text) {
        elements.push(
          <Text key={key++} style={styles.paragraph}>
            {text}
          </Text>
        );
      }
    } else if (tag === "ul" || tag === "ol") {
      const liItems = extractListItems(inner);
      liItems.forEach((item, i) => {
        elements.push(
          <View key={key++} style={styles.bulletItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>{item}</Text>
          </View>
        );
      });
    } else if (tag === "li") {
      elements.push(
        <View key={key++} style={styles.bulletItem}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{stripTags(inner).trim()}</Text>
        </View>
      );
    }
  }

  // Texto restante
  const tail = clean.slice(lastIndex).trim();
  if (tail) {
    elements.push(
      <Text key={key++} style={styles.paragraph}>
        {stripTags(tail)}
      </Text>
    );
  }

  return elements;
}

function extractListItems(html) {
  const items = [];
  const re = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    items.push(stripTags(m[1]).trim());
  }
  return items;
}

function stripTags(str) {
  return str.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatDateTime(dtStr) {
  if (!dtStr) return "—";
  try {
    const d = new Date(dtStr);
    return (
      d.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) +
      " " +
      d.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })
    );
  } catch {
    return dtStr;
  }
}

function getInitials(name) {
  if (!name) return "?";
  return name
    .replace(/^Dr\.\s*/i, "")
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

/**
 * Detecta si el HTML tiene sección <h2>conclusion</h2> separada y la separa.
 * Devuelve { hallazgos: string, conclusion: string }
 */
function splitContent(html) {
  if (!html) return { hallazgos: "", conclusion: "" };

  // Buscar h2 con texto "conclusion" (case-insensitive)
  const conclusionRe =
    /<h2[^>]*>\s*conclusi[oó]n\s*<\/h2>([\s\S]*?)(?=<h2|$)/i;
  const hallazgosRe =
    /<h2[^>]*>\s*hallazgos?\s*<\/h2>([\s\S]*?)(?=<h2|$)/i;

  const cMatch = html.match(conclusionRe);
  const hMatch = html.match(hallazgosRe);

  return {
    hallazgos: hMatch ? hMatch[1].trim() : html,
    conclusion: cMatch ? cMatch[1].trim() : "",
  };
}

// ─── Componente principal ─────────────────────────────────────────────────────
function InformeMedicoDocument({ data }) {
  const {
    sysmedi07_comprobante,
    syspers01_nombre_completo,
    syspers01_dni,
    sysmedi08_descripcion,
    sysmedi07_fecha_alta,
    sysmedi09_descripcion,
    sysmedi07_contenido,
    sysmedi11_list = [],
    sysmedi12_list = [],
  } = data;

  const { hallazgos, conclusion } = splitContent(sysmedi07_contenido);

  // sysmedi12_list puede ser array de arrays
  const images = sysmedi12_list.flat ? sysmedi12_list.flat() : [];

  return (
    <Document
      title={`Informe ${sysmedi07_comprobante}`}
      author="Sistema de Gestión Médica"
      subject={sysmedi08_descripcion}
    >
      <Page size="A4" style={styles.page}>
        {/* ── HEADER ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>INFORME MÉDICO</Text>
            <Text style={styles.headerSubtitle}>
              Sistema de Diagnóstico por Imágenes
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerComprobante}>N° COMPROBANTE</Text>
            <Text style={styles.headerComprobanteValue}>
              {sysmedi07_comprobante}
            </Text>
          </View>
        </View>

        {/* ── BANDA DE ESTADO ── */}
        <View style={styles.statusBand}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>
            Estado: {sysmedi09_descripcion || "Sin estado"}
          </Text>
        </View>

        {/* ── CUERPO ── */}
        <View style={styles.body}>
          {/* Datos del paciente */}
          <View style={styles.patientCard}>
            <View style={styles.patientGroup}>
              <Text style={styles.patientLabel}>Paciente</Text>
              <Text style={styles.patientValue}>
                {syspers01_nombre_completo}
              </Text>
            </View>
            <View style={styles.patientGroup}>
              <Text style={styles.patientLabel}>DNI</Text>
              <Text style={styles.patientValueNormal}>{syspers01_dni}</Text>
            </View>
            <View style={styles.patientGroup}>
              <Text style={styles.patientLabel}>Fecha de Alta</Text>
              <Text style={styles.patientValueNormal}>
                {formatDate(sysmedi07_fecha_alta)}
              </Text>
            </View>
          </View>

          {/* Estudio */}
          <View style={styles.studySection}>
            <View style={styles.studyLeft}>
              <Text style={styles.studyLabel}>Estudio realizado</Text>
              <Text style={styles.studyName}>{sysmedi08_descripcion}</Text>
            </View>
            <View style={styles.studyRight}>
              <Text style={styles.studyDate}>Fecha del informe</Text>
              <Text style={styles.studyDateValue}>
                {formatDate(sysmedi07_fecha_alta)}
              </Text>
            </View>
          </View>

          {/* Hallazgos */}
          {hallazgos ? (
            <View style={styles.sectionWrapper}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionBar} />
                <Text style={styles.sectionTitle}>Hallazgos</Text>
                <View style={styles.sectionDivider} />
              </View>
              {parseHtmlContent(hallazgos)}
            </View>
          ) : null}

          {/* Conclusión */}
          {conclusion ? (
            <View style={styles.conclusionBox}>
              <Text style={styles.conclusionTitle}>✓ Conclusión</Text>
              <Text style={styles.conclusionText}>{stripTags(conclusion)}</Text>
            </View>
          ) : null}

          {/* Imágenes adjuntas */}
          {images.length > 0 && (
            <View style={styles.sectionWrapper}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionBar} />
                <Text style={styles.sectionTitle}>
                  Imágenes del Estudio ({images.length})
                </Text>
                <View style={styles.sectionDivider} />
              </View>
              <View style={styles.imageGrid}>
                {images.map((img, idx) => (
                  <View key={idx} style={styles.imageCell}>
                    <Image src={img.url} style={styles.imageThumb} />
                    <Text style={styles.imageCaption}>
                      Imagen {img.row}-{img.col}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Firma(s) médica(s) */}
          {sysmedi11_list.length > 0 && (
            <View style={styles.sectionWrapper}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionBar} />
                <Text style={styles.sectionTitle}>Médico Firmante</Text>
                <View style={styles.sectionDivider} />
              </View>
              {sysmedi11_list.map((signer, idx) => (
                <View key={idx} style={styles.signerCard}>
                  {/* Iniciales */}
                  <View style={styles.signerIcon}>
                    <Text style={styles.signerInitials}>
                      {getInitials(signer.sysmedi11_medico)}
                    </Text>
                  </View>
                  <View style={styles.signerInfo}>
                    <Text style={styles.signerName}>
                      {signer.sysmedi11_medico}
                    </Text>
                    <Text style={styles.signerSpecialty}>
                      {signer.sysmedi11_especialidad}
                    </Text>
                    <Text style={styles.signerMatricula}>
                      {signer.sysmedi11_matricula}
                    </Text>
                  </View>
                  <View style={styles.signerDate}>
                    <Text style={styles.signerDateLabel}>Fecha de firma</Text>
                    <Text style={styles.signerDateValue}>
                      {formatDateTime(signer.sysmedi11_fechayhora_firma)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* ── FOOTER ── */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Documento generado electrónicamente · {sysmedi07_comprobante}
          </Text>
          <Text style={styles.footerText}>
            Paciente:{" "}
            <Text style={styles.footerBold}>{syspers01_nombre_completo}</Text>
          </Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}

function InformePDFPage(){

  const params = useParams()

  const informe = useInformePDF(params).informe

  if(!informe) return null

  return (
    <PDFViewer 
    style={{
      border: 0,
      margin: 0, 
      padding: 0, 
      height: '100vh', 
      width: '100vw',
      position: 'absolute',
      left: 0,
      top: 0
    }}>
      <InformeMedicoDocument data={informe} />
    </PDFViewer>
  )
}

export default InformePDFPage;