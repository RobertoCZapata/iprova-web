import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export const ContactEmailTemplate = ({
  name,
  email,
  phone,
  subject,
  message,
}: ContactEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Nueva consulta de {name} desde el sitio web de iPROVA</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>iPROVA</Heading>
            <Text style={subtitle}>Abogados e Investigadores</Text>
          </Section>

          <Hr style={hr} />

          {/* Content */}
          <Section style={content}>
            <Heading style={h2}>Nueva Consulta desde el Sitio Web</Heading>

            <Text style={paragraph}>
              Has recibido una nueva consulta a través del formulario de contacto:
            </Text>

            {/* Contact Info */}
            <Section style={infoBox}>
              <Text style={infoLabel}>Nombre:</Text>
              <Text style={infoValue}>{name}</Text>

              <Text style={infoLabel}>Email:</Text>
              <Text style={infoValue}>
                <a href={`mailto:${email}`} style={link}>{email}</a>
              </Text>

              {phone && (
                <>
                  <Text style={infoLabel}>Teléfono:</Text>
                  <Text style={infoValue}>
                    <a href={`tel:${phone}`} style={link}>{phone}</a>
                  </Text>
                </>
              )}

              {subject && (
                <>
                  <Text style={infoLabel}>Asunto:</Text>
                  <Text style={infoValue}>{subject}</Text>
                </>
              )}
            </Section>

            {/* Message */}
            <Section style={messageBox}>
              <Text style={messageLabel}>Mensaje:</Text>
              <Text style={messageContent}>{message}</Text>
            </Section>

            {/* CTA */}
            <Section style={ctaSection}>
              <Text style={ctaText}>
                Puedes responder directamente a este email para contactar al cliente.
              </Text>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Este email fue enviado desde el formulario de contacto de{' '}
              <a href="https://iprova.com.co" style={link}>iprova.com.co</a>
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} iPROVA - Abogados e Investigadores. Todos los derechos reservados.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Estilos
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  padding: '32px 24px',
  backgroundColor: '#1a4d7a', // Primary color
  textAlign: 'center' as const,
};

const h1 = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: '700',
  margin: '0 0 8px',
  padding: '0',
  lineHeight: '1.2',
};

const subtitle = {
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '400',
  margin: '0',
  letterSpacing: '1px',
  textTransform: 'uppercase' as const,
};

const content = {
  padding: '24px 40px',
};

const h2 = {
  color: '#1a4d7a',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 20px',
  lineHeight: '1.3',
};

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

const infoBox = {
  backgroundColor: '#f6f9fc',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '24px',
};

const infoLabel = {
  color: '#8898aa',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '12px 0 4px',
};

const infoValue = {
  color: '#1a4d7a',
  fontSize: '16px',
  fontWeight: '500',
  margin: '0 0 0',
  lineHeight: '1.4',
};

const messageBox = {
  backgroundColor: '#ffffff',
  border: '1px solid #e6ebf1',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '24px',
};

const messageLabel = {
  color: '#8898aa',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 12px',
};

const messageContent = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const ctaSection = {
  backgroundColor: '#fff4e6',
  borderLeft: '4px solid #f7b633', // Secondary color
  padding: '16px 20px',
  borderRadius: '4px',
  marginTop: '24px',
};

const ctaText = {
  color: '#1a4d7a',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '0',
};

const footer = {
  padding: '24px 40px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '4px 0',
};

const link = {
  color: '#1a4d7a',
  textDecoration: 'underline',
};

export default ContactEmailTemplate;
