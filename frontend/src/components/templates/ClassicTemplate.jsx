import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Times-Roman", fontSize: 12, lineHeight: 1.5 },
  header: { fontSize: 24, marginBottom: 10, textAlign: "center", textDecoration: "underline" },
  section: { marginBottom: 15 },
  subsection: { marginLeft: 20 },
});

// Exporting the component directly as default
export default function ClassicTemplate({ data }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Classic Resume</Text>
        <Text>Name: {data.name}</Text>
        <Text>Email: {data.email}</Text>
        <Text>Phone: {data.phone}</Text>
        <Text>Address: {data.address}</Text>

        <View style={styles.section}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>Education:</Text>
          {data.education.map((edu, idx) => (
            <View key={idx} style={styles.subsection}>
              <Text>- {edu.degree}, {edu.institution} ({edu.year})</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>Experience:</Text>
          {data.experience.map((exp, idx) => (
            <View key={idx} style={styles.subsection}>
              <Text>- {exp.jobTitle} at {exp.company} ({exp.duration})</Text>
              <Text>{exp.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>Skills:</Text>
          {data.skills.map((skill, idx) => (
            <Text key={idx} style={styles.subsection}>- {skill}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
