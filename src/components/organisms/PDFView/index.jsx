import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

import InvoiceDoc from '../OrderInvoice';

const PDFView = () => (
  <PDFViewer>
    <InvoiceDoc />
  </PDFViewer>
);

export default PDFView;
