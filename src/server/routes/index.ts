import { Router } from 'express'
import { CidadesController } from '../controller'


const router = Router()

router.get('/', (_, res) => {
  return res.send('Hello World!')
})

router.get('/cidades', CidadesController.getAllValidator, CidadesController.getAll)
router.post('/cidades', CidadesController.createValidator, CidadesController.create)

export { router }