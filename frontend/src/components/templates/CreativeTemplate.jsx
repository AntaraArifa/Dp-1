import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Courier", fontSize: 10, backgroundColor: "#f4f4f4" },
  header: { fontSize: 22, color: "#333", textAlign: "center", marginBottom: 20 },
  section: { marginBottom: 15 },
  subsection: { marginLeft: 10 },
  highlight: { fontWeight: "bold", color: "#555" },
});

// Exporting the component directly as default
export default function CreativeTemplate({ data }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Creative Resume</Text>
        <View style={styles.section}>
          <Text style={styles.highlight}>Name:</Text> {data.name}
        </View>
        <View style={styles.section}>
          <Text style={styles.highlight}>Email:</Text> {data.email}
        </View>
        <View style={styles.section}>
          <Text style={styles.highlight}>Phone:</Text> {data.phone}
        </View>
        <View style={styles.section}>
          <Text style={styles.highlight}>Address:</Text> {data.address}
        </View>

        <View style={styles.section}>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>Education:</Text>
          {data.education.map((edu, idx) => (
            <View key={idx} style={styles.subsection}>
              <Text>- {edu.degree} ({edu.year})</Text>
              <Text style={{ fontStyle: "italic" }}>{edu.institution}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>Experience:</Text>
          {data.experience.map((exp, idx) => (
            <View key={idx} style={styles.subsection}>
              <Text style={styles.highlight}>{exp.jobTitle}</Text> at {exp.company} ({exp.duration})
              <Text>{exp.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>Skills:</Text>
          {data.skills.map((skill, idx) => (
            <Text key={idx} style={styles.subsection}>- {skill}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
