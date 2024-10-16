import Fastify from 'fastify';
import cors from '@fastify/cors';
import routeRoutes from './interfaces/routeRoutes';

const app = Fastify();

app.register(cors, {
  origin: '*',
});
app.register(routeRoutes);

const PORT = process.env.PORT || 3000;

app.listen({ port: Number(PORT) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address}`);
});
