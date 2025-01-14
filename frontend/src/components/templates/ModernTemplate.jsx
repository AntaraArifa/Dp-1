import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  Page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.6,
    color: "#333",
  },
  Header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333",
  },
  Contact: {
    fontSize: 10,
    marginBottom: 20,
    color: "#666",
  },
  Section: {
    marginBottom: 15,
  },
  SectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
    borderBottom: "1px solid #ccc",
  },
  Text: {
    marginBottom: 5,
  },
  BoldText: {
    fontWeight: "bold",
    color: "#000",
  },
  ListItem: {
    marginBottom: 3,
  },
});

export default function ModernTemplate({ data }) {
  return (
    <Document>
      <Page style={styles.Page}>
        {/* Header Section */}
        <Text style={styles.Header}>{data.name}</Text>
        <Text style={styles.Contact}>
          {data.email} | {data.phone} | {data.address}
        </Text>

        {/* Education Section */}
        <View style={styles.Section}>
          <Text style={styles.SectionHeader}>Education</Text>
          {data.education.map((edu, idx) => (
            <View key={idx} style={styles.Text}>
              <Text style={styles.BoldText}>{edu.degree}</Text>
              <Text>
                {edu.institution} - {edu.year}
              </Text>
            </View>
          ))}
        </View>

        {/* Experience Section */}
        <View style={styles.Section}>
          <Text style={styles.SectionHeader}>Experience</Text>
          {data.experience.map((exp, idx) => (
            <View key={idx} style={styles.Text}>
              <Text style={styles.BoldText}>
                {exp.jobTitle} at {exp.company}
              </Text>
              <Text>{exp.duration}</Text>
              <Text>{exp.description}</Text>
            </View>
          ))}
        </View>

        {/* Skills Section */}
        <View style={styles.Section}>
          <Text style={styles.SectionHeader}>Skills</Text>
          {data.skills.map((skill, idx) => (
            <Text key={idx} style={styles.ListItem}>
              • {skill}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
