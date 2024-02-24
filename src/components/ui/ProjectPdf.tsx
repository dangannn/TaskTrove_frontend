import React from 'react'
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

import IProjectFormData from '../../types/projectFormData'

const ProjectPdf: React.FC<IProjectFormData> = ({
  name,
  description,
  customer,
  urgency,
  payment
}) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{name}</Text>
        </View>
        <View style={styles.section}>
          <Text>{description}</Text>
        </View>
        <View style={styles.section}>
          <Text>{customer}</Text>
        </View>
        <View style={styles.section}>
          <Text>{urgency}</Text>
        </View>
        <View style={styles.section}>
          <Text>{payment}</Text>
        </View>
      </Page>
    </Document>
  )
}

export default ProjectPdf
