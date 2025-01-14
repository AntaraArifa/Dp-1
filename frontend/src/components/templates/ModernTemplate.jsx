import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.6,
    color: "#333",
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333",
  },
  contact: {
    fontSize: 10,
    marginBottom: 20,
    color: "#666",
  },
  section: {
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
    borderBottom: "1px solid #ccc",
  },
  text: {
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
    color: "#000",
  },
  listItem: {
    marginBottom: 3,
  },
});

export default function ModernTemplate({ data }) {
  return (
    <Document>
      <Page style={styles.page}>
        {/* Header Section */}
        <Text style={styles.header}>{data.name}</Text>
        <Text style={styles.contact}>
          {data.email} | {data.phone} | {data.address}
        </Text>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Education</Text>
          {data.education.map((edu, idx) => (
            <View key={idx} style={styles.text}>
              <Text style={styles.boldText}>{edu.degree}</Text>
              <Text>
                {edu.institution} - {edu.year}
              </Text>
            </View>
          ))}
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Experience</Text>
          {data.experience.map((exp, idx) => (
            <View key={idx} style={styles.text}>
              <Text style={styles.boldText}>
                {exp.jobTitle} at {exp.company}
              </Text>
              <Text>{exp.duration}</Text>
              <Text>{exp.description}</Text>
            </View>
          ))}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Skills</Text>
          {data.skills.map((skill, idx) => (
            <Text key={idx} style={styles.listItem}>
              • {skill}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
