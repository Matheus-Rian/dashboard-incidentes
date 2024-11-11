import React from 'react';
import { Container, Typography, Button, Grid, Box, TextField, Card, CardContent } from '@mui/material';

function landingPage() {
  return (
    <>
      {/* Seção de Cabeçalho */}
      <Box sx={{ backgroundColor: '#3f51b5', padding: '3rem 1rem', color: 'white' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom>
            Bem-vindo à Nossa Empresa!
          </Typography>
          <Typography variant="h6" paragraph>
            Nós oferecemos soluções inovadoras para melhorar a sua vida.
          </Typography>
          <Button variant="contained" color="secondary" href="#produtos">
            Veja Nossos Produtos
          </Button>
        </Container>
      </Box>

      {/* Seção de Produtos/Serviços */}
      <Container id="produtos" maxWidth="lg" sx={{ paddingY: '3rem' }}>
        <Typography variant="h4" gutterBottom>
          Nossos Produtos e Serviços
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Produto 1</Typography>
                <Typography variant="body1">
                  Descrição do produto 1. Este produto oferece uma solução incrível para seus problemas.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Produto 2</Typography>
                <Typography variant="body1">
                  Descrição do produto 2. Uma excelente escolha para quem busca qualidade.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Produto 3</Typography>
                <Typography variant="body1">
                  Descrição do produto 3. Solução eficiente e acessível.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Seção de Testemunhos */}
      <Box sx={{ backgroundColor: '#f4f4f4', paddingY: '3rem' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            O Que Nossos Clientes Dizem
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="body1">
                    "A experiência foi fantástica! O produto realmente mudou minha vida."
                  </Typography>
                  <Typography variant="subtitle2" sx={{ marginTop: 1 }}>
                    - João Silva
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="body1">
                    "Serviço de alta qualidade e atendimento excelente. Recomendo!"
                  </Typography>
                  <Typography variant="subtitle2" sx={{ marginTop: 1 }}>
                    - Maria Oliveira
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="body1">
                    "Valeu cada centavo. Excelente custo-benefício."
                  </Typography>
                  <Typography variant="subtitle2" sx={{ marginTop: 1 }}>
                    - Carlos Santos
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Seção de Contato */}
      <Container maxWidth="lg" sx={{ paddingY: '3rem' }}>
        <Typography variant="h4" gutterBottom>
          Entre em Contato
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Nome" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="E-mail" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Mensagem" multiline rows={4} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>

      {/* Rodapé */}
      <Box sx={{ backgroundColor: '#333', color: 'white', paddingY: '2rem' }}>
        <Container maxWidth="lg" textAlign="center">
          <Typography variant="body2">
            © 2024 Nossa Empresa. Todos os direitos reservados.
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default landingPage;