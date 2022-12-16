import app from './app';
import httpServer from './socket';
import sequelize from './db/config/connection';

const PORT:number = app.get('port');

sequelize.sync()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`the server is running on http://localhost:${PORT}`);
    });
  })
  .catch(() => console.log('error on synchronizing db'));
