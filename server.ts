import * as express from 'express';
import * as compression from 'compression';
import { join } from 'path';

const app = express();
const port = process.env.SERVER_PORT || 4090;

const index = (req: express.Request, res: express.Response) => {
  return res.status(200).sendFile(join(__dirname, 'index.html'));
};

app.use(compression());
app.use('/fonts', express.static(join(__dirname, 'fonts'), { index: false }));
app.use('/images', express.static(join(__dirname, 'images'), { index: false }));
app.use('/js', express.static(join(__dirname, 'js'), { index: false }));
app.all('/*', index);

app.listen(port, () => console.log(`server running on http://localhost:${port}`));
